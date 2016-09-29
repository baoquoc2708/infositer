import $                                from 'jquery';
import cx                               from 'classnames';
import React , { PropTypes }            from 'react';
import Util                             from 'utils/util';

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
            let articleName = window.location.pathname.split("/").pop(),
                currentArticle = infositeConfig.articleMain;
            infositeConfig.navigation.navMenu.forEach(function(index){
                if(articleName == index.url){
                    currentArticle = index.url;
                    return;
                } else {
                    index.submenu.forEach(function(index){
                        if(articleName == index.url){
                            currentArticle = index.url;
                            return;
                        }
                    });
                }
            });
            let loadUrl = '/'+infositeConfig.articleDirectory+'/'+currentArticle+'.html';
            $('.article').load(loadUrl,
                function(){
                    console.log("home article loaded")
                /* Stuff to do after the page is loaded */
            });
        });   
    },
    linkItemFn(item){
        let self = this;
        let linkItem = item.map(function(data,iterator){
            return ( <li key={iterator} className='sub-menu-list' onClick={(event) => self.listAction(event)}>
                        <span className='sub-menu-image'></span> 
                        <a href={data.url} id={`sub-menu-${iterator}`} onClick={(event) => self.loadArticle(event)}> 
                            {data.title}
                        </a>
                    </li>)  
        }); 
        return linkItem;     
    },
    navMenuFn(){
        let self = this,
        navMenu = this.props.items.navMenu.map(function(data,iterator){
            if(data.submenu){
                return ( <li key={iterator} className='main-list' onClick={(event) => self.listAction(event)}>
                            <li key={iterator} className='menu-list' onClick={(event) => self.listAction(event)}>
                                <span className='menu-image'></span>
                                <a href={data.url} id={`menu-${iterator}`} onClick={(event) => self.loadArticle(event)}> 
                                    {data.title}
                                </a>
                            </li>
                            <ul>
                                {self.linkItemFn(self.props.items.navMenu[iterator].submenu)}
                            </ul>
                        </li>)
            } else {
                return ( <li key={iterator} className='menu-list' onClick={(event) => self.listAction(event)}>
                            <span className='menu-image'></span>
                            <a href={data.url} id={`menu-${iterator}`} onClick={(event) => self.loadArticle(event)}> 
                                {data.title}
                            </a>                        
                        </li>)
            }     
        }); 
        return navMenu;     
    },
    loadArticle(event){
        const originUrl = window.location.origin + '/infosite/infositeR_POC' ;
        event.stopPropagation();
        if(event.target.href.indexOf(window.location.origin) == -1){
            return;
        }
        let pageUrl = event.target.href;
        const dirName = '/article/'
        if(event.target.href.indexOf('#') > -1){
            let hashUrl = originUrl +'#'+ pageUrl.split('#')[1];
            window.history.pushState(null, null, hashUrl);
        } else {
            event.preventDefault();
            window.history.pushState(null, null, originUrl + '/' + $(event.target).attr('href'));
            $('.article').load(window.location.origin + dirName + $(event.target).attr('href')+'.html',function(){

            });
        }    
    },
    listAction(event){
        event.stopPropagation();
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