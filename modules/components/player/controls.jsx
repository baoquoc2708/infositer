import cx                   from 'classnames';
import React, { PropTypes } from 'react';
import { connect }          from 'reflux';
import VideoStore           from 'stores/video_store';
import AudioStore           from 'stores/audio_store';
import ProgressBar          from 'components/player/progress_bar';
import PlayButton           from 'components/player/play_button';
import VolumeSlider         from 'components/player/volume_slider';
import CCButton             from 'components/player/cc_button';
import FullscreenButton     from 'components/player/fullscreen_button';

export default React.createClass({
  displayName: 'Player.Controls',
  propTypes: {
    playerId:       PropTypes.string.isRequired,
    ccTracks:       PropTypes.array,
    hasCC:          PropTypes.bool,
    hasPlay:        PropTypes.bool,
    hasScrub:       PropTypes.bool,
    hasLength:      PropTypes.bool,
    hasProgress:    PropTypes.bool,
    hasFS:          PropTypes.bool,
    hasVolume:      PropTypes.bool,
    autoPlayCC:     PropTypes.bool,
    hasCCLangMenu:  PropTypes.bool,
    hasMobileStyle: PropTypes.bool,
    isVideo:        PropTypes.bool,
    isFullScreen:   PropTypes.bool
  },
  mixins: [ connect(VideoStore), connect(AudioStore) ],
  getDefaultProps() {
    return {
      hasCC:       true,
      hasPlay:     true,
      hasScrub:    true,
      hasLength:   true,
      hasFS:       true,
      hasProgress: true,
      hasVolume:   true,
      autoPlayCC:  false
    };
  },
  getInitialState() {
    return { };
  },
  render() {
    const media       = this.state.video || this.state.audio || { isBuffering: true },
          currentTime = media.currentTime,
          classNames  = cx({
            'video-player-controls': true,
            'is-playing': media.isPlaying,
            'is-idle': media.isFullScreen? media.isMouseIdle : false
          }),
          { hasMobileStyle, hasPlay, hasFS, hasVolume } = this.props;
    let playButton, fsButton, volume, captions, content;
    if(media && media.meta && media.meta.enableCc && !hasMobileStyle) {
      captions = (<CCButton tracks={this.props.ccTracks}
                            ccLang={media.ccLang}
                            hasCCLangMenu={this.props.hasCCLangMenu}
                            isCaptioningOn={media.isCaptioningOn} />);
    }
    if(hasPlay && !hasMobileStyle) {
      playButton = <PlayButton isPlaying={media.isPlaying} isEnded={media.isEnded} />;
    }
    if((hasFS && !hasMobileStyle)) {
      fsButton = (<FullscreenButton isFullScreen={this.props.isFullScreen}
                                    hasMobileStyle={this.props.hasMobileStyle}
                                    isVideo={this.props.isVideo}
                                    screenId={this.props.playerId} />);
    }

    if(hasVolume && !hasMobileStyle) {
      volume = <VolumeSlider currentVolume={media.currentVolume} />;
    }
    if(!hasMobileStyle) {
      content = (<div className={classNames}>
                  {playButton}
                  <ProgressBar {...media}
                                currentTime={currentTime}
                                hasProgress={this.props.hasProgress}
                                hasScrub={this.props.hasScrub}
                                hasLength={this.props.hasLength} />
                  {volume}
                  {captions}
                  {fsButton}
                </div>);
    } else {
      content = (<div className={classNames}>
                  <div>
                    {playButton}
                  </div>
                  <ProgressBar {...media}
                                currentTime={currentTime}
                                hasProgress={this.props.hasProgress}
                                hasScrub={this.props.hasScrub}
                                hasLength={this.props.hasLength} />
                  {fsButton}
                </div>);
    }
    return content;
  }
});
