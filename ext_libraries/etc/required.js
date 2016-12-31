/*!Last Updated: 03.10.2014[01.04.19] by Jonathan Robles*/
/*!*/
/*!***********************************************/
/*!  __  __        _                             */
/*! |  \/  |___ __| |___ __ __ _ _ __  ___       */
/*! | |\/| / -_) _` (_-</ _/ _` | '_ \/ -_)      */
/*! |_|  |_\___\__,_/__/\__\__,_| .__/\___|      */
/*!                             |_|              */
/*! required MODULE */                           
/*! by Jonathan Robles for WEBMD/Medscape 2013   */
/*!                                              */
/*!***********************************************/
/*!CLX*/
/*!*/
/*!*/
/*!*/
/*!*/
/*!*/
/*!Last Updated: 03.10.2014[01.04.19] by Jonathan Robles*/
if (typeof Object.create !== "function") {
    Object.create = function(o) {
        function F() {}
        F.prototype = o;
        return new F();
    };
}

(function() {
    var lastTime = 0;
    var vendors = [ "ms", "moz", "webkit", "o" ];
    for (var x = 0; x < vendors.length && !window.requestAnimationFrame; ++x) {
        window.requestAnimationFrame = window[vendors[x] + "RequestAnimationFrame"];
        window.cancelAnimationFrame = window[vendors[x] + "CancelAnimationFrame"] || window[vendors[x] + "CancelRequestAnimationFrame"];
    }
    if (!window.requestAnimationFrame) {
        window.requestAnimationFrame = function(callback, element) {
            var currTime = new Date().getTime();
            var timeToCall = Math.max(0, 16 - (currTime - lastTime));
            var id = window.setTimeout(function() {
                callback(currTime + timeToCall);
            }, timeToCall);
            lastTime = currTime + timeToCall;
            return id;
        };
    }
    if (!window.cancelAnimationFrame) {
        window.cancelAnimationFrame = function(id) {
            clearTimeout(id);
        };
    }
})();

(function() {
    if (!window.console) {
        window.console = {};
    }
    var m = [ "log", "info", "warn", "error", "debug", "trace", "dir", "group", "groupCollapsed", "groupEnd", "time", "timeEnd", "profile", "profileEnd", "dirxml", "assert", "count", "markTimeline", "timeStamp", "clear" ];
    for (var i = 0; i < m.length; i++) {
        if (!window.console[m[i]]) {
            window.console[m[i]] = function() {};
        }
    }
})();

_notify = function() {
    var debug = function() {};
    var components = {};
    var broadcast = function(event, args, source) {
        if (!event) {
            return;
        }
        args = args || [];
        for (var c in components) {
            if (typeof components[c]["on" + event] == "function") {
                try {
                    source = source || components[c];
                    components[c]["on" + event].apply(source, args);
                } catch (err) {
                    debug([ "Mediator error.", event, args, source, err ].join(" "));
                }
            }
        }
    };
    var addComponent = function(name, component, replaceDuplicate) {
        if (name in components) {
            if (replaceDuplicate) {
                removeComponent(name);
            } else {
                throw new Error("The object: " + name + " has already applied listeners");
            }
        }
        components[name] = component;
    };
    var removeComponent = function(name) {
        if (name in components) {
            delete components[name];
        }
    };
    var getComponent = function(name) {
        return components[name];
    };
    var contains = function(name) {
        return name in components;
    };
    return {
        name: "Mediator",
        broadcast: broadcast,
        add: addComponent,
        rem: removeComponent,
        get: getComponent,
        has: contains
    };
}();

_notify.add("global", function() {
    var tracecount = 0;
    var alertcount = 0;
    return {
        onTrace: function(o) {
            tracecount++;
            var datastring = o.data;
            if (typeof datastring == "object") {
                datastring = JSON.stringify(datastring);
            }
            var buildstring = "[" + String(tracecount) + "] (" + o.senderID + ":" + o.sendertype + ":" + o.notifyscope + ") > " + datastring;
            console.log(buildstring);
        },
        onAlert: function(o) {
            alertcount++;
            var datastring = o.data;
            if (typeof datastring == "object") {
                datastring = JSON.stringify(datastring);
            }
            var buildstring = "[" + String(tracecount) + "] (" + o.senderID + ":" + o.sendertype + ":" + o.notifyscope + ") > " + datastring;
            alert(buildstring);
        },
        onInitialize: function(o) {
            console.log("Created Instance #" + o.senderID + " type:" + o.sendertype + " by " + o.data.author + " [notifyscope:" + o.notifyscope + "]");
        },
        onOrientation: function(o) {
            window._global$.addorientationtohtml(o);
        }
    };
}());

