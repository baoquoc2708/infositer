/**
 *  this returns a class definition, not an object instance. so 'new' keyword must be used to instantiate it.
 */

define( function() {
	var UtilsDef = function () {
		//some internal/private static methods so caller need not access them
		var _supportedFullscreenApi = null,
			_browserFullScreenDetection = function() {
				var lookupMap = [
						// Spec: https://dvcs.w3.org/hg/fullscreen/raw-file/tip/Overview.html
						[
							'requestFullscreen',
							'exitFullscreen',
							'fullscreenElement',
							'fullscreenchange',
							'generic'
						],
						// WebKit
						[
							'webkitRequestFullscreen',
							'webkitExitFullscreen',
							'webkitFullscreenElement',
							'webkitfullscreenchange',
							'webkit'
						],
						// Old WebKit (Safari 5.1)
						[
							'webkitRequestFullScreen',
							'webkitCancelFullScreen',
							'webkitCurrentFullScreenElement',
							'webkitfullscreenchange',
							'webkit'
						],
						// Mozilla
						[
							'mozRequestFullScreen',
							'mozCancelFullScreen',
							'mozFullScreenElement',
							'mozfullscreenchange',
							'mozilla'
						],
						// Microsoft
						[
							'msRequestFullscreen',
							'msExitFullscreen',
							'msFullscreenElement',
							'MSFullscreenChange',
							'ie'
						]],
					resultApiSet;

				for(var i=0; i<lookupMap.length; i++) {
					// check for exit part ONLY - which is most reliable
					if(lookupMap[i][1] in document) {
						resultApiSet = lookupMap[i];
						break;
					}
				}


				if(resultApiSet) {
					_supportedFullscreenApi = {
						'enterMethod': resultApiSet[0],
						'exitMethod': resultApiSet[1],
						'elementName': resultApiSet[2],
						'eventName': resultApiSet[3],
						'browser': resultApiSet[4]
					};
				}
			},
			_isFullScreenMode = function() {
				if(_supportedFullscreenApi && document[_supportedFullscreenApi.elementName]) {
					return true;
				} else {
					return false;
				}
			};


		return {
			init: function (container) {
				var self = this;
				self.$videoContainer = $(container);

				if(!_supportedFullscreenApi) {
					// we only set the static var once
					_browserFullScreenDetection();
				}

				//console.log("_supportedFullscreenApi", _supportedFullscreenApi);
			},

			isFullScreenApiSupported: function() {
				return _supportedFullscreenApi !== null;
			},

			isFullscreenmode: function() {
				return _isFullScreenMode();
			},

			getSupportedFullscreenApi : function() {
				return _supportedFullscreenApi;
			},

			specialScreenChangeHandler: function() {
				//this block may not be needed after new 2.18 is deployed...
				var self = this,
					$container = self.$videoContainer;

				var $playerEle = $('.akamai-video object', $container);
				if(self.isFullscreenmode() === true) {
					//we need to resize the height of the player object...
					var playerHeight = $(window).height() - 25;
					$playerEle.css({height: playerHeight + 'px'});
					$container.addClass("vjs-fullscreen");
				} else {
					$playerEle.css({height: ''});
					$container.removeClass("vjs-fullscreen");
				}
			},

			toggleFullScreen: function (targetEle) {
				var self = this,
					isIE = window.navigator.userAgent.indexOf('MSIE ') > 0 || !!window.navigator.userAgent.match(/Trident.*rv\:11\./),
					screenChangeHandler = function(e) {
						e.preventDefault();
						postChangeHandler(true);
					},
					postChangeHandler = function(isScreenChangingEvent) {
						var $toolbar = $('.vjs-control-bar', self.$videoContainer),
							isFullscreen = self.isFullscreenmode(),
							eventName = isFullscreen === true ? "fullscreenon" : "fullscreenoff";

						self.$videoContainer.trigger(eventName);

/*						if(isFullscreen === true && _supportedFullscreenApi.browser == 'mozilla') {
							$toolbar.css({bottom: '0px'});
						} else {
							$toolbar.css({bottom: ''});
						}*/

						if(isScreenChangingEvent === true) {
							$(document).off(_supportedFullscreenApi.eventName, screenChangeHandler);

							if(isIE === true) {
								if(isFullscreen !== true) {
									var flashWrap = $('.akamai-video', self.$videoContainer);
									//setting this height under IE will not restrict the actual height of the video play.
									//But it does overcome the after-effect of going to fullscreen mode under IE:  the height becomes over 1000px.
									flashWrap.css({'height': '150px'});

									//we remove the temporary setting to prevent any side effect...
									setTimeout(function() {
										flashWrap.css({'height': ''});
									}, 100);

								}
							}
						}

						self.specialScreenChangeHandler();
					};

				//we only proceed if the feature is supported by current browser...
				if(self.isFullScreenApiSupported() === true) {
					if (self.isFullscreenmode() === false) {

						targetEle[_supportedFullscreenApi.enterMethod]();

						setTimeout(function(){
							//the event will be fired right away without the setTimeout
							$(document).on(_supportedFullscreenApi.eventName, screenChangeHandler);
						}, 500);

					} else {
						document[_supportedFullscreenApi.exitMethod]();
					}

					setTimeout(function() {
						postChangeHandler(false);
					}, 500);
				}
			},

			generateUniqueId: function () {
				var rand = Math.random();
				return 'akamaiplayer_' + (rand * 1000 - (rand * 1000) % 1);
			}
		};

	};

	return UtilsDef;

});

