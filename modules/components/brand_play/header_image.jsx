/*global define*/
define([
  'react'
], function(
  React
){
  'use strict';
  /**
   * @jsx React.DOM
   */
  return React.createClass({
    displayName: "BrandPlay.HeaderImage",
    render: function(){
      return (
          <img className="brand-play-header-image"
            src={this.props.headerURL} alt={this.props.title} />
      );
    }
  });
});
