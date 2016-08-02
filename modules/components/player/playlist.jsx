/*global define*/
define([
  '_',
  'classnames',
  'react',
  'reflux',
  'actions/video_actions',
  'stores/video_store',
  'components/player/playlist_item'
], function(
  _,
  cx,
  React,
  Reflux,

  VideoActions,
  VideoStore,
  PlaylistItem
) {
  'use strict';
  /**
   * @jsx React.DOM
   */
  return React.createClass({
    displayName: "Player.Playlist",
    mixins: [ Reflux.listenTo(VideoStore, "onVideoChange") ],
    getInitialState: function() {
      return { isOpen: false, index: this.props.index };
    },
    onVideoChange: function(state) {
      if(state.video.event === "videoSelected") {
        this.setState({ index: state.video.index });
      }
    },
    showMenu: function(e) {
      this.setState({ isOpen: true });
    },
    hideMenu: function(e) {
      this.setState({ isOpen: false });
    },
    render: function(){
      var items     = _.map(this.props.descriptor.videos, function(video, i){
            return (
                <PlaylistItem key={i} index={i} video={video} isSelected={i === this.state.index} />
            );
          }, this),
          classNames = cx({
            'video-player-playlist': true,
            'is-open': this.state.isOpen
          });

      return (
        <div onMouseEnter={this.showMenu}
             onMouseLeave={this.hideMenu}
             className={classNames}>
          <p>playlist</p>
          <ul className="video-player-playlist-index">{ items }</ul>
        </div>
      );
    }
  });
});
