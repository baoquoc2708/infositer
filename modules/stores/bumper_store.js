import Reflux from 'reflux';
import StoreState from 'mixins/store_state';
import BumperActions from 'actions/bumper_actions';

export default Reflux.createStore({
  listenables: [ BumperActions ],
  mixins: [ StoreState ],
  stateNamespace: 'bumper',
  onLoad() {
    this.setState({
      isLoading: true,
      errorMessage: ''
    });
  },
  onLoadFailed(message) {
    this.setState({
      isLoading: false,
      errorMessage: message
    });
  },
  onLoadCompleted(content) {
    this.setState({
      isLoading: false,
      content
    });
  }
});
