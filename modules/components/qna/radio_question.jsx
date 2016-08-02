import React, { PropTypes }   from 'react';
import RendersPercentBar      from 'mixins/renders_perecentage_bar';
import cx                     from 'classnames';
import HasQuestionValidation  from 'mixins/has_question_validation';


export default React.createClass({
  propTypes: {
    questionChoices: PropTypes.array.isRequired,
    questionId: PropTypes.string.isRequired,
    questionPage: PropTypes.string,
    questionRequired: PropTypes.string,
    questionText: PropTypes.string.isRequired,
    questionIsDisabled: PropTypes.bool,
    questionShowTable: PropTypes.string,
    questionTotalResponse: PropTypes.number,
    questionIntro: PropTypes.string
  },
  mixins: [ RendersPercentBar, HasQuestionValidation],
  getDefaultProps() {
    return { isDisabled: false };
  },
  getInitialState() {
    let value;
    this.props.questionChoices.forEach((questionChoice)=> {
      if(questionChoice.selected === 'true' && !this.props.questionIsDisabled) {
        value = questionChoice._id;
      }
    });
    return {
      errors: [''],
      value: value
    };
  },
  handleChange: function(event) {
    this.setState({value: event.target.value});
    this.createErrors();
  },
  renderRadioQuestions() {
    const radioQuestions = this.props.questionChoices.map((questionChoice, i)=> {
      let isChecked = false;
      const percent = this.calcPercent(questionChoice),
            percentBar = this.renderPercentBar(percent),
            percentNumber = this.renderPercentNumber(percent),
            radioChoiceClasses = cx({
              'qna-is-correct': (questionChoice.isCorrect === 'true' && this.props.questionIsDisabled),
              'qna-radio-choice': true,
              'qna-is-highlighted': ((questionChoice.selected === 'true' && this.props.questionIsDisabled) ||
                                  (this.state.value === questionChoice._id && !this.props.questionIsDisabled))
            });
      if(this.props.questionIsDisabled && questionChoice.selected === 'true') {
        isChecked = true;
      } else if((this.state.value === questionChoice._id) && !this.props.questionIsDisabled) {
        isChecked = true;
      }
      return (  <li className={radioChoiceClasses} key={i}>
                  {percentBar}
                  <input ref={questionChoice._id}
                         disabled={this.props.questionIsDisabled ? 'disabled' : false}
                         checked={isChecked}
                         id={'option-'+questionChoice._id}
                         name={'option-'+this.props.questionId}
                         onChange={this.handleChange}
                         type="radio"
                         value={questionChoice._id}></input>
                  <label htmlFor={'option-'+questionChoice._id}
                         dangerouslySetInnerHTML={{__html: questionChoice.choiceText}}>
                  </label>
                  {percentNumber}
                </li>);
    });
    return radioQuestions;
  },
  render() {
    const errorMesseges = this.state.errors.map((errorMsg, i)=> {
      return (<div className="error" key={i}>{errorMsg}</div>);
    }),
    radioQuestions = this.renderRadioQuestions(this.props.questionChoices),
    questionExplanation = this.renderQuestionExplanation(this.props.questionChoices[0]);
    return (<div className="qna-radio-question">
              <fieldset>
                <legend>{this.props.questionPage}</legend>
                <p className="qna-question-introduction"
                    dangerouslySetInnerHTML={{__html: this.props.questionIntro}}>
                </p>
                <div className="qna-question"
                     dangerouslySetInnerHTML={{__html: this.props.questionText}}>
                </div>
                {errorMesseges}
                <ul>
                    {radioQuestions}
                </ul>
                <input name="question_id" id="question_id" type="hidden" value={this.props.questionId}></input>
                <input name={this.props.questionId} id={this.props.questionId} type="hidden" value="CheckBox"></input>
              </fieldset>
              {questionExplanation}
            </div>);
  }
});
