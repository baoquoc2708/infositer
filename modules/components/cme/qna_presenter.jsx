import React, { PropTypes }   from 'react';
import { connect }            from 'reflux';
import $                      from 'jquery';
import cx                     from 'classnames';
import { get, isEmpty }       from '_';
import { isIpad, isMobile,
        toArray, isIOS }      from 'utils/util';
import VideoActions           from 'actions/video_actions';
import QuizActions            from 'actions/quiz_actions';
import RoadBlockActions       from 'actions/roadblock_actions';
import QNAStore               from 'stores/qna_store';
import QuizStore              from 'stores/quiz_store';
import QNAForm                from 'components/qna/form';
import CMEChart               from 'components/qna/cme_chart';


export default React.createClass({
  displayName: 'CME.QNA',
  propTypes: {
    qna: PropTypes.array,
    isVideo: PropTypes.bool
  },
  mixins: [connect(QuizStore), connect(QNAStore)],
  componentDidMount() {
    if(!isEmpty(this.props.qna)) {
      QuizActions.requestQnaXml(this.props.qna);
    }
  },
  shouldComponentUpdate(nextProps, nextState) {
    const thisQuestion = get(this, 'state.qnas.question', null),
          nextQuestion = get(nextState, 'qnas.question', null),
          thisQuiz = get(this, 'state.quiz', null),
          nextQuiz = get(nextState, 'quiz', null);
    if(thisQuestion === null && nextQuestion !== null) {
      return true;
    }
    if(nextQuestion === null && (nextQuiz && (nextQuiz.isQuestionVisible || nextQuiz.isChartVisible))) {
      return false;
    }
    if(thisQuiz !== null) {
      if(thisQuiz.isQuestionVisible !== nextQuiz.isQuestionVisible ||
         thisQuiz.isChartVisible !== nextQuiz.isChartVisible) {
        return true;
      }
    }
    return false;
  },
  componentDidUpdate() {
    const question = get(this, 'state.qnas.question', false);
    if(question) {
      const [qid, page] = question.qaidFormPage.split('/');
      QuizActions.showQuestion(qid, page);
      if(isMobile() && this.isQnaVisible()) {
        console.log('requesting full screen');
        $('body').toggleClass('no-scroll', this.isQnaVisible() && $('.cme').hasClass('is-mobile'));
        VideoActions.fullScreen();
      }
    }
  },
  getSelectedRefValues(selectedValues) {
    this.setState({ selectedValues: selectedValues });
  },
  isQnaVisible() {
    return (get(this, 'state.quiz.isChartVisible', false) ||
            get(this, 'state.quiz.isQuestionVisible', false));
  },
  closeBothLayers() {
    this.closeLayer('isQuestionVisible', false, true);
    if(this.state.quiz.isChartVisible) {
      this.closeLayer('isChartVisible',  false);
    }
  },
  closeLayer(propName, completed, disablePlay) {
    const [qid, page] = get(this, 'state.qnas.question.qaidFormPage', '').split('/');
    QuizActions.hideLayer(propName);
    const qaidFormPage = `${qid}/${page}`;
    if(propName === 'isQuestionVisible') {
      if(!get(this, 'state.quiz.isChartVisible', false)) {
        VideoActions.deleteQna(qaidFormPage);
        QuizActions.reset();
      }
      RoadBlockActions.clearRoadBlock(qaidFormPage);
    } else if(propName === 'isChartVisible' || !get(this, 'state.quiz.isChartVisible', false)) {
      window.trackingEnabled = false;
      if(disablePlay !== true) {
          VideoActions.deleteQna(qaidFormPage);
          RoadBlockActions.clearRoadBlock(qaidFormPage);
          VideoActions.start();
          QuizActions.reset();
      }
      if(isMobile() && this.props.isVideo) {
        VideoActions.exitFullScreen();
        $('.cme').removeClass('is-fullscreen');
      }
      $('body').removeClass('no-scroll');
    }
    if(this.refs.qnaScroll) {
      React.findDOMNode(this.refs.qnaScroll).scrollTop = 0;
    }
  },
  upDateQuestionsForChart(allQuestions) {
    const chartQuestions = allQuestions.filter((question)=> {
      return question._showAnsTable === 'true';
    });
    chartQuestions.forEach((question) => {
      question.isDisabled = true;
      if(question.displayRule ==='RadioButton' || question.displayRule === 'CheckBox') {
        question.OriginalTotalResponse = parseInt(question.totalResponse, 10);
        if(question.responded === 'false') {
          question.totalResponse++;
        }
        const choices = toArray(question.choice);
        choices.forEach((questionChoice) => {
          if(questionChoice.selected === 'true') {
            questionChoice.selected = 'selected';
          }
          if(!questionChoice.totalResponse ||
              isNaN(parseInt(questionChoice.totalResponse, 10))) {
            questionChoice.totalResponse = 0;
          }
          if(questionChoice.selected === 'selected') {
            if(this.state.selectedValues[questionChoice._id] === 'selected') {
              const newTotalQuestionResponse = Math.round(((questionChoice.totalResponse / 100) * question.OriginalTotalResponse));
              questionChoice.totalResponse = parseInt(((newTotalQuestionResponse / question.totalResponse) * 100), 10);
              questionChoice.selected = 'true';
            } else {
              const newTotalQuestionResponse = Math.round(((questionChoice.totalResponse / 100) * question.OriginalTotalResponse) - 1);
              questionChoice.totalResponse = parseInt(((newTotalQuestionResponse / question.totalResponse) * 100), 10);
              questionChoice.selected = 'false';
            }
          } else {
            if(!this.state.selectedValues[questionChoice._id]) {
              const newTotalQuestionResponse = Math.round(((questionChoice.totalResponse / 100) * question.OriginalTotalResponse));
              questionChoice.totalResponse = parseInt(((newTotalQuestionResponse / question.totalResponse) * 100), 10);
            } else {
              const newTotalQuestionResponse = Math.round(((questionChoice.totalResponse / 100) * question.OriginalTotalResponse) + 1);
              questionChoice.totalResponse = parseInt(((newTotalQuestionResponse / question.totalResponse) * 100), 10);
              questionChoice.selected = 'true';
            }
          }
        });
      }
    });
    return chartQuestions;
  },
  renderQuestions(questions) {
    const { page, qid, isQuestionVisible } = this.state.quiz,
    questionLayerClasses = cx({
      'question-layer': true,
      'is-visible': isQuestionVisible
    });
    return (<div ref="qnaScroll" className={questionLayerClasses}>
               <QNAForm validationErrors={this.state.quiz.validationErrors}
                        questions={questions}
                        qid ={qid}
                        page= {page}
                        closeHandler={this.closeLayer}
                        getSelectedRefValues={this.getSelectedRefValues}
                        ref="QNAForm" />
            </div>);
  },
  renderCharts(questions) {
    let renderedChart;
    const chartLayerClasses = cx({
      'chart-layer': true,
      'is-visible': this.state.quiz.isChartVisible
    });
    if(questions.length > 0) {
      renderedChart = (<div ref="qnaScroll" className={chartLayerClasses}>
                         <CMEChart closeHandler={this.closeLayer}
                                   charts={questions} />
                       </div>);
    } else {
      renderedChart = null;
    }
    return renderedChart;
  },
  render() {
    const { qnas, quiz } = this.state,
          cmeClasses = cx({
            'is-visible': this.isQnaVisible(),
            'cme-qna': true,
            'is-iphone': (isMobile() && isIOS() && !isIpad())
          });
        let renderedQuestions = (<div className="qna-questions-loading"></div>);
      if(get(quiz, 'questionnaire.page', false) &&
         get(qnas, 'question',  false)
      ) {
        const [, page] = qnas.question.qaidFormPage.split('/'),
              pages = quiz.questionnaire.page,
              currentPage = pages.filter((inPage) => {
                return (inPage._id === page);
              });
        if(quiz.isQuestionVisible && currentPage && !isEmpty(currentPage)) {
          renderedQuestions = this.renderQuestions(currentPage[0].question);
        } else if(quiz.isChartVisible) {
          const chartQuestions = JSON.parse(JSON.stringify( currentPage[0].question )),
                updatedChartQuestions = this.upDateQuestionsForChart(chartQuestions);
          renderedQuestions = this.renderCharts(updatedChartQuestions);
        }
      }
    return (<div className={cmeClasses}>
              <div className="qna-close-button" onClick={this.closeBothLayers}>[X]</div>
              <div>
                {renderedQuestions}
              </div>
            </div>);
  }
});
