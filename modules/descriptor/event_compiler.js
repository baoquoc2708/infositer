import { flatten, last, isNull } from '_';
import { mixin }                 from 'utils/util';
import HasPrettyTime             from 'mixins/has_pretty_time';
import CompilerMethods           from 'mixins/descriptor_compiler_methods';

let EventCompiler = function(events, slideRoot) {
  this.events    = flatten([events]);
  this.slideRoot = slideRoot;
  this.isValid   = !!events[0];
};

EventCompiler.prototype = mixin(HasPrettyTime, CompilerMethods, {
  compile() {
    this.buildEvents();
    return this;
  },
  buildEvents() {
    if(!this.isValid) return this;

    const imageServer = this.slideRoot;
    this.events = this.events.reduce((acc, event) => {
      switch(event.type) {
        case 'Image':
        case 'Slide':
        case 'HTML':
        case 'Video':
          if(event.assetUrl) {
            event.assetURL = `${imageServer.replace(/\/$/, '')}/${event.assetUrl.replace(/^\//, '')}`;
            // clean up key naming to keep conventions with components
            delete event.assetUrl;
          } else {
            console.error("event.assetURL should not be missing", event);
          }
          if(event.thumbnailOverride) {
            event.thumbnailOverride = `${imageServer.replace(/\/$/, '')}/${event.thumbnailOverride.replace(/^\//, '')}`;
          }
          acc.slides.push(event);
          break;
        case 'QA':
          if(isNull(event.endTime)) {
            event.endTime = this.secondsToPrettyTime((this.secondsFromPrettyTime(event.startTime) + 5), 2);
          }
          acc.qna.push(event);
          break;
        default:
          console.warn(`Unidentified event type: ${event.type} in stream`, event);
      }
      if(event.chapterTitle) {
        let lastTitle = last(acc.chapters) && last(acc.chapters).title;
        if(lastTitle !== event.chapterTitle) {
          acc.chapters.push({
            title: event.chapterTitle,
            startTime: event.startTime,
            // this is for the webmd video lib.
            startSeconds: this.secondsFromPrettyTime(event.startTime)
          });
        }
      }
      return acc;
    }, { slides: [ ], chapters: [ ], qna: [ ]});

    return this;
  },

  getEvents() {
    return this.isValid? this.events : { };
  }
});
export default EventCompiler;
