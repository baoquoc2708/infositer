/*global define*/
define([
  'classnames',
  'react',
  'reflux',
  'actions/video_actions',
  'actions/remember_me_actions',
  'stores/remember_me_store',
  'stores/descriptor_store'
], function(
  cx,
  React,
  Reflux,
  VideoActions,
  RememberMeActions,
  RememberMeStore,
  DescriptorStore
){
  'use strict';
  /**
   * @jsx React.DOM
   */
  return React.createClass({
    displayName: "BrandPlay.RestartResume",
    mixins: [ Reflux.connect(RememberMeStore) ],
    getInitialState: function() {
      return { rememberMe: { chapter: null } };
    },
    resume: function() {
      var video = DescriptorStore.getVideo(this.state.rememberMe.chapter);
      VideoActions.selectVideo(video, this.state.rememberMe.chapter);
      VideoActions.start();
      RememberMeActions.clear();
    },
    restart: function() {
      RememberMeActions.clear();
      VideoActions.start();
    },
    componentDidMount: function() {
      RememberMeActions.check();
    },
    componentDidUpdate: function() {
      if(this.state.rememberMe.chapter) {
          this.resume();
          // VideoActions.stopAutoplay(); // make this config, because
          // I'm sure we'll want to make this modal for brand advance.
      }
    },
    render: function(){
      var classNames = cx({
        'brand-play-restart-resume': true,
        'is-active': !!this.state.rememberMe.chapter
      });
      // WARNING this is currently completely invisible on Brand Play,
      // but we'll probably use the markup and modal for Brand Advance.
      return (
          <div className={classNames}>
            <div className="brand-play-restart-resume-right">
              <div className="last-viewed">
                <p>Click Resume to start on the most recently viewed video.</p>
              </div>
              <div className="brand-play-restart-resume-buttons">
                <div onClick={this.resume} className="resume"><span>Resume</span></div>
                <div onClick={this.restart} className="restart"><span>Restart</span></div>
              </div>
            </div>
          </div>
      );
    }
  });
});
