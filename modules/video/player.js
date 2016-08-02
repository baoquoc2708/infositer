/**
 * Player is a facade to the player components defined under the
 * `/modules/components` directory. It is meant to provide hooks for
 * adding and removing event listeners as well as mounting the video
 * player into a page.
 */

import $ from 'jquery';
import { isMobile, isApp, envCheck } from 'utils/util';
import React from 'react';

let Player = function(component) {
  this.component = component;
};

/**
 * @param {string} mountId       - the id of the element that the video will be mounted in.
 * @param {object|string} config - a js object or URL pointing to a `.json` file
 * @param {function} [callback]  - called when the component has been mounted.
 */
Player.prototype = {
  create(mountId, config, callback, autoplay) {
    let mountPoint    = document.getElementById(mountId),
        component     = this.component,
        $body         = $('body'),
        $head         = $('head'),
        descriptor;

    if(isMobile()) {
      $body.addClass('is-mobile');
      if(!$head.has('meta[name=viewport]').length) {
        $head.append('<meta id="cme-viewport" name="viewport" content="minimum-scale=0.75, maximum-scale=1.6">');
      }
    } else {
      $body.addClass('is-desktop');
    }

    if(isApp()) {
      $body.addClass('is-app');
    }
    if(typeof config === 'undefined' && mountPoint !== null) {
      descriptor = { descriptorURL: this.getConfigURL(mountPoint.getAttribute('data-config'))};
    } else if(typeof config !== 'string') {
      config.config.autoplay = true;
      descriptor = { descriptorJSON: config };
    } else {
      descriptor = { descriptorURL: config };
    }

    React.render(React.createElement(component, descriptor), mountPoint, function() {
      let $customCSS = $('link[data-href]');
      // ensure custom CSS loads _after_ component css
      $customCSS.attr('href', $customCSS.attr('data-href'));
      $('.app-loading').removeClass('app-loading');
      if(callback) callback();
    });

    return this;
  },

  getConfigURL(pathOrURL) {
    if(pathOrURL.indexOf('http') !== -1) {
      // return '/products/cme/config/16_slide-pres-toc_audio.json';
      return pathOrURL;
    } else {
      // Clean up sloppy inputs (e.g. leading '/' and bad file extensions)
      const path = pathOrURL.replace(/^\//, '').replace(/xlsx$/, 'json');
      return `http://api${envCheck()}.medscape.com/contentservice/video/content/${path}`;
    }
  }
};
export default Player;
