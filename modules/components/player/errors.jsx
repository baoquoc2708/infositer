/*global define*/
define([
  'classnames',
  'react',
  'reflux',

  'stores/error_store'
], function(
  cx,
  React,
  Reflux,

  ErrorStore
){
  'use strict';
  /**
   * @jsx React.DOM
   */
  return React.createClass({
    displayName: "Player.Errors",
    mixins: [ Reflux.connect(ErrorStore) ],
    render: function(){
      var message = this.isError() ? 'You have lost your internet connection' : null,
          classes = cx({
            'is-error': this.isError(),
            'video-player-error': true
          });

      return (
          <div className={classes}>{message}</div>
      );
    },
    isError: function() {
      return this.state.error && this.state.error.status === 'offline'; // currently the only error
    }
  });
});
