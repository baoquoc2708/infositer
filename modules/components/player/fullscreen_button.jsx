/* global screenfull */
import cx                     from 'classnames';
// _screenfull creates a Global.
import _screenfull            from 'screenfull';
import React, { PropTypes }   from 'react';
import VideoActions           from 'actions/video_actions';
import AudioStore             from 'stores/audio_store';

export default React.createClass({
  displayName: 'Player.FullscreenButton',
  propTypes: {
    isFullScreen: PropTypes.bool,
    screenId: PropTypes.string,
    hasMobileStyle: PropTypes.bool,
    isVideo: PropTypes.bool
  },
  mixins: [ React.PureRenderMixin ],
  fullscreen: function(e) {
    e.preventDefault();
    if(this.props.isFullScreen) {
      VideoActions.exitFullScreen();
      $('body').removeClass('no-scroll');
      if(screenfull) {
        screenfull.exit();
      }
    } else {
      if(this.props.hasMobileStyle) {
        VideoActions.start();
        if(!this.props.isVideo) {
          AudioStore.mediaApi.play();
        }
      }
      VideoActions.fullScreen();
      if(screenfull) screenfull.request(document.getElementById(this.props.screenId));
    }
  },
  render: function() {
    const classNames = cx({
      'video-player-fullscreen-button': true,
      'is-fullscreen': this.props.isFullScreen
    });
    return (
        <button className={classNames} onClick={this.fullscreen}>FS</button>
    );
  }
});
