import VideoStore   from 'stores/video_store';
import VideoActions from 'actions/video_actions';
import { isIOS }    from 'utils/util';

export default {
  toggle(e) {
    if(VideoStore.isPlaying()) {
      this.stop(e);
    } else {
      this.start(e);
    }
  },
  stop(e) {
    e.stopPropagation();
    e.preventDefault();
    VideoActions.pause();
  },
  start(e) {
    e.stopPropagation();
    e.preventDefault();
    const media = this.state.video || this.state.audio;
    if(media.event === 'ended') {
      VideoActions.replay();
    } else {
      if(isIOS()) {
        // KILL ME. This is to get around iOS horseshit.
        // The indirection of:
        // VideoActions.start() => VideoStore.onStart() => videoApi.play()
        // makes it appear that the click event isn't driving the
        // `play` call, so we have to grab the api and call it
        // directly here.
        media.api.play();
      } else {
        VideoActions.start();
      }
    }
  }
};
