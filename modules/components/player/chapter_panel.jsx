/*global define*/
define([
  '_',
  'classnames',
  'react',
  'reflux',
  'actions/video_actions',
  'stores/video_store'
], function(
  _,
  cx,
  React,
  Reflux,

  VideoActions
){
  /**
   * @jsx React.DOM
   */
  return React.createClass({
    displayName: "Player.ChapterPanel",
    selectVideo: function(e) {
      e.preventDefault();
      if(!this.props.isSelected) {
        VideoActions.selectVideo(this.props.video, this.props.index);
      }
    },
    render: function(){
      var classNames = cx({
        'video-player-chapter-panel': true,
        'is-selected': this.props.isSelected
      }), content;

      if(this.props.children) {
        content = this.props.children;
      } else {
        content = <span className="playlist-video-title">{this.props.video.title}</span>;
      }

      return <li className={classNames} onClick={this.selectVideo}>{content}</li>;
    }
  });
});
