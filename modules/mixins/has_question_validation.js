import React               from 'react';
import $                   from 'jquery';

export default {
  createErrors() {
    if(this.props.questionRequired === 'true' && $(React.findDOMNode(this)).find('input:checked').length === 0) {
      this.setState({ errors: ['Please select an answer.'] });
      return false;
    } else {
      this.setState({ errors: [] });
      return true;
    }
  },
  validate() {
    return this.createErrors();
  },
  renderQuestionExplanation(choice) {
    if(this.props.questionIsDisabled && choice.choiceExplanation.length !== 0) {
      return (<div className='qna-question-explanation'>{choice.choiceExplanation}</div>);
    } else {
      return null;
    }
  }
};
