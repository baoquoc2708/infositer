import $ from 'jquery';
import Reflux from 'reflux';

const QNAActions = () => {
  const QNAActionsI = Reflux.createActions({
    cancel: {},
    close: {},
    reset: {},
    hideLayer: {},
    requestQnaXml: {
      asyncResult: true,
      children: ['completed', 'failed']
    },
    showQuestion: {},
    hideQuestion: {},
    post: {},
    completed: {},
    failed: {},
    open: {},
    validate: {},
    complete: {}
  });

  QNAActionsI.requestQnaXml.shouldEmit = function() {
    if ((QNAActionsI.ajaxRequest && QNAActionsI.ajaxRequest.readyState === 1)) {
      return false;
    }
    return true;
  };
  QNAActionsI.requestQnaXml.listen(function(qid) {
    let qnaUrl;
    const location = window.location.hostname;
    if (location.match(/www/)) {
      qnaUrl = 'http://' + location + '/qnaService?questionnaireID=' + qid;
    } else if (location.match(/api./)) {
      qnaUrl = 'http://www.' + location.replace('api.', '') + '/qnaService?questionnaireID=' + qid;
    } else if (location.match(/localhost/)) { // for local testing
      qnaUrl = 'http://localhost:8080/assets/xml/qna/local.xml';
    } else {
      qnaUrl = 'http://' + location + '/activity/qnaService?questionnaireID=' + qid;
    }
    QNAActionsI.ajaxRequest = $.ajax({
      type: 'get',
      url: qnaUrl,
      dataType: 'text',
      statusCode: {
        404: () => {
          console.log('404');
        }
      }
    }).done(this.completed).fail(this.failed);
  });
  return QNAActionsI;
};
export default QNAActions;
