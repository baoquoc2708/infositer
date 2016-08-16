import $                                from 'jquery';
import cx                               from 'classnames';
import React , { PropTypes }		    from 'react';
import Util 				            from 'utils/util';

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
        $(document).ready(function() {
            let articleName = window.location.pathname.split("/").pop();
            if(articleName == 'article-1'){
                $('.article').load('/article/article-1.html');
            }
        });   
    },
    linkItemFn(item){
        let self = this;
        let linkItem = item.map(function(data,iterator){
            return ( <li key={iterator} className='sub-menu-list' onClick={(event) => self.listAction(event)}> 
                        <a href={data.url} id={`sub-menu-${iterator}`} onClick={(event) => self.loadArticle(event)}>{data.title}</a>
                </li>)  
        }); 
        return linkItem;     
    },
    navMenuFn(){
        let self = this,
        navMenu = this.props.items.navMenu.map(function(data,iterator){
            if(data.submenu){
                return ( <li key={iterator} className='menu-list' onClick={(event) => self.listAction(event)}> 
                            <a href={data.url} id={`menu-${iterator}`} onClick={(event) => self.loadArticle(event)}>{data.title}</a>
                            <ul>
                                {self.linkItemFn(self.props.items.navMenu[iterator].submenu)}
                            </ul>
                        </li>)
            } else {
                return ( <li key={iterator} className='menu-list' onClick={(event) => self.listAction(event)}> 
                            <a href={data.url} id={`menu-${iterator}`} onClick={(event) => self.loadArticle(event)}>{data.title}</a>                        
                        </li>)
            }     
        }); 
        return navMenu;     
    },
    loadArticle(event){
        event.preventDefault();
        event.stopPropagation();
        console.log(event.target.href);
    },
    listAction(event){
        event.stopPropagation();
        console.log(event.target);
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