/**
 *  this returns a class definition, not an object instance. so 'new' keyword must be used to instantiate it.
 */
define(['video/video-ui-utils', '_'], function(Utils, _) {
  var Metrics = function() {

    return {
      isProfessional: false,
      percentageInterval: null,
      percentages: [25, 50, 75],
      videoStarted: false,
      videoApi: null,
      moduleId: "default",
      playerName: "",
      utils: null,
      ended: false,
      PlayerDelegateInstance: null,
      isPlaying: false, //workaround for akamai bug. If video is seeked while paused, the pause event gets called again.
      adStarted: false,
      friendlyName: ((typeof s_assetname !== 'undefined') ? s_assetname : null),
      ad: {
        duration: 0,
        startTime: 0,
        endTime: 0
      },

      init: function(videoApi) {
        var self = this;
				if(typeof this.random === 'undefined') {
					this.random = Math.random();
					// console.log(this.random);
				}


        this.videoApi = videoApi;
        if (typeof s_vid_mid !== "undefined" && s_vid_mid != "") {
          this.setModuleId(s_vid_mid);
        }

        if (typeof s_player_name !== "undefined") {
          this.setPlayerName(s_player_name);
        }

        if (typeof s_md !== "undefined" && typeof s_pageview_id !== "undefined") {
          s_md.prop24 = s_pageview_id || "";

          if (!s_md.linkTrackVars.match('prop24')) {
            s_md.linkTrackVars += ',prop24';
          }
        }
        this.utils = new Utils();
        this.utils.init($(videoApi.getId()));

        window._webmdfullScreenTarget = null;

        this.setEvents();
      },

      setEvents: function() {
        var self = this,
          fullScreenApiSet;

        this.addEventListener('play', function(e) {
          if (self.videoApi.isAutoplay() && !self.videoStarted && !self.ended) {
            // this means the video started playing on its own and was not the result of a user click
            if (self.videoApi.isMobile()) {
              self.clickMetrics('play');
            }
          } else {
            if (!self.videoStarted && self.ended) {
              self.metrics(null, '-rep', {
                prop24: s_pageview_id || ""
              });
            } else {
              self.clickMetrics('play');
            }
          }

          if (!self.videoStarted) {
            self.durationMetrics(0);
            self.percentagePlayedMetrics();
            //heartbeat start
            //self.heartbeat();
          }

          self.videoStarted = true;
          self.isPlaying = true;
        });

        this.addEventListener('pause', function() {
          if (self.isPlaying) {
            if (self.videoApi && Math.abs(self.videoApi.getCurrentTime() - self.videoApi.getDuration()) > 1) {
              self.clickMetrics('pause');
            }
            self.isPlaying = false;
          }
        });

        this.addEventListener('ended', function() {
          self.durationMetrics('100');
          self.percentages = [25, 50, 75];
          self.videoStarted = false;
          self.ended = true;
        });

        this.addEventListener('mute', function(e) {
          self.clickMetrics('mute');
        });

        this.addEventListener('unmute', function(e) {
          self.clickMetrics('unmute');
        });

        this.addEventListener('ad-started', function(e, event) {
          $('.vjs-archive').css({
            opacity: '0.0'
          });
        });

        this.addEventListener('ad-ended', function(e, event) {
          $('.vjs-archive').css({
            opacity: '1.0'
          });
        });

        $('.tab-about').click(function() {
          if ($(this).hasClass('vjs-selected')) {
            self.clickMetrics('abtcl');
          } else {
            self.clickMetrics('about');
          }
        });

        $('.vjs-favorites-control').click(function() {
          self.clickMetrics('save');
        });

        fullScreenApiSet = this.utils.getSupportedFullscreenApi();

        if (fullScreenApiSet) {
          $(document).on(fullScreenApiSet['eventName'] + '.' + this.videoApi.getId(), function(e) {

            if (window._webmdfullScreenTarget !== null && window._webmdfullScreenTarget.innerHTML == e.target.innerHTML) {
              return;
            }

            self.fullscreenMetrics(e);
            window._webmdfullScreenTarget = e.target;


            setTimeout(function() {
              window._webmdfullScreenTarget = null;
            }, 100);
          });
        }
      },

      percentagePlayedMetrics: function() {
        var self = this;

        self.videoApi.ready(function() {
          self.percentageInterval = setInterval(function() {
            var currentTime = new Date(self.videoApi.getCurrentTime() * 1000),
              totalTime = new Date(self.videoApi.getDuration() * 1000),
              pctResult = Math.floor(currentTime / totalTime * 100),
              deletions = [],
              exists = false;

            for (var i in self.percentages) {
              exists = true;

              if (self.percentages[i] < pctResult) {
                self.durationMetrics(self.percentages[i]);
                deletions.push(i);
              }
            }

            for (var i in deletions) {
              delete self.percentages[deletions[i]];
            }

            //can't use .length because a js bug will show 3 even though the actual number is 0, this is a workaround
            if (!exists) {
              clearInterval(self.percentageInterval);
            }

          }, 100);
        });
      },

      setModuleId: function(moduleId) {
        this.moduleId = moduleId;
      },

      setPlayerName: function(playerName) {
        this.playerName = playerName;
      },

      setFriendlyName: function(friendlyname) {
        this.friendlyName = friendlyname;
      },

      getModuleId: function() {
        return this.moduleId;
      },

      getPlayerName: function() {
        return this.playerName || 'default';
      },

      getFriendlyName: function() {
        return this.friendlyName;
      },

      fullscreenMetrics: function(e) {
        var m = "";

        if (this.utils.isFullscreenmode()) {
          m = "bigr";
        } else {
          m = "smalr";
        }

        this.clickMetrics(m);
      },

      clickMetrics: function(modulename) {
        var name = "";

        name = '-ctl_' + modulename;

        if(typeof s_pageview_id !== "undefined"){
          this.metrics(null, name, {
            prop24: s_pageview_id || ""
          });
        }
      },

      durationMetrics: function(modulename) {
        var name = "";

        if (modulename == "0") {
          name = "_start";
        } else {
          name = "_" + modulename + 'pct';
        }

        //prop9 must also be set for the beginning and end of video
        if(typeof s_pageview_id !== "undefined"){
          switch (modulename.toString()) {
            case '0':
              //s_sponsor_program
              this.metrics(null, name, {
                prop9: "allvideo_start",
                prop24: s_pageview_id || ""
              });
              break;
            case '100':
              this.metrics(null, name, {
                prop9: 'allvideo_100pct',
                prop24: s_pageview_id || ""
              });
              break;
            default:
              this.metrics(null, name, {
                prop24: s_pageview_id || ""
              });
              break;
          }
        }
      },

      metrics: function(pagename, modulename, obj) {
        //ie: vidsite_start (when happens automatically)
        //ie: vidsite-ctl_play (when a user actually plays)
        if (typeof webmd !== "undefined" && typeof s_gi !== "undefined") {
          //webmd.metrics.dpv({moduleName : 'vid' + this.getModuleId() + modulename});
          if (obj) {
            this.wmdPageLink('vid' + this.getModuleId() + modulename, obj);
          } else {
            this.wmdPageLink('vid' + this.getModuleId() + modulename);
          }
        } else {
          if (obj) {
            console.log(obj);
          }
        }
      },

      addEventListener: function(e, f) {
        this.videoApi.addEventListener(e, f);
      },

      removeEventListener: function(e) {
        this.videoApi.removeEventListener(e);
      },

      addCustomMetric: function(f) {

        f.call(this, this.metrics);
      },

      heartbeat: function() {
        if (typeof ADB === "undefined") {
          return;
        }
        /* Configuration Properties - Mandatory Properties Listed as Strings/Numbers, Optional Parameters null (null Parameters Ignored Upon Instantiation)
           Every parameter such as 'playhead' needs to return accurate information at any given time. */
        var self = this,
          chapters = null,
          chapterInterval = null,
          chapterIntervalFunction,
          currentChapter = null,
          videoApi = function() {
            return self.videoApi;
          },
          hbOption = {
            "videoInfo": {
              "id": "hb-" + self.videoApi.getId(),
              "playerName": self.getPlayerName(),
              "length": function() {
                return (self.videoApi.getDuration());
              },
              "streamType": "vod",
              "playhead": function() {
                return (self.videoApi.getCurrentTime());
              },
              /* Optional Parameters Below */
              "name": self.getFriendlyName()
            },
            "enableChapterTrack": false,
            "chapterInfo": {
              "length": 0,
              "position": 0,
              "startTime": 0,
              /* Optional Parameters Below */
              "name": null // "hb-" + self.videoApi.getId() + '-' + self.getChapterName()
            },
            "enableAdTrack": false,
            "adInfo": {
              "id": "",
              "length": 0,
              "position": 0,
              /* Optional Parameters Below */
              "name": null,
              "cpm": null
            },
            "heartbeatConfig": {
              /* Optional Parameters Below */
              "debugLogging": false, // Enable Heartbeat Console Logging Debug Mode
              "quietMode": false, // No Network Calls Sent When True
              "channel": null,
              "ovp": null,
              "sdk": null
            }
          };

        if (typeof this.videoApi.getConfig().webmd !== "undefined" && typeof this.videoApi.getConfig().webmd.chapterData !== "undefined" && this.videoApi.getConfig().webmd.chapterData.length > 0) {
          chapters = this.videoApi.getConfig().webmd.chapterData;
          hbOption.enableChapterTrack = true;
          hbOption.chapterInfo = {
            length: function() {
              return (self.videoApi.getCurrentTime());
            },
            startTime: function() {
              if (currentChapter !== null) {
                return chapters[currentChapter].startSeconds;
              }
            },
            position: function() {
              return currentChapter;
            },
            name: function() {
              return "hb-" + self.videoApi.getId() + '-chapter' + currentChapter;
            }
          };

        }

        var wmdHeartbeat = function(options) {
          var self = this; // Copy Scope for Bindings

          /* Main Heartbeat Instantiation */

          var PlayerDelegateInstance = new ADB.va.PlayerDelegate; // ADB Object and Child Elements Defined in Omniture Beacon Code

          PlayerDelegateInstance.getVideoInfo = function() { // Define PlayerDelegate 'getVideoInfo' Function
            var videoInfo = new ADB.va.VideoInfo();
            for (var key in options.videoInfo) { // Cycle Through Video Info Parameters Defined in options/hbOption, Ignore null Values
              if (options.videoInfo[key] != null) {
                if (typeof options.videoInfo[key] == 'function') { // If Option is a Function Pull Returned Value, Not Function Reference
                  videoInfo[key] = options.videoInfo[key]();
                } else {
                  videoInfo[key] = options.videoInfo[key];
                }
              }
            }
            return videoInfo;
          }

          if (options.enableChapterTrack) { // If Chapter Tracking Enabled, Proceed to Define 'getChapterInfo' Function
            PlayerDelegateInstance.getChapterInfo = function() {
              var chapterInfo = new ADB.va.ChapterInfo();
              for (var key in options.chapterInfo) {
                if (options.chapterInfo[key] != null) {
                  if (typeof options.chapterInfo[key] == 'function') {
                    chapterInfo[key] = options.chapterInfo[key]();
                  } else {
                    chapterInfo[key] = options.chapterInfo[key];
                  }
                }
              }
              return chapterInfo;
            }
          }

          if (options.enableAdTrack) { // If Ad Tracking Enabled, Proceed to Define 'getAdInfo' Function
            PlayerDelegateInstance.getAdInfo = function() {
              var adInfo = new ADB.va.AdInfo();
              for (var key in options.adInfo) {
                if (options.adInfo[key] != null) {
                  if (typeof options.adInfo[key] == 'function') {
                    adInfo[key] = options.adInfo[key]();
                  } else {
                    adInfo[key] = options.adInfo[key];
                  }
                }
              }
              return adInfo;
            }
          }

          this.instance = new ADB.va.VideoHeartbeat(PlayerDelegateInstance, [new ADB.va.plugins.AdobeAnalyticsPlugin(s_md)]); // Create Instance of Heartbeat Tracking, passing in PlayerDelegate and Analytics/AppMeasurement Objects

          var heartbeatConfig = new ADB.va.ConfigData('http://heartbeats.omtrdc.net', 'sc_va', 'webmd'); // Mandatory ConfigData Parameters, Always Same for WebMD/Medscape

          for (var key in options.heartbeatConfig) { // Pull Optional Config Parameters
            if (options.heartbeatConfig[key] != null) {
              if (typeof options.heartbeatConfig[key] == 'function') {
                heartbeatConfig[key] = options.heartbeatConfig[key]();
              } else {
                heartbeatConfig[key] = options.heartbeatConfig[key];
              }
            }
          }

          this.instance.configure(heartbeatConfig); // Initialize Heartbeat with Config Data

          /* END Main Heartbeat Instantiation */

          /* Custom Functions - Trigger Core Heartbeat Functions, With Some Extra Logic */

          var loadedFlag = false;
          var seekingFlag = false;
          var stopFlag = false;
          var bufferedFlag = false;
          var lastTimePoint = 0;

          this.instance.onVideoUnloaded = new Function();
          PlayerDelegateInstance.onVideoUnloaded = function() { // Expose Unload Callback Function on Returned Object
            loadedFlag = false; // Reset Flags For Next Loaded Video
            seekingFlag = false;
            stopFlag = false;
            bufferedFlag = false;
            lastTimePoint = 0;
            self.instance.onVideoUnloaded();
          };

          this.instance.wmdHbSeeking = function() {
            seekingFlag = true;
            self.instance.trackSeekStart();
          };

          this.instance.wmdHbWaiting = function() {
            if (!stopFlag) { // If Video is 'Waiting', But Video Not Paused
              bufferedFlag = true;
              self.instance.trackBufferStart();
            }
          };

          this.instance.wmdHbSeeked = function() {
            if (seekingFlag) { // If Seeking/SeekStart has Occurred, Reset Flag
              seekingFlag = false;
            } else { // Else If No Seeking/SeekStart has Occurred, Send SeekStart Before Sending SeekComplete, as per Adobe Support
              self.instance.trackSeekStart();
            }
            self.instance.trackSeekComplete();
          };

          this.instance.wmdHbPlay = function() {
            stopFlag = false;
            if (typeof options.videoInfo.length == 'function') {
              var vidLength = options.videoInfo.length();
            } else {
              var vidLength = options.videoInfo.length;
            }
            if (!loadedFlag && isNaN(vidLength) != true) { // If First Playback, Send 'Load' Event First

              loadedFlag = true;

              /* Adobe-provided Workaround For Heartbeat Conflict with Concurrent Legacy Omniture Tracking, Ensures Heartbeat Parameters Passed Into Standard Omniture Call that Directly Follows Heartbeat Load Call */
              if (s_md.linkTrackVars.match('contextData') == null) {
                s_md.linkTrackVars = "contextData.a.contentType,contextData.a.media.name,contextData.a.media.friendlyName,contextData.a.media.length,contextData.a.media.playerName,contextData.a.media.channel,contextData.a.media.view,contextData.a.media.ad.name,contextData.a.media.ad.friendlyName,contextData.a.media.ad.podFriendlyName,contextData.a.media.ad.length,contextData.a.media.ad.playerName,contextData.a.media.ad.pod,contextData.a.media.ad.podPosition,contextData.a.media.ad.podSecond,contextData.a.media.ad.CPM,contextData.a.media.ad.view," + s_md.linkTrackVars;
              };

              self.instance.trackVideoLoad();

              /* Remove Heartbeat variables back out from Legacy Omniture calls */
              s_md.linkTrackVars = s_md.linkTrackVars.replace("contextData.c50c.contentType,contextDc50cta.a.media.name,contextData.a.media.friendlyName,contextData.a.media.length,contextData.a.media.playerName,contextData.a.media.channel,contextData.a.media.view,contextData.a.media.ad.name,contextData.a.media.ad.friendlyName,contextData.a.media.ad.podFriendlyName,contextData.a.media.ad.length,contextData.a.media.ad.playerName,contextData.a.media.ad.pod,contextData.a.media.ad.podPosition,contextData.a.media.ad.podSecond,contextData.a.media.ad.CPM,contextData.a.media.ad.view,", "");
              s_md.contextData = {};

              self.instance.trackPlay();
            } else if (!loadedFlag && isNaN(vidLength) == true) {
              setTimeout(self.instance.wmdHbPlay, 20);
            } else {
              self.instance.trackPlay();
            }
          };

          this.instance.wmdHbPause = function() {
            stopFlag = true;
            self.instance.trackPause();
          };

          this.instance.wmdHbEnded = function() {
            self.instance.trackComplete();
          };

          this.instance.wmdHbUnload = function() {
            self.instance.trackVideoUnload();
          };

          this.instance.wmdHbPlaying = function() {
            if (bufferedFlag) { // If Buffering Occurred, Send BufferComplete Event Now that Playback has Restarted
              bufferedFlag = false;
              self.instance.trackBufferComplete();
            }
          };

          this.instance.wmdlegacySeek = function() { // Function for browsers that don't support 'seeking' or 'seeked' events (iOs 7 + below devices)
            if (Math.abs(options.videoInfo.playhead() - lastTimePoint) > .75) {
              self.instance.wmdHbSeeked();
            }
            lastTimePoint = options.videoInfo.playhead();
          };

          /* END Custom Functions - Trigger Core Heartbeat Functions, With Some Extra Logic */


          chapterIntervalFunction = function() {
            var current = videoApi().getCurrentTime();
            for (var i = (chapters.length - 1); i >= 0; i--) {
              if (currentChapter === null) {
                currentChapter = 0;
                self.instance.trackChapterStart();
              } else if (current >= chapters[i].startSeconds) {
                if ((parseInt(i)) != currentChapter) {
                  self.instance.trackChapterStart();
                  currentChapter = (parseInt(i));
                }
                break;
              }
            }
          };


          return this.instance;

        };
        // Pass Options into new instance of Heartbeat
        var hbInstance = new wmdHeartbeat(hbOption),
          os_md = $.extend({}, s_md);

        // Bind Player Events to our handler functions
        this.addEventListener('play.hb', function() {
          hbInstance.wmdHbPlay();
          window.o_sm = s_md;
        });

        this.addEventListener('playing.hb', hbInstance.wmdHbPlaying);
        this.addEventListener('pause.hb', hbInstance.wmdHbPause);
        this.addEventListener('ended.hb', function() {
          try {
            hbInstance.trackChapterComplete();
          } catch (e) {

          }

          hbInstance.wmdHbEnded();
          hbInstance.wmdHbUnload();

          self.removeEventListener('play.hb');
          self.removeEventListener('playing.hb');
          self.removeEventListener('pause.hb');
          self.removeEventListener('ended.hb');
          self.removeEventListener('seeking.hb');
          self.removeEventListener('seeked.hb');
          self.removeEventListener('waiting.hb');
          self.removeEventListener('timeupdate.hb');

          if (hbOption.enableChapterTrack) {
            clearInterval(chapterInterval);
            chapterInterval = null;
            currentChapter = 0;
          }
        });

        this.addEventListener('seeking.hb', hbInstance.wmdHbSeeking);
        this.addEventListener('seeked.hb', hbInstance.wmdHbSeeked);
        this.addEventListener('waiting.hb', hbInstance.wmdHbWaiting);

        if (navigator.userAgent.toLowerCase().match(/(iphone)|(ipad)/) != null && Number(navigator.userAgent.toLowerCase().match(/os \d/)[0].split(' ')[1]) < 8) { // If iOs 7.x or below iPhone / iPad, create 'seeked' event manually
          this.addEventListener('timeupdate.hb', hbInstance.wmdlegacySeek);
        }

        hbInstance.onVideoUnloaded = function() { // Unload Callback Function Example, Remove Video From DOM after Unload Event Finished Sending

        };

        if (typeof s_sponsor_program !== "undefined" && s_sponsor_program != "") {
          s_md.prop28 = (s_sponsor_brand || "").toLowerCase();
          s_md.prop29 = s_sponsor_program.toLowerCase();
          s_md.prop30 = (s_package_type || "").toLowerCase();
          s_md.prop31 = (s_package_name || "").toLowerCase();

          for (var i = 28; i < 32; i++) {
            if (!s_md.linkTrackVars.match('prop' + i)) {
              s_md.linkTrackVars += ',prop' + i;
            }
          }
        }

        hbInstance.wmdHbPlay();
        hbInstance.wmdHbPlaying();

        if (hbOption.enableChapterTrack) {
          chapterInterval = setInterval(chapterIntervalFunction, 1000);
        }

      },

      wmdPageLink: function(link, obj) {
        if (this.isProfessional) {
          if (typeof addLinkTrackVars === 'undefined') return;
          addLinkTrackVars(_.keys(obj));
          try {
            _.assign(s_md, obj);
            wmdPageLink(link);
          } finally {
            remLinkTrackVars(_.keys(obj));
          }
        } else {
          this._consWMDPageLink(link, obj);
        }
      },
      _profWMDPageLink(link, obj) {
        var s_md = s_gi(s_account); // seriously?
        /* adding prop47 per WR2418 */
        s_md.linkTrackVars = "prop3,prop19,prop37,prop38,prop20,prop21,prop47,prop48,prop50";

        // snip
        _.forEach(obj || {}, function(val, prop) {
          if (val) {
            s_md[prop] = val;
            s_md.linkTrackVars += "," + prop;
          }
        });
        // snip (back to the mayhem, holy mother of god, who wrote this?)

        s_md.prop21 = (typeof s_query != _ud && s_query !== "") ? s_query.toLowerCase() : "";
        if (typeof s_md.prop15 == _ud || s_md.prop15 === "") {
          s_md.prop15 = ((typeof s_sponsor_program != _ud && s_sponsor_program !== "") && (typeof link != _ud && link !== "")) ? s_sponsor_program.toLowerCase() + "_" + link : "";
        }
        link = s_md.pageName.split("_").join("-") + "_" + link;
        try {
          s_md.prop20 = trun20(link);
        } catch (e) {}

        void(s_md.tl(true, 'o', link.toLowerCase()));
        s_md.prop15 = "";

        /* adding prop47 per WR2418 */
        s_md.linkTrackVars = 'prop3,prop19,prop37,prop38,prop47,prop48,prop50';

      },
      _consWMDPageLink(link, obj) {
        var s_md;

        if (!obj) {
          obj = {};
        }

        try {
          link = link.toLowerCase();
        } catch (e) {}

        s_md = s_gi(s_account);

        s_md.prop32 = "";

        var s_orig_events = s_md.events;

        s_md.events = "";

        s_md.prop21 = (typeof s_query != _ud && s_query !== "") ? s_query.toLowerCase() : "";

        if (typeof s_md.prop15 == _ud || s_md.prop15 === "") {
          s_md.prop15 = ((typeof s_sponsor_program != _ud && s_sponsor_program !== "") && (typeof link != _ud && link !== "")) ? s_sponsor_program.toLowerCase() + "_" + link : "";
        }

        try {
          s_md.prop20 = trun20(s_md.pageName.split("_").join("-") + "_" + link);
        } catch (e) {}

        if (typeof s_linktext != _ud) {
          s_md.prop32 = s_linktext.toLowerCase();
          s_linktext = "";
        }

        addEvent("event8");

        if (typeof s_new_reg != _ud && s_new_reg !== "") {
          addEvent(s_new_reg.toLowerCase());
        }
        try {
          s_md.products = ';' + link.split('_')[0] + ";;;event8=1,";
        } catch (e) {}

        s_md.linkTrackVars = all_linkTrackVars;

        for (var i in obj) {
          s_md[i] = obj[i];
          s_md.linkTrackVars += "," + i;
        }

        void(s_md.tl(true, 'o', link));

        /* adding prop47 per WR2418 */
        s_md.linkTrackVars = "prop3,prop47,prop50";

        s_md.prop15 = "";

        if (typeof s_new_reg != _ud && s_new_reg !== "")
          s_new_reg = "";

        s_md.events = s_orig_events;
      }
    };
  }
  return Metrics
});
