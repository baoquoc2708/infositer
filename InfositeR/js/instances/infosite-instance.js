// instance JS for events and other code outside of core 


window.addEventListener('load', function(){
	console.log("instance");
	document.addEventListener('articleOnLoad', function(){ //event for article on load
		console.log("article load first time");
	}, false);
	document.addEventListener('articleOnAction', function(){ // event for article on navigation click 
		console.log("article load on navigation");
	}, false);
});