require([ "modernizr", "jquery", "underscore" ], function(Modernizr, $, _) {
    function CorePlayerBase() {
        if (arguments.callee._singletonInstance) {
            return arguments.callee._singletonInstance;
        }
        arguments.callee._singletonInstance = this;
        var parent = this;
        var debouncetimeout = 250;
        this.lastscrollpositionX = 0;
        this.lastscrollpositionY = 0;
        this.orientation = "notset";
        this.windowHeight = undefined;
        this.windowWidth = undefined;
        this.documentHeight = undefined;
        this.documentWidth = undefined;
        this.screenHeight = undefined;
        this.screenWidth = undefined;
        this.isMobile = Modernizr.mq("only screen and (min-device-width : 320px) and (max-device-width : 480px)");
        this.isTouch = Modernizr.touch;
        this.host = location.host;
        this.addorientationtohtml = function(o) {
            if (o.data == "portrait") {
                $("html").addClass("portrait");
                $("html").removeClass("landscape");
            } else {
                $("html").addClass("landscape");
                $("html").removeClass("portrait");
            }
        };
        this.setOrientation = function() {
            var candidate = "portrait";
            this.setWindowHeight();
            this.setWindowWidth();
            if (this.windowWidth > this.windowHeight) {
                candidate = "landscape";
            }
            this._isupdated("orientation", candidate, "Orientation");
        };
        this.setWindowHeight = function() {
            this._isupdated("windowHeight", $(window).height(), "WindowHeight");
        };
        this.setWindowWidth = function() {
            this._isupdated("windowWidth", $(window).width(), "WindowWidth");
        };
        this.setDocumentHeight = function() {
            this._isupdated("documentHeight", $(document).height(), "DocumentHeight");
        };
        this.setDocumentWidth = function() {
            this._isupdated("documentWidth", $(document).width(), "DocumentWidth");
        };
        this.setScreenHeight = function() {
            this._isupdated("screenHeight", screen.height, "ScreenHeight");
        };
        this.setScreenWidth = function() {
            this._isupdated("screenWidth", screen.width, "ScreenWidth");
        };
        this.setLastScrollposition = function() {
            var newXval = $(window).scrollLeft();
            var newYval = $(window).scrollTop();
            if (newYval > parent.lastscrollpositionY) {
                $("html").addClass("scrolldown");
                $("html").removeClass("scrollup");
            }
            if (newYval < parent.lastscrollpositionY) {
                $("html").addClass("scrollup");
                $("html").removeClass("scrolldown");
            }
            if (newXval > parent.lastscrollpositionX) {
                $("html").addClass("scrollright");
                $("html").removeClass("scrollleft");
            }
            if (newXval < parent.lastscrollpositionX) {
                $("html").addClass("scrollleft");
                $("html").removeClass("scrollright");
            }
            this._isupdated("lastscrollpositionX", newXval, "LastXscroll");
            this._isupdated("lastscrollpositionY", newYval, "LastYscroll");
        };
        this.jsonpReturn = function(id, type, notifyscope) {
            return function(data) {
                _notify.broadcast(type, [ {
                    senderID: id,
                    sendertype: type,
                    notifyscope: notifyscope,
                    data: data
                } ]);
            };
        };
        this._isupdated = function(value, currentVal, notify) {
            if (parent[value] != currentVal) {
                var Oldvalue = parent[value];
                parent[value] = currentVal;
                if (Oldvalue != undefined) {
                    this.notify(notify, parent[value]);
                }
            }
        };
        this.notify = function(type, data) {
            _notify.broadcast(type, [ {
                senderID: "global",
                sendertype: "global",
                notifyscope: "global",
                data: data
            } ]);
        };
        this.getQuery = function(variable) {
            var query = window.location.search.substring(1);
            var vars = query.split("&");
            for (var i = 0; i < vars.length; i++) {
                var pair = vars[i].split("=");
                if (pair[0] == variable) {
                    var returncandidate = pair[1];
                    if (returncandidate == "true" || returncandidate == "yes" || returncandidate == "y" || returncandidate == "t") {
                        returncandidate = true;
                    }
                    if (returncandidate == "false" || returncandidate == "no" || returncandidate == "n" || returncandidate == "f") {
                        returncandidate = false;
                    }
                    return returncandidate;
                }
            }
            return false;
        };
        this.getHash = function(variable) {
            return window.location.hash;
        };
        this.setCookie = function(key, value) {
            var expires = new Date();
            expires.setTime(expires.getTime() + 1 * 24 * 60 * 60 * 1e3);
            document.cookie = key + "=" + value + ";expires=" + expires.toUTCString();
        };
        this.getCookie = function(key) {
            var keyValue = document.cookie.match("(^|;) ?" + key + "=([^;]*)(;|$)");
            return keyValue ? keyValue[2] : null;
        };
        $(window).scroll(_.debounce(function(event) {
            parent.setLastScrollposition();
        }, debouncetimeout));
        $(window).on("resize", _.debounce(function(event) {
            parent.setOrientation();
        }, debouncetimeout));
    }
    window._global$ = new CorePlayerBase();
    window._global$.setOrientation();
    window._global$.setDocumentHeight();
    window._global$.setDocumentWidth();
    window._global$.setScreenHeight();
    window._global$.setScreenWidth();
});
