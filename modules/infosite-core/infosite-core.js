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
		$(document).ready(function() {
			let articleName = window.location.pathname.split("/").pop();
			if(articleName == 'article-1'){
				$('.article').load('/article/article-1.html');
			}
		});

		$('.infosite-footer').on('click', function(event) {
			event.preventDefault();
			/* Act on the event */
			window.history.pushState(null, null, 'http://localhost:8080/article-1');
			console.log("here");
			$('.article').load('/article/article-1.html',
				function(){
				/* Stuff to do after the page is loaded */
			});
			
		});

		$('.medscape-link').on('click', function(event) {
			event.preventDefault();
			/* Act on the event */
			window.history.pushState(null, null, 'http://localhost:8080');
			console.log("back");
			$('.article').children().remove();
		});
	}
};