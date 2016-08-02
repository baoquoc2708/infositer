/*global define*/
define([
  '_',
  'classnames',
  'react',
  'reflux',

  'utils/util',

  'actions/descriptor_actions',
  'stores/descriptor_store'

], function(
  _,
  cx,
  React,
  Reflux,

  Util,

  DescriptorActions,
  DescriptorStore
){
  'use strict';
  /**
   * @jsx React.DOM
   */
  return React.createClass({
    displayName: "JSONEditor",
    mixins: [ Reflux.connect(DescriptorStore) ],
    getInitialState: function() {
      return { editorText: "",  errorMessage: null };
    },
    onEdit: function(e){
      this.setState({
        editorText: e.target.value,
        errorMessage: null
      });
    },
    save: function(){
      try {
        var parsed = JSON.parse(this.refs.editor.getDOMNode().value);
        DescriptorActions.loadJSON(parsed);
        this.setState({
          editorText: JSON.stringify(this.editorText, null, 2)
        });
      } catch(errorBaby){
        this.setState({
          errorMessage: errorBaby.toString()
        });
      }
    },
    render: function() {
      var text    = this.state.editorText? this.state.editorText :
            JSON.stringify(DescriptorStore.getDescriptor(), null, 2),
          classes = cx({
            'json-editor': true,
            'is-saved': text === JSON.stringify(DescriptorStore.getDescriptor(), null, 2)
          });

      return (
          <div className={classes}>
            <div className="json-editor-error-message">{this.state.errorMessage}</div>
            <textarea ref="editor" className="json-editor-text" value={text} onChange={this.onEdit}></textarea>
            <button className="json-editor-save-button" onClick={this.save}>save</button>
          </div>
      );
    }
  });
});
