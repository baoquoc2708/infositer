define(['jquery'], function($) {
  'use strict';
  /**
   * For components that need to get a height minus window offset height
   */
  return {
    getNodeHeight: function(node) {
        var height = $(window).height(),
            top = node.offset().top;
        return (height - top);
    }
  };
});
