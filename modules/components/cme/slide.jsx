import React, { PropTypes } from 'react';
import ImageSlide from 'components/cme/image_slide';
import HTMLSlide from 'components/cme/html_slide';


const SLIDES = {
  HTML: HTMLSlide,
  Image: ImageSlide
};

export default React.createClass({
  displayName: 'CME.Slide',
  propTypes: {
    index: PropTypes.number,
    type: PropTypes.string
  },
  renderSlide(type) {
    const component = SLIDES[type] || ImageSlide;
    return React.createElement(component, this.props);
  },
  render() {
    return (
      <div className="cme-slide">
        { this.renderSlide(this.props.type) }
      </div>
    );
  },
});
