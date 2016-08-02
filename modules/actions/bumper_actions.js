import $                   from 'jquery';
import Reflux, { Promise } from 'reflux';

let Actions = Reflux.createActions({
  load: { asyncResult: true, children: [ 'completed', 'failed' ] },
});

Actions.load.listen(function(url) {
  return $.get(url).done(this.completed).fail(this.failed);
});


export default Actions;
