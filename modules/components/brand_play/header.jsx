import React                  from 'react';
import URLTracking            from 'mixins/url_tracking';
import HeaderImage            from 'components/brand_play/header_image';
import ISILink                from 'components/brand_play/isi_link';
  /**
   * @jsx React.DOM
   */
export default React.createClass({
    displayName: "BrandPlay.Header",
    mixins: [URLTracking],
    getDefaultProps: function(){
        return {
          isiLinks: []
        }
    },
    render: function(){
      let isiLinks = this.props.isiLinks.map((link,i) => {
            return (<div id={'brand-play-header-isi-link-' + i}>
                      <ISILink isiURL={link.isiURL} onClick={this.track(link.isiURL)} isiLink={link.isiLink} key={i}/>
                      <br />
                    </div>
                  );
            });

      return (
          <div className="brand-play-header">
            <HeaderImage img headerURL={this.props.headerURL} title={this.props.title} />
            { isiLinks }
          </div>
      );
    }
  });