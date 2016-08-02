/*global define*/
define([
  'react',
  'components/standalone_player',
  'components/json_editor'
], function(
  React,

  StandalonePlayer,
  JSONEditor
){

  'use strict';
  /**
   * @jsx React.DOM
   */
  return React.createClass({
    displayName: "Player.WithJSONEditor",
    render: function(){
      return (
          <div className="layout">
            <div className="left-side">
              <StandalonePlayer { ...this.props } />
            </div>
            <div className="right-side">
              <JSONEditor />
            </div>
          </div>
      );
    }
  });
});
