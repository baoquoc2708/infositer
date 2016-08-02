import $                 from   'jquery';
import cx                from   'classnames';
import React             from   'react';
import Util              from   'utils/util';
import URLTracking       from   'mixins/url_tracking';
import HeaderImage       from   'components/brand_play/header_image';
import ISILink           from   'components/brand_play/isi_link';
import HasNodeHeight     from   'mixins/has_node_height';
  /**
   * @jsx React.DOM
   */
export default React.createClass({
  displayName: 'BrandPlay.ISI', // Important Safety Information
  mixins: [HasNodeHeight, URLTracking],
  getInitialState: function() {
    return { isZoomed: false };
  },
  getDefaultProps: function(){
    return {
      isiLinks: []
    }
  },
  toggle: function(e) {
    e.preventDefault();
    this.setState({
      isZoomed: !this.state.isZoomed
    });
  },
  trackLinks: function() {
    let linksList, links;

    linksList = document.querySelectorAll('.isi a');
    links = Array.prototype.slice.call( linksList, 0 );

    links.forEach((link) => {
      link.addEventListener('click', () => {
        let url = event.target.getAttribute('href');
        this.track(url);
      });
    });
  },
  componentDidMount: function() {

    $(window).on('orientationchange', () => {
      this.updateIsiHeight();
    });

    this.trackLinks();
  },
  updateIsiHeight: function() {
    let $node = $(React.findDOMNode(this));
    $node.height(this.getNodeHeight($node));
  },
  componentDidUpdate: function() {
    if(Util.isMobile()) {
      let $node = $(React.findDOMNode(this));
      if(!this.state.isZoomed) {
        this.updateIsiHeight();
      } else {
        $node.height('auto');
      }
    }
  },
  render: function() {
    let isi         = this.props.isi || '&nbsp;',
        classNames  = cx({
          'brand-play-isi': true,
          'is-zoomed': this.state.isZoomed
        }),
        isiLinks = this.props.isiLinks.map((link,i) => {
          return (<ISILink isiURL={link.isiURL} onClick={this.track(link.isiURL)} isiLink={link.isiLink} key={i}/>);
        });
        
    return (
        <div className={classNames}>
          <div className="brand-play-isi-zoom-button" onClick={this.toggle} onTouchEnd={this.toggle} />
          <HeaderImage headerURL={this.props.headerURL} title={this.props.title} />
          { isiLinks }
          <div className="isi-container" dangerouslySetInnerHTML={{__html: isi}} />
        </div>
    );
  }
});
