import cx                         from 'classnames';
import React, { PropTypes }       from 'react';
import { forceRepaint, nextTick } from 'utils/util';
import { connect }                from 'reflux';
import HasPrettyTime              from 'mixins/has_pretty_time';
import IOSVideoSetCurrentTime     from 'mixins/ios_video_set_current_time';
import TrackingActions            from 'actions/cme_tracking_actions';
import SlideActions               from 'actions/slide_actions';
import SlideStore                 from 'stores/slide_store';
import Slide                      from 'components/cme/slide';
import SlideThumbnail             from 'components/cme/slide_thumbnail';
import $                          from 'jquery';
import PlayButton                 from 'components/player/play_button';


export default React.createClass({
  displayName: 'CME.SlidePresenter',
  propTypes: {
    isZoomed:       PropTypes.string,
    isThumbnails:   PropTypes.bool,
    hasMobileStyle: PropTypes.bool,
    isPlaying:      PropTypes.bool,
    isEnded:        PropTypes.bool
  },
  mixins: [ connect(SlideStore), HasPrettyTime, IOSVideoSetCurrentTime ],
  getInitialState() {
    return {
      [SlideStore.stateNamespace]: SlideStore.getState(),
      isZoomed: false,
      isThumbnails: false,
    };
  },
  shouldComponentUpdate(nextProps, nextState) {
    if(nextProps.isPlaying !== this.props.isPlaying) {
      return true;
    }
    if(nextState === this.state) {
      return false;
    }
    return true;
  },
  componentDidUpdate(prevProps, prevState) {
    if(this.state.isZoomed && !prevState.isZoomed) {
      forceRepaint(React.findDOMNode(this));
    }
    const $content = $(React.findDOMNode(this.refs.content)),
          $contentScrollable = $content.find('.cme-ratio-container:first');

    if(this.state.isThumbnails) {
      setTimeout(() => {
        $contentScrollable.scrollTop(0);

        const $selected = $content.find('.is-current:first'),
              scrollHeight = $selected.offset().top - $contentScrollable.offset().top - 10;

        $contentScrollable.scrollTop(scrollHeight);
      }, 100);

    } else {
      $contentScrollable.scrollTop(0);
    }
  },
  zoomSlide(e) {
    e.preventDefault();
    const { isZoomed } = this.state;
    TrackingActions.slideZoom(!isZoomed);
    this.setState({
        isZoomed: !isZoomed,
    });
  },
  unZoomAndUnThumb() {
    this.setState({ isZoomed: false, isThumbnails: false });
  },
  thumbnails(e) {
    e.preventDefault();
    const { isThumbnails } = this.state;
    TrackingActions.slideThumb(!isThumbnails);
    this.setState({ isThumbnails: !isThumbnails });
  },
  next(e) {
    e.preventDefault();
    SlideActions.next();
    const { nextSlide } = SlideStore.state,
          nextTime      = this.secondsFromPrettyTime(nextSlide.startTime);
    TrackingActions.slideNavigate('next');
    this.setCurrentTime(nextTime);
  },
  prev(e) {
    e.preventDefault();
    SlideActions.prev();
    const { lastSlide } = SlideStore.state,
          lastTime      = this.secondsFromPrettyTime(lastSlide.startTime);
    TrackingActions.slideNavigate('prev');
    this.setCurrentTime(lastTime);
  },
  render() {
    const { slides, lastSlide, slide,
            nextSlide, isSlideLoading }   = this.state[SlideStore.stateNamespace],
          { isZoomed, isThumbnails }      = this.state,
          classNames                      = cx({
            'cme-slide-presenter': true,
            'is-zoomed': isZoomed,
            'is-thumbnails': isThumbnails,
            'is-slide-loading': isSlideLoading
          });
    let next, back, content, playButton;
    if(this.props.hasMobileStyle) {
      playButton = <PlayButton isPlaying={this.props.isPlaying} isEnded={this.props.isEnded} />;
    }

    if(lastSlide) {
      back = (<button ref="back"
                     className="cme-slide-presenter-prev-button"
                     onClick={this.prev}>Previous</button>);
    }
    if(nextSlide) {
      next = (<button ref="next"
                     className="cme-slide-presenter-next-button"
                     onClick={this.next}>Next</button>);
    }

    if(isThumbnails) {
      const idx = slide? slide.index : 0;
      content = slides.map((s, i) => <SlideThumbnail isCurrent={i === idx}
                                                     onClick={this.unZoomAndUnThumb} key={i} {...s} />);
    } else if(slide) {
      content = <Slide ref="slide" {...slide} />;
    }

    return (
      <div className={classNames}>
        <div className="cme-slide-presenter-header">
          <div className="cme-ratio-container">
            <button className="cme-slide-presenter-zoom-slide-button"
                    ref="zoom"
                    onClick={this.zoomSlide}>{ isZoomed? 'Close' : 'Zoom' }</button>
            <button className="cme-slide-presenter-thumbnail-button"
                    ref="thumbnails"
                    onClick={this.thumbnails}>{ isThumbnails? 'Close Thumbnails' : 'Thumbnails' }</button>
          </div>
        </div>
        <div ref="content" className="cme-slide-presenter-content">
          <div className="cme-ratio-container">
            { content }
          </div>
        </div>
        <div className="cme-slide-presenter-footer">
          <div className="cme-ratio-container">
            { back }
            { playButton }
            { next }
          </div>
        </div>
      </div>
    );
  }
});
