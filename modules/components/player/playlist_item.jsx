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
    displayName: "Player.PlaylistItem",
    selectVideo: function(e) {
      e.preventDefault();
      if(!this.props.isSelected) {
        if(this.props.onClick) {
          this.props.onClick(e);
        }
        VideoActions.selectVideo(this.props.video, this.props.index);
        VideoActions.start();
      }
    },
    render: function(){
      var classNames = cx({
        'video-player-playlist-item': true,
        'is-selected': this.props.isSelected,
        'has-viewed': this.props.hasViewed
      }), content;

      if(this.props.children) {
        content = this.props.children;
      } else {
        content = <span className="playlist-video-title">{this.props.video.title}</span>;
      }

      return (
          <li className={classNames} onClick={this.selectVideo} onTouchEnd={this.selectVideo}>{content}</li>
      );
    }
  });
});
