import Reflux          from 'reflux';
import { merge }       from '_';
import StoreState      from 'mixins/store_state';
import SegmentStore    from 'mixins/segment_store';
import SlideActions    from 'actions/slide_actions';

export default Reflux.createStore({
  listenables: [ SlideActions ],
  mixins: [ StoreState, SegmentStore ],
  segmentProperty: 'slides',
  segmentKey:      'slide',
  stateNamespace:  'slides',

  onLoadSlide() {
    this.setState({
      isSlideLoading: true
    });
  },
  onLoadSlideFailed() {
    this.setState({
      isSlideLoading: false
    });
  },
  onLoadSlideCompleted(index, content) {
    let { slide } = this.state;
    if(index === slide.index) {
      this.setState({
        slide: merge({}, slide, { content }),
        isSlideLoading: false
      });
    } else {
      this.setState({
        isSlideLoading: false
      });
    }
  },

  // NB: these are for optimistically setting the current slide. Once
  // the video starts playing the last, current, and next slides will be
  // updated based on the current time of the video.

  onNext() {
    const { slides, slide } = this.state;

    this.setState({
      lastSlide: slides[slide.index],
      slide:     slides[slide.index + 1],
      nextSlide: slides[slide.index + 2]
    });
  },
  onPrev() {
    const { slides, slide } = this.state;
    this.setState({
      lastSlide: slides[slide.index - 2],
      slide:     slides[slide.index - 1],
      nextSlide: slides[slide.index]
    });
  }
});
