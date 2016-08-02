import cx from  'classnames';
import React, { PropTypes } from 'react';
import VideoActions from 'actions/video_actions';

export default React.createClass({
  displayName: 'Player.PlayButton',
  propTypes: {
    isPlaying: PropTypes.bool,
    isEnded: PropTypes.bool
  },
  shouldComponentUpdate(nextProps) {
    return nextProps.isPlaying !== this.props.isPlaying || nextProps.isEnded !== this.props.isEnded;
  },
  toggle(e) {
    e.preventDefault();
    if(this.props.isPlaying) {
      VideoActions.pause();
    } else if (this.props.isEnded) {
      VideoActions.replay();
    } else {
      VideoActions.start();
    }
  },
  render() {
    let playOrPause = this.props.isPlaying ? 'pause' : 'play';
    const classNames  = cx({
            'video-player-play-button': true,
            'is-playing': this.props.isPlaying
          });
    if(this.props.isEnded) {
      playOrPause = 'replay';
    }

    return (
      <button onClick={this.toggle} className={classNames}>
        {playOrPause}
      </button>
    );
  }
});
