/* global define BASE_PLUGIN_URL BASE_AMP_URL screenfull */
import { extend, throttle }  from '_';
import $                     from 'jquery';
import Reflux                from 'reflux';
import { isMobile, isIpad,
        envCheck, isLocal }  from 'utils/util';
import VideoApi              from 'video/video-api';
import videoConfig           from 'video/config';
import MediaStore            from 'mixins/media_store';
import StoreState            from 'mixins/store_state';
import VideoActions          from 'actions/video_actions';
import DescriptorStore       from 'stores/descriptor_store';
import RoadBlockStore        from 'stores/roadblock_store';
import HasPrettyTime         from 'mixins/has_pretty_time';

export default Reflux.createStore({
  listenables: VideoActions,
  mixins: [ StoreState, MediaStore, HasPrettyTime ],
  stateNamespace: 'video',
  queued: [ ],
  getInitialState() {
    return {
      isVideo: true
    };
  },
  onLoad(elementId, video) {
    if(!DescriptorStore.isVideo()) {
      this.stopListeningToAll(VideoActions);
      this.isInactive = true;
      return;
    }
    const descriptor = DescriptorStore.getDescriptor(),
        index      = descriptor.initialIndex,
        ampPath    = '/amp-premier/',
        pluginPath = `${ampPath}plugins/`,
        ampURL     = isLocal()? ampPath : `http://img${envCheck()}.medscape.com/pi/core${ampPath}`,
        pluginURL  = isLocal()? pluginPath : `http://img${envCheck()}.medscape.com/pi/core${pluginPath}`,
        watermark  = descriptor.watermark ? descriptor.watermark:'',
        configMode = 'html', // isIpad() ? 'html' : 'auto',
        config     = extend(videoConfig(pluginURL, ampURL), {
          media: video,
          debug: false,
          autoplay: video.autoplay,
          controls: {
            'native': isMobile(),
             mode: isMobile() ? 'auto' : 'none'
          },
          branding: {
            id: 'logo',
            logo: watermark
          },
          playoverlay: { enabled: true  },
          captioning:  { enabled: true  },
          webmd: {
            chapterData: descriptor.videos[index].chapters
          },
          mode: configMode // html for testing
        });
    config.flash        = config.flash || { };
    config.flash.params = { wmmode: 'transparent' };
    if(this.mediaApi) {
      this.removeMediaEvents();
      this.mediaApi.destroy();
    }
    this.mediaApi = new VideoApi(elementId, config);
    this.mediaApi.init(() => {
      // autoplay if configed or if the starting video is not the
      // first in the chapter list.
      this.mediaApi._v.setAutoplay(config.autoplay && !this.state.stopAutoplay);
      this.addMediaEvents();
    });
    this.mediaApi.ready(this.onReady.bind(this));
    this.setState({
      index: index,
      event: 'loading',
      isLoading: false,
      viewed: { },
      playerType: this.mediaApi._v.getPlayerType()
    });
    const videoElement = this.mediaApi._v.getMediaElement();
    $(videoElement).on('timeupdate', ()=> {
      const roadBlockedTime = RoadBlockStore.getRoadBlockedTime();
      if(videoElement.currentTime > roadBlockedTime) {
        videoElement.currentTime = roadBlockedTime;
        for(let i =0; i < videoElement.buffered.length; i++) {
          if (videoElement.buffered.start(i) <= roadBlockedTime &&
              roadBlockedTime <= videoElement.buffered.end(i)) {
            window.trackingEnabled = false;
            this.onPause();
            this.exitFullScreenMobile();
          }
        }
      }
    });
    // DEBUG REMOVEME
    // window.mediaApi = this.mediaApi;
  },
  exitFullScreenMobile() {
    if(!isIpad() && isMobile()) {
      this.mediaApi.exitFullScreen();
    }
  },
  onReady() {
    const meta = DescriptorStore.getVideo(this.state.index);
    this._isReady = true;
    this.setState({
      api: this.mediaApi,
      event: 'ready',
      isLoading: false,
      isBuffering: false,
      isPlaying: false,
      currentTime: this.mediaApi.getCurrentTime(),
      duration:   meta.duration || this.mediaApi.getDuration() || 0,
      meta: meta,
      isCaptioningOn: meta.enableCcAutoDisplay,
      ccLang: meta.ccDefaultLang,
      playerType: this.mediaApi._v.getPlayerType()
    });
    this.dequeue();
  },
  onStopAutoplay() {
    this.setState({
      stopAutoplay: true
    });
  },
  onSelectVideo(video, index) {
    if(!this._isReady) {
      this.enqueue('onSelectVideo', video, index);
      return;
    }
    this.mediaApi.setMedia(video);
    this.setState({
      index: index,
      meta: video,
      isPlaying: true,
      isLoading: false,
      isEnded: false,
      event: 'videoSelected'
    });
  },
  setVideoTime: throttle((newTime, mediaApi)=> {
      mediaApi.setCurrentTime(newTime);
    }, 500,  {
    'leading': true,
    'trailing': false
  }),
  onSetCurrentTime(time) {
    if(isIpad() && !this.state.hasStarted) {
      this.mediaApi.play();
    }
    const roadBlockedTime = RoadBlockStore.getRoadBlockedTime(),
      meta = DescriptorStore.getVideo(this.state.index),
      newTime = (time > roadBlockedTime) ? roadBlockedTime : time;
    this.clearQueue('onSetCurrentTime');
    this.setVideoTime.call(this, newTime, this.mediaApi);
    if(!this.state.isPlaying) {
      this.enqueue('onSetCurrentTime', newTime);
      this.setState({
        event: 'settingTime',
        pushedTime: newTime,
        currentTime: newTime,
        isLoading: true,
        duration: meta.duration
      });
      return;
    }
    // on the first load of a video, the duration isn't set and
    // setting the current time doesn't work until the player has
    // started. Because Akamai makes shitty, fragile APIs. This also
    // has the effect of setting the time optimistically. `pushedTime`
    // is cleared by the progress event.
    this.setState({
      event: 'settingTime',
      pushedTime: newTime,
      currentTime: newTime,
      isLoading: true,
      duration:    this.mediaApi.getDuration()
    });
  },
  // NB: the _ignored event is an artefact of the inexplicable case of
  // the video api using jQuery to wrap the Akamai player's
  // addEventListener method. As is the preposterous dereference chain:
  //
  //    event.detail.originalEvent.data.time
  //
  // which, in a sane world, would have been:
  //
  //    event.data.time
  onBuffering() {
    /*
    let seekTarget = 0;
    if(!isIOS()) {
      seekTarget = event.detail.originalEvent.data? event.detail.originalEvent.data.time : 0;
    }
    console.log(seekTarget);
    this.setState({
      event: 'buffering',
      isBuffering: true,
      seekTarget: seekTarget
    });
    */
  },
  onDeleteQna(qaidFormPage) {
    const newQnas = this.state.meta.qna.filter((qna)=> {
      return qna.qaidFormPage !== qaidFormPage;
    }),
    newMeta = JSON.parse(JSON.stringify(this.state.meta));
    newMeta.qna = newQnas;
    this.setState({
      meta: newMeta
    });
  },
  onProgress() {
    this.setState({
      event:       'progress',
      isBuffering: false,
      isLoading:   false,
      hasStarted:  true,
      // WARNING: this is commented out because the video api sends a
      // bogus 'progress' event after the video has been paused.
      // Don't set isPlaying to true inside this setState call.
      // isPlaying:   true, <---- don't do this.
      // Hopefully that will save you some debugging time in the future.
      pushedTime:  null,
      currentTime: this.mediaApi.getCurrentTime(),
      duration:    this.mediaApi.getDuration(),
      roadblockedTime: RoadBlockStore.getRoadBlockedTime()
    });
  },
  onSetVolume(volume) {
    this.mediaApi._v.setVolume(volume);
  },
  onVolumeChanged() {
    this.setState({
      event: 'volumeChanged',
      currentVolume: this.mediaApi.getVolume()
    });
  },
  onMute() {
    this.onSetVolume(0);
  },
  onUnmute(volume) {
    this.onSetVolume(volume);
  },
  onSetClosedCaptioning(turnOn) {
    if(turnOn) {
      this.mediaApi.setCaptionLanguage(this.state.ccLang, true);
      this.mediaApi.turnClosedCaptionOn();
    } else {
      this.mediaApi.setCaptionLanguage('', false);
      this.mediaApi.turnClosedCaptionOff();
    }
    this.setState({
      isCaptioningOn: turnOn
    });
  },
  onSelectLanguage(lang) {
    if(lang !== '') {
      this.mediaApi.setCaptionLanguage(lang, true);
      this.setState({
        ccLang:lang,
        isOpen:false
      });
    } else {
      this.setState({
        ccLang:lang,
        isOpen:false
      });
    }
  },
  onEnd() {
    this.mediaApi.end();
  },
  onEnded() {
    this.state.viewed[this.state.index] = true;
    this.setState({
      isPlaying: false,
      isEnded: true,
      event: 'ended'
    });
  },
  onReplay() {
    window.trackingEnabled = false;
    this.mediaApi.replay();
    // the duration gets wiped after the video ends so we have to go back to the config.
    this.setState({
      isPlaying: true,
      duration: this.getDuration(true),
      hasStarted: true, // always true after the first start
      isEnded: false,
      canPlay: false
    });
  },
  onStart() {
    this.mediaApi.play();
    if(!this._isReady) {
      this.enqueue('onStart');
      return;
    }
    this.setState({
      event: 'start',
      isPlaying: true,
      hasStarted: true, // always true after the first start
      isLoading: true,
      isEnded: false,
      canPlay: false
    });
  },
  onStarted() {
    this.dequeue();
    this.setState({
      isPlaying: true,
      isLoading: false,
      isEnded: false,
      event: 'play',
      hasStarted: true,
      currentVolume: this.mediaApi.getVolume()
    });
    if(this.state.isCaptioningOn) {
      this.mediaApi.setCaptionLanguage(this.state.ccLang, true);
      this.mediaApi.turnClosedCaptionOn();
    }
  },
  onToggle() {
    if(this.isPlaying()) {
      this.onPause();
    } else {
      this.onStart();
    }
  },
  /* accessors */
  isPlaying() {
    return this.state.isPlaying;
  },
  getCurrentTime() {
    if(!this._isReady) return 0;
    return this.mediaApi.getCurrentTime();
  },
  getDuration(force) {
    if(force || !this._isReady) return DescriptorStore.getVideo(0).duration;

    return this.mediaApi.getDuration();
  },
  getTitle() {
    return DescriptorStore.getTitle(this.state.index);
  },
  getVersion() {
    return 'Medscape/AMP';
  }
});
