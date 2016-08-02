import React               from 'react';
import { isMobile, isIOS } from 'utils/util';

export default {
  renderOverlay() {
    const isDesktopOrIOS = !isMobile() || isIOS(),
          isNotPlaying   = !this.state.video.isPlaying;
    if(isNotPlaying && isDesktopOrIOS) {
      return (<div ref="overlay"
                  className="video-player-overlay"
                  onClick={this.start}
                  onTouchEnd={this.start}></div>);
    } else {
      return null;
    }
  }
};
