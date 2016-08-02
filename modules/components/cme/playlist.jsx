import cx                   from 'classnames';
import { map }              from '_';
import React, { PropTypes } from 'react';
import CMEPlaylistItem      from 'components/cme/playlist_item';

export default React.createClass({
  displayName: 'CME.Playlist',
  propTypes: {
    playlist: PropTypes.array.isRequired
  },
  render() {
    const { playlist } = this.props,
          classNames   = cx({
           'cme-playlist': true
          });
    const items = map(playlist, (item, i) => {
     if(item) {
        const isCurrent = window.location.href.indexOf(item.articleURL) !== -1;
        return <CMEPlaylistItem {...item} index={i} isCurrent={isCurrent} key={i} />;
    }
    });
    return (
      <div className={classNames}>
        <h3 className="cme-playlist-header">
          <div className="cme-ratio-container">
            <span>Episodes in this series</span>
          </div>
        </h3>
        <div className="playlist-list-container">
          <ul className="cme-ratio-container">
            {items}
          </ul>
        </div>
      </div>
    );
  }
});
