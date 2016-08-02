import React, { PropTypes } from 'react';
import { connect } from 'reflux';
import HasImageAssets from 'mixins/has_image_assets';
import BumperActions from 'actions/bumper_actions';
import BumperStore from 'stores/bumper_store';

export default React.createClass({
  displayName: 'CME.Bumper',
  propTypes: {
    bumperImage: PropTypes.string.isRequired,
    bumperHTML: PropTypes.string,
    onClick: PropTypes.func
  },
  mixins: [ connect(BumperStore), HasImageAssets ],
  getInitialState() {
    return { bumper: { } };
  },
  componentDidMount() {
    const { bumperHTML } = this.props,
          { content }    = this.state.bumper;

    if(bumperHTML && !content) {
      BumperActions.load(bumperHTML);
    }
  },
  render() {
    const { content, errorMessage } = this.state.bumper;
    const { bumperImage }           = this.props;

    let html  = '';
    const style = {
      backgroundImage: `url(${bumperImage})`
    };

    if(errorMessage) {
      html = errorMessage;
    } else if (content) {
      html = content;
    }
    return (
      <div className="cme-bumper"
           style={style}>
        <div className="cme-bumper-html" dangerouslySetInnerHTML={{ __html: html }}></div>
      </div>
    );
  }
});
