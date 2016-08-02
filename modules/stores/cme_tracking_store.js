/* eslint camelcase: 0 */
/* global s_pageview_id */
import { defaults }    from '_';
import Reflux          from 'reflux';
import { isMobile }    from 'utils/util';
import CMETracking     from 'mixins/cme_tracking';
import Metrics         from 'video/video-metrics';
import TrackingActions from 'actions/cme_tracking_actions';
import VideoStore      from 'stores/video_store';
import DescriptorStore from 'stores/descriptor_store';

export default Reflux.createStore({
  listenables: [ TrackingActions ],
  mixins: [ CMETracking ],
  playerPrefix: 'video',
  init() {
    this.setupGlobals();
    this.listenTo(VideoStore, this.onVideoChange.bind(this));
  },
  onDescriptorLoad() {
    if(DescriptorStore.isAudio()) {
      this.stopListeningToAll(TrackingActions);
    }
  },
  onVideoChange(state) {
    const { event, api } = state.video;
    if(event === 'ready') {
      this.metrics = new Metrics();
      this.metrics.init(api);
      this.metrics.isProfessional = true;
      this.metrics.setModuleId('cme');
      this.metrics.setPlayerName(this.getPlayerName());
    } else if (event === 'volumeChanged') {
      if(VideoStore.state.currentVolume === 0) {
        this.isMuted = true;
        this._metrics('ctl_mute');
      } else if(this.isMuted === true) {
        this.isMuted = false;
        this._metrics('ctl_unmute');
      }
    } else if (!this.hasStarted && event === 'play') {
      this.hasStarted = true;
      this.metrics.heartbeat();
    }
  },
  /**
   * @param action {string} - one of 'prev', 'next', 1-based video index,
   *     or 'prev2', 'next2' for link text rather than video image click.
   */
  onPlaylistNavigate(action) {
    // TODO: throw error on bad action
    const name = isMobile()? `ctl_vidlist2_${action}` : `ctl_show_${action}`;
    this._metrics(name);
  },
  _metrics(name, options={ }) {
    if(!this.metrics) return;
    const opts   = defaults(options, { prop24: s_pageview_id || '' });
    this.metrics.metrics(null, `-${name}`, opts);
  }
});
