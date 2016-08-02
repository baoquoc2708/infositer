import $              from 'jquery';
import Reflux         from 'reflux';
// import { urlToJSONP } from 'utils/util';

let Actions = Reflux.createActions({
  load: { asyncResult: true, children: [ 'completed', 'failed' ] },
  loadSlide: { asyncResult: true, children: [ 'completed', 'failed' ] },
  next: { },
  prev: { }
});

Actions.load.listenAndPromise(url => $.getJSON(url));
Actions.loadSlide.listen(function(index, url) {
  return $.ajax({
      dataType: 'text',
      url:url
    }).done((html) => this.completed(index, html)).fail(this.failed);
});

export default Actions;
