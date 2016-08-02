/*global define*/
define([
  '_',
  'classnames',
  'react',
  'actions/video_actions',
  'actions/brand_play_tracking_actions'
], function(
  _,
  cx,
  React,
  VideoActions,
  Tracking
){
  'use strict';
  /**
   * @jsx React.DOM
   */
  return React.createClass({
    displayName: "BrandPlay.ChapterDropdown",
    getInitialState: function() {
      return { isOpen: false };
    },
    mkChapterPlay: function(video, index) {
      var self = this;
      return function(e) {
        e.preventDefault();
        VideoActions.selectVideo(video, index);
        VideoActions.start();
        self.setState({isOpen: false});
      };
    },
    cancel: function(e) {
      e.preventDefault();
      this.setState({ isOpen: false });
      Tracking.trackEvent('vidvbp-ctl_close');
    },
    toggle: function(e) {
      e.preventDefault();
      this.setState({ isOpen: !this.state.isOpen });
    },
    render: function(){
      // TODO refactor this to a mixin that is shared with menu dropdown.
      var classNames = cx({
        'brand-play-chapter-dropdown': true,
        'is-open': this.state.isOpen
      });
      return (
          <div className={classNames}>
            <a className="brand-play-chapter-dropdown-open"
                onTouchEnd={this.toggle} onClick={this.toggle}>Open</a>
            <div className="shadow-box" onTouchEnd={this.toggle} onClick={this.toggle}>
              {this.renderMenu()}
            </div>
          </div>
      );
    },
    renderMenu: function(){
      if(!this.props.chapters) {
        return (<div></div>);
      }

      var classNames = cx({
        "brand-play-chapter-dropdown-list": true,
        "is-open": this.state.isOpen
      });

      var menuItems = _.map(this.props.chapters, function(item, i){
        var handler = this.mkChapterPlay(item, i);
        return (
            <li onTouchEnd={handler} onClick={handler} className="brand-play-chapter-dropdown-item" key={i}>
              <a>{item.title}</a>
            </li>
        );
      }, this);
      menuItems.push(
          <li onClick={this.cancel} onTouchEnd={this.cancel}
              className="brand-play-chapter-dropdown-item cancel" key={menuItems.length}>
            <a>Cancel</a>
          </li>
      );
      return (<ul className={classNames}>
                <span className="brand-play-chapter-dropdown-arrow" />
                {menuItems}
              </ul>);
    }
  });
});
