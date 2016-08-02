/* eslint camelcase: 0 */

import VideoApi                   from 'video/video-api';
import videoConfig                from 'video/config';
import videoConfigDefaults        from 'video/configDefaults';
import { envCheck, isLocal,
        imageServer, isMobile }   from 'utils/util';
import {  extend, forEach, assign,
         keys, map }              from '_';
import SATracking                 from 'video/stand_alone_player_tracking';
import _screenfull                from 'screenfull'; // eslint-ignore no-unused-vars
import React                      from 'react';
import PlayerControl              from 'video/stand_alone_player_control.jsx';

const player = function() {
    this.create = function(videoContainer, iterator) {
      videoContainer.setAttribute('id', `video_player_screen-${iterator}`);
      if (typeof s_pageview_id === 'undefined') {
        const timestamp = new Date().getTime() / 1000,
          epochSec = Math.round(timestamp).toString(),
          randomNumber = Math.random().toString().substr(2, 8);
        window.s_pageview_id = epochSec + randomNumber;
      }

      let video_completed = false;

      const ampPath = '/amp-premier/',
         pluginPath = `${ampPath}plugins/`,
             ampURL = isLocal() ? ampPath : `http://img${envCheck()}.medscape.com/pi/core${ampPath}`,
          pluginURL = isLocal() ? pluginPath : `http://img${envCheck()}.medscape.com/pi/core${pluginPath}`,
            vConfig = extend(videoConfig(pluginURL, ampURL), videoConfigDefaults),

        success = (data) => {
              const videoSettings     = data[iterator],
                    { ccInfo }        = data,
                      STREAM_CDN_HOST = 'http://webmd-vh.akamaihd.net',
                         MP4_CDN_HOST = 'http://webmd-a.akamaihd.net',
                                  res = '750k',
                           ccFileRoot = `${imageServer()}/${videoSettings.ccFileRoot.replace(/^en\//, '')}`;
                     vConfig.autoplay = videoSettings.autoplay;
                 vConfig.media.source = [{
                    src: `${STREAM_CDN_HOST}/i/delivery${videoSettings.source}.csmil/master.m3u8`,
                    type: 'application/x-mpegURL'
                  }, {
                    src: `${STREAM_CDN_HOST}/z/delivery${videoSettings.source}.csmil/manifest.f4m`,
                    type: 'video/f4m'
                  }, {
                    src: `${MP4_CDN_HOST}/delivery${videoSettings.source.split(',')[0]}${res}.mp4`,
                    type: 'video/mp4'
                  }];

              this.pageLink = (link, obj) => {
                if (typeof addLinkTrackVars === 'undefined') return;
                addLinkTrackVars(keys(obj));
                try {
                  assign(s_md, obj);
                  wmdPageLink(link);
                } finally {
                  remLinkTrackVars(keys(obj));
                }
              };

              vConfig.media.track = map(ccInfo, (path, srcLang) => {
                return {
                  kind: 'captions',
                  type: 'application/ttml+xml',
                  srclang: srcLang.toLowerCase(),
                  src: `${ccFileRoot}${path}`
                };
              });

              vConfig.media.poster = `${imageServer()}/${videoSettings.poster.replace(/^en\//, '')}`;
              this.mediaApi = new VideoApi(`video_player_screen-${iterator}`, vConfig);
              this.mediaApi.init();
              if(!isMobile()){
                this.mediaApi._v.mediaElement.controls = false;
              }
              this.tracking = new SATracking();
              this.mediaApi.setCaptionLanguage('en', true);
              
              this.getPlayerName = function(hostOverride) {
                const hostname = hostOverride || window.location.host,
                  envMap = {
                    'www.medscape.com': 'mscp',
                    'www.qa00.medscape.com': 'mscp',
                    'www.qa01.medscape.com': 'mscp',
                    'www.staging.medscape.com': 'mscp',
                    'www.medscape.org': 'edu',
                    'www.qa00.medscape.org': 'edu',
                    'www.qa01.medscape.org': 'edu',
                    'www.staging.medscape.org': 'edu',
                    'reference.medscape.com': 'ref',
                    'reference.qa00.medscape.com': 'ref',
                    'reference.qa01.medscape.com': 'ref',
                    'education.webmd.com': 'wbmdedu',
                    'education.qa00.webmd.com': 'wbmdedu',
                    'education.qa01.webmd.com': 'wbmdedu',
                    'localhost:8080': 'mscp'
                  },
                  name = envMap[hostname] || 'default';
                return `${name}`;
              };

              this.percentages = {
                [25]: true,
                [50]: true,
                [75]: true
              };

              this.onStarted = () => {
                const isStartOrReplay = !this.hasStarted || this.hasEnded;

                if (typeof brandAdvance2 == 'undefined') {
                    const cur_slide = $(this.mediaApi._v.mediaElement).parents('[data-slide]').data('slide');
                    this.tracking.scene = cur_slide;
                    this.tracking.slide = 'SLIDE' + cur_slide;
                } else {
                    const cur_scene = $(this.mediaApi._v.mediaElement).parents('[data-scene]').data('scene');
                    this.tracking.scene = cur_scene;
                    this.tracking.slide = 'scene-' +cur_scene;
                }

                if (!this.hasStarted) {
                  this.tracking.pamTrack(this.tracking.slide, 'vidsvp-ctl_play');
                }
                if ((isMobile() || isStartOrReplay) && this.hasEnded) {
                  video_completed = true;
                  this.tracking.pamTrack(this.tracking.slide, 'vidsvp-ctl_rep');
                }
                if (isStartOrReplay) {
                  this.hasStarted = true;
                  this.hasEnded = false;
                  this.ended = false;
                  this.tracking.pamTrack(this.tracking.slide, 'vidsvp_start');
                  if(isMobile()){
                    $('.akamai-play').hide();
                  }
                  this.resetDurationTracking();
                  if (this.isFirstPlay) {
                    this.isFirstPlay = false;
                  }
                }
              };

              //this.onCanPlay = () => {};

              /* This is a duplication, the pause tracking is already firing on "onReady"
              this.onPause = () => {
                if (this.mediaApi.getDuration() !== this.mediaApi.getCurrentTime()) {
                  this.tracking.pamTrack(this.tracking.slide, 'vidsvp-ctl_pause');
                }
              };*/

              this.onEnded = () => {
                if(isMobile()){
                  $('.akamai-play').show();
                }
                this.tracking.pamTrack(this.tracking.slide, 'allvideo_100pct');
                this.hasEnded = true;
                this.ended = true;
              };

              this.onReady = () => {
                $('.akamai-controls').remove();
                $('.akamai-replay').remove();
                if(isMobile()){
                  $('.akamai-play').hide();  
                } else {
                  const playerId = `video_player_control-${iterator}`;
                  $(this.mediaApi._v.viewComponent).children('.akamai-error').after('<div class="control-container"></div>');
                  this.mediaApi.viewControlElm = $(this.mediaApi._v.viewComponent).find('.control-container')[0];
                  React.render(React.createElement(PlayerControl,{playerId, iterator}), this.mediaApi.viewControlElm);
                }
                const videoPlayerElement = this.mediaApi._v.getMediaElement();
                $(videoPlayerElement).bind('volumechange', () => {
                  if (this.mediaApi.getVolume() === 0 || videoPlayerElement.muted === true) {
                    this.tracking.pamTrack(this.tracking.slide, 'vidsvp_ctl_mute');
                    this.ismuted = true;
                  } else if (this.ismuted === true) {
                    this.ismuted = false;
                    this.tracking.pamTrack(this.tracking.slide, 'vidsvp_ctl_unmute');
                  }
                });

                videoPlayerElement.addEventListener('play', () => {
                  if (this.hasStarted) {
                    this.tracking.pamTrack(this.tracking.slide, 'vidsvp-ctl_play');
                  }
                });

                videoPlayerElement.addEventListener('pause', () => {
                  this.tracking.pamTrack(this.tracking.slide, 'vidsvp-ctl_pause');
                });

                if(screenfull) {
                  $(document).off(screenfull.raw.fullscreenchange+'.'+this.tracking.slide);
                  $(document).on(screenfull.raw.fullscreenchange+'.'+this.tracking.slide, () => {
                      if(screenfull.isFullscreen) {
                        this.tracking.pamTrack(this.tracking.slide, 'vidsvp-ctl_bigr');
                      } else {
                        this.tracking.pamTrack(this.tracking.slide, 'vidsvp-ctl_smalr');
                      }
                  });
                }
              };

              this.resetDurationTracking = () => {
                this.percentages = {
                  [25]: true,
                  [50]: true,
                  [75]: true
                };
              };

              this.onProgress = () => {
                const percent = (this.mediaApi.getCurrentTime() / this.mediaApi.getDuration()) * 100;
                [25, 50, 75].forEach((i) => {
                  if (percent > i && this.percentages[i]) {
                    video_completed = false;
                    this.percentages[i] = false;
                    this.tracking.pamTrack(this.tracking.slide, 'vidsvp-video' + `${i}pct`, this);
                  }
                });
              };

              this.onScrub = function() {
                this.tracking.pamTrack(this.tracking.slide, 'vidsvp-ctl_scrb');
              };

              this.onBuffering = () => {
              /* This validation is for IE only since on replay it doesn't hide the button on click.We also  */
                let ie = window.navigator.userAgent.indexOf("MSIE ");
                if (ie > 0 || !!navigator.userAgent.match(/Trident.*rv\:11\./)){
                  this.tracking.pamTrack(this.tracking.slide, 'vidsvp-ctl_rep');
                  this.tracking.pamTrack(this.tracking.slide, 'vidsvp-videostart');
                  this.tracking.pamTrack(this.tracking.slide, 'vidsvp-ctl_play');
                }

                if((!this.hasEnded) && (!video_completed)){
                  this.tracking.pamTrack(this.tracking.slide, 'vidsvp-ctl_scrb');
                }
              };

              this.onVolumeChanged = function() {
                // console.log('onVolumeChanged');
              };

              const mediaEvents = {
                  playing: 'onStarted',
                  canplay: 'onCanPlay',
                   paused: 'onPause',
                    ended: 'onEnded',
                    ready: 'onReady',
           durationchange: 'onProgress',
               timeupdate: 'onProgress',
                  seeking: 'onBuffering',
             volumechange: 'onVolumeChanged',
                    scrub: 'onScrub'
              };

              keys(mediaEvents).forEach((event) => {
                this.mediaApi.removeEventListener(event);
              });
              forEach(mediaEvents, (handler, event) => {
                this.mediaApi._v.addEventListener(event, this[handler], this);
                // For debugging:
                // this.mediaApi._v.addEventListener(event, () => console.log('Media Event>', event));
              });
          };
          success(dataVideo, iterator);
        };
    };

    export default player;
