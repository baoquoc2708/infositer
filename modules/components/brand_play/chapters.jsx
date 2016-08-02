import _                        from '_';
import $                        from 'jquery';
import { isMobile }             from 'utils/util';
import React                    from 'react';
import Reflux                   from 'reflux';
import QuizActions              from 'actions/quiz_actions';
import VideoStore               from 'stores/video_store';
import PlaylistItem             from 'components/player/playlist_item';
import ISILink                  from 'components/brand_play/isi_link';
import HasNodeHeight            from 'mixins/has_node_height';
import URLTracking              from 'mixins/url_tracking';
import 'jqmobile';
  /**
   * @jsx React.DOM
   */
export default React.createClass({
    displayName: 'BrandPlay.Chapters',
    mixins: [ Reflux.listenTo(VideoStore, 'onVideoChange'), HasNodeHeight, URLTracking],
    getDefaultProps: function() {
      return { chapters: [ ], viewed: { }, index: 0, isiLinks: [] };
    },
    getInitialState: function() {
      return { index: this.props.index, viewed: this.props.viewed };
    },
    componentDidMount: function() {
      $(window).on('orientationchange', () => {
        this.updateChapterHeight();
      });
    },
    componentDidUpdate: function() {
      this.updateChapterHeight();
    },
    updateChapterHeight: function() {
      if(isMobile()) {
        let $node = $(React.findDOMNode(this));
        $node.height(this.getNodeHeight($node));
      }
    },
    hasViewed: function(index) {
      return this.state.viewed[index];
    },
    onVideoChange: function(state) {
      if(state.video.index !== this.state.index) {
        this.setState({ index: state.video.index, viewed: state.video.viewed });
      }
    },
    hideQNA: function() {
      QuizActions.close();
    },
    render: function() {
      let chapters = _.map(this.props.chapters, this.renderChapter, this),
          lastItem = this.props.children?
            <li className="brand-play-chapters-last-item">{this.props.children}</li> : null,

          isiLinks = this.props.isiLinks.map((link,i) => {
            return (<ISILink isiURL={link.isiURL} onClick={this.track(link.isiURL)} isiLink={link.isiLink} key={i}/>);
          });


      if (chapters.length === 1) {
        chapters = [ ];
      } else if(chapters.length % 2 !== 0) {
        chapters.push(<li key={chapters.length} className="video-player-playlist-item" />);
      }
      return (<ul className="brand-play-chapters">
              <li className="brand-play-chapters-header">
                <img className="brand-play-header-image"
                   src={this.props.headerURL} alt={this.props.title} />
                   { isiLinks }
              </li>
                {chapters}
                {lastItem}
            </ul>);
    },
    renderChapter: function(chapter, i) {
      let isPlaying  = this.state.index === i,
          hasViewed  = this.hasViewed(i),
          content;

      if(isPlaying) {
        content = <div className="brand-play-chapter-now-playing">NOW<br/>PLAYING...</div>;
      } else if(hasViewed) {
        content = <div className="brand-play-chapter-has-viewed">VIEWED</div>;
      } else {
        content = <div className="brand-play-chapter-play-icon"></div>;
      }

      return (
          <PlaylistItem onClick={this.hideQNA} hasViewed={hasViewed}
                isSelected={isPlaying} key={i} index={i} video={chapter}>
            <div className="brand-play-chapter">
               {content}
               <img className="brand-play-chapter-thumbnail" src={chapter.thumbnail} />
            </div>
            <h2 className="brand-play-chapter-title">
             <span className="brand-play-chapter-title-prefix">Chapter {i+1}:</span>
             <span dangerouslySetInnerHTML={{ __html: chapter.title}} />
            </h2>
          </PlaylistItem>
      );
    }
  });
