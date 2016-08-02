import Reflux       from 'reflux';
import StoreState   from 'mixins/store_state';
import SegmentStore from 'mixins/segment_store';
import QuizActions  from 'actions/quiz_actions';
import VideoStore   from 'stores/video_store';

export default Reflux.createStore({
  mixins: [ StoreState, SegmentStore ],
  stateNamespace: 'qnas',
  segmentProperty: 'qna',
  segmentKey: 'question',
  init() {
    this.listenTo(VideoStore, this.onVideoChange);
  },
  onVideoChange(videoObj) {
    if(videoObj.video.event === 'settingTime' &&
        this.lastCurrentTime > videoObj.video.currentTime) {
      QuizActions.reset();
    }
    this.lastCurrentTime = videoObj.video.currentTime;
  }
});
