import React                from 'react';
import RadioQuestion        from 'components/qna/radio_question';
import CheckboxQuestion     from 'components/qna/checkbox_question';
import TextboxQuestion      from 'components/qna/textbox_question';
import TextareaQuestion     from 'components/qna/textarea_question';

export default {
  renderQuestion(question, i, questionArray) {
    let QuestionTemplate,
    questionPage = `${i + 1} of  ${questionArray.length}`;
    switch (question.displayRule) {
    case 'radio':
    case 'RadioButton':
      QuestionTemplate = (<RadioQuestion key={i}
                                         ref={question._id}
                                         questionTotalResponse={question.totalResponse}
                                         questionIsDisabled={question.isDisabled}
                                         questionChoices={question.choice}
                                         questionId={question._id}
                                         questionPage={questionPage}
                                         questionRequired={question._required}
                                         questionText={question.questionText}
                                         questionShowTable={question._showAnsTable}
                                         questionIntro={question.questionIntro} />);
      break;
    case 'checkbox':
    case 'CheckBox':
      QuestionTemplate = (<CheckboxQuestion key={i}
                                            ref={question._id}
                                            questionTotalResponse={question.totalResponse}
                                            questionIsDisabled={question.isDisabled}
                                            questionChoices={question.choice}
                                            questionId={question._id}
                                            questionPage={questionPage}
                                            questionRequired={question._required}
                                            questionText={question.questionText}
                                            questionShowTable={question._showAnsTable}
                                            questionIntro={question.questionIntro} />);
      break;
    /*
    Not dead code. Drop downs currently do not work because of a bug with the qna tool.
    When a fix for them is implemented we can uncomment this.
    case 'dropdown':
    case 'DropDown':
      QuestionTemplate = (<DropdownQuestion ref={question._id}
                                            key={i}
                                            questionChoices={question.choice}
                                            questionId={question._id}
                                            questionPage={questionPage}
                                            questionRequired={question._required}
                                            questionText={question.questionText} />);
      break;
    */
    case 'textbox':
    case 'TextBox':
      QuestionTemplate = (<TextboxQuestion key={i}
                                           ref={question._id}
                                           questionIsDisabled={question.isDisabled}
                                           questionId={question._id}
                                           questionPage={questionPage}
                                           questionRequired={question._required}
                                           questionText={question.questionText}/>);
      break;
    case 'textarea':
    case 'TextArea':
      QuestionTemplate = (<TextareaQuestion key={i}
                                            ref={question._id}
                                            questionIsDisabled={question.isDisabled}
                                            questionId={question._id}
                                            questionPage={questionPage}
                                            questionRequired={question._required}
                                            questionText={question.questionText}/>);
      break;
    default:
      console.warn('Error invalid question type');
    }
    return QuestionTemplate;
  },
};
