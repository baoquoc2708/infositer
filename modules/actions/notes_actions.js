/*global define*/
define(["jquery", "reflux"], function($, Reflux){
  var Actions = Reflux.createActions([
    "show",
    "close"
  ]);

  return Actions;
});
