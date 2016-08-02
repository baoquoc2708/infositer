/*global define*/
define([
  'classnames',
  'react',
  'reflux'
], function(
  cx,
  React,
  Reflux
){
  'use strict';
  /**
   * @jsx React.DOM
   *
   * this weirdo exists only to present embedded data in the html so
   * that the QNA lib can scrape it for info.
   */
  return React.createClass({
    displayName: "QNA.Question",
    render: function(){
      var
      weirdJSON = JSON.stringify(this.props.questionConfig).replace(/[\{\}]/g,''),
      classes = cx({
        'is-visible': this.props.isActive,
        'qna-question': true,
        'questionnaire-in-video': true
      });

      return (
          <div id={this.props.id} className={classes}>
            <div className="content">
              <div className="question" data-bind={weirdJSON}></div>
            </div>
            {this.props.children}
          </div>
      );
    }
  });
});
