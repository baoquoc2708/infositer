/*global define*/
define([
  '_',
  'classnames',
  'react',
  'reflux',
  'mixins/has_pretty_time',
  'actions/video_actions'
], function(
  _,
  cx,
  React,
  Reflux,

  HasPrettyTime,
  VideoActions
){
  /**
   * @jsx React.DOM
   */
  return React.createClass({
    displayName: "Player.TocItem",
    mixins: [ HasPrettyTime ],
    selectVideo: function(e) {
      e.preventDefault();
      if(!this.props.isSelected) {
        VideoActions.setCurrentTime(this.secondsFromPrettyTime(this.props.chapter.startTime));
      }
    },
    render: function(){
      var classNames = cx({
        'video-player-toc-item': true,
        'is-selected': this.props.isSelected
      });

      return (
          <li className={classNames} onClick={this.selectChapter}>
            <span className="toc-chapter-title">{this.props.chapter.title}</span>
          </li>
      );
    }
  });
});
