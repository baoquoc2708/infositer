import { keys, forEach,
         reject, defaults } from '_';
import { isIOS }            from 'utils/util';
import $                    from 'jquery';
import screenfull           from 'screenfull';

export default {
  // mappings from Video API events to the event handlers in this
  // store.
  mediaEvents: {
    playing:          'onStarted',
    canplay:          'onCanPlay',
    pause:            'onPause',
    ended:            'onEnded',
    ready:            'onReady', // relying on the video api's custom ready event instead.
    durationchange:   'onProgress',
    timeupdate:       'onProgress',
    seeking:          'onBuffering',
    volumechange:     'onVolumeChanged'
  },
  queued: [],
  removeMediaEvents() {
    keys(this.getEventMappings()).forEach((event) => {
      this.mediaApi.removeEventListener(event);
    });
  },
  addMediaEvents() {
    forEach(this.getEventMappings(), (handler, event) => {
      this.mediaApi.addEventListener(event, this[handler], this);
      // For debugging:
      // this.mediaApi.addEventListener(event, () => console.log('Media Event>', event));
    });
  },
  getEventMappings() {
    return defaults(this.extraMediaEvents || { }, this.mediaEvents);
  },
  // shared agnostic media events
  onCanPlay() {
    this.setState({
      event: 'canplay',
      canPlay: true,
      isBuffering: false,
      isLoading: false
    });
  },
  onEnded() {
    this.state.viewed[this.state.index] = true;
    this.setState({
      isPlaying: false,
      isEnded: true,
      event: 'ended'
    });
  },
  onPause() {
    // Duplicate pause call fix.
    if(this.state.isPlaying) {
      this.mediaApi.pause();
      this.setState({
        isPlaying: false,
        event: 'paused'
      });
    }
  },
  onSeeked() {
    this.setState({
      event: 'seeked'
    });
  },
  onMute() {
    this.onSetVolume(0);
  },
  onUnmute(volume) {
    this.onSetVolume(volume);
  },
  onFullScreen() {
    this._setupFullScreenIdleDetection();
    if(isIOS()) {
      $('#cme-viewport').attr('content', 'minimum-scale=0.75, maximum-scale=0.75');
    }
    if(!screenfull) {
      // no support. IE < 11 or whatever the fuck.
      $('body').addClass('fallback-fullscreen');
    } else if(screenfull.raw) {
      $(document).on(screenfull.raw.fullscreenchange + '.core-video', () => {
        if(!screenfull.isFullscreen) {
          this.onExitFullScreen();
        }
      });
    } else {
      $(document).on('keyup.fs', (e) => {
        if((e.keyCode ? e.keyCode : e.which) === 27) {
          this.onExitFullScreen();
          $('body').removeClass('no-scroll');
        }
      });
    }
    this.setState({
      event: 'fullScreen',
      isFullScreen: true
    });
  },
  onExitFullScreen() {
    this._clearFullScreenIdleDetection();
    if(isIOS()) {
      $('#cme-viewport').attr('content', 'minimum-scale=0.75, maximum-scale=1.6');
    }
    if(!screenfull) {
      $('body').removeClass('fallback-fullscreen');
    } else if(screenfull.raw) {
      $(document).off(screenfull.raw.fullscreenchange + '.core-video');
    } else {
      $(document).off('keyup.fs');
    }
    this.setState({
      event: 'exitFullScreen',
      isFullScreen: false
    });
  },
  enqueue(method) {
    const last = this.queued[this.queued.length-1];
    if(last && last[0] === method) {
      this.queued = reject(this.queued, call => call[0] !== method);
    }
    this.queued.push([method, [].slice.call(arguments, 1)]);
  },
  dequeue() {
    this.queued.forEach((call) => {
      setTimeout(() => {
        this[call[0]].apply(this, call[1]);
      }, 500);
    });
    this.queued = [ ];
  },
  clearQueue(method) {
    this.queued = reject(this.queued, call => call[0] === method);
  },
  _setupFullScreenIdleDetection() {
    this.idleTimeoutId = setTimeout(() => {
      if($('.cme-qna:first').hasClass('is-visible')) {
        this.setState({ isMouseIdle: false });
      } else {
        this.setState({ isMouseIdle: true });
      }
    }, 3000);
    $(document).on('mousemove.idle', () => {
      this._clearFullScreenIdleDetection();
      if(this.state.isFullScreen) {
        $(document).off('mousemove.idle');
        this._setupFullScreenIdleDetection();
      }
    });
  },
  _clearFullScreenIdleDetection() {
    clearTimeout(this.idleTimeoutId);
    $(document).off('mousemove.idle');
    this.setState({ isMouseIdle: false });
  },
  // shared utility methods
  isReady() {
    return this._isReady;
  },
  isPlayingOrLoading() {
    return !this._isReady || (this.state.isPlaying || this.state.isLoading || this.state.isBuffering);
  },
};
