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
){
  'use strict';
  /**
   * @jsx React.DOM
   */
  return React.createClass({
    displayName: "Player.PlaylistAsChapters",
    mixins: [ Reflux.listenTo(VideoStore, "onVideoChange") ],
    getInitialState: function() {
      return { isOpen: false, index: this.props.index };
    },
    onVideoChange: function(state) {
      var nextIndex, nextVideo;

      if(state.video.event === "videoSelected") {
        this.setState({ index: state.video.index });
      }

      if(state.video.event === 'ended'){
        nextIndex = state.video.index + 1,
        nextVideo = this.props.descriptor.videos[nextIndex];
        if(!!nextVideo) {
          VideoActions.selectVideo(nextVideo, nextIndex);
        }
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
      }, this);

      return (
        <div className='video-player-playlist-as-chapters'>
          <p>playlist</p>
          <ul className="video-player-playlist-index">{ items }</ul>
        </div>
      );
    }
  });
});
