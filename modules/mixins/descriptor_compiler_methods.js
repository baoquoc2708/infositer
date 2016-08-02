import { imageServer, envCheck }     from 'utils/util';
export default {
  setDurations() {
    this.each((video) => {
      if(video.duration && typeof video.duration !== 'number') {
        video.duration = this.secondsFromPrettyTime(video.duration);
      }
    });
    return this;
  },
  /*
   * This is a temporary measure as the image paths are coming through prefixed with a bloody `en`
   */
  prefixImageRefs() {
    this.each((media) => {
      [ 'poster', 'bumperImage', 'watermark' ].forEach((key) => {
        // FIXME: I REALLY dislike shoving the envCheck in here.
        // This is only for CME and it's so that we can test locally with
        // remote config json.
        if(media[key]) {
          media[key] = `${imageServer(envCheck())}/${media[key].replace(/^en\//, '')}`;
        }
      });
    });
    return this;
  }
};
