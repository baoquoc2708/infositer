/*
 * Whooboy. This deals with the craziness that is working around
 * Akamai's jank handling of iOS7. It also seems to fix several things
 * with iOS8 though. . . This needs to be refactored a bit to identify
 * which stuff is really iOS7 only.
 */
export default {
  initIOS7Hacks: function() {
    let element = this.mediaApi._v.getMediaElement();

    _.forEach(this.getEventMappings(), function(handler, event) {
      this.mediaApi.removeEventListener(event);
      element.addEventListener(event, this[handler].bind(this));
    }, this);

    this.mediaApi.getDuration = function() {
      return element.duration;
    };
    this.mediaApi.getCurrentTime = function() {
      return element.currentTime;
    };
    this.mediaApi.getVolume = function() {
      return element.volume;
    };

    this._apiSetMedia      = this.mediaApi.setMedia;
    this.mediaApi.setMedia = function(video) {
      let suffix = _.last(element.src.split('.')),
          newSrc = _.find(video.source, function(descriptor) {
            return descriptor.src.match(new RegExp(suffix + '$'));
          }).src;
      element.src    = newSrc;
      element.poster = video.poster;
    };
    this.mediaApi.play = function() {
      element.play();
    };
  },

  clearIOS7Hacks: function() {
    const element = this.mediaApi._v.getMediaElement();

    _.forEach(this.getEventMappings(), function(handler, event) {
      element.removeEventListener(event, this[handler].bind(this));
      this.mediaApi.addEventListener(event, this[handler].bind(this));
    }, this);
  }
};
