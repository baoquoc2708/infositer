/*global define*/
define([
  '_',
  'classnames',
  'react',
  'actions/brand_play_tracking_actions'
], function(
  _,
  cx,
  React,
  Tracking
){
  'use strict';
  /**
   * @jsx React.DOM
   */
  return React.createClass({
    displayName: "BrandPlay.MenuDropdown",
    getInitialState: function() {
      return { isOpen: false };
    },
    mkTrackLink: function(index) {
      var oneBased = index + 1;
      return function(e) {
        e.stopPropagation();
        Tracking.trackEvent({
          identifier: 'OPTION-' + oneBased,
          event: 'vidvbp-action_' + oneBased
        });
        this.setState({ isOpen: false });
      }.bind(this);
    },
    toggle: function(e) {
      if(e.target.getAttribute('href')) return; // we clicked a link.
      e.preventDefault();

      var action = this.state.isOpen? 'close' : 'open';
      Tracking.trackEvent({
        identifier: 'ACTIONSHEET_' + action.toUpperCase(),
        event: 'vidvbp-action_' + action
      });
      this.setState({ isOpen: !this.state.isOpen });
    },
    render: function(){
      // TODO refactor this to a mixin that is shared with chapter dropdown.
      var classNames = cx({
        'brand-play-menu-dropdown': true,
        'is-open': this.state.isOpen
      });
      return (
          <div className={classNames}>
            <a className="brand-play-menu-dropdown-open"
               onTouchEnd={this.toggle} onClick={this.toggle}>Open</a>
            <div className="shadow-box" onTouchEnd={this.toggle} onClick={this.toggle}>
              {this.renderMenu()}
            </div>
          </div>
      );
    },
    renderMenu: function(){
      if(!this.props.links) {
        return <div></div>;
      }
      var classNames = cx({
        "brand-play-menu-dropdown-list": true,
        "is-open": this.state.isOpen
      });

      var menuItems = _.map(this.props.links, function(item, i){
        return (
            <li id={'brand-play-dropdown-item-' + i} className="brand-play-menu-dropdown-item" key={i}>
              <a target="_blank" onClick={this.mkTrackLink(i)} href={item.url}>{item.label}</a>
            </li>
        );
      }, this);
      menuItems.push(
          <li onClick={this.toggle} onTouchEnd={this.toggle}
              id={'brand-play-dropdown-item-' + menuItems.length}
              className="brand-play-menu-dropdown-item cancel" key={menuItems.length}>
            <a>Cancel</a>
          </li>
      );
      return (<ul className={classNames}>
                <span className="brand-play-menu-dropdown-arrow"></span>
                {menuItems}
              </ul>);
    }
  });
});
