import React, { PropTypes }   from 'react';
import $                      from 'jquery';

export default React.createClass({
  propTypes: {
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
  validate() {
    this.createErrors();
  },
  createErrors() {
    if(this.props.questionRequired === 'true' && $(React.findDOMNode(this)).find('input').val() === '') {
      this.setState({ errors: ['Please provide an answer.'] });
    } else {
      this.setState({ errors: [] });
    }
  },
  handleChange: function(event) {
    this.setState({value: event.target.value});
    this.createErrors();
  },
  render() {
    let errorMesseges = this.state.errors.map((errorMsg, i)=> {
      return (<div className='error' key={i}>{errorMsg}</div>);
    });
    return (<div className='qna-textarea-question'>
              <fieldset>
                <legend htmlFor={this.props.questionId}>{this.props.questionPage}</legend>
                <div className='qna-question'>{this.props.questionText}</div>
                {errorMesseges}
                <input key={'rkey-'+this.props.questionId}
                       disabled={this.props.questionIsDisabled ? 'disabled' : false}
                       onChange={this.handleChange}
                       className='qna-textarea-question'
                       type='textarea'
                       name={'option-'+this.props.questionId}
                       id={this.props.questionId}></input>
                <input name='question_id' id='question_id' type='hidden' value={this.props.questionId}></input>
                <input name={this.props.questionId} id={this.props.questionId} type='hidden' value='TextArea'></input>
              </fieldset>
            </div>);
  }
});
