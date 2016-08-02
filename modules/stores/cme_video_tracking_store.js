/* eslint camelcase: 0 */
/* global screenfull, ADB, s_pageview_id, s_md, wmdSetContext, remLinkTrackVars, addLinkTrackVars */
import Reflux                            from 'reflux';
import { debounce, camelCase,
         defaults, assign, get }         from '_';
import { isMobile, isIOS, isIpad }       from 'utils/util';
import TrackingActions                   from 'actions/cme_tracking_actions';
import CMETracking                       from 'mixins/cme_tracking';
import VideoStore                        from 'stores/video_store';
import TOCStore                          from 'stores/toc_store';
import DescriptorStore                   from 'stores/descriptor_store';
import $                                 from 'jquery';
import HBT                               from 'heartbeat';
import HasPrettyTime                     from 'mixins/has_pretty_time';
import 'babel-polyfill';

export default Reflux.createStore({
  listenables: [ TrackingActions ],
  mixins: [ CMETracking, HasPrettyTime],
  playerPrefix: 'video',
  isFirstPlay: true,
  isWaiting: false,
  hasStarted: false,
  hasEnded: false,
  init() {
    this.contextDataVars = [
      'contextData.a.contentType',
      'contextData.a.media.name',
      'contextData.a.media.length',
      'contextData.a.media.channel',
      'contextData.a.media.view',
      'contextData.a.media.ad.name',
      'contextData.a.media.ad.podFriendlyName',
      'contextData.a.media.ad.length',
      'contextData.a.media.ad.pod',
      'contextData.a.media.ad.podPosition',
      'contextData.a.media.ad.podSecond',
      'contextData.a.media.ad.CPM',
      'contextData.a.media.ad.view'
    ];
    this.setupGlobals();
    this.listenTo(VideoStore, this.onVideoChange.bind(this));
    this.listenTo(DescriptorStore, this.onDescriptorLoad.bind(this));
    this.listenTo(TOCStore, this.onTOCChange.bind(this));
    window.trackingEnabled = true;
    if(get(DescriptorStore, 'state.config.articleId', false)) {
        if(typeof wmdSetContext !== 'undefined' && typeof remLinkTrackVars !== 'undefined') {
          wmdSetContext('wb.chn', this.getWBChn());
        }
      this.playerName   = this.getPlayerName().replace(/\s/, '');
      this.friendlyName = DescriptorStore.state.config.articleId;
    }
    if(!DescriptorStore.isVideo()) {
      this.stopListeningToAll(TrackingActions);
      return;
    }
  },
  onDescriptorLoad() {
  },
  onVideoChange(state) {
    const { event } = state.video,
            handler = camelCase(`on_${event}`);
    if(this[handler]) {
      this[handler](state.video);
    }
  },
  onTOCChange(state) {
    const { chapter, lastChapter } = state.toc;
    assign(this, state.toc);
    if(lastChapter && this.hasStarted) {
      this.VideoPlayerPlugin.trackChapterComplete();
    }
    if(chapter && this.hasStarted && lastChapter) {
      if(this.currentChapter.index !== chapter.index) {
        this.VideoPlayerPlugin.trackChapterStart();
      }
    }
    this.currentChapter = chapter;
  },
  onPlay(state) {
    const { autoplay }    = state.meta,
          isStartOrReplay = !this.hasStarted || this.hasEnded;
    wmdSetContext('wb.playername', this.playerName);
    addLinkTrackVars('wb.playername');
    wmdSetContext('wb.friendlyname', this.friendlyName);
    addLinkTrackVars('wb.friendlyname');
    if(!autoplay && !this.hasStarted) {
      this._metrics('ctl_play');
    }
    if(isMobile() || isStartOrReplay) {
      if(this.hasEnded) {
        this._metrics('rep');
      } else if(!(autoplay && this.isFirstPlay)) {
        // this._metrics('ctl_play');
      }
    } else {
      if(!(autoplay && this.isFirstPlay)) {
        // this._metrics('ctl_play');
      }
    }

    // hasStarted is set only once on the first play. Once it's true it remains that way
    // hasEnded is reset to `false` at the beginning of every play and set to `true` onEnded.
    //
    // This allows us to trigger the appropriate call on the first play (e.g. replay or play)
    // But handle video replays as well.
    if(isStartOrReplay) {
      if(this.isFirstPlay) {
        this.initHeartbeat(state);
        this.isFirstPlay = false;
      }
      this.setupHeartbeatContextAndTrackLoad();
      this.hasStarted = true;
      this.hasEnded   = false;
      wmdSetContext('wb.vdname', get(DescriptorStore, 'state.config.articleId', 'null'));
      addLinkTrackVars('wb.vdname');
      remLinkTrackVars('wb.playername');
      remLinkTrackVars('wb.friendlyname');
      this._metrics('start', { prop9: 'allvideo_start' }, '_');
      wmdRemContext('wb.vdname');
      remLinkTrackVars('wb.vdname');
      addLinkTrackVars('wb.playername');
      addLinkTrackVars('wb.friendlyname');
      this.resetDurationTracking();
      if(this.chapter) {
        this.VideoPlayerPlugin.trackChapterStart();
      }
    }
    this.VideoPlayerPlugin.trackPlay();
  },
  onPaused(state) {
    // this is getting triggered at the end of the vid.
    if(state.duration !== state.currentTime) {
      this.VideoPlayerPlugin.trackPause();
    }
  },
  onEnded() {
    if(this.hasEnded !== true) {
      wmdSetContext('wb.vdname', get(DescriptorStore, 'state.config.articleId', 'null'));
      addLinkTrackVars('wb.vdname');
      remLinkTrackVars('wb.playername');
      remLinkTrackVars('wb.friendlyname');
      this._metrics('100pct', { prop9: 'allvideo_100pct' }, '_');
      wmdRemContext('wb.vdname');
      remLinkTrackVars('wb.vdname');
      addLinkTrackVars('wb.playername');
      addLinkTrackVars('wb.friendlyname');
      if(this.chapter) {
        this.VideoPlayerPlugin.trackChapterComplete();
      }
      this.VideoPlayerPlugin.trackComplete();
      this.VideoPlayerPlugin.trackVideoUnload();
      this.resetDurationTracking();
      this.hasEnded = true;
    }
    window.trackingEnabled = false;
  },
  onClosedCaption(isOpen) {
    if(isOpen) {
      this._metrics('ctl_ccy');
    } else {
      this._metrics('ctl_ccn');
    }
  },
  onBuffering() {
    this.VideoPlayerPlugin.trackSeekStart();
  },
  onSeeked() {
    this.VideoPlayerPlugin.trackSeekComplete();
  },
  onWaiting() {
    this.isWaiting = true;
    this.VideoPlayerPlugin.trackBufferStart();
  },
  onVolumeChanged(state) {
    const { currentVolume } = state;
    if(this.prevVolume !== currentVolume) {
      if(currentVolume === 0) {
        this.isMuted = true;
        this._metrics('ctl_mute');
      } else if(this.isMuted) {
        this.isMuted = false;
        this._metrics('ctl_unmute');
      }
    }
    this.prevVolume = currentVolume;
  },
  onProgress(state) {
    const { currentTime, duration } = state,
                            percent = (currentTime / duration) * 100;

    [25, 50, 75 ].forEach((i) => {
      if(percent > i && this.percentages[i]) {
        this.percentages[i] = false;
        wmdSetContext('wb.vdname', get(DescriptorStore, 'state.config.articleId', 'null'));
        addLinkTrackVars('wb.vdname');
        remLinkTrackVars('wb.playername');
        remLinkTrackVars('wb.friendlyname');
        this._metrics(`${i}pct`, {}, '_');
        wmdRemContext('wb.vdname');
        remLinkTrackVars('wb.vdname');
        addLinkTrackVars('wb.playername');
        addLinkTrackVars('wb.friendlyname');
      }
    });

    if(this.isWaiting) {
      this.isWaiting = false;
      this.trackBufferComplete();
    }
    if(percent === 100) {
      window.trackingEnabled = false;
    }
  },
  /**
   * @param action {string} - one of 'prev', 'next', 1-based video index,
   *     or 'prev2', 'next2' for link text rather than video image click.
   */
  onPlaylistNavigate(action) {
    // TODO: throw error on bad action
    const name = isMobile()? `ctl_vidlist2_${action}` : `ctl_show_${action}`;
    this._metrics(name);
  },
  // these get hammered by multiple events but need to behave idempotently
  onFullScreen() {
    if(!this.isFullScreen) {
      this.isFullScreen = true;
      this._metrics('ctl_bigr');
    }
  },
  onExitFullScreen() {
    if(this.isFullScreen) {
      this.isFullScreen = false;
      this._metrics('ctl_smalr');
    }
  },
  resetDurationTracking() {
    this.percentages = { [25]: true, [50]: true, [75]: true };
  },
  /**
   * @param name    - the link name, to be appended to `vidcme`
   * @param options - props to be passed through to the beacon, e.g. prop9, etc. . .
   * @param sep     - due to inconsistencies in the tracking spec, some values are
   *                  separated by a hyphen and others by an underscore. This is
   *                  appears to be arbitrary.
   */
  _metrics(name, options={ }, sep='-') {
    if(remLinkTrackVars && s_md.linkTrackVars.indexOf('a.media') !== -1) {
      remLinkTrackVars(this.contextDataVars.toString());
    }
    const opts = defaults(options, { prop24: s_pageview_id || '' }),
          link = `vidcme${sep}${name}`;
    this.pageLink(link, opts);
  },

  initHeartbeat(state) {
    if(typeof HBT.ADB === 'undefined' || typeof s_md === 'undefined') {
      return;
    }
    // Map values to make code readable;
    const { plugins, HeartbeatDelegate, HeartbeatConfig, Heartbeat } = HBT.ADB.va,
          { AdobeAnalyticsPluginConfig, AdobeAnalyticsPluginDelegate, AdobeAnalyticsPlugin } = plugins.aa,
          { AdobeHeartbeatPluginConfig, AdobeHeartbeatPluginDelegate, AdobeHeartbeatPlugin } = plugins.ah,
          { VideoPlayerPluginConfig, VideoPlayerPluginDelegate, VideoPlayerPlugin, VideoInfo, ChapterInfo } = plugins.videoplayer,
          { api } = state;

    const analyticsPluginConfig     = new AdobeAnalyticsPluginConfig(),
          analyticsPluginDelegate   = new AdobeAnalyticsPluginDelegate(),
          analyticsPlugin           = new AdobeAnalyticsPlugin(s_md, analyticsPluginDelegate),

          heartbeatPluginConfig     = new AdobeHeartbeatPluginConfig('http://heartbeats.omtrdc.net', 'sc_va', 'webmd'),
          heartbeatPluginDelegate   = new AdobeHeartbeatPluginDelegate(),
          heartbeatPlugin           = new AdobeHeartbeatPlugin(heartbeatPluginDelegate),

          heartbeatConfig           = new HeartbeatConfig(),
          heartbeatDelegate         = new HeartbeatDelegate(),

          videoPlayerPluginConfig   = new VideoPlayerPluginConfig(),
          videoPlayerPluginDelegate = new VideoPlayerPluginDelegate(VideoStore.mediaApi._v.getMediaElement());
          this.VideoPlayerPlugin    = new VideoPlayerPlugin(videoPlayerPluginDelegate);


      // Update Configs
      if (typeof s_md.prop47 !== 'undefined') {
        analyticsPluginConfig.channel      = s_md.prop47;
        analyticsPluginConfig.playerName   = this.getPlayerName();
        analyticsPluginConfig.friendlyName = DescriptorStore.state.config.articleId;
        analyticsPluginConfig.debugLogging = true;
      }
      heartbeatPluginConfig.sdk = 'Heartbeats V-1.5.4';
      analyticsPlugin.setVideoMetadata({
                 chn: this.getWBChn(),
                  rs: s_md.prop50 || '',
                site: 'cme',
             dprofsn: s_md.prop19 || '',
             dspclty: s_md.prop38 || '',
               regid: s_md.prop47 || '',
              dcntry: s_md.prop37 || ''
      });
      analyticsPluginConfig.debugLogging   = true;
      heartbeatPluginConfig.debugLogging   = false;
      heartbeatConfig.debugLogging         = false;
      videoPlayerPluginConfig.debugLogging = false;
      heartbeatPluginConfig.quietMode      = false;


    videoPlayerPluginDelegate.getVideoInfo = () => {
      const info        = new VideoInfo;
      info.id           = DescriptorStore.state.config.articleId;
      info.playerName   = this.getPlayerName().replace(/\s/, '');
      info.length       = api.duration || state.meta.duration;
      info.streamType   = 'vod';
      info.playhead     = api.getCurrentTime() || 0;
      info.name         = DescriptorStore.state.config.articleId;
      info.friendlyName = DescriptorStore.state.config.articleId;
      return info;
    };
    if(this.chapters) {
      for(const chapter of this.chapters) {
        const chapterIndex = chapter.index + 1,
              chapterInfo  = this[`chapter-${chapterIndex}-start`] = new ChapterInfo();

        if(this.secondsFromPrettyTime(chapter.endTime) > 362000) {
          chapterInfo.length  = (api.duration || state.meta.duration) - this.secondsFromPrettyTime(chapter.startTime);
        } else {
          chapterInfo.length  = this.secondsFromPrettyTime(chapter.endTime) - this.secondsFromPrettyTime(chapter.startTime);
        }
        chapterInfo.startTime = this.secondsFromPrettyTime(chapter.startTime);
        chapterInfo.position  = chapterIndex;
        chapterInfo.name      = `hb-${this.getPlayerName()}-chapter${chapterIndex}`;
      }
    }
    videoPlayerPluginDelegate.getChapterInfo = () => {
      return this[`chapter-${this.chapter.index+1}-start`];
    };


    // configure  plugins
    heartbeatPlugin.configure(heartbeatPluginConfig);
    analyticsPlugin.configure(analyticsPluginConfig);
    this.VideoPlayerPlugin.configure(videoPlayerPluginConfig);
    this.heartbeat = new Heartbeat(heartbeatDelegate, [this.VideoPlayerPlugin, analyticsPlugin, heartbeatPlugin]);
    this.heartbeat.configure(heartbeatConfig);

    $(window).on('beforeunload', () => {
      this.VideoPlayerPlugin.trackVideoUnload();
      this.VideoPlayerPlugin.destroy();
    });
    $(VideoStore.mediaApi._v.getMediaElement()).bind('pause', ()=> {
      if(window.trackingEnabled) {
        this._metrics('ctl_pause');
      } else {
        window.trackingEnabled = true;
      }
    });
    $(VideoStore.mediaApi._v.getMediaElement()).bind('play', ()=> {
      if(window.trackingEnabled) {
        this._metrics('ctl_play');
      } else {
        window.trackingEnabled = true;
      }
    });
    if(screenfull) {
      $(VideoStore.mediaApi._v.getMediaElement()).bind(screenfull.raw.fullscreenchange, () => {
        if(screenfull.isFullscreen) {
          this._metrics('ctl_bigr');
        } else {
          this._metrics('ctl-smalr');
        }
      });
    }
    $(VideoStore.mediaApi._v.getMediaElement()).bind('webkitendfullscreen', ()=> {
      // what is this doing here? idk. Dom manipulations outside of component did update. Should be moved somewhere else.
      $('body').removeClass('no-scroll');
      // this._metrics('ctl-smalr');
    });
    $(VideoStore.mediaApi._v.getMediaElement()).bind('webkitbeginfullscreen', ()=> {
      //
    });
    if(isMobile() && isIOS() && !isIpad()) {
      const scrubTracker = debounce(()=> {
        this._metrics('ctl_scrb');
      }, 2000);
      $(VideoStore.mediaApi._v.getMediaElement()).on('seeking', ()=> {
        scrubTracker();
      });
    }
  },
  onScrub() {
    this._metrics('ctl_scrb');
  },
  setupHeartbeatContextAndTrackLoad() {
    if(typeof addLinkTrackVars === 'undefined') return;
    // taken from video-metrics.js
    addLinkTrackVars(this.contextDataVars.toString());
    this.VideoPlayerPlugin.trackVideoLoad();
    remLinkTrackVars(this.contextDataVars.toString());
  }
});
