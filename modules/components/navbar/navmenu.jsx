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
                        <a href={data.url} id={`sub-menu-${iterator}`} target="_blank" onClick={(event) => self.loadArticle(event)}>{data.title}</a>
                </li>)  
        }); 
        return linkItem;     
    },
    navMenuFn(){
        let self = this,
        navMenu = this.props.items.navMenu.map(function(data,iterator){
            if(data.submenu){
                return ( <li key={iterator} className='menu-list' onClick={(event) => self.listAction(event)}> 
                            <a href={data.url} id={`menu-${iterator}`} target="_blank" onClick={(event) => self.loadArticle(event)}>{data.title}</a>
                            <ul>
                                {self.linkItemFn(self.props.items.navMenu[iterator].submenu)}
                            </ul>
                        </li>)
            } else {
                return ( <li key={iterator} className='menu-list' onClick={(event) => self.listAction(event)}> 
                            <a href={data.url} id={`menu-${iterator}`} target="_blank" onClick={(event) => self.loadArticle(event)}>{data.title}</a>                        
                        </li>)
            }     
        }); 
        return navMenu;     
    },
    loadArticle(event){
        const originUrl = 'http://www.staging.medscape.com/infosite/infositeR_POC';
        event.stopPropagation();
        if(event.target.href.indexOf(originUrl) == -1){
            return;
        }
        let pageUrl = event.target.href;
        const dirName = '/articles/'
        event.preventDefault();
        if(event.target.href.indexOf('#') > -1){
            let hashUrl = originUrl +'#'+ pageUrl.split('#')[1];
            window.history.pushState(null, null, hashUrl);
        } else {
            window.history.pushState(null, null, originUrl + dirName + $(event.target).attr('href').split('/')[2]);
            $('.article').load(originUrl + dirName + $(event.target).attr('href').split('/')[2]);
        }    
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