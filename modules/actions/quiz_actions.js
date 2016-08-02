import $                        from 'jquery';
import Reflux                   from 'reflux';

const QuizActions = Reflux.createActions({
  cancel: {},
  close: {},
  reset: {},
  hideLayer: {},
  requestQnaXml: { asyncResult: true, children: [ 'completed', 'failed' ] },
  showQuestion: {},
  hideQuestion: {},
  post: {},
  completed: {},
  failed: {},
  open: {},
  validate: {},
  complete: {}
});

QuizActions.requestQnaXml.shouldEmit = function() {
  if((QuizActions.ajaxRequest && QuizActions.ajaxRequest.readyState === 1)) {
    return false;
  }
  return true;
};
QuizActions.requestQnaXml.listen(function(qnas) {
  let qnaUrl;
  const location = window.location.hostname,
        qid = qnas[0].qaidFormPage.split('/')[0];
  if(location.match(/www/)) {
    qnaUrl = 'http://' + location + '/qnaService?questionnaireID=' + qid;
  } else if(location.match(/api./)) {
    qnaUrl = 'http://www.' + location.replace('api.', '') + '/qnaService?questionnaireID=' + qid;
  } else if(location.match(/localhost/)) { // for local testing
    qnaUrl = 'http://localhost:8080/assets/xml/qna/local.xml';
  } else {
    qnaUrl = 'http://' + location + '/activity/qnaService?questionnaireID=' + qid;
  }
  QuizActions.ajaxRequest = $.ajax({
    type: 'get',
    url: qnaUrl,
    dataType: 'text',
    statusCode: { 404: () => { console.log('404'); } }
  }).done(this.completed).fail(this.failed);
});
QuizActions.post.listen(function(serializedForm) {
  let postUrl;
  const location = window.location.hostname;
  if (location.match(/www/)) {
    postUrl = 'http://' + window.location.hostname + '/qna/AddQAResponsesClassic?';
  } else {
    postUrl = 'http://' + window.location.hostname + '/activity/qna/AddQAResponsesClassic?';
  }
  postUrl += serializedForm;
  $.ajax({
    type: 'POST',
    url: postUrl,
    statusCode: { 200: () => { console.log('200'); } }
  }).done(this.completed).fail(this.failed);
});
export default QuizActions;
