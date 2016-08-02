import React, { PropTypes } from 'react';
export default React.createClass({
  displayName: 'CME.Watermark',
  propTypes: {
    watermark: PropTypes.string,
    watermarkPosition: PropTypes.string
  },
  interpolate(position) {
    let pos  = { }; // eslint-disable-line
    const desc = position || 'Bottom Right',
        off  = '15px';
    if(desc.match(/left/i)) {
      pos.left = off;
    } else {
      pos.right = off;
    }
    if(desc.match(/upper/i)) {
      pos.top = off;
    } else {
      pos.bottom = off;
    }
    return pos;
  },
  render() {
    let style = this.interpolate(this.props.watermarkPosition); // eslint-disable-line
    style.backgroundImage = `url(${this.props.watermark})`;
    return (
      <div className="cme-watermark"
           ref="watermark"
           style={style}></div>
    );
  }
});
