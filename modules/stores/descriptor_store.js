import Reflux                     from 'reflux';
import DescriptorActions          from 'actions/descriptor_actions';
import Compiler                   from 'descriptor/compiler';
import StoreState                 from 'mixins/store_state';
import HasPrettyTime              from 'mixins/has_pretty_time';


export default Reflux.createStore({
  mixins: [ StoreState, HasPrettyTime ],
  listenables: DescriptorActions,
  stateNamespace: 'descriptor',
  defaultVideoOptions: {
    shouldShowControlsDesktop: true,
    shouldShowNativeControlsMobile: true,
    shouldAutoPlay: false,
    watermark: null
  },
  onLoadCompleted(descriptor) {
    this.compile(descriptor);
  },
  onLoadFailed() {
    console.error('ERROR: Failed to load descriptor', arguments[0].statusText);
    this.setState({
      error: arguments
    });
  },
  onLoadJSON(descriptor) {
    this.compile(descriptor);
  },
  getTitle(index) {
    return this.state.videos[index].title;
  },
  getDescriptor() {
    return this.state;
  },
  isVideo() {
    return this.state.isVideo;
  },
  isAudio() {
    return this.state.isAudio;
  },
  getVideo(index) {
    return this.state.videos[index];
  },
  getAudio(index) {
    return this.state.audios[index];
  },
  getVideoCount() {
    return this.state.videos.length;
  },
  compile(descriptor) {
    const compiler = new Compiler(descriptor);
    compiler.compile();
    this.setState(compiler.getDescriptor());
  }
});
