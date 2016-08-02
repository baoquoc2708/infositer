/*global define*/
define(['_'], function(_){
  return {
    /**
     * For controls that need to be adjusted along a slider. E.g. volume bars, video progress bars
     *
     * For instance
     *   * If you have a slider that is 500 pixels long and it represents the playback time
     *   * The playback time is 600 seconds
     *   * The click event was at the 250th pixel
     *   * The response will be 300 (50% of 600)
     *
     * @param {event} mouseEvent - An event from a click having a `.pageX` attribute
     * @param {number} totalValue - The top end of the range being adjusted for.
     *
     * @returns {number} - a number that is N% of the totalValue based
     * on where the mouse was clicked on the `mouseEvent.currentTarget`
     */
    getSliderValue: function(mouseEvent, totalValue) {
      var pageX         = mouseEvent.nativeEvent? mouseEvent.nativeEvent.pageX : mouseEvent.pageX,
          domNode       = $(mouseEvent.currentTarget),
          mousePosition = pageX - domNode.offset().left,
          sliderPercent = mousePosition / domNode.width();
      return totalValue * sliderPercent;
    }
  };
});
