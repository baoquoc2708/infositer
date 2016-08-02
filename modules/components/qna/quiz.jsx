import $                         from 'jquery';
import cx                        from 'classnames';
import React, { PropTypes }      from 'react';
import QuizStore                 from 'stores/quiz_store';
import Reflux                    from 'reflux';
import QNAForm                   from 'components/qna/form';
import ChartBuilder              from 'components/qna/chart_builder';
import _                         from '_';

export default React.createClass({
  propTypes: {
    isActive: PropTypes.bool,
    id: PropTypes.string,
    children: PropTypes.object,
    responded: PropTypes.bool
  },
  mixins: [Reflux.connect(QuizStore)],
  componentDidUpdate() {
    const quiz = this.state.quiz;
    if(quiz && quiz.activeQid && quiz[quiz.activeQid].questionnaire) {
      let activeQuestion = quiz[quiz.activeQid],
          questionnaire =  activeQuestion.questionnaire,
          page = questionnaire.page[activeQuestion.questionConfig.page-1];
      if(page.question.responded === 'true') {
        let theChart = new ChartBuilder(quiz[quiz.activeQid].chartConfig),
            targetDiv = $('#'+ this.props.id +'>.content'),
            selectedAnswers;
        $.each(targetDiv.find(':checked'), function(index, val) {
          selectedAnswers.push($(val).attr('choiceid'));
        });
        if(activeQuestion.questionConfig.chartType) {
          theChart.plot(activeQuestion.questionConfig.chartType, page, 'test.config.url', targetDiv, selectedAnswers);
        }
      }
    }
  },
  showErrorOverlay: function() { },
  render: function() {
    let quiz = this.state.quiz,
        content = <div className='content'> Loading...</div>,
        classes = cx({
          'is-visible': this.props.isActive,
         'qna-quiz-in-video': true
    });
    if(quiz && quiz.activeQid && quiz[quiz.activeQid].questionnaire) {
      let activeQuestion = quiz[quiz.activeQid],
          questionnaire =  activeQuestion.questionnaire,
          page = questionnaire.page[activeQuestion.questionConfig.page-1];
      if(page.question.responded !== 'true') {
        let questions = _.isArray(page.question) ? page.question : [page.question];
        content = (<QNAForm questionConfig={activeQuestion.questionConfig}
                           questions={questions}
                           showErrorOverlay={this.showErrorOverlay} />);
      } else if(!activeQuestion.questionConfig.chartType) {
        content = (<div>
                    <div>{page.question.questionText}</div>
                        You answered: {page.question.responseText}
                  </div>);
      }
    }
    return (
        <div id={this.props.id} className={classes}>
          {content}
          {this.props.children}
        </div>
    );
  }
});
