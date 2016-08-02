import cx                     from 'classnames';
import React, { PropTypes }   from 'react';
import TrackingActions        from 'actions/cme_tracking_actions';
import HasPrettyTime          from 'mixins/has_pretty_time';
import IOSVideoSetCurrentTime from 'mixins/ios_video_set_current_time';
import QuizActions            from 'actions/quiz_actions';
import $                      from 'jquery';

export default React.createClass({
  displayName: 'CME.TOC.Chapter',
  propTypes: {
    title: PropTypes.string.isRequired,
    startTime: PropTypes.string.isRequired,
    index: PropTypes.number.isRequired,
    isCurrent: PropTypes.bool,
    hasMobileStyle: PropTypes.bool,
    toggle: PropTypes.func,
    roadblockedTime: PropTypes.number
  },
  mixins: [ HasPrettyTime, IOSVideoSetCurrentTime ],
  go(e) {
    if($(e.target).hasClass('is-disabled') === true && this.props.hasMobileStyle === true) {
      return;
    }
    e.preventDefault();
    const time = this.secondsFromPrettyTime(this.props.startTime),
        { index, hasMobileStyle } = this.props;
    TrackingActions.chapter(index + 1);
    this.setCurrentTime(time);
    if(hasMobileStyle) {
      this.props.toggle();
    }
    QuizActions.hideLayer('isQuestionVisible');
    QuizActions.hideLayer('isChartVisible');
  },
  render() {
    const { title, isCurrent, startTime, roadblockedTime } = this.props,
          isDisabled = (roadblockedTime < this.secondsFromPrettyTime(startTime)),
          classNames           = cx({
           'cme-toc-chapter': true,
           'is-current': isCurrent,
           'is-disabled': isDisabled
         });
    return (
      <li className={classNames} onClick={this.go}>
        {title}
      </li>
    );
  }
});
