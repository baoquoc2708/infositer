import React from 'react/addons';
const { update } = React.addons;
export default {
  init() {
    this.state = this._getInitialState();
  },
  _getInitialState() {
    if(this.getInitialState) return this.getInitialState();
    if(this.initialState)    return this.initialState;
    return { };
  },
  resetState() {
    this.state = this.getInitialState();
  },
  setState(state) {
    this.updateState({
      $merge: state
    });
  },
  updateState(query) {
    this.state = update(this.state, query);
    Object.freeze(this.state);
    if(this.stateNamespace) {
      this.trigger({
        [this.stateNamespace]: this.state
      });
    } else {
      this.trigger(this.state);
    }
  },
  getState() {
    return this.state;
  }
};
