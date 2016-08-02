/* eslint "react/no-did-mount-set-state": 0 */
import  $                   from 'jquery';
import cx                   from 'classnames';
import React, { PropTypes } from 'react';
import HasPercentageWidth   from 'mixins/has_percentage_width';
import { isIpad, isMobile } from 'utils/util';
import VideoActions         from 'actions/video_actions';
import { throttle }         from '_';

export default React.createClass({
  displayName: 'Player.DragBar',
  propTypes: {
    onDragStart: PropTypes.func,
    onDragEnd: PropTypes.func,
    style: PropTypes.object,
    hasScrub: PropTypes.bool,
    currentTime: PropTypes.number,
    duration: PropTypes.number
  },
  mixins: [  HasPercentageWidth ],
  getInitialState() {
    return { dragX: 0, parentWidth: 1000 };
  },
  componentDidMount() {
    const $parent = $(React.findDOMNode(this)).parent();
    this.setState({
      parentWidth: $parent.width()
    });
  },
  setVideoTime: throttle((time)=> {
      VideoActions.setCurrentTime(time);
    }, 500,  {
    'leading': true,
    'trailing': false
  }),
  touchMove(e) {
    const $this = $(React.findDOMNode(this));
    this.setState({
      dragX: e.targetTouches[0].clientX - $this.offset().left
    });
    this.setVideoTime(($this.width()/$('.video-player-load-progress').width()) * this.props.duration);
  },
  onMouseMove(e) {
    if(!this.state.isDragging) {
      return;
    }
    if(!(e.target.className.indexOf('video-player-load-progress') >= 0) &&
      !(e.target.className.indexOf('video-player-elapsed-time-indicator') >= 0) ) {
      this.setState({
        isDragging: false
      });
      return;
    }
    const $this = $(React.findDOMNode(this));
    this.setState({
      dragX: e.pageX - $this.offset().left
    });
    VideoActions.setCurrentTime(($this.width()/$('.video-player-load-progress').width()) * this.props.duration);
  },
  dragStart(e) {
    e.stopPropagation();
    this.setState({
      isDragging: true
    });
    $(document).on('mousemove.drag', this.onMouseMove);
    $(document).on('mouseup.drag', this.onDragEnd);
    if(this.props.onDragStart) {
      this.props.onDragStart(e);
    }
  },
  dragEnd(e) {
    this.setState({
      isDragging: false
    });
    $(document).off('mousemove.drag');
    $(document).off('mouseup.drag');
    $(document).off('touchend.drag');
    if(this.props.onDragEnd) {
      this.props.onDragEnd(e);
    }
  },
  killEvent(e) {
    e.stopPropagation();
  },
  render() {
    const classNames  = cx({
      'video-player-elapsed-time-indicator': true, // TODO change me
      'is-dragging': this.state.isDragging
    }),
    style = (this.state.isDragging) ?
              this.getStyle(this.state.dragX, this.state.parentWidth):
              this.props.style;
    if(this.props.hasScrub) {
      return (
        <div className={classNames}
             onMouseDown={this.dragStart}
             onMouseUp={this.dragEnd}
             onClick={this.killEvent}
             onTouchStart={this.dragStart}
             onTouchEnd={this.dragEnd}
             onTouchMove={this.touchMove}
             dragPercent={this.state.dragPercent}
             style={style}></div>
      );
    } else {
      return <div className={classNames} style={style}></div>;
    }
  }
});
