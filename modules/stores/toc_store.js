import Reflux       from 'reflux';
import StoreState   from 'mixins/store_state';
import SegmentStore from 'mixins/segment_store';

export default Reflux.createStore({
  mixins: [ StoreState, SegmentStore ],
  stateNamespace: 'toc',
  segmentProperty: 'chapters',
  segmentKey:      'chapter'
});
