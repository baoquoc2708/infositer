import $                  from 'jquery';
import React              from 'react';
import Util               from 'utils/util';
import NotesActions       from 'actions/notes_actions';
import NotesStore         from 'stores/notes_store';
import MenuDropdown       from 'components/brand_play/menu_dropdown';
import ChapterDropdown    from 'components/brand_play/chapter_dropdown';
  /**
   * @jsx React.DOM
   */
export default React.createClass({
    displayName: "BrandPlay.Chrome",
    showNotes: function() {
      NotesActions.show();
    },
    render: function(){
      var menuBar = null;
      if(!Util.isApp()) {
        menuBar = this.renderMenuBar();
      }

      return (
          <div className="brand-play-chrome">
          <h1 className="brand-play-chrome-title"
              dangerouslySetInnerHTML={{ __html: ''+this.props.title }} />
            {menuBar}
            {this.props.children}
          </div>
      );
    },
    renderMenuBar: function() {
      return (
            <div className="brand-play-chrome-menu-bar">
              <MenuDropdown links={this.props.dropdownLinks} />
              <button onClick={this.showNotes} className="brand-play-chrome-notes-button" />
              <ChapterDropdown chapters={this.props.chapters} />
            </div>
      );
    }
  });