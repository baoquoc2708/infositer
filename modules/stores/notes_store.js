/*global define*/
define([
  'jquery',
  '_',
  'reflux',
  'actions/notes_actions',
  'actions/video_actions'
], function(
  $,
  _,
  Reflux,
  NotesActions,
  VideoActions
) {
  'use strict';
  return Reflux.createStore({
    listenables: NotesActions,
    hasAttachedEvents: false,
    onShow: function() {
      if(!this.hasAttachedEvents) {
        this.attachEvents();
      }
      $('.overlay').addClass('open');
      VideoActions.pause();
      $(document).on('keyup', function(e) {
        if(e.keyCode === 27) {
          NotesActions.close();
        }
      });
    },
    onClose: function() {
      $('.overlay').removeClass('open');
      $(document).off('keyup');
    },
    attachEvents: function() {
      $('.overlay-close').on('click', function() {
        NotesActions.close();
      });
      this.hasAttachedEvents = true;
    }
  });
});
