import _                      from '_';
import Util                   from 'utils/util';
import React                  from 'react';
import HasMedscapeGlobals     from 'mixins/has_medscape_globals';
  /**
   * @jsx React.DOM
   */
export default React.createClass({
    displayName: "BrandPlay.HeaderLink",
    mixins: [ HasMedscapeGlobals ],
    interpolateLink: function() {
      var t = _.template(this.props.isiURL);
      return t(_.extend({
        env: Util.environment()
      }).merge(this.ipp));
    },
    render: function(){
      return (
          <div>
            <a className="brand-play-header-isi-link"
               href={this.props.isiURL}
               target="_blank"
               onClick={this.props.onClick}>{this.props.isiLink}</a>
          </div>
      );
    }
});