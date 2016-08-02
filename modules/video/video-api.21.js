define(
  //['./lib/amp_debug'],
  ['script-loader!amp'],
  function(AkamaiCore) {
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

      this._config = $.extend({
	autoplay: false,
	media: {
	  autoplay: false
	},
	controls: {
	  mode: isMobile ? "auto" : "none",
	  native: isMobile ? true : false
	},
	captioning: {
	  enabled: true
	},
	mode: 'auto'
      }, config);

      /*
	 this._config.mode = "auto";

	 this._config.media.source = [
	 { "src": "http://webmd-a.akamaihd.net/webmd-test/delivery/7b/00/7b00ace6-04ae-4048-93c2-9e219ae8dff1/120689-Module%204-1.18.13_1000k.mp4",  "type": "video\/mp4"}
	 ];
	 /*
	 this._config.media.track = [
	 {
	 kind : "captions",
	 type : "application/ttml+xml",
	 srclang : "en",
	 src : "http://projects.mediadev.edgesuite.net/customers/akamai/mdt-html5-core/webmd/0.20.0.0001/samples/captioning.xml"
	 }
	 ];

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

      this.init(cb);

      function _setEvents() {

	$(self._v).on('volumechange', function(e){
	  if(typeof e.detail === "undefined" && typeof e.originalEvent.detail !== "undefined") {
	    e.detail = e.originalEvent.detail;
	  }

	  $(document.getElementById(self._id)).trigger('volumechange', {detail :e});

	  if(e.detail && e.detail.currentVolume <= 0) {
	    $(document.getElementById(self._id)).trigger('mute', {detail : e});
	    self._isMuted = true;
	  } else if(self._isMuted === true && e.detail && e.detail.currentVolume > 0) {
	    $(document.getElementById(self._id)).trigger('unmute', {detail :e});
	    self._isMuted = false;
	  }
	});

	$(self._v).on('play', function(e){
	  $(document.getElementById(self._id)).trigger('play', {detail :e});

	  if(self.adPlaying) {
	    $(document.getElementById(self._id)).trigger('ad-play', {detail :e});
	  }
	});

	$(self._v).on('pause', function(e){
	  $(document.getElementById(self._id)).trigger('pause', {detail :e});

	  if(self.adPlaying) {
	    $(document.getElementById(self._id)).trigger('ad-pause', {detail :e});
	  }
	});

	$(self._v).on('progress', function(e) {
	  $(document.getElementById(self._id)).trigger('progress', {detail :e});
	});

	$(self._v).on('loadstart', function(e) {
	  $(document.getElementById(self._id)).trigger('loadstart', {detail :e});
	});

	$(self._v).on('canplay', function(e) {
	  $(document.getElementById(self._id)).trigger('canplay', {detail :e});
	});

	$(self._v).on('timeupdate', function(e){
	  $(document.getElementById(self._id)).trigger('timeupdate', {detail :e});
	});

	$(self._v).on('ready', function(e) {
	  $(document.getElementById(self._id)).trigger('ready', {detail :e});
	});

	$(self._v).on('seeking', function(e) {
	  $(document.getElementById(self._id)).trigger('seeking', {detail :e});
	});

	$(self._v).on('seeked', function(e) {
	  $(document.getElementById(self._id)).trigger('seeked', {detail :e});
	});

	$(self._v).on('ended', function(e) {
	  $(document.getElementById(self._id)).trigger('ended', {detail :e});

	  /*
	     the next line is the workaround provided by Hudi in his email dated 3/26/2015 7:37pm titled: 'Re: [Amp-premier-impl] Akamai/WebMD Weekly Status'
	     the reason we need it is that, recent workaround for autoplay stopped the replay method from functioning when the autoplay is set to false.
	   */
	  self._v.setAutoplay(true);
	});

	$(self._v).on('share', function(e) {
	  $(document.getElementById(self._id)).trigger('share', {detail :e});
	});

	$(self._v).on('waiting', function(e) {
	  $(document.getElementById(self._id)).trigger('waiting', {detail :e});
	});

	$(self._v).on('playing', function(e) {
	  $(document.getElementById(self._id)).trigger('playing', {detail :e});
	});

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

	self.ready(function() {

	  if(typeof self._v.ads !== "undefined") {
	    $(self._v.ads).on('started', function(e){
	      self.adPlaying = true;
	      $(document.getElementById(self._id)).trigger('ad-started', {detail :e});
	      //$('#' + self.getId()).siblings('.akamai-ads').css({'z-index' : '1', position : 'absolute'});
	    });

	    $(self._v.ads).on('breakend', function(e){
	      self.adPlaying = false;
	      $(document.getElementById(self._id)).trigger('ad-ended', {detail :e});
	      //$('#' + self.getId()).siblings('.akamai-ads').css({'z-index' : '0'});
	    });

	    $(self._v.ads).on('companion', function(e){
	      $(document.getElementById(self._id)).trigger('ad-companion', {detail :e});
	    });

	  }
	});
      }
      _setEvents();
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
	  coreConfig = {"resources":[],
			"params":{},
			"fullscreen":{"enabled":true,"native":true},
			"branding" : {
			  "id" : "logo",
			  "logo" : "http://nkalaiya.mediadev.edgesuite.net/webmd_overlay.png"
			},
			"controls":{"mode":"auto"},
			"playoverlay":{"enabled" : true},
			"feed": {},
			"flash":{"swf":"/amp/AkamaiPremierPlayer.swf",
				 "debug":"/amp/AkamaiPremierPlayer-debug.swf",
				 "vars":{"core_ads_enabled":true, "auto_play_override" : self._config.autoplay||false},
				 "xml":'<application><player core_player_name="amp-premier-player" volume=".75"\
							mbr_starting_index="1"\
							inpage_bitrate_index_limit="2"\
							use_last_known_bitrate="false"\
							use_netsession_client="false"\
							netsession_install_prompt_frequency_secs="-1"\
							ad_server_timeout="20"\
							ad_control_enabled="true"\
							dvr_enabled="1"\
							branding_preload="none"\
							hds_live_low_latency="true"\
							fullscreen_enabled="true" show_feature_bar="false" suppress_events="mediaPlayerViewInitialized"\
							caption_language="en-us"\
							hds_fragment_retry_data_gap_threshold= "20"\
							auto_replay="false">' +
				       '</player>\
								<plugins>\
								<plugin host="osmf" type="dynamic" absolute="true" id="AkamaiAdvancedStreamingPlugin">\
									http://players.edgesuite.net/flash/plugins/osmf/advanced-streaming-plugin/v3.6/osmf2.0/AkamaiAdvancedStreamingPlugin.swf\
								</plugin>\
								<plugin host="osmf" type="dynamic" id="CaptioningPlugin">\
									' + basePluginUrl + 'CaptioningPlugin.swf\
								</plugin>\
								<plugin host="osmf" type="dynamic" id="onCaptionInfoPlugin">\
									' + basePluginUrl + 'onCaptionInfoPlugin.swf\
								</plugin>\
								<plugin host="osmf" type="static" id="OSMFCSMALoader">\
									com.akamai.playeranalytics.osmf.OSMFCSMALoaderInfo\
								</plugin>\
								<plugin host="akamai" type="dynamic" blocking="false" id="NielsenSDKPlugin">\
									' + basePluginUrl + 'NielsenSDKPlugin.swf\
								</plugin>\
								<plugin host="akamai" type="dynamic" blocking="false" id="ComscoreStreamSensePlugin">\
									' + basePluginUrl + 'ComscoreStreamSensePlugin.swf\
								</plugin>\
							</plugins>\
							<view skin="' + baseSkinUrl + 'webmd.assets.swf">\
								<element id="logoOverlay" style="height: 45px; width: 150px; right: 15px; bottom: 15px; opacity: 1.0;"/>\
								<!--element id="adOptions" style="backgroundColor:' +  "'rgba(0, 0, 0, 1)'" + '" >\
								<element id="adChoices" target="http://www.akamai.com/" />\
								<element id="adCountdown" />\
								<element id="adCount" />\
								</element>\
								<element id="recommendationSlate" viewMode="grid" items="6" />\
								<element id="captionDisplay" initState="off" position="relative" style="width: 90%; bottom: 0px; windowColor:0x000000; windowOpacity:0; font:Virdana; fontColor:0xffffff; fontOpacity:1; fontBGColor:0x000000; fontBGOpacity:0; edgeType:none; edgeColor:0x000000; edgeOpacity:1; scroll:popOut; fontSize:7; fontWeight:normal;" settingsEnabled="true" />\
								<element id="controls" height="28" scrubPosition="inline" itemMargin="5" />\
								<element id="replayBtn" />\
								<element id="playPauseBtn" />\
								<element id="rewindBtn" />\
								<element id="scrubBar" style="height: 18px;" />\
								<element id="progressBar" style="background: linear-gradient(90deg, #FF0000, #1B1B1B);" />\
								<element id="loadedBar" style="background: linear-gradient(90deg, #00FF00, #1B1B1B);" />\
								<element id="liveIndicator" />\
								<element id="streamTimeIndicator" exclude="live" />\
								<element id="streamTime" />\
								<element id="streamDuration" />\
								<element id="playlistBtn" />\
								<element id="timeLocationIndicator" type="arrow" color="#FFFFFF" />\
								<element id="goLiveBtn" />\
								<element id="shareBtn" />\
								<element id="captionBtn" />\
								<element id="statsBtn" />\
								<element id="hdClientBtn" />\
								<element id="chromecastBtn"/>\
								<element id="volumeBar" color="#CA2127" />\
								<element id="volumeBtn" />\
								<element id="fullscreenBtn" />\
								<element id="bufferingView" mode="default" tether="true" style="fontSize:30px;" />\
								<element id="endSlate" enabled="false" hideElements="brandingLogo|viewAll"/-->\
							</view>\
							</application>'
			},
			"mediaanalytics":{"resources":[{"type":"text/javascript","src":"http://79423.analytics.edgesuite.net/html5/akamaihtml5-min.js"}],
					  "plugin":{"swf":"http://79423.analytics.edgesuite.net/csma/plugin/csma.swf"},
					  "config":"http://ma1-r.analytics.edgesuite.net/config/beacon-3018.xml?setVideoObject=1",
					  "dimensions":{"title":"#{media.title}","playerId":"#{player.mode} Player"}
			},
			"locales":{"en":{"MSG_EMAIL_TO":"To","MSG_EMAIL_FROM":"From","MSG_EMAIL_VIDEO":"Email this video","MSG_EMAIL_MESSAGE_DEFAULT":"Check out this video from xxx","MSG_EMAIL_MESSAGE":"Message","MSG_EMAIL_ADDRESS_INVALID":"Invalid Email Address","MSG_EMAIL_MESSAGE_INVALID":"Please limit your message to 500 characters or less.","MSG_EMAIL_CHARACTERS_REMAINING_TEXT":" characters left","MSG_EMAIL_SEND_FAILURE":"Message could not be sent.","MSG_EMAIL_SEND_SUCCESS_MESSAGE":"Your email has been sent!","MSG_SHARE_VIDEO_TEXT":"Share this video...","MSG_POST_TEXT":"Post","MSG_EMBED_TEXT":"Embed","MSG_LINK_TEXT":"Link","MSG_SHARE_CONNECT_FAILURE":"Unable to connect. Please try again.","MSG_SHARE_CONTENT_DISABLED":"Share and embed are disabled.","MSG_VERSION_TEXT":"Version","MSG_BUFFERING_TEXT":"Loading...","MSG_CUSTOMIZE_CLIP_POINTS":"Customize the start and end point of the video.","MSG_PAUSE":"Pause","MSG_PREVIEW":"Preview","MSG_CURRENT":"Currrent","MSG_SEEK_TO":"Seek to","MSG_LIVE":"LIVE","MSG_DEFAULT_ERROR_MESSAGE":"Sorry, we were unable to play the media you selected. Please try again, or select alternate media.","MSG_ERROR_PREFIX":"Error encountered:","MSG_STREAM_NOT_FOUND":"Stream not found","MSG_CURRENT_WORKING_BANDWIDTH":"Current working bandwidth","MSG_CURRENT_BITRATE_PLAYING":"Current bitrate playing","MSG_MAX_BITRATE_AVAILABLE":"Max bitrate available","MSG_NOT_AVAILABLE":"Not Available","MSG_GO_LIVE":"GO LIVE","MSG_REPLAY":"Replay","MSG_NEXT_VIDEO":"Next video starts in: ","MSG_RECOMMENDED":"Recommended","MSG_VIEW_ALL":"View all ","MSG_VIDEO":" videos","MSG_CC":"CC","MSG_CC_TITLE":"Captions","MSG_CC_LANGUAGE":"Track :","MSG_CC_PRESETS":"Presets :","MSG_CC_FONT":"Font :","MSG_CC_EDGE":"Edge :","MSG_CC_SIZE":"Size :","MSG_CC_SCROLL":"Scroll :","MSG_CC_COLOR":"Color :","MSG_CC_BACKGROUND":"Background :","MSG_CC_WINDOW":"Window :","MSG_CC_OPACITY":"Opacity :","MSG_CC_SHOW_ADVANCED":"Show Advanced Settings","MSG_CC_HIDE_ADVANCED":"Hide Advanced Settings","MSG_CC_RESET":"Default","MSG_CC_CANCEL":"Cancel","MSG_CC_APPLY":"Apply","MSG_EN":"English","MSG_ES":"Spanish","MSG_DE":"German","MSG_FR":"French","MSG_IT":"Italian","MSG_RU":"Russian","MSG_CHROMECAST_MESSAGE":"Video playing on another screen","MSG_RECOMMENDATIONS_TITLE":"Recommended"},"es":{"MSG_EMAIL_TO":"a","MSG_EMAIL_FROM":"de","MSG_EMAIL_VIDEO":"Enviar este vídeo","MSG_EMAIL_MESSAGE_DEFAULT":"Echa un vistazo a este video de xxx","MSG_EMAIL_MESSAGE":"mensaje","MSG_EMAIL_ADDRESS_INVALID":"Dirección de correo electrónico no válida","MSG_EMAIL_MESSAGE_INVALID":"Por favor limite su mensaje a 500 caracteres o menos.","MSG_EMAIL_CHARACTERS_REMAINING_TEXT":"personajes de la izquierda","MSG_EMAIL_SEND_FAILURE":"El mensaje no pudo ser enviado.","MSG_EMAIL_SEND_SUCCESS_MESSAGE":"Tu email ha sido enviado!","MSG_SHARE_VIDEO_TEXT":"Comparte este vídeo...","MSG_POST_TEXT":"enviar","MSG_EMBED_TEXT":"incrustar","MSG_LINK_TEXT":"enlace","MSG_SHARE_CONNECT_FAILURE":"No se puede conectar. Por favor, inténtelo de nuevo.","MSG_SHARE_CONTENT_DISABLED":"Compartir e incrustar están desactivados.","MSG_VERSION_TEXT":"versión","MSG_BUFFERING_TEXT":"el almacenamiento en búfer","MSG_CUSTOMIZE_CLIP_POINTS":"Personalizar el inicio y el punto final del video.","MSG_PAUSE":"romper","MSG_PREVIEW":"vista previa","MSG_CURRENT":"corriente","MSG_SEEK_TO":"Tratar de","MSG_LIVE":"EN VIVO","MSG_DEFAULT_ERROR_MESSAGE":"Lo sentimos, no hemos podido jugar los medios de comunicación seleccionados. Por favor, inténtelo de nuevo, o seleccionar los medios de comunicación alternativos.","MSG_ERROR_PREFIX":"Se produjo un error:","MSG_STREAM_NOT_FOUND":"Stream que no se encuentra","MSG_CURRENT_WORKING_BANDWIDTH":"Ancho de banda actual de trabajo","MSG_CURRENT_BITRATE_PLAYING":"Tasa de bits de reproducción actual","MSG_MAX_BITRATE_AVAILABLE":"Tasa de bits máxima disponible","MSG_NOT_AVAILABLE":"No está disponible","MSG_GO_LIVE":"IR A VIVIR","MSG_REPLAY":"Repetir","MSG_NEXT_VIDEO":"El próximo video comienza en: ","MSG_RECOMMENDED":"Recomendado","MSG_VIEW_ALL":"Ver todos ","MSG_VIDEO":" vídeos","MSG_CC":"CC","MSG_EN":"Inglés","MSG_ES":"Español","MSG_DE":"Alemán","MSG_FR":"Francés","MSG_IT":"Italiano","MSG_RU":"Ruso","MSG_CHROMECAST_MESSAGE":"Video playing on another screen","MSG_RECOMMENDATIONS_TITLE":"Recomendado"}}};

      coreConfig = $.extend(true, coreConfig, self._config);

      //this part is for testing, it will be removed
      if(window.location.host.indexOf("localhost") <= -1) {
	// coreConfig['flash']['swf'] = imgSvrPath + '/webmd/consumer_assets/site_images/amd_modules/video2/1/lib/AkamaiPremierPlayer.swf';
	// coreConfig['flash']['debug'] = imgSvrPath + '/webmd/consumer_assets/site_images/amd_modules/video2/1/lib/AkamaiPremierPlayer-debug.swf';
      }

      if(isFF === true || isIE === true) {
	coreConfig['flash']['params'] = {'wmode': 'transparent'};
      }

      self._v = akamai.amp.AMP.create(self._id, coreConfig, function() {
	//createControlBar(self);
	if(cb) cb();

	self._cbs.forEach(function(cb){
	  cb();
	});

	self._isLoaded = true;

	/*
	   this is a workaround for ipad issues, will be removed once akamai fixes
	   $('#' + self.getId() + ' .akamai-ads').prependTo($('#' + self.getId()).parent());
	   if(self.isMobile()) {
	   setTimeout(function() {
	   $('#' + self.getId()).click();
	   self.pause();
	   }, 1);
	   }
	 */
      });
    };

    /**
     *	lets the programmer know when the video is ready to interact with.
     *
     *	@param 	cb 	callback
     */
    WebmdVideo.prototype.ready = function(cb){
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
      /*
	 var $p = $('#' + this.getId()).parent(),
	 self = this;

	 /*
	 ipad issues workaround. will be removed once akamai fixes
	 if($p.children('.akamai-caption-text').length < 1) {
	 setTimeout(function() {
	 var $caption = $p.find('.akamai-caption-text');
	 $($caption[$caption.length - 1]).prependTo($p);

	 $p.children('.akamai-caption-text').css({
	 position: 'relative',
	 width : '100%',
	 'background-color': 'rgba(0,0,0,0.5)',
	 opacity : '1',
	 visibility : 'visible',
	 display: 'block',
	 float: 'left',
	 top : ($('#' + self.getId() + ' video').height() - 45) + "px",
	 'z-index' : '99999'
	 });
	 }, 500);
	 }
       */
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
      return this._v !== null ? this._v.getCurrentTime() : 0;
    };

    /**
     *	returns the duration of the current video
     *
     *	@return	int 	duration of the video
     */
    WebmdVideo.prototype.getDuration = function() {
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
