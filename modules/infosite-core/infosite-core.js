export default {
	init(){
		console.log('infosite');
		this.infositeRouting();
		$('.chrome-share').on('click', function(event) {
			event.preventDefault();
			$('.tooltip').toggleClass('tooltip-open');
		});
	},
	feature: {
		feature1: true,
		feature2: false
	},
	infositeRouting(){
		let articleName = window.location.pathname.split("/").pop();
		if(articleName == 'article-1'){
			$('.article').children().remove();
			$('.article').load('/article/article-1.html');
		}
		$('.menu-list a, .sub-menu-list a').on('click', function(event) {
			if(event.target.href.indexOf('#') > -1){
				$(this).removeAttr('target');
				console.log(event.target.href);
			} else if(event.target.href.indexOf(window.location.origin) == -1){
				console.log(event.target.href);
				console.log(window.location.origin);

			} else {
				event.preventDefault();
				console.log(event.target.href);
			}
		});
	}
	/*loadArticle(event){
        const originUrl = window.location.origin + '/infosite/infositeR_POC';
        event.stopPropagation();
        if(event.target.href.indexOf(window.location.origin) == -1){
            return;
        }
        let pageUrl = event.target.href;
        const dirName = '/articles/'
        event.preventDefault();
        if(event.target.href.indexOf('#') > -1){
            let hashUrl = originUrl +'#'+ pageUrl.split('#')[1];
            window.history.pushState(null, null, hashUrl);
        } else {
            window.history.pushState(null, null, originUrl + dirName + $(event.target).attr('href'));
            $('.article').load(originUrl + dirName + $(event.target).attr('href'));
        }    
    },
    listAction(event){
        event.stopPropagation();
        console.log(event.target);
    },*/
};