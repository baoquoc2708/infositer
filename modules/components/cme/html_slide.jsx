import React, { PropTypes } from 'react';
import SlideActions from 'actions/slide_actions';
import HasImageAssets from 'mixins/has_image_assets';

export default React.createClass({
  displayName: 'CME.HTMLSlide',
  propTypes: {
    assetURL: PropTypes.string.isRequired,
    index:    PropTypes.number.isRequired,
    content:  PropTypes.string,
  },
  mixins: [ HasImageAssets],
  componentDidMount() {
    const { index, content } = this.props;
    if(!content) {
      SlideActions.loadSlide(index, this.imageURL());
    }
  },
  componentWillUpdate(nextProps) {
    if(!nextProps.content && this.props.content) {
        nextProps.content = this.props.content;
    }
  },
  render() {
    const html = this.props.content || '';
    return <div className="cme-html-slide" dangerouslySetInnerHTML={{ __html: html }}></div>;
  }
});
