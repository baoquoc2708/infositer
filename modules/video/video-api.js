define(
	['script-loader!amp', 'actions/video_actions'],
	function(AkamaiCore, VideoActions) {
		//Note: we define a class definition here. Consuming code must use new keyword before using it.
		/**
		*	constructor
		*	@param id 	the element id of the element which you want the video to be in
		*	@param 	config 	configuration override.
		*	@param 	cb 	callback
		*
		*/
		function WebmdVideo(id, config, cb) {
			var self = this,
				isMobile = self.isMobile();

			this._v;
			this._t = null;
			this._id = id;
			this._isLoaded = false;
			this._isMuted = false;
			this._cbs = [];
			this.adPlaying = false;
			this.setEvents = {};

			this._config = $.extend({
				autoplay : false,
				media : {
					autoplay : false
				},
				controls : {
					mode : isMobile ? "auto" : "none",
					native : isMobile ? true : false
				},
				captioning : {
					enabled : true
				},
				mode : 'auto'
			}, config);
//config.ima.adTagUrl = config.ima.adTagUrl.replace('&impl=', '&ciu_szs=300x50,320x50,1x1,300x51,300x250,300x253,320x51&impl=');
//console.log(config.ima.adTagUrl)
			/*
			this._config.mode = "auto";

			this._config.media.source = [
									{ "src": "http://webmd-a.akamaihd.net/webmd-test/delivery/7b/00/7b00ace6-04ae-4048-93c2-9e219ae8dff1/120689-Module%204-1.18.13_1000k.mp4",  "type": "video\/mp4"}
								];

			this._config.media.track = [
								{
									kind : "captions",
									type : "application/ttml+xml",
									srclang : "en",
									src : "http://projects.mediadev.edgesuite.net/customers/akamai/mdt-html5-core/webmd/0.20.0.0001/samples/captioning.xml"
								}
				];
			/*
			this._config.ima = {
							enabled: true,
							resources: [
								{
									src: "http://imasdk.googleapis.com/js/sdkloader/ima3.js",
									type: "text/javascript"
								}
							],
							version: 3,
							adTagUrl: "http://pubads.g.doubleclick.net/gampad/ads?sz=640x360&iu=/6062/iab_vast_samples/skippable&ciu_szs=300x250,728x90&impl=s&gdfp_req=1&env=vp&output=xml_vast2&unviewed_position_start=1&url=" + window.location.href + "&correlator=" + new Date().toString(),
							disableCompanionAds: "false",
							companions: [
								{
									id: "companion-container",
									width: 728,
									height: 90
								}
							]
						};
			*/

			//this.init(cb);
		}

		/**
		*	the init method. Initializes the video, the elements around it with flash config data.
		*	@param 	cb 	callback.
		*/
		WebmdVideo.prototype.init = function(cb) {
			var self = this,
				isFF = !(window.mozInnerScreenX == null),
				isIE = window.navigator.userAgent.indexOf('MSIE ') > 0 || !!window.navigator.userAgent.match(/Trident.*rv\:11\./),
				imgSvrPath = window.image_server_url || '//img.preview.webmd.com/dtmcms/preview',
				basePluginUrl = window.location.host.indexOf("localhost") > -1 ? '/resources/plugins/' : imgSvrPath + '/webmd/consumer_assets/site_images/amd_modules/video2/1/lib/',
				baseSkinUrl = window.location.host.indexOf("localhost") > -1 ? '/amp/' : imgSvrPath + '/webmd/consumer_assets/site_images/amd_modules/video2/1/lib/',
				coreConfig = self._config;
				coreConfig.flash.vars.auto_play_override = self._config.autoplay||false;

				//NOTE: this is still temporary, the default plugin and skin url will be hard coded in the wxml file
				while(coreConfig.flash.xml.indexOf('{basePluginUrl}') !== -1) {
					coreConfig.flash.xml = coreConfig.flash.xml.replace('{basePluginUrl}', basePluginUrl);
				}
				while(coreConfig.flash.xml.indexOf('{baseSkinUrl}') !== -1) {
					coreConfig.flash.xml = coreConfig.flash.xml.replace('{baseSkinUrl}', baseSkinUrl);
				}
				coreConfig = $.extend(true, coreConfig, self._config);

			//this part is for testing, it will be removed

		  /* if(window.location.host.indexOf("localhost") <= -1) {
		     coreConfig['flash']['swf'] = imgSvrPath + '/webmd/consumer_assets/site_images/amd_modules/video2/1/lib/AkamaiPremierPlayer.swf';
		     coreConfig['flash']['debug'] = imgSvrPath + '/webmd/consumer_assets/site_images/amd_modules/video2/1/lib/AkamaiPremierPlayer-debug.swf';
		     } */


			if(isFF === true || isIE === true) {
				coreConfig['flash']['params'] = {'wmode': 'transparent'};
			}

			self._v = akamai.amp.AMP.create(self._id, coreConfig, function() {
				if(cb) cb();

				self._cbs.forEach(function(cb){
					cb();
				});

				self._isLoaded = true;
			});
		};

		/**
		*	lets the programmer know when the video is ready to interact with.
		*
		*	@param 	cb 	callback
		*/
		WebmdVideo.prototype.ready = function(cb) {
			console.log(this);
			var self = this;

			if(self._isLoaded) {
				cb();
				return;
			}

			this._cbs.push(cb);
		};

		/**
		*	Pauses the video.
		*
		*/
		WebmdVideo.prototype.pause = function() {
			this._v.pause();
		};

		/**
		*	removes the video from the system and stops all activities related to it.
		*
		*/
		WebmdVideo.prototype.destroy = function() {
			document.getElementById(this._id).innerHTML = "";

			if (this._v != null) {
				this._v.destroy();
			}

			this._v = null;
		};

		/**
		*	Plays the video.
		*
		*/
		WebmdVideo.prototype.play = function() {
			this._v.play();
		};

		/**
		*	restarts the video.
		*
		*/
		WebmdVideo.prototype.replay = function() {
			this._v.replay();
		};

		/**
		*	Sets the video volume to the volume inserted
		*
		*	@param 	v 	float 	the volume the video will be set to, either 1-100 or 0-1.
		*/
		WebmdVideo.prototype.setVolume = function(v) {
			if(v > 1) {
				v = parseFloat(v) / 100;
			}

			this._v.setVolume(v);
		};

		/**
		*	Sets the video time to the time inserted (in seconds).
		*
		*	@param 	t 	int 	the time that the video will be seeked to in seconds.
		*/
		WebmdVideo.prototype.setCurrentTime = function(t) {

			this._v.setCurrentTime(t);

		};

		/**
		*	Used to load dynamic videos on the fly.
		*
		*	@param 	Object 	json	akamai media config override (contains video source and meta data)
		*/
		WebmdVideo.prototype.setMedia = function(json) {
			this._v.setMedia(json);
		};

		/**
		*	Sets the closed captions to on or off depending on the parameter.
		*
		*	@param 	b 	boolean	Determines whether or not the closed captions will be turned on.
		*/
		WebmdVideo.prototype.setClosedCaption = function(b) {
			if(typeof this._v.captioning !== "undefined") {
				this._v.captioning.setHidden(b);
			} else {
				console.log('error', 'The closed captioning feature is disabled, please enable it before turning it on!');
			}
		};

		/**
		*	Turns closed captions on.
		*
		*/
		WebmdVideo.prototype.turnClosedCaptionOn = function() {

			this.setClosedCaption(false);
		};

		/**
		*	Turns closed captions off.
		*
		*/
		WebmdVideo.prototype.turnClosedCaptionOff = function() {
			this.setClosedCaption(true);
		};

		/**
		*	Enters full screen mode.
		*
		*/
		WebmdVideo.prototype.enterFullScreen = function() {

			this._v.enterFullScreen();

		};

		/**
		*	Exits full screen mode.
		*
		*/
		WebmdVideo.prototype.exitFullScreen = function() {

			this._v.exitFullScreen();

		};

		/**
		*	Mutes the video.
		*
		*/
		WebmdVideo.prototype.mute = function() {
			this.setMuted(true);
		};

		/**
		*	Unmutes the video.
		*
		*/
		WebmdVideo.prototype.unmute = function() {
			this.setMuted(false);
		};

		/**
		*	Mutes or unmutes the video depending on the parameter.
		*
		*	@param 	bool 	determines whether the video will be muted or not.
		*/
		WebmdVideo.prototype.setMuted = function(bool) {
			this._v.setMuted(bool);
		};

    /**
     *	Sets the caption language based on the languages assigned in the config.
     *
     *	@param 	string 	lan 	The language that the caption will be set to (ie: en, de, jp)
     *	@param 	boolean 	captionOn 	flag whether to turn on captions as soon as it is set or not
     *
     *	@return 	boolean
     */
    WebmdVideo.prototype.setCaptionLanguage = function(lan, captionOn) {
      var config = this.getConfig();

      if(typeof config.media === "undefined") {
	//TODO throw error
	console.log('error', "There is no media definition in your config");
	return;
      }

			if(typeof config.media.track === "undefined") {
				//TODO throw error
				console.log('error', "There is no track definition in your media config");
				return;
			}

			for(var i in config.media.track) {
				if(typeof config.media.track[i] !== "undefined" && config.media.track[i].srclang == lan) {
					this._v.captioning.selectTrackByLanguage(lan);

					if(captionOn) {
						this.turnClosedCaptionOn();
					}

					return true;
				}
			}

			//TODO throw error
			console.log('error', "Could not find the language " + lan + " in your media track definition");
			return false;
		};

		/**
		*	Ends the video.
		*
		*/
		WebmdVideo.prototype.end = function() {

			this._v.end();

		};

		/**
		*	Returns a boolean of the state of the captions (on or off).
		*
		*	@return	bool 	whether or the not the captioning is on or off.
		*/
		WebmdVideo.prototype.getClosedCaption = function() {
			return this._v !== null ? !this._v.captioning.getHidden() : null;
		};

		/**
		*	returns the current volume of the video playing.
		*
		*	@return	float 	the current volume of the video as a decimal from 0 to 1.
		*/
		WebmdVideo.prototype.getVolume = function() {
			return this._v !== null ? this._v.getVolume() : 0;
		};

		/**
		*	return shte current time the video is playing at.
		*
		*	@return	int 	the current time the video is playing at in seconds.
		*/
		WebmdVideo.prototype.getCurrentTime = function() {
			/*
			if(this.isMobile()) {
				try {
					return document.getElementById(this._id).getElementsByTagName('video')[0].currentTime;
				} catch (e) {
					return 0;
				}

			}
			*/
			return this._v !== null ? this._v.getCurrentTime() : 0;
		};

		/**
		*	returns the duration of the current video
		*
		*	@return	int 	duration of the video
		*/
		WebmdVideo.prototype.getDuration = function() {
			/*
			if(this.isMobile()) {
				try {
					return document.getElementById(this._id).getElementsByTagName('video')[0].duration;
				} catch (e) {
					return 0;
				}
			}
			*/
			return this._v !== null ? this._v.getDuration() : 0;
		};

		/**
		*	returns the current video media information (source and meta data).
		*
		*	@return	Object 	Akamai media object (has video sources as well as meta data)
		*/
		WebmdVideo.prototype.getMedia = function() {
			return this._v !== null ? this._v.getMedia() : 0;
		};

		/**
		*	returns the user defined config data
		*
		*	@return 	Object 	The user defined configuration
		*/
		WebmdVideo.prototype.getConfig = function() {
			return this._config;
		};

		/**
		*	Returns the id of the video.
		*
		*	@param 	cb 	callback {before|after}
		*/
		WebmdVideo.prototype.getId = function() {
			return this._id;
		};

		/**
		*	Returns whether the browser is mobile/tablet or desktop
		*
		*	@return 	boolean 	Whether or not the browser is mobile/tablet.
		*/
		WebmdVideo.prototype.isMobile = function() {
			//this line did not work for iPad and the chrome simulation mode
			//return window.matchMedia("only screen and (max-width: 760px)").matches||false;

			return /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);
		};

		/**
		*	Returns whether the browser is an ipad
		*
		*	@return 	boolean 	Whether or not the browser is an ipad.
		*/
		WebmdVideo.prototype.isIpad = function() {
			return /iPad/i.test(navigator.userAgent);
		};

		/**
		 *	Returns whether the browser is a smart phone
		 *
		 *	@return 	boolean 	Whether or not the browser is a smart phone.
		 */
		WebmdVideo.prototype.isSmartPhone = function() {
			/*
			 detection just for phones (excluding tablets).  The following logic is based on the following:
			 (1) http://googlewebmastercentral.blogspot.com/2011/03/mo-better-to-also-detect-mobile-user.html
			 (2) wku's tests with real devices:  (a) both iphone and ipad contains the word 'Mobile' (b) android tablet does not contain the word 'Mobile'
			 */

			var userAgentStr = navigator.userAgent,
				isAndroidPhone, isOtherPhones;

			isAndroidPhone = userAgentStr.indexOf('Android') > -1 && userAgentStr.indexOf('Mobile') > -1;
			isOtherPhones =  /iPhone|iPod|BlackBerry|IEMobile/i.test(userAgentStr);

			return (isAndroidPhone === true || isOtherPhones === true );
		};

		WebmdVideo.prototype.isAutoplay = function() {
			if(this.getConfig().autoplay || this.getConfig().media.autoplay) {
				return true;
			}

			return false;
		};

		WebmdVideo.prototype.getTitle = function() {
			return this.getConfig().title||null;
		};

		/**
		*	Creates a listener for the akamai video events
		*
		*	@param 	e 	string 	the name of the event
		*	@param 	f 	function 	the callback that will be run when the event is invoked.
		*
		*/
		WebmdVideo.prototype.addEventListener = function(e, f) {
			var self = this,
				$v = $(self._v),
				eventName = e.toString().split('.')[0];


			if(this.isMobile()) {
				/*
				$v = $(document.getElementById(self._id).getElementsByTagName('video')[0]);

				if($v.length < 1) {

					setTimeout(function(){
						self.addEventListener(e,f);
					}, 100);

					return;
				}
				*/
			}


			if(typeof this.setEvents[eventName] === "undefined") {
				this.setEvents[eventName] = true;

				switch(eventName) {
					case 'volumechange':
					case 'mute':
					case 'unmute':
						$v.on('volumechange', function(e) {
							if(typeof e.detail === "undefined" && typeof e.originalEvent.detail !== "undefined") {
								e.detail = e.originalEvent.detail;
							}
							$(document.getElementById(self._id)).trigger('volumechange', {detail :e});
						});

						this.setEvents['volumechange'] = true;
						this.setEvents['mute'] = true;
						this.setEvents['unmute'] = true;

						break;

					case 'play':
						if(self.isMobile()) {
							$v.on('playing', function(e){
								var $video;
								$(document.getElementById(self._id)).trigger('play', {detail :e});
								if(self.adPlaying) {
									$(document.getElementById(self._id)).trigger('ad-play', {detail :e});
								}
							});
						} else {
							$v.on('playing', function(e){
								var $video;
								$(document.getElementById(self._id)).trigger('play', {detail :e});

								if(self.adPlaying) {
									$(document.getElementById(self._id)).trigger('ad-play', {detail :e});
								}
							});
						}
						break;

					case 'pause':
						if(self.isMobile()) {
							$v.on('pause', function(e){
								VideoActions.pause();
								if(self.adPlaying) {
									$(document.getElementById(self._id)).trigger('ad-pause', {detail :e});
								}
							});
						} else {
							$v.on('pause', function(e) {
								VideoActions.pause();
								if(self.adPlaying) {
									$(document.getElementById(self._id)).trigger('ad-pause', {detail :e});
								}
							});
						}
						break;

					case 'ended':
						$v.on('ended', function(e) {
							$(document.getElementById(self._id)).trigger('ended', {detail :e});

							/*
							the next line is the workaround provided by Hudi in his email dated 3/26/2015 7:37pm titled: 'Re: [Amp-premier-impl] Akamai/WebMD Weekly Status'
							the reason we need it is that, recent workaround for autoplay stopped the replay method from functioning when the autoplay is set to false.
							 */
							self._v.setAutoplay(true);
						});
						break;

					case 'visibilitychange':
					case 'closedcaption-off':
					case 'closedcaption-on':
						if(typeof self._v.captioning !== "undefined") {
							$(self._v.captioning).on('visibilitychange', function(e){
								$(document.getElementById(self._id)).trigger('visibilitychange', {detail :e});

								if(!e.originalEvent.detail) {
									$(document.getElementById(self._id)).trigger('closedcaption-off', {detail :e});
								} else {
									$(document.getElementById(self._id)).trigger('closedcaption-on', {detail :e});
								}
							});
						}

						this.setEvents['visibilitychange'] = true;
						this.setEvents['closedcaption-off'] = true;
						this.setEvents['closedcaption-on'] = true;

						break;

					case 'ad-started':
						self.ready(function() {
							if(typeof self._v.ads !== "undefined") {
								$(self._v.ads).on('started', function(e){
									var $video;

									if(self.isMobile()) {
										$video = $(document.getElementById(self._id)).find('video');

										if($video.length > 0) {
											$video.get(0).controls = false;
										}
									}
									self.adPlaying = true;
									$(document.getElementById(self._id)).trigger('ad-started', {detail :e});
								});
							}
						});
						break;

					case 'ad-ended':
						self.ready(function() {
							if(typeof self._v.ads !== "undefined") {
								$(self._v.ads).on('breakend', function(e){
									var $video;

									if(self.isMobile()) {
										$video = $(document.getElementById(self._id)).find('video');

										if($video.length > 0) {
											$video.get(0).controls = true;
										}
									}
									self.adPlaying = false;
									$(document.getElementById(self._id)).trigger('ad-ended', {detail :e});
								});
							}
						});
						break;

					case 'ad-error':
						self.ready(function(){
							if(typeof self._v.ads !== "undefined") {
								$(self._v.ads).on('error', function(e){
									$(document.getElementById(self._id)).trigger('ad-error', {detail :e});
								});
							}
						});
						break;

					case 'companion':
						self.ready(function() {
							if(typeof self._v.ads !== "undefined") {
								$(self._v.ads).on('companion', function(e){
									$(document.getElementById(self._id)).trigger('ad-companion', {detail :e});
								});
							}
						});
						break;

					case 'offline':
						$(window).on('offline', function(e){
							$(document.getElementById(self._id)).trigger('offline', {detail : e});
						});
						break;

					default:
						$v.on(eventName, function(e) {
							$(document.getElementById(self._id)).trigger(eventName, {detail :e});
						});
						break;

				}
			}

			$(document.getElementById(this._id)).on(e, f);
		};

		/**
		*	Triggers an event for the akamai video events
		*
		*	@param 	e 	string 	the name of the event
		*
		*/
		WebmdVideo.prototype.triggerEvent = function(e) {
			$(document.getElementById(this._id)).trigger(e);
		};

		/**
		*	Removes a listener for the akamai video events
		*
		*	@param 	e 	string 	the name of the event
		*
		*/
		WebmdVideo.prototype.removeEventListener = function(e) {
			$(document.getElementById(this._id)).off(e);
		};

		return WebmdVideo;

	}
);
