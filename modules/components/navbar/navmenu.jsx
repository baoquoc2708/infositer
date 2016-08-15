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
            return ( <li className='menulist'> 
                        <a href={data.url} id={`menu-${iterator}`}>{data.title}</a>
                </li>)  
        }) 
        return linkItem;     
    },
    componentDidMount() {
         
    },
    render() {
        return (
            <div className='menu'>
				<div className='menulist'>
					<div className='listitem'>
						<ul>
							{this.linkItemFn(this.props.items.navMenu)}
						</ul>
					</div>
				</div>
                <div className='article'>
                </div>
			</div>
        );
    }
});