/*global define s_registered_user_id s_page_number s_md wmdPageview Image ADB*/
import $                        from  'jquery';
import { assign, keys, forEach,
         omit, extend, capitalize,
         template }             from  '_';
import md5                      from 'md5';

import Reflux                   from 'reflux';
import { envCheck, isMobile }   from 'utils/util';

import StoreState               from 'mixins/store_state';
import HasMedscapeGlobals       from  'mixins/has_medscape_globals';

import BrandPlayTrackingActions from  'actions/brand_play_tracking_actions';
import VideoActions             from  'actions/video_actions';
import NotesActions             from  'actions/notes_actions';

import DescriptorStore          from 'stores/descriptor_store';
import VideoStore               from 'stores/video_store';

/**
   WARNING: This file is a series of hacks on hacks on hacks to get
   the ratsnest of metrics to work. Adobe has several global variables
   that we need to access and the actual metric specs are unclear as
   to what kinds of calls need to be made at what point in time. This
   file is due for a serious refactor once all of that is sorted.
 */

const CONTEXT_LINK_VARS = 'contextData.a.contentType,contextData.a.media.name,contextData.a.media.friendlyName,contextData.a.media.length,contextData.a.media.playerName,contextData.a.media.channel,contextData.a.media.view,contextData.a.media.ad.name,contextData.a.media.ad.friendlyName,contextData.a.media.ad.podFriendlyName,contextData.a.media.ad.length,contextData.a.media.ad.playerName,contextData.a.media.ad.pod,contextData.a.media.ad.podPosition,contextData.a.media.ad.podSecond,contextData.a.media.ad.CPM,contextData.a.media.ad.view';

export default Reflux.createStore({
  mixins: [ StoreState, HasMedscapeGlobals ],
  listenables: [ BrandPlayTrackingActions, VideoActions, NotesActions ],
  productName: 'brandplay', // TODO: config this?
  progressArray: [ 25, 50, 75, 100 ],
  progressTrack: { index: 0, lastTracked: 0 },
  hasStarted: false,
  lastState: { },
  stateNamespace: 'tracking',
  init: function() {
    this.isCPDisabled  = false;
    this.isIPPDisabled = false;

    this.initMedscapeGlobals();
    this.initHeartbeat();

    // omniture prop6 is the content type. For brandplay that means: 'video-brandplay'
    this.$metrics.prop6 = 'video-brandplay';
    this.listenTo(VideoStore, this.onVideoChange);
  },

  onSetPageName: function(pageName) {
    if(this.isIPPDisabled) return;
    let pamHash = this.toPAMHash(pageName);
    this.$metrics.pageName = pamHash;
    this.defaultPageName   = pamHash;
  },

  onTrackLink: function(params) {
    this.trackLink(params);
  },

  onTrackEvent: function(params) {
    this.trackEvent(params);
  },

  onCP: function(params) {
    this.postCP(params); // TODO, come up with a better name and
    // maybe move the body of postCP into this
    // function
  },

  // active video tracking (i.e. button-pushing. these are the events from VideoActions)
  onStart: function() {
    if(!VideoStore.areIOS7HacksActive()) {
      this.trackEvent('vidvbp-ctl_play');
    }
  },
  onPause: function() {
    // suck. they want this tracked for clicking on the player, it's
    // in the switch statement in `onVideoChange`
  },
  onSetCurrentTime: function() {
    this.trackEvent('vidvbp-ctl_scrb');
  },
  onMute: function() {
    this.trackEvent('vidvbp-ctl_mute');
  },
  onUnmute: function() {
    // seriously analytics dude, 'mutex' instead of 'unmute'? Take a comp sci class.
    this.trackEvent('vidvbp-ctl_mutex');
  },
  onSetVolume: function() {
    this.trackEvent('vidvbp-ctl_vol');
  },
  onFullScreen: function() {
    this.trackEvent('vidvbp-ctl_bigr');
  },
  onExitFullScreen: function() {
    this.trackEvent('vidvbp-ctl_smalr');
  },
  // notes actions
  onShow: function() {
    this.trackEvent('vidvbp-ctl_bio');
  },

  // passive video tracking (responds to state changes in the VideoStore)
  onVideoChange: function(vidState) {
    let state      = vidState.video;
    switch(state.event) {
      case 'ready':
        break;
      case 'play':
        if(!isNaN(state.duration)) { // weird ios bug with play double fire
                                     if(VideoStore.areIOS7HacksActive()) { // because these have to be user initiated.
                                                                           this.trackEvent('vidvbp-ctl_play');
                                     }
          if(state.currentTime === 0) {
            this.trackStart(state);
          } else {
            this.trackHB('play');
          }
        }
        break;
      case 'pause':
        this.trackEvent('vidvbp-ctl_pause');
        this.trackHB('pause');
        break;
      case 'ended':
        this.trackHB('complete', 'videoUnload'); // 'chapterComplete',
        break;
      case 'buffering':
        this.trackHB('seekStart');
        break;
      case 'videoSelected':
        if(this.lastState.isPlaying) { // we've switched videos before the last one finished
                                       this.trackHB('complete', 'videoUnload');// 'chapterComplete',
        }
        break;
      case 'progress':
        if(this.lastState.isBuffering) {
          this.trackHB('seekComplete');
        }
        this.trackProgress(state);
        break;
      default:
    }
    this.lastState = state;
  },
  onLoad: function() {
    if(window.location.hash === '#getHash') {
      this.openTrackingHashTable();
    }
  },

  /* internal/util */

  trackStart: function(state) {
    let chapter    = state.index + 1,
        identifier = this._identifier();

    this.trackEvent({
      prop9: 'allvideo_start',
      identifier: identifier,
      event: 'vidvbp_start'
    });

    this.postCP({
      appname: 'ippcontent',
      activityName: 'scn' + chapter
    });

    this.$wmdPageView(this.toPAMHash(identifier), chapter);
    this._addAdobeHack();
    this.trackHB('videoLoad');
    this._clearAdobeHack();
    this.trackHB('play');
    // this.trackHB('chapterStart');

    if(!this.hasStarted) {
      this.hasStarted = true;
      this.postCP({
        appname: 'ippevent',
        activityName: 'participation'
      });
      this.trackIPP('startPresentation');
    }
  },

  trackProgress: function(state) {
    let percent   = (state.currentTime / state.duration) * 100,
        i         = 0,
        progress  = [ ],
        lastTrack;

    if(this.progressTrack.index !== state.index) {
      this.progressTrack.lastTracked = 0; // reset on video change
    }

    while(percent >= this.progressArray[i]) {
      if(this.progressArray[i] > this.progressTrack.lastTracked) {
        progress.push(this.progressArray[i]);
        lastTrack = this.progressArray[i];
      }
      i++;
    }

    if(progress.length) {
      this.progressTrack.index       = state.index;
      this.progressTrack.lastTracked = lastTrack;
      forEach(progress, function(p) {
        this.trackEvent({
          prop9:      (p === 100)? 'allvideo_100pct' : null,
          identifier: this._identifier(),
          event:      'vidvbp_' + p + 'pct'
        });
      }, this);
    }
  },
  trackEvent: function(params) {
    let paramsObj = params;
    if(typeof params === 'string') {
      paramsObj = {
        identifier: this._identifier(),
        event: params
      };
    }
    try {
      this.$metrics.pageName = this.toPAMHash(paramsObj.identifier);
      this.wmdPageLink(paramsObj.event, { prop9: paramsObj.prop9 });
    } finally {
      this.$metrics.pageName = this.defaultPageName;
    }
  },

  trackView: function(page, pageNumber) {
    this.$wmdPageView(this.toPAMHash(page), pageNumber);
  },

  trackLink: function(params) {
    try {
      this.$metrics.pageName = this.toPAMHash(params.identifier);
      if(this.isExternal(params.identifier)) {
        this.wmdPageLink(params.event);
      } else {
        this.$wmdTrack(params.event);
      }
    } finally {
      this.$metrics.pageName = this.defaultPageName;
    }
  },

  trackIPP: function(action) {
    if(this.isIPPDisabled) return;
    // create a tracking pixel
    let trackingPixel = new Image(1, 1),
        ippVars       = omit(this.ipp, 'wpUrl'),
        url           = 'http://' + this.ipp.wpUrl + '/activity/viewpresentation',
        urlParams     = $.param(assign(ippVars, { action: action }));

    trackingPixel.id  = 'onTrackIPP';
    trackingPixel.src = url + '?' + urlParams;
  },

  isExternal: function(url) {
    let host = window.location.hostname;
    if(!host) {
      // local testing
      host = 'file://';
    } else {
      host = '://'+ host;
    }
    return (url.indexOf('://') !== -1) && (url.indexOf(host) === -1);
  },

  postCP: function(params) {
    let paramsObj = params;
    paramsObj.uid  = paramsObj.uid || this.$userId;
    paramsObj.url  = paramsObj.url || encodeURIComponent(window.location.href.split('?')[0]);
    paramsObj.date = new Date().getTime();
    paramsObj      = extend(paramsObj, this.cp); // parId, activityId, etc. . .
    return $.ajax({
      contentType: 'application/jsonp',
      dataType: 'jsonp',
      url: 'http://api' + envCheck() + '.medscape.com/cp/events.json',
      data: 'event=' + JSON.stringify(paramsObj),
      timeout: 2000
    });
  },

  initHeartbeat: function() {
    if(typeof ADB === 'undefined') return;

    let config   = new ADB.va.ConfigData('http://heartbeats.omtrdc.net', 'sc_va', 'webmd'),
        delegate = new ADB.va.PlayerDelegate(),
        plugin   = new ADB.va.plugins.AdobeAnalyticsPlugin(this.$metrics);

    // config.debugLogging   = true;
    config.quietMode      = false;
    config.channel        = this.$metrics.prop47;

    delegate.getVideoInfo = function() {
      return {
        id: 'video_' + (this._vidState().index+1),
        name: 'Video' + (this._vidState().index+1),
        playerName: 'coreLibVideo',
        length: VideoStore.getDuration(),
        streamType: 'vod', // TODO: map this to mime type
        playhead: VideoStore.getCurrentTime()
      };
    }.bind(this);

    delegate.getChapterInfo = function() {
      let info       = new ADB.va.ChapterInfo();
      info.name      = 'Video ' + (this._vidState().index + 1);
      info.length    = VideoStore.getDuration();
      info.position  = VideoStore.getCurrentTime();
      info.startTime = 0;
      return info;
    }.bind(this);

    this.heartbeat = new ADB.va.VideoHeartbeat(delegate, [ plugin ]);
    this.heartbeat.configure(config);

    $(window).on('beforeunload', () => {
      this.trackHB('videoUnload');
      this.heartbeat.destroy();
    });
  },

  trackHB: function() {
    let args = [].slice.call(arguments);
    forEach(args, (method) => {
      this.heartbeat['track' + capitalize(method)]();
    });
  },

  toPAMHash: function(pageName) {
    let domain   = document.domain.replace('wp.', '').replace('www.', ''),
        nameHash = md5(this.ipp.sfNum + '_' + pageName),
        pamName  = [domain, this.productName, this.ipp.sfNum, nameHash].join('/') + '/';
    return pamName;
  },

  // not a hashtable, a table of the tracking hashes. naming. sigh.
  openTrackingHashTable: function() {
    let w = window.open(),
        // NB: this is NOT an es6 template string, it's a lodash templates string.
        t    = template('<tr><td>${asset}</td><td>${pam}</td><td>${module}</td><td>${text}</td>');

    w.document.write('<table cellpadding="3" border="1" cellspacing="3">');
    w.document.write('<tr><th>ASSET</th><th>HASH</th><th>MODULE NAME</th><th>LINK TEXT</th></tr>');
    this.trackingHashes().forEach(function(row) {
      w.document.write(t(row));
    });
    w.document.write('</table>');
    w.document.close();
  },

  trackingHashes: function() {
    let rows = [ ],
        desc = DescriptorStore.getDescriptor(),
        rowF = function(asset, module) {
          let assetName = this.ipp.sfNum + '_' + asset;
          return {
            asset: assetName,
            pam: md5(assetName),
            module: module || 'N/A',
            text: 'N/A'
          };
        }.bind(this),
        linkF = function(asset, element, module) {
          let assetName = this.ipp.sfNum + '_' + asset;
          return {
            asset: assetName,
            pam: md5(assetName),
            module: module || 'N/A',
            text: element.innerHTML
          };
        }.bind(this);

    // all of these are in the same order as the old player because
    // I'm assuming that this html table is read by a _very_ fragile
    // parser.
    desc.videos.forEach(function(_video, i) {
      rows.push(rowF('ARTICLE-' + (i+1)));
    });

    desc.videos.forEach(function(video, i) {
      this.progressArray.forEach(function(pct) {
        rows.push(rowF('ARTICLE-' + (i+1), 'vidvbp_' + pct + 'pct'));
      });
    }.bind(this));

    desc.videos.forEach(function(video, i) {
      rows.push(rowF('ARTICLE-' + (i+1), 'vidvbp_start'));
    });

    desc.videos.forEach(function(video, i) {
      ['play', 'pause', 'scrub', 'vol', 'bigr', 'smalr'].forEach(function(ctl) {
        rows.push(rowF('ARTICLE-' + (i+1), 'vidvbp-ctl_' + ctl));
      });
    });


    rows.push(rowF('SLIDE1_SLIDENOTES'));
    rows.push(rowF('ACTIONSHEET_OPEN', 'vidvbp-action_sheet'));
    rows.push(rowF('ACTIONSHEET_CLOSE', 'vidvbp-action_close'));

    desc.dropdownLinks.forEach(function(link, i) {
      let elem = document.getElementById('brand-play-dropdown-item-' + i);
      if(!elem) return;
      rows.push(linkF('OPTION' + (i+1), elem, 'vidvbp-action_' + (i+1)));
    });

    let leave = document.getElementById('returnToMedscape' + (isMobile()? 'Mobile' : '')),
        href, link,
        isiLinksTracking = document.getElementById('brand-play-header-isi-link');

    if(leave) {
      href = $(leave).find('a').attr('href');
      rows.push(linkF('INTLINK_' + href, leave, 'vidvbp-intlink'));
    }
    rows.push(rowF('CLOSE', 'vidvbp-close'));

    /* Adding the header links to the Hash table */
    desc.isiLinks.forEach(function(link, i) {
      let isiLink = document.getElementById('brand-play-header-isi-link-' + i),
          href = $(isiLink).find('a').attr('href'),
          medscape = "medscape.com",
          internal_link = href.indexOf(medscape),
          asset_link = "", module_name = "";
        
        if (internal_link > -1){
            asset_link = "INTLINK_";
            module_name = "vidvbp-intlink";
        }
        else{
            asset_link = "EXTLINK_";
            module_name = "vidvbp-extlink";
        }
      
      $(isiLink).find('br').remove();
      rows.push(linkF(asset_link + href, isiLink, module_name));
    });

    /* Adding the ISI links to the Hash table */
      let links = $('.isi a').map(function() {
              return this.href;
          }).toArray(),
          uniqueLinks = [...new Set(links)];

    if(uniqueLinks.length > 0){
        uniqueLinks.forEach((link) => {
            rows.push(linkF('EXTLINK_' + link, uniqueLinks, 'vidvbp-extlink'));
        });
    }

    return rows;
  },

  _vidState: function() {
    return VideoStore.state; // immutable
  },
  _identifier: function() {
    return 'article-' + (VideoStore.state.index + 1);
  },

  // HERE BE DRAGONS (adobe hacks below)
  _addAdobeHack: function() {
    if(!this.$metrics.trackLinkVars || !this.$metrics.linkTrackVars.match('contextData')) {
      this.$metrics.linkTrackVars += CONTEXT_LINK_VARS;
    }
  },
  _clearAdobeHack: function() {
    this.$metrics.linkTrackVars = this.$metrics.linkTrackVars.replace(CONTEXT_LINK_VARS, '');
    this.$metrics.contextData   = { };
  },
  wmdPageLink: function(link, obj) {
    if(typeof addLinkTrackVars === 'undefined') return;
    addLinkTrackVars(keys(obj));
    try {
      assign(s_md, obj);
      wmdPageLink(link);
    } finally {
      remLinkTrackVars(keys(obj));
    }
  }
});
