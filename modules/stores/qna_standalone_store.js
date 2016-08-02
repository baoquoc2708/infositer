import Reflux              from 'reflux';
import X2JS                from 'x2js';
import StoreState          from 'mixins/store_state';
import { clone, isEmpty }  from '_';
import { toArray }         from 'utils/util';


const QNAStore = (QuizActions) => {
  return Reflux.createStore({
    mixins: [StoreState],
    listenables: QuizActions,
    stateNamespace: 'quiz',
    onRequestQnaXml: function(qid, page) {
      this.setState({
        qid: qid,
        page: page,
        requesting: true,
        isChartVisible: false,
        isQuestionVisible: false,
        qna: `${qid}/${page}`,
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
        isQuestionVisible: false,
        isChartVisible: true
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
      if(questionnaire.questionnaire.page.length){} else {
        questionnaire.questionnaire.page = [questionnaire.questionnaire.page];
      }
      questionnaire.questionnaire.page = questionnaire.questionnaire.page.filter((inPage)=> {
        inPage.question = toArray(inPage.question);
        return inPage._id === this.state.page;
      });
      updatedState.questionnaire = questionnaire.questionnaire;
      updatedState.isChartVisible = questionnaire.questionnaire.page[0].question.some((elem) => elem.responded === "true");
      this.setState(updatedState);
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
          completedQuestions: tempCompletedQuestions,
          isChartVisible: true
      });
    }
  });
};
export default QNAStore;
