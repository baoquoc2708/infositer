/*global define*/
define([
  '_',
  'classnames',
  'react',
  'reflux',

  'stores/toc_store',

  'components/player/progress_bar'

], function(
  _,
  cx,
  React,
  Reflux,

  TocStore,

  ProgressBar
){
  'use strict';
  /**
   * @jsx React.DOM
   */
  return React.createClass({
    displayName: "Player.TOC",
    mixins: [ Reflux.connect(TocStore) ],
    getInitialState: function() {
      return { toc: { } };
    },
    render: function(){
      var selected = this.state.toc.currentChapter? this.state.toc.currentChapter.index : 0,
          items    = _.map(this.props.chapters, function(chapter, i){
            return <TocItem chapter={chapter} isSelected={i === selected} />;
          });
    }
  });
});
