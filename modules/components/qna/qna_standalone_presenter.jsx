import FORM                 from 'components/qna/form';
import QNAActions           from 'actions/qna_standalone_actions';
import QNAStore             from 'stores/qna_standalone_store';
import React, {PropTypes}   from 'react';
import {connect}            from 'reflux';
import {get, toArray}       from '_';
import $                    from 'jquery';
import CMEChart             from 'components/qna/cme_chart';
import cx                   from 'classnames';


const QNAPresenter = () => {
  const itsActions = new QNAActions(),
        itsStore   = new QNAStore(itsActions);
  return React.createClass({
    displayName: 'Player.CME',
    propTypes: {
      qid: PropTypes.string,
      page: PropTypes.string
    },
    mixins: [connect(itsStore)],
    componentDidMount() {
      const {qid, page} = this.props;
      itsActions.requestQnaXml(qid, page);
    },
    componentDidUpdate(prevProps, prevState) { // rememebr me feature is on after polling is done
      if(!this.rememberMeFired) {
        if(get(prevState,'quiz.qid', false) || get(prevState,'quiz.isChartVisible', false)) {
          this.rememberMeFired = true;
          brandAdvance2.trackScene();
          brandAdvance2.rememberMe();
        }
      }
    },
    getSelectedRefValues(selectedValues) {
      this.setState({ selectedValues: selectedValues });
    },
    upDateQuestionsForChart(allQuestions) {
      const chartQuestions = allQuestions.filter((question) => {
        return question._showAnsTable === 'true';
      });
      chartQuestions.forEach((question) => {
        question.isDisabled = true;
        if (question.displayRule === 'RadioButton' || question.displayRule === 'CheckBox') {
          question.OriginalTotalResponse = parseInt(question.totalResponse, 10);
          if (question.responded === 'false') {
            question.totalResponse++;
          }
          const choices = toArray(question.choice);
          choices.forEach((questionChoice) => {
            if (questionChoice.selected === 'true') {
              questionChoice.selected = 'selected';
            }
            if (!questionChoice.totalResponse || isNaN(parseInt(questionChoice.totalResponse, 10))) {
              questionChoice.totalResponse = 0;
            }
            if (questionChoice.selected === 'selected') {
              if (this.state.selectedValues[questionChoice._id] === 'selected') {
                const newTotalQuestionResponse = Math.round(((questionChoice.totalResponse / 100) * question.OriginalTotalResponse));
                questionChoice.totalResponse = parseInt(((newTotalQuestionResponse / question.totalResponse) * 100), 10);
                questionChoice.selected = 'true';
              } else {
                const newTotalQuestionResponse = Math.round(((questionChoice.totalResponse / 100) * question.OriginalTotalResponse) - 1);
                questionChoice.totalResponse = parseInt(((newTotalQuestionResponse / question.totalResponse) * 100), 10);
                questionChoice.selected = 'false';
              }
            } else {
              if (!this.state.selectedValues[questionChoice._id]) {
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
    renderCharts(questions) {
      let renderedChart;
      const chartLayerClasses = cx({'chart-layer': true, 'is-visible': this.state.quiz.isChartVisible});
      if (questions.length > 0) {
        renderedChart = (
          <div ref="qnaScroll" className={chartLayerClasses}>
            <CMEChart closeHandler={this.closeLayer} charts={questions}/>
          </div>
        );
      } else {
        renderedChart = null;
      }
      return renderedChart;
    },
    closeHandler() {
      itsActions.hideQuestion();
      this.setState({
        wasSubmitted: true
      });
    },
    render() {
      let renderedQuestionPage = (
          <div>
            Loading ...
          </div>
        ),
        chartLayerClasses = null,
        questions = [],
        closeLayer = () => {},
        renderedQuestions;
      const questionnaire = get(this, 'state.quiz.questionnaire', undefined), {qid, page} = this.props,
            isChartVisible = get(this, 'state.quiz.isChartVisible', false);
      if (isChartVisible) {
        if($('[data-qna-message]').length>0){
          $('.qna-container').addClass('is-invisible');
          $('#qna-message').addClass('is-visible');
        } else {
          $('#qna-message').addClass('is-invisible');
          const chartQuestions = JSON.parse(JSON.stringify(questionnaire.page[0].question));
            let updatedChartQuestions = chartQuestions.map( (obj) => {
                    obj.isDisabled = true;
                    obj._showAnsTable = 'true';
                    return obj;
                  });
            if(this.state.wasSubmitted === true) {
              updatedChartQuestions = this.upDateQuestionsForChart(updatedChartQuestions);
            }
            renderedQuestions = this.renderCharts(updatedChartQuestions);
            renderedQuestionPage = (
              <div ref="qnaScroll" className={chartLayerClasses}>
                <CMEChart
                  closeHandler={closeLayer}
                  charts={chartQuestions}
                  chartClassName='qna-stand-alone-container'
                />
              </div>
            )
        }
      }  else {
        if (questionnaire && questionnaire.page.length > 0) {
          const itsPage = questionnaire.page.filter((inPage) => {
            return inPage._id === page;
          });
          renderedQuestionPage = React.createElement(FORM, {
            questions: itsPage[0].question,
            getSelectedRefValues: this.getSelectedRefValues,
            closeHandler: this.closeHandler,
            qid: qid,
            page: page
          });
        }
      }
      return (renderedQuestionPage);
    }
  });
};
export default QNAPresenter;
