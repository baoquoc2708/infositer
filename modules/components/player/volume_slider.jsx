import cx from 'classnames';
import React, { PropTypes } from 'react';
import VideoActions from 'actions/video_actions';
import HasSliderEvents from 'mixins/has_slider_events';
export default React.createClass({
  displayName: 'Player.VolumeSlider',
  propTypes: {
    currentVolume: PropTypes.number,
    hasMute: PropTypes.bool
  },
  mixins: [ HasSliderEvents ],
  getDefaultProps() {
    return {
      currentVolume: 0.75,
      hasMute: true
    };
  },
  getInitialState() {
    return { lastVolume: 0.75 };
  },
  shouldComponentUpdate(nextProps) {
    return nextProps.currentVolume !== this.props.currentVolume;
  },
  mute(e) {
    e.preventDefault();
    if(this.props.currentVolume === 0) {
      VideoActions.unmute(this.state.lastVolume);
    } else {
      this.setState({ lastVolume: this.props.currentVolume });
      VideoActions.mute(0);
    }
  },
  setVolume(e) {
    e.preventDefault();
    VideoActions.setVolume(this.getSliderValue(e, 1));
  },
  render() {
    const volumeStyle = (this.props.currentVolume * 100) + '%',
          mute        = this.props.hasMute? <button ref="muteButton"
                                                    className="video-player-mute-button"
                                                    onClick={this.mute}>M</button> : null,
          classNames  = cx({
          'video-player-volume-slider': true,
          'is-muted': this.props.currentVolume === 0
        });

    return (
      <div className={classNames}>
        { mute }
        <div className="video-player-volume-boundary" onClick={this.setVolume}>
          <div className="video-player-volume-indicator" style={{ width: volumeStyle }}></div>
        </div>
      </div>
    );
  }
});
