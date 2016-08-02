import SA           from 'video/stand_alone_player.js';

window.SA = SA;
document.addEventListener('DOMContentLoaded', () => {
	const videos = document.querySelectorAll('.ba1-video-container');
	window.videoPlayer = new Array(videos.length);
	Array.prototype.forEach.call(videos, (videoContainer, i) => {
		videoPlayer[i] = new SA();
		videoPlayer[i].create(videoContainer, i);
	});

	window.addEventListener('load', function(){
		let autoplayFlg = true;
		setTimeout(function(){
			$('.ba1-video-container').each(function(i, el) {

				if($(el).data('autoplay') && $(el).closest('.panel_BR_50').parent().hasClass('activeSlide') && autoplayFlg){
					videoPlayer[i].mediaApi._v.mediaElement.play();
					autoplayFlg = false;
				}

				$('.prev_slide, .next_slide, .next, .prev, .magnify, #desktopMenuDropdown ul li, #mobileMenuDropdown ul li').on('click touch', function(event) {
					
					if($(el).data('autoplay') && $(el).closest('.panel_BR_50').parent().hasClass('activeSlide') && autoplayFlg){
						videoPlayer[i].mediaApi._v.mediaElement.play();
						autoplayFlg = false;
					} else {
						videoPlayer[i].mediaApi._v.mediaElement.pause();
					}
				});
			});
		}, 500);
	});

	window.addEventListener('load', function(){
		$('.akamai-branding-container').css('display', 'none');
		
		if(window.matchMedia("(min-width: 801px)").matches && navigator.userAgent.toLowerCase().match('webkit') !== null){
			/* We display the native Akami play button for Webkit browsers on Desktop only */
		} else {
			$('.akamai-play').hide();
		}
	});
});
