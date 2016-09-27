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
		

		$('.infosite-footer').on('click', function(event) {
			event.preventDefault();
			/* Act on the event */
			//window.history.pushState(null, null, 'http://localhost:8080/article-1');
			//console.log("here");
			//$('.article').load('/article/article-1.html',
			//	function(){
				/* Stuff to do after the page is loaded */
			//});
			
		});
		const originUrl = window.location.origin + '/infosite/infositeR_POC';
		$('.medscape-link').on('click', function(event) {
			event.preventDefault();
			/* Act on the event */
			window.history.pushState(null, null, originUrl);
			console.log("back");
			$('.article').children().remove();
		});
	}
};