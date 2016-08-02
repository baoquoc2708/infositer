import $                    from 'jquery';
import React, { PropTypes } from 'react';
import { connect }          from 'reflux';
import HasPrettyTime        from 'mixins/has_pretty_time';
import TOCStore             from 'stores/toc_store';
import Chapter              from 'components/cme/chapter';
import cx                   from 'classnames';
import FullscreenButton     from 'components/player/fullscreen_button';


export default React.createClass({
  displayName: 'CME.TOC',
  propTypes: {
    hasMobileStyle: PropTypes.bool,
    roadblockedTime: PropTypes.number,
    isFullScreen: PropTypes.bool,
    isVideo:  PropTypes.bool,
    playerId: PropTypes.string
  },
  mixins: [ connect(TOCStore), HasPrettyTime ],
  getInitialState() {
    return {
      [TOCStore.stateNamespace]: TOCStore.getState(),
      isOpen: false
    };
  },
  componentDidUpdate(prevProps, prevState) {
    if(this.state !== prevState) {
      const index   = this.currentIndex(),
          $chapter = index !== null? $(React.findDOMNode(this.refs[`chapter-${index}`])) : null;
      if($chapter !== null) {
        const $toc    = $(React.findDOMNode(this.refs.chapters));
        $toc.scrollTop(index * $chapter.outerHeight(true));
      }
    }
  },
  toggle() {
    this.setState({
      isOpen: !this.state.isOpen
    });
  },
  currentIndex() {
    const { chapter } = this.state[TOCStore.stateNamespace];
    return chapter? chapter.index : null;
  },
  render() {
    const { chapters } = this.state[TOCStore.stateNamespace],
          index        = this.currentIndex();
    let hamMenu = null,
        fsButton = null;
    const chapterList = (chapters || [ ]).map((chapter, i) => {
      if(index === i && this.props.hasMobileStyle) {
        const hamMenuClasses = cx({
          'cme-ham-menu': true,
          'is-visible': !this.state.isOpen
        });
        hamMenu = (<div className={hamMenuClasses}>
            {fsButton}
            {chapter.title}
            <div onClick={this.toggle} className="cme-mobile-toc-menu-open-icon"> </div>
        </div>);
      }
      return (<Chapter ref={`chapter-${i}`}
                       key={i}
                       hasMobileStyle={this.props.hasMobileStyle}
                       isCurrent={index === i } {...chapter}
                       toggle={this.toggle}
                       roadblockedTime={this.props.roadblockedTime}
            />);
    });
    const chapterListClasses = cx({
      'cme-toc-chapters': true,
      'is-visible': this.state.isOpen
    });
    return (
      <div className="cme-toc">
        { hamMenu }
        <h3 className="cme-toc-header">
          <div className="cme-ratio-container">
            <span>In this presentation</span>
          </div>
        </h3>
        <ul className={chapterListClasses}>
          <div ref="chapters" className="cme-ratio-container">
            { chapterList }
          </div>
        </ul>
        <div className="mobile-clear"></div>
      </div>
    );
  }
});
