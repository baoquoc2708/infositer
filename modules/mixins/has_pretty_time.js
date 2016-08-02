import _ from '_';
/**
 * Utility mixin for dealing with times in the format: HH:MM:SS
 */
export default {
  /**
   * @param {string} prettyTime - Time in the format HH::MM:SS
   * @returns {number} - Seconds
   */
  secondsFromPrettyTime: function(prettyTime) {
    return _.reduce(prettyTime.split(':').reverse(), function(state, chunk) {
      return {
        seconds: state.seconds + (parseInt(chunk, 10) * state.multiplier),
        multiplier: state.multiplier * 60
      };
    }, { seconds: 0, multiplier: 1 }).seconds;
  },
  /**
   * @param {number} seconds
   * @param {number} [places=3] - The number of places to return. E.g. 3 -> '00:00:00' 2 -> '00:00'
   */
  secondsToPrettyTime: function(seconds, places) {
    let hours   = Math.floor(seconds / 3600),
        minutes = Math.floor((seconds - (hours * 3600)) / 60),
        times   = [ hours, minutes, Math.floor(seconds - (hours * 3600) - (minutes * 60)) ],
        offset;

    if(places) {
      offset = times.length - places;
    } else {
      offset = (seconds > (60 * 60))? 0 : 1;
    }

    return _.map(times.slice(offset), function(time) {
      if(isNaN(time)) {
        return '00';
      } else if (time < 10) {
        return '0' + time;
      } else {
        return time.toString();
      }
    }).join(':');
  }
};
