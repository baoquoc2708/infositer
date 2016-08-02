import { flatten, isArray } from '_';
import { mixin }            from 'utils/util';
import HasPrettyTime        from 'mixins/has_pretty_time';
import CompilerMethods      from 'mixins/descriptor_compiler_methods';

const AudioCompiler = function(audios,  isLocal) {
  this.audios  = flatten([audios]);
  this.isValid = true;
  this.isLocal = isLocal;
};

const MP4_CDN_HOST = 'http://webmd-a.akamaihd.net';

AudioCompiler.prototype = mixin(HasPrettyTime, CompilerMethods, {
  compile() {
    return this.prefixImageRefs().buildSources().setDurations();
  },
  getAudios() {
    return this.audios;
  },
  buildSources(defaultRes) {
    const res = defaultRes || 'a96k';
    if(this.isLocal) {
      this.each((audio) => {
        if(isArray(audio.source)) {
          return;
        } else {
          const fragment = audio.source;
          audio.source   = `${MP4_CDN_HOST}/delivery${fragment.split(',')[0]}${res}.mp4`;
        }
      });
    } else {
      this.each((audio) => {
        audio.source = audio.audioSource;
      });
    }
    return this;
  },
  getAudio(i) {
    return this.audios[i];
  },
  each(f) {
    if(!this.isValid) {
      console.warn('attempting to compile a audio config that doesn\'t have any audio resources.');
      return;
    }
    this.audios.forEach(f);
  }
});

export default AudioCompiler;
