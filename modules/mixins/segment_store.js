import { capitalize } from '_';
import RangeTree      from 'utils/range_tree';
import HasPrettyTime  from 'mixins/has_pretty_time';
import TickStore      from 'stores/tick_store';

/**
 * Mixin SegmentStore
 *
 * Example store definition:
 *
 *      mixin: [ SegmentStore ],
 *      segmentProperty: 'slides',
 *      segmentKey: 'slide'
 *
 *  Example video descriptor:
 *
 *      videos: [
 *       {
 *         ...
 *         slides: [ {startTime: "00:00:00", endTime: "00:00:15", name: "Slide 1" }, ...  ]
 *       }
 *      ]
 *
 * Would trigger `setState({ lastSlide: null, slide: slides[0] })` when video[0] started and
 * `setState({ lastSlide: slides[0], slide: slides[1] })` on the 15th second.
 *
 * SegmentStore allows leaving the `endTime` of a segment
 * undefined. It will implicitely assume that the `endTime` is the
 * same as the `startTime` of the next segment or 99:99:99 for the last
 * segment.
 *
 */

export default {
  mixins: [ HasPrettyTime ],
  init: function() {
    if(typeof this.segmentProperty === 'undefined') {
      throw new Error('Must define `segmentProperty` in order to mix in SegmentStore, ' +
                      'this is the attribute of the video config containing the segments ' +
                      'e.g. `slides`, `chapters`, etc. . .');
    }
    if(typeof this.segmentKey === 'undefined') {
      throw new Error('Must define `segmentKey` in order to mix in SegmentStore, ' +
                      'this is typically the non-plural of `segmentProperty`, e.g. ' +
                      '`slide`, `chapter`, . . .');
    }
    if(typeof this.setState === 'undefined') {
      throw new Error('Must mix in `StoreState` to use SegmentStore. If you are ' +
                      'mixing StoreState in already, check the order of the mixin array.');
    }
    this.segmentState = { };
    this.listenTo(TickStore, this.onTick);
  },
  onTick: function(state) {
    const { meta, currentTime } = state.tick;
    if(meta !== this.segmentState.meta) {
      const segments         = meta[this.segmentProperty];
      if(!segments) return;

      this.segmentState.meta = meta;
      this.segmentState.map  = segments.reduce((memo, segment) => {
        const start = this.secondsFromPrettyTime(segment.startTime),
                  i = memo.length;
        let end   = segment.endTime;
        if(!end) {
          end = segments[i+1] ? segments[i+1].startTime : '99:99:99';
        }
        segment.endTime = end;
        segment.index   = i;
        end = this.secondsFromPrettyTime(end);
        return memo.add(start, end, segment);
      }, new RangeTree());
      this.setState({
        [this.segmentProperty]: segments
      });
    }
    if(!this.segmentState.map) return;

    const currentSegment = this.segmentState.map.inRange(currentTime);
    if(currentSegment !== this.state[this.segmentKey]) {
      if(!!currentSegment) {
        const lastSegment = this.segmentState.map.pred(currentTime),
            nextSegment = this.segmentState.map.succ(currentTime);
        this.setState({
          [`last${capitalize(this.segmentKey)}`]: lastSegment,
          [this.segmentKey]:                      currentSegment,
          [`next${capitalize(this.segmentKey)}`]: nextSegment
        });
      } else if(this.segmentKey === 'question') {
        this.setState({
          [`last${capitalize(this.segmentKey)}`]: null,
          [this.segmentKey]:                      null,
          [`next${capitalize(this.segmentKey)}`]: null
        });
      }
    }
  }
};
