import Reflux from 'reflux';
import StoreState from 'mixins/store_state';
import VideoStore from 'stores/video_store';
import AudioStore from 'stores/audio_store';

export default Reflux.createStore({
  listenables: [ ],
  mixins: [ StoreState ],
  stateNamespace: 'tick',
  init() {
    this.listenTo(VideoStore, this.onVideoChange.bind(this));
    this.listenTo(AudioStore, this.onAudioChange.bind(this));
  },
  getInitialState() {
    return { };
  },
  onVideoChange(state) {
    const { event } = state.video;
    if(event === 'progress' || event === 'ready' || event ==='settingTime') {
      this.setState(state.video);
    }
  },
  onAudioChange(state) {
    const { event } = state.audio;
    if(event === 'progress' || event === 'ready' || event ==='settingTime') {
      this.setState(state.audio);
    }
  }
});
