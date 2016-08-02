import React, { PropTypes } from 'react';
import HasImageAssets from 'mixins/has_image_assets';

export default React.createClass({
  displayName: 'CME.ImageSlide',
  propTypes: {
    assetURL: PropTypes.string
  },
  mixins: [ HasImageAssets ],
  render() {
    return <img className="cme-image-slide" src={this.imageURL()}></img>;
  }
});
