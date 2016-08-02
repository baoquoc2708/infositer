import $              from 'jquery';
import React          from 'react';
import radioQuestion  from '../../modules/components/qna/radio_question';
import X2JS           from 'x2js';











$(() => {
  const qnaUrl = 'http://localhost:8080/assets/xml/qna/local.xml';
  $.ajax({
    type: 'get',
    url: qnaUrl,
    dataType: 'text',
    statusCode: { 404: () => { console.log('404'); } }
  }).done((res)=> {
    const x2jsParser = new X2JS();
    let questionnaire = x2jsParser.parseXmlString(res);
        questionnaire = x2jsParser.xml2json(questionnaire);
      console.log(questionnaire);
  });
    const mountPoint = document.getElementById('radio_question_1');
    const radioProps = {
      'questionTotalResponse': '34',
      'questionChoices': [{
          'choiceText': 'Bevacizumab  테스트 테스트 테스트اختبار اختبار اختبار',
          'choiceExplanation': 'Bevacizumab  테스트 테스트 테스트اختبار اختبار اختبار',
          'isCorrect': 'false',
          'totalResponse': '82',
          'selected': 'false',
          '_id': '846891',
          '_order': '1'
      }, {
          'choiceText': 'Docetaxel  테스트 테스트 테스트اختبار اختبار اختبار',
          'choiceExplanation': 'Bevacizumab  테스트 테스트 테스트اختبار اختبار اختبار',
          'isCorrect': 'false',
          'totalResponse': '15',
          'selected': 'true',
          '_id': '846893',
          '_order': '2'
      }, {
          'choiceText': 'Erlotinib  테스트 테스트 테스트اختبار اختبار اختبار',
          'choiceExplanation': 'Bevacizumab  테스트 테스트 테스트اختبار اختبار اختبار',
          'isCorrect': 'false',
          'totalResponse': '0',
          'selected': 'false',
          '_id': '846895',
          '_order': '3'
      }, {
          'choiceText': 'Nivolumab اختبار اختبار اختبار',
          'choiceExplanation': 'Bevacizumab  테스트 테스트 테스트اختبار اختبار اختبار',
          'isCorrect': 'false',
          'totalResponse': '3',
          'selected': 'false',
          '_id': '846897',
          '_order': '4'
      }],
      'questionId': '266151',
      'questionPage': '1 of  5',
      'questionRequired': 'true',
      'questionText': 'á, é, í, ó, ú, ü, ñ, ¿, ¡,asdadsadsadasdsd,upendra,25.63,36.6598*()&*(!@!#@!!@#@!#!@#http://tools.qa01.medscape.com/questionnaireadmin/,X6 O8M テストテストテスト 테스트 테스트 테스트 測試測試測試 Testowanie Testowanie Testowanie Тестирование Тестирование Тестирование test de test de test*++=-_A?>|\\\nA 61-year-old man with stage IV squamous cell carcinoma returns to the clinic to discuss treatment options after routine follow-up revealed that his disease had progressed with first-line <sup>nab1</sup>-paclitaxel and carboplatin.&#160; His <sub>na1bc</sub> performance status is 1. He is relatively asymptomatic, ±µα©Ω∑÷×≠£€±ʭʫʰ₰₰ with his chief complaint being fatigue. Based on the patients presentation at the time of follow-up, which of the following agents would most likely provide him with the greatest chance at clinical benefit?\n\n. Based on the patients presentation at the time of follow-up, which of the following agents would most likely provide him with the <i>greatest</i> <b>chance</b> at <em>clinical</em> <strong>benefit</strong>?\n<ol>\n<li>greatest\n<li>greatest\n</li>\n</ol>\n\n測試测试 ≤ тест-плеер Welches Medikament w&#252;rden Sie f&#252;r diesen Patienten empfehlen? &#191;Cu&#225;l ser&#237;a su diagn&#243;stico? Quantos pacientes com EM v&#234; por m&#234;s? Wie schwierig war es f&#252;r Sie, in diesem Fall eine Diagnose zu stellen? (W&#228;hlen Sie eine Bewertung von 1 [leicht] bis 5 [schwierig]) この症例を診断するのはどの程度難しかったですか? (1 [簡単] から 5 [困難]までのランクをお選びください)',
      'questionShowTable': 'false',
      'questionIntro': 'test introduction',
      'isDisabled': true
    };
    React.render(React.createElement(radioQuestion, radioProps), mountPoint);
});












/*
window.newVideoPlayer = function() {
//    player = new Player();
//    player.create('video-player');
};
$(() => {


  if (typeof loadOnDocReady === 'undefined') {
    /*
    React.render(
        (<div>
          <radioQuestion
            questionChoices = {props.questionChoices}
            questionId = {props.questionId}
            questionPage = {props.questionPage}
            questionRequired = {props.questionRequired}
            questionText = {props.questionText}
            questionIsDisabled = {props.questionIsDisabled}
            questionShowTable = {props.questionShowTable}
            questionTotalResponse = {props.questionTotalResponse}
          />
        </div>)
        return


    );


    console.log(React);
  }
  // player.create('cme-video-player', '/products/cme/config/18_cmetv.json'); // local override
});

export default player;
*/
