import React, { PropTypes } from 'react';
import VideoActions         from 'actions/video_actions';
import cx                   from 'classnames';
import $                    from 'jquery';
import TrackingActions      from 'actions/cme_tracking_actions';

export default React.createClass({
  displayName: 'Player.CCList',
  propTypes: {
    tracks: PropTypes.array.isRequired,
    clickHandler: PropTypes.func.isRequired,
    ccLang: PropTypes.string
  },
  languages: {
    en: 'English',
    es: 'Spanish',
    sp: 'Spanish',
    ja: 'Japanese',
    pt: 'Portuguese',
    de: 'German',
    fr: 'French',
    ko: 'Korean',
    nl: 'Dutch',
    ar: 'Arabic',
    zh: 'Chinese',
    it: 'Italian',
    da: 'Danish',
    ru: 'Cyrillic',
    pl: 'Polish',
    cdc: 'Sabrina',
    cr: 'Character',
    hu: 'Hungarian',
    ro: 'Romanian',
    bg: 'Bulgarian',
    sl: 'Slovenian',
    hr: 'Croatian',
    sr: 'Serbian',
    cs: 'Czech',
    sk: 'Slovak'
  },
  selectLanguage(lang) {
    return () => {
      if(lang !=='') {
        VideoActions.selectLanguage(lang);
        this.props.clickHandler(true);
        $('.akamai-captioning').show();
        TrackingActions.selectLanguage(lang);
      } else {
        this.props.clickHandler(false);
        VideoActions.selectLanguage(lang);
        $('.akamai-captioning').hide();
      }
    };
  },
  render() {
    let items = this.props.tracks.map((track, i) => { // eslint-disable-line
      const classNames  = cx({
        'player-cc-list-item': true,
        'is-selected': track.srclang === this.props.ccLang
      });
      const lang = this.languages[track.srclang] || track.srclang; // sloppy data
      return <li key={i} className={classNames} onClick={this.selectLanguage(track.srclang)}>{lang}</li>;
    });
    const offClassNames = cx({
        'player-cc-list-item': true,
        'is-selected': this.props.ccLang === ''
    });
    items[items.length] = <li key="off_button" className={offClassNames} onClick={this.selectLanguage('')}>Off</li>;
    return (
      <ul className="player-cc-list">
        { items }
      </ul>
    );
  }
});
