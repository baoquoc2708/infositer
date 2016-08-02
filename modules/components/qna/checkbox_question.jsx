import React, { PropTypes }   from 'react';
import $                      from 'jquery';
import _                      from '_';
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
  mixins: [ RendersPercentBar, HasQuestionValidation ],
  getInitialState() {
    let values = this.props.questionChoices.map((questionChoice)=> {
      if(questionChoice.selected === 'true' && !this.props.questionIsDisabled) {
        return questionChoice._id;
      }
    });
    return {
      errors: [''],
      values: values
    };
  },
  handleChange: function() {
    let val = [];
    this.createErrors();
    $(React.findDOMNode(this)).find('input:checked').each((i, element)=> {
      val.push($(element).val());
    });
    this.setState({values: val});
  },
  renderCheckboxQuestions() {
    let checkboxQuestions = this.props.questionChoices.map((questionChoice, i)=> {
      let isChecked = false,
      percent = this.calcPercent(questionChoice),
      percentBar = this.renderPercentBar(percent),
      percentNumber = this.renderPercentNumber(percent),
      checkboxChoiceClasses = cx({
        'qna-is-correct': (questionChoice.isCorrect === 'true' && this.props.questionIsDisabled),
        'qna-checkbox-choice': true,
        'qna-is-highlighted': ((questionChoice.selected === 'true' && this.props.questionIsDisabled) ||
                               (this.state.values.indexOf(questionChoice._id) !== -1 && !this.props.questionIsDisabled))
      });
    if(this.props.questionIsDisabled && questionChoice.selected === 'true') {
      isChecked = true;
    } else if(_.includes(this.state.values, questionChoice._id) && !this.props.questionIsDisabled) {
      isChecked = true;
    }
    return (<li className={checkboxChoiceClasses} key={i}>
            {percentBar}
            <input disabled={this.props.questionIsDisabled ? 'disabled' : false}
                   type="checkbox"
                   checked={isChecked}
                   onChange={this.handleChange}
                   name={'option-'+this.props.questionId}
                   id={'option-'+questionChoice._id}
                   value={questionChoice._id}></input>
            <label htmlFor={'option-'+questionChoice._id}
                   dangerouslySetInnerHTML={{__html: questionChoice.choiceText}}>
            </label>
            {percentNumber}
          </li>);
    });
    return checkboxQuestions;
  },
  render() {
    let errorMesseges = this.state.errors.map((errorMsg, i)=> {
      return (<div className='error' key={i}>{errorMsg}</div>);
    }),
    checkboxQuestions = this.renderCheckboxQuestions(this.props.questionChoices),
    questionExplanation = this.renderQuestionExplanation(this.props.questionChoices[0]);
    return (<div className='qna-checkbox-question'>
              <fieldset>
                <legend>{this.props.questionPage}</legend>
                <div className='qna-question-introduction'
                    dangerouslySetInnerHTML={{__html: this.props.questionIntro}}>
                </div>
                <div className='qna-question'
                     dangerouslySetInnerHTML={{__html: this.props.questionText}} >
                </div>
                {errorMesseges}
                <input name='question_id' id='question_id' type='hidden' value={this.props.questionId}></input>
                <input name={this.props.questionId} id={this.props.questionId} type='hidden' value='CheckBox'></input>
                <ul>{checkboxQuestions}</ul>
              </fieldset>
              {questionExplanation}
            </div>);
  }
});
