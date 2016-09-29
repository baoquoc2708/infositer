export default {
	init(){
		console.log('infosite');
		$('.chrome-share').on('click', function(event) {
			event.preventDefault();
			$('.tooltip').toggleClass('tooltip-open');
		});
	},
	feature: {
		feature1: true,
		feature2: false
	}
};