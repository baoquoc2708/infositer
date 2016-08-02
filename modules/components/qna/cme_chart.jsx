import React, {PropTypes}        from 'react';
import RendersQuestionComponents from 'mixins/renders_question_components';
import cx                        from 'classnames';

export default React.createClass({
  propTypes: {
    charts: PropTypes.array.isRequired,
    closeHandler: PropTypes.func.isRequired
  },
  mixins: [ RendersQuestionComponents ],
  close() {
    this.props.closeHandler('isChartVisible');
  },
  render() {
    let hasCorrect = false;
    const resultsComp = this.props.charts.map((question, i, questionArray) => {
      if(!hasCorrect && question.choice.length > 0) {
        for(let j = 0; j < question.choice.length; j++) {
          if(question.choice[j].isCorrect === 'true') {
            hasCorrect = true;
            break;
          }
        }
      }
      const renderedQuestion = this.renderQuestion(question, i, questionArray);
      return (<div key={i}>{renderedQuestion}</div>);
    });
    const qnaCorrectClasse = cx({
        'is-visible': hasCorrect,
        'qna-is-correct': true
    });
    return (<div className="cme-chart">
                <p className={qnaCorrectClasse}>Indicates correct answer.</p>
                { resultsComp }
                {/*<div className="button-container">
                  <div className="qna-continue-button" onClick={this.close}>Continue</div>
                </div>*/}
           </div>);
  }
});
