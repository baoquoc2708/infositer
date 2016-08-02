import Reflux          from 'reflux';
import $               from 'jquery';
import { isIOS,  isIpad,
       isMobile }      from 'utils/util';
import StoreState      from 'mixins/store_state';
import MediaStore      from 'mixins/media_store';
import VideoActions    from 'actions/video_actions';
import DescriptorStore from 'stores/descriptor_store';
import RoadBlockStore  from 'stores/roadblock_store';

export default Reflux.createStore({
  listenables: [ VideoActions ],
  mixins: [ StoreState, MediaStore ],
  stateNamespace: 'audio',
  extraEvents: {
    playing: 'onStarted'
  },
  getInitialState() {
    return { isAudio: true };
  },
  onBuffering() {
    this.setState({
      event: 'buffering',
      isBuffering: true
    });
  },
  onWaiting() {
    this.setState({
      event: 'waiting',
      isBuffering: true
    });
  },
  onLoad() {
    if(!DescriptorStore.isAudio()) {
      this.stopListeningToAll(VideoActions);
      this.isInactive = true;
      return;
    }
    this.mediaApi   = document.getElementById('audio-player');
    this.addMediaEvents();
    this._isReady   = true;
    const meta      = DescriptorStore.getAudio(0);
    this.setState({
      meta,
      event: 'ready',
      viewed: { },
      index: 0,
      api: this.mediaApi,
      isLoading: false,
      isBuffering: false,
      isPlaying: false,
      currentTime: 0,
      volume: (this.mediaApi.volume = 0.75),
      duration: this.mediaApi.duration || meta.duration
    });
    $(this.mediaApi).on('timeupdate', ()=> {
      const roadBlockedTime = RoadBlockStore.getRoadBlockedTime();
      if(this.mediaApi.currentTime > roadBlockedTime) {
        this.mediaApi.currentTime = roadBlockedTime;
        for(let i =0; i < this.mediaApi.buffered.length; i++) {
          if (this.mediaApi.buffered.start(i) <= roadBlockedTime &&
              roadBlockedTime <= this.mediaApi.buffered.end(i)) {
            window.trackingEnabled = false;
            this.onPause();
          }
        }
      }
    });
    if(meta.autoplay && !isIOS()) {
      this.onStart();
    }
  },
  onDeleteQna(qaidFormPage) {
    const newQnas = this.state.meta.qna.filter((qna)=> {
      return qna.qaidFormPage !== qaidFormPage;
    });
    let newMeta = JSON.parse(JSON.stringify(this.state.meta));
    newMeta.qna = newQnas;
    this.setState({
      meta: newMeta
    });
  },
  onStart() {
    this.setState({
      event: 'start',
      hasStarted: true,
      isLoading: true,
      isEnded: false,
      canPlay: false
    });
    this.mediaApi.play();
    if(isIpad() && this.state.pushedTime > 0) {
      this.mediaApi.currentTime = this.state.pushedTime;
    }
  },
  onStarted() {
    this.setState({
      event: 'play',
      isPlaying: true,
      isLoading: false,
      isEnded: false,
      hasStarted: true,
      currentVolume: this.mediaApi.volume
    });
  },
  onReplay() {
    window.trackingEnabled = false;
    this.mediaApi.play();
    // this is needed for IE 11 (for some reason, it doesn't pick up isPlaying from the `started` event)
    this.setState({
        event: 'play',
        isPlaying: true,
        isLoading: false,
        isEnded: false,
        hasStarted: true,
        currentVolume: this.mediaApi.volume
    });
  },
  onProgress() {
    const { pushedTime } = this.state;
    this.setState({
      event:       'progress',
      isBuffering: false,
      isLoading:   false,
      pushedTime:  null,
      currentTime: pushedTime? pushedTime : this.mediaApi.currentTime,
      duration:    this.mediaApi.duration,
      roadblockedTime: RoadBlockStore.getRoadBlockedTime()
    });
  },
  exitFullScreenMobile() {
    if(!isIpad() && isMobile()) {
      VideoActions.exitFullScreen();
    }
  },
  onSetCurrentTime(time) {
    if(isNaN(time)) {
      return;
    }
    this.mediaApi.currentTime = time;
    this.setState({
      event: 'settingTime',
      pushedTime: time,
      currentTime: time
    });
  },
  onMute() {
    this.onSetVolume(0);
  },
  onUnmute(volume) {
    this.onSetVolume(volume);
  },
  onSetVolume(volume) {
    this.mediaApi.volume = volume;
  },
  onVolumeChanged() {
    this.setState({
      event: 'volumeChanged',
      currentVolume: this.mediaApi.volume
    });
  }
});
