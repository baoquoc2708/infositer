/*global define*/
define([
  'md5',
  'reflux',
  'mixins/store_state'
],function(
  md5,
  Reflux,
  StoreState
) {
  'use strict';
  const PING_IMG = 'http://img.medscapestatic.com/pi/global/logos/mscp/logo-medscape2013.png';

  return Reflux.createStore({
    mixins: [ StoreState],
    stateNamespace: 'error',
    init: function() {
      // TODO: figure out a lightweight file that we can ping to check
      // network status.
      //
      let id = setInterval(function() {
        let img = new Image(0, 0);
        img.onerror = this.onError.bind(this);
        img.onload  = this.onErrorCleared.bind(this);
        img.src     = PING_IMG + '?' + md5(Date.now());
      }.bind(this), 5000);
      $(window).on('beforeunload', function() {
        this.ignoreOffline = true;
        clearInterval(id);
      }.bind(this));
    },
    onError: function(error) {
      console.log(error);
      if(this.ignoreOffline) return;
      this.setState({
        status: 'offline'
      });
    },
    onErrorCleared: function() {
      if(this.state.status) {
        console.log('back online');
        this.setState({
          status: null
        });
      }
    }
  });
});
