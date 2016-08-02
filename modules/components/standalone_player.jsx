import cx                     from 'classnames';
import React, { PropTypes }   from 'react';
import { connect }            from 'reflux';

import { isMobile, isIpad }   from 'utils/util';

import RendersVideoComponents from 'mixins/renders_video_components';
import TogglesPlay            from 'mixins/toggles_play';

import DescriptorActions      from 'actions/descriptor_actions';

import DescriptorStore        from 'stores/descriptor_store';
import VideoStore             from 'stores/video_store';

import PlayerControls         from 'components/player/controls';
import PlayerErrors           from 'components/player/errors';
import PlayerScreen           from 'components/player/screen';

require('baseStyle');

export default React.createClass({
  displayName: 'StandalonePlayer',
  propTypes: {
    id:             PropTypes.string,
    descriptorURL:  PropTypes.string,
    descriptorJSON: PropTypes.object,
    onVideoEnd:     PropTypes.func,
    videoIndex:     PropTypes.number,
    hasCC:          PropTypes.hasCC
  },
  mixins: [ connect(DescriptorStore), connect(VideoStore), RendersVideoComponents, TogglesPlay ],
  getDefaultProps() {
    return {
      videoElementId: 'medscape-akamai-video-container'
    };
  },
  getInitialState() {
    return { video: { } };
  },
  componentWillMount() {
    if(this.props.descriptorJSON) {
      DescriptorActions.loadJSON(this.props.descriptorJSON);
    } else {
      DescriptorActions.load(this.props.descriptorURL);
    }
  },
  shouldComponentUpdate(nextProps, nextState) {
    const descriptor = this.state.descriptor, video = nextState.video;

    if(video.event === 'ended') {
      if(this.props.onVideoEnd) this.props.onVideoEnd(video.index);
    }

    return (nextState.descriptor !== descriptor                            ||
            nextState.video.isFullScreen !== this.state.video.isFullScreen ||
            nextState.video.isLoading !== this.state.video.isLoading       ||
            nextState.video.isPlaying !== this.state.video.isPlaying);
  },
  renderControls() {
    if(isMobile() && !isIpad()) {
      return null;
    } else {
      return <PlayerControls playerId={this.props.id} hasCC={this.props.hasCC} />;
    }
  },
  renderVideo(descriptor) {
    let videoIndex  = this.state.video.index ||
                      this.props.videoIndex  ||
                      descriptor.initialIndex,

        video       = descriptor.videos[videoIndex],
        controls    = this.renderControls(),
        playOverlay = this.renderOverlay(),
        classNames;

    if(typeof video === 'undefined') {
      console.warn('Warning, no start video at index:' + this.props.videoIndex);
      videoIndex = 0;
      video      = descriptor.videos[videoIndex];
    }

    classNames = cx({
      'video-player-standalone': true,
      'is-fullscreen': this.state.video.isFullScreen,
      'is-playing': this.state.video.isPlaying
    });
    let watermark = (video && video.options && video.options.watermark)? video.options.watermark : null;
    return (
      <div className={classNames} id={this.props.id}>
        <PlayerErrors />
        <PlayerScreen
                  onTouchEnd={this.start}
                  isPlaying={this.state.video.isPlaying}
                  shouldShowNativeControls={!controls}
                  watermark={watermark}
                  videoElementId="medscape-akamai-video-container"
                  videoIndex={videoIndex}
                  video={video} />
        {controls}
        {playOverlay}
      </div>
    );
  },
  render() {
    const descriptor = this.state.descriptor;
    if(descriptor) {
      return this.renderVideo(descriptor);
    } else {
      return <div className="video-player-empty-shell">loading. . .</div>;
    }
  }
});
