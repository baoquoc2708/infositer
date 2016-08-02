import cx                     from 'classnames';
import React, { PropTypes }   from 'react';
import TrackingActions        from 'actions/cme_tracking_actions';
import HasImageAssets         from 'mixins/has_image_assets';
import HasPrettyTime          from 'mixins/has_pretty_time';
import IOSVideoSetCurrentTime from 'mixins/ios_video_set_current_time';
import $                      from 'jquery';


export default React.createClass({
  displayName: 'CME.SlideThumbnail',
  propTypes: {
    onClick:   PropTypes.func,
    type:      PropTypes.string,
    assetURL:  PropTypes.string,
    startTime: PropTypes.string,
    index:     PropTypes.number,
    isCurrent: PropTypes.bool,
    thumbnailOverride: PropTypes.string
  },
  mixins: [ HasImageAssets, HasPrettyTime, IOSVideoSetCurrentTime ],
  componentDidUpdate() {
    setTimeout(()=> {
      const $thumb = $(React.findDOMNode(this.refs.thumbnail));
    }, 100);
  },
  go(e) {
    const { startTime, index, onClick } = this.props;
    TrackingActions.slideSelect(index + 1);
    this.setCurrentTime(this.secondsFromPrettyTime(startTime));
    if(onClick) onClick(e);
  },
  scaleThumb(imageURL) {
    return `${imageURL}?interpolation=lanczos-none&resize=300:225`;
  },
  render() {
    const { type, isCurrent, thumbnailOverride } = this.props,
          scaledThumb = this.scaleThumb(this.imageURL()),
          scaledHtmlThumb = this.scaleThumb(this.htmlImageURL()),
          classNames = cx({
            'cme-slide-thumbnail': true,
            'is-current': isCurrent
          });
    let slide = <img ref="thumbnail" src={scaledThumb}></img>;
    if (type === 'HTML' && thumbnailOverride) {
      slide = <img ref="thumbnail" src={scaledHtmlThumb}></img>;
    } else if (type === 'HTML') {
      slide = null;
    }
    return (
      <div onClick={this.go} className={classNames}>
        {slide}
      </div>
    );
  },
});
