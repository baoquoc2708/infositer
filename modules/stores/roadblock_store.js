import Reflux           from 'reflux';
import StoreState       from 'mixins/store_state';
import HasPrettyTime    from 'mixins/has_pretty_time';
import RoadBlockActions from 'actions/roadblock_actions';
import { isEmpty }      from '_';


export default Reflux.createStore({
  listenables: RoadBlockActions,
  mixins: [StoreState, HasPrettyTime],
  getInitialState() {
    return { roadblocks: [] };
  },
  getRoadBlockedTime() {
    return this.state.minTime;
  },
  onClearRoadBlock(qaidFormPage) {
    const filteredRoadblocks = this.state.roadblocks.filter((roadblock) => {
      return (roadblock.qaidFormPage !==  qaidFormPage);
    });
    this.setState({
      roadblocks: filteredRoadblocks,
      minTime: this.getNewMinTime(filteredRoadblocks)
    });
  },
  getNewMinTime(segments) {
    const roadblocks = segments || this.state.roadblocks,
          minTime = roadblocks.reduce((previousValue, currentValue) => {
                      return Math.min(previousValue, this.secondsFromPrettyTime(currentValue.startTime));
                    }, Number.MAX_VALUE);
    return minTime;
  },
  onSetUpRoadBlocks(segments) {
    if(!isEmpty(segments)) {
      const roadblockedSegments = segments.map((roadblock)=> { // eslint-disable-line prefer-const
        const newRoadblock = {
          cleared: false,
          endTime: roadblock.endTime,
          qaidFormPage: roadblock.qaidFormPage,
          startTime: roadblock.startTime
        };
        return newRoadblock;
      });
      this.setState({
          roadblocks: roadblockedSegments,
          minTime: this.getNewMinTime(roadblockedSegments)
      });
    }
  }
});
