/*global define*/
/**
 * Util module
 * This module contains commonly used functions.
 *
 */
import _        from '_';
import $        from 'jquery';

const Util = {
  /** Convert a float data type to a ratio.
   *
   * @params {number} x: The float number that will be converted to a fraction
   */
  floatToRatio: function(x) {
    let tolerance = 1.0E-6;
    let h1=1; let h2=0;
    let k1=0; let k2=1;
    let b = x;
    do {
      let a = Math.floor(b);
      let aux = h1;
      h1 = a*h1+h2;
      h2 = aux;
      aux = k1;
      k1 = a*k1+k2;
      k2 = aux;
      b = 1/(b-a);
    } while (Math.abs(x-h1/k1) > x*tolerance);

    return h1+'/'+k1;
  },
  toArray(obj) {
    return (_.isArray(obj) ? obj : [obj]);
  },
  /**
   * Load a CSS  file
   * @param {String} nameOfDoc : Name of a file you want the url for, minus the suffix (.js, .css, etc)
   * @param {String} contentToCut: The beginning of the part of the url you'd like to truncate
   * @param {String} appendContent: The string you'd like to append to the end of your URL
   */
  loadCss: function(nameOfDoc, contentToCut, appendContent) {
    let url = Util._urlFinder(nameOfDoc, contentToCut, appendContent);

    let link = document.createElement('link');
    link.type = 'text/css';
    link.rel = 'stylesheet';
    link.href = url;
    $('head').append(link);
  },
  /**
   * Find the url of the current file, typically called by
   *
   * @param {string} nameOfDoc : name of the file you want
   * the url for, minus the suffix (.js, .css, etc)
   *
   * @param {string} contentToCut: the beginning of the part
   * of the url you'd like to truncate
   *
   * @param {string} appendContent: the string you'd like to append to the end of your URL
   */
  _urlFinder: function(nameOfDoc, contentToCut, appendContent) {
    let currentUrl;

    let scriptElements = document.getElementsByTagName('script');
    let i, element, myfile;

    for(i = 0; element = scriptElements[i]; i++ ) {
      myfile = element.src;

      if( myfile.indexOf( nameOfDoc ) >= 0 ) {
        currentUrl = myfile.substring( 0, myfile.indexOf( nameOfDoc ) );
      }
    }

    // Cut off end of URL and add relative path to css file needed
    let url = currentUrl.substr(0, currentUrl.indexOf(contentToCut)) + appendContent;

    return url;
  },

  mixin(...args) {
    return _.extend.apply(null, args.map(_.clone));
  },

  forceRepaint(node) {
    node.style.display = 'none';
    Util.nextTick(() => node.style.display = '');
  },

  /* Returns true if the current device is mobile, else returns false */
  isMobile: function() {
    return /android|webos|ipad|iphone|ipod|blackberry|iemobile|opera mini|windows ce|windows phone/i.test(navigator.userAgent.toLowerCase());
  },

  isTouchDevice: function() {
    return 'ontouchstart' in window || 'onmsgesturechange' in window;
  },

  /** Returns the current environment the code is running on */
  environment: function() {
    // All the code below determines the environment and builds the proper string
    const environments = ['proddev', 'staging', 'qa00', 'qa01', 'qa02'];
    let currentEnv = '';

    // Determine environment
    $.each(environments, function(index, value) {
      if ($.inArray(value, window.location.host.split('.')) === 1) {
        currentEnv = value;
      }
    });

    return currentEnv;
  },

  /**
   * Parse query params into an object
   */

  getParams: function(qs_) {
    let qs         = qs_ || window.location.search.substring(1);
    if(!qs) return { };

    return _.chain(qs.split('&'))
            .map(function(seg) { return _.map(seg.split('='), decodeURIComponent); })
            .zipObject()
            .value();
  },

  urlToJSONP: function(dataUrl) {
    let [ url, query ] = dataUrl.split('?');
    if(query) {
      url += `?${query}&`;
    } else {
      url += '?';
    }
    url += 'callback=?';
    return url;
  },


  /**
   * Alternate Environment Checking Function, Handles all
   * combination of qa/staging/proddev and inserts a period, for
   * direct use in URLs */
  envCheck: function() {
    let env = '';
    if (window.location.href.indexOf('.staging.') !== -1) {
      if(window.location.href.match(/\.qa\d\d/) !== null) {
        env = '.staging' + window.location.href.match(/\.qa\d\d/)[0];
      } else {
        env = '.staging';
      }
    } else if (window.location.href.indexOf('.proddev.') !== -1) {
      env = '.proddev';
    } else if (window.location.href.match(/\.qa\d\d/) !== null) {
      env = env + window.location.href.match(/\.qa\d\d/)[0];
    }
    return env;
  },

  /**
   * returns the default image server for but also takes an override for when
   * you're testing locally but you want to override and point at a remote.
   */
  imageServer: function(env) {
    const sub = env? env : Util.envCheck();
    const prodEnv = ['www.medscape.com', 'www.medscape.org', 'reference.medscape.com', 'education.webmd.com'];
    const isProd = prodEnv.some((envUrl)=> {
      return (window.location.host.indexOf(envUrl) !== -1)
    });
    if(isProd) {
      return 'http://img.medscapestatic.com';
    }
    if(env === 'override') {
      return '';
    } else if (sub === '' && Util.isLocal()) {
      return 'http://img.qa01.medscapestatic.com';
    } else {
      return `http://img${sub}.medscapestatic.com`;
    }
  },

  isLocal: function() {
    return window.location.href.match(/localhost/);
  },

  /** Returns true if the current device is Retina display */
  isRetina: function() {
    return (window.devicePixelRatio > 1);
  },

  /** Returns true if the current device is ipad */
  isIpad: function() {
    return navigator.userAgent.match(/iPad/i) !== null;
  },
  isIOS: function(version) {
    let isIOS = Util.isIpad() || navigator.userAgent.match(/iPhone/i);
    if(version) {
      isIOS = isIOS && navigator.userAgent.match(new RegExp('OS ' + version));
    }
    return isIOS;
  },
  isSafari: function() {
    return Util.isIOS() && (navigator.userAgent.indexOf('Safari') > -1);
  },
  isApp: function() {
    return !!navigator.userAgent.toLowerCase().match('medscape');
  },
  nextTick: function(f) {
    setTimeout(f, 0);
  },
  getXhr(url) {
    const Promise = require('native-promise-only');
    return new Promise(function(resolve, reject) {
      const req = new XMLHttpRequest();
      req.open('GET', url);
      req.onload = function() {
        if (req.status === 200) {
          resolve(req.response);
        } else {
          reject(Error(req.statusText));
        }
      };
      req.onerror = function() {
        reject(Error('Network Error'));
      };
      req.send();
    });
  }
};

export default Util;
