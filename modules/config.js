if (typeof window.medscape == 'undefined') {
	window.medscape = {};
}
window.medscape.core = {};
window.medscape.core.isApp = navigator.userAgent.toLowerCase().match('medscape') != null;
window.medscape.core.env = "";
if (window.location.href.indexOf(".staging.") != -1) {
	window.medscape.core.env = ".staging";
}
else if (window.location.href.indexOf(".proddev.") != -1) {
	window.medscape.core.env = ".proddev";
}
if (window.location.href.match(/\.qa\d\d/) != null) {
	window.medscape.core.env = window.medscape.core.env + window.location.href.match(/\.qa\d\d/)[0];
}

var baseUrl;
if(window.medscape.core.env) {
  baseUrl = 'http://img' +
    window.medscape.core.env + '.medscapestatic.com/pi/scripts/corelib16-video-integration/build';
} else {
  baseUrl = '/build';
}

require.config({

	waitSeconds : 30,
  baseUrl: baseUrl,


	// All Library and module paths
	paths : {

		// EXTERNAL LIBRARIES
		underscore:'../ext_libraries/underscore/underscore',
		jquery : "../ext_libraries/00-jquery1x/jquery-1.10.2",
		modernizr:"../ext_libraries/modernizr/modernizr.custom.43687",
		x2js:"../ext_libraries/parsing/x2js/xml2json.min",
		knockout:"../ext_libraries/knockout/knockout-2.3.0",
		i18n:"../ext_libraries/require/i18n",
		tweenmax:"../ext_libraries/greensocks/TweenMax.min",
		timelinemax:"../ext_libraries/greensocks/TimelineMax.min",
		hammer:"../ext_libraries/hammer/jquery.hammer.min",
		lazyload:"../ext_libraries/lazyload/jquery.lazyload.min",
		videojs:"../ext_libraries/videojs/video",
		scrollto:"../ext_libraries/greensocks/plugins/ScrollToPlugin.min",

		// MD5 hash generator / IE 8/below JSON.parse/stringify
		md5:"../ext_libraries/cryptojs/md5",
		json2:"../ext_libraries/json2/json2",

		// QnA module libraries (All plugins are inserted into this file)
		jqplot: "../ext_libraries/jqplot/jquery.jqplot.min",

    // prefer lodash to underscore, also require underscore by name
    screenfull: '../ext_libraries/screenfull/screenfull',
    _:          '../ext_libraries/lodash/lodash',
    react:      '../ext_libraries/react/react-with-addons',
    reflux:     '../ext_libraries/reflux/dist/reflux',
    classnames: '../ext_libraries/classnames/index',
    event:      '../ext_libraries/event-emitter/dist/EventEmitter',

    // AMP stuff
    amp:       '../ext_libraries/amp-premier/amp.premier',


		// INTERNAL MODULES
		slideshow : '../products/slideshow/build/slideshow',
		brandplay : '../products/brandplay/js/brandplay',
		Ads : 'ads/profads1',
		StandardModule : 'definitions/standardmodule',
		Swipeset : 'controllers/swipeset',
		Pinchzoom : 'view/pinchzoom',
		Tracking : 'tracking/tracking',
		Heartbeat : 'tracking/heartbeat',
		ImageResizer : 'view/imageResizer',
		Util : 'controllers/util',
		Qna : 'qna/qna',
		QnaRadio : 'qna/qnaRadio',
		QnaCheckbox : 'qna/qnaCheckbox',
		ChartBuilder : 'qna/chartBuilder',
		DataParserMin : 'parsers/dataparserMin',
		VideoPlayer : 'view/videoplayer',
		stickyheader: '../products/slideshow/instances/stickyheader'
	},
	 shim:{
        'underscore': {
            exports: '_'
        },
        'modernizr': {
            exports: 'Modernizr'
        },
        'x2js': {
            exports: 'X2JS'
        },
        'dust': {
            exports: 'dust'
        },
        'tweenmax': {
            exports: 'TweenMax'
        },
        'tweenlite': {
            exports: 'TweenLite'
        },
        'timelinelite': {
            exports: 'TimelineLite'
        },
        'timelinemax': {
            exports: 'TimelineMax'
        },
        'hammer': {
            exports: 'Hammer'
        },
        'scrollto': {
            exports: 'Scrollto'
        },
		'jqplot' : {
			deps: ['jquery']
		},
		'jqplotBar' : {
			deps: ['jqplot']
		},
		'jqplotLabels' : {
			deps: ['jqplot']
		},
		'jqplotPointLabels' : {
			deps: ['jqplot']
		},
		'excanvas' : {
			deps : ['jqplot']
		},
		'lazyload' : {
			deps : ['jquery'],
			exports: 'jQuery.fn.lazyload'
		},

		// Slideshow
		slideshow : {
			deps: ['jquery', 'modernizr', 'underscore']
		},

		// Brandplay
		brandplay : {
			deps: ['jquery', 'modernizr', 'underscore']
		},

    }
});
