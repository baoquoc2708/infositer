import $                          from 'jquery';
import cx                         from 'classnames';
import { isApp, isMobile, isIOS } from 'utils/util';

import React, { PropTypes } from 'react';
import ResizesImages from 'mixins/resizes_images';

import VideoActions from 'actions/video_actions';

export default React.createClass({
  displayName: 'Player.Screen',
  propTypes: {
    videoElementId: PropTypes.string,
    isPlaying: PropTypes.bool,
    isEnded: PropTypes.bool,
    hideControlsMobile: PropTypes.bool,
    video: PropTypes.object
  },
  mixins: [ ResizesImages ],
  componentDidMount() {
    VideoActions.load(this.props.videoElementId, this.props.video);
    let node       = React.findDOMNode(this), // eslint-disable-line prefer-const
        width    = $(node).width(),
        height     = $(node).height();
    //  const     { poster } = this.props.video;

    if(isMobile()) {
      width  *= 2;
      height *= 2;
    }
    // node.style.backgroundImage = this.resizeImageTo(poster, `${width}x${height}`, 'style');
  },
  componentDidUpdate() {
    if(isApp()) {
      $('video').attr('autoplay', 'autoplay');
      $('video').attr('webkit-playsinline', 'webkit-playsinline');
    }
    if(this.props.hideControlsMobile) {
      $('video').removeAttr('controls');
    }
    // Akamai bugged. They probobly wont fix.
    // Our custom paused/play is more reliable so we use it to fix akamai.
    if(!isMobile() && !isIOS()) {
      $('#'+this.props.videoElementId).toggleClass('akamai-paused', $('#video_player_screen').hasClass('is-paused'));
    }
  },
  toggle(e) {
    if(e.target.nodeName === 'OBJECT') return; // ignore events that are bubbling from the flash player
    // VideoActions.toggle();
  },
  render() {
    const  { isPlaying, isEnded, videoElementId } = this.props;
    // so that the akamai player works outside of the React render chain
    const akamaiDiv  = "<div class='content' id='" + videoElementId + "'></div>",
        style      = {
          // backgroundImage: isPlaying? null : `url(${video.poster})`
        },
        classes    = cx({
          'video-player-screen': true,
          'is-paused': !isPlaying,
          'is-ended': isEnded
        });

    return (
      <div onTouchEnd={this.toggle}
           onClick={this.toggle}
           id="video_player_screen"
           className={classes}
           style={style}
           dangerouslySetInnerHTML={{__html: akamaiDiv}}></div>
    );
  }
});
