import VideoActions from 'actions/video_actions';
import VideoStore from 'stores/video_store';
import AudioStore from 'stores/audio_store';

export default {
  setCurrentTime(time) {
    const Store        = VideoStore.isInactive? AudioStore : VideoStore;
    if(Store.state.isEnded) { // desktop
      VideoActions.replay();
    }
    VideoActions.setCurrentTime(time);
  }
};
