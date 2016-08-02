export default {
    getStyle: function(elapsed, total) {
      let percent = ((elapsed / total) * 100).toFixed(2);
      if(isNaN(percent) || percent < 0) {
        percent = 0;
      } else if(percent > 100) {
        percent = 100;
      }
      return {
        width: percent + '%'
      };
    }
};
