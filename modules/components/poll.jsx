import React, { PropTypes }   from 'react';
import Reflux                 from 'reflux';
import VideoActions           from 'actions/video_actions';
import QuizActions            from 'actions/quiz_actions';
import QuizStore              from 'stores/quiz_store';
import Quiz                   from 'components/qna/quiz';

export default React.createClass({
  displayName: 'quiz',
  mixins: [ Reflux.connect(QuizStore) ],
  getDefaultProps: function() {
    return { questions: [ ], chapters: [ ] };
  },
  PropTypes: {
    chapters: PropTypes.array.isRequired,
    questions: PropTypes.array.isRequired
  },
  replay: function(e) {
    e.preventDefault();
    VideoActions.replay();
    QuizActions.close();
  },
  next: function(nextIndex) {
    return function(e) {
      e.preventDefault();
      VideoActions.selectVideo(this.props.chapters[nextIndex], nextIndex);
      VideoActions.start();
      QuizActions.close();
    }.bind(this);
  },
  render: function() {
    let quizComponent = null;
    if(this.state.quiz && this.state.quiz[this.state.quiz.activeQid]) {
      let chapterIndex, questions, nextButton;
      chapterIndex = this.state.quiz.index + 1;
      questions = this.props.questions['chapter'+chapterIndex];
      if(chapterIndex < this.props.chapters.length) {
        nextButton = (<div onClick={this.next(chapterIndex)}
                          className="next-video-button video-button">Next Video</div>);
      }
      quizComponent = (<Quiz id={'question-chapter-' + chapterIndex}
                       key={chapterIndex}
                       isActive={(chapterIndex - 1) === this.state.quiz.index}
                       questions={questions}>
                <div className="buttonsContainer">
                  <div onClick={this.replay}
                     className="replay-video-button video-button">Replay Video</div>
                     {nextButton}
                  </div>
              </Quiz>);
    }
    return <div className="poll">{quizComponent}</div>;
  }
});
