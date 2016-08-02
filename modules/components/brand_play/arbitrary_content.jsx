/*global define*/
define([
  '_',
  'jquery',
  'classnames',
  'react'
], function(
  _,
  $,
  cx,
  React
){
  'use strict';
  /**
   * @jsx React.DOM
   */
  return React.createClass({
    displayName: "BrandPlay.ArbitraryContent",
    componentWillMount: function() {
      var $content = $(this.props.contentID);
      this.setState({
        content: $content.html()
      });
      $content.remove();
    },
    render: function(){
      var content    = this.state.content?
            (<div dangerouslySetInnerHTML={{__html: this.state.content }}></div>) : null,

          classNames = cx({
            'brand-play-arbitrary-content': true,
            'is-active': !!this.state.content
          }, _.kebabCase(this.props.contentID));

      return (<div className={classNames}>{content}</div>);
    }
  });
});
