import cx                     from 'classnames';
import React, { PropTypes }   from 'react';
import TrackingActions        from 'actions/cme_tracking_actions';
import HasPrettyTime          from 'mixins/has_pretty_time';
import HasSliderEvents        from 'mixins/has_slider_events';
import HasPercentageWidth     from 'mixins/has_percentage_width';
import IOSVideoSetCurrentTime from 'mixins/ios_video_set_current_time';
import PlayerDragBar          from 'components/player/drag_bar';

export default React.createClass({
  displayName: 'Player.ProgressBar',
  propTypes: {
    currentTime: PropTypes.number,
    duration:    PropTypes.number,
    isLoading:   PropTypes.bool,
    isBuffering: PropTypes.bool,
    hasLength:   PropTypes.bool,
    hasScrub:    PropTypes.bool,
    hasProgress: PropTypes.bool,
  },
  mixins: [ HasPrettyTime, HasSliderEvents, HasPercentageWidth, IOSVideoSetCurrentTime ],
  getDefaultProps() {
    return {
      hasLength:   true,
      hasScrub:    true,
      hasProgress: true,
    };
  },
  shouldComponentUpdate(nextProps) {
    if(nextProps.event === 'ready') {
      return true;
    }
    if(typeof nextProps.currentTime === 'undefined') {
      return false;
    }
    if(nextProps.isBuffering !== this.props.isBuffering || nextProps.isLoading !== this.props.isLoading) {
      return true;
    }
    const delta = nextProps.currentTime - this.props.currentTime;
    return nextProps.duration !== this.props.duration || Math.abs(delta) > 0.005;
  },
  seek(e) {
    if(!this.props.hasScrub) return;
    const seekTo = this.getSliderValue(e, this.props.duration);
    TrackingActions.scrub();
    this.setCurrentTime(seekTo);
  },
  renderTimeTracking(currentTime, duration) {
    if(!this.props.hasLength) return null;
    return (
      <div className="video-player-time-tracking">
        <div className="video-player-elapsed-time">
          {this.secondsToPrettyTime(currentTime)}
        </div>
        <div className="video-player-progress-divider">/</div>
        <div className="video-player-duration">
          {this.secondsToPrettyTime(duration)}
        </div>
      </div>
    );
  },
  render() {
    const duration    = this.props.duration,
          currentTime = this.props.currentTime,
          style       = this.getStyle(currentTime, duration),
          classNames  = cx({
            'video-player-load-progress': true,
            'is-buffering': this.props.isBuffering,
            'is-loading': this.props.isLoading
          });

    // NB: the drag bar is just there to make the user feel
    // good. seek happens when the mouseup bubbles to the outter div
    let dragBar;
    if(this.props.hasProgress) {
      dragBar = (<PlayerDragBar className="video-player-elapsed-time-indicator"
                                hasScrub={this.props.hasScrub}
                                currentTime={this.props.currentTime}
                                duration={this.props.duration}
                                style={style} />);
    }
    return (
      <div className="video-player-progress-bar">
        <div className={classNames}  onMouseUp={this.seek} onTouchStart={this.seek}>
          {dragBar}
        </div>
        { this.renderTimeTracking(currentTime, duration) }
      </div>
    );
  }
});
