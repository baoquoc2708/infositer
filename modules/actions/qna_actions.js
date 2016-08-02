/*global define*/
define(["jquery", "reflux"], function($, Reflux){
  var Actions = Reflux.createActions([
    "launch",
    "close"
  ]);

  return Actions;
});
