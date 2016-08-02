import cx                   from 'classnames';
import React, { PropTypes } from 'react';
import VideoActions         from 'actions/video_actions';
import CCList               from 'components/player/cc_list';
import TrackingActions      from 'actions/cme_tracking_actions';

export default React.createClass({
  displayName: 'Player.CCButton',
  propTypes: {
    isCaptioningOn: PropTypes.bool,
    tracks: PropTypes.array,
    ccLang: PropTypes.string,
    hasCCLangMenu: PropTypes.bool
  },
  getInitialState() {
    return { isOpen: false };
  },
  setCCState(state) {
    this.setState({
      isOpen: state
    });
    VideoActions.setClosedCaptioning(state);
    TrackingActions.closedCaption(state);
  },
  toggle() {
    const { isCaptioningOn }   = this.props,
          { isOpen } = this.state;
    if(this.hasMultiple() && this.props.hasCCLangMenu) {
      this.setState({
        isOpen: !isOpen
      });
    } else {
      VideoActions.setClosedCaptioning(!isCaptioningOn);
      TrackingActions.closedCaption(!isCaptioningOn);
    }
  },
  hasMultiple() {
    const { tracks } = this.props;
    return tracks && tracks.length > 1;
  },
  render() {
    const { isCaptioningOn, tracks, ccLang } = this.props,
          { isOpen }       = this.state,
          classNames       = cx({
            'video-player-cc-button': true,
            'is-on': isCaptioningOn,
            'is-open': isOpen
          });
    let list = null;
    if(isOpen && this.hasMultiple() && this.props.hasCCLangMenu) {
      list = <CCList tracks={tracks} ccLang={ccLang} clickHandler={this.setCCState} />;
    }
    return (
        <div className={classNames} onClick={this.toggle}>
          { isCaptioningOn? 'CC[on]' : 'CC' }
          { list }
        </div>
    );
  }
});
