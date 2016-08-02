/*global define*/
define([
  'jquery',
  '_',
  'reflux',
  'utils/util',
  'mixins/store_state',
  'mixins/has_medscape_globals',
  'actions/remember_me_actions'
], function(
  $,
  _,
  Reflux,
  Util,
  StoreState,
  HasMedscapeGlobals,
  RememberMeActions
) {
  'use strict';

  return Reflux.createStore({
    mixins: [ HasMedscapeGlobals, StoreState ],
    listenables: [ RememberMeActions ],
    stateNamespace: 'rememberMe',
    init: function() {
      this.initMedscapeGlobals();
    },
    onClear: function() {
      this.setState({
        chapter: undefined
      });
    },
    onCheck: function() {
      var param = 'startVideo';
      var urlParams = window.location.href;
      if((urlParams.indexOf('?' + param + '=') != -1) || (urlParams.indexOf('&' + param + '=') != -1)){
          /* Mehdi: I do this check to see if the “tartVideo” parameter exists. 
          If so, then we give it priority and we disable the “Remember me” feature. Otherwise we enable it (the 'else' case).*/
      }
      else{
          let url = [
            'http://api',
            Util.envCheck(),
            '.medscape.com/cp/ipplastvisit/user/',
            (Number(this.$userId) / 27.0),
            '/activities/',
            this.cp.activityId,
            '?callback=?',
            '&' + $.param(this.cp)
          ].join('');

          $.getJSON(url)
            .done(function(response) {
              let chapter = response.activities[0].scene,
                  index;
              if(chapter) {
                index = parseInt(chapter.name.split('scn')[1], 10) - 1; // fucking 1 based indexes
                if(index > 0) {
                  this.setState({
                    chapter: index
                  });
                }
              }
            }.bind(this))
            .fail(function(error) {
              console.log(error);
            });
        }
    }
  });
});
