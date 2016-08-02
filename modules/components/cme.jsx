import cx                     from 'classnames';
import $                      from 'jquery';
import { get }                from '_';

import React, { PropTypes }   from 'react';
import { connect }            from 'reflux';

import { isIpad, isMobile }   from 'utils/util';
import RendersVideoComponents from 'mixins/renders_video_components';
import TogglesPlay            from 'mixins/toggles_play';

import DescriptorStore        from 'stores/descriptor_store';
import VideoStore             from 'stores/video_store';
import AudioStore             from 'stores/audio_store';

import DescriptorActions      from 'actions/descriptor_actions';

import PlayerScreen           from 'components/player/screen';
import PlayerControls         from 'components/player/controls';
import AudioPlayer            from 'components/audio_player';
import CMEWatermark           from 'components/cme/watermark';
import CMESlidePresenter      from 'components/cme/slide_presenter';
import CMETOC                 from 'components/cme/toc';
import CMEBumper              from 'components/cme/bumper';
import CMEPlaylist            from 'components/cme/playlist';
import QNAPresenter           from 'components/cme/qna_presenter';
import FullscreenButton       from 'components/player/fullscreen_button';


// `require` used for modules that are not directly interact with (styles, stores)
require('cmeStyle');

export default React.createClass({
  displayName: 'Player.CME',
  propTypes: {
    id:             PropTypes.string,
    hasCC:          PropTypes.bool,
    descriptorURL:  PropTypes.string,
    descriptorJSON: PropTypes.object,
    isMultiple:     PropTypes.bool
  },
  mixins: [ connect(DescriptorStore), connect(VideoStore), connect(AudioStore),
            RendersVideoComponents, TogglesPlay ],
  getDefaultProps() {
    return { hasCC: true, id: 'cme-video-player' };
  },
  getInitialState() {
    return { video: { }, audio: { }, descriptor: null };
  },
  componentDidMount() {
    if(this.props.descriptorURL) {
      DescriptorActions.load(this.props.descriptorURL);
    } else if(this.props.descriptorJSON) {
      DescriptorActions.loadJSON(this.props.descriptorJSON);
    }
  },
  shouldComponentUpdate(nextProps, nextState) {
    const media          = nextState.video || nextState.audio,
          oldMedia       = this.state.video || this.state.audio,
          hasDescChanged = nextState.descriptor !== this.state.descriptor,
          // don't hammer with progress ticks
          isNoise        = media.event === 'progress' && oldMedia.event === 'progress';
    return hasDescChanged || (!isNoise && nextState !== this.state);
  },
  renderPlayer(descriptor) {
    const { isVideo }        = descriptor;
    if(isVideo) {
      require('stores/cme_video_tracking_store');
    } else {
      require('stores/cme_audio_tracking_store');
    }
    const { isFullScreen,
            isPlaying,
            hasStarted,
            isEnded,
            // isLoading,
            // isBuffering,
            isCaptioningOn,
            isMouseIdle,
            // playerType,
            roadblockedTime } = isVideo? this.state.video : this.state.audio;
    const media        = descriptor.isVideo? descriptor.videos[0] : descriptor.audios[0],
          hasSlides    = media.slides && media.slides.length,
          hasTOC       = media.chapters && media.chapters.length,
          hasPlay      = media.enablePlay,
          hasScrub     = media.enableScrub,
          hasLength    = media.enableLength,
          hasProgress  = media.enableProgress,
          hasFS        = media.enableFullScreen,
          hasWatermark = !!media.watermark,
          hasCC        = media.enableCc,
          hasVolume    = !isIpad(),
          hasPlaylist  = media.playlist.length,
          shouldShowPlaylist = media.shouldShowPlaylist,
          hasMobileStyle = isMobile() && !isIpad(),
          classNames   = cx({
            'cme':              true,
            'is-fullscreen':    isFullScreen,
            'is-playing':       isPlaying,
            'is-buffering':     false, // ((isBuffering || isLoading) && playerType === 'html'),
            'is-captioning-on': isCaptioningOn,
            'is-ended':         isEnded,
            'is-not-started':   !isPlaying && !hasStarted,
            'no-slides':        !hasSlides,
            'no-toc':           !hasTOC,
            'no-play':          !hasPlay,
            'no-scrub':         !hasScrub,
            'no-length':        !hasLength,
            'no-progress':      !hasProgress,
            'no-fs':            !hasFS,
            'no-watermark':     !hasWatermark,
            'no-volume':        !hasVolume,
            'no-playlist':      !hasPlaylist,
            'show-playlist':    shouldShowPlaylist,
            'no-cc':            !hasCC,
            'is-mobile':        hasMobileStyle,
            'is-idle':          isMouseIdle,
            'is-small':         (($('#cme-video-player').width() > 0) && ($('#cme-video-player').width() < 600) && !hasMobileStyle)
          });
    let toc, slidePresenter, watermark, player, controls, playlist, bumper, fsButton;
    if(isVideo) {
      player = (<PlayerScreen
                 hideControlsMobile={isIpad()}
                 isPlaying={isPlaying}
                 isEnded={isEnded}
                 videoElementId="medscape-akamai-video-container"
                 videoIndex={0}
                 video={media}  />);
    } else {
      player = React.createElement(AudioPlayer, media);
    }

    if(hasTOC) {
      let isVideoFlag = isVideo?true:false;
      toc = (<CMETOC
              roadblockedTime={roadblockedTime}
              hasMobileStyle={hasMobileStyle}
              isFullScreen={isFullScreen}
              isVideo={isVideoFlag}
              playerId={this.props.id}
            />);
    }

    if(hasSlides) {
      slidePresenter = (<div className="cme-slide-panel">
                          <CMESlidePresenter
                            isEnded={isEnded}
                            isPlaying={isPlaying}
                            hasMobileStyle={hasMobileStyle} />
                        </div>);
    }
    if(hasMobileStyle) {
       fsButton = (<FullscreenButton isFullScreen={!!isFullScreen}
                                     hasMobileStyle={hasMobileStyle}
                                     isVideo={isVideo}
                                     screenId={this.props.id} />);
    }
    if(isVideo && hasWatermark) {
      watermark = React.createElement(CMEWatermark, media);
    }
    controls = (<PlayerControls hasPlay={hasPlay}
                                hasFS={hasFS}
                                hasProgress={hasProgress}
                                hasScrub={hasScrub}
                                hasLength={hasLength}
                                hasVolume={!isIpad()}
                                playerId={this.props.id}
                                ccTracks={media.track}
                                hasCC={media.enableCc}
                                ccLang={media.ccDefaultLang}
                                hasCCLangMenu={media.enableCcLangMenu}
                                autoPlayCC={media.enableCcAutoDisplay}
                                hasMobileStyle={hasMobileStyle}
                                isVideo={isVideo}
                                isFullScreen={!!isFullScreen}
                />);
    if(shouldShowPlaylist) {
      playlist = <CMEPlaylist playlist={media.playlist} />;
    }
    if(isEnded && media.bumperImage && !isPlaying) {
      bumper = <CMEBumper onClick={this.start} bumperImage={media.bumperImage} />;
    }
    return (
      <div ref="cmeMountPoint" className={classNames} id={this.props.id}>
        <QNAPresenter
            qna={get(descriptor, 'config.qna', [])}
            isVideo={isVideo}
        />
        { fsButton }
        <div className="cme-tabs">
          <div className="cme-player-panel">
            <div className="cme-player-wrapper">
              { player }
              { watermark }
              { bumper }
            </div>
            { toc }
          </div>
          { slidePresenter }
          { playlist }
          <div className="cme-control-bar">
            { controls }
          </div>
        </div>
      </div>
    );
  },
  render() {
    if(this.state.descriptor) {
      return this.renderPlayer(this.state.descriptor);
    } else {
      return (<div className="video-player-empty-shell">loading. . . </div>);
    }
  }
});
