import cx from 'classnames';
import React, { PropTypes } from 'react';
import MediaActions from 'actions/video_actions';

export default React.createClass({
  displayName: 'AudioPlayer',
  propTypes: {
    source: PropTypes.string.isRequired,
    poster: PropTypes.string
  },
  componentDidMount() {
    MediaActions.load();
  },
  render() {
    const classNames = cx({
            'audio-player': true
          });

    return (
      <div className={classNames}>
        <img src={this.props.poster}></img>
        <audio id="audio-player">
          <source src={this.props.source} type="audio/mpeg"></source>
        </audio>
      </div>
    );
  }
});
