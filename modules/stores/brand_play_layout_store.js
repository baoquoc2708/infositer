/*global define*/
define([
  'jquery',
  '_',
  'reflux',
  'utils/util',
  'stores/descriptor_store',
  'actions/brand_play_layout_actions'
], function(
  $,
  _,
  Reflux,
  Util,
  DescriptorStore,
  BrandPlayLayoutActions
) {
  'use strict';
  return Reflux.createStore({
    listenables: BrandPlayLayoutActions,
    canShowBoth: false,
    init: function() {
      this.listenTo(DescriptorStore, 'onLoad');
      this.$isiContent = $('.isi-content');
      this.isiContent  = this.$isiContent.html();
      this.$isiContent.remove();
    },

    onLoad: function(state) {
      let config = _.get(state, 'descriptor.isi') || { },
          videos = _.get(state, 'descriptor.videos') || [ ];

      this.hasISI      = config.hasISI;
      this.canShowBoth = videos.length > 1; // chapters can be displayed too

      if(config.hasISI) {
        this.$brandPlay  = $('.brand-play-content');
        this.$brandPlay.addClass('has-isi');
      }
    }
  });
});
