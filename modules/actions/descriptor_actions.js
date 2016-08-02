import $              from 'jquery';
import { urlToJSONP } from 'utils/util';
import Reflux         from 'reflux';

let Actions = Reflux.createActions({
  load:     { asyncResult: true, children: [ 'completed', 'failed' ] },
  loadJSON: { }
});

function isRemote(url) {
  return url.indexOf('http') !== -1 && !window.location.host.match(url);
}

Actions.load.listen(function(dataUrl) {
  const url = isRemote(dataUrl) ? urlToJSONP(dataUrl) : dataUrl;
  $.getJSON(url).done((data) => {
    this.completed(data);
  }).fail(this.failed);
});

export default Actions;
