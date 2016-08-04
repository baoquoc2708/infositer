/* Created 10/19/15 by MN - AP */
// DEPENDENCIES: jQuery,MD5, tracking.js
// This library is used on Brand Advance 2.0
// The brandAdvance2 Initializing in tracking.js because of the DEPENDENCIES

/*=== Brand Advance 2.0 main object ===*/
module.exports = function () {

    // Create brandAdvance2 object if it doesn't already exist

    let brandAdvance2 = {};

    /*==================================================*
     * START OF FUNCTIONS
     *==================================================*/

    /*=== Global Variables ===
    * cpConsole: This flag is used for the CP events to triger the console
    * only once (instead of logging out every time something is missing for every event)
    * initFlag: This flag is just a check to avoid duplicate load
    * cpEnable: This flag checks if the CP meta tag validation exist. If true, the meta data
    * it's declared properly. If it's false then it doesn't execute the CP call.
    * cpTrkObj: This is to get the CP obejct.
    * cur_scene: Is used to create the hash value for the orientation change
    */

        brandAdvance2.ba2Constructor = function(obj) {
            // init flag to avoid duplicate load for brandAdvance2
            this.initFlag = true;
            this.settings = {

                scrollIndex: -1,
                scrollPosition: 0,

                // cp taraking
                cpConsole: true,
                cpEnable: true,
                cpTrkObj: {},

                // ipp tracking
                ippTrkObj: {},
                ippConsole: true,
                ippEnable: true,

                // Event Drivan Animation Config for Scroll Indicator Element.
                //(Please add Elements here to expand functionality to Other Elements.)
                configElements: $('.scroll-indicator-1'),
                cur_scene: 0,

                // Re-engagement
                rememberMeObj: $('meta[data-engagement]').data(),
                rememberMeFlg: true,
                originUrl: location.href.replace(location.hash,""),
                nextSceneNumber: 0,
                isFullScreen: false,
                app : window.navigator.userAgent.indexOf("medscapeapp")
            };
            this.settings = $.extend(this.settings, obj);
            return this;
        };

    /* Function to call once to initialize the brandAdvance2 framework.
     * Can be done at the top or bottom of the page.
     * Calling this multiple times will have no ill effects. */

        brandAdvance2.init = function(){

            /*=== This check is to mke sure we don't run init twice ===*/
            var self = this;
            if (self.initFlag) {
                return;         //This checks if the object it's loaded or not.
            }

            /*=== Function for getting settings ===*/
                self.ba2Constructor();

            /*=== Function to fire the tracking functions ===*/
                if(typeof self.tracking != 'undefined'){
                    self.tracking.init();
                } else {
                    console.log("tracking object is not well-formed/parseable");
                }

            /*=== Remember me Flag setting ===*/
            if(self.directLinkFn() || $('meta[data-engagement]').length <= 0 || self.settings.rememberMeObj.engagement.feature === "false"){
                self.settings.rememberMeFlg = false;
            }

            /*===  Function for Validation of data-cp tag in Document ===*/
                self.cpValidation();

            /*===  Function for Validation of data-cp tag in Document ===*/
                self.ippValidation();

            $(document).ready(function() {

                /*=== Function for progress bar ===*/
                    self.progressBar();

                /*=== Function to track jump links ===*/
                    self.trackJumpLinks();

                /*=== Function for tracking scene ===*/
                    if($('[data-qnaFormId]').length === 0){
                        self.trackScene();
                    }

                /*=== Function that handles the ISI expand/collapse fonctionality ===*/
                    self.isiToggleButtons();

                /*=== Function that handles the ISI anchoring position fonctionality ===*/
                    self.isiContentPosition();

                if(self.settings.cpEnable){

                    /*===  CP Event for  start of program load ===*/
                        self.cpStart();

                    /*=== CP Event On closing browser window/tab: ===*/
                        self.cpDropOff();
                }
                if(self.settings.ippEnable){

                    /*=== IPP Event On closing browser window/tab: ===*/
                        self.ippDropOff();
                }

                /*=== Function that controles the Auto Scroll ===*/
                    self.autoScrollIsi();

                /*=== Function to change the ISI position to final state ===*/
                    self.isiFinalState();

                /*=== Toggle for Exapndable Button Event ===*/
                    self.expandableButton();

                /*=== Function to trigger event for config elements ===*/
                    self.configElementsFn();

                /*=== Function to fire the orientationChange listener ===*/
                    self.orientationChange();

                /*=== Function to trigger remember me feature  if QnA is not available in program ===*/
                    if($('[data-qnaFormId]').length === 0){
                       self.rememberMe();
                    }
            });

            /*=== This section is to call the function on load ===*/
                window.addEventListener('load', function(){

                    if(self.settings.cpEnable){
                        self.cpLoad();
                    }
                    if(self.settings.ippEnable){
                        self.trackIpp('startPresentation');
                    }

                    if($('.isi').hasClass('is-expanded')){
                        $('body').addClass('no-scroll');
                        if(window.matchMedia("(max-width: 800px)").matches){
                            brandAdvance2.settings.scrollPosition = $('body').scrollTop();
                            $('.scene').hide();
                        }
                    }

                    /*=== Function for hiding ISI on focusing input ===*/
                    self.inputIsiBind();
                });

            return self;
        };

    /*=== This function Toggles for Exapndable Button ===*/
        brandAdvance2.expandableButton = function(){
            $('.js-expandable-button').on('click touchend', function(event){
                event.preventDefault();
                $(this).parent().toggleClass('is-expanded');
            });
        };

    /*=== These functions expand and collapse the ISI section ===*/
        /*=== This function toggles expanded state for isi ===*/
        brandAdvance2.toggleIsi = function(){
            $('.isi').toggleClass('is-expanded');
            $('body').toggleClass('no-scroll');
            if(window.matchMedia("(max-width: 800px)").matches){
                if($('.isi').hasClass('is-expanded')){
                    brandAdvance2.settings.scrollPosition = $('body').scrollTop();
                    $('.scene').hide();
                } else {
                    $('.scene').show();
                    $('body').scrollTop(brandAdvance2.settings.scrollPosition);
                }
            }
        };

        /*=== This function binds toggleIsi to element on click ===*/
        brandAdvance2.isiToggleButtons = function(){
            var self = this;
            if($('.js-isi-toggle').length>0){
                $('.js-isi-toggle').on('click touchend', self.toggleIsi);
            } else {
                console.log('The class to support the ISI toggle functionality is missing');
            }
        };

        /*=== This function updates ISI content position when expanded ===*/
        brandAdvance2.isiContentPosition = function(){
            var self = this;
            $('.isi-header').on('click', function() {
                if(!$('.isi').hasClass('is-expanded')){
                    self.isiAnchorFn($('.scene'),self.settings.scrollIndex);
                }
            });
        };

    /*=== Validation for CP Event related dependancy to capture events: ===*/
        brandAdvance2.cpValidation = function(){
            if($('[data-cp]').length > 0){
                this.settings.cpTrkObj = $('[data-cp]').data();
            } else {
                if(this.settings.cpConsole){
                    console.log('\"data-cp\" meta tag not well-formed/parseable, please check formatting for tracking.');
                    this.settings.cpEnable = false;
                    this.settings.cpConsole = false;
                }
            }
        };

    /*=== CP Event for  start of program load: ===*/
        brandAdvance2.cpStart =  function() {
            this.settings.cpTrkObj.cp.appname = "ippevent";
            this.settings.cpTrkObj.cp.activityName = "requestCSD";
            postCp(this.settings.cpTrkObj.cp);
        };

    /*=== CP Event When content becomes visible ===*/
        brandAdvance2.cpLoad =  function() {
            this.settings.cpTrkObj.cp.appname = "ippevent";
            this.settings.cpTrkObj.cp.activityName = "participation";
            postCp(this.settings.cpTrkObj.cp);
        };

    /*=== CP Event for start of Scene: ===*/
        brandAdvance2.cpScene =  function(prev, indexy) {
            this.settings.cpTrkObj.cp.appname = "ippcontent";
            this.settings.cpTrkObj.cp.activityName = "scn"+ (prev+indexy+1);
            postCp(this.settings.cpTrkObj.cp);
        };

    /*=== CP Event for start of Last Scene: ===*/
        brandAdvance2.cpLastScene =  function() {
            this.settings.cpTrkObj.cp.appname = "ippevent";
            this.settings.cpTrkObj.cp.activityName = "completion";
            postCp(this.settings.cpTrkObj.cp);
        };

    /*=== CP Event Function On closing browser window/tab for Desktop and Android: ===*/
        brandAdvance2.dropOff =  function() {
            var cpObjOnClose = $('[data-cp]').data();
            cpObjOnClose.cp.appname = "ippevent";
            cpObjOnClose.cp.activityName = "drop-off";
            postCp(cpObjOnClose.cp);
        };

    /*=== CP Event Function On closing browser window/tab for Iphone and Ipad: ===*/
        /*=== This function it's a copy of the CP function "postCp(cpdata,callback) but adapted
        to the "pagehide" event since, it doesn't accepct objects for Iphone and Ipad ===*/
        brandAdvance2.postCpString =  function() {
            var stagingChk = "",
                url, ajaxResponse,
                xhttp = new XMLHttpRequest(), cpJSON,
                cpObjOnCloseIOS = $('[data-cp]').data();
                cpObjOnCloseIOS.cp.appname = "ippevent";
                cpObjOnCloseIOS.cp.activityName = "drop-off";
                cpObjOnCloseIOS.date = new Date().getTime();
                cpJSON  = JSON.stringify(cpObjOnCloseIOS.cp);

                if (typeof s_registered_user_id != 'undefined' || typeof cpObjOnCloseIOS.uid != 'undefined') {
                    if (typeof cpObjOnCloseIOS.uid == 'undefined'){
                        cpObjOnCloseIOS.uid = s_registered_user_id;
                    }
                    if (typeof cpObjOnCloseIOS.url == 'undefined'){
                        cpObjOnCloseIOS.url = encodeURIComponent(window.location.href.split("?")[0]);
                    }
                }
            if (window.location.href.indexOf(".staging.") != -1){
                stagingChk = ".staging";
            }
            if (window.location.href.match(/\.qa\d\d/) !== null){
                stagingChk = stagingChk + window.location.href.match(/\.qa\d\d/)[0];
            }

            url = "http://api" + stagingChk + ".medscape.com/cp/events.json?event=" + cpJSON;
            xhttp.open("GET", url, false);
            xhttp.send();
            ajaxResponse = xhttp.responseText;
            console.log('Ajax Call Status: ',xhttp.status);
            console.log ('Ajax Response: '+ajaxResponse);
        };

    /*=== CP Event On closing browser window/tab for all Devices: ===*/
        brandAdvance2.cpDropOff =  function() {
            var self = this;
            try{
                opera.setOverrideHistoryNavigationMode('compatible');
                history.navigationMode = 'compatible';
            }catch(e){}

            /* For desktop we use the 'beforeunload' event and 'pagehide' for iOS devices */
            if(/iPad|iPhone|iPod/.test(navigator.userAgent) && !window.MSStream){
                $(window).on('pagehide', function() {
                    self.postCpString();
                });
            } else {
                $(window).bind('beforeunload',self.dropOff);
            }
        };

    /*=== This function hides the element after x seconds ===*/
        brandAdvance2.hideOnDelay =  function(element) {
            if($('[data-hide-after-load]').length<=0){
                console.log("Data attribute missing for hidding by time");
            } else {
                var timer = 0,
                    dataDelay = $(element).data('hide-after-load-time');
                if(isNaN(dataDelay) || $(element).data('hide-after-load')===false || dataDelay === 0){
                    console.log('Please verify Data attribute value for hidding by time');
                    return;
                }
                clearTimeout(timer);
                timer = setTimeout(function() {
                    $(element).addClass('is-invisible');
                    $(element).removeClass('is-visible');
                }, (dataDelay*1000));
            }
        };

    /*=== This function hides the element on Scroll and appears after x seconds ===*/
        brandAdvance2.hideOnScroll = function(element){
            if($(element).data('hide-when-scroll')===false){
                console.log('Data attribute used to disable hidding on scoll');
                return;
            }
            $(window).on('scroll touchstart',function() {
                var y_scroll_pos = window.pageYOffset,
                scroll_pos_index = 1;
                if(y_scroll_pos > scroll_pos_index) {
                    if($(element).hasClass('is-invisible')===false){
                        $(element).addClass('is-invisible');
                    }
                }
            });
        };

    /*=== This function captures inactivity and shows element after X seconds of inactivity ===*/
        brandAdvance2.inactiveScreen = function (element){
            var self = this;
            function checkIdleTime() {
                _idleSecondsCounter++;
                $('[data-show-when-idle]').each(function(index, el) {
                    var dataInactive = $(element).data('show-when-idle-time');
                    if(isNaN(dataInactive) || $(element).data('show-when-idle')===false || dataInactive === 0){
                        console.log('Please varify Data attribute value for hidding on scoll');
                        return;
                    }
                    if (_idleSecondsCounter >= dataInactive) {
                        if($(element).hasClass('is-invisible')){
                            $(element).removeClass('is-invisible');
                        }
                    }
                });
            }

            if($('[data-show-when-idle]').length<=0) {
                console.log("Data attribute for inactivity missing");
            } else {
                var _idleSecondsCounter = 0;

                $(document).on('click mousemove keypress scroll touchmove touchstart', function() {
                    _idleSecondsCounter = 0;
                });
                window.setInterval(checkIdleTime, 1000);
            }
        };

    /*=== This function captures scene number and shows scroll indicator ===*/
        brandAdvance2.scrollIndicatorAtScene = function(element,index){
            var self = this;
            if($(element[index]).hasClass('scene js-show-scroll-indicator')){
                $(self.settings.configElements).removeClass('is-invisible');
                $(self.settings.configElements).addClass('is-visible');
                $(self.settings.configElements).each(function(index, el) {
                    self.hideOnDelay(this);
                });
            } else {
               $(self.settings.configElements).removeClass('is-visible');
            }
        };

    /*=== This function reads data attribute of the element ===*/
        brandAdvance2.configElementsFn = function(){
            var self = this;
            if(brandAdvance2.settings.configElements.length > 0){
                $(brandAdvance2.settings.configElements).each(function(index, el) {
                    self.scrollIndicatorAtScene(this);
                    self.hideOnDelay(this);
                    self.hideOnScroll(this);
                    self.inactiveScreen(this);
                });
            }
        };

    /*=== This function handles all the Progress Bar config with scene height calculation===*/
        brandAdvance2.progressBar = function(){
            $(window).scroll(function () {
                var s = $(window).scrollTop(),
                    d = $(document).height(),
                    c = $(window).height(),
                    scrollPercent = (s / (d-c)) * 100;
                $('.progressPosition').css('width', scrollPercent+'%');
            });
        };

    /*=== This function handles all the Progress Bar config with scene height calculation===*/
        brandAdvance2.trackScene = function (){
            var scene = $('.scene'),
                position = new Array(scene.length),
                self = this;

                if(self.directLinkFn()){
                    var sceneIndex = self.directLinkFn();
                    if(self.settings.scrollIndex - sceneIndex !== -1){
                        self.eleScrollTopFn('#scene'+ sceneIndex);

                        /*On scene view: replace cp with console */
                        if(sceneIndex === $('.scene').length){
                            self.lastSceneTrack();
                        } else {

                        /* CP Event for Viewing Scene */
                            if(self.settings.cpEnable){
                                self.cpScene(0, sceneIndex-1);
                                if(self.tracking != 'undefined'){
                                    self.tracking.trackScn(0, sceneIndex-1);
                                }
                            }
                            self.settings.cur_scene = sceneIndex;
                            console.log('Top of Scene: ' + sceneIndex);
                            $(document).trigger('currentScene');
                        }
                        self.settings.scrollIndex = sceneIndex-1;
                    }
                }

            $(document).scroll(function () {
                var s = $(window).scrollTop(),
                    sceneHeight=[],sceneTop = [];
                $('.scene').each(function(index, el){
                    sceneHeight.push($(this).height());
                    sceneTop.push($(this).offset());
                });
                for(var index=0;index<scene.length;index++){
                    position[index] = s-(sceneTop[index].top-sceneTop[0].top);
                    if(position[0] > -25 && position[0] < 25){
                        if(self.settings.scrollIndex !== 0){

                            /*On scene isi anchoring */
                            self.isiAnchorFn(scene,0);
                            self.firstSceneTrack();
                        }
                    }
                    if(position[index] + ($(window).height()/2) < 25 && position[index] + ($(window).height()/2) > -25){
                        if(index !== self.settings.scrollIndex){
                            /*On scene isi anchoring */
                            self.isiAnchorFn(scene,index);

                            /*On scene view: replace cp with console */
                            if((index+1) === scene.length){
                                self.lastSceneTrack();
                            } else {

                            /* CP Event for Viewing Scene */
                                if(self.settings.cpEnable){
                                    self.cpScene(0, index);
                                    if(self.tracking != 'undefined'){
                                        self.tracking.trackScn(0, index);
                                    }
                                }
                                self.settings.cur_scene = index+1;
                                console.log('Top of Scene: ' + (index+1));
                                $(document).trigger('currentScene');

                                /* Scroll Indicator Visibility Config Function */
                                self.scrollIndicatorAtScene(scene,index);
                            }
                            self.settings.scrollIndex = index;
                        }
                    }
                }
            });
        };

    /*=== This function handles autoscroll for the ISI section ===*/
        brandAdvance2.autoScroll = function(speed){
            if($('.isi').hasClass('is-expanded')) {

                /*This stops any activity within the ISI Area, in this case is used to stop the autoscroll */
                $('.isi').on('click touchend', function() {
                    $('.isi-content').stop();
                });

                /* This enables the Auto Scroll within the ISI area */
                $('.isi-content').animate({
                    scrollTop: $('.isi-content')[0].scrollHeight
                }, (speed*1000), 'linear');
            }
        };

    /*=== This function to trigger autoscroll the isi content only once ===*/
        brandAdvance2.autoScrollIsi = function(){
            var self = this;
            if($('[data-autoscroll]').length>0){
                var speed = $('[data-autoscroll]').data('autoscroll');
                if(!Boolean(speed)){
                    console.log('Please varify data attribute to autoscroll isi content');
                } else {
                    $('.isi').one('click touchend', function() {
                        setTimeout(function(){
                            self.autoScroll(speed);
                        }, 500);
                    });
                }
            } else {
                 console.log('Data attribute missing to support feature to autoscroll isi content is missing');
            }
        };

    /*=== This function handles ISI final state if data atribute is added to isi ===*/
        brandAdvance2.isiFinalState = function(){
            if($('#isi').data('final-state-time') !== undefined && $('#isi').data('final-state-time') > 0){
                var finalStateTime = $('#isi').data('final-state-time'),
                    timer = 0;

                /*=== Activate timer feature for Roadblock ===*/
                if($('.isi').hasClass('is-expanded')){
                    $('body').addClass('no-scroll');
                    clearTimeout(timer);
                    timer = setTimeout(function() {
                        $('#isi').removeClass('is-expanded');
                        $('#isi').addClass('is-final-state');
                        $('body').removeClass('no-scroll');
                    }, (finalStateTime*1000));
                }
                /*=== Activate timer feature for ISI ===*/
                else{
                    clearTimeout(timer);
                    timer = setTimeout(function() {
                        $('#isi').addClass('is-final-state');
                    }, (finalStateTime*1000));
                }
            }
            /*=== Activate the scroll/touch feature ===*/
            else if($('#isi').data('final-state-time') === 0){
                $(window).on('scroll touchstart',function() {
                    var y_scroll_pos = window.pageYOffset,
                    scroll_pos_index = 1;
                    if(y_scroll_pos > scroll_pos_index) {
                        $('#isi').addClass('is-final-state');
                    }
                });
            } else {
                console.log('Final state time is not added to isi');
            }

            /*=== Scan the ISI Area code looking for the data attr "accept"
            to enable the "Accept to continue" feature (Option 5 on ISI) ===*/
            if (($('.isi').hasClass('is-expanded')) &&
                ($('#isiArea').attr('data-accept')) &&
                ($('#isi').data('final-state-time') === 0)){
                var accept = $('#isiArea').data('accept'),
                    label = $(".isi-header-text-expanded").text();

                $('body').addClass('no-scroll');
                $(".isi-header-text-expanded").text(accept);
                $('.isi-header').on('click', function() {
                    $(".isi-header-text-expanded").text(label);
                });
            }
        };

    /*=== This function handles the Blocker Screen ===*/
        brandAdvance2.blockerScreen = function (event){
            var self = this, blocker = $(document.body).find('#blocker'),
                curScene = 'scene-' + self.settings.cur_scene,
                domain = document.domain,
                productName = self.tracking.settings.pamProductName,
                version = self.tracking.settings.sfNumObj.tracking.version,
                sfNum = self.tracking.settings.sfNumObj.tracking.sfNum,
                hashValue = "", pName = "";

            hashValueLndscp = CryptoJS.MD5(sfNum +'_'+ version +'_'+ curScene + '_LNDSCP');
            hashValuePtrt = CryptoJS.MD5(sfNum +'_'+ version +'_'+ curScene + '_PTRT');

            pNameLndscp = domain + '/' + productName + '/' + sfNum + '/' + hashValueLndscp + '/';
            pNamePtrt = domain + '/' + productName + '/' + sfNum + '/' + hashValuePtrt + '/';


            if(blocker && blocker.length > 0){
                if($('#blocker').attr('class') === 'landscape-blocker'){
                    if (window.matchMedia("(orientation: landscape)").matches) {
                        console.log('Landscape Blocker available');
                        if(self.tracking != 'undefined'){
                            self.tracking.omniPageView(curScene, pNameLndscp);
                        }
                        $('html, body').off('touchstart touchmove scroll');
                        $('html, body').on('touchstart touchmove scroll', function(e){
                             e.preventDefault();
                        });
                    } else {
                        console.log('Portrait mode active.');
                        $('html, body').off('touchstart touchmove scroll');
                        $('html, body').on('touchstart touchmove scroll', function(e){
                            return true;
                        });
                    }
                } else if ($('#blocker').attr('class') === 'portrait-blocker') {
                    if (window.matchMedia("(orientation: portrait)").matches) {
                        console.log('Portrait Blocker available');
                        if(self.tracking != 'undefined'){
                            self.tracking.omniPageView(curScene, pNamePtrt);
                        }
                        $('html, body').off('touchstart touchmove scroll');
                        $('html, body').on('touchstart touchmove scroll', function(e){
                             e.preventDefault();
                        });
                    } else {
                        console.log('Landscape mode active.');
                        $('html, body').off('touchstart touchmove scroll');
                        $('html, body').on('touchstart touchmove scroll', function(e){
                            return true;
                        });
                    }
                } else {
                    console.log('There is no Blocker Class Added');
                }
            }
        };

    /*=== This function handles the orientation changes for mobile device ===*/
        brandAdvance2.orientationChange = function (event){
            var supportsOrientationChange = "onorientationchange" in window,
                orientationEvent = supportsOrientationChange ? "orientationchange" : "resize";

            window.addEventListener(orientationEvent, function(){
                brandAdvance2.blockerScreen();
            }, false);
        };

    /*=== Validation for IPP Event related dependancy to capture events: ===*/
        brandAdvance2.ippValidation = function(){
            if($('[data-ipp]').length > 0){
                this.settings.ippTrkObj = $('[data-ipp]').data();
            } else {
                if(this.settings.ippConsole){
                    console.log('\"data-ipp\" meta tag not well-formed/parseable, please check formatting for tracking.');
                    this.settings.ippEnable = false;
                    this.settings.ippConsole = false;
                }
            }
        };

    /*=== Function for IPP Tracking: ===*/
        brandAdvance2.trackIpp = function(action) {
            var self = this;
            if (typeof self.settings.ippTrkObj.ipp.wpUrl != 'undefined' && typeof self.settings.ippTrkObj.ipp.parIdE != 'undefined' && typeof self.settings.ippTrkObj.ipp.activityId != 'undefined') {
                var preload_image = new Image(1, 1);
                if (typeof self.settings.ippTrkObj.ipp.tacticId != 'undefined') {
                    preload_image.src = 'http://' + self.settings.ippTrkObj.ipp.wpUrl + '/activity/viewpresentation?action=' + action + '&activityId=' + self.settings.ippTrkObj.ipp.activityId + '&parId=' + self.settings.ippTrkObj.ipp.parIdE + '&tacticId=' + self.settings.ippTrkObj.ipp.tacticId;
                } else {
                    preload_image.src = 'http://' + self.settings.ippTrkObj.ipp.wpUrl + '/activity/viewpresentation?action=' + action + '&activityId=' + self.settings.ippTrkObj.ipp.activityId + '&parId=' + self.settings.ippTrkObj.ipp.parIdE;
                }
            }
        };

    /*=== IPP Event On closing browser window/tab: ===*/
        brandAdvance2.ippDropOff = function(){
            var self = this,
                logBrowserClose = '';
            try{
                opera.setOverrideHistoryNavigationMode('compatible');
                history.navigationMode = 'compatible';
            }catch(e){}

            /* For desktop we use the 'beforeunload' event and 'pagehide' for iOS devices */
            if(/iPad|iPhone|iPod/.test(navigator.userAgent) && !window.MSStream){
                logBrowserClose = 'pagehide';
            } else {
                logBrowserClose = 'beforeunload';
            }
            $(window).on(logBrowserClose, function() {
                self.trackIpp('logBrowserClose');
            });
        };

    /*=== API call to get Last visit details for user for Re-engagement: ===*/
        brandAdvance2.rememberMe = function() {
            var self = this;
            var _domain = "";
            if (window.location.host.split('.').length > 3){
                _domain = window.location.host.split('.')[1] + ".";
            }

            try {
                $.ajax({
                    type: "GET",
                    contentType: "application/jsonp",
                    url: "http://api." + _domain + "medscape.com/cp/ipplastvisit/user/" + Number(s_registered_user_id) / 27 + "/activities/" + self.settings.ippTrkObj.ipp.activityId,
                    dataType: "jsonp",
                    timeout: 1000,
                    success: function(data) {
                        if (typeof data.activities[0].scene != 'undefined') {
                            data.activities[0].lastscene = Number(data.activities[0].scene.name.split('scn')[1]);
                        }
                        if(self.settings.rememberMeFlg){
                            if(self.settings.rememberMeObj.engagement.toastAlert === "true"){
                                var toastAlertTime = 2500;
                                if(typeof self.settings.rememberMeObj.engagement.toastAlertTime != 'undefined' || self.settings.rememberMeObj.engagement.toastAlertTime > 0){
                                    toastAlertTime = self.settings.rememberMeObj.engagement.toastAlertTime*1000;
                                }
                                if($('.restart-resume').children().length > 0){
                                    return;
                                }
                                $('.restart-resume').append('<div>You last viewed this program on </div>' + self.readableDate(data.activities[0].participation.lastEventDate));
                                $('.restart-resume').addClass('is-visible');
                                setTimeout(function(){
                                    $('.restart-resume').addClass('is-invisible');
                                    $('.restart-resume').removeClass('is-visible');
                                }, toastAlertTime);
                            }
                            if(self.settings.rememberMeObj.engagement.defaultStart === "false"){
                                self.getBookmark(data.activities[0]);
                            }
                        }
                    },
                    error: function(data){
                        console.log("ipp last visit call failed");
                    }
                });

                window.addEventListener('load', function(){
                    if($(window).scrollTop() < 25){
                        if(self.settings.scrollIndex !== 0){
                            /* CP Event for Viewing Scene 1*/
                            self.firstSceneTrack();
                        }
                    }
                });
            } catch (err) {
                console.log(err);
            }
        };

    /*=== Re-engagement Rules to redirect user to specific scene: ===*/
        brandAdvance2.getBookmark = function(data) {
            try {
                var self = this;
                if(self.settings.rememberMeObj !== null){
                    for(var prop in self.settings.rememberMeObj.engagement){
                        if(Number(prop.split('scn')[1]) === data.lastscene){
                           self.settings.nextSceneNumber = self.settings.rememberMeObj.engagement[prop].split('scn')[1];
                        }
                    }
                }

                if (typeof data.completion != 'undefined' && $('.scene').length === data.lastscene) {
                    self.eleScrollTopFn('#scene1');
                    if(self.settings.scrollIndex !== 0){
                        self.firstSceneTrack();
                    }

                } else if (typeof data.participation != 'undefined' && $('.scene').length !== data.lastscene) {
                    var sceneNumber = -1;
                    if(self.settings.nextSceneNumber !== 0){
                        sceneNumber = self.settings.nextSceneNumber;
                    } else {
                       sceneNumber = data.lastscene+1;
                    }
                    $('#scene'+ sceneNumber)[0].scrollIntoView();
                    if($('.scene').length !== sceneNumber){
                        document.body.scrollTop -= $('#header').height();
                        document.documentElement.scrollTop -= $('#header').height();
                    }
                    if(sceneNumber !== (self.settings.scrollIndex)+1){

                        /*On scene view: replace cp with console */
                        if(sceneNumber === $('.scene').length){
                            self.lastSceneTrack();

                        } else {

                        /* CP Event for Viewing Scene */
                            if(self.settings.cpEnable){
                                self.cpScene(0, sceneNumber-1);
                                if(self.tracking != 'undefined'){
                                    self.tracking.trackScn(0, sceneNumber-1);
                                }
                            }
                            self.settings.cur_scene = sceneNumber;
                            console.log('Top of Scene: ' + sceneNumber);
                            $(document).trigger('currentScene');
                        }
                        self.settings.scrollIndex = sceneNumber-1;
                    }
                }
            } catch (err) {
                console.log(err);
            }
        };

    /*=== Turn Date Object to Full Month / Day string ===*/
        brandAdvance2.readableDate = function(utc) {
            var utcDate = new Date(Number(utc)).toDateString();
            var utcDateDay = utcDate.split(' ')[0];
            switch (utcDateDay) {
                case "Sun":
                    utcDateDay = "Sunday";
                    break;
                case "Mon":
                    utcDateDay = "Monday";
                    break;
                case "Tue":
                    utcDateDay = "Tuesday";
                    break;
                case "Wed":
                    utcDateDay = "Wednesday";
                    break;
                case "Thu":
                    utcDateDay = "Thursday";
                    break;
                case "Fri":
                    utcDateDay = "Friday";
                    break;
                case "Sat":
                    utcDateDay = "Saturday";
                    break;
            }
            var utcDateMonth = utcDate.split(' ')[1];
            switch (utcDateMonth) {
                case "Jan":
                    utcDateMonth = "January";
                    break;
                case "Feb":
                    utcDateMonth = "February";
                    break;
                case "Mar":
                    utcDateMonth = "March";
                    break;
                case "Apr":
                    utcDateMonth = "April";
                    break;
                case "May":
                    utcDateMonth = "May";
                    break;
                case "Jun":
                    utcDateMonth = "June";
                    break;
                case "Jul":
                    utcDateMonth = "July";
                    break;
                case "Aug":
                    utcDateMonth = "August";
                    break;
                case "Sep":
                    utcDateMonth = "September";
                    break;
                case "Oct":
                    utcDateMonth = "October";
                    break;
                case "Nov":
                    utcDateMonth = "November";
                    break;
                case "Dec":
                    utcDateMonth = "December";
                    break;
            }
            var utcDateStr = utcDate.split(' ')[2];
            if (utcDateStr.length == 2 && utcDateStr[0] == "1") {
                utcDateStr = utcDateStr + "th";
            } else if (utcDateStr[utcDateStr.length - 1].match(/0|4-9/) !== null) {
                utcDateStr = utcDateStr + "th";
            } else if (utcDateStr[utcDateStr.length - 1] == "1") {
                utcDateStr = utcDateStr + "st";
            } else if (utcDateStr[utcDateStr.length - 1] == "2") {
                utcDateStr = utcDateStr + "nd";
            } else if (utcDateStr[utcDateStr.length - 1] == "3") {
                utcDateStr = utcDateStr + "rd";
            }
            return String(utcDateDay + ', ' + utcDateMonth + ' ' + utcDateStr + ', ' + utcDate.split(' ')[3]);
        };

    /*=== ISI anchoring based on scene and data attribute ===*/
        brandAdvance2.isiAnchorFn = function(scene,index){
            if(typeof $('.isi-content') != 'undefined'){
                var isiAnchor = $('[data-anchor='+$(scene[index]).attr('id')+']');
                $('.isi-content')[0].scrollTop = 0;
                if($(isiAnchor).length>0){
                    if($('#header').has('#isi').length > 0){
                        $('.isi-content')[0].scrollTop = $(isiAnchor).position().top - (2*$('.chrome-header').height());
                    } else {
                       $('.isi-content')[0].scrollTop = $(isiAnchor).position().top;
                    }
                }
            }
        };

    /*=== Function to track jump links ===*/
        brandAdvance2.trackJumpLinks = function(){
            var self = this;
            $('a').each(function(index, el) {
                var jumpLinks = this.href;
                if(jumpLinks.indexOf(self.settings.originUrl) > -1){
                    if(!$(this).hasClass('js-expandable-button')){
                        var sceneNumber = $(this).data('jump-scene');
                        $(this).on('click', function(event) {
                            event.preventDefault();
                            self.eleScrollTopFn(this.hash);

                            /*On scene view: replace cp with console */
                            if(sceneNumber === $('.scene').length){
                                self.lastSceneTrack();
                            } else {

                            /* CP Event for Viewing Scene */
                                if(self.settings.cpEnable){
                                    self.cpScene(0, sceneNumber-1);
                                    if(self.tracking != 'undefined'){
                                        self.tracking.trackScn(0, sceneNumber-1);
                                    }
                                }
                                self.settings.cur_scene = sceneNumber;
                                console.log('Top of Scene: ' + sceneNumber);
                                $(document).trigger('currentScene');
                            }
                            self.settings.scrollIndex = sceneNumber-1;
                        });
                    }
                }
            });
        };

    /*=== Function to track jump links ===*/
        brandAdvance2.directLinkFn = function(){
            var directSceneObj = window.location.href.split('&');
            for (var prop in directSceneObj){
                if (directSceneObj[prop].indexOf('scene')>-1){
                    var sceneIndex = Number(directSceneObj[prop].split('=')[1]);
                    return sceneIndex;
                }
            }
        };

    /*=== Function to adjust element scrollTop to header ===*/
        brandAdvance2.eleScrollTopFn = function(element){
            $(element)[0].scrollIntoView();
            document.body.scrollTop -= $('#header').height();
            document.documentElement.scrollTop -= $('#header').height();
        };

    /*=== Function to track first scene ===*/
        brandAdvance2.firstSceneTrack = function(){
            var self = this;
            $(document).on ('mozfullscreenchange webkitfullscreenchange MSFullscreenChange fullscreenchange',function(e){
                self.settings.isFullScreen = true;
            });
            if($('.isi').hasClass('is-expanded') || self.settings.isFullScreen){
                return;
            }

            /* CP Event for Viewing Scene 1*/
            var fullscreenState = document.fullScreen || document.mozFullScreen || document.webkitIsFullScreen;
            if(fullscreenState){} else {
                if(self.settings.cpEnable){
                    self.cpScene(0, 0);
                    if(self.tracking != 'undefined'){
                        self.tracking.trackScn(0, 0);
                    }
                }
                self.settings.cur_scene = 1;
                console.log('Top of Scene: 1');
                $(document).trigger('currentScene');
                self.settings.scrollIndex = 0;
            }
        };

    /*=== Function to track last scene ===*/
        brandAdvance2.lastSceneTrack = function(){
            var self = this,
                lastScene = $('.scene').length;

            /* CP Event On viewing of last scene in the program: */
            if(self.settings.cpEnable){
                self.cpScene(0, lastScene-1);
                self.cpLastScene();
            }

            /* IPP Event On viewing of last scene in the program: */
            if(self.settings.ippEnable){
                self.trackIpp('endActivity');
                if(self.tracking != 'undefined'){
                    self.tracking.trackScn(0, lastScene-1);
                }
            }
            self.settings.cur_scene = lastScene;
            console.log("Top of Last Scene ");
            $(document).trigger('currentScene');
        };

    /*=== Binds hideIsi and unHideIsi to input elements ===*/
        brandAdvance2.inputIsiBind = function(){
            var self = this;
            $('input').each(function(index, el) {
                el.addEventListener("focus", function(){
                    self.hideIsiOnMobile();
                });
                el.addEventListener("blur", function(){
                    self.unHideIsiOnMobile();
                });
            });
        };


    /*=== Hides Element with ID of ISI ===*/
        brandAdvance2.hideIsiOnMobile = function(){
            if (window.matchMedia("(max-width: 800px)").matches){
                $('.isi').hide();
                /* This code targets the app to fix the header issue: PPE-58027 */
                if(this.settings.app > 0){
                    $('#header').css("position", "absolute");
                }
            }
        };


    /*=== UnHides Element with ID of ISI ===*/
        brandAdvance2.unHideIsiOnMobile = function(){
            if (window.matchMedia("(max-width: 800px)").matches){
                $('.isi').show();
                /* This code targets the app to fix the header issue: PPE-58027 */
                if(this.settings.app > 0){
                    $('#header').css("position", "fixed");
                }
            }
        };

    /*===== End Functions ======*/
  return brandAdvance2;
};
