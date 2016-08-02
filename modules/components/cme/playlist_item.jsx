import cx                   from 'classnames';
import React, { PropTypes } from 'react';
import ResizesImages        from 'mixins/resizes_images';
import TrackingActions      from 'actions/cme_tracking_actions';

export default React.createClass({
  displayName: 'CME.PlaylistItem',
  propTypes: {
    isCurrent: PropTypes.bool,
    articleURL: PropTypes.string.isRequired,
    thumbURL: PropTypes.string.isRequired,
    text: PropTypes.string,
    duration: PropTypes.string,
    date: PropTypes.string,
    index: PropTypes.number
  },
  mixins: [ ResizesImages ],
  redirectTo(event) {
    if(event && event.preventDefault) {
      event.preventDefault();
      event.stopPropagation();
      event.nativeEvent.stopImmediatePropagation();
      TrackingActions.playList(this.props.index);
      window.location.href = this.props.articleURL;
    }
  },
  render() {
    const { isCurrent, text,
            duration, date,
            articleURL, thumbURL } = this.props,
            classNames  = cx({
              'cme-playlist-item': true,
              'is-current': isCurrent
            });
         let content  = null;
         if(articleURL === 'comingsoon' || isCurrent) {
           content  = (<div className="cme-playlist-item-link">
           <img className="cme-playlist-item-thumbnail" src={ this.resizeImageTo(thumbURL, '320x180') }></img>
           <div className="cme-playlist-item-text">{ text }<div>{ (isCurrent) ? 'Now Playing' : 'Coming Soon'}</div></div>
           <div className="cme-playlist-item-duration">{ duration }</div>
           <div className="cme-playlist-item-date">{ date }</div>
          </div>);
        } else {
           content  = (<a className="cme-playlist-item-link" onClick={this.redirectTo} >
            <img className="cme-playlist-item-thumbnail" src={ this.resizeImageTo(thumbURL, '320x180') }></img>
            <div className="cme-playlist-item-text">{ text }</div>
            <div className="cme-playlist-item-duration">{ duration }</div>
            <div className="cme-playlist-item-date">{ date }</div>
          </a>);
        }
    return (
      <li className={classNames}>
        {content}
      </li>
    );
  }
});
