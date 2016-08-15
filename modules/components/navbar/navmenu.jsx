import $                      from 'jquery';
import cx                     from 'classnames';
import React , { PropTypes }				  from 'react';
import Util 				  from 'utils/util';

export default React.createClass({
    displayName: 'navigationMenu',
    propTypes: {
        items: PropTypes.object
    },
    getInitialState() {
        return {
              
        };
    },
    getDefaultProps() {
        return {
              
        };
    },
    componentWillMount() {
             
    },
    linkItemFn(item){
        let linkItem = item.map(function(data,iterator){
            return ( <li key={iterator} className='sub-menu-list'> 
                        <a href={data.url} id={`sub-menu-${iterator}`}>{data.title}</a>
                </li>)  
        }); 
        return linkItem;     
    },
    navMenuFn(){
        let self = this;
        let navMenu = this.props.items.navMenu.map(function(data,iterator){
            if(data.submenu){
                return ( <li key={iterator} className='menu-list'> 
                            <a href={data.url} id={`menu-${iterator}`}>{data.title}</a>
                            <ul>
                                {self.linkItemFn(self.props.items.navMenu[iterator].submenu)}
                            </ul>
                        </li>)
            } else {
                return ( <li key={iterator} className='menu-list'> 
                            <a href={data.url} id={`menu-${iterator}`}>{data.title}</a>                        
                        </li>)
            }     
        }); 
        return navMenu;     
    },
    componentDidMount() {
         
    },
    render() {
        return (
            <div className='navigation'>
				<div className='nav-menu'>
					<ul>
						{this.navMenuFn()}
					</ul>
				</div>
                <div className='article'>
                </div>
			</div>
        );
    }
});