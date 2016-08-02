import React                     from 'react';
import $                         from 'jquery';
import QuizActions               from 'actions/quiz_actions';
import RendersQuestionComponents from 'mixins/renders_question_components';
import cx                        from 'classnames';
import { nextTick }              from 'utils/util';


export default React.createClass({
  propTypes: {
    questions: React.PropTypes.array.isRequired,
    qid: React.PropTypes.string.isRequired,
    page: React.PropTypes.string.isRequired,
    htmlCharting: React.PropTypes.bool,
    closeHandler: React.PropTypes.func,
    getSelectedRefValues: React.PropTypes.func,
    isValid: React.PropTypes.bool
  },
  mixins: [ RendersQuestionComponents ],
  getInitialState() {
    return {
      isValid: false
    };
  },
  componentDidMount() {
    this.formChangeHandler();
  },
  componentWillReceiveProps() {
    this.formChangeHandler();
  },
  getSelectedRefValues: function() {
    let selectedValues = {}; // eslint-disable-line
    for (let ref in this.refs) { // eslint-disable-line
      if(this.refs[ref].state.value) {
        selectedValues[this.refs[ref].state.value] = 'selected';
      }
      if(this.refs[ref].state.values) {
        for(let i = 0; i < this.refs[ref].state.values.length; i++) {
          selectedValues[this.refs[ref].state.values[i]] = 'selected';
        }
      }
    }
    return selectedValues;
  },
  submitHandler(formId, e) {
    const { qid, page } = this.props;
    e.preventDefault();
    this.formChangeHandler();
    if(this.state.isValid) {
      const $form =  $('#'+formId);
      QuizActions.post(decodeURIComponent($form.serialize()), this.props.qid, this.props.page);
      this.props.getSelectedRefValues(this.getSelectedRefValues());
      if(this.props.closeHandler) {
        this.props.closeHandler('isQuestionVisible', true, qid, page);
      }
    }
  },
  checkValidity() {
    let valid = true;
    this.props.questions.forEach((question) => {
      if(this.refs[question._id]) {
        if(!this.refs[question._id].validate()) {
          valid = false;
        }
      }
    });
    return valid;
  },
  formChangeHandler() {
    const valid = this.checkValidity();
    nextTick(this.setState({isValid: valid}));
  },
  render() {
    const { qid, page } = this.props,
          { isValid }   = this.state,
          submitButtonClasses = cx({
            'disabled': !isValid,
            'qna-submit-button': true
          }),
          requiredMessageClasses = cx({
            'qna-required-message': true,
            'is-visible': !isValid
          }),
          questionsComp = this.props.questions.map(this.renderQuestion);
    return (
        <form onChange={this.formChangeHandler} onSubmit={this.submitHandler.bind(this, qid+'_form')} className="qna-radio-form" id={qid+'_form'}>
          <label htmlFor={qid+'_form'} className={requiredMessageClasses}>
            All questions required.
          </label>
          <input type="hidden" name="questionnaire_id" id="questionnaire_id" value={qid}></input>
          <input type="hidden" name="responseType" id="responseType" value="samepage"></input>
          <input type="hidden" name="nextPageURL" id="nextPageURL" value="null"></input>
          <input type="hidden" name="questionnaireType" id="questionnaireType" value="null"></input>
          <input type="hidden" name="form_id" id="form_id" value={page}></input>
          <input type="hidden" name="formType" id="formType" value="DEFAULT"></input>
          {questionsComp}
          <div className="button-container">
            <button className={submitButtonClasses}
                  disabled={!this.state.isValid}
                  onClick={this.submitHandler.bind(this, qid+'_form')}
                  id={'submit-'+ qid}>Submit</button>
          </div>
        </form>
    );
  }
});
