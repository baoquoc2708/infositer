import { assign }                        from '_';
import { imageServer, isIpad, isMobile } from 'utils/util';
import VideoCompiler                     from 'descriptor/video_compiler';
import AudioCompiler                     from 'descriptor/audio_compiler';
import EventCompiler                     from 'descriptor/event_compiler';
import PlaylistCompiler                  from 'descriptor/playlist_compiler';
/**
 * Sticking to the principle of putting compilicated things in small easier-to-understand boxes,
 * this class is meant to decode the various kinds of configuration into a normalized form for
 * the video/audio player.
 *
 * It would be nice to go back and edit all of these configuration files so this wasn't
 * necessary. Perhaps one day. At least this way everything is unit tested and as clear
 * [as it can be].
 */
const Compiler = function(descriptor) {
  this.descriptor = descriptor;
};

Compiler.prototype = {
  compile() {
    this.sniff();
    this.mediaCompiler.compile();

    if(this.descriptor.isVideo) {
      this.descriptor.videos = this.mediaCompiler.getVideos();
    } else {
      this.descriptor.audios = this.mediaCompiler.getAudios();
    }
    if(!this.descriptor.initialIndex) {
      this.descriptor.initialIndex = this.getInitialIndex();
    }
    return this;
  },
  sniff() {
    let media;
    if(this.descriptor.config) {
      // probably from CME
      media = this.descriptor.config;
      if(this.descriptor.slideInfo) {
        this.eventCompiler = new EventCompiler(this.descriptor.slideInfo, media.slideRoot);
        assign(media, this.eventCompiler.compile().getEvents());
      }
      if(this.descriptor.playlistInfo) {
        this.playlistCompiler = new PlaylistCompiler(this.descriptor.playlistInfo, imageServer());
        media.playlist        = this.playlistCompiler.compile().getPlaylist();
      }
    } else {
      // probably from BrandPlay
      media = this.descriptor.videos;
    }
    if(media && media.source) {
        let nonQnaSlides = [];
        if(media.slides) {
           nonQnaSlides = media.slides.filter((i) => {
            switch(i.type) {
              case 'Image':
              case 'Slide':
              case 'HTML':
              case 'Video':
                return true;
              case 'QA':
                  return false;
              default:
                  return false;
            }
          });
        }
        if(nonQnaSlides.length === 0) {
            this.descriptor.config.poster += '?interpolation=lanczos-none&resize=932:524';
            this.descriptor.config.bumperImage += '?interpolation=lanczos-none&resize=932:524';
            media.bitRate = '2500k';
            this.mediaCompiler      = new VideoCompiler(media, this.descriptor.ccInfo);
            this.descriptor.isVideo = true;
        } else {
          if(!isIpad() && isMobile()) {
            media.bitRate = '750k';
            this.mediaCompiler      = new AudioCompiler(media, true);
            this.descriptor.isAudio = true;
          } else {
            media.bitRate = '1000k';
            this.descriptor.config.poster += '?interpolation=lanczos-none&resize=428:241';
            this.descriptor.config.bumperImage += '?interpolation=lanczos-none&resize=428:241';
            this.mediaCompiler      = new VideoCompiler(media, this.descriptor.ccInfo);
            this.descriptor.isVideo = true;
          }
        }
    } else if(media.audioSource) {
            this.mediaCompiler      = new AudioCompiler(media, false);
            this.descriptor.isAudio = true;
    } else {
        console.log('invalid config options. No video source or audio source found.');
    }
  },
  getDescriptor() {
    return this.descriptor;
  },
  getInitialIndex() {
      let sVideoParam = "startVideo", value = 0,
          urlSubstr   = location.search.substr(1),
          tempParam   = [];
      
      urlSubstr.split("&").forEach(function (param) {
          tempParam = param.split("=");
          if (tempParam[0] === sVideoParam)
              value = Number(decodeURIComponent(tempParam[1]));
      });
      return value;
  }
};

export default Compiler;
