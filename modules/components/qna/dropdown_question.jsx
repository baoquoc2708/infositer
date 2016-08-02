import React, { PropTypes }   from 'react';
import $                      from 'jquery';

export default React.createClass({
  propTypes: {
    questionChoices: PropTypes.array.isRequired,
    questionId: PropTypes.string.isRequired,
    questionPage: PropTypes.string,
    questionRequired: PropTypes.string,
    questionText: PropTypes.string.isRequired,
    questionIsDisabled: PropTypes.bool
  },
  getInitialState() {
    return {
      errors: ['']
    };
  },
  handleChange: function() {
    this.createErrors();
    this.setState({value: $(React.findDOMNode(this)).find('select').val() });
  },
  render() {
    let errorMesseges = this.state.errors.map((errorMsg, i)=> {
      return (<div className='error' key={i}>{errorMsg}</div>);
    });
    let options = this.props.questionChoices.map((questionChoice, i)=> {
      return (<option key={i}
                      className='qna-select-option'
                      name={'option-'+this.props.questionId}
                      value={questionChoice._id}>
                {questionChoice.choiceText}
              </option>);
    });
    return (<div className='qna-select-question-wrap'>
              <fieldset>
                <legend>{this.props.questionPage}</legend>
                <div className='qna-question'>{this.props.questionText}</div>
                {errorMesseges}
                <select id={this.props.questionId}
                        disabled={this.props.questionIsDisabled ? 'disabled' : false}
                        data-validate='required'>
                  {options}
                </select>
              </fieldset>
            </div>);
  }
});
