import _brandStyle                      from 'brandStyle';

import _                                from '_';
import $                                from 'jquery';

import React                            from 'react';
import Reflux                           from 'reflux';

import Util                             from 'utils/util';

import QuizActions                      from 'actions/quiz_actions';
import VideoActions                     from 'actions/video_actions';

import BrandPlayLayoutStore             from 'stores/brand_play_layout_store';
import DescriptorStore                  from 'stores/descriptor_store';
import _QuizStore                       from 'stores/quiz_store';
import StandalonePlayer                 from 'components/standalone_player';
import Poll                             from 'components/poll';
import BrandPlayArbitraryContent        from 'components/brand_play/arbitrary_content';
import BrandPlayRestartResume           from 'components/brand_play/restart_resume';
import BrandPlayHeader                  from 'components/brand_play/header';
import BrandPlayChrome                  from 'components/brand_play/chrome';
import BrandPlayChapters                from 'components/brand_play/chapters';
import BrandPlayISI                     from 'components/brand_play/isi';
  /**
   * @jsx React.DOM
   */
export default React.createClass({
    displayName: 'Player.BrandPlay',
    mixins: [ Reflux.connect(DescriptorStore) ],
    componentDidMount: function() {
      $(window).on('hashchange', function() {
        let chapter = Number(window.location.hash.split('#')[1]);
        if(!isNaN(chapter)) {
          VideoActions.selectVideo(this.state.descriptor.videos[chapter - 1], chapter - 1);
        }
      }.bind(this));
    },
    interstitial: function(videoIndex) {
      let videos                   = this.state.descriptor.videos,
          questionConfig         = this.state.descriptor.poll,
          next                     = videoIndex + 1,
          isAuto                   = _.get(this.state.descriptor, 'defaultVideoOptions.shouldAutoplay'),
          chartConfig              = this.state.descriptor.qna;
      if(questionConfig && questionConfig['chapter' + next]) {
        // QNAActions.launch(videoIndex);
        QuizActions.launch(questionConfig['chapter' + next], chartConfig, videoIndex);
      } else if(isAuto && videos[next]) {
        VideoActions.selectVideo(videos[next], next);
      }
    },
    render: function() {
      let title, restartResume, headerURL, isiLinks, chapters,
          dropdownLinks, videoIndex, questions, hasISI;
      if(this.state.descriptor) {
        title         = this.state.descriptor.title;
        restartResume = this.state.descriptor.ippResumeEnable? <BrandPlayRestartResume /> : null;
        headerURL     = this.state.descriptor.headerURL;
        isiLinks      = this.state.descriptor.isiLinks;
        chapters      = this.state.descriptor.videos;
        dropdownLinks = this.state.descriptor.dropdownLinks;
        videoIndex    = this.state.descriptor.initialIndex;
        questions     = this.state.descriptor.poll;
        hasISI        = BrandPlayLayoutStore.hasISI;
      }

      return (
          <div className="brand-play">

            {restartResume}

            <BrandPlayHeader hasISI={hasISI}
              headerURL={headerURL} isiLinks={isiLinks} />

            <BrandPlayChrome title={title} chapters={chapters} dropdownLinks={dropdownLinks}>

              <BrandPlayISI isi={BrandPlayLayoutStore.isiContent}
                    isiLinks={isiLinks} headerURL={headerURL} />

              <BrandPlayChapters chapters={chapters} index={videoIndex}
                    headerURL={headerURL} title={title} isiLinks={isiLinks}>
                 <BrandPlayArbitraryContent contentID="#in_column_beneath_chapters" />
              </BrandPlayChapters>

              <div className="brand-play-player">
               <div className="brand-play-poll-wrapper">
                  <StandalonePlayer
                    id='brand-player'
                    onVideoEnd={this.interstitial}
                    videoIndex={videoIndex}
                    descriptorURL={this.props.descriptorURL}
                    descriptorJSON={this.props.descriptorJSON} />

                  <Poll questions={questions} chapters={chapters} />
                </div>

                <BrandPlayArbitraryContent contentID="#in_wrapper_beneath_player" />

                <BrandPlayISI isi={BrandPlayLayoutStore.isiContent}
                   isiLinks={isiLinks} headerURL={headerURL} />

                <BrandPlayChapters chapters={chapters} index={videoIndex}
                      headerURL={headerURL} title={title} isiLinks={isiLinks} >
                  <BrandPlayArbitraryContent contentID="#in_wrapper_beneath_chapters" />
                </BrandPlayChapters>

              </div>

            </BrandPlayChrome>
          </div>
      );
    }
  });
