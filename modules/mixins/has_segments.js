define(['_'], function(_) {
  /**
   * Mixin for a component that has segments. A segment collection is
   * made up of objects that conform to the following interface:
   *
   *   { startTime: "HH:MM:SS", endTime: "HH:MM:SS" }
   *
   * A segment is `current` when the `currentTime` of the video falls
   * between its `startTime` and `endTime`.
   */
  return function(kind) {
    return {
      getTime: function(startOrEnd, segment) {
            var times = _.map(segment[startOrEnd + "Time"].split(":"), (function(t){return parseInt(t);}));
        return _.reduce(times, function(t, acc){
          return t + acc;
        }, 0);
      },
      getNextSegment: function() {
        var currentEnd,
            currentSegment = this.getCurrentSegment();

        if(currentSegment) {
          currentEnd = this.getTime("end", currentSegment);
          return _.find(this.props[kind], function(segment) {
            return this.getTime("start", segment) === currentEnd;
          }, this);
        } else {
          return undefined;
        }
      },
      getPreviousSegment: function() {
        var currentStart,
            currentSegment = this.getCurrentSegment();

        if(currentSegment) {
          currentStart = this.getTime("start", currentSegment);
          return _.find(this.props[kind], function(segment) {
            return this.getTime("end", segment) === currentStart;
          }, this);
        } else {
          return undefined;
        }
      },
      getCurrentSegment: function() {
        var currentTime = this.props.currentTime;

        if(currentTime) {
          return _.find(this.props[kind], _.bind(function(segment) {
            var start = this.getTime("start", segment),
                end   = this.getTime("end", segment);

            return start <= currentTime && end >= currentTime;
          }, this));
        } else {
          return undefined;
        }
      }
    };
  };
});
