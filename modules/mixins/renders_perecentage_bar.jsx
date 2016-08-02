import React               from 'react';

export default {
  renderPercentBar(percent) {
    let percentSpan = null;
    if(this.props.questionIsDisabled && this.props.questionShowTable === 'true') {
      let barStyle = {
        width: percent + '%'
      };
      percentSpan = (<span className="qna-question-percentage-bar" style={barStyle} ></span>);
    }
    return percentSpan;
  },
  renderPercentNumber(percent) {
    let percentSpan = null;
    if(this.props.questionIsDisabled && this.props.questionShowTable === 'true') {
      percentSpan = (<span className="qna-question-percentage">{percent}%</span>);
    }
    return percentSpan;
  },
  calcPercent(questionChoice) {
    let barPercentWidth = parseInt(questionChoice.totalResponse, 10);
    if(barPercentWidth < 0 || isNaN(barPercentWidth)) {
      barPercentWidth = 0;
    }
    if(barPercentWidth > 100) {
      barPercentWidth = 100;
    }
    return barPercentWidth;
  },
};
