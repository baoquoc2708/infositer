
import { isArray, flatten,
          reduce, isEmpty  }      from '_';
import { mixin, isLocal,
         imageServer, envCheck,
        isMobile }                from 'utils/util';
import HasPrettyTime              from 'mixins/has_pretty_time';
import CompilerMethods            from 'mixins/descriptor_compiler_methods';


const STREAM_CDN_HOST = 'http://webmd-vh.akamaihd.net',
      MP4_CDN_HOST    = 'http://webmd-a.akamaihd.net';

const VideoCompiler = function(videos, ccInfo) {
  this.videos  = flatten([videos]);
  this.isValid = true;
  this.ccInfo  = ccInfo;
};

VideoCompiler.prototype = mixin(HasPrettyTime, CompilerMethods, {
  compile() {
    return this.prefixImageRefs().setDurations().buildSources().setCC();
  },
  setCC() {
    this.each((video) => {
      this._setClosedCaptioning(video.ccFileRoot, this.ccInfo, video);
    });
  },
  _setClosedCaptioning(prefix, captions, video) {
    if(prefix && !isEmpty(captions)) {
      video.track = reduce(captions, (acc, caption, key) => {
        // sloppy data :/
        if(key !== '') {
          // ALSO SLOPPY DATA
          let url = `/${prefix.replace(/^en\//, '')}/${caption}`;
          url = url.replace(/\/\//g, '/');
          url = imageServer(envCheck()) + url;
          return acc.concat({
            kind: 'captions',
            type: 'application/ttml+xml',
            srclang: key.toLowerCase(),
            src: isLocal() ? `/products/cme/config/${caption}` : url
          });
        } else {
          return acc;
        }
      }, [ ]);
    }
  },
  buildSources() {
    this.each((video) => {
      const res = video.bitRate || '1000k';
      if(isArray(video.source)) return;
      const fragment = video.source;
      video.source   = [
        {
          src: `${STREAM_CDN_HOST}/i/delivery${fragment}.csmil/master.m3u8`,
          type: 'application/x-mpegURL'
        },
        {
          src: `${STREAM_CDN_HOST}/z/delivery${fragment}.csmil/manifest.f4m`,
          type: 'video/f4m'
        },
        {
          src: `${MP4_CDN_HOST}/delivery${fragment.split(',')[0]}${res}.mp4`,
          type: 'video/mp4'
        }
      ];
    });
    return this;
  },

  getVideos() {
    return this.videos;
  },
  getVideo(i) {
    return this.videos[i];
  },
  each(f) {
    if(!this.isValid) {
      console.warn('attempting to compile a video config that doesn\'t have any video resources.');
      return;
    }
    this.videos.forEach(f);
  }
});

export default VideoCompiler;
