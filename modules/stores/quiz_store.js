import Reflux                 from 'reflux';
import X2JS                   from 'x2js';
import StoreState             from 'mixins/store_state';
import QuizActions            from 'actions/quiz_actions';
import RoadBlockActions       from 'actions/roadblock_actions';
import { clone, isEmpty }     from '_';
import { toArray, getParams } from 'utils/util';


export default Reflux.createStore({
  mixins: [StoreState],
  listenables: QuizActions,
  stateNamespace: 'quiz',
  getInitialState() {
    return {
      isDebug:   (getParams().debug === 'true')
    };
  },
  onRequestQnaXml: function(qna) {
    const [qid, page] = qna[0].qaidFormPage.split('/');
    this.setState({
      qid: qid,
      page: page,
      requesting: true,
      isChartVisible: false,
      isQuestionVisible: false,
      qna: qna,
      completedQuestions:[]
    });
  },
  onHideLayer(propName) {
    const updatedState = clone(this.getState(), true);
    updatedState[propName] = false;
    this.setState(updatedState);
  },
  onReset: function() {
    this.setState({
      qid: null,
      page: null,
      isQuestionVisible: false,
      isChartVisible: false
    });
  },
  onHideQuestion(qid, page) {
    this.setState({
      qid: qid,
      page: page,
      isChartVisible: false,
      isQuestionVisible: false
    });
  },
  onShowQuestion(qid, page) {
    if(this.state.completedQuestions.indexOf(page) !== -1) {
      return false;
    }
    if(!this.state.isChartVisible && !this.state.isQuestionVisible) {
      const currentPage = this.state.questionnaire.page.filter((inPage)=> {
        return (inPage._id === page);
      });
      let hasVisibleChart = false;
      if(!isEmpty(currentPage)) {
        hasVisibleChart = currentPage[0].question.some((inQuestion) => {
          return (inQuestion._showAnsTable === 'true');
        });
      }
      this.setState({
        qid: qid,
        page: page,
        isChartVisible: hasVisibleChart,
        isQuestionVisible: !isEmpty(currentPage)
      });
    }
  },
  getChartVisibility(page) {
    return page.questions.some((question) => question._showAnsTable === 'true');
  },
  onRequestQnaXmlCompleted: function(response) {
    const x2jsParser = new X2JS();
    let questionnaire = x2jsParser.parseXmlString(response),
        updatedState;
    questionnaire = x2jsParser.xml2json(questionnaire);
    updatedState = clone(this.getState(), true);
    questionnaire.questionnaire.page = questionnaire.questionnaire.page.filter((inPage)=> {
      inPage.question = toArray(inPage.question);
      if(!isEmpty(inPage.question)) {
        return inPage.question.every((inQuestion)=> {
          if(this.state.isDebug) {
            inQuestion.responded ='false'
            return true;
          }
          if(typeof inQuestion === 'undefined') {
            return false;
          }
          return (inQuestion.responded === 'false');
        });
      } else {
        return false;
      }
    });
    updatedState.questionnaire = questionnaire.questionnaire;
    const roadblocks = this.state.qna.filter((inQna)=> {
      return questionnaire.questionnaire.page.some((inPages)=> {
        return (inPages._id == inQna.qaidFormPage.split('/')[1]);
      });
    });
    this.setState(updatedState);
    RoadBlockActions.setUpRoadBlocks(roadblocks);
  },
  onClose() {
    this.setState({
      isChartVisible: false,
      isQuestionVisible: false,
      index: null
    });
  },
  onPost(postString, qid, page) {
    const tempCompletedQuestions = [].concat(this.state.completedQuestions, page);
    this.setState({
        index: null,
        completedQuestions: tempCompletedQuestions
    });
  }
});
