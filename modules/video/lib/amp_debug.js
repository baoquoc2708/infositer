define(
	function(require) {

		Array.prototype.indexOf||(Array.prototype.indexOf=function(c,a){if(void 0===this||null===this)throw new TypeError('"this" is null or not defined');var b=this.length>>>0;a=+a||0;Infinity===Math.abs(a)&&(a=0);0>a&&(a+=b,0>a&&(a=0));for(;a<b;a++)if(this[a]===c)return a;return-1});
		Date.now||(Date.now=function(){return +new Date});
		if(!Function.prototype.bind){Function.prototype.bind=function(e){function s(){}if(typeof this!=="function"){throw new TypeError("Bind must be called on a function")}var t=[].slice,n=t.call(arguments,1),r=this,i=function(){return r.apply(this instanceof s?this:e||{},n.concat(t.call(arguments)))};s.prototype=r.prototype;i.prototype=new s;return i}}
		if(typeof JSON!=="object"){JSON={}}(function(){function f(n){return n<10?"0"+n:n}if(typeof Date.prototype.toJSON!=="function"){Date.prototype.toJSON=function(key){return isFinite(this.valueOf())?this.getUTCFullYear()+"-"+f(this.getUTCMonth()+1)+"-"+f(this.getUTCDate())+"T"+f(this.getUTCHours())+":"+f(this.getUTCMinutes())+":"+f(this.getUTCSeconds())+"Z":null};String.prototype.toJSON=Number.prototype.toJSON=Boolean.prototype.toJSON=function(key){return this.valueOf()}}var cx=/[\u0000\u00ad\u0600-\u0604\u070f\u17b4\u17b5\u200c-\u200f\u2028-\u202f\u2060-\u206f\ufeff\ufff0-\uffff]/g,escapable=/[\\\"\x00-\x1f\x7f-\x9f\u00ad\u0600-\u0604\u070f\u17b4\u17b5\u200c-\u200f\u2028-\u202f\u2060-\u206f\ufeff\ufff0-\uffff]/g,gap,indent,meta={"\b":"\\b","\t":"\\t","\n":"\\n","\f":"\\f","\r":"\\r",'"':'\\"',"\\":"\\\\"},rep;function quote(string){escapable.lastIndex=0;return escapable.test(string)?'"'+string.replace(escapable,function(a){var c=meta[a];return typeof c==="string"?c:"\\u"+("0000"+a.charCodeAt(0).toString(16)).slice(-4)})+'"':'"'+string+'"'}function str(key,holder){var i,k,v,length,mind=gap,partial,value=holder[key];if(value&&typeof value==="object"&&typeof value.toJSON==="function"){value=value.toJSON(key)}if(typeof rep==="function"){value=rep.call(holder,key,value)}switch(typeof value){case"string":return quote(value);case"number":return isFinite(value)?String(value):"null";case"boolean":case"null":return String(value);case"object":if(!value){return"null"}gap+=indent;partial=[];if(Object.prototype.toString.apply(value)==="[object Array]"){length=value.length;for(i=0;i<length;i+=1){partial[i]=str(i,value)||"null"}v=partial.length===0?"[]":gap?"[\n"+gap+partial.join(",\n"+gap)+"\n"+mind+"]":"["+partial.join(",")+"]";gap=mind;return v}if(rep&&typeof rep==="object"){length=rep.length;for(i=0;i<length;i+=1){if(typeof rep[i]==="string"){k=rep[i];v=str(k,value);if(v){partial.push(quote(k)+(gap?": ":":")+v)}}}}else{for(k in value){if(Object.prototype.hasOwnProperty.call(value,k)){v=str(k,value);if(v){partial.push(quote(k)+(gap?": ":":")+v)}}}}v=partial.length===0?"{}":gap?"{\n"+gap+partial.join(",\n"+gap)+"\n"+mind+"}":"{"+partial.join(",")+"}";gap=mind;return v}}if(typeof JSON.stringify!=="function"){JSON.stringify=function(value,replacer,space){var i;gap="";indent="";if(typeof space==="number"){for(i=0;i<space;i+=1){indent+=" "}}else{if(typeof space==="string"){indent=space}}rep=replacer;if(replacer&&typeof replacer!=="function"&&(typeof replacer!=="object"||typeof replacer.length!=="number")){throw new Error("JSON.stringify")}return str("",{"":value})}}if(typeof JSON.parse!=="function"){JSON.parse=function(text,reviver){var j;function walk(holder,key){var k,v,value=holder[key];if(value&&typeof value==="object"){for(k in value){if(Object.prototype.hasOwnProperty.call(value,k)){v=walk(value,k);if(v!==undefined){value[k]=v}else{delete value[k]}}}}return reviver.call(holder,key,value)}text=String(text);cx.lastIndex=0;if(cx.test(text)){text=text.replace(cx,function(a){return"\\u"+("0000"+a.charCodeAt(0).toString(16)).slice(-4)})}if(/^[\],:{}\s]*$/.test(text.replace(/\\(?:["\\\/bfnrt]|u[0-9a-fA-F]{4})/g,"@").replace(/"[^"\\\n\r]*"|true|false|null|-?\d+(?:\.\d*)?(?:[eE][+\-]?\d+)?/g,"]").replace(/(?:^|:|,)(?:\s*\[)+/g,""))){j=eval("("+text+")");return typeof reviver==="function"?walk({"":j},""):j}throw new SyntaxError("JSON.parse")}}}());
		(function(n){function i(a,d){this.setNotifyMethod(a);this.setNotifyContext(d)}function j(a,d,b){this.name=a;this.body=d;this.type=b}function k(){}function m(){}function l(){this.subCommands=[];this.initializeMacroCommand()}function g(a,d){this.mediatorName=a||this.constructor.NAME;this.viewComponent=d}function h(a,d){this.proxyName=a||this.constructor.NAME;null!=d&&this.setData(d)}function b(a){if(null!=b.instanceMap[a])throw Error(b.MULTITON_MSG);this.initializeNotifier(a);b.instanceMap[a]=this;
			this.initializeFacade()}function c(a){if(null!=c.instanceMap[a])throw Error(c.MULTITON_MSG);this.multitonKey=a;c.instanceMap[this.multitonKey]=this;this.mediatorMap=[];this.observerMap=[];this.initializeView()}function e(a){if(e.instanceMap[a])throw Error(e.MULTITON_MSG);this.multitonKey=a;e.instanceMap[a]=this;this.proxyMap=[];this.initializeModel()}function f(a){if(null!=f.instanceMap[a])throw Error(f.MULTITON_MSG);this.multitonKey=a;f.instanceMap[this.multitonKey]=this;this.commandMap=[];this.initializeController()}
			function p(a,d,b){for(var a=a.split("."),b=b||o.global,c,e,f=0,g=a.length;f<g;f++)c=b,e=a[f],b=null==b[e]?b[e]={}:b[e];return null==d?b:c[e]=d}null==n&&(n=window);if(!n.puremvc){i.prototype.setNotifyMethod=function(a){this.notify=a};i.prototype.setNotifyContext=function(a){this.context=a};i.prototype.getNotifyMethod=function(){return this.notify};i.prototype.getNotifyContext=function(){return this.context};i.prototype.notifyObserver=function(a){this.getNotifyMethod().call(this.getNotifyContext(),
				a)};i.prototype.compareNotifyContext=function(a){return a===this.context};i.prototype.notify=null;i.prototype.context=null;j.prototype.getName=function(){return this.name};j.prototype.setBody=function(a){this.body=a};j.prototype.getBody=function(){return this.body};j.prototype.setType=function(a){this.type=a};j.prototype.getType=function(){return this.type};j.prototype.toString=function(){var a="Notification Name: "+this.getName(),a=a+("\nBody:"+(null==this.body?"null":this.body.toString()));return a+=
				"\nType:"+(null==this.type?"null":this.type)};j.prototype.name=null;j.prototype.type=null;j.prototype.body=null;k.prototype.sendNotification=function(a,d,b){var c=this.getFacade();c&&c.sendNotification(a,d,b)};k.prototype.initializeNotifier=function(a){this.multitonKey=""+a;this.facade=this.getFacade()};k.prototype.getFacade=function(){if(null==this.multitonKey)throw Error(k.MULTITON_MSG);return b.getInstance(this.multitonKey)};k.prototype.multitonKey=null;k.MULTITON_MSG="multitonKey for this Notifier not yet initialized!";
				m.prototype=new k;m.prototype.constructor=m;m.prototype.execute=function(){};l.prototype=new k;l.prototype.constructor=l;l.prototype.subCommands=null;l.prototype.initializeMacroCommand=function(){};l.prototype.addSubCommand=function(a){this.subCommands.push(a)};l.prototype.execute=function(a){for(;0<this.subCommands.length;){var d=new (this.subCommands.shift());d.initializeNotifier(this.multitonKey);d.execute(a)}};g.NAME="Mediator";g.prototype=new k;g.prototype.constructor=g;g.prototype.getMediatorName=
					function(){return this.mediatorName};g.prototype.setViewComponent=function(a){this.viewComponent=a};g.prototype.getViewComponent=function(){return this.viewComponent};g.prototype.listNotificationInterests=function(){return[]};g.prototype.handleNotification=function(){};g.prototype.onRegister=function(){};g.prototype.onRemove=function(){};g.prototype.mediatorName=null;g.prototype.viewComponent=null;h.NAME="Proxy";h.prototype=new k;h.prototype.constructor=h;h.prototype.getProxyName=function(){return this.proxyName};
				h.prototype.setData=function(a){this.data=a};h.prototype.getData=function(){return this.data};h.prototype.onRegister=function(){};h.prototype.onRemove=function(){};h.prototype.proxyName=null;h.prototype.data=null;b.prototype.initializeFacade=function(){this.initializeModel();this.initializeController();this.initializeView()};b.getInstance=function(a){if(null==a)return null;null==b.instanceMap[a]&&(b.instanceMap[a]=new b(a));return b.instanceMap[a]};b.prototype.initializeController=function(){if(null==
					this.controller)this.controller=f.getInstance(this.multitonKey)};b.prototype.initializeModel=function(){if(null==this.model)this.model=e.getInstance(this.multitonKey)};b.prototype.initializeView=function(){if(null==this.view)this.view=c.getInstance(this.multitonKey)};b.prototype.registerCommand=function(a,d){this.controller.registerCommand(a,d)};b.prototype.removeCommand=function(a){this.controller.removeCommand(a)};b.prototype.hasCommand=function(a){return this.controller.hasCommand(a)};b.prototype.registerProxy=
					function(a){this.model.registerProxy(a)};b.prototype.retrieveProxy=function(a){return this.model.retrieveProxy(a)};b.prototype.removeProxy=function(a){var d=null;null!=this.model&&(d=this.model.removeProxy(a));return d};b.prototype.hasProxy=function(a){return this.model.hasProxy(a)};b.prototype.registerMediator=function(a){null!=this.view&&this.view.registerMediator(a)};b.prototype.retrieveMediator=function(a){return this.view.retrieveMediator(a)};b.prototype.removeMediator=function(a){var d=null;
					null!=this.view&&(d=this.view.removeMediator(a));return d};b.prototype.hasMediator=function(a){return this.view.hasMediator(a)};b.prototype.sendNotification=function(a,d,b){this.notifyObservers(new j(a,d,b))};b.prototype.notifyObservers=function(a){null!=this.view&&this.view.notifyObservers(a)};b.prototype.initializeNotifier=function(a){this.multitonKey=a};b.hasCore=function(a){return null!=b.instanceMap[a]};b.removeCore=function(a){null!=b.instanceMap[a]&&(e.removeModel(a),c.removeView(a),f.removeController(a),
					delete b.instanceMap[a])};b.prototype.controller=null;b.prototype.model=null;b.prototype.view=null;b.prototype.multitonKey=null;b.instanceMap=[];b.MULTITON_MSG="Facade instance for this Multiton key already constructed!";c.prototype.initializeView=function(){};c.getInstance=function(a){if(null==a)return null;null==c.instanceMap[a]&&(c.instanceMap[a]=new c(a));return c.instanceMap[a]};c.prototype.registerObserver=function(a,d){null!=this.observerMap[a]?this.observerMap[a].push(d):this.observerMap[a]=
					[d]};c.prototype.notifyObservers=function(a){if(null!=this.observerMap[a.getName()]){for(var d=this.observerMap[a.getName()],b=[],c,e=0;e<d.length;e++)c=d[e],b.push(c);for(e=0;e<b.length;e++)c=b[e],c.notifyObserver(a)}};c.prototype.removeObserver=function(a,d){for(var b=this.observerMap[a],c=0;c<b.length;c++)if(!0==b[c].compareNotifyContext(d)){b.splice(c,1);break}0==b.length&&delete this.observerMap[a]};c.prototype.registerMediator=function(a){if(null==this.mediatorMap[a.getMediatorName()]){a.initializeNotifier(this.multitonKey);
					this.mediatorMap[a.getMediatorName()]=a;var d=a.listNotificationInterests();if(0<d.length)for(var b=new i(a.handleNotification,a),c=0;c<d.length;c++)this.registerObserver(d[c],b);a.onRegister()}};c.prototype.retrieveMediator=function(a){return this.mediatorMap[a]};c.prototype.removeMediator=function(a){var d=this.mediatorMap[a];if(d){for(var b=d.listNotificationInterests(),c=0;c<b.length;c++)this.removeObserver(b[c],d);delete this.mediatorMap[a];d.onRemove()}return d};c.prototype.hasMediator=function(a){return null!=
					this.mediatorMap[a]};c.removeView=function(a){delete c.instanceMap[a]};c.prototype.mediatorMap=null;c.prototype.observerMap=null;c.instanceMap=[];c.prototype.multitonKey=null;c.MULTITON_MSG="View instance for this Multiton key already constructed!";e.prototype.initializeModel=function(){};e.getInstance=function(a){if(null==a)return null;null==e.instanceMap[a]&&(e.instanceMap[a]=new e(a));return e.instanceMap[a]};e.prototype.registerProxy=function(a){a.initializeNotifier(this.multitonKey);this.proxyMap[a.getProxyName()]=
					a;a.onRegister()};e.prototype.retrieveProxy=function(a){return this.proxyMap[a]};e.prototype.hasProxy=function(a){return null!=this.proxyMap[a]};e.prototype.removeProxy=function(a){var b=this.proxyMap[a];b&&(this.proxyMap[a]=null,b.onRemove());return b};e.removeModel=function(a){delete e.instanceMap[a]};e.prototype.proxyMap=null;e.instanceMap=[];e.MULTITON_MSG="Model instance for this Multiton key already constructed!";f.prototype.initializeController=function(){this.view=c.getInstance(this.multitonKey)};
				f.getInstance=function(a){if(null==a)return null;null==this.instanceMap[a]&&(this.instanceMap[a]=new this(a));return this.instanceMap[a]};f.prototype.executeCommand=function(a){var b=this.commandMap[a.getName()];null!=b&&(b=new b,b.initializeNotifier(this.multitonKey),b.execute(a))};f.prototype.registerCommand=function(a,b){null==this.commandMap[a]&&this.view.registerObserver(a,new i(this.executeCommand,this));this.commandMap[a]=b};f.prototype.hasCommand=function(a){return null!=this.commandMap[a]};
				f.prototype.removeCommand=function(a){this.hasCommand(a)&&(this.view.removeObserver(a,this),this.commandMap[a]=null)};f.removeController=function(a){delete this.instanceMap[a]};f.prototype.view=null;f.prototype.commandMap=null;f.prototype.multitonKey=null;f.instanceMap=[];f.MULTITON_MSG="controller key for this Multiton key already constructed";var o={global:function(){return this}(),extend:function(a,b){if("function"!==typeof a)throw new TypeError("#extend- child should be Function");if("function"!==
					typeof b)throw new TypeError("#extend- parent should be Function");if(b!==a){var c=new Function;c.prototype=b.prototype;a.prototype=new c;return a.prototype.constructor=a}},decorate:function(a,b){for(var c in b)a[c]=b[c];return a}};n.puremvc={View:c,Model:e,Controller:f,SimpleCommand:m,MacroCommand:l,Facade:b,Mediator:g,Observer:i,Notification:j,Notifier:k,Proxy:h,define:function(a,b,c){a||(a={});var e=a.name,f=a.parent,g="function"===typeof f,h=a.scope||null;if("parent"in a&&!g)throw new TypeError("Class parent must be Function");
					if(a.hasOwnProperty("constructor")){if(a=a.constructor,"function"!==typeof a)throw new TypeError("Class constructor must be Function");}else a=g?function(){f.apply(this,arguments)}:new Function;g&&o.extend(a,f);if(b)g=a.prototype,o.decorate(g,b),g.constructor=a;c&&o.decorate(a,c);if(e){if("string"!==typeof e)throw new TypeError("Class name must be primitive string");p(e,a,h)}return a},declare:p}}})(this);
		/*	SWFObject v2.2 <http://code.google.com/p/swfobject/>
		 is released under the MIT License <http://www.opensource.org/licenses/mit-license.php>
		 */
		var swfobject=function(){function u(){if(!v){try{var a=d.getElementsByTagName("body")[0].appendChild(d.createElement("span"));a.parentNode.removeChild(a)}catch(b){return}v=!0;for(var a=z.length,c=0;c<a;c++)z[c]()}}function M(a){v?a():z[z.length]=a}function N(a){if("undefined"!=typeof n.addEventListener)n.addEventListener("load",a,!1);else if("undefined"!=typeof d.addEventListener)d.addEventListener("load",a,!1);else if("undefined"!=typeof n.attachEvent)U(n,"onload",a);else if("function"==typeof n.onload){var b=
			n.onload;n.onload=function(){b();a()}}else n.onload=a}function V(){var a=d.getElementsByTagName("body")[0],b=d.createElement("object");b.setAttribute("type","application/x-shockwave-flash");var c=a.appendChild(b);if(c){var f=0;(function(){if("undefined"!=typeof c.GetVariable){var g=c.GetVariable("$version");g&&(g=g.split(" ")[1].split(","),e.pv=[parseInt(g[0],10),parseInt(g[1],10),parseInt(g[2],10)])}else if(10>f){f++;setTimeout(arguments.callee,10);return}a.removeChild(b);c=null;E()})()}else E()}
			function E(){var a=r.length;if(0<a)for(var b=0;b<a;b++){var c=r[b].id,f=r[b].callbackFn,g={success:!1,id:c};if(0<e.pv[0]){var d=p(c);if(d)if(!A(r[b].swfVersion)||e.wk&&312>e.wk)if(r[b].expressInstall&&F()){g={};g.data=r[b].expressInstall;g.width=d.getAttribute("width")||"0";g.height=d.getAttribute("height")||"0";d.getAttribute("class")&&(g.styleclass=d.getAttribute("class"));d.getAttribute("align")&&(g.align=d.getAttribute("align"));for(var h={},d=d.getElementsByTagName("param"),k=d.length,l=0;l<
				k;l++)"movie"!=d[l].getAttribute("name").toLowerCase()&&(h[d[l].getAttribute("name")]=d[l].getAttribute("value"));G(g,h,c,f)}else W(d),f&&f(g);else w(c,!0),f&&(g.success=!0,g.ref=H(c),f(g))}else w(c,!0),f&&((c=H(c))&&"undefined"!=typeof c.SetVariable&&(g.success=!0,g.ref=c),f(g))}}function H(a){var b=null;(a=p(a))&&"OBJECT"==a.nodeName&&("undefined"!=typeof a.SetVariable?b=a:(a=a.getElementsByTagName("object")[0])&&(b=a));return b}function F(){return!B&&A("6.0.65")&&(e.win||e.mac)&&!(e.wk&&312>e.wk)}
			function G(a,b,c,f){B=!0;I=f||null;O={success:!1,id:c};var g=p(c);if(g){"OBJECT"==g.nodeName?(y=J(g),C=null):(y=g,C=c);a.id="SWFObjectExprInst";if("undefined"==typeof a.width||!/%$/.test(a.width)&&310>parseInt(a.width,10))a.width="310";if("undefined"==typeof a.height||!/%$/.test(a.height)&&137>parseInt(a.height,10))a.height="137";d.title=d.title.slice(0,47)+" - Flash Player Installation";f=e.ie&&e.win?"ActiveX":"PlugIn";f="MMredirectURL="+encodeURI(n.location).toString().replace(/&/g,"%26")+"&MMplayerType="+
				f+"&MMdoctitle="+d.title;b.flashvars="undefined"!=typeof b.flashvars?b.flashvars+("&"+f):f;e.ie&&e.win&&4!=g.readyState&&(f=d.createElement("div"),c+="SWFObjectNew",f.setAttribute("id",c),g.parentNode.insertBefore(f,g),g.style.display="none",function(){4==g.readyState?g.parentNode.removeChild(g):setTimeout(arguments.callee,10)}());K(a,b,c)}}function W(a){if(e.ie&&e.win&&4!=a.readyState){var b=d.createElement("div");a.parentNode.insertBefore(b,a);b.parentNode.replaceChild(J(a),b);a.style.display="none";
				(function(){4==a.readyState?a.parentNode.removeChild(a):setTimeout(arguments.callee,10)})()}else a.parentNode.replaceChild(J(a),a)}function J(a){var b=d.createElement("div");if(e.win&&e.ie)b.innerHTML=a.innerHTML;else if(a=a.getElementsByTagName("object")[0])if(a=a.childNodes)for(var c=a.length,f=0;f<c;f++)1==a[f].nodeType&&"PARAM"==a[f].nodeName||8==a[f].nodeType||b.appendChild(a[f].cloneNode(!0));return b}function K(a,b,c){var f,g=p(c);if(e.wk&&312>e.wk)return f;if(g)if("undefined"==typeof a.id&&
				(a.id=c),e.ie&&e.win){var q="",h;for(h in a)a[h]!=Object.prototype[h]&&("data"==h.toLowerCase()?b.movie=a[h]:"styleclass"==h.toLowerCase()?q+=' class="'+a[h]+'"':"classid"!=h.toLowerCase()&&(q+=" "+h+'="'+a[h]+'"'));h="";for(var k in b)b[k]!=Object.prototype[k]&&(h+='<param name="'+k+'" value="'+b[k]+'" />');g.outerHTML='<object classid="clsid:D27CDB6E-AE6D-11cf-96B8-444553540000"'+q+">"+h+"</object>";D[D.length]=a.id;f=p(a.id)}else{k=d.createElement("object");k.setAttribute("type","application/x-shockwave-flash");
				for(var l in a)a[l]!=Object.prototype[l]&&("styleclass"==l.toLowerCase()?k.setAttribute("class",a[l]):"classid"!=l.toLowerCase()&&k.setAttribute(l,a[l]));for(q in b)b[q]!=Object.prototype[q]&&"movie"!=q.toLowerCase()&&(a=k,h=q,l=b[q],c=d.createElement("param"),c.setAttribute("name",h),c.setAttribute("value",l),a.appendChild(c));g.parentNode.replaceChild(k,g);f=k}return f}function P(a){var b=p(a);b&&"OBJECT"==b.nodeName&&(e.ie&&e.win?(b.style.display="none",function(){if(4==b.readyState){var c=p(a);
				if(c){for(var f in c)"function"==typeof c[f]&&(c[f]=null);c.parentNode.removeChild(c)}}else setTimeout(arguments.callee,10)}()):b.parentNode.removeChild(b))}function p(a){var b=null;try{b=d.getElementById(a)}catch(c){}return b}function U(a,b,c){a.attachEvent(b,c);x[x.length]=[a,b,c]}function A(a){var b=e.pv;a=a.split(".");a[0]=parseInt(a[0],10);a[1]=parseInt(a[1],10)||0;a[2]=parseInt(a[2],10)||0;return b[0]>a[0]||b[0]==a[0]&&b[1]>a[1]||b[0]==a[0]&&b[1]==a[1]&&b[2]>=a[2]?!0:!1}function Q(a,b,c,f){if(!e.ie||
				!e.mac){var g=d.getElementsByTagName("head")[0];g&&(c=c&&"string"==typeof c?c:"screen",f&&(L=m=null),m&&L==c||(f=d.createElement("style"),f.setAttribute("type","text/css"),f.setAttribute("media",c),m=g.appendChild(f),e.ie&&e.win&&"undefined"!=typeof d.styleSheets&&0<d.styleSheets.length&&(m=d.styleSheets[d.styleSheets.length-1]),L=c),e.ie&&e.win?m&&"object"==typeof m.addRule&&m.addRule(a,b):m&&"undefined"!=typeof d.createTextNode&&m.appendChild(d.createTextNode(a+" {"+b+"}")))}}function w(a,b){if(R){var c=
				b?"visible":"hidden";v&&p(a)?p(a).style.visibility=c:Q("#"+a,"visibility:"+c)}}function S(a){return null!=/[\\\"<>\.;]/.exec(a)&&"undefined"!=typeof encodeURIComponent?encodeURIComponent(a):a}var n=window,d=document,t=navigator,T=!1,z=[function(){T?V():E()}],r=[],D=[],x=[],y,C,I,O,v=!1,B=!1,m,L,R=!0,e=function(){var a="undefined"!=typeof d.getElementById&&"undefined"!=typeof d.getElementsByTagName&&"undefined"!=typeof d.createElement,b=t.userAgent.toLowerCase(),c=t.platform.toLowerCase(),f=c?/win/.test(c):
				/win/.test(b),c=c?/mac/.test(c):/mac/.test(b),b=/webkit/.test(b)?parseFloat(b.replace(/^.*webkit\/(\d+(\.\d+)?).*$/,"$1")):!1,g=!+"\v1",e=[0,0,0],h=null;if("undefined"!=typeof t.plugins&&"object"==typeof t.plugins["Shockwave Flash"])!(h=t.plugins["Shockwave Flash"].description)||"undefined"!=typeof t.mimeTypes&&t.mimeTypes["application/x-shockwave-flash"]&&!t.mimeTypes["application/x-shockwave-flash"].enabledPlugin||(T=!0,g=!1,h=h.replace(/^.*\s+(\S+\s+\S+$)/,"$1"),e[0]=parseInt(h.replace(/^(.*)\..*$/,
				"$1"),10),e[1]=parseInt(h.replace(/^.*\.(.*)\s.*$/,"$1"),10),e[2]=/[a-zA-Z]/.test(h)?parseInt(h.replace(/^.*[a-zA-Z]+(.*)$/,"$1"),10):0);else if("undefined"!=typeof n.ActiveXObject)try{var k=new ActiveXObject("ShockwaveFlash.ShockwaveFlash");k&&(h=k.GetVariable("$version"))&&(g=!0,h=h.split(" ")[1].split(","),e=[parseInt(h[0],10),parseInt(h[1],10),parseInt(h[2],10)])}catch(l){}return{w3:a,pv:e,wk:b,ie:g,win:f,mac:c}}();(function(){e.w3&&(("undefined"!=typeof d.readyState&&"complete"==d.readyState||
				"undefined"==typeof d.readyState&&(d.getElementsByTagName("body")[0]||d.body))&&u(),v||("undefined"!=typeof d.addEventListener&&d.addEventListener("DOMContentLoaded",u,!1),e.ie&&e.win&&(d.attachEvent("onreadystatechange",function(){"complete"==d.readyState&&(d.detachEvent("onreadystatechange",arguments.callee),u())}),n==top&&function(){if(!v){try{d.documentElement.doScroll("left")}catch(a){setTimeout(arguments.callee,0);return}u()}}()),e.wk&&function(){v||(/loaded|complete/.test(d.readyState)?u():
				setTimeout(arguments.callee,0))}(),N(u)))})();(function(){e.ie&&e.win&&window.attachEvent("onunload",function(){for(var a=x.length,b=0;b<a;b++)x[b][0].detachEvent(x[b][1],x[b][2]);a=D.length;for(b=0;b<a;b++)P(D[b]);for(var c in e)e[c]=null;e=null;for(var f in swfobject)swfobject[f]=null;swfobject=null})})();return{registerObject:function(a,b,c,f){if(e.w3&&a&&b){var d={};d.id=a;d.swfVersion=b;d.expressInstall=c;d.callbackFn=f;r[r.length]=d;w(a,!1)}else f&&f({success:!1,id:a})},getObjectById:function(a){if(e.w3)return H(a)},
				embedSWF:function(a,b,c,d,g,q,h,k,l,n){var p={success:!1,id:b};e.w3&&!(e.wk&&312>e.wk)&&a&&b&&c&&d&&g?(w(b,!1),M(function(){c+="";d+="";var e={};if(l&&"object"===typeof l)for(var m in l)e[m]=l[m];e.data=a;e.width=c;e.height=d;m={};if(k&&"object"===typeof k)for(var r in k)m[r]=k[r];if(h&&"object"===typeof h)for(var t in h)m.flashvars="undefined"!=typeof m.flashvars?m.flashvars+("&"+t+"="+h[t]):t+"="+h[t];if(A(g))r=K(e,m,b),e.id==b&&w(b,!0),p.success=!0,p.ref=r;else{if(q&&F()){e.data=q;G(e,m,b,n);return}w(b,
					!0)}n&&n(p)})):n&&n(p)},switchOffAutoHideShow:function(){R=!1},ua:e,getFlashPlayerVersion:function(){return{major:e.pv[0],minor:e.pv[1],release:e.pv[2]}},hasFlashPlayerVersion:A,createSWF:function(a,b,c){if(e.w3)return K(a,b,c)},showExpressInstall:function(a,b,c,d){e.w3&&F()&&G(a,b,c,d)},removeSWF:function(a){e.w3&&P(a)},createCSS:function(a,b,c,d){e.w3&&Q(a,b,c,d)},addDomLoadEvent:M,addLoadEvent:N,callDomLoadFunctions:u,getQueryParamValue:function(a){var b=d.location.search||d.location.hash;if(b){/\?/.test(b)&&
				(b=b.split("?")[1]);if(null==a)return S(b);for(var b=b.split("&"),c=0;c<b.length;c++)if(b[c].substring(0,b[c].indexOf("="))==a)return S(b[c].substring(b[c].indexOf("=")+1))}return""},expressInstallCallback:function(){if(B){var a=p("SWFObjectExprInst");a&&y&&(a.parentNode.replaceChild(y,a),C&&(w(C,!0),e.ie&&e.win&&(y.style.display="block")),I&&I(O));B=!1}}}}();



		(function() {
			var  global, version, _ref;


			function AkamaiSDKManager() {
				var legacyCheck, sdk, versions,
					_this = this;
				sdk = null;
				this.getSDK = function() {
					return sdk;
				};
				this.setSDK = function(newSDK) {
					var key, value;
					sdk = newSDK;
					legacyCheck();
					for (key in sdk) {
						value = sdk[key];
						window[key] = value;
					}
					return sdk;
				};
				this.saveSDK = function(version, object) {
					var key, value, _ref;
					if (!(object != null) || !(version != null) || version === "") {
						return;
					}
					if (!(object.main != null)) {
						for (key in object) {
							value = object[key];
							if (!((value != null ? value.VERSION : void 0) === version)) {
								continue;
							}
							object.main = value;
							break;
						}
					}
					if ((_ref = object.version) == null) {
						object.version = version;
					}
					versions.push(object);
					this[version] = object;
					return object;
				};
				versions = [];
				this.getVersions = function() {
					return versions.slice();
				};
				this.getVersion = function(version) {
					return this[version];
				};
				this.setVersion = function(version) {
					sdk = this.getVersion(version);
					if (!(sdk != null)) {
						return null;
					}
					this.setSDK(sdk);
					return sdk;
				};
				this.revert = function() {
					return this.setSDK(versions[0]);
				};
				this.noConflict = function() {
					var current;
					current = this.getSDK();
					this.revert();
					return current;
				};
				this.create = (function() {
					var Creator;
					Creator = function(cls, args) {
						this.prototype = cls.prototype;
						return cls.apply(this, args);
					};
					return function(args) {
						return new Creator(sdk.main, arguments);
					};
				})();
				legacyCheck = function() {
					var key, obj, value, _ref, _ref1;
					if ((_ref = window.com) != null ? (_ref1 = _ref.akamai) != null ? _ref1.amp : void 0 : void 0) {
						for (key in window) {
							value = window[key];
							if ((value === window.AMP || value === window.AMPremier) && ((value != null ? value.VERSION : void 0) != null) && value.VERSION !== "" && value.VERSION !== (sdk != null ? sdk.version : void 0) && (!(_this[value.VERSION] != null))) {
								obj = {};
								obj.main = value;
								obj.com = window.com;
								if (window.AMP) {
									obj.AMP = window.AMP;
								}
								if (window.AMPPremier) {
									obj.AMPremier = window.AMPPremier;
								}
								if (window.Utils) {
									obj.Utils = window.Utils;
								}
								if (window.QueryString) {
									obj.QueryString = window.QueryString;
								}
								if (window.QueryParams) {
									obj.QueryParams = window.QueryParams;
								}
								_this.saveSDK(value.VERSION, obj);
								break;
							}
						}
					}
				};
				legacyCheck();
			}


			if ((_ref = window.AKAMAI_MEDIA_PLAYER) == null) {
				window.AKAMAI_MEDIA_PLAYER = new AkamaiSDKManager();
			}
			version = 'AMP Premier v2.20.0.0005';
			if (!(window.AKAMAI_MEDIA_PLAYER[version] != null)) {
				global = window.AKAMAI_MEDIA_PLAYER[version] = {};
				/* Start JS Lib
				 */
				function __hasProp(prop) {
					return {}["hasOwnProperty"](prop);
				}

				function __extends(child, parent) {
					for (var key in parent) {
						if (__hasProp["call"](parent, key))
							child[key] = parent[key];
					}
					function ctor() {
						this.constructor = child;
					}

					ctor.prototype = parent.prototype;
					child.prototype = new ctor;
					child.__super__ = parent.prototype;
					return child;
				}

				function __indexOf(item) {
					for (var i = 0, l = this.length; i < l; i++) {
						if ( i in this && this[i] === item)
							return i;
					}
					return -1;
				}

				function __bind(fn, me) {
					return function() {
						return fn["apply"](me, arguments);
					};
				}








				/**
				 * Creates a new instance of MediaProxy. Used to track player configuration settings.
				 *
				 * @param {Object} data The config object.
				 * @constructor
				 * @private
				 * @extends {puremvc.Proxy}
				 */
				function ModuleProxy(data, name) {
					this.config = data;
					ModuleProxy.__super__.constructor.call(this, name);
				}


				__extends(ModuleProxy, puremvc.Proxy);


				/** @static
				 */
				ModuleProxy.NAME = "ModuleProxy";

				/** @private
				 */
				ModuleProxy.prototype.defaults = null;

				ModuleProxy.prototype.config = null;

				/** @override
				 */
				ModuleProxy.prototype.initializeNotifier = function(key) {
					ModuleProxy.__super__.initializeNotifier.call(this, key);
					this.createData();
				};

				/**
				 */
				ModuleProxy.prototype.createData = function() {
					this.setData(this.config);
				};

				/**
				 * Sets the data for this proxy.
				 *
				 * @param {Object} value
				 *    The new data for this proxy
				 * @override
				 */
				ModuleProxy.prototype.setData = function(data) {
					var dflt, key, obj, value, _ref;
					if (data == null) {
						data = {};
					}
					obj = {};
					_ref = this.defaults;
					for (key in _ref) {
						dflt = _ref[key];
						value = key in data ? data[key] : dflt;
						obj[key] = value;
					}
					ModuleProxy.__super__.setData.call(this, obj);
					return data;
				};

				/**
				 * The Module class.
				 *
				 * @param {Object}  config        The configuration object
				 * @param {Object}  viewComponent The player's container element
				 * @constructor
				 * @private
				 * @extends {puremvc.Facade}
				 */
				function Module(viewComponent) {
					var item, _i, _len, _ref;
					this.viewComponent = viewComponent;
					Module.__super__.constructor.call(this, this.getModuleName() + "-" + Date.now());
					this.dispatcher = new EventDispatcher(this);
					this.notificationEventMap = {};
					_ref = this.listNotificationEvents();
					for (_i = 0, _len = _ref.length; _i < _len; _i++) {
						item = _ref[_i];
						this.notificationEventMap[item] = true;
					}
					this.logger = Logger;
					this.moduleMap = {};
				}


				__extends(Module, puremvc.Facade);


				Module.prototype.logger = null;

				Module.prototype.config = null;

				Module.prototype.moduleName = null;

				Module.prototype.moduleMap = null;

				Module.prototype.viewComponent = null;

				Module.prototype.dispatcher = null;

				Module.prototype.notificationEventMap = null;

				Module.prototype.oninitialized = null;

				Module.prototype.parentModule = null;

				/**
				 * Initialization function.
				 *
				 * @param {Object}  config  The plugin's configuration object.
				 */
				Module.prototype.initialize = function(config, parentModule) {
					this.config = config;
					this.parentModule = parentModule;
					this.loadResources();
				};

				/**
				 */
				Module.prototype.loadResources = function() {
					AMP.addResources(this.config.resources, this.resourcesLoaded.bind(this));
				};

				/**
				 * The resources have finished loaded, load the extensions.
				 *
				 * @param {akamai.amp.Player} player
				 * @param {Object} config
				 * @private
				 */
				Module.prototype.resourcesLoaded = function() {
					this.createFramework();
					if (typeof this.oninitialized === "function") {
						this.oninitialized(this);
					}
				};

				/**
				 * Framework based initialization function for defining default
				 * mvc classes. Meant to be overwritten by base classes.
				 */
				Module.prototype.createFramework = function() {
					this.createModel();
					this.createController();
					this.createView();
				};

				/**
				 */
				Module.prototype.createModel = function() {
					this.registerProxy(new ModuleProxy(this.config));
				};

				/**
				 */
				Module.prototype.createView = function() {};

				/**
				 */
				Module.prototype.createController = function() {};

				/**
				 */
				Module.prototype.getModuleName = function() {
					return this.moduleName;
				};

				/**
				 * @return {Object} The configuration object.
				 * @expose
				 */
				Module.prototype.getConfig = function() {
					return this.config;
				};

				/**
				 */
				Module.prototype.hasModule = function(moduleName) {
					return this.moduleMap[moduleName] != null;
				};

				/**
				 */
				Module.prototype.getModules = function() {
					var key, modules, value, _ref;
					modules = {};
					_ref = this.moduleMap;
					for (key in _ref) {
						value = _ref[key];
						modules[key] = value.module;
					}
					return modules;
				};

				/**
				 */
				Module.prototype.registerModule = function(module) {
					var adaptor, moduleName;
					moduleName = module.getModuleName();
					if (!(module != null) || (this.moduleMap[moduleName] != null)) {
						return;
					}
					adaptor = new ModuleAdapter(module);
					this.moduleMap[moduleName] = adaptor;
					this.registerMediator(adaptor);
					module.onRegister();
				};

				/**
				 */
				Module.prototype.retrieveModule = function(moduleName) {
					return this.moduleMap[moduleName].module;
				};

				/**
				 */
				Module.prototype.removeModule = function(moduleName) {
					var adaptor;
					adaptor = this.moduleMap[moduleName];
					if (!(adaptor != null)) {
						return;
					}
					delete this.moduleMap[moduleName];
					this.removeMediator(moduleName);
					adaptor.module.onRemove();
					return adaptor.module;
				};

				/** List INotification interests.
				 */
				Module.prototype.listNotificationInterests = function() {
					return [];
				};

				/** List Notification publications
				 */
				Module.prototype.listNotificationPublications = function() {
					return [];
				};

				/** Notifications listed here will be automatically dispatched as events
				 */
				Module.prototype.listNotificationEvents = function() {
					return [];
				};

				/** @override
				 */
				Module.prototype.sendNotification = function(notificationName, body, type) {
					Module.__super__.sendNotification.call(this, notificationName, body, type);
					this.postProcessNotification(notificationName, body, type);
				};

				/**
				 */
				Module.prototype.postProcessNotification = function(notificationName, body, type) {
					var event;
					event = notificationName === Notifications.DISPATCH_EVENT ? body : this.createNotificationEvent(notificationName, body, type);
					if (event != null) {
						this.logNotificationEvent(event);
						this.dispatchEvent(event);
					}
				};

				/**
				 */
				Module.prototype.createNotificationEvent = function(notificationName, body, type) {
					var event, _ref;
					if (((_ref = this.notificationEventMap) != null ? _ref[notificationName] : void 0) !== true) {
						return;
					}
					event = new Event(notificationName, body);
					event.player = this.player || this;
					return event;
				};

				/**
				 */
				Module.prototype.logNotificationEvent = function(event) {
					this.logger.log("[" + (this.getModuleName().toUpperCase()) + " EVENT]", event.type, event);
				};

				/** Get the IMediator's view component.
				 */
				Module.prototype.getViewComponent = function() {
					return this.viewComponent;
				};

				/** Set the IMediator's view component.
				 */
				Module.prototype.setViewComponent = function(viewComponent) {
					this.viewComponent = viewComponent;
					return viewComponent;
				};

				/** Called by the parent module when the Module is registered
				 */
				Module.prototype.onRegister = function() {};

				/** Called by the parent module when the Module is removed
				 */
				Module.prototype.onRemove = function() {};

				/** Destroys the module
				 */
				Module.prototype.destroy = function() {
					var key, module, _i, _len, _ref;
					if (this.viewComponent != null) {
						this.viewComponent.innerHTML = "";
						this.viewComponent.className = "";
					}
					_ref = this.getModules();
					for (_i = 0, _len = _ref.length; _i < _len; _i++) {
						module = _ref[_i];
						this.removeModule(module.getModuleName());
						module.destroy();
					}
					puremvc.Facade.removeCore(this.multitonKey);
					for (key in this) {
						this[key] = null;
						delete this[key];
					}
				};

				/**
				 * Adds a listener for a given event type.
				 *
				 * @param {!string}  type  A string representing the event's type.
				 * @param {!Function} func  A function to call when the event is triggered.
				 * @expose
				 */
				Module.prototype.addEventListener = function(type, func) {
					this.dispatcher.addEventListener(type, func);
				};

				/**
				 * Dispathes and event, triggering all event listener of the event's type.
				 *
				 * @param {!IEvent} event The event to dispatch.
				 * @expose
				 */
				Module.prototype.dispatchEvent = function(event) {
					this.dispatcher.dispatchEvent(event);
				};

				/**
				 * Removes a listener for a given event type.
				 *
				 * @param {!string}  type  A string representing the event's type.
				 * @param {!Function} func  A function to call when the event is triggered.
				 * @return {?Function} the handler that was removed if any
				 * @expose
				 */
				Module.prototype.removeEventListener = function(type, func) {
					this.dispatcher.removeEventListener(type, func);
				};

				function XMLUtils() {}

				XMLUtils.createTextContent = function(xml, text) {
					var node;
					node = /[\&<>]/.test(text) ? xml.createCDATASection(text) : xml.createTextNode(text);
					return node;
				};

				XMLUtils.updateTextContent = function(node, str) {
					var text;
					text = XMLUtils.createTextContent(node.ownerDocument, str);
					node.removeChild(node.childNodes[0]);
					node.appendChild(text);
					return node;
				};

				XMLUtils.serialize = function(xml) {
					var serializer;
					if (!(xml != null)) {
						return;
					}
					if (typeof xml === "string") {
						return xml;
					}
					try {
						serializer = new XMLSerializer();
						return serializer.serializeToString(xml);
					} catch (err1) {
						try {
							serializer = document.implementation.createLSSerializer();
							return xmlSerializer.writeToString(xml);
						} catch (err3) {
							try {
								return xml.xml;
							} catch (err2) {

							}
						}
					}
				};

				XMLUtils.parse = function(text) {
					var parser, xmlDoc;
					if (window.DOMParser) {
						parser = new DOMParser();
						xmlDoc = parser.parseFromString(text, "text/xml");
					} else {
						xmlDoc = new ActiveXObject("Microsoft.XMLDOM");
						xmlDoc.async = false;
						xmlDoc.loadXML(text);
					}
					return xmlDoc;
				};

				/**
				 * The PluginsInitializedCommand class.
				 *
				 * @constructor
				 * @private
				 * @extends {puremvc.SimpleCommand}
				 */
				function PluginsInitializedCommand() {
					PluginsInitializedCommand.__super__.constructor.call(this);
				}


				__extends(PluginsInitializedCommand, puremvc.SimpleCommand);


				/**
				 * Executes the command.
				 *
				 * @param {puremvc.Notification} notification
				 *    The notification.
				 *
				 * @override
				 */
				PluginsInitializedCommand.prototype.execute = function(notification) {
					var media, _ref;
					this.sendNotification(Notifications.READY, this.facade.config);
					media = (_ref = this.facade.config) != null ? _ref.media : void 0;
					if (media != null) {
						this.sendNotification(Notifications.SET_MEDIA, media);
					}
				};

				/**
				 * The InstallPlayer class.
				 *
				 * @constructor
				 * @private
				 * @param {Object} viewComponent
				 */
				function InstallPlayer(config, viewComponent) {
					var anchor, div, img, message;
					viewComponent.className = Namespace.PREFIX + "player";
					div = UI.create("install-flash", viewComponent);
					message = UI.create(null, div, "p", "To view this page ensure that Adobe Flash Player version 10.2.0 or greater is installed.");
					anchor = UI.create(null, div, "a");
					anchor.href = 'http://www.adobe.com/go/getflashplayer';
					img = UI.create(null, anchor, "img");
					img.src = "//www.adobe.com/images/shared/download_buttons/get_flash_player.gif";
					img.alt = "Get Adobe Flash player";
				}

				/**
				 */
				InstallPlayer.prototype.getModules = function() {
					return [];
				};

				/**
				 * @constructor
				 * @private
				 */
				function Manager() {
					this.map = {};
				}

				/**
				 * @type {Object.<string, Object>}
				 * @private
				 */
				Manager.prototype.map = null;

				/**
				 * @param {string} key
				 *     The key
				 *
				 * @param {Object} value
				 *     The value
				 */
				Manager.prototype.add = function(key, value) {
					this.map[key] = value;
				};

				/**
				 * @param {string} key
				 *     The module's key
				 *
				 * @return {Object}
				 *     The item at the given key.
				 */
				Manager.prototype.item = function(key) {
					return this.map[key];
				};

				/**
				 * @param {string} key
				 *     The module's key
				 *
				 * @return {Object}
				 *     The item.
				 */
				Manager.prototype.remove = function(key) {
					var item;
					item = this.map[key];
					if (item != null) {
						this.map[key] = null;
						delete this.map[key];
					}
					return item;
				};

				/**
				 * @constructor
				 * @extends {Manager}
				 */
				function ResourceManager() {
					ResourceManager.__super__.constructor.call(this);
				}


				__extends(ResourceManager, Manager);


				/**
				 * @override
				 */
				ResourceManager.prototype.add = function(resource, callback) {
					var parent;
					if (this.item(resource.src) != null) {
						callback();
						return;
					}
					ResourceManager.__super__.add.call(this, resource.src, resource);
					parent = document.body;
					if (resource.type === Utils.mimeTypes.js) {
						Utils.loadScript(resource.src, callback, parent);
					} else if (resource.type === Utils.mimeTypes.css) {
						Utils.loadStyleSheet(resource.src);
						callback();
					} else {
						callback();
					}
				};

				/**
				 * @param {Array.<akamai.amp.Resource>} resource
				 *    The resource
				 *
				 * @param {Function} callback
				 */
				ResourceManager.prototype.addResources = function(resources, callback) {
					var complete, index, next,
						_this = this;
					if (!(resources != null ? resources.length : void 0) > 0) {
						callback();
						return;
					}
					index = 0;
					next = function() {
						_this.add(resources[index], complete);
					};
					complete = function() {
						index++;
						if (index >= resources.length) {
							callback();
						} else {
							next();
						}
					};
					next();
				};

				/**
				 * The ToggleActiveCommand class.
				 *
				 * @constructor
				 * @private
				 * @extends {puremvc.SimpleCommand}
				 */
				function ToggleActiveCommand() {
					ToggleActiveCommand.__super__.constructor.call(this);
				}


				__extends(ToggleActiveCommand, puremvc.SimpleCommand);


				/**
				 * Executes the command.
				 *
				 * @param {puremvc.Notification} notification
				 *    The notification.
				 *
				 * @override
				 */
				ToggleActiveCommand.prototype.execute = function(notification) {
					var appProxy, state;
					appProxy = this.facade.retrieveProxy(ApplicationStateProxy.NAME);
					state = appProxy.getActiveState() === ActiveState.ACTIVE ? ActiveState.INACTIVE : ActiveState.ACTIVE;
					this.sendNotification(Notifications.CHANGE_ACTIVE_STATE, state);
				};

				/**
				 * The TogglePlayPauseCommand class.
				 *
				 * @constructor
				 * @private
				 * @extends {puremvc.SimpleCommand}
				 */
				function TogglePlayPauseCommand() {
					TogglePlayPauseCommand.__super__.constructor.call(this);
				}


				__extends(TogglePlayPauseCommand, puremvc.SimpleCommand);


				/**
				 * Executes the command.
				 *
				 * @param {puremvc.Notification} notification
				 *    The notification.
				 *
				 * @override
				 */
				TogglePlayPauseCommand.prototype.execute = function(notification) {
					var appStateProxy, note, playbackProxy;
					appStateProxy = this.facade.retrieveProxy(ApplicationStateProxy.NAME);
					playbackProxy = this.facade.retrieveProxy(PlaybackProxy.NAME);
					switch (appStateProxy.getPlayState()) {
						case PlayState.ENDED:
							note = Notifications.REPLAY;
							break;
						case PlayState.PAUSED:
						case PlayState.READY:
							note = Notifications.PLAY;
							break;
						case PlayState.PLAYING:
							note = Notifications.PAUSE;
							break;
						case PlayState.WAITING:
							if (this.facade.getMediaElement().paused === true) {
								note = Notifications.PLAY;
							}
					}
					this.sendNotification(note, true);
				};

				/**
				 * The ToggleFullScreenCommand class.
				 *
				 * @constructor
				 * @private
				 * @extends {puremvc.SimpleCommand}
				 */
				function ToggleFullScreenCommand() {
					ToggleFullScreenCommand.__super__.constructor.call(this);
				}


				__extends(ToggleFullScreenCommand, puremvc.SimpleCommand);


				/**
				 * Executes the command.
				 *
				 * @param {puremvc.Notification} notification
				 *    The notification.
				 *
				 * @override
				 */
				ToggleFullScreenCommand.prototype.execute = function(notification) {
					var appProxy, state;
					appProxy = this.facade.retrieveProxy(ApplicationStateProxy.NAME);
					state = appProxy.getDisplayState() === DisplayState.FULL_SCREEN ? DisplayState.NORMAL : DisplayState.FULL_SCREEN;
					this.sendNotification(Notifications.CHANGE_DISPLAY_STATE, state);
				};

				/**
				 * The PlayCommand class.
				 *
				 * @constructor
				 * @private
				 * @extends {puremvc.MacroCommand}
				 */
				function PlayCommand() {
					PlayCommand.__super__.constructor.call(this);
				}


				__extends(PlayCommand, puremvc.MacroCommand);


				/** @override
				 */
				PlayCommand.prototype.initializeMacroCommand = function() {
					this.addSubCommand(PlayRequestCommand);
				};

				/**
				 * Executes the command.
				 *
				 * @param {puremvc.Notification} notification
				 *    The notification.
				 *
				 * @override
				 */
				PlayCommand.prototype.execute = function(notification) {
					var mediaProxy, playbackProxy, userInitiated;
					PlayCommand.__super__.execute.call(this, notification);
					userInitiated = notification.getBody();
					mediaProxy = this.facade.retrieveProxy(MediaProxy.NAME);
					playbackProxy = this.facade.retrieveProxy(PlaybackProxy.NAME);
					if (userInitiated && playbackProxy.initialized !== true) {
						this.sendNotification(Notifications.INITIALIZED);
					}
					if (playbackProxy.initialized !== true || (!mediaProxy.getSrc() && !mediaProxy.getSource())) {
						return;
					}
					if (!playbackProxy.getStarted()) {
						this.sendNotification(Notifications.START);
					}
					playbackProxy.play();
				};

				/**
				 * The PauseCommand class.
				 *
				 * @constructor
				 * @private
				 * @extends {puremvc.SimpleCommand}
				 */
				function PauseCommand() {
					PauseCommand.__super__.constructor.call(this);
				}


				__extends(PauseCommand, puremvc.SimpleCommand);


				/**
				 * Executes the command.
				 *
				 * @param {puremvc.Notification} notification
				 *    The notification.
				 *
				 * @override
				 */
				PauseCommand.prototype.execute = function(notification) {
					var playbackProxy;
					playbackProxy = this.facade.retrieveProxy(PlaybackProxy.NAME);
					playbackProxy.pause();
					this.sendNotification(Notifications.CHANGE_ACTIVE_STATE, ActiveState.ACTIVE);
				};

				/**
				 * @enum {string}
				 * @const
				 * @private
				 */

				var FullscreenMode = {
					/**
					 *
					 */

					EXTERNAL: "external"
				};

				/**
				 * @enum {string}
				 * @const
				 * @private
				 */

				var ControlsMode = {
					/**
					 * Constant representing the persistent controls mode
					 */

					PERSISTENT: "persistent",
					/**
					 * Constant representing none controls mode
					 */

					NONE: "none"
				};

				/**
				 * The PausedCommand class.
				 *
				 * @constructor
				 * @private
				 * @extends {puremvc.SimpleCommand}
				 */
				function PausedCommand() {
					PausedCommand.__super__.constructor.call(this);
				}


				__extends(PausedCommand, puremvc.SimpleCommand);


				/**
				 * Executes the command.
				 *
				 * @param {puremvc.Notification} notification
				 *    The notification.
				 *
				 * @override
				 */
				PausedCommand.prototype.execute = function(notification) {
					this.sendNotification(Notifications.DISPATCH_EVENT, new Event(Notifications.PAUSED));
				};

				/**
				 * The ChangeAutoplayCommand class.
				 *
				 * @constructor
				 * @private
				 * @extends {puremvc.SimpleCommand}
				 */
				function ChangeAutoplayCommand() {
					ChangeAutoplayCommand.__super__.constructor.call(this);
				}


				__extends(ChangeAutoplayCommand, puremvc.SimpleCommand);


				/**
				 * Executes the command.
				 *
				 * @param {puremvc.Notification} notification
				 *    The notification.
				 *
				 * @override
				 */
				ChangeAutoplayCommand.prototype.execute = function(notification) {
					var proxy;
					proxy = this.facade.retrieveProxy(ConfigurationProxy.NAME);
					proxy.setAutoplay(notification.getBody());
				};

				/**
				 * The ChangeLoopCommand class.
				 *
				 * @constructor
				 * @private
				 * @extends {puremvc.SimpleCommand}
				 */
				function ChangeLoopCommand() {
					ChangeLoopCommand.__super__.constructor.call(this);
				}


				__extends(ChangeLoopCommand, puremvc.SimpleCommand);


				/**
				 * Executes the command.
				 *
				 * @param {puremvc.Notification} notification
				 *    The notification.
				 *
				 * @override
				 */
				ChangeLoopCommand.prototype.execute = function(notification) {
					var proxy;
					proxy = this.facade.retrieveProxy(ConfigurationProxy.NAME);
					proxy.setLoop(notification.getBody());
				};

				/**
				 * The ChangeVolumeCommand class.
				 *
				 * @constructor
				 * @private
				 * @extends {puremvc.SimpleCommand}
				 */
				function ChangeVolumeCommand() {
					ChangeVolumeCommand.__super__.constructor.call(this);
				}


				__extends(ChangeVolumeCommand, puremvc.SimpleCommand);


				/**
				 * Executes the command.
				 *
				 * @param {puremvc.Notification} notification
				 *    The notification.
				 *
				 * @override
				 */
				ChangeVolumeCommand.prototype.execute = function(notification) {
					var proxy;
					proxy = this.facade.retrieveProxy(PlaybackProxy.NAME);
					proxy.setVolume(notification.getBody());
				};

				/**
				 * The MediaValidatedCommand class.
				 *
				 * @constructor
				 * @private
				 * @extends {puremvc.SimpleCommand}
				 */
				function MediaValidatedCommand() {
					MediaValidatedCommand.__super__.constructor.call(this);
				}


				__extends(MediaValidatedCommand, puremvc.SimpleCommand);


				/**
				 * Executes the command.
				 *
				 * @param {puremvc.Notification} notification
				 *    The notification.
				 *
				 * @override
				 */
				MediaValidatedCommand.prototype.execute = function(notification) {
					var media;
					media = notification.getBody();
					this.sendNotification(Notifications.MEDIA_CHANGE, media);
					if (this.facade.getAutoplay() === true) {
						this.sendNotification(Notifications.PLAY);
					}
				};

				/**
				 * The SeekCommand class.
				 *
				 * @constructor
				 * @private
				 * @extends {puremvc.SimpleCommand}
				 */
				function SeekCommand() {
					SeekCommand.__super__.constructor.call(this);
				}


				__extends(SeekCommand, puremvc.SimpleCommand);


				/**
				 * Executes the command.
				 *
				 * @param {puremvc.Notification} notification
				 *    The notification.
				 *
				 * @override
				 */
				SeekCommand.prototype.execute = function(notification) {
					var handler, mediaProxy, playbackProxy, time, video;
					time = notification.getBody();
					playbackProxy = this.facade.retrieveProxy(PlaybackProxy.NAME);
					mediaProxy = this.facade.retrieveProxy(MediaProxy.NAME);
					if (time === 0 && mediaProxy.getType() === Utils.mimeTypes.m3u8) {
						time = 0.25;
					}
					video = this.facade.getMediaElement();
					if (video.readyState === 0) {
						handler = function(event) {
							video.removeEventListener("loadedmetadata", handler, false);
							return playbackProxy.setCurrentTime(time);
						};
						video.addEventListener("loadedmetadata", handler, false);
					} else {
						playbackProxy.setCurrentTime(time);
					}
					this.sendNotification(Notifications.CHANGE_PLAY_STATE, PlayState.WAITING);
					this.sendNotification(Notifications.DISPLAY_TIME, {
						currentTime: time,
						duration: playbackProxy.getDuration()
					});
					this.sendNotification(Notifications.CHANGE_ACTIVE_STATE, ActiveState.ACTIVE);
				};

				/**
				 * The SeekingCommand class.
				 *
				 * @constructor
				 * @private
				 * @extends {puremvc.SimpleCommand}
				 */
				function SeekingCommand() {
					SeekingCommand.__super__.constructor.call(this);
				}


				__extends(SeekingCommand, puremvc.SimpleCommand);


				/**
				 * Executes the command.
				 *
				 * @param {puremvc.Notification} notification
				 *    The notification.
				 *
				 * @override
				 */
				SeekingCommand.prototype.execute = function(notification) {
					var app;
					app = this.facade.retrieveProxy(ApplicationStateProxy.NAME);
					app.setSeeking(true);
				};

				/**
				 * The SeekedCommand class.
				 *
				 * @constructor
				 * @private
				 * @extends {puremvc.SimpleCommand}
				 */
				function SeekedCommand() {
					SeekedCommand.__super__.constructor.call(this);
				}


				__extends(SeekedCommand, puremvc.SimpleCommand);


				/**
				 * Executes the command.
				 *
				 * @param {puremvc.Notification} notification
				 *    The notification.
				 *
				 * @override
				 */
				SeekedCommand.prototype.execute = function(notification) {
					var app, device, proxy, src;
					proxy = this.facade.retrieveProxy(PlaybackProxy.NAME);
					src = proxy.getSrc();
					app = this.facade.retrieveProxy(ApplicationStateProxy.NAME);
					app.setSeeking(false);
					device = Utils.getDevice();
					if (device === "desktop" || (device === "android" && /\.mp3$/.test(src))) {
						this.sendNotification(Notifications.CHANGE_PLAY_STATE, PlayState.PLAYING);
					}
				};

				/**
				 * The ReplayCommand class.
				 *
				 * @constructor
				 * @private
				 * @extends {puremvc.SimpleCommand}
				 */
				function ReplayCommand() {
					ReplayCommand.__super__.constructor.call(this);
				}


				__extends(ReplayCommand, puremvc.SimpleCommand);


				/**
				 * Executes the command.
				 *
				 * @param {puremvc.Notification} notification
				 *    The notification.
				 *
				 * @override
				 */
				ReplayCommand.prototype.execute = function(notification) {
					var playbackProxy;
					playbackProxy = this.facade.retrieveProxy(PlaybackProxy.NAME);
					playbackProxy.setCurrentTime(0.25);
					this.sendNotification(Notifications.PLAY);
					this.sendNotification(Notifications.CHANGE_PLAY_STATE, PlayState.PLAYING);
				};

				/**
				 * The EndCommand class.
				 *
				 * @constructor
				 * @private
				 * @extends {puremvc.SimpleCommand}
				 */
				function EndCommand() {
					EndCommand.__super__.constructor.call(this);
				}


				__extends(EndCommand, puremvc.SimpleCommand);


				/**
				 * Executes the command.
				 *
				 * @param {puremvc.Notification} notification
				 *    The notification.
				 *
				 * @override
				 */
				EndCommand.prototype.execute = function(notification) {
					var playbackProxy, time;
					time = notification.getBody();
					playbackProxy = this.facade.retrieveProxy(PlaybackProxy.NAME);
					playbackProxy.pause();
					if (playbackProxy.getCurrentTime() !== playbackProxy.getDuration()) {
						playbackProxy.setCurrentTime(playbackProxy.getDuration());
					}
				};

				/**
				 * The EndedCommand class.
				 *
				 * @constructor
				 * @private
				 * @extends {puremvc.SimpleCommand}
				 */
				function EndedCommand() {
					EndedCommand.__super__.constructor.call(this);
				}


				__extends(EndedCommand, puremvc.SimpleCommand);


				/**
				 * Executes the command.
				 *
				 * @param {puremvc.Notification} notification
				 *    The notification.
				 *
				 * @override
				 */
				EndedCommand.prototype.execute = function(notification) {
					var config;
					config = this.facade.retrieveProxy(ConfigurationProxy.NAME);
					if (config.getLoop() === true) {
						this.sendNotification(Notifications.REPLAY);
					} else {
						this.sendNotification(Notifications.CHANGE_PLAY_STATE, PlayState.ENDED);
						this.sendNotification(Notifications.CHANGE_ACTIVE_STATE, ActiveState.ACTIVE);
					}
				};

				/**
				 * The StartCommand class.
				 *
				 * @constructor
				 * @private
				 * @extends {puremvc.SimpleCommand}
				 */
				function StartCommand() {
					StartCommand.__super__.constructor.call(this);
				}


				__extends(StartCommand, puremvc.SimpleCommand);


				/**
				 * Executes the command.
				 *
				 * @param {puremvc.Notification} notification
				 *    The notification.
				 *
				 * @override
				 */
				StartCommand.prototype.execute = function(notification) {
					var mediaProxy;
					mediaProxy = this.facade.retrieveProxy(MediaProxy.NAME);
					this.sendNotification(Notifications.DISPLAY_TIME, {
						currentTime: 0,
						duration: mediaProxy.getDuration()
					});
					this.sendNotification(Notifications.STARTED, notification.getBody());
					this.sendNotification(Notifications.CHANGE_ACTIVE_STATE, ActiveState.INACTIVE);
				};

				/**
				 * The IsUserActiveCommand class.
				 *
				 * @constructor
				 * @private
				 * @extends {puremvc.SimpleCommand}
				 */
				function IsUserActiveCommand() {
					IsUserActiveCommand.__super__.constructor.call(this);
				}


				__extends(IsUserActiveCommand, puremvc.SimpleCommand);


				/**
				 * Executes the command.
				 *
				 * @param {puremvc.Notification} notification
				 *    The notification.
				 *
				 * @override
				 */
				IsUserActiveCommand.prototype.execute = function(notification) {
					var proxy;
					proxy = this.facade.retrieveProxy(ApplicationStateProxy.NAME);
					proxy.setIsUserActive(notification.getBody());
				};

				/**
				 * The WaitingCommand class.
				 *
				 * @constructor
				 * @private
				 * @extends {puremvc.SimpleCommand}
				 */
				function WaitingCommand() {
					WaitingCommand.__super__.constructor.call(this);
				}


				__extends(WaitingCommand, puremvc.SimpleCommand);


				/**
				 * Executes the command.
				 *
				 * @param {puremvc.Notification} notification
				 *    The notification.
				 *
				 * @override
				 */
				WaitingCommand.prototype.execute = function(notification) {
					var appProxy;
					appProxy = this.facade.retrieveProxy(ApplicationStateProxy.NAME);
					if (appProxy.getPlayState() !== PlayState.LOADING && Utils.getMimeType(this.facade.getMediaElement().src) !== Utils.mimeTypes.mp4) {
						this.sendNotification(Notifications.CHANGE_PLAY_STATE, PlayState.WAITING);
					}
				};

				/**
				 * The ChangeMutedCommand class.
				 *
				 * @constructor
				 * @private
				 * @extends {puremvc.SimpleCommand}
				 */
				function ChangeMutedCommand() {
					ChangeMutedCommand.__super__.constructor.call(this);
				}


				__extends(ChangeMutedCommand, puremvc.SimpleCommand);


				/**
				 * Executes the command.
				 *
				 * @param {puremvc.Notification} notification
				 *    The notification.
				 *
				 * @override
				 */
				ChangeMutedCommand.prototype.execute = function(notification) {
					var proxy;
					proxy = this.facade.retrieveProxy(PlaybackProxy.NAME);
					proxy.setMuted(notification.getBody());
				};

				/**
				 * The CheckAuthorizationCommand class.
				 *
				 * @constructor
				 * @private
				 * @extends {puremvc.SimpleCommand}
				 */
				function CheckAuthorizationCommand() {
					CheckAuthorizationCommand.__super__.constructor.call(this);
				}


				__extends(CheckAuthorizationCommand, puremvc.SimpleCommand);


				/**
				 * Executes the command.
				 *
				 * @param {puremvc.Notification} notification
				 *    The notification.
				 *
				 * @override
				 */
				CheckAuthorizationCommand.prototype.execute = function(notification) {
					var media, proxy;
					proxy = this.facade.retrieveProxy(SecurityProxy.NAME);
					media = notification.getBody();
					proxy.setMedia(media);
					if (proxy.getAuthorized() === false) {
						this.sendNotification(SecurityNotifications.AUTHORIZE, media);
					} else {
						this.sendNotification(Notifications.MEDIA_VALIDATED, media);
					}
				};

				/**
				 * The AuthorizedCommand class.
				 *
				 * @constructor
				 * @private
				 * @extends {puremvc.SimpleCommand}
				 */
				function AuthorizedCommand() {
					AuthorizedCommand.__super__.constructor.call(this);
				}


				__extends(AuthorizedCommand, puremvc.SimpleCommand);


				/**
				 * Executes the command.
				 *
				 * @param {puremvc.Notification} notification
				 *    The notification.
				 *
				 * @override
				 */
				AuthorizedCommand.prototype.execute = function(notification) {
					var mediaProxy, securityProxy, src;
					mediaProxy = this.facade.retrieveProxy(MediaProxy.NAME);
					mediaProxy.authorized = true;
					securityProxy = this.facade.retrieveProxy(SecurityProxy.NAME);
					src = securityProxy.createURL(mediaProxy.getSrc());
					mediaProxy.setSrc(src);
					this.sendNotification(Notifications.MEDIA_VALIDATED, mediaProxy.getData());
				};

				/**
				 * The InitializedCommand class.
				 *
				 * @constructor
				 * @private
				 * @extends {puremvc.SimpleCommand}
				 */
				function InitializedCommand() {
					InitializedCommand.__super__.constructor.call(this);
				}


				__extends(InitializedCommand, puremvc.SimpleCommand);


				/**
				 * Executes the command.
				 *
				 * @param {puremvc.Notification} notification
				 *    The notification.
				 *
				 * @override
				 */
				InitializedCommand.prototype.execute = function(notification) {
					var proxy;
					proxy = this.facade.retrieveProxy(PlaybackProxy.NAME);
					proxy.initialized = true;
				};

				/**
				 * The RegisterPlaybackCoreCommand class.
				 *
				 * @constructor
				 * @private
				 * @extends {puremvc.SimpleCommand}
				 */
				function RegisterPlaybackCoreCommand() {
					RegisterPlaybackCoreCommand.__super__.constructor.call(this);
				}


				__extends(RegisterPlaybackCoreCommand, puremvc.SimpleCommand);


				/**
				 * Executes the command.
				 *
				 * @param {puremvc.Notification} notification
				 *    The notification.
				 *
				 * @override
				 */
				RegisterPlaybackCoreCommand.prototype.execute = function(notification) {
					var player;
					player = this.facade.retrieveProxy(PlayerProxy.NAME);
					player.registerPlaybackCore(notification.getBody());
				};

				/**
				 * The RegisterPlaybackCoreCommand class.
				 *
				 * @constructor
				 * @private
				 * @extends {puremvc.SimpleCommand}
				 */
				function PlaybackTargetChangeCommand() {
					PlaybackTargetChangeCommand.__super__.constructor.call(this);
				}


				__extends(PlaybackTargetChangeCommand, puremvc.SimpleCommand);


				/**
				 * Executes the command.
				 *
				 * @param {puremvc.Notification} notification
				 *    The notification.
				 *
				 * @override
				 */
				PlaybackTargetChangeCommand.prototype.execute = function(notification) {
					var note;
					if (notification.getBody().target === "amp") {
						note = Notifications.REMOVE_APPLICATION_STATE;
					} else {
						note = Notifications.ADD_APPLICATION_STATE;
					}
					this.sendNotification(note, "remote-playback");
				};

				/**
				 * The RecordContentChangeCommand class.
				 *
				 * @constructor
				 * @private
				 * @extends {puremvc.SimpleCommand}
				 */
				function RecordContentChangeCommand() {
					RecordContentChangeCommand.__super__.constructor.call(this);
				}


				__extends(RecordContentChangeCommand, puremvc.SimpleCommand);


				/**
				 * Executes the command.
				 *
				 * @param {puremvc.Notification} notification
				 *    The notification.
				 *
				 * @override
				 */
				RecordContentChangeCommand.prototype.execute = function(notification) {
					var content, media;
					media = this.facade.retrieveProxy(MediaProxy.NAME);
					content = notification.getBody();
					this.sendNotification(Notifications.CHANGE_CONTENT, {
						from: media.getData(),
						to: content
					});
					media.updateData(content);
					this.sendNotification(Notifications.UPDATE_DATA_BINDINGS);
					this.sendNotification(Notifications.CHANGE_CONTENT, media.getData());
				};

				/**
				 * The TimeupdateCommand class.
				 *
				 * @constructor
				 * @private
				 * @extends {puremvc.SimpleCommand}
				 */
				function TimeUpdateCommand() {
					TimeUpdateCommand.__super__.constructor.call(this);
				}


				__extends(TimeUpdateCommand, puremvc.SimpleCommand);


				/**
				 * Executes the command.
				 *
				 * @param {puremvc.Notification} notification
				 *    The notification.
				 *
				 * @override
				 */
				TimeUpdateCommand.prototype.execute = function(notification) {
					var playbackCore;
					playbackCore = this.facade.retrieveProxy(PlayerProxy.NAME).getActivePlaybackCore();
					this.sendNotification(Notifications.DISPLAY_TIME, {
						currentTime: playbackCore.getCurrentTime(),
						duration: playbackCore.getDuration()
					});
				};

				/**
				 * The ToggleMutedCommand class.
				 *
				 * @constructor
				 * @private
				 * @extends {puremvc.SimpleCommand}
				 */
				function ToggleMutedCommand() {
					ToggleMutedCommand.__super__.constructor.call(this);
				}


				__extends(ToggleMutedCommand, puremvc.SimpleCommand);


				/**
				 * Executes the command.
				 *
				 * @param {puremvc.Notification} notification
				 *    The notification.
				 *
				 * @override
				 */
				ToggleMutedCommand.prototype.execute = function(notification) {
					var proxy;
					proxy = this.facade.retrieveProxy(PlaybackProxy.NAME);
					proxy.setMuted(!proxy.getMuted());
				};

				/**
				 * The ModuleMediator class.
				 *
				 * @param {string} name
				 * @param {Object} viewComponent
				 * @constructor
				 * @private
				 * @extends {puremvc.Mediator}
				 */
				function ModuleMediator(viewComponent) {
					if (this.cssPrefix == null) {
						this.cssPrefix = Namespace.PREFIX;
					}
					ModuleMediator.__super__.constructor.call(this, this.mediatorName, viewComponent);
				}


				__extends(ModuleMediator, puremvc.Mediator);


				ModuleMediator.prototype.config = null;

				ModuleMediator.prototype.cssPrefix = null;

				ModuleMediator.prototype.classList = null;

				/** @override
				 */
				ModuleMediator.prototype.initializeNotifier = function(key) {
					var base;
					ModuleMediator.__super__.initializeNotifier.call(this, key);
					base = this.facade.player || this.facade;
					this.config = base.retrieveProxy(ModuleProxy.NAME);
					this.classList = {
						prefix: this.cssPrefix,
						element: this.viewComponent,
						contains: function(className, element) {
							var css, _ref;
							if (element == null) {
								element = this.element;
							}
							css = this.prefix + className;
							if (((_ref = element.classList) != null ? _ref.contains : void 0) != null) {
								return element.classList.contains(css);
							} else {
								return element.className.indexOf(css) !== -1;
							}
						},
						add: function(className, element) {
							var css, _ref;
							if (element == null) {
								element = this.element;
							}
							css = this.prefix + className;
							if (((_ref = element.classList) != null ? _ref.add : void 0) != null) {
								element.classList.add(css);
							} else {
								if (!this.contains(className, element)) {
									if (element.className !== "") {
										element.className += " " + css;
									} else {
										element.className = css;
									}
								}
							}
						},
						remove: function(className, element) {
							var css, regexp, _ref;
							if (element == null) {
								element = this.element;
							}
							css = this.prefix + className;
							if (((_ref = element.classList) != null ? _ref.remove : void 0) != null) {
								element.classList.remove(css);
							} else {
								if (this.contains(className, element)) {
									regexp = new RegExp(" ?" + css);
									element.className = element.className.replace(regexp, "");
								}
							}
						},
						toggle: function(className, element) {
							var _ref;
							if (element == null) {
								element = this.element;
							}
							if (((_ref = element.classList) != null ? _ref.toggle : void 0) != null) {
								return element.classList.toggle(this.prefix + className);
							} else {
								if (this.contains(className, element)) {
									return this.remome(className, element);
								} else {
									return this.add(className, element);
								}
							}
						}
					};
				};

				/**
				 * @constructor
				 * @private
				 */
				function LocalizedMediator(viewComponent) {
					LocalizedMediator.__super__.constructor.call(this, viewComponent);
				}


				__extends(LocalizedMediator, ModuleMediator);


				LocalizedMediator.prototype.localizationManager = null;

				/** @override
				 */
				LocalizedMediator.prototype.initializeNotifier = function(key) {
					var target;
					LocalizedMediator.__super__.initializeNotifier.call(this, key);
					target = this.facade.player || this.facade;
					this.localizationManager = target.retrieveProxy(LocalizationProxy.NAME);
				};

				/**
				 * @constructor
				 * @extends {LocalizedMediator}
				 * @private
				 */
				function ComponentMediator(componentName, componentType, parent, element) {
					this.componentName = componentName != null ? componentName : this.componentName;
					this.componentType = componentType != null ? componentType : this.componentType;
					this.viewComponent = this.createViewComponent(parent, element);
					this.classList = this.viewComponent._classList;
					if (this.mediatorName == null) {
						this.mediatorName = this.createMediatorName();
					}
					ComponentMediator.__super__.constructor.call(this, this.viewComponent);
				}


				__extends(ComponentMediator, LocalizedMediator);


				ComponentMediator.prototype.componentName = null;

				ComponentMediator.prototype.componentType = null;

				ComponentMediator.prototype.classList = null;

				ComponentMediator.prototype.state = null;

				ComponentMediator.prototype.disabled = false;

				/**
				 */
				ComponentMediator.prototype.onRegister = function() {
					UI.bindEvents(this.viewComponent, this);
				};

				/**
				 */
				ComponentMediator.prototype.createViewComponent = function(parent, element) {
					var type;
					type = this.getTypeList();
					return UI.create(type, parent, element);
				};

				/**
				 */
				ComponentMediator.prototype.createMediatorName = function() {
					var type;
					type = this.getTypeList();
					type.push("mediator");
					type.push(UI.createUID());
					return type.join("-");
				};

				/**
				 */
				ComponentMediator.prototype.getTypeList = function() {
					var type;
					type = [];
					if (this.componentName != null) {
						type.push(this.componentName);
					}
					if (this.componentType != null) {
						type = type.concat(this.componentType);
					}
					return type;
				};

				/**
				 */
				ComponentMediator.prototype.create = function(type, parent, element, text) {
					if (parent == null) {
						parent = this;
					}
					if (parent === false) {
						parent = null;
					}
					return UI.create(type, parent, element, text);
				};

				/**
				 */
				ComponentMediator.prototype.createText = function(type, text, parent, element) {
					if (parent == null) {
						parent = this;
					}
					return UI.create(type, parent, element, text);
				};

				/**
				 */
				ComponentMediator.prototype.setState = function(value) {
					if (value === this.state) {
						return;
					}
					if (this.state != null) {
						this.classList.remove(this.state);
					}
					this.state = value;
					if (this.state != null) {
						this.classList.add(this.state);
					}
					return value;
				};

				/**
				 */
				ComponentMediator.prototype.getState = function() {
					return this.state;
				};

				/**
				 */
				ComponentMediator.prototype.setDisabled = function(value) {
					if (value === this.disabled) {
						return;
					}
					this.disabled = value;
					if (this.disabled) {
						this.classList.add("disabled");
					} else {
						this.classList.remove("disabled");
					}
					return value;
				};

				/**
				 */
				ComponentMediator.prototype.getDisabled = function() {
					return this.disabled;
				};

				/**
				 * @constructor
				 * @private
				 */
				function OverlayMediator() {
					OverlayMediator.__super__.constructor.call(this, null, null, null, null);
				}


				__extends(OverlayMediator, ComponentMediator);


				OverlayMediator.prototype.componentType = "overlay";

				/**
				 * Registers the overlay.
				 *
				 * @override
				 */
				OverlayMediator.prototype.onRegister = function() {
					OverlayMediator.__super__.onRegister.call(this);
					this.registerOverlay();
				};

				/**
				 * Removes the overlay.
				 *
				 * @override
				 */
				OverlayMediator.prototype.onRemove = function() {
					OverlayMediator.__super__.onRemove.call(this);
					this.removeOverlay();
				};

				/**
				 *
				 */
				OverlayMediator.prototype.registerOverlay = function() {
					this.sendNotification(Notifications.ADD_OVERLAY, this.viewComponent);
				};

				/**
				 *
				 */
				OverlayMediator.prototype.removeOverlay = function() {
					this.sendNotification(Notifications.REMOVE_OVERLAY, this.viewComponent);
				};

				/**
				 * @constructor
				 * @private
				 * @extends {contextMenuMediator}
				 */
				function contextMenuMediator() {
					contextMenuMediator.__super__.constructor.call(this);
				}


				__extends(contextMenuMediator, OverlayMediator);


				contextMenuMediator.prototype.componentName = "context-menu";

				contextMenuMediator.prototype.contextMenu = null;

				/**
				 * @override
				 */
				contextMenuMediator.prototype.onRegister = function() {
					var _this = this;
					contextMenuMediator.__super__.onRegister.call(this);
					EventHandler.create(this.facade.viewComponent, EventHandler.CONTEXTMENU, function(event) {
						event.preventDefault();
						_this.contextMenuHandler(event);
						return false;
					});
				};

				/** Context Menu Click Handler
				 */
				contextMenuMediator.prototype.contextMenuHandler = function(event) {
					var contextItem,
						_this = this;
					if (this.contextMenu) {
						this.removeContextMenu();
					}
					this.contextMenu = UI.create("context-menu", document.body, "ul");
					contextItem = UI.create("context-item", this.contextMenu, "li", this.facade.getVersion());
					this.contextMenu.style.top = event.pageY + "px";
					this.contextMenu.style.left = event.pageX + "px";
					EventHandler.create(document.body, EventHandler.CLICK, function(event) {
						_this.removeContextMenu(event);
						return false;
					});
				};

				/** Remove ContextMenu Handler and DOM Object
				 */
				contextMenuMediator.prototype.removeContextMenu = function(event) {
					try {
						EventHandler.clear(document.body, EventHandler.CLICK);
						document.body.removeChild(this.contextMenu);
						this.contextMenu = null;
					} catch (_error) {}
				};

				/**
				 */
				/**
				 * @constructor
				 * @private
				 */
				function EndSlateMediator() {
					EndSlateMediator.__super__.constructor.call(this);
				}


				__extends(EndSlateMediator, OverlayMediator);


				EndSlateMediator.prototype.componentName = "end-slate";

				/**
				 * @override
				 */
				EndSlateMediator.prototype.onRegister = function() {
					if (this.config.getEndSlate() != null) {
						EndSlateMediator.__super__.onRegister.call(this);
					}
				};

				EndSlateMediator.prototype.listNotificationInterests = function() {
					return [Notifications.MEDIA_CHANGE];
				};

				EndSlateMediator.prototype.handleNotification = function(notification) {
					var endslate, html, media, src, viewComponent;
					switch (notification.getName()) {
						case Notifications.MEDIA_CHANGE:
							media = notification.getBody();
							endslate = this.config.getEndSlate();
							viewComponent = this.getViewComponent();
							html = "";
							if (endslate != null) {
								src = endslate.usePoster === true ? media.poster : endslate.url;
								if ((src != null) && src !== "") {
									html = "<img src=\"" + src + "\" class=\"end-slate-image\" />";
								}
							}
							viewComponent.innerHTML = html;
					}
				};

				/**
				 * @constructor
				 * @private
				 * @extends {OverlayMediator}
				 */
				function WaitingOverlayMediator() {
					WaitingOverlayMediator.__super__.constructor.call(this);
				}


				__extends(WaitingOverlayMediator, OverlayMediator);


				WaitingOverlayMediator.prototype.componentName = "waiting";

				WaitingOverlayMediator.prototype.bar = null;

				WaitingOverlayMediator.prototype.text = null;

				WaitingOverlayMediator.prototype.onRegister = function() {
					this.bar = this.create("waiting-bar");
					this.text = this.createText("waiting-text", this.localizationManager.getString(LocalizationConstants.MSG_BUFFERING));
					WaitingOverlayMediator.__super__.onRegister.call(this);
				};

				/**
				 * @constructor
				 * @extends {OverlayMediator}
				 * @private
				 */
				function LoadingOverlayMediator() {
					LoadingOverlayMediator.__super__.constructor.call(this);
				}


				__extends(LoadingOverlayMediator, OverlayMediator);


				LoadingOverlayMediator.prototype.componentName = "loading";

				function LocalizationConstants() {}

				LocalizationConstants.MSG_LIVE = "MSG_LIVE";

				LocalizationConstants.MSG_REPLAY = "MSG_REPLAY";

				LocalizationConstants.MSG_BUFFERING = "MSG_BUFFERING_TEXT";

				LocalizationConstants.MSG_CC = "MSG_CC";

				LocalizationConstants.MSG_CC_TITLE = "MSG_CC_TITLE";

				LocalizationConstants.MSG_CC_LANGUAGE = "MSG_CC_LANGUAGE";

				LocalizationConstants.MSG_CC_PRESETS = "MSG_CC_PRESETS";

				LocalizationConstants.MSG_CC_FONT = "MSG_CC_FONT";

				LocalizationConstants.MSG_CC_EDGE = "MSG_CC_EDGE";

				LocalizationConstants.MSG_CC_SIZE = "MSG_CC_SIZE";

				LocalizationConstants.MSG_CC_SCROLL = "MSG_CC_SCROLL";

				LocalizationConstants.MSG_CC_COLOR = "MSG_CC_COLOR";

				LocalizationConstants.MSG_CC_BACKGROUND = "MSG_CC_BACKGROUND";

				LocalizationConstants.MSG_CC_EDGE = "MSG_CC_EDGE";

				LocalizationConstants.MSG_CC_WINDOW = "MSG_CC_WINDOW";

				LocalizationConstants.MSG_CC_OPACITY = "MSG_CC_OPACITY";

				LocalizationConstants.MSG_CC_SHOW_ADVANCED = "MSG_CC_SHOW_ADVANCED";

				LocalizationConstants.MSG_CC_HIDE_ADVANCED = "MSG_CC_HIDE_ADVANCED";

				LocalizationConstants.MSG_CC_RESET = "MSG_CC_RESET";

				LocalizationConstants.MSG_CC_CANCEL = "MSG_CC_CANCEL";

				LocalizationConstants.MSG_CC_APPLY = "MSG_CC_APPLY";

				LocalizationConstants.MSG_SECONDS = "MSG_SECONDS";

				LocalizationConstants.MSG_RECOMMENDATIONS_TITLE = "MSG_RECOMMENDATIONS_TITLE";

				LocalizationConstants.MSG_NEXT_VIDEO = "MSG_NEXT_VIDEO";

				LocalizationConstants.MSG_NEXT_AD = "MSG_NEXT_AD";

				LocalizationConstants.MSG_TIME_SEPARATOR = "MSG_TIME_SEPARATOR";

				/**
				 * @constructor
				 * @private
				 * @extends {OverlayMediator}
				 */
				function ReplayOverlayMediator() {
					ReplayOverlayMediator.__super__.constructor.call(this);
				}


				__extends(ReplayOverlayMediator, OverlayMediator);


				ReplayOverlayMediator.prototype.componentName = "replay";

				ReplayOverlayMediator.prototype.replay = null;

				ReplayOverlayMediator.prototype.icon = null;

				ReplayOverlayMediator.prototype.label = null;

				/**
				 * @override
				 */
				ReplayOverlayMediator.prototype.onRegister = function() {
					this.replay = this.create("replay-button");
					this.replay.onclick = this.onclick.bind(this);
					this.icon = this.create("replay-icon", this.replay);
					this.label = this.createText("replay-label", this.localizationManager.getString(LocalizationConstants.MSG_REPLAY), this.replay);
					ReplayOverlayMediator.__super__.onRegister.call(this);
				};

				/**
				 */
				ReplayOverlayMediator.prototype.onclick = function(event) {
					event.stopImmediatePropagation();
					this.sendNotification(Notifications.REPLAY);
					return false;
				};

				/**
				 * The ChangeActiveStateCommand class.
				 *
				 * @constructor
				 * @private
				 * @extends {puremvc.SimpleCommand}
				 */
				function ChangeActiveStateCommand() {
					ChangeActiveStateCommand.__super__.constructor.call(this);
				}


				__extends(ChangeActiveStateCommand, puremvc.SimpleCommand);


				/**
				 * Executes the command.
				 *
				 * @param {puremvc.Notification} notification
				 *    The notification.
				 *
				 * @override
				 */
				ChangeActiveStateCommand.prototype.execute = function(notification) {
					var config, proxy, state;
					config = this.facade.retrieveProxy(ConfigurationProxy.NAME);
					state = config.getControls().mode !== ControlsMode.PERSISTENT ? notification.getBody() : ActiveState.ACTIVE;
					proxy = this.facade.retrieveProxy(ApplicationStateProxy.NAME);
					proxy.setActiveState(state);
				};

				/**
				 * The ChangeDisplayStateCommand class.
				 *
				 * @constructor
				 * @private
				 * @extends {puremvc.SimpleCommand}
				 */
				function ChangeDisplayStateCommand() {
					ChangeDisplayStateCommand.__super__.constructor.call(this);
					this.keyHandler = this.keypress.bind(this);
				}


				__extends(ChangeDisplayStateCommand, puremvc.SimpleCommand);


				ChangeDisplayStateCommand.interval = null;

				ChangeDisplayStateCommand.keyHandler = null;

				ChangeDisplayStateCommand.prototype.keypress = function(event) {
					switch (event.keyCode) {
						case 27:
							break;
						case 32:
							if (!this.facade.getEnded()) {
								if (this.facade.getPaused()) {
									this.facade.play();
								} else {
									this.facade.pause();
								}
							}
					}
				};

				/**
				 * Executes the command.
				 *
				 * @param {puremvc.Notification} notification
				 *    The notification.
				 *
				 * @override
				 */
				ChangeDisplayStateCommand.prototype.execute = function(notification) {
					var config, core, fullscreen, playback, proxy, state, view,
						_this = this;
					state = notification.getBody();
					proxy = this.facade.retrieveProxy(ApplicationStateProxy.NAME);
					proxy.setDisplayState(state);
					config = this.facade.retrieveProxy(ConfigurationProxy.NAME).getFullscreen();
					if (config.mode === FullscreenMode.EXTERNAL) {
						this.sendNotifications(state);
						return;
					}
					playback = this.facade.retrieveProxy(PlaybackProxy.NAME);
					core = this.facade.getMediaElement();
					view = this.facade.getViewComponent();
					fullscreen = {};
					if (view.webkitRequestFullScreen != null) {
						fullscreen.enter = view.webkitRequestFullScreen.bind(view);
						fullscreen.exit = document.webkitCancelFullScreen.bind(document);
						fullscreen.event = "onwebkitfullscreenchange";
						fullscreen.element = "webkitFullscreenElement";
					} else if (view.requestFullscreen != null) {
						fullscreen.enter = view.requestFullscreen.bind(view);
						fullscreen.exit = document.cancelFullscreen.bind(document);
						fullscreen.event = "onfullscreenchange";
						fullscreen.element = "fullscreenElement";
					} else if (view.mozRequestFullScreen != null) {
						fullscreen.enter = view.mozRequestFullScreen.bind(view);
						fullscreen.exit = document.mozCancelFullScreen.bind(document);
						fullscreen.event = "onmozfullscreenchange";
						fullscreen.element = "mozFullscreenElement";
					} else if (core.webkitEnterFullscreen != null) {
						fullscreen.enter = core.webkitEnterFullscreen.bind(core);
						fullscreen.exit = core.webkitExitFullscreen.bind(core);
						fullscreen.event = null;
					}
					if (state === DisplayState.FULL_SCREEN) {
						if (fullscreen.event != null) {
							view[fullscreen.event] = function(event) {
								if (!(document[fullscreen.element] != null)) {
									_this.sendNotification(Notifications.CHANGE_DISPLAY_STATE, DisplayState.NORMAL);
								}
							};
						} else {
							clearInterval(ChangeDisplayStateCommand.interval);
							ChangeDisplayStateCommand.interval = setInterval(function() {
								if (core.webkitDisplayingFullscreen !== true) {
									_this.sendNotification(Notifications.CHANGE_DISPLAY_STATE, DisplayState.NORMAL);
									clearInterval(ChangeDisplayStateCommand.interval);
								}
							}, 100);
						}
						fullscreen.enter();
						playback.keyHandler = this.keypress.bind(this);
						window.addEventListener("keypress", playback.keyHandler);
					} else if (state === DisplayState.NORMAL) {
						window.removeEventListener("keypress", playback.keyHandler);
						playback.keyHandler = null;
						if (fullscreen != null) {
							if (typeof fullscreen.exit === "function") {
								fullscreen.exit();
							}
						}
						core[fullscreen.event] = null;
						clearInterval(ChangeDisplayStateCommand.interval);
					}
					this.sendNotifications(state);
				};

				ChangeDisplayStateCommand.prototype.sendNotifications = function(state) {
					setTimeout(this.sendNotification.bind(this, Notifications.FULL_SCREEN_CHANGE, state), 100);
					this.sendNotification(Notifications.DISPATCH_EVENT, new Event("fullscreenchange", state === DisplayState.FULL_SCREEN));
				};

				/**
				 * The base player class.
				 *
				 * @param {Object} config
				 * @param {Object} viewComponent
				 * @constructor
				 * @private
				 * @extends {Module}
				 */
				function Player(viewComponent) {
					Player.__super__.constructor.call(this, viewComponent);
				}


				__extends(Player, Module);


				Player.prototype.moduleName = "amp";

				Player.prototype.playerType = null;

				Player.prototype.config = null;

				Player.prototype.mediaElement = null;

				Player.prototype.hidden = false;

				Player.prototype.l10n = null;

				/** @override
				 */
				Player.prototype.setViewComponent = function(viewComponent) {
					viewComponent["amp"] = this;
					return Player.__super__.setViewComponent.call(this, viewComponent);
				};

				/**
				 */
				Player.prototype.setMediaElement = function(mediaElement) {
					this.mediaElement = mediaElement;
					return mediaElement;
				};

				/**
				 */
				Player.prototype.getPlayerType = function() {
					return this.playerType;
				};

				/**
				 */
				Player.prototype.getVersion = function() {
					return AMP.getVersion();
				};

				/**
				 */
				Player.prototype.createPlugins = function() {
					this.sendNotification(PluginNotifications.REGISTER_PLUGINS, this.config);
				};

				/**
				 */
				Player.prototype.createMediaElement = function() {
					return null;
				};

				/** @override
				 */
				Player.prototype.createFramework = function() {
					Player.__super__.createFramework.call(this);
					this.mediaElement = this.createMediaElement();
					this.createPlugins();
				};

				/**
				 */
				Player.prototype.logNotificationEvent = function(event) {
					if (/(timeupdate|mediaPlayerPlayheadUpdate)/.test(event.type) === true) {
						return;
					}
					Player.__super__.logNotificationEvent.call(this, event);
				};

				/** @override
				 */
				Player.prototype.listNotificationEvents = function() {
					return Player.__super__.listNotificationEvents.call(this).concat([Notifications.READY, Notifications.LOAD_START, Notifications.TIME_UPDATE, Notifications.DURATION_CHANGE, Notifications.ERROR, Notifications.LOADED_METADATA, Notifications.WAITING, Notifications.SEEKING, Notifications.SEEKED, Notifications.ENDED, Notifications.PROGRESS, Notifications.CAN_PLAY, Notifications.CAN_PLAY_THROUGH, Notifications.PAUSE, Notifications.PLAY, Notifications.PLAYING, Notifications.STARTED, Notifications.PLAY_REQUEST, Notifications.MEDIUM_CHANGE, Notifications.TEMPORAL_TYPE_CHANGE, Notifications.MEDIA_CHANGE, Notifications.VOLUME_CHANGE, Notifications.FAIL_OVER_ATTEMPT, Notifications.LANGUAGE_CHANGE, Notifications.PLAYBACK_TARGET_AVAILABLE, Notifications.PLAYBACK_TARGET_CHANGE, Notifications.PLAY_STATE_CHANGE, SecurityNotifications.AUTHORIZE, SecurityNotifications.AUTHORIZED]);
				};

				/**
				 * @expose
				 */
				Player.prototype.getLanguage = function() {
					return this.retrieveProxy(LocalizationProxy.NAME).getLanguage();
				};

				/**
				 * @expose
				 */
				Player.prototype.setLanguage = function(value) {
					this.retrieveProxy(LocalizationProxy.NAME).setLanguage(value);
					return value;
				};

				/**
				 * @return {HTMLObject|HTMLMediaElement} The media playback DOM element.
				 * @expose
				 */
				Player.prototype.getMediaElement = function() {
					return this.mediaElement;
				};

				/**
				 * @return {HTMLElement} The container div.
				 * @expose
				 */
				Player.prototype.getContainer = function() {
					return this.getViewComponent();
				};

				/**
				 * @param   {string}  binding
				 *    A data bound string to evaluate.
				 *
				 * @return {Object}
				 *    The evaluated result
				 *
				 * @expose
				 */
				Player.prototype.evaluateBinding = function(binding) {};

				/**
				 * Determines if the core can play a given mimeType.
				 *
				 * @param   {string}  type
				 *    The mimetype to check.
				 *
				 * @return  {string}  ""
				 *    if the core can't play the mimeType
				 *
				 * @expose
				 */
				Player.prototype.canPlayType = function(type) {};

				/**
				 * Loads the video.
				 *
				 * @expose
				 */
				Player.prototype.load = function() {};

				/**
				 * Plays the currently loaded video.
				 *
				 * @expose
				 */
				Player.prototype.play = function() {};

				/**
				 * Plays the currently loaded video from its start time.
				 *
				 * @expose
				 */
				Player.prototype.replay = function() {};

				/**
				 * Pauses the currently loaded video.
				 *
				 * @expose
				 */
				Player.prototype.pause = function() {};

				/**
				 * Ends video playback.
				 *
				 * @expose
				 */
				Player.prototype.end = function() {};

				/**
				 * Sets user params.
				 *
				 * @param {Object} value The user params object.
				 * @expose
				 */
				Player.prototype.setParams = function(value) {};

				/**
				 * Gets user params.
				 *
				 * @return {Object} The user params object.
				 * @expose
				 */
				Player.prototype.getParams = function() {};

				/**
				 * Sets auto play flag.
				 *
				 * @param {boolean} value The autoplay flash.
				 * @expose
				 */
				Player.prototype.setAutoplay = function(value) {};

				/**
				 * Gets auto play flag.
				 *
				 * @return {boolean} The autoplay flash.
				 * @expose
				 */
				Player.prototype.getAutoplay = function() {};

				/**
				 * Sets player's loop flag.
				 *
				 * @param {boolean} value The loop flag.
				 * @expose
				 */
				Player.prototype.setLoop = function(value) {};

				/**
				 * Gets player's loop flag.
				 *
				 * @return {boolean} The loop flag.
				 * @expose
				 */
				Player.prototype.getLoop = function() {};

				/**
				 * Sets player's muted value.
				 *
				 * @param {boolean} value The muted value.
				 * @expose
				 */
				Player.prototype.setMuted = function(value) {};

				/**
				 * Gets player's muted value.
				 *
				 * @return {boolean} The muted value.
				 * @expose
				 */
				Player.prototype.getMuted = function() {};

				/**
				 * Mutes the player.
				 */
				Player.prototype.mute = function() {
					return this.setMuted(true);
				};

				/**
				 * Unmutes the player.
				 */
				Player.prototype.unmute = function() {
					return this.setMuted(false);
				};

				/**
				 * Sets the media object.
				 *
				 * @param {Object} value The media object for the video to play.
				 * @expose
				 */
				Player.prototype.setMedia = function(value) {
					var source, src, _ref, _ref1;
					src = value.src;
					source = (_ref = value.source) != null ? (_ref1 = _ref[0]) != null ? _ref1.src : void 0 : void 0;
					if ((!(src != null) || src === "") && (!(source != null) || source === "")) {
						throw new Error("[AMP ERROR] Invalid Media");
					}
				};

				/**
				 * Gets the media object.
				 *
				 * @return {Object} The media object for the video to play.
				 * @expose
				 */
				Player.prototype.getMedia = function() {};

				/**
				 * Sets the current time of the video.
				 *
				 * @param {number} value The desired time to seek to.
				 * @expose
				 */
				Player.prototype.setCurrentTime = function(value) {};

				/**
				 * Gets the current time of the video.
				 *
				 * @return {number} The current playhead time.
				 * @expose
				 */
				Player.prototype.getCurrentTime = function() {};

				/**
				 * Gets the current time of the video.
				 *
				 * @return {number} The current time of the video.
				 * @expose
				 */
				Player.prototype.getDuration = function() {};

				/**
				 * Sets the source url of video.
				 *
				 * @param {string} value The source url of the video to play.
				 * @expose
				 */
				Player.prototype.setSrc = function(value) {};

				/**
				 * Gets the source url of video.
				 *
				 * @return {string} The source url of the video to play.
				 * @expose
				 */
				Player.prototype.getSrc = function() {};

				/**
				 * Sets the source url of video.
				 *
				 * @param {Array.<Object>} value An array of source objects to choose from.
				 * @expose
				 */
				Player.prototype.setSource = function(value) {};

				/**
				 * Gets the source url of video.
				 *
				 * @return {Array.<Object>} An array of source objects to choose from.
				 * @expose
				 */
				Player.prototype.getSource = function() {};

				/**
				 * Sets the source url of video.
				 *
				 * @param {number} value The source url of the video to play.
				 * @expose
				 */
				Player.prototype.setVolume = function(value) {};

				/**
				 * Gets the source url of video.
				 *
				 * @return {number} The volume a number between 0 and 1.
				 * @expose
				 */
				Player.prototype.getVolume = function() {};

				/**
				 * Gets the source url of video.
				 *
				 * @return {boolean} The source url of the video.
				 * @expose
				 */
				Player.prototype.getSeeking = function() {};

				/**
				 * Gets the source url of video.
				 *
				 * @return {boolean} The source url of the video.
				 * @expose
				 */
				Player.prototype.getPaused = function() {};

				/**
				 * Gets the source url of video.
				 *
				 * @return {number} The source url of the video.
				 * @expose
				 */
				Player.prototype.getEnded = function() {};

				/**
				 * Sets the player's display state.
				 *
				 * @param {DisplayState} value
				 *    The display state.
				 *
				 * @expose
				 */
				Player.prototype.setDisplayState = function(value) {};

				/**
				 * Returns the player's display state.
				 *
				 * @return {DisplayState}
				 *    The display state.
				 *
				 * @expose
				 */
				Player.prototype.getDisplayState = function() {};

				/**
				 * Enters the player into full screen mode.
				 *
				 * @expose
				 */
				Player.prototype.enterFullScreen = function() {};

				/**
				 * Exits the player out of full screen mode.
				 *
				 * @expose
				 */
				Player.prototype.exitFullScreen = function() {};

				/**
				 * Show the player
				 *
				 * @expose
				 */
				Player.prototype.setHidden = function(value) {
					var style;
					if (value === this.hidden) {
						return;
					}
					this.hidden = value;
					style = this.viewComponent.style;
					if (this.hidden) {
						this.hiddenData = {
							width: style.width,
							height: style.height,
							paused: this.getPaused()
						};
						style.width = style.height = "0px";
						if (this.hiddenData.paused === false) {
							this.pause();
						}
					} else {
						style.width = this.hiddenData.width;
						style.height = this.hiddenData.height;
						if (this.hiddenData.paused === false) {
							this.play();
						}
						this.hiddenData = null;
					}
				};

				/**
				 * Hide the player
				 *
				 * @expose
				 */
				Player.prototype.getHidden = function() {
					return this.hidden;
				};

				/**
				 * Records a content change
				 *
				 * @param {Object} content
				 *    An object representing the new content
				 *
				 * @expose
				 */
				Player.prototype.recordContentChange = function(content) {};

				/**
				 * The HTMLPlayer class.
				 *
				 * @param {Object} viewComponent
				 * @constructor
				 * @private
				 * @extends {Player}
				 */
				function HTMLPlayer(viewComponent) {
					HTMLPlayer.__super__.constructor.call(this, viewComponent);
				}


				__extends(HTMLPlayer, Player);


				HTMLPlayer.prototype.playerType = "html";

				HTMLPlayer.prototype.media = null;

				HTMLPlayer.prototype.bindings = null;

				HTMLPlayer.prototype.configuration = null;

				HTMLPlayer.prototype.params = null;

				HTMLPlayer.prototype.appState = null;

				/** @override
				 */
				HTMLPlayer.prototype.createMediaElement = function() {
					var video, viewComponent;
					video = new MediaElementMediator("html5", "video");
					viewComponent = video.getViewComponent();
					if (viewComponent.dataset == null) {
						viewComponent.dataset = {};
					}
					this.sendNotification(Notifications.PLAYBACK_CORE_CHANGE, video);
					return viewComponent;
				};

				/** @override
				 */
				HTMLPlayer.prototype.createModel = function() {
					var playbackProxy;
					this.bindings = new DataBindingProxy();
					this.registerProxy(this.bindings);
					this.registerProxy(new SecurityProxy());
					this.configuration = new ConfigurationProxy(this.config);
					this.registerProxy(this.configuration);
					this.registerProxy(new LocalizationProxy(this.config));
					this.appState = new ApplicationStateProxy();
					this.registerProxy(this.appState);
					this.appState.setRenderMode(RenderMode.HTML);
					playbackProxy = new PlaybackProxy();
					this.registerProxy(playbackProxy);
					this.media = new MediaProxy();
					this.registerProxy(this.media);
					this.registerProxy(new PlayerProxy(playbackProxy));
					this.params = new ParamsProxy(this.config.params);
					this.registerProxy(this.params);
					this.bindings.initialize();
				};

				/** @override
				 */
				HTMLPlayer.prototype.createView = function() {
					var overlay, _ref, _ref1;
					this.registerMediator(new PlayerMediator("html5", this.getViewComponent()));
					this.registerMediator(new PluginAdapter());
					this.registerMediator(new VideoLayerMediator());
					this.registerMediator(new PosterMediator());
					overlay = new OverlayLayerMediator();
					this.registerMediator(overlay);
					this.registerMediator(new LoadingOverlayMediator());
					if (((_ref = this.config.controls) != null ? _ref["native"] : void 0) !== true) {
						this.registerMediator(new contextMenuMediator());
					}
					this.registerMediator(new WaitingOverlayMediator());
					this.registerMediator(new ReplayOverlayMediator());
					this.registerMediator(new EndSlateMediator());
					if (((_ref1 = this.config.titlebar) != null ? _ref1.enabled : void 0) === true) {
						this.registerMediator(new TitleBarMediator());
					}
					this.registerMediator(new ErrorLayerMediator());
				};

				/** @override
				 */
				HTMLPlayer.prototype.createController = function() {
					this.registerCommand(PluginNotifications.PLUGINS_INITIALIZED, PluginsInitializedCommand);
					this.registerCommand(Notifications.PLAY, PlayCommand);
					this.registerCommand(Notifications.PAUSE, PauseCommand);
					this.registerCommand(Notifications.PAUSED, PausedCommand);
					this.registerCommand(Notifications.CHANGE_PLAY_STATE, ChangePlayStateCommand);
					this.registerCommand(Notifications.TOGGLE_FULL_SCREEN, ToggleFullScreenCommand);
					this.registerCommand(Notifications.CHANGE_DISPLAY_STATE, ChangeDisplayStateCommand);
					this.registerCommand(Notifications.TOGGLE_ACTIVE, ToggleActiveCommand);
					this.registerCommand(Notifications.CHANGE_ACTIVE_STATE, ChangeActiveStateCommand);
					this.registerCommand(Notifications.SET_MEDIA, SetMediaCommand);
					this.registerCommand(Notifications.CHANGE_MEDIA, ChangeMediaCommand);
					this.registerCommand(Notifications.MEDIA_VALIDATED, MediaValidatedCommand);
					this.registerCommand(Notifications.MEDIA_CHANGE, MediaChangeCommand);
					this.registerCommand(Notifications.UPDATE_DATA_BINDINGS, UpdateDataBindingsCommand);
					this.registerCommand(Notifications.START, StartCommand);
					this.registerCommand(Notifications.SEEK, SeekCommand);
					this.registerCommand(Notifications.SEEKING, SeekingCommand);
					this.registerCommand(Notifications.SEEKED, SeekedCommand);
					this.registerCommand(Notifications.CHANGE_VOLUME, ChangeVolumeCommand);
					this.registerCommand(Notifications.CHANGE_MUTED, ChangeMutedCommand);
					this.registerCommand(Notifications.CHANGE_AUTOPLAY, ChangeAutoplayCommand);
					this.registerCommand(Notifications.CHANGE_LOOP, ChangeLoopCommand);
					this.registerCommand(Notifications.END, EndCommand);
					this.registerCommand(Notifications.ENDED, EndedCommand);
					this.registerCommand(Notifications.REPLAY, ReplayCommand);
					this.registerCommand(Notifications.ERROR, ErrorCommand);
					this.registerCommand(Notifications.READY, ReadyCommand);
					this.registerCommand(Notifications.WAITING, WaitingCommand);
					this.registerCommand(Notifications.CHANGE_DURATION, ChangeDurationCommand);
					this.registerCommand(Notifications.CHANGE_PARAMS, ChangeParamsCommand);
					this.registerCommand(Notifications.IS_USER_ACTIVE, IsUserActiveCommand);
					this.registerCommand(SecurityNotifications.CHECK_AUTHORIZATION, CheckAuthorizationCommand);
					this.registerCommand(SecurityNotifications.AUTHORIZED, AuthorizedCommand);
					this.registerCommand(SecurityNotifications.SET_KEY, SecuritySetKeyCommand);
					this.registerCommand(SecurityNotifications.SET_TOKEN, SecuritySetTokenCommand);
					this.registerCommand(Notifications.INITIALIZED, InitializedCommand);
					this.registerCommand(Notifications.REGISTER_PLAYBACK_CORE, RegisterPlaybackCoreCommand);
					this.registerCommand(UserNotifications.TOGGLE_PLAY_PAUSE, TogglePlayPauseCommand);
					this.registerCommand(UserNotifications.SEEK, SeekCommand);
					this.registerCommand(Notifications.PLAYBACK_TARGET_CHANGE, PlaybackTargetChangeCommand);
					this.registerCommand(Notifications.RECORD_CONTENT_CHANGE, RecordContentChangeCommand);
					this.registerCommand(Notifications.TIME_UPDATE, TimeUpdateCommand);
					this.registerCommand(Notifications.TOGGLE_MUTED, ToggleMutedCommand);
				};

				HTMLPlayer.prototype.evaluateBinding = function(binding) {
					return this.bindings.evaluateBinding(binding);
				};

				HTMLPlayer.prototype.recordContentChange = function(content) {
					this.sendNotification(Notifications.RECORD_CONTENT_CHANGE, content);
				};

				HTMLPlayer.prototype.canPlayType = function(type) {
					return this.retrieveProxy(PlaybackProxy.NAME).canPlayType(type);
				};

				HTMLPlayer.prototype.load = function() {
					this.sendNotification(Notifications.LOAD);
				};

				HTMLPlayer.prototype.play = function() {
					this.sendNotification(Notifications.PLAY, true);
				};

				HTMLPlayer.prototype.replay = function() {
					this.sendNotification(Notifications.REPLAY);
				};

				HTMLPlayer.prototype.pause = function() {
					this.sendNotification(Notifications.PAUSE);
				};

				HTMLPlayer.prototype.end = function() {
					this.sendNotification(Notifications.END);
				};

				HTMLPlayer.prototype.setParams = function(value) {
					this.sendNotification(Notifications.CHANGE_PARAMS, value);
					return value;
				};

				HTMLPlayer.prototype.getParams = function() {
					return this.params.getData();
				};

				HTMLPlayer.prototype.setAutoplay = function(value) {
					this.sendNotification(Notifications.CHANGE_AUTOPLAY, value);
					return value;
				};

				HTMLPlayer.prototype.getAutoplay = function() {
					var autoPlay, playbackProxy, _ref;
					playbackProxy = this.retrieveProxy(PlaybackProxy.NAME);
					autoPlay = playbackProxy.initialized && (this.configuration.getAutoplay() || ((_ref = this.getMedia()) != null ? _ref.autoplay : void 0) === true);
					return autoPlay;
				};

				HTMLPlayer.prototype.setLoop = function(value) {
					this.sendNotification(Notifications.CHANGE_LOOP, value);
					return value;
				};

				HTMLPlayer.prototype.getLoop = function() {
					return this.configuration.getLoop();
				};

				HTMLPlayer.prototype.setMuted = function(value) {
					this.sendNotification(Notifications.CHANGE_MUTED, value);
					return value;
				};

				HTMLPlayer.prototype.getMuted = function() {
					return this.retrieveProxy(PlaybackProxy.NAME).getMuted();
				};

				HTMLPlayer.prototype.setMedia = function(value) {
					HTMLPlayer.__super__.setMedia.call(this, value);
					this.sendNotification(Notifications.SET_MEDIA, value);
					return value;
				};

				HTMLPlayer.prototype.getMedia = function() {
					return this.media.getData();
				};

				HTMLPlayer.prototype.setCurrentTime = function(value) {
					this.sendNotification(Notifications.SEEK, value);
					return value;
				};

				HTMLPlayer.prototype.getCurrentTime = function() {
					return this.retrieveProxy(PlaybackProxy.NAME).getCurrentTime();
				};

				HTMLPlayer.prototype.getDuration = function() {
					return this.media.getDuration();
				};

				HTMLPlayer.prototype.setSrc = function(value) {
					this.sendNotification(Notifications.SET_MEDIA, {
						src: value
					});
					return value;
				};

				HTMLPlayer.prototype.getSrc = function() {
					return this.retrieveProxy(PlaybackProxy.NAME).getSrc();
				};

				HTMLPlayer.prototype.setSource = function(value) {
					this.sendNotification(Notifications.SET_MEDIA, {
						source: value
					});
					return value;
				};

				HTMLPlayer.prototype.getSource = function() {
					return this.media.getSource();
				};

				HTMLPlayer.prototype.setVolume = function(value) {
					this.sendNotification(Notifications.CHANGE_VOLUME, value);
					return value;
				};

				HTMLPlayer.prototype.getVolume = function() {
					return this.retrieveProxy(PlaybackProxy.NAME).getVolume();
				};

				HTMLPlayer.prototype.getSeeking = function() {
					return this.retrieveProxy(PlaybackProxy.NAME).getSeeking();
				};

				HTMLPlayer.prototype.getPaused = function() {
					return this.retrieveProxy(PlaybackProxy.NAME).getPaused();
				};

				HTMLPlayer.prototype.getEnded = function() {
					return this.retrieveProxy(PlaybackProxy.NAME).getEnded();
				};

				HTMLPlayer.prototype.setDisplayState = function(value) {
					this.sendNotification(Notifications.CHANGE_DISPLAY_STATE, value);
				};

				HTMLPlayer.prototype.getDisplayState = function(value) {
					return this.appState.getDisplayState();
				};

				HTMLPlayer.prototype.enterFullScreen = function() {
					this.sendNotification(Notifications.CHANGE_DISPLAY_STATE, DisplayState.FULL_SCREEN);
				};

				HTMLPlayer.prototype.exitFullScreen = function() {
					this.sendNotification(Notifications.CHANGE_DISPLAY_STATE, DisplayState.NORMAL);
				};

				/**
				 * @enum {string}
				 * @const
				 * @private
				 */

				var FlashNotifications = {
					READY: "jsApiReady",
					RESET: "mediaPlayerReset",
					LOADING: "mediaPlayerLoading",
					PLAYER_ERROR: "mediaPlayerError",
					MEDIA_ERROR: "mediaError",
					ERROR_STREAM_NOT_FOUND: "mediaPlayerErrorStreamNotFound",
					CAPABILITY_CHANGE: "mediaPlayerCapabilityChange",
					PLAYBACK_OPEN: "mediaPlayerPlaybackOpen",
					PLAYING: "mediaPlayerPlaying",
					ENDED: "mediaPlayerPlaybackSequenceComplete",
					PAUSED: "mediaPlayerPaused",
					BUFFERING: "mediaPlayerBuffering",
					DURATION_CHANGE: "mediaPlayerDurationChange",
					TIME_UPDATE: "mediaPlayerPlayheadUpdate",
					SEEKING_CHANGE: "mediaPlayerSeekingChange",
					ERROR: "error",
					VOLUME_CHANGE: "mediaPlayerVolumeChanged",
					PLAY_STATE_CHANGE: "mediaPlayerPlayStateChange",
					STATE_CHANGE: "mediaPlayerStateChange",
					CAPTION_DATA_CHANGE: "mediaPlayerCaptiondataChange",
					FAIL_OVER_ATTEMPT: "mediaPlayerFailoverAttempt",
					ELEMENT_EVENT: "mediaPlayerElementEvent",
					PLAY: "mediaPlayerResumeOrPausePlayback",
					APPLICATION_STATE_CHANGE: "mediaPlayerApplicationStateChange",
					INITIALIZED: "mediaPlayerInitialized",
					LOAD_STATE_READY: "mediaLoadStateReady",
					LOAD_STATE_LOADING: "mediaLoadStateLoading",
					FULLSCREEN_CHANGE: "mediaPlayerFullscreenChange",
					AUTHORIZE: "mediaPlayerAuthenticate",
					CAPTIONING_REQUEST: "mediaPlayerCaptioningRequest",
					CAPTION_LANG_CHANGE: "mediaPlayerCaptionLangChange",
					RECOMMENDATIONS_LOADED: "mediaPlayerRecommendationsLoaded",
					RECOMMENDATION_SELECTED: "mediaPlayerRecommendationSelected",
					SHARE: "mediaPlayerShare",
					SHARE_REQUEST: "mediaPlayerShareRequest",
					AUTO_ADVANCE: "mediaPlayerAutoAdvance",
					CREATE_FLASH_VARS: "createFlashVars",
					CREATE_XML: "createXML",
					FLASH_CREATED: "flashCreated",
					PLAY_REQUEST: "mediaPlayerPlaybackSequenceInitiated",
					FEED_LOADED: "mediaPlayerFeedLoaded"
				};

				/**
				 * The DataBoundConfigurationProxy class.
				 *
				 * @constructor
				 * @private
				 * @extends {ModuleProxy}
				 * @param {Object} data
				 */
				function DataBoundConfigurationProxy(data) {
					DataBoundConfigurationProxy.__super__.constructor.call(this, data);
				}


				__extends(DataBoundConfigurationProxy, ModuleProxy);


				/** @static
				 */
				DataBoundConfigurationProxy.NAME = ModuleProxy.NAME;

				DataBoundConfigurationProxy.prototype.bindings = null;

				DataBoundConfigurationProxy.prototype.configurationName = null;

				DataBoundConfigurationProxy.prototype.configurationData = null;

				DataBoundConfigurationProxy.prototype.contextName = null;

				DataBoundConfigurationProxy.prototype.contextData = null;

				DataBoundConfigurationProxy.prototype.value = null;

				DataBoundConfigurationProxy.prototype.getConfigurationName = function() {
					return this.configurationName;
				};

				DataBoundConfigurationProxy.prototype.getConfigurationData = function() {
					return this.configurationData.value || {};
				};

				DataBoundConfigurationProxy.prototype.getContextName = function() {
					return this.contextName;
				};

				DataBoundConfigurationProxy.prototype.getContextData = function() {
					return this.contextData;
				};

				DataBoundConfigurationProxy.prototype.onRegister = function() {
					var base;
					base = this.facade.player || this.facade;
					if (!(this.configurationName != null)) {
						this.configurationName = this.facade.moduleName;
					}
					this.bindings = base.retrieveProxy(DataBindingProxy.NAME);
					this.bindings.registerConfiguration(this);
				};

				DataBoundConfigurationProxy.prototype.setData = function(data) {
					var key, value, _ref;
					if (data == null) {
						data = {};
					}
					this.data = {};
					_ref = this.defaults;
					for (key in _ref) {
						value = _ref[key];
						this.data[key] = key in data ? data[key] : value;
					}
					this.configurationData = new TokenizedObject(this.data);
					return this.data;
				};

				DataBoundConfigurationProxy.prototype.getValue = function(key) {
					var _ref;
					this.bindings.update();
					this.value[key] = (_ref = this.configurationData.data[key]) != null ? _ref.compile(this.bindings.getData()) : void 0;
					return this.value[key];
				};

				DataBoundConfigurationProxy.prototype.compile = function(context, suppressErrors) {
					if (suppressErrors == null) {
						suppressErrors = false;
					}
					if (!(this.configurationData != null)) {
						return null;
					}
					if (!(context != null)) {
						context = this.bindings.getData();
					}
					if ((this.contextName != null) && (this.contextData != null)) {
						context = Utils.clone(context);
						context[this.contextName] = this.contextData;
					}
					this.configurationData.compile(context, suppressErrors);
					this.value = this.configurationData.value;
					return this.configurationData.value;
				};

				/**
				 * @enum {string}
				 * @const
				 * @private
				 */

				var MediaAnalyticsNotifications = {
					SET_DIMENSIONS: "mediaanalytics:setDimensions"
				};

				/**
				 * The SecuritySetToken class.
				 *
				 * @constructor
				 * @private
				 * @extends {puremvc.SimpleCommand}
				 */
				function SecuritySetTokenCommand() {
					SecuritySetTokenCommand.__super__.constructor.call(this);
				}


				__extends(SecuritySetTokenCommand, puremvc.SimpleCommand);


				/**
				 * Executes the command.
				 *
				 * @param {puremvc.Notification} notification
				 *    The notification.
				 *
				 * @override
				 */
				SecuritySetTokenCommand.prototype.execute = function(notification) {
					var proxy, token;
					proxy = this.facade.retrieveProxy(SecurityProxy.NAME);
					token = notification.getBody();
					proxy.setToken(token);
					proxy.setAuthorized(true);
				};

				/**
				 * The SecuritySetToken class.
				 *
				 * @constructor
				 * @private
				 * @extends {puremvc.SimpleCommand}
				 */
				function SecuritySetKeyCommand() {
					SecuritySetKeyCommand.__super__.constructor.call(this);
				}


				__extends(SecuritySetKeyCommand, puremvc.SimpleCommand);


				/**
				 * Executes the command.
				 *
				 * @param {puremvc.Notification} notification
				 *    The notification.
				 *
				 * @override
				 */
				SecuritySetKeyCommand.prototype.execute = function(notification) {
					var key, proxy;
					proxy = this.facade.retrieveProxy(SecurityProxy.NAME);
					key = notification.getBody();
					proxy.setKey(key);
				};

				function LocalizationWrapper(app, config) {
					this.app = app;
					this.config = config;
					LocalizationWrapper.__super__.constructor.call(this, this.constructor.NAME);
					this.proxy = new LocalizationProxy(this.config);
					this.app.registerProxy(this.proxy);
				}


				__extends(LocalizationWrapper, puremvc.Mediator);


				LocalizationWrapper.prototype.player = null;

				LocalizationWrapper.prototype.config = null;

				LocalizationWrapper.prototype.proxy = null;

				LocalizationWrapper.NAME = "LocalizationWrapper";

				/**
				 */
				LocalizationWrapper.prototype.getString = function(key) {
					return this.proxy.getString(key);
				};

				/** @override
				 */
				LocalizationWrapper.prototype.listNotificationInterests = function() {
					return [FlashNotifications.CREATE_FLASH_VARS, FlashNotifications.CREATE_XML];
				};

				/**
				 */
				LocalizationWrapper.prototype.handleNotification = function(notification) {
					var application, body, config, element, flashvars, key, lang, locale, locales, name, prop, text, value, xml, _ref;
					LocalizationWrapper.__super__.handleNotification.call(this, notification);
					name = notification.getName();
					body = notification.getBody();
					switch (name) {
						case FlashNotifications.CREATE_FLASH_VARS:
							flashvars = body.flashvars;
							config = body.config;
							if (config.language != null) {
								flashvars.locale_setting = config.language;
							}
							break;
						case FlashNotifications.CREATE_XML:
							xml = body.xml;
							application = xml.firstChild;
							locales = xml.getElementsByTagName("locales")[0];
							if (!(locales != null)) {
								locales = xml.createElement("locales");
								application.appendChild(locales);
							}
							_ref = this.config.locales;
							for (lang in _ref) {
								locale = _ref[lang];
								element = xml.createElement("locale");
								element.setAttribute("id", lang);
								locales.appendChild(element);
								for (key in locale) {
									value = locale[key];
									prop = xml.createElement("property");
									prop.setAttribute("key", key);
									text = XMLUtils.createTextContent(xml, value);
									prop.appendChild(text);
									element.appendChild(prop);
								}
							}
					}
				};

				/**
				 * @constructor
				 * @private
				 * @extends {ComponentMediator}
				 */
				function MediaElementMediator(componentName, viewComponent) {
					this.mediatorName = "#@{getComponentType()}-mediator";
					MediaElementMediator.__super__.constructor.call(this, componentName, null, null, viewComponent);
				}


				__extends(MediaElementMediator, ComponentMediator);


				MediaElementMediator.prototype.componentType = "media-element";

				/**
				 * @constructor
				 * @private
				 */
				function LayerMediator() {
					LayerMediator.__super__.constructor.call(this);
				}


				__extends(LayerMediator, ComponentMediator);


				LayerMediator.prototype.componentType = "layer";

				/**
				 * Registers the layer
				 *
				 * @override
				 */
				LayerMediator.prototype.onRegister = function() {
					LayerMediator.__super__.onRegister.call(this);
					this.registerLayer();
				};

				/**
				 * Removes the layer
				 *
				 * @override
				 */
				LayerMediator.prototype.onRemove = function() {
					LayerMediator.__super__.onRemove.call(this);
					this.removeLayer();
				};

				/**
				 *
				 */
				LayerMediator.prototype.registerLayer = function() {
					this.sendNotification(Notifications.ADD_LAYER, this.viewComponent);
				};

				/**
				 *
				 */
				LayerMediator.prototype.removeLayer = function() {
					this.sendNotification(Notifications.REMOVE_LAYER, this.viewComponent);
				};

				/**
				 * @constructor
				 * @extends {LayerMediator}
				 * @private
				 */
				function VideoLayerMediator() {
					VideoLayerMediator.__super__.constructor.call(this);
				}


				__extends(VideoLayerMediator, LayerMediator);


				VideoLayerMediator.prototype.componentName = "video";

				/** @override
				 */
				VideoLayerMediator.prototype.listNotificationInterests = function() {
					return [Notifications.PLAYBACK_CORE_CHANGE];
				};

				/** @override
				 */
				VideoLayerMediator.prototype.handleNotification = function(notification) {
					var body, name, viewComponent;
					name = notification.getName();
					body = notification.getBody();
					switch (name) {
						case Notifications.PLAYBACK_CORE_CHANGE:
							viewComponent = this.facade.getMediaElement();
							if (viewComponent != null) {
								this.viewComponent.removeChild(viewComponent);
							}
							viewComponent = (body != null ? typeof body.getViewComponent === "function" ? body.getViewComponent() : void 0 : void 0) || body;
							this.facade.setMediaElement(viewComponent);
							if (viewComponent != null) {
								this.viewComponent.appendChild(viewComponent);
							}
					}
				};

				/**
				 * @constructor
				 * @private
				 * @extends {ModuleMediator}
				 */
				function PlayerMediator(componentName, viewComponent) {
					this.componentName = componentName;
					this.layers = [];
					PlayerMediator.__super__.constructor.call(this, null, null, null, viewComponent);
				}


				__extends(PlayerMediator, ComponentMediator);


				PlayerMediator.prototype.componentType = "player";

				PlayerMediator.prototype.core = null;

				PlayerMediator.prototype.medium = null;

				PlayerMediator.prototype.layers = null;

				PlayerMediator.prototype.ready = false;

				/** @override
				 */
				PlayerMediator.prototype.onRegister = function() {
					var device;
					PlayerMediator.__super__.onRegister.call(this);
					device = Utils.getDevice();
					if ((device != null)) {
						this.classList.add(device);
					}
				};

				/** @override
				 */
				PlayerMediator.prototype.listNotificationInterests = function() {
					return [Notifications.DISPLAY_STATE_CHANGE, Notifications.ACTIVE_STATE_CHANGE, Notifications.PLAY_STATE_CHANGE, Notifications.ADD_APPLICATION_STATE, Notifications.REMOVE_APPLICATION_STATE, Notifications.MEDIUM_CHANGE, Notifications.DURATION_CHANGE, Notifications.TEMPORAL_TYPE_CHANGE, Notifications.ADD_LAYER, Notifications.REMOVE_LAYER, Notifications.READY];
				};

				/** @override
				 */
				PlayerMediator.prototype.handleNotification = function(notification) {
					var body, name, newState, oldState, state, states;
					name = notification.getName();
					body = notification.getBody();
					switch (name) {
						case Notifications.ACTIVE_STATE_CHANGE:
						case Notifications.PLAY_STATE_CHANGE:
						case Notifications.DISPLAY_STATE_CHANGE:
						case Notifications.MEDIUM_CHANGE:
							states = body;
							newState = states.newState;
							oldState = states.oldState;
							if ((oldState != null) && this.classList.contains(oldState)) {
								this.classList.remove(oldState);
							}
							if (newState != null) {
								this.classList.add(newState);
							}
							break;
						case Notifications.ADD_APPLICATION_STATE:
							state = body;
							this.classList.add(state);
							break;
						case Notifications.REMOVE_APPLICATION_STATE:
							state = body;
							this.classList.remove(state);
							break;
						case Notifications.TEMPORAL_TYPE_CHANGE:
							if (body === "live") {
								this.sendNotification(Notifications.ADD_APPLICATION_STATE, "live");
							} else {
								this.sendNotification(Notifications.REMOVE_APPLICATION_STATE, "live");
							}
							break;
						case Notifications.DURATION_CHANGE:
							if (body > 3600) {
								this.sendNotification(Notifications.ADD_APPLICATION_STATE, "long-form");
							} else {
								this.sendNotification(Notifications.REMOVE_APPLICATION_STATE, "long-form");
							}
							break;
						case Notifications.ADD_LAYER:
							this.addLayer(body);
							break;
						case Notifications.REMOVE_LAYER:
							this.removeLayer(body);
							break;
						case Notifications.READY:
							this.initialize();
					}
				};

				/**
				 */
				PlayerMediator.prototype.initialize = function() {
					var layer, _i, _len, _ref;
					this.ready = true;
					_ref = this.layers;
					for (_i = 0, _len = _ref.length; _i < _len; _i++) {
						layer = _ref[_i];
						if (!this.viewComponent.contains(layer)) {
							this.viewComponent.appendChild(layer);
						}
					}
				};

				/**
				 */
				PlayerMediator.prototype.addLayer = function(layer) {
					this.layers.push(layer);
					if (this.ready) {
						this.viewComponent.appendChild(layer);
					}
				};

				/**
				 */
				PlayerMediator.prototype.removeLayer = function(layer) {
					var index;
					if (this.viewComponent.contains(layer)) {
						this.viewComponent.removeChild(layer);
					}
					index = this.layers.indexOf(layer);
					if (index >= 0) {
						this.layers.splice(index, 1);
					}
				};

				/**
				 * @param {Object} viewComponent
				 * @constructor
				 * @private
				 * @extends {PlayerMeditator}
				 */
				function FlashPlayerMediator(viewComponent) {
					FlashPlayerMediator.__super__.constructor.call(this, this.type, viewComponent);
				}


				__extends(FlashPlayerMediator, PlayerMediator);


				/**
				 * The name of the this Mediator.
				 *
				 * @static
				 * @type {String}
				 */
				FlashPlayerMediator.NAME = "FlashPlayerMediator";

				FlashPlayerMediator.prototype.type = "flash";

				/** @override
				 */
				FlashPlayerMediator.prototype.listNotificationInterests = function() {
					return FlashPlayerMediator.__super__.listNotificationInterests.call(this).concat([PluginNotifications.PLUGINS_INITIALIZED]);
				};

				/** @override
				 */
				FlashPlayerMediator.prototype.handleNotification = function(notification) {
					var body, name;
					name = notification.getName();
					body = notification.getBody();
					switch (name) {
						case Notifications.READY:
							return;
						case PluginNotifications.PLUGINS_INITIALIZED:
							this.initialize();
							return;
					}
					FlashPlayerMediator.__super__.handleNotification.call(this, notification);
				};

				/**
				 * @enum {string}
				 * @const
				 * @private
				 */

				var AISNotifications = {
					START_AUTHENTICATION: "startAuthentication",
					AUTHENTICATED: "aisauthenticated",
					AUTHENTICATING: "aisathenticating",
					AUTHENTICATION_COMPLETE: "authenticationComplete",
					CHOOSE_AUTH_PROVIDER: "chooseAuthProvider",
					CHOOSE_PLAY_OPTIONS: "choosePlayOptions",
					LAUNCH_IDP_LOGIN: "launchIDPLogin"
				};

				/**
				 * The AISCommand class.
				 *
				 * @constructor
				 * @private
				 * @extends {puremvc.SimpleCommand}
				 */
				function AISCommand() {
					AISCommand.__super__.constructor.call(this);
				}


				__extends(AISCommand, puremvc.SimpleCommand);


				/**
				 */
				AISCommand.prototype.getProxy = function() {
					return this.facade.retrieveProxy(AISProxy.NAME);
				};

				/**
				 * The AISPauseCommand class.
				 *
				 * @constructor
				 * @private
				 * @extends {AISCommand}
				 */
				function AISPauseCommand() {
					AISPauseCommand.__super__.constructor.call(this);
				}


				__extends(AISPauseCommand, AISCommand);


				/**
				 * Executes the command.
				 *
				 * @param {puremvc.Notification} notification
				 *    The notification.
				 *
				 * @override
				 */
				AISPauseCommand.prototype.execute = function(notification) {
					var proxy;
					proxy = this.getProxy();
					proxy.vcsSet(proxy.currentTime);
				};

				/**
				 * The AISEndedCommand class.
				 *
				 * @constructor
				 * @private
				 * @extends {AISCommand}
				 */
				function AISEndedCommand() {
					AISEndedCommand.__super__.constructor.call(this);
				}


				__extends(AISEndedCommand, AISCommand);


				/**
				 * Executes the command.
				 *
				 * @param {puremvc.Notification} notification
				 *    The notification.
				 *
				 * @override
				 */
				AISEndedCommand.prototype.execute = function(notification) {
					this.getProxy().vcsSet(0);
				};

				function Cookies() {}

				Cookies.setCookie = function(name, value, days, path, domain) {
					var expires;
					value = escape(value);
					if (days != null) {
						expires = new Date();
						expires.setDate(expires.getDate() + days);
						value += "; expires=" + expires.toUTCString();
					}
					if (domain != null) {
						value += "; domain=" + domain;
					}
					if (path != null) {
						value += "; path=" + path;
					}
					return document.cookie = name + "=" + value;
				};

				Cookies.getCookie = function(name) {
					var cookie, cookies, index, key, value, _i, _len;
					cookies = document.cookie.split(";");
					for (_i = 0, _len = cookies.length; _i < _len; _i++) {
						cookie = cookies[_i];
						index = cookie.indexOf("=");
						key = cookie.substr(0, index).replace(/^\s+|\s+$/g, "");
						value = unescape(cookie.substr(index + 1));
						if (key === name) {
							return value;
						}
					}
				};

				Cookies.deleteCookie = function(name) {
					return this.setCookie(name, "", -1);
				};

				/**
				 * The AISTimeUpdateCommand class.
				 *
				 * @constructor
				 * @private
				 * @extends {AISCommand}
				 */
				function AISTimeUpdateCommand() {
					AISTimeUpdateCommand.__super__.constructor.call(this);
				}


				__extends(AISTimeUpdateCommand, AISCommand);


				/**
				 * Executes the command.
				 *
				 * @param {puremvc.Notification} notification
				 *    The notification.
				 *
				 * @override
				 */
				AISTimeUpdateCommand.prototype.execute = function(notification) {
					var currentTime, proxy;
					proxy = this.getProxy();
					currentTime = Math.floor(notification.getBody());
					if (currentTime !== 0 && currentTime % 30 === 0 && currentTime !== proxy.currentTime) {
						proxy.vcsSet(currentTime);
					}
					proxy.currentTime = currentTime;
				};

				/**
				 * The PluginProxy class.
				 *
				 * @param {Object} config
				 * @constructor
				 * @private
				 * @extends {DataBoundConfigurationProxy}
				 */
				function PluginProxy(config) {
					PluginProxy.__super__.constructor.call(this, config);
				}


				__extends(PluginProxy, DataBoundConfigurationProxy);


				/** @static
				 */
				PluginProxy.NAME = ModuleProxy.NAME;

				PluginProxy.prototype.enabled = true;

				PluginProxy.prototype.plugin = null;

				/**
				 */
				PluginProxy.prototype.setEnabled = function(value) {
					this.enabled = value;
					return value;
				};

				PluginProxy.prototype.getEnabled = function() {
					return this.enabled;
				};

				/**
				 */
				PluginProxy.prototype.createPlugin = function() {};

				/**
				 */
				PluginProxy.prototype.initialize = function() {
					this.plugin = this.createPlugin();
				};

				/**
				 */
				PluginProxy.prototype.error = function(err) {
					this.facade.logger.error("[AMP " + (this.facade.getModuleName().toUpperCase()) + " Error]", err);
				};

				/**
				 * @constructor
				 * @private
				 * @extends {PluginProxy}
				 */
				function AISProxy(config) {
					AISProxy.__super__.constructor.call(this, config);
				}


				__extends(AISProxy, PluginProxy);


				/** @static
				 */
				AISProxy.NAME = ModuleProxy.NAME;

				AISProxy.prototype.client = null;

				AISProxy.prototype.currentTime = null;

				AISProxy.prototype.idps = null;

				AISProxy.prototype.idp = null;

				AISProxy.prototype.token = null;

				AISProxy.prototype.authz = null;

				AISProxy.prototype.defaults = {
					platformID: null,
					resourceID: null,
					contentID: null,
					responseTargets: null,
					logos: {
						base: null,
						group: null,
						key: "full"
					}
				};

				/** @override
				 */
				AISProxy.prototype.getScript = function() {
					return this.value.plugin;
				};

				/**
				 */
				AISProxy.prototype.initialize = function() {
					this.client = window.ais_client;
					this.client.setLogging(this.facade.logger.enabled);
					this.client.setPlatformId(this.value.platformID);
					this.client.setUseCache(!/MSIE [7-8]/.test(navigator.userAgent));
					this.client.assignhandler('bounce', this.bounceHandler.bind(this));
					this.client.assignhandler('chooser', this.chooserHandler.bind(this));
					this.client.assignhandler('init', this.initHandler.bind(this));
					this.client.assignhandler('authz_query', this.authz_queryHandler.bind(this));
					this.client.assignhandler('identity', this.identityHandler.bind(this));
					this.client.assignhandler('logout_result', this.logoutHandler.bind(this));
					this.client.assignhandler('vcs', this.vcsHandler.bind(this));
					window.onunload = function() {};
				};

				/**
				 */
				AISProxy.prototype.authorize = function() {
					this.authz = null;
					this.token = null;
					this.disengage();
					this.sendNotification(AISNotifications.START_AUTHENTICATION);
				};

				/**
				 */
				AISProxy.prototype.authorized = function(token) {
					if (token == null) {
						token = this.token;
					}
					this.engage();
					this.sendNotification(AISNotifications.AUTHENTICATION_COMPLETE);
					this.sendNotification(SecurityNotifications.AUTHORIZED, token);
				};

				/**
				 */
				AISProxy.prototype.play = function(time) {
					this.sendNotification(Notifications.INITIALIZED);
					this.sendNotification(Notifications.PLAY);
					if (time != null) {
						return this.sendNotification(Notifications.SEEK, time);
					}
				};

				/**
				 */
				AISProxy.prototype.engage = function() {
					this.facade.registerCommand(Notifications.TIME_UPDATE, AISTimeUpdateCommand);
					this.facade.registerCommand(Notifications.PAUSE, AISPauseCommand);
					this.facade.registerCommand(Notifications.ENDED, AISEndedCommand);
				};

				/**
				 */
				AISProxy.prototype.disengage = function() {
					this.facade.removeCommand(Notifications.TIME_UPDATE);
					this.facade.removeCommand(Notifications.PAUSE);
					this.facade.removeCommand(Notifications.ENDED);
				};

				/**
				 */
				AISProxy.prototype.logout = function() {
					var height, method, target, width, _ref;
					method = ((_ref = this.idp.window_display) != null ? _ref.method : void 0) || "redirect";
					target = this.getTarget(method);
					this.setRedirect(method);
					switch (method) {
						case "redirect":
							window.open(this.client.logoutFormat(target), "_top");
							break;
						case "popup":
							width = this.idp.window_display.width || 320;
							height = this.idp.window_display.height || 240;
							window.open(this.client.logoutFormat(target), 'ais_popup', 'width=' + width + ',height=' + height);
					}
				};

				/**
				 */
				AISProxy.prototype.bounce = function(resource) {
					this.client.bounce();
				};

				/**
				 */
				AISProxy.prototype.init = function(resource) {
					this.client.init();
				};

				/**
				 */
				AISProxy.prototype.choose = function() {
					this.client.chooser();
				};

				/**
				 */
				AISProxy.prototype.resourceAccess = function(resource) {
					if (resource == null) {
						resource = this.value.resourceID;
					}
					this.client.resourceAccess(resource);
				};

				/**
				 */
				AISProxy.prototype.vcsSet = function(time) {
					time = Utils.formatTimecode(time);
					return this.client.vcsSet(this.value.contentID, time);
				};

				/**
				 */
				AISProxy.prototype.bounceHandler = function(type, resp) {
					var auth;
					auth = resp['authenticated'].toString() === 'true';
					if (auth === false) {
						this.sendNotification(Notifications.DISPATCH_EVENT, new Event("authenticationfailed"));
						this.choose();
					} else if (auth === true) {
						this.init();
					}
				};

				/**
				 */
				AISProxy.prototype.initHandler = function(type, resp) {
					var key, key2, value, value2, _ref;
					this.idp = resp.idps;
					this.facade.idps = {};
					_ref = resp.idps;
					for (key in _ref) {
						value = _ref[key];
						this.facade.idps.key = key;
						for (key2 in value) {
							value2 = value[key2];
							this.facade.idps[key2] = value2;
						}
						break;
					}
					for (key in resp) {
						value = resp[key];
						if (key !== "idps" && (value != null)) {
							this.facade[key] = value;
						}
					}
					this.facade.idps.logo = this.value.logos.base + this.facade.idps.logos[this.value.logos.key];
					this.facade.player.sendNotification(Notifications.REMOVE_APPLICATION_STATE, "authenticating");
					this.sendNotification(AISNotifications.AUTHENTICATED, this.facade.idps);
					this.resourceAccess(this.value.resourceID);
				};

				/**
				 */
				AISProxy.prototype.chooserHandler = function(type, resp) {
					this.facade.sendNotification(Notifications.ADD_APPLICATION_STATE, "authenticating");
					resp.possible_idps = this.idps = this.sort(resp.possible_idps, 'value', 'display_name');
					this.sendNotification(AISNotifications.CHOOSE_AUTH_PROVIDER, resp);
				};

				AISProxy.prototype.launchIDPLogin = function(idp_platform_id) {
					var height, idp, method, target, width, _ref;
					this.sendNotification(AISNotifications.AUTHENTICATING, true);
					idp = this.idps[idp_platform_id];
					method = ((_ref = idp.window_display) != null ? _ref.method : void 0) || "redirect";
					target = this.getTarget(method);
					this.setRedirect(method);
					switch (method) {
						case "redirect":
							window.open(this.client.loginFormat(idp_platform_id, target), "_top");
							break;
						case "popup":
							method = idp.window_display.method || "popup";
							width = idp.window_display.width || 320;
							height = idp.window_display.height || 240;
							window.open(this.client.loginFormat(idp_platform_id, target), 'ais_popup', 'width=' + width + ',height=' + height);
					}
				};

				/**
				 */
				AISProxy.prototype.identityHandler = function(type, resp) {
					var aisuid;
					aisuid = resp['identity']['attributes']['aisuid'];
				};

				/**
				 */
				AISProxy.prototype.authz_queryHandler = function(type, resp) {
					var auth, dimensions, resource;
					auth = resp['authorization'].toString() === "true";
					if (auth === false) {
						this.sendNotification(SecurityNotifications.AUTHORIZATION_FAILED);
						this.authorize();
					} else if (auth === true) {
						this.authz = resp;
						dimensions = {
							mvpdName: this.facade.idps.name,
							viewerId: this.client.aisuid,
							"std:viewerId": this.client.aisuid
						};
						this.facade.player.sendNotification(MediaAnalyticsNotifications.SET_DIMENSIONS, dimensions);
						this.facade.viewerId = this.client.aisuid;
						resource = resp['resource'];
						if (resource != null) {
							this.facade.resource = resource;
						}
						this.token = "hdnea=" + resp['security_token'];
						this.sendNotification(SecurityNotifications.SET_KEY, "hdnea=");
						this.sendNotification(SecurityNotifications.SET_TOKEN, resp['security_token']);
						this.sendNotification(AISNotifications.AUTHENTICATING, false);
						if (this.value.contentID != null) {
							this.client.vcsGet(this.value.contentID);
						} else {
							this.authorized(this.token);
						}
					}
				};

				/**
				 */
				AISProxy.prototype.logoutHandler = function(type, resp) {
					top.location.href = top.location.href;
				};

				/**
				 */
				AISProxy.prototype.vcsHandler = function(type, resp) {
					if (resp['operation'] === 'get') {
						if (resp['ph_pos'] === '00:00:00' || resp['ph_pos'] === "00:00") {
							this.client.vcsSet(this.value.contentID, resp['ph_pos']);
							this.authorized(this.token);
						} else {
							this.sendNotification(AISNotifications.CHOOSE_PLAY_OPTIONS, Utils.flattenTimecode(resp['ph_pos']));
						}
					}
				};

				/**
				 */
				AISProxy.prototype.sort = function(obj, sortType, valueName) {
					var data, index, item, key, returnObj, value, _i, _len;
					returnObj = {};
					data = [];
					index = 0;
					for (key in obj) {
						value = obj[key];
						data[index] = {
							key: key,
							value: value[valueName]
						};
						index++;
					}
					data.sort(function(a, b) {
						var valueA, valueB;
						valueA = sortType === 'value' ? a.value.toLowerCase() : a.key.toLowercase();
						valueB = sortType === 'value' ? b.value.toLowerCase() : b.key.toLowercase();
						if (valueA < valueB) {
							return -1;
						} else if (valueA > valueB) {
							return 1;
						} else {
							return 0;
						}
					});
					for (index = _i = 0, _len = data.length; _i < _len; index = ++_i) {
						item = data[index];
						returnObj[item.key] = obj[item.key];
					}
					return returnObj;
				};

				/**
				 */
				AISProxy.prototype.setRedirect = function(method) {
					var devToken, domain, loc;
					try {
						devToken = /\/dev\./;
						loc = window.top.location.href || window.top.location;
						domain = devToken.test(loc) ? loc.replace(devToken, "/") : null;
						Cookies.setCookie(this.getTarget(method), loc, 1, "/", domain);
					} catch (error) {

					}
				};

				/**
				 */
				AISProxy.prototype.getTarget = function(method) {
					if (method == null) {
						method = "redirect";
					}
					return this.value.responseTargets[method];
				};

				/**
				 * PlaybackProxy constructor.
				 *
				 * @constructor
				 * @private
				 * @extends {puremvc.Proxy}
				 */
				function PlaybackProxy() {
					PlaybackProxy.__super__.constructor.call(this, PlaybackProxy.NAME);
					this.data = {
						core: null,
						muted: false,
						started: false,
						volume: 1,
						currentTime: 0,
						duration: 0,
						src: null,
						ended: false,
						paused: false,
						seeking: false,
						loading: false
					};
					if (Utils.getDevice() === "desktop") {
						this.initialized = true;
					}
					this.handlers = {
						"timeupdate": this.ontimeupdate.bind(this),
						"durationchange": this.ondurationchange.bind(this),
						"play": this.onplay.bind(this),
						"playing": this.onplaying.bind(this),
						"pause": this.onpause.bind(this),
						"loadeddata": this.onloadeddata.bind(this),
						"waiting": this.onwaiting.bind(this),
						"seeking": this.onseeking.bind(this),
						"seeked": this.onseeked.bind(this),
						"ended": this.onended.bind(this),
						"progress": this.onprogress.bind(this),
						"error": this.onerror.bind(this),
						"loadstart": this.onloadstart.bind(this),
						"canplay": this.oncanplay.bind(this),
						"canplaythrough": this.oncanplaythrough.bind(this),
						"loadedmetadata": this.onloadedmetadata.bind(this)
					};
					this.resumeHandlers = {
						"seeked": this.resumeseeked.bind(this),
						"canplay": this.resumecanplay.bind(this)
					};
				}


				__extends(PlaybackProxy, puremvc.Proxy);


				/**
				 * The name of the this Proxy.
				 *
				 * @static
				 * @type {string}
				 */
				PlaybackProxy.NAME = "PlaybackProxy";

				/** @private
				 */
				PlaybackProxy.prototype.data = null;

				PlaybackProxy.prototype.initialized = false;

				PlaybackProxy.prototype.enabled = null;

				PlaybackProxy.prototype.handlers = null;

				PlaybackProxy.prototype.resumeHandlers = null;

				PlaybackProxy.prototype.playWhenLoaded = false;

				/**
				 * The current time of the video in seconds. Value must be between currentTime and duration.
				 *
				 * @param {Number} value
				 *    The new currentTime value in seconds
				 * @returns {Number}
				 *    The currentTime value in seconds
				 * @type {Number}
				 */
				PlaybackProxy.prototype.getEnabled = function() {
					return this.enabled;
				};

				PlaybackProxy.prototype.setEnabled = function(value) {
					if (value === this.enabled) {
						return;
					}
					this.enabled = value;
					if (this.enabled === true) {
						this.load();
					} else {
						this.applyHandlers(false);
					}
					return value;
				};

				/** @private
				 */
				PlaybackProxy.prototype.applyHandlers = function(enabled) {
					var action, handler, type, video, _ref;
					if (enabled == null) {
						enabled = true;
					}
					video = this.getMediaElement();
					action = enabled ? "addEventListener" : "removeEventListener";
					_ref = this.handlers;
					for (type in _ref) {
						handler = _ref[type];
						video[action](type, handler);
					}
				};

				/** @private
				 */
				PlaybackProxy.prototype.resumecanplay = function(event) {
					var video;
					video = event.target;
					video.removeEventListener("canplay", this.resumeHandlers.canplay);
					this.handlers.durationchange(event);
					if (this.data.currentTime > 0) {
						video.addEventListener("seeked", this.resumeHandlers.seeked);
						this.seek();
					} else {
						this.resumecomplete();
					}
				};

				/** @private
				 */
				PlaybackProxy.prototype.resumeseeked = function(event) {
					var video;
					video = event.target;
					video.removeEventListener("seeked", this.resumeHandlers.seeked);
					this.resumecomplete();
				};

				/** @private
				 */
				PlaybackProxy.prototype.resumecomplete = function() {
					this.data.loading = false;
					this.applyHandlers(true);
					if (this.playWhenLoaded === true) {
						setTimeout(this.play.bind(this), 0);
					}
				};

				PlaybackProxy.prototype.ontimeupdate = function(event) {
					this.data.currentTime = event.target.currentTime;
					this.sendNotification(Notifications.TIME_UPDATE, this.data.currentTime);
				};

				PlaybackProxy.prototype.ondurationchange = function(event) {
					var duration;
					duration = this.getMediaElement().duration;
					if (duration === this.data.duration || duration === 0 || isNaN(duration)) {
						return;
					}
					this.data.duration = duration;
					if (/Android 4/.test(navigator.userAgent) && event.target.src.indexOf(".m3u8") !== -1) {
						return;
					}
					this.sendNotification(Notifications.CHANGE_DURATION, duration);
				};

				PlaybackProxy.prototype.onplay = function(event) {
					this.data.paused = false;
				};

				PlaybackProxy.prototype.onplaying = function(event) {
					this.data.paused = false;
					this.data.seeking = false;
					this.sendNotification(Notifications.CHANGE_PLAY_STATE, PlayState.PLAYING);
					this.sendNotification(Notifications.PLAYING);
				};

				PlaybackProxy.prototype.onpause = function(event) {
					if (this.data.seeking === true) {
						return;
					}
					this.data.paused = true;
					if (event.target.readyState > 0) {
						this.sendNotification(Notifications.PAUSED);
						this.sendNotification(Notifications.CHANGE_PLAY_STATE, PlayState.PAUSED);
					}
				};

				PlaybackProxy.prototype.onloadeddata = function(event) {
					this.sendNotification(Notifications.LOADED_DATA);
				};

				PlaybackProxy.prototype.onwaiting = function(event) {
					this.sendNotification(Notifications.WAITING);
				};

				PlaybackProxy.prototype.onseeking = function(event) {
					event.target.removeEventListener("timeupdate", this.handlers.timeupdate);
					this.data.seeking = true;
					this.sendNotification(Notifications.SEEKING);
				};

				PlaybackProxy.prototype.onseeked = function(event) {
					this.data.seeking = false;
					this.sendNotification(Notifications.SEEKED);
					event.target.addEventListener("timeupdate", this.handlers.timeupdate);
				};

				PlaybackProxy.prototype.onended = function(event) {
					this.data.ended = true;
					this.sendNotification(Notifications.ENDED);
				};

				PlaybackProxy.prototype.onprogress = function(event) {
					var buffered, video;
					try {
						video = event.target;
						buffered = video.buffered;
						this.sendNotification(Notifications.PROGRESS, buffered.end(buffered.length - 1) / video.duration);
					} catch (error) {

					}
				};

				PlaybackProxy.prototype.onerror = function(event) {
					this.sendNotification(Notifications.ERROR, event.target.error);
				};

				PlaybackProxy.prototype.onloadstart = function(event) {
					this.sendNotification(Notifications.LOAD_START);
				};

				PlaybackProxy.prototype.oncanplay = function(event) {
					this.sendNotification(Notifications.CAN_PLAY);
				};

				PlaybackProxy.prototype.oncanplaythrough = function(event) {
					this.sendNotification(Notifications.CAN_PLAY_THROUGH);
					this.sendNotification(Notifications.PROGRESS, this.getDuration());
				};

				PlaybackProxy.prototype.onloadedmetadata = function(event) {
					this.sendNotification(Notifications.ENABLE_FULL_SCREEN);
					this.sendNotification(Notifications.LOADED_METADATA);
				};

				/** @private
				 */
				PlaybackProxy.prototype.reset = function() {
					this.data.currentTime = 0;
					this.data.duration = 0;
					this.data.src = null;
					this.data.ended = false;
					this.data.paused = false;
					this.data.seeking = false;
					this.data.started = false;
					this.data.loading = false;
				};

				/**
				 * @return {boolean}
				 */
				PlaybackProxy.prototype.getStarted = function() {
					return this.data.started;
				};

				/**
				 * The playback core
				 *
				 * @param {HTMLVideoElement} value
				 *    The new playback core
				 * @returns {HTMLVideoElement}
				 *    The playback core
				 * @type {HTMLVideoElement}
				 *
				 * @private
				 */
				PlaybackProxy.prototype.getMediaElement = function() {
					return this.facade.getMediaElement();
				};

				/**
				 * Determines if the core can play a given mimeType.
				 *
				 * @return {String} "" if the core can't play the mimeType
				 */
				PlaybackProxy.prototype.canPlayType = function(mimeType) {
					var canPlay;
					canPlay = this.getMediaElement().canPlayType(mimeType) || "";
					if ((/Android 4\.[1-9]/.test(navigator.userAgent) || /Silk\/3/.test(navigator.userAgent)) && mimeType === Utils.mimeTypes.m3u8) {
						canPlay = "maybe";
					}
					return canPlay;
				};

				/**
				 * Indicates whether or not the video is playing.
				 *
				 * @returns {Boolean}
				 *    The playing value
				 * @type {Boolean}
				 */
				PlaybackProxy.prototype.getPaused = function() {
					return this.data.paused;
				};

				/**
				 * Indicates whether or not the video is playing.
				 *
				 * @returns {Boolean}
				 *    The playing value
				 * @type {Boolean}
				 */
				PlaybackProxy.prototype.getEnded = function() {
					return this.data.ended;
				};

				/**
				 * Indicates whether or not the video is playing.
				 *
				 * @returns {Boolean}
				 *    The playing value
				 * @type {Boolean}
				 */
				PlaybackProxy.prototype.getSeeking = function() {
					return this.data.seeking;
				};

				/**
				 * The current time of the video in seconds. Value must be between currentTime and duration.
				 *
				 * @param {Number} value
				 *    The new currentTime value in seconds
				 * @returns {Number}
				 *    The currentTime value in seconds
				 * @type {Number}
				 */
				PlaybackProxy.prototype.getCurrentTime = function() {
					return this.data.currentTime;
				};

				PlaybackProxy.prototype.setCurrentTime = function(value) {
					if (value === this.data.currentTime) {
						return;
					}
					this.data.currentTime = value;
					if (this.getStarted()) {
						this.seek(value);
					}
					return value;
				};

				/** @private
				 */
				PlaybackProxy.prototype.seek = function(value) {
					if (value == null) {
						value = this.data.currentTime;
					}
					this.getMediaElement().currentTime = value;
				};

				/**
				 * The current time of the video in seconds. Value must be between currentTime and duration.
				 *
				 * @param {Number} value
				 *    The new currentTime value in seconds
				 * @returns {Number}
				 *    The currentTime value in seconds
				 * @type {Number}
				 */
				PlaybackProxy.prototype.getSrc = function() {
					return this.data.src;
				};

				PlaybackProxy.prototype.setSrc = function(value) {
					if (!(value != null) || value === "") {
						this.sendNotification(Notifications.ERROR, "The value of src is not supported: " + value);
					}
					this.reset();
					this.data.src = value;
					return value;
				};

				/**
				 * The current time of the video in seconds. Value must be between currentTime and duration.
				 *
				 * @param {Number} value
				 *    The new currentTime value in seconds
				 * @returns {Number}
				 *    The currentTime value in seconds
				 * @type {Number}
				 */
				PlaybackProxy.prototype.getVolume = function() {
					return this.getMediaElement().volume;
				};

				PlaybackProxy.prototype.setVolume = function(value) {
					if ((0 <= value && value <= 1) && value !== this.getMediaElement().volume) {
						this.sendNotification(Notifications.VOLUME_CHANGE, this.getMediaElement().volume = value);
					}
					return value;
				};

				/**
				 */
				PlaybackProxy.prototype.getMuted = function() {
					return this.data.muted;
				};

				PlaybackProxy.prototype.setMuted = function(value) {
					var volume;
					this.data.muted = value;
					if (this.data.muted === true) {
						this.data.volume = this.getVolume();
						volume = 0;
					} else {
						volume = this.data.volume;
					}
					this.sendNotification(Notifications.CHANGE_VOLUME, volume);
					return value;
				};

				/**
				 * The duration of the video in seconds.
				 *
				 * @returns {Number}
				 *    The duration of the video
				 * @type {Number}
				 */
				PlaybackProxy.prototype.getDuration = function() {
					return this.data.duration;
				};

				/**
				 * Instructs the core to play.
				 */
				PlaybackProxy.prototype.play = function() {
					if (this.data.started !== true) {
						this.data.started = true;
						this.setEnabled(true);
						this.playWhenLoaded = true;
					} else if (this.data.loading === true) {
						this.playWhenLoaded = true;
					} else {
						this.getMediaElement().play();
					}
				};

				/**
				 * Instructs the core to pause.
				 */
				PlaybackProxy.prototype.pause = function() {
					this.data.paused = true;
					this.getMediaElement().pause();
				};

				/**
				 * Instructs the core to load.
				 */
				PlaybackProxy.prototype.load = function() {
					var element, _ref;
					this.data.loading = true;
					this.playWhenLoaded = false;
					element = this.getMediaElement();
					element.addEventListener("canplay", this.resumeHandlers.canplay);
					element.addEventListener("loadedmetadata", this.handlers.loadedmetadata);
					element.addEventListener("durationchange", this.handlers.durationchange);
					element.addEventListener("canplaythrough", this.handlers.canplaythrough);
					element.src = this.data.src;
					if (Utils.isIPad() && ((_ref = Utils.getIOSversion()) != null ? _ref[0] : void 0) < 8) {
						setTimeout(element.load.bind(element), 100);
					} else {
						element.load();
					}
				};

				/**
				 * The AISFlashAuthenticatedCommand class.
				 *
				 * @constructor
				 * @private
				 * @extends {puremvc.SimpleCommand}
				 */
				function FlashAuthorizedCommand() {
					FlashAuthorizedCommand.__super__.constructor.call(this);
				}


				__extends(FlashAuthorizedCommand, puremvc.SimpleCommand);


				/**
				 * Executes the command.
				 *
				 * @param {puremvc.Notification} notification
				 *    The notification.
				 *
				 * @override
				 */
				FlashAuthorizedCommand.prototype.execute = function(notification) {
					var mediaProxy, securityProxy, src;
					mediaProxy = this.facade.retrieveProxy(MediaProxy.NAME);
					securityProxy = this.facade.retrieveProxy(SecurityProxy.NAME);
					src = mediaProxy.getSrc() || "";
					if (src.indexOf(".smil") === -1) {
						src = securityProxy.createURL(src);
					}
					mediaProxy.setSrc(src);
					this.facade.video.authenticationComplete({
						media: mediaProxy.getData()
					});
				};

				/**
				 * PlaybackCoreProxy constructor.
				 *
				 * @constructor
				 * @private
				 * @extends {PlaybackProxy}
				 */
				function PlaybackCoreProxy(supportedTypes) {
					this.supportedTypes = supportedTypes != null ? supportedTypes : this.supportedTypes;
					PlaybackCoreProxy.__super__.constructor.call(this);
				}


				__extends(PlaybackCoreProxy, PlaybackProxy);


				PlaybackCoreProxy.prototype.supportedTypes = null;

				PlaybackCoreProxy.prototype.playbackCoreName = null;

				/**
				 */
				PlaybackCoreProxy.prototype.getPlaybackCoreName = function() {
					return this.playbackCoreName;
				};

				/**
				 */
				PlaybackCoreProxy.prototype.getSupportedTypes = function() {
					return this.supportedTypes;
				};

				/**
				 */
				PlaybackCoreProxy.prototype.setSupportedTypes = function(types) {
					this.supportedTypes = types;
					return types;
				};

				/** @override
				 */
				PlaybackCoreProxy.prototype.canPlayType = function(mimeType) {
					if (this.getSupportedTypes().indexOf(mimeType) !== -1) {
						return "maybe";
					}
					return "";
				};

				/**
				 * ChromeCastPlaybackProxy constructor.
				 *
				 * @constructor
				 * @extends {PlaybackCoreProxy}
				 * @private
				 */
				function FlashPlaybackProxy(player) {
					this.player = player;
					FlashPlaybackProxy.__super__.constructor.call(this);
				}


				__extends(FlashPlaybackProxy, PlaybackCoreProxy);


				/**
				 * The name of the this Proxy.
				 *
				 * @static
				 * @type {string}
				 */
				FlashPlaybackProxy.NAME = PlaybackProxy.NAME;

				FlashPlaybackProxy.prototype.player = null;

				FlashPlaybackProxy.prototype.initialized = true;

				FlashPlaybackProxy.prototype.playbackCoreName = "flash";

				FlashPlaybackProxy.prototype.supportedTypes = ["video/mp4", "video/x-flv", "video/f4m", "application/smil", "application/smil+xml"];

				/**
				 * Indicates whether or not the video is playing.
				 *
				 * @returns {Boolean}
				 *    The playing value
				 * @type {Boolean}
				 */
				FlashPlaybackProxy.prototype.getPaused = function() {
					return this.player.getPaused();
				};

				/**
				 * Indicates whether or not the video is playing.
				 *
				 * @returns {Boolean}
				 *    The playing value
				 * @type {Boolean}
				 */
				FlashPlaybackProxy.prototype.getEnded = function() {
					return this.player.getEnded();
				};

				/**
				 * Indicates whether or not the video is playing.
				 *
				 * @returns {Boolean}
				 *    The playing value
				 * @type {Boolean}
				 */
				FlashPlaybackProxy.prototype.getSeeking = function() {
					return this.player.getSeeking();
				};

				/**
				 * The current time of the video in seconds. Value must be between currentTime and duration.
				 *
				 * @param {Number} value
				 *    The new currentTime value in seconds
				 * @returns {Number}
				 *    The currentTime value in seconds
				 * @type {Number}
				 */
				FlashPlaybackProxy.prototype.getCurrentTime = function() {
					return this.player.getCurrentTime();
				};

				FlashPlaybackProxy.prototype.setCurrentTime = function(value) {
					this.player.setCurrentTime(value);
					return value;
				};

				/**
				 * The current time of the video in seconds. Value must be between currentTime and duration.
				 *
				 * @param {Number} value
				 *    The new currentTime value in seconds
				 * @returns {Number}
				 *    The currentTime value in seconds
				 * @type {Number}
				 */
				FlashPlaybackProxy.prototype.getSrc = function() {
					return this.player.getSrc();
				};

				FlashPlaybackProxy.prototype.setSrc = function(value) {
					this.player.setSrc(value);
					return value;
				};

				/**
				 * The current time of the video in seconds. Value must be between currentTime and duration.
				 *
				 * @param {Number} value
				 *    The new currentTime value in seconds
				 * @returns {Number}
				 *    The currentTime value in seconds
				 * @type {Number}
				 */
				FlashPlaybackProxy.prototype.getVolume = function() {
					return this.player.getVolume();
				};

				FlashPlaybackProxy.prototype.setVolume = function(value) {
					this.player.setVolume(value);
					return value;
				};

				/**
				 */
				FlashPlaybackProxy.prototype.getMuted = function() {
					return this.player.getMuted();
				};

				FlashPlaybackProxy.prototype.setMuted = function(value) {
					this.player.setMuted(value);
					return value;
				};

				/**
				 * The duration of the video in seconds.
				 *
				 * @returns {Number}
				 *    The duration of the video
				 * @type {Number}
				 */
				FlashPlaybackProxy.prototype.getDuration = function(value) {
					return this.player.getDuration();
				};

				/**
				 * Instructs the core to play.
				 */
				FlashPlaybackProxy.prototype.play = function() {
					this.player.play();
				};

				/**
				 * Instructs the core to pause.
				 */
				FlashPlaybackProxy.prototype.pause = function() {
					this.player.pause();
				};

				/**
				 * Instructs the core to load.
				 */
				FlashPlaybackProxy.prototype.load = function() {
					this.player.load();
				};

				/**
				 * The FlashPlayer class
				 *
				 * @param {Object} viewComponent
				 * @constructor
				 * @private
				 * @extends {Player}
				 */
				function FlashPlayer(viewComponent) {
					this.flashObjectID += Date.now();
					this.plugins = {};
					this.displayState = DisplayState.NORMAL;
					this.debug = /debug\=true/.test(location.search);
					FlashPlayer.__super__.constructor.call(this, viewComponent);
				}


				__extends(FlashPlayer, Player);


				/** @override
				 */
				FlashPlayer.prototype.createFramework = function() {
					var attributes, expressInstallSWF, flash, params, swf, swfs, version, xml, _ref,
						_this = this;
					FlashPlayer.__super__.createFramework.call(this);
					flash = this.config.flash || {};
					swfs = ((_ref = flash["static"]) != null ? _ref.enabled : void 0) === true ? flash["static"] : flash;
					swf = this.debug && (swfs.debug != null) ? swfs.debug : swfs.swf || "amp.swf";
					version = flash.version || "10.1";
					expressInstallSWF = flash.expressInstallSWF || "playerProductInstall.swf";
					params = this.createParams(flash);
					attributes = this.createAttributes(flash);
					this.flashvars = this.createFlashVars(flash);
					if (!(this.flashvars.settings_url != null)) {
						xml = this.createXML(this.config);
						if (xml != null) {
							this.flashvars.settings_xml = xml;
						}
					}
					swfobject.embedSWF(swf, this.flashObjectID, "100%", "100%", version, expressInstallSWF, this.flashvars, params, attributes, function(obj) {
						_this.createdHandler(obj);
					});
				};

				FlashPlayer.prototype.playerType = "flash";

				FlashPlayer.prototype.flashObjectID = "flashObject";

				FlashPlayer.prototype.playState = null;

				FlashPlayer.prototype.loaded = false;

				FlashPlayer.prototype.flashvars = null;

				FlashPlayer.prototype.seeking = false;

				FlashPlayer.prototype.paused = false;

				FlashPlayer.prototype.ended = false;

				FlashPlayer.prototype.muted = false;

				FlashPlayer.prototype.plugins = null;

				FlashPlayer.prototype.debug = false;

				FlashPlayer.prototype.started = false;

				FlashPlayer.prototype.displayState = null;

				FlashPlayer.prototype.mediaProxy = null;

				/** @override
				 */
				FlashPlayer.prototype.createModel = function() {
					this.registerProxy(new ApplicationStateProxy());
					this.registerProxy(new DataBindingProxy());
					this.registerProxy(new SecurityProxy());
					this.mediaProxy = new MediaProxy();
					this.registerProxy(this.mediaProxy);
					this.registerProxy(new FlashPlaybackProxy(this));
				};

				/** @override
				 */
				FlashPlayer.prototype.createView = function() {
					this.registerMediator(new FlashPlayerMediator(this.getViewComponent()));
					this.registerMediator(new VideoLayerMediator());
					this.registerMediator(new OverlayLayerMediator());
					this.registerMediator(new LocalizationWrapper(this, this.config));
				};

				/** @override
				 */
				FlashPlayer.prototype.createController = function() {
					this.registerCommand(SecurityNotifications.AUTHORIZED, FlashAuthorizedCommand);
					this.registerCommand(SecurityNotifications.SET_TOKEN, SecuritySetTokenCommand);
					this.registerCommand(SecurityNotifications.SET_KEY, SecuritySetKeyCommand);
					this.registerCommand(Notifications.CHANGE_PLAY_STATE, ChangePlayStateCommand);
				};

				/** @override
				 */
				FlashPlayer.prototype.createMediaElement = function() {
					var video, viewComponent;
					video = new MediaElementMediator("flash", "div");
					viewComponent = video.getViewComponent();
					viewComponent.id = viewComponent.name = this.flashObjectID;
					this.sendNotification(Notifications.PLAYBACK_CORE_CHANGE, video);
					return viewComponent;
				};

				/**
				 */
				FlashPlayer.prototype.createParams = function(flash) {
					var params;
					params = {
						allowFullScreen: true,
						allowScriptAccess: "always",
						wmode: "direct",
						bgColor: "#000000"
					};
					if (flash.params != null) {
						if (flash.params.allowFullScreen != null) {
							params.allowFullScreen = flash.params.allowFullScreen;
						}
						if (flash.params.allowScriptAccess != null) {
							params.allowScriptAccess = flash.params.allowScriptAccess;
						}
						if (flash.params.wmode != null) {
							params.wmode = flash.params.wmode;
						}
						if (flash.params.bgColor != null) {
							params.bgColor = flash.params.bgColor;
						}
					}
					if (params.wmode === "direct" && /MSIE/.test(navigator.userAgent)) {
						params.wmode = "transparent";
					}
					return params;
				};

				/** @override
				 */
				FlashPlayer.prototype.getModules = function() {
					return this.plugins;
				};

				/** @override
				 */
				FlashPlayer.prototype.createPlugins = function() {
					var def, feature, key, plugin, register, _ref;
					_ref = AMP.plugins;
					for (key in _ref) {
						register = _ref[key];
						if (!((key in this.config) && !(this.config[key].enabled === false))) {
							continue;
						}
						def = register[this.getPlayerType()];
						if (!(def != null)) {
							this.logger.debug("[AMP FLASH]", "Plugin could not be found", key);
							continue;
						}
						try {
							plugin = this[key] = this.plugins[key] = new def(this, this.config[key]);
							this.registerMediator(this.plugins[key]);
							feature = typeof plugin.getFeatureName === "function" ? plugin.getFeatureName() : void 0;
							if (feature != null) {
								this[feature] = plugin;
							}
							this.logger.debug("[AMP FLASH]", "Plugin Registered", key);
						} catch (error) {
							this.error("Plugin Error: " + key, error);
							continue;
						}
					}
					this.sendNotification(PluginNotifications.PLUGINS_INITIALIZED, this.plugins);
				};

				/**
				 */
				FlashPlayer.prototype.createAttributes = function(flash) {
					var attributes;
					attributes = {
						id: this.flashObjectID,
						name: this.flashObjectID
					};
					if (flash.attributes != null) {
						if (flash.attributes.id != null) {
							attributes.id = flash.attributes.id;
						}
						if (flash.attributes.name != null) {
							attributes.name = flash.attributes.name;
						}
					}
					return attributes;
				};

				/**
				 */
				FlashPlayer.prototype.createFlashJSON = function(config, spacer) {
					var prepJSON, prepValue;
					if (config == null) {
						config = this.config;
					}
					config = JSON.parse(JSON.stringify(config));
					prepValue = function(config, key, value) {
						switch (typeof value) {
							case "string":
								config[key] = escape(value);
								break;
							case "object":
							case "array":
								prepJSON(value);
						}
					};
					prepJSON = function(config) {
						var key, value, _i, _len;
						if (config instanceof Array) {
							for (key = _i = 0, _len = config.length; _i < _len; key = ++_i) {
								value = config[key];
								prepValue(config, key, value);
							}
						} else if (typeof config === "object") {
							for (key in config) {
								value = config[key];
								prepValue(config, key, value);
							}
						}
					};
					prepJSON(config);
					return escape(JSON.stringify(config, null, spacer));
				};

				/**
				 */
				FlashPlayer.prototype.createFlashVars = function(flash) {
					var flashvars, key, settings, value, _ref, _ref1, _ref2, _ref3;
					flashvars = {};
					settings = JSON.parse(JSON.stringify(this.config));
					settings.flash = null;
					delete settings.flash;
					settings.locales = null;
					delete settings.locales;
					settings.params = null;
					delete settings.params;
					settings.rules = null;
					delete settings.rules;
					flashvars.settings_json = this.createFlashJSON(settings);
					if (this.config.autoplay != null) {
						flashvars.auto_play = this.config.autoplay;
					}
					if ((this.config.rules != null)) {
						Utils.mergeRules(this.config.rules);
					}
					flashvars.hinting_rules = escape(JSON.stringify(Utils.rules));
					if (this.config.volume != null) {
						flashvars.volume = Utils.clamp(this.config.volume, 0, 1);
					}
					if ((this.config.target != null)) {
						flashvars.external_target = this.config.target;
					}
					if ((this.config.name != null)) {
						flashvars.core_player_name = this.config.name;
					}
					if ((this.config.domain != null)) {
						flashvars.embed_domain = flashvars.domain = this.config.domain;
					}
					flashvars.auto_replay = this.config.loop === true;
					if (this.config.fullscreen != null) {
						flashvars.fullscreen_enabled = this.config.fullscreen.enabled !== false && this.config.fullscreen.mode !== FullscreenMode.EXTERNAL;
					}
					if (this.config.titlebar != null) {
						flashvars.titlebar_enabled = this.config.titlebar.enabled !== false;
					}
					if (this.config.params != null) {
						flashvars.params = escape(JSON.stringify(this.config.params));
					}
					if (this.config.version != null) {
						flashvars.context_menu_label = this.config.version;
					}
					if (((_ref = this.config.controls) != null ? _ref.displaySceneMarkers : void 0) != null) {
						flashvars.displaySceneMarkers = this.config.controls.displaySceneMarkers;
					}
					if (this.config.media != null) {
						if (this.config.media.src != null) {
							this.setSrc(this.config.media.src);
							flashvars.video_url = escape(this.config.media.src);
						}
						if ((this.config.media.source != null) && this.config.media.source.length > 0) {
							this.setSource(this.config.media.source);
							flashvars.video_url = escape(this.mediaProxy.getSrc());
						}
						if (this.config.media.medium != null) {
							this.setMedium(this.config.media.medium);
							flashvars.medium = this.config.media.medium;
						}
						if (this.config.media.title != null) {
							flashvars.title = escape(this.config.media.title);
						}
						if (this.config.media.poster != null) {
							flashvars.poster = escape(this.config.media.poster);
						}
						if (this.config.media.temporalType != null) {
							flashvars.temporalType = this.config.media.temporalType;
						}
					}
					if (this.getMedium() === "audio") {
						flashvars.controls = true;
						flashvars.auto_hide = -1;
					}
					if (((_ref1 = this.config.ima) != null ? (_ref2 = _ref1.overlay) != null ? _ref2.delay : void 0 : void 0) != null) {
						flashvars.overlay_ad_delay = this.config.ima.overlay.delay;
					}
					if ((this.config.ticker != null) && this.config.ticker.enabled !== false) {
						if (this.config.ticker.url != null) {
							flashvars.ticker_text_url = this.config.ticker.url;
						}
						if (this.config.ticker.interval != null) {
							flashvars.ticker_polling_interval = this.config.ticker.interval;
						}
						if (this.config.ticker.speed != null) {
							flashvars.ticker_speed = this.config.ticker.speed;
						}
					}
					flashvars.show_play_button_overlay = false;
					flashvars.auto_play_list = false;
					flashvars.next_video_timer = 0;
					if (flashvars.context_menu_mode == null) {
						flashvars.context_menu_mode = this.debug === true ? "long" : "short";
					}
					this.sendNotification(FlashNotifications.CREATE_FLASH_VARS, {
						flashvars: flashvars,
						config: this.config
					});
					if (flash.vars != null) {
						_ref3 = flash.vars;
						for (key in _ref3) {
							value = _ref3[key];
							flashvars[key] = value;
						}
					}
					return flashvars;
				};

				/**
				 */
				FlashPlayer.prototype.createXML = function(config) {
					var app, clss, element, elements, mode, plugin, plugins, staticConfig, str, url, xml, _i, _j, _k, _len, _len1, _len2, _ref, _ref1;
					if (!((config != null ? (_ref = config.flash) != null ? _ref.xml : void 0 : void 0) != null)) {
						return;
					}
					xml = XMLUtils.parse(config.flash.xml);
					this.sendNotification(FlashNotifications.CREATE_XML, {
						config: config,
						xml: xml
					});
					plugins = xml.getElementsByTagName("plugin");
					staticConfig = config.flash["static"];
					if ((staticConfig != null ? staticConfig.enabled : void 0) === true && (staticConfig.plugins != null)) {
						for (_i = 0, _len = plugins.length; _i < _len; _i++) {
							plugin = plugins[_i];
							if (!((clss = staticConfig.plugins[plugin.getAttribute("id")]) != null)) {
								continue;
							}
							plugin.setAttribute("type", "static");
							XMLUtils.updateTextContent(plugin, clss);
						}
					} else if (this.debug === true) {
						for (_j = 0, _len1 = plugins.length; _j < _len1; _j++) {
							plugin = plugins[_j];
							if (!(plugin.getAttribute("id") === "AkamaiAdvancedStreamingPlugin")) {
								continue;
							}
							url = plugin.textContent || plugin.text;
							XMLUtils.updateTextContent(plugin, url.replace("AkamaiAdvancedStreamingPlugin.swf", "AkamaiAdvancedStreamingPlugin-logging.swf"));
						}
					}
					mode = (_ref1 = this.config.fullscreen) != null ? _ref1.mode : void 0;
					if (mode != null) {
						elements = xml.getElementsByTagName("element");
						for (_k = 0, _len2 = elements.length; _k < _len2; _k++) {
							element = elements[_k];
							if (element.getAttribute("id") === "fullscreenBtn") {
								element.setAttribute("action", "external");
							}
						}
					}
					str = XMLUtils.serialize(xml);
					app = str.match(/<application>[\w\W\s\S\d\D]*<\/application>/)[0] || str;
					app = app.replace(/[\n\r\t]/g, "");
					return escape(app);
				};

				/**
				 */
				FlashPlayer.prototype.createdHandler = function(obj) {
					var _this = this;
					this.mediaElement = obj.ref;
					this.mediaElement.className = Namespace.PREFIX + MediaElementMediator.prototype.componentType;
					this.mediaElement.eventHandler = function(eventName, body) {
						return _this.eventHandler(eventName, body);
					};
					this.sendNotification(FlashNotifications.FLASH_CREATED);
					if (this.getMedium() != null) {
						this.setMedium(this.getMedium());
					}
				};

				/**
				 */
				FlashPlayer.prototype.eventHandler = function(eventName, body) {
					var error, event, state, type, _ref, _ref1;
					try {
						switch (eventName) {
							case FlashNotifications.INITIALIZED:
								type = state = "ready";
								break;
							case FlashNotifications.RESET:
								if (!(body != null)) {
									state = "ready";
								}
								this.started = false;
								break;
							case FlashNotifications.LOADING:
								type = "loadstart";
								break;
							case FlashNotifications.PLAYER_ERROR:
								type = state = "error";
								break;
							case FlashNotifications.MEDIA_ERROR:
								type = state = "error";
								break;
							case FlashNotifications.ERROR_STREAM_NOT_FOUND:
								type = state = "error";
								break;
							case FlashNotifications.CAPABILITY_CHANGE:
								event = body.type;
								if (event === "canPlayChange" && body.enabled === true) {
									type = "canplay";
									this.loaded = true;
								} else if (event === "canSeekChange" && body.enabled === true) {
									type = "canplaythrough";
								} else if (event === "temporalChange" && body.enabled === true) {
									type = "loadedmetadata";
								}
								break;
							case FlashNotifications.PLAYBACK_OPEN:
								type = "started";
								this.started = true;
								break;
							case FlashNotifications.PLAYING:
								if (!this.started) {
									this.sendNotification(Notifications.PLAY, body);
								}
								type = state = "playing";
								this.ended = false;
								this.paused = false;
								break;
							case FlashNotifications.ELEMENT_EVENT:
								if (body.element === "fullscreenBtn" && body.type === "click" && ((_ref = this.config) != null ? (_ref1 = _ref.fullscreen) != null ? _ref1.mode : void 0 : void 0) === FullscreenMode.EXTERNAL) {
									state = this.getDisplayState() === DisplayState.FULL_SCREEN ? DisplayState.NORMAL : DisplayState.FULL_SCREEN;
									this.setDisplayState(state);
								}
								break;
							case FlashNotifications.PLAY_REQUEST:
								type = "playrequest";
								break;
							case FlashNotifications.PLAY:
								if (this.playState !== "paused" && this.started) {
									type = "play";
								}
								break;
							case FlashNotifications.ENDED:
								type = state = "ended";
								this.ended = true;
								break;
							case FlashNotifications.PAUSED:
								type = "pause";
								state = "paused";
								this.paused = true;
								break;
							case FlashNotifications.BUFFERING:
								if (this.className !== "ended") {
									type = state = "waiting";
								}
								break;
							case FlashNotifications.DURATION_CHANGE:
								if (!isNaN(body.time)) {
									type = "durationchange";
									body = body.time;
								}
								break;
							case FlashNotifications.VOLUME_CHANGE:
								type = "volumechange";
								break;
							case FlashNotifications.TIME_UPDATE:
								type = "timeupdate";
								break;
							case FlashNotifications.SEEKING_CHANGE:
								type = body.seeking ? "seeking" : "seeked";
								this.seeking = body.seeking;
								break;
							case FlashNotifications.FULLSCREEN_CHANGE:
								type = "fullscreenchange";
								body = body.displayState === "fullScreen";
								this.applyDisplayState(body ? DisplayState.FULL_SCREEN : DisplayState.NORMAL);
								break;
							case FlashNotifications.FAIL_OVER_ATTEMPT:
								type = "failoverattempt";
								body = body;
								break;
							case FlashNotifications.ERROR:
								eventName = null;
						}
						if ((eventName != null) && eventName !== type) {
							this.sendNotification(Notifications.DISPATCH_EVENT, {
								type: eventName,
								data: body,
								player: this.parent
							});
							this.sendNotification(eventName, body);
						}
						if (type != null) {
							if (type === "error") {
								error = body.error || body;
								this.error("Flash Error", error);
							}
							this.sendNotification(type, body);
						}
						if (state != null) {
							this.setPlayState(state);
						}
					} catch (error) {
						this.error("Event Error: " + eventName, error);
					}
				};

				FlashPlayer.prototype.error = function(msg, error) {
					this.logger.error("[AMP FLASH ERROR]", msg, error);
				};

				/**
				 * Sets the player's play state and adds CSS class to player div
				 */
				FlashPlayer.prototype.setPlayState = function(state) {
					var states;
					if (state === this.playState) {
						return;
					}
					states = {
						newState: state,
						oldState: this.playState
					};
					this.playState = state;
					this.sendNotification(Notifications.PLAY_STATE_CHANGE, states);
					return state;
				};

				/**
				 * Initializes the player to a given set of parameters
				 */
				FlashPlayer.prototype.setMedia = function(value) {
					FlashPlayer.__super__.setMedia.call(this, value);
					if (this.playState != null) {
						this.setPlayState("ready");
					}
					this.mediaProxy.setData(value);
					if (value.src != null) {
						this.setSrc(value.src);
					}
					if ((value.source != null) && value.source.length > 0) {
						this.setSource(value.source);
					}
					this.sendNotification(Notifications.MEDIA_CHANGE, value);
					this.loaded = true;
					this.mediaElement.loadURL(this.mediaProxy.getSrc(), this.mediaProxy.getData());
					return value;
				};

				/**
				 */
				FlashPlayer.prototype.getMedia = function() {
					return this.mediaProxy.getData();
				};

				/**
				 * Loads the video.
				 *
				 */
				FlashPlayer.prototype.load = function() {
					this.loaded = true;
					this.mediaElement.loadURL(this.mediaProxy.getSrc());
				};

				/**
				 * Plays the currently loaded video.
				 *
				 */
				FlashPlayer.prototype.play = function() {
					if (!this.loaded) {
						this.load();
					}
					this.mediaElement.unpause();
				};

				/**
				 */
				FlashPlayer.prototype.setMuted = function(value) {
					this.muted = value;
					try {
						if (value === true) {
							this.mediaElement.mute();
						} else {
							this.mediaElement.unmute();
						}
					} catch (error) {
						this.error("Flash muted error", error);
					}
					return value;
				};

				/**
				 */
				FlashPlayer.prototype.getMuted = function() {
					return this.muted;
				};

				/**
				 * The source url of video.
				 *
				 * @param {String} value The source url of the video to play.
				 */
				FlashPlayer.prototype.getSrc = function(value) {
					return this.mediaElement.getURL();
				};

				FlashPlayer.prototype.setSrc = function(value) {
					this.mediaProxy.setSrc(value);
					this.loaded = false;
					this.setMedium(Utils.getMimeType(value));
					return value;
				};

				/**
				 */
				FlashPlayer.prototype.setAutoplay = function(value) {
					this.mediaElement.setPlayerProperty("autoplay", value);
					return value;
				};

				FlashPlayer.prototype.getAutoplay = function() {
					return this.mediaElement.getPlayerProperty("autoplay");
				};

				/**
				 * The url to the video.
				 *
				 * @param {String} value
				 *    The new title of the video
				 * @returns {Boolean}
				 *    The title of the video
				 * @type {String}
				 */
				FlashPlayer.prototype.getMedium = function() {
					return this.mediaProxy.getData().medium;
				};

				FlashPlayer.prototype.setMedium = function(value) {
					var media, newState, oldState;
					media = this.mediaProxy.getData();
					if (value === media.medium) {
						return;
					}
					if (media.medium != null) {
						oldState = "medium-" + media.medium;
					}
					newState = media.medium = /audio/.test(value) ? "audio" : "video";
					this.sendNotification(Notifications.MEDIUM_CHANGE, {
						newState: "medium-" + newState,
						oldState: oldState
					});
					return value;
				};

				/**
				 * Sets the source url of video.
				 *
				 * @param {String} value The source url of the video to play.
				 */
				FlashPlayer.prototype.setSource = function(value) {
					var item, media,
						_this = this;
					if (!(value != null) || value.length < 1) {
						return;
					}
					media = this.mediaProxy.getData();
					media.source = value;
					this.loaded = false;
					item = Utils.selectSource(value, function(type) {
						return _this.canPlayType(type);
					});
					if (((item != null ? item.src : void 0) != null) && item.src !== "") {
						this.setSrc(item.src);
						if (typeof type !== "undefined" && type !== null) {
							this.setMedium(type);
						}
					} else {
						throw new Error("No valid source could be found");
					}
					return value;
				};

				/**
				 * Gets the source url of video.
				 *
				 * @return {Number} The source url of the video.
				 */
				FlashPlayer.prototype.getSource = function(value) {
					return this.mediaProxy.getData().source;
				};

				/**
				 * Gets the source url of video.
				 *
				 * @return {Number} The source url of the video.
				 */
				FlashPlayer.prototype.getSeeking = function() {
					return this.seeking;
				};

				/**
				 * Gets the source url of video.
				 *
				 * @return {Number} The source url of the video.
				 */
				FlashPlayer.prototype.getPaused = function() {
					return this.paused;
				};

				/**
				 * Gets the source url of video.
				 *
				 * @return {Number} The source url of the video.
				 */
				FlashPlayer.prototype.getEnded = function() {
					return this.ended;
				};

				/**
				 */
				FlashPlayer.prototype.getFlashXML = function() {
					var doc, xml;
					xml = unescape(this.flashvars.settings_xml);
					doc = XMLUtils.parse(xml);
					doc.toString = function() {
						return xml;
					};
					return doc;
				};

				/**
				 */
				FlashPlayer.prototype.getFlashVars = function() {
					return this.flashvars;
				};

				FlashPlayer.prototype.evaluateBinding = function(str) {
					return this.mediaElement.evaluateBinding(str);
				};

				FlashPlayer.prototype.canPlayType = function(mimeType) {
					if (__indexOf.call(Utils.flashTypes, mimeType) >= 0) {
						return "maybe";
					} else {
						return "";
					}
				};

				FlashPlayer.prototype.replay = function() {
					this.mediaElement.replay();
				};

				FlashPlayer.prototype.pause = function() {
					this.mediaElement.pause();
				};

				FlashPlayer.prototype.end = function() {
					this.mediaElement.stopPlayer();
				};

				FlashPlayer.prototype.getCurrentTime = function(value) {
					return this.mediaElement.getCurrentTime();
				};

				FlashPlayer.prototype.setCurrentTime = function(value) {
					this.mediaElement.jumpToTime(value);
					return value;
				};

				FlashPlayer.prototype.getParams = function() {
					return this.mediaElement.getParams();
				};

				FlashPlayer.prototype.setParams = function(value) {
					this.mediaElement.setParams(value);
					return value;
				};

				FlashPlayer.prototype.getVolume = function() {
					return this.mediaElement.getVolume();
				};

				FlashPlayer.prototype.setVolume = function(value, scope) {
					this.mediaElement.setVolume(value, scope || "");
					return value;
				};

				FlashPlayer.prototype.getDuration = function() {
					return this.mediaElement.getDuration();
				};

				FlashPlayer.prototype.getDisplayState = function(value) {
					return this.displayState;
				};

				FlashPlayer.prototype.setDisplayState = function(value) {
					var _ref;
					if (value === this.displayState) {
						return;
					}
					this.applyDisplayState(value);
					if (((_ref = this.config.fullscreen) != null ? _ref.mode : void 0) === FullscreenMode.EXTERNAL) {
						return;
					}
					if (this.displayState === DisplayState.FULL_SCREEN) {
						this.mediaElement.enterFullScreen();
					} else {
						this.mediaElement.exitFullScreen();
					}
					return value;
				};

				FlashPlayer.prototype.applyDisplayState = function(value) {
					var states;
					if (value === this.displayState) {
						return;
					}
					states = {
						newState: value,
						oldState: this.displayState
					};
					this.displayState = value;
					this.sendNotification(Notifications.DISPLAY_STATE_CHANGE, states);
					this.sendNotification(Notifications.DISPATCH_EVENT, new Event("fullscreenchange", this.displayState === DisplayState.FULL_SCREEN));
				};

				FlashPlayer.prototype.enterFullScreen = function() {
					this.setDisplayState(DisplayState.FULL_SCREEN);
				};

				FlashPlayer.prototype.exitFullScreen = function() {
					this.setDisplayState(DisplayState.NORMAL);
				};

				FlashPlayer.prototype.recordContentChange = function(content) {
					this.mediaElement.recordContentChange(content);
				};

				/**
				 * The ModuleAdapter class.
				 *
				 * @param {Module} module
				 * @constructor
				 * @private
				 * @extends {puremvc.Mediator}
				 */
				function ModuleAdapter(module) {
					this.module = module;
					ModuleAdapter.__super__.constructor.call(this, module.getModuleName(), this);
				}


				__extends(ModuleAdapter, puremvc.Mediator);


				ModuleAdapter.prototype.module = null;

				ModuleAdapter.prototype.mediator = null;

				ModuleAdapter.prototype.initializeNotifier = function(key) {
					var publications,
						_this = this;
					ModuleAdapter.__super__.initializeNotifier.call(this, key);
					publications = this.module.listNotificationPublications();
					if (publications != null) {
						this.mediator = new puremvc.Mediator(this.facade.getModuleName());
						this.mediator.listNotificationInterests = function() {
							return publications;
						};
						this.mediator.handleNotification = function(notification) {
							_this.facade.sendNotification(notification.getName(), notification.getBody(), notification.getType());
						};
					}
				};

				ModuleAdapter.prototype.onRegister = function() {
					if (this.mediator != null) {
						this.module.registerMediator(this.mediator);
					}
				};

				ModuleAdapter.prototype.onRemove = function() {
					if (this.mediator != null) {
						this.module.removeMeditator(this.mediator);
					}
				};

				/**
				 * Overridden so this class may subscribe to all notifications
				 * @return An Array
				 *
				 */
				ModuleAdapter.prototype.listNotificationInterests = function() {
					return this.module.listNotificationInterests();
				};

				/**
				 * Handles notifications of interest to this mediator. Note that
				 * the default declaration is to allow the super to handle the
				 * note. This leaves the base JunctionMediator to handle things
				 * like ACCEPT_INPUT_PIPE and ACCEPT_OUTPUT_PIPE
				 * @param note An INotification
				 *
				 */
				ModuleAdapter.prototype.handleNotification = function(notification) {
					this.module.sendNotification(notification.getName(), notification.getBody(), notification.getType());
				};

				/**
				 * @enum {string}
				 * @const
				 * @private
				 */

				var Notifications = {
					STARTUP: "startup",
					LOAD: "load",
					PAUSE_REQUEST: "pauserequest",
					TOGGLE_PLAY_PAUSE: "togglePlayPause",
					CHANGE_PLAY_STATE: "chageplaystate",
					PLAY_STATE_CHANGE: "playstatechange",
					TOGGLE_FULL_SCREEN: "toggleFullScreen",
					CHANGE_DISPLAY_STATE: "chageDisplayState",
					DISPLAY_STATE_CHANGE: "displayStateChange",
					FULL_SCREEN_CHANGE: "fullscreenchange",
					DISABLE_FULL_SCREEN: "disableFullScreen",
					ENABLE_FULL_SCREEN: "enableFullScreen",
					LANGUAGE_CHANGE: "languagechange",
					TOGGLE_ACTIVE: "toggleActive",
					CHANGE_ACTIVE_STATE: "changeactivestate",
					ACTIVE_STATE_CHANGE: "activestatechange",
					CHANGE_MEDIA: "changeMedia",
					SET_MEDIA: "setmedia",
					MEDIA_VALIDATED: "mediavalidated",
					UPDATE_DATA_BINDINGS: "updatedatabindings",
					CHANGE_VOLUME: "changevolume",
					CHANGE_MUTED: "changemuted",
					TOGGLE_MUTED: "togglemuted",
					SEEK: "seek",
					CHANGE_DURATION: "changeduration",
					CHANGE_AUTOPLAY: "changeAutoplay",
					CHANGE_LOOP: "changeLoop",
					PLAYBACK_CORE_CHANGE: "playbackCoreChange",
					START: "start",
					END: "end",
					REPLAY: "replay",
					LOAD_FEED: "loadFeed",
					REGISTER_PLUGIN: "registerPlugin",
					REGISTER_PLUGINS: "registerPlugins",
					PLUGIN_REGISTERED: "pluginRegistered",
					ADD_LAYER: "addLayer",
					REMOVE_LAYER: "removeLayer",
					ADD_OVERLAY: "addOverlay",
					REMOVE_OVERLAY: "removeOverlay",
					ADD_CONTROL: "addControl",
					REMOVE_CONTROL: "removeControl",
					ADD_CONTROL_STATE: "addControlState",
					REMOVE_CONTROL_STATE: "removeControlState",
					ADD_APPLICATION_STATE: "addApplicationState",
					REMOVE_APPLICATION_STATE: "removeApplicationState",
					DISPATCH_EVENT: "dispatchEvent",
					CHANGE_PARAMS: "changeParams",
					ADD_CUE_POINTS: "addCuePoints",
					REMOVE_CUE_POINTS: "removeCuePoints",
					INITIALIZED: "initialized",
					REGISTER_PLAYBACK_CORE: "registerPlaybackCore",
					REMOVE_PLAYBACK_CORE: "removePlaybackCore",
					DISPLAY_TIME: "displaytime",
					IS_USER_ACTIVE: "isUserActive",
					LOADED_METADATA: "loadedmetadata",
					READY: "ready",
					ERROR: "error",
					ENDED: "ended",
					STARTED: "started",
					DURATION_CHANGE: "durationchange",
					SEEKING: "seeking",
					SEEKED: "seeked",
					TIME_UPDATE: "timeupdate",
					LOAD_START: "loadstart",
					LOADED_DATA: "loadeddata",
					CAN_PLAY: "canplay",
					CAN_PLAY_THROUGH: "canplaythrough",
					PROGRESS: "progress",
					MEDIA_CHANGE: "mediachange",
					WAITING: "waiting",
					PLAY: "play",
					PLAYING: "playing",
					PAUSE: "pause",
					PAUSED: "paused",
					PLAY_REQUEST: "playrequest",
					MEDIUM_CHANGE: "mediumchange",
					TEMPORAL_TYPE_CHANGE: "temporaltypechange",
					VOLUME_CHANGE: "volumechange",
					FAIL_OVER_ATTEMPT: "failoverattempt",
					PLAYBACK_TARGET_CHANGE: "playbacktargetchange",
					PLAYBACK_TARGET_AVAILABLE: "playbacktargetavailable",
					RECORD_CONTENT_CHANGE: "recordcontentchange",
					CHANGE_CONTENT: "changecontent",
					CONTENT_CHANGED: "contentchanged"
				};

				function QueryString() {}

				QueryString.construct = function() {
					var key, value, vars;
					vars = this.deserialize(window.location.search);
					for (key in vars) {
						value = vars[key];
						QueryString[key] = value;
					}
					return true;
				};

				QueryString.serialize = function(obj, prefix) {
					var k, p, str, v;
					str = [];
					for (p in obj) {
						v = obj[p];
						if (!(v != null)) {
							continue;
						}
						k = (prefix ? prefix + "[" + p + "]" : p);
						str.push((typeof v === "object" ? this.serialize(v, k) : encodeURIComponent(k) + "=" + encodeURIComponent(v)));
					}
					return str.join("&");
				};

				QueryString.deserialize = function(uri) {
					var results;
					if (uri != null) {
						results = {};
						uri = uri.replace(/^[^?]*\?/, "");
						uri.replace(new RegExp("([^?=&]+)(=([^&]*))?", "g"), function($0, $1, $2, $3) {
							results[decodeURIComponent($1)] = decodeURIComponent($3);
						});
					}
					return results;
				};

				QueryString.constructed = QueryString.construct();

				/**
				 * @enum {string}
				 * @const
				 * @private
				 */

				var PluginNotifications = {
					REGISTER_PLUGINS: "registerPlugins",
					PLUGIN_REGISTERED: "pluginRegistered",
					PLUGINS_INITIALIZED: "pluginsinitialized"
				};

				/**
				 * @enum {string}
				 * @const
				 * @private
				 */

				var PlayState = {
					/**
					 * Constant representing the playing play state
					 */

					READY: "ready",
					/**
					 * Constant representing the playing play state
					 */

					PLAYING: "playing",
					/**
					 * Constant representing the paused play state
					 */

					PAUSED: "paused",
					/**
					 * Constant representing the ended play state
					 */

					ENDED: "ended",
					/**
					 * Constant representing the waiting play state
					 */

					LOADING: "loading",
					/**
					 * Constant representing the waiting play state
					 */

					WAITING: "waiting",
					/**
					 * Constant representing the seeking play state
					 */

					SEEKING: "seeking",
					/**
					 * Constant representing the waiting play state
					 */

					ERROR: "error"
				};

				/**
				 * Creates a new instance of Context.
				 *
				 * @constructor
				 * @private
				 * @extends {puremvc.Proxy}
				 * @implements {IDataBindingContext}
				 */
				function DataBindingContext() {
					DataBindingContext.__super__.constructor.call(this);
					if (this.contextName == null) {
						this.contextName = this.constructor.NAME;
					}
				}


				__extends(DataBindingContext, puremvc.Proxy);


				DataBindingContext.prototype.contextName = null;

				DataBindingContext.prototype.contextData = null;

				/**
				 */
				DataBindingContext.prototype.getContextName = function() {
					return this.contextName;
				};

				/**
				 */
				DataBindingContext.prototype.getContextData = function() {
					return this.contextData;
				};

				/**
				 * The PlayRequestCommand class.
				 *
				 * @constructor
				 * @private
				 * @extends {puremvc.SimpleCommand}
				 */
				function PlayRequestCommand() {
					PlayRequestCommand.__super__.constructor.call(this);
				}


				__extends(PlayRequestCommand, puremvc.SimpleCommand);


				/**
				 * Executes the command.
				 *
				 * @param {puremvc.Notification} notification
				 *    The notification.
				 *
				 * @override
				 */
				PlayRequestCommand.prototype.execute = function(notification) {
					this.sendNotification(Notifications.PLAY_REQUEST);
				};

				/**
				 * The ExternalPlaybackProxy class.
				 *
				 * @constructor
				 * @private
				 * @extends {puremvc.Proxy}
				 */
				function ExternalPlaybackProxy() {
					ExternalPlaybackProxy.__super__.constructor.call(this);
				}


				__extends(ExternalPlaybackProxy, puremvc.Proxy);


				/**
				 * The name of the this Proxy.
				 *
				 * @static
				 * @type {string}
				 */
				ExternalPlaybackProxy.NAME = "PlaybackProxy";

				/** @private
				 */
				ExternalPlaybackProxy.prototype.src = null;

				/**
				 * Determines if the core can play a given mimeType.
				 *
				 * @return {String} "" if the core can't play the mimeType
				 */
				ExternalPlaybackProxy.prototype.canPlayType = function(mimeType) {
					return mimeType === "external";
				};

				/**
				 * The current time of the video in seconds. Value must be between currentTime and duration.
				 *
				 * @param {Number} value
				 *    The new currentTime value in seconds
				 * @returns {Number}
				 *    The currentTime value in seconds
				 * @type {Number}
				 */
				ExternalPlaybackProxy.prototype.getSrc = function() {
					return this.src;
				};

				ExternalPlaybackProxy.prototype.setSrc = function(value) {
					if (!(value != null) || value === "") {
						this.sendNotification(Notifications.ERROR, "The value of src is not supported: " + value);
					}
					if (value !== this.src) {
						this.src = value;
					}
					return value;
				};

				/**
				 * Instructs the core to play.
				 */
				ExternalPlaybackProxy.prototype.play = function() {
					window.open(this.getSrc(), "_blank");
				};

				ExternalPlaybackProxy.prototype.load = function() {};

				ExternalPlaybackProxy.prototype.setVolume = function() {};

				ExternalPlaybackProxy.prototype.pause = function() {};

				ExternalPlaybackProxy.prototype.setEnabled = function() {};

				ExternalPlaybackProxy.prototype.getCurrentTime = function() {
					return 0;
				};

				ExternalPlaybackProxy.prototype.setCurrentTime = function(value) {};

				ExternalPlaybackProxy.prototype.getDuration = function() {
					return 0;
				};

				/**
				 * @enum {string}
				 * @const
				 * @private
				 */

				var UserNotifications = {
					TOGGLE_PLAY_PAUSE: "usertogglePlayPause",
					PLAY: "userplay",
					PAUSE: "userpause",
					SEEK: "userseek"
				};

				function ITokenized() {}

				/**
				 * The tokenized data structure
				 */
				ITokenized.prototype.data = null;

				/**
				 * The literal value after compiliation
				 */
				ITokenized.prototype.value = null;

				/**
				 * The original data structure
				 */
				ITokenized.prototype.source = null;

				/**
				 *
				 */
				ITokenized.prototype.parse = function(data) {};

				/**
				 * Compiles the tokenized values in the data property
				 * and saves them to the value property. As a convenience
				 * this function returns the value property.
				 *
				 * @param context         An object who's properties can be called from within a token
				 * @param suppressErrors  Flag indicating wether or not to suppress errors. Useful when certain context items are known not to exist.
				 * @return                The compile value object.
				 */
				ITokenized.prototype.compile = function(context, suppressErrors) {
					if (context == null) {
						context = {};
					}
					if (suppressErrors == null) {
						suppressErrors = false;
					}
				};

				/**
				 * @enum {string}
				 * @const
				 * @private
				 */

				var Namespace = {
					PREFIX: "akamai-"
				};

				/**
				 * @enum {string}
				 * @const
				 * @private
				 */

				var SecurityNotifications = {
					CHECK_AUTHORIZATION: "checkAuthorization",
					AUTHORIZATION_FAILED: "authorizationfailed",
					AUTHORIZE: "authorize",
					AUTHORIZED: "authorized",
					SET_TOKEN: "settoken",
					SET_KEY: "setkey"
				};

				/**
				 * Creates a new instance of SecurityProxy.
				 *
				 * @constructor
				 * @private
				 * @extends {puremvc.Proxy}
				 */
				function SecurityProxy() {
					SecurityProxy.__super__.constructor.call(this, this.constructor.NAME, {});
					this.setupHDN1();
				}


				__extends(SecurityProxy, puremvc.Proxy);


				/** @static
				 */
				SecurityProxy.NAME = "SecurityProxy";

				/**
				 */
				SecurityProxy.prototype.setupHDN1 = function() {
					var _this = this;
					return window.retrieveToken = function(guid, url) {
						var token;
						_this.facade.logger.debug("[AMP AUTH] HDN1: Token Requested", guid, url);
						token = _this.getToken();
						if (token != null) {
							_this.facade.video.tokenRetrievalSuccess("&primaryToken=" + token);
						} else {
							_this.sendNotification(SecurityNotifications.AUTHORIZE);
						}
						return true;
					};
				};

				/**
				 */
				SecurityProxy.prototype.getKey = function() {
					return this.data.key;
				};

				SecurityProxy.prototype.setKey = function(value) {
					this.data.key = value;
					return value;
				};

				/**
				 */
				SecurityProxy.prototype.getToken = function() {
					return this.data.token;
				};

				SecurityProxy.prototype.setToken = function(value) {
					this.data.token = value;
					return value;
				};

				/**
				 */
				SecurityProxy.prototype.getSecret = function() {
					var secret;
					if (!(this.data.token != null)) {
						return null;
					}
					secret = "";
					if (this.data.key != null) {
						secret += this.data.key;
					}
					secret += this.data.token;
					return secret;
				};

				/**
				 */
				SecurityProxy.prototype.createURL = function(url) {
					var secret;
					secret = this.getSecret();
					if (secret != null) {
						url += !/\?/.test(url) ? "?" : "&";
						url += secret;
					}
					return url;
				};

				/**
				 */
				SecurityProxy.prototype.getAuthorized = function() {
					return this.data.authorized;
				};

				SecurityProxy.prototype.setAuthorized = function(value) {
					this.data.authorized = value;
					return value;
				};

				/**
				 */
				SecurityProxy.prototype.getProvider = function() {
					return this.data.provider;
				};

				SecurityProxy.prototype.setProvider = function(value) {
					this.data.provider = value;
					return value;
				};

				/**
				 * The ChangePlayStateCommand class.
				 *
				 * @constructor
				 * @private
				 * @extends {puremvc.SimpleCommand}
				 */
				function ChangePlayStateCommand() {
					ChangePlayStateCommand.__super__.constructor.call(this);
				}


				__extends(ChangePlayStateCommand, puremvc.SimpleCommand);


				/**
				 * Executes the command.
				 *
				 * @param {puremvc.Notification} notification
				 *    The notification.
				 *
				 * @override
				 */
				ChangePlayStateCommand.prototype.execute = function(notification) {
					var app, state;
					app = this.facade.retrieveProxy(ApplicationStateProxy.NAME);
					state = notification.getBody();
					app.setPlayState(state);
				};

				/**
				 * The MediaChangeCommand class.
				 *
				 * @constructor
				 * @private
				 * @extends {puremvc.SimpleCommand}
				 */
				function MediaChangeCommand() {
					MediaChangeCommand.__super__.constructor.call(this);
				}


				__extends(MediaChangeCommand, puremvc.SimpleCommand);


				/**
				 * Executes the command.
				 *
				 * @param {puremvc.Notification} notification
				 *    The notification.
				 *
				 * @override
				 */
				MediaChangeCommand.prototype.execute = function(notification) {
					var media, playbackProxy, player;
					media = notification.getBody();
					player = this.facade.retrieveProxy(PlayerProxy.NAME);
					player.setPlaybackType(media.type);
					playbackProxy = this.facade.retrieveProxy(PlaybackProxy.NAME);
					playbackProxy.setSrc(media.src);
					playbackProxy.setCurrentTime(media.startTime || 0);
				};

				/**
				 * The ChangeDurationCommand class.
				 *
				 * @constructor
				 * @private
				 * @extends {puremvc.SimpleCommand}
				 */
				function ChangeDurationCommand() {
					ChangeDurationCommand.__super__.constructor.call(this);
				}


				__extends(ChangeDurationCommand, puremvc.SimpleCommand);


				/**
				 * Executes the command.
				 *
				 * @param {puremvc.Notification} notification
				 *    The notification.
				 *
				 * @override
				 */
				ChangeDurationCommand.prototype.execute = function(notification) {
					var duration, mediaProxy;
					duration = notification.getBody();
					mediaProxy = this.facade.retrieveProxy(MediaProxy.NAME);
					if (mediaProxy.getDuration() === duration) {
						return;
					}
					mediaProxy.setDuration(duration);
				};

				/**
				 * The ErrorCommand class.
				 *
				 * @constructor
				 * @private
				 * @extends {puremvc.SimpleCommand}
				 */
				function ErrorCommand() {
					ErrorCommand.__super__.constructor.call(this);
				}


				__extends(ErrorCommand, puremvc.SimpleCommand);


				/**
				 * Executes the command.
				 *
				 * @param {puremvc.Notification} notification
				 *    The notification.
				 *
				 * @override
				 */
				ErrorCommand.prototype.execute = function(notification) {
					var core, playbackProxy;
					playbackProxy = this.facade.retrieveProxy(PlaybackProxy.NAME);
					core = playbackProxy.getMediaElement();
					EventHandler.clear(core);
					this.facade.logger.error("[AMP ERROR]", notification.getBody());
					this.sendNotification(Notifications.CHANGE_PLAY_STATE, PlayState.ERROR);
				};

				/**
				 * The ReadyCommand class.
				 *
				 * @constructor
				 * @private
				 * @extends {puremvc.SimpleCommand}
				 */
				function ReadyCommand() {
					ReadyCommand.__super__.constructor.call(this);
				}


				__extends(ReadyCommand, puremvc.SimpleCommand);


				/**
				 * Executes the command.
				 *
				 * @param {puremvc.Notification} notification
				 *    The notification.
				 *
				 * @override
				 */
				ReadyCommand.prototype.execute = function(notification) {
					var volume, _ref;
					volume = (_ref = this.facade.config) != null ? _ref.volume : void 0;
					if (volume != null) {
						this.sendNotification(Notifications.CHANGE_VOLUME, volume);
					}
					this.sendNotification(Notifications.CHANGE_DISPLAY_STATE, DisplayState.NORMAL);
					this.sendNotification(Notifications.CHANGE_PLAY_STATE, PlayState.READY);
					this.sendNotification(Notifications.CHANGE_ACTIVE_STATE, ActiveState.ACTIVE);
				};

				/**
				 * The UpdateDataBindingsCommand class.
				 *
				 * @constructor
				 * @private
				 * @extends {puremvc.SimpleCommand}
				 */
				function UpdateDataBindingsCommand() {
					UpdateDataBindingsCommand.__super__.constructor.call(this);
				}


				__extends(UpdateDataBindingsCommand, puremvc.SimpleCommand);


				/**
				 * Executes the command.
				 *
				 * @param {puremvc.Notification} notification
				 *    The notification.
				 *
				 * @override
				 */
				UpdateDataBindingsCommand.prototype.execute = function(notification) {
					var bindings, body;
					body = notification.getBody() || {};
					bindings = this.facade.retrieveProxy(DataBindingProxy.NAME);
					bindings.compile(body.contexts, body.suppressErrors);
				};

				/**
				 * The ChangeParamsCommand class.
				 *
				 * @constructor
				 * @private
				 * @extends {puremvc.SimpleCommand}
				 */
				function ChangeParamsCommand() {
					ChangeParamsCommand.__super__.constructor.call(this);
				}


				__extends(ChangeParamsCommand, puremvc.SimpleCommand);


				/**
				 * Executes the command.
				 *
				 * @param {puremvc.Notification} notification
				 *    The notification.
				 *
				 * @override
				 */
				ChangeParamsCommand.prototype.execute = function(notification) {
					var params, proxy;
					params = notification.getBody();
					proxy = this.facade.retrieveProxy(ParamsProxy.NAME);
					proxy.setData(params);
					this.sendNotification(Notifications.UPDATE_DATA_BINDINGS, {
						suppressErrors: true
					});
				};

				/**
				 * The SetMediaCommand class.
				 *
				 * @constructor
				 * @private
				 * @extends {puremvc.SimpleCommand}
				 */
				function SetMediaCommand() {
					SetMediaCommand.__super__.constructor.call(this);
				}


				__extends(SetMediaCommand, puremvc.SimpleCommand);


				/**
				 * Executes the command.
				 *
				 * @param {puremvc.Notification} notification
				 *    The notification.
				 *
				 * @override
				 */
				SetMediaCommand.prototype.execute = function(notification) {
					var media, mediaProxy;
					media = notification.getBody();
					this.sendNotification(Notifications.CHANGE_MEDIA, media);
					mediaProxy = this.facade.retrieveProxy(MediaProxy.NAME);
					media = mediaProxy.getData();
					if (mediaProxy.authorized === true) {
						this.sendNotification(Notifications.MEDIA_VALIDATED, media);
					}
				};

				/**
				 * The ChangeMediaCommand class.
				 *
				 * @constructor
				 * @private
				 * @extends {puremvc.SimpleCommand}
				 */
				function ChangeMediaCommand() {
					ChangeMediaCommand.__super__.constructor.call(this);
				}


				__extends(ChangeMediaCommand, puremvc.SimpleCommand);


				/**
				 * Executes the command.
				 *
				 * @param {puremvc.Notification} notification
				 *    The notification.
				 *
				 * @override
				 */
				ChangeMediaCommand.prototype.execute = function(notification) {
					var media, mediaProxy, playbackProxy;
					media = notification.getBody();
					mediaProxy = this.facade.retrieveProxy(MediaProxy.NAME);
					playbackProxy = this.facade.retrieveProxy(PlaybackProxy.NAME);
					playbackProxy.setEnabled(false);
					playbackProxy.pause();
					this.sendNotification(Notifications.CHANGE_PLAY_STATE, PlayState.READY);
					this.sendNotification(Notifications.CHANGE_ACTIVE_STATE, ActiveState.ACTIVE);
					try {
						mediaProxy.setData(media);
					} catch (error) {
						this.sendNotification(Notifications.ERROR, error.message);
					}
					this.sendNotification(Notifications.UPDATE_DATA_BINDINGS);
					this.sendNotification(SecurityNotifications.AUTHORIZE);
				};

				/**
				 * The OverlayLayerMediator class.
				 *
				 * @constructor
				 * @private
				 * @extends {LayerMediator}
				 */
				function OverlayLayerMediator() {
					OverlayLayerMediator.__super__.constructor.call(this);
				}


				__extends(OverlayLayerMediator, LayerMediator);


				OverlayLayerMediator.prototype.componentName = "overlays";

				OverlayLayerMediator.NAME = "OverlayLayerMediator";

				/**
				 */
				OverlayLayerMediator.prototype.createMediatorName = function() {
					return OverlayLayerMediator.NAME;
				};

				/**
				 * Overridden so this class may subscribe to all notifications
				 * @return An Array
				 *
				 * @override
				 */
				OverlayLayerMediator.prototype.listNotificationInterests = function() {
					return [Notifications.ADD_OVERLAY, Notifications.REMOVE_OVERLAY];
				};

				/**
				 * Handles notifications of interest to this mediator. Note that
				 * the default declaration is to allow the super to handle the
				 * note. This leaves the base JunctionMediator to handle things
				 * like ACCEPT_INPUT_PIPE and ACCEPT_OUTPUT_PIPE
				 *
				 * @param note An INotification
				 * @override
				 */
				OverlayLayerMediator.prototype.handleNotification = function(notification) {
					var name, overlay;
					name = notification.getName();
					overlay = notification.getBody();
					switch (name) {
						case Notifications.ADD_OVERLAY:
							this.viewComponent.appendChild(overlay);
							break;
						case Notifications.REMOVE_OVERLAY:
							this.viewComponent.removeChild(overlay);
					}
				};

				/**
				 * @constructor
				 * @private
				 * @extends {LayerMediator}
				 */
				function PosterMediator() {
					PosterMediator.__super__.constructor.call(this);
				}


				__extends(PosterMediator, LayerMediator);


				PosterMediator.prototype.componentName = "poster";

				PosterMediator.prototype.poster = null;

				PosterMediator.prototype.clickHandler = null;

				/**
				 * @override
				 */
				PosterMediator.prototype.onRegister = function() {
					this.poster = this.create("poster-content");
					this.poster.onclick = this.onclick.bind(this);
					PosterMediator.__super__.onRegister.call(this);
				};

				/**
				 */
				PosterMediator.prototype.onclick = function(event) {
					event.stopImmediatePropagation();
					event.preventDefault();
					this.sendNotification(UserNotifications.TOGGLE_PLAY_PAUSE, true);
					return false;
				};

				/**
				 * @override
				 */
				PosterMediator.prototype.listNotificationInterests = function() {
					return [Notifications.CHANGE_MEDIA];
				};

				/**
				 * @override
				 */
				PosterMediator.prototype.handleNotification = function(notification) {
					var html, src;
					switch (notification.getName()) {
						case Notifications.CHANGE_MEDIA:
							src = notification.getBody().poster;
							html = (src != null) && src !== "" ? "<img src=\"" + src + "\" class=\"" + this.cssPrefix + "poster-image\" />" : "";
							this.poster.innerHTML = html;
					}
				};

				/**
				 * ErrorLayerMediator class.
				 *
				 * @constructor
				 * @extends {LayerMediator}
				 * @private
				 */
				function ErrorLayerMediator() {
					ErrorLayerMediator.__super__.constructor.call(this);
				}


				__extends(ErrorLayerMediator, LayerMediator);


				ErrorLayerMediator.prototype.message = null;

				ErrorLayerMediator.prototype.componentName = "error";

				/**
				 * @override
				 */
				ErrorLayerMediator.prototype.onRegister = function() {
					ErrorLayerMediator.__super__.onRegister.call(this);
					this.message = this.create("error-message");
				};

				/**
				 * @override
				 */
				ErrorLayerMediator.prototype.listNotificationInterests = function() {
					return [Notifications.ERROR];
				};

				/**
				 * @override
				 */
				ErrorLayerMediator.prototype.handleNotification = function(notification) {
					var error, msg;
					switch (notification.getName()) {
						case Notifications.ERROR:
							error = notification.getBody();
							msg = "Error: ";
							switch (error.code) {
								case MediaError.MEDIA_ERR_ABORTED:
									msg += "Media was aborted.";
									break;
								case MediaError.MEDIA_ERR_DECODE:
									msg += "Decode Error.";
									break;
								case MediaError.MEDIA_ERR_NETWORK:
									msg += "Network Error.";
									break;
								case MediaError.MEDIA_ERR_SRC_NOT_SUPPORTED:
									msg += "Source not supported.";
									break;
								default:
									msg += error;
							}
							this.message.textContent = msg;
					}
				};

				/**
				 * @constructor
				 * @private
				 * @extends {OverlayMediator}
				 */
				function TitleBarMediator() {
					TitleBarMediator.__super__.constructor.call(this);
				}


				__extends(TitleBarMediator, OverlayMediator);


				TitleBarMediator.prototype.componentName = "title-bar";

				TitleBarMediator.prototype.title = null;

				TitleBarMediator.prototype.description = null;

				/**
				 * @override
				 */
				TitleBarMediator.prototype.onRegister = function() {
					this.title = this.create("title-text");
					this.description = this.create("description-text");
					TitleBarMediator.__super__.onRegister.call(this);
				};

				/**
				 * @override
				 */
				TitleBarMediator.prototype.listNotificationInterests = function() {
					return [Notifications.CHANGE_MEDIA];
				};

				/**
				 * @override
				 */
				TitleBarMediator.prototype.handleNotification = function(notification) {
					var metadata, title;
					switch (notification.getName()) {
						case Notifications.CHANGE_MEDIA:
							metadata = notification.getBody();
							title = metadata.title;
							if (!(title != null) || title === "" || title === "undefined") {
								this.classList.add("hidden");
							} else {
								this.title.innerHTML = title;
								this.description.innerHTML = metadata.description ? metadata.description : "";
								this.classList.remove("hidden");
							}
					}
				};

				/**
				 * The Plugin class. Acts as a base for plugins.
				 *
				 * @constructor
				 * @private
				 * @extends {Module}
				 */
				function Plugin() {
					Plugin.__super__.constructor.call(this);
				}


				__extends(Plugin, Module);


				Plugin.prototype.player = null;

				Plugin.prototype.proxy = null;

				/**
				 * @override
				 */
				Plugin.prototype.initialize = function(config, player) {
					this.player = player;
					this.logger = this.player.logger;
					Plugin.__super__.initialize.call(this, config);
				};

				/**
				 * @override
				 */
				Plugin.prototype.resourcesLoaded = function() {
					if (typeof this.oninitialized === "function") {
						this.oninitialized(this);
					}
				};

				/** @override
				 */
				Plugin.prototype.onRegister = function() {
					var _ref;
					this.createFramework();
					if ((_ref = this.retrieveProxy(PluginProxy.NAME)) != null) {
						if (typeof _ref.initialize === "function") {
							_ref.initialize();
						}
					}
					this.sendNotification(PluginNotifications.PLUGIN_REGISTERED, this);
				};

				/** @override
				 */
				Plugin.prototype.createNotificationEvent = function(notificationName, body, type) {
					var event, feature;
					event = Plugin.__super__.createNotificationEvent.call(this, notificationName, body, type);
					if (!(event != null)) {
						return;
					}
					type = event.type.replace(new RegExp("^" + (this.getModuleName())), "");
					feature = typeof this.getFeatureName === "function" ? this.getFeatureName() : void 0;
					if (feature != null) {
						type = type.replace(new RegExp("^" + feature), "");
					}
					event.type = type;
					return event;
				};

				/** @override
				 */
				Plugin.prototype.logNotificationEvent = function(event) {
					if (/(timeremaining)/.test(event.type) === true) {
						return null;
					}
					this.logger.log("[" + (this.player.getModuleName().toUpperCase()) + " " + (this.getModuleName().toUpperCase()) + " EVENT]", event.type, event);
				};

				/** @override
				 */
				Plugin.prototype.listNotificationPublications = function() {
					var key, notes, value;
					notes = [Notifications.ADD_LAYER, Notifications.REMOVE_LAYER, Notifications.ADD_OVERLAY, Notifications.REMOVE_OVERLAY, Notifications.ADD_APPLICATION_STATE, Notifications.REMOVE_APPLICATION_STATE, Notifications.IS_USER_ACTIVE];
					return notes.concat((function() {
						var _results;
						_results = [];
						for (key in PluginNotifications) {
							value = PluginNotifications[key];
							_results.push(value);
						}
						return _results;
					})());
				};

				/**
				 * @constructor
				 * @private
				 */
				function PluginAdapter() {
					this.plugins = [];
					this.registered = [];
					PluginAdapter.__super__.constructor.call(this, this.constructor.NAME, {});
				}


				__extends(PluginAdapter, puremvc.Mediator);


				PluginAdapter.NAME = "PluginAdapter";

				PluginAdapter.prototype.plugins = null;

				PluginAdapter.prototype.registered = null;

				/**
				 * Registers the appropriate pipes and listeners when
				 * this class is registered
				 *
				 * @override
				 */
				PluginAdapter.prototype.onRegister = function() {
					return PluginAdapter.__super__.onRegister.call(this);
				};

				/**
				 * Overridden so this class may subscribe to all notifications
				 * @return An Array
				 *
				 * @override
				 */
				PluginAdapter.prototype.listNotificationInterests = function() {
					return [PluginNotifications.REGISTER_PLUGINS, PluginNotifications.PLUGIN_REGISTERED];
				};

				/**
				 * Handles notifications of interest to this mediator. Note that
				 * the default declaration is to allow the super to handle the
				 * note. This leaves the base JunctionMediator to handle things
				 * like ACCEPT_INPUT_PIPE and ACCEPT_OUTPUT_PIPE
				 *
				 * @param note An INotification
				 * @override
				 */
				PluginAdapter.prototype.handleNotification = function(notification) {
					var body, config, def, feature, init, key, name, onplugininitialized, plugin, type, value, _ref;
					name = notification.getName();
					body = notification.getBody();
					switch (name) {
						case PluginNotifications.REGISTER_PLUGINS:
							type = this.facade.getPlayerType();
							config = body;
							onplugininitialized = this.onplugininitialized.bind(this);
							_ref = AMP.plugins;
							for (key in _ref) {
								value = _ref[key];
								if (!(key in config)) {
									continue;
								}
								init = config[key];
								if (!(init != null) || init.enabled === false) {
									continue;
								}
								def = value[type];
								if (!(def != null)) {
									this.facade.logger.debug("Plugin could not be found: " + key);
									continue;
								}
								try {
									plugin = new def();
									plugin.oninitialized = onplugininitialized;
									this.plugins.push(plugin.initialize.bind(plugin, init, this.facade));
								} catch (error) {
									this.logger.error("Plugin could not be created: " + key + ". " + error);
									continue;
								}
							}
							this.plugins.forEach(function(item) {
								return item();
							});
							break;
						case PluginNotifications.PLUGIN_REGISTERED:
							this.registered.push(body);
							name = typeof body.getModuleName === "function" ? body.getModuleName() : void 0;
							if (name != null) {
								this.facade[name] = body;
							}
							feature = typeof body.getFeatureName === "function" ? body.getFeatureName() : void 0;
							if (feature != null) {
								this.facade[feature] = body;
							}
							this.facade.logger.debug("[AMP]", "registered:", body.getModuleName(), "plugin");
							if (this.registered.length === this.plugins.length) {
								this.sendNotification(PluginNotifications.PLUGINS_INITIALIZED, this.plugins);
							}
					}
				};

				PluginAdapter.prototype.onplugininitialized = function(plugin) {
					this.facade.registerModule(plugin);
				};

				/**
				 * The ClassList class.
				 *
				 * @param {!DOMElement}  element
				 *    The DOM Element
				 *
				 * @constructor
				 */
				function ClassList(element) {
					this.element = element;
				}

				ClassList.prototype.element = null;

				ClassList.prototype.prefix = Namespace.PREFIX;

				/**
				 */
				ClassList.prototype.contains = function(className) {
					return this.constructor.contains(className, this.element, this.prefix);
				};

				/**
				 */
				ClassList.prototype.add = function(className) {
					this.constructor.add(className, this.element, this.prefix);
				};

				/**
				 */
				ClassList.prototype.remove = function(className) {
					this.constructor.remove(className, this.element, this.prefix);
				};

				/**
				 */
				ClassList.prototype.toggle = function(className) {
					return this.constructor.contains(className, this.element, this.prefix);
				};

				/**
				 */
				ClassList.contains = function(className, element, prefix) {
					var css, _ref;
					if (prefix == null) {
						prefix = "";
					}
					css = prefix + className;
					if (((_ref = element.classList) != null ? _ref.contains : void 0) != null) {
						return element.classList.contains(css);
					} else {
						return element.className.indexOf(css) !== -1;
					}
				};

				/**
				 */
				ClassList.add = function(className, element, prefix) {
					var css, _ref;
					if (prefix == null) {
						prefix = "";
					}
					css = prefix + className;
					if (((_ref = element.classList) != null ? _ref.add : void 0) != null) {
						element.classList.add(css);
					} else {
						if (!this.contains(className, element)) {
							if (element.className !== "") {
								element.className += " " + css;
							} else {
								element.className = css;
							}
						}
					}
				};

				/**
				 */
				ClassList.remove = function(className, element, prefix) {
					var css, regexp, _ref;
					if (prefix == null) {
						prefix = "";
					}
					css = prefix + className;
					if (((_ref = element.classList) != null ? _ref.remove : void 0) != null) {
						element.classList.remove(css);
					} else {
						if (this.contains(className, element)) {
							regexp = new RegExp(" ?" + css);
							element.className = element.className.replace(regexp, "");
						}
					}
				};

				/**
				 */
				ClassList.toggle = function(className, element, prefix) {
					var css, _ref;
					if (prefix == null) {
						prefix = "";
					}
					css = prefix + className;
					if (((_ref = element.classList) != null ? _ref.toggle : void 0) != null) {
						element.classList.toggle(this.prefix + className);
					} else {
						if (this.contains(className, element)) {
							this.remome(className, element);
						} else {
							this.add(className, element);
						}
					}
				};

				/**
				 * @constructor
				 * @private
				 */
				function DataBindingProxy() {
					DataBindingProxy.__super__.constructor.call(this, this.constructor.NAME, {});
					this.data = {};
					this.contextMap = {};
					this.configurationMap = {};
				}


				__extends(DataBindingProxy, puremvc.Proxy);


				/** @static
				 */
				DataBindingProxy.NAME = "DataBindingProxy";

				DataBindingProxy.prototype.contextMap = null;

				DataBindingProxy.prototype.configurationMap = null;

				DataBindingProxy.prototype.paramsProxy = null;

				/**
				 */
				DataBindingProxy.prototype.initialize = function() {
					this.paramsProxy = this.facade.retrieveProxy(ParamsProxy.NAME);
					this.registerContext(this.facade.retrieveProxy(MediaProxy.NAME));
					this.registerContext(this.facade.retrieveProxy(LocalizationProxy.NAME));
					this.registerContext(this.facade.retrieveProxy(PlayerProxy.NAME));
					this.update();
				};

				/**
				 */
				DataBindingProxy.prototype.registerContext = function(context) {
					if (!(context != null)) {
						return;
					}
					this.contextMap[context.getContextName()] = context;
				};

				/**
				 */
				DataBindingProxy.prototype.retrieveContext = function(name) {
					return this.contextMap[name];
				};

				/**
				 */
				DataBindingProxy.prototype.removeContext = function(name) {
					var context;
					context = this.contextMap[name];
					delete this.contextMap[name];
					return context;
				};

				/**
				 */
				DataBindingProxy.prototype.registerConfiguration = function(config) {
					if (!(config != null)) {
						return;
					}
					this.configurationMap[config.getConfigurationName()] = config;
					config.compile(this.context, true);
				};

				/**
				 */
				DataBindingProxy.prototype.retrieveConfiguration = function(name) {
					return this.configurationMap[name];
				};

				/**
				 */
				DataBindingProxy.prototype.removeConfiguration = function(name) {
					var config;
					config = this.configurationMap[name];
					delete this.configurationMap[name];
					return config;
				};

				/**
				 */
				DataBindingProxy.prototype.evaluateBinding = function(str) {
					var tokenizedObject;
					tokenizedObject = new TokenizedValue(str);
					tokenizedObject.compile(this.data);
					return tokenizedObject.value;
				};

				/**
				 */
				DataBindingProxy.prototype.update = function(contexts) {
					var context, key, name, value, _ref, _ref1;
					this.data.now = Date.now();
					_ref = this.contextMap;
					for (name in _ref) {
						context = _ref[name];
						if ((contexts != null ? typeof contexts.indexOf === "function" ? contexts.indexOf(name) : void 0 : void 0) === -1) {
							continue;
						}
						this.data[name] = context.getContextData();
					}
					this.paramsProxy.compile(this.data);
					_ref1 = this.paramsProxy.value;
					for (key in _ref1) {
						value = _ref1[key];
						this.data[key] = value;
					}
					return this.data;
				};

				/**
				 */
				DataBindingProxy.prototype.compile = function(contexts, suppressErrors) {
					var config, context, name, paramsName, _ref;
					if (suppressErrors == null) {
						suppressErrors = false;
					}
					this.update(contexts);
					context = Utils.clone(this.data);
					paramsName = this.paramsProxy.getConfigurationName();
					_ref = this.configurationMap;
					for (name in _ref) {
						config = _ref[name];
						if (name !== paramsName) {
							config.compile(context, suppressErrors);
						}
					}
				};

				function UI() {}

				/**
				 * Creates an HTML element.
				 *
				 * @param   {?(string|Array.<string>)}  type
				 * @param   {?DOMElement}  parent
				 * @param   {?string|DOMElement}  element
				 * @param   {?string} text
				 * @return  {DOMElement}
				 */
				UI.create = function(type, parent, element, text) {
					var classList, item, viewComponent, _i, _len;
					if (element == null) {
						element = "div";
					}
					if (typeof element === "string") {
						element = document.createElement(element);
					}
					classList = new ClassList(element);
					if (type != null) {
						if (typeof type === "string") {
							type = [type];
						}
						for (_i = 0, _len = type.length; _i < _len; _i++) {
							item = type[_i];
							classList.add(item);
						}
					}
					element._classList = classList;
					if (text != null) {
						if (element.innerText != null) {
							element.innerText = text;
						} else {
							element.textContent = text;
						}
					}
					if (parent != null) {
						if (parent.getViewComponent != null) {
							viewComponent = parent.getViewComponent();
						}
						if (viewComponent != null) {
							parent = viewComponent;
						}
						parent.appendChild(element);
					}
					return element;
				};

				/**
				 * Binds a mediators event handlers to an element.
				 *
				 * @param {!DOMElement} element
				 * @param {!mediator} mediator
				 */
				UI.bindEvents = function(element, handlers, exceptions) {
					var key, value;
					if (exceptions == null) {
						exceptions = ["onRemove", "onRegister"];
					}
					for (key in handlers) {
						value = handlers[key];
						if (!(__indexOf.call(exceptions, key) >= 0) && /^on/.test(key) && ((value != null ? value.bind : void 0) != null)) {
							element[key] = value.bind(handlers);
						}
					}
				};

				/**
				 * Creates a unique id.
				 *
				 * @param   {number=}   base
				 *    The base to use for representing a numeric value.
				 *
				 * @return  {string}
				 *    The unique id.
				 */
				UI.createUID = function(base) {
					var date, len, max, rand;
					if (base == null) {
						base = 16;
					}
					date = Date.now();
					len = 2;
					max = base * len - 1;
					rand = Math.round(Math.random() * max + base);
					return (rand.toString(16) + date.toString(16)).toUpperCase();
				};

				/**
				 * @constructor
				 * @private
				 * @extends {ITokenized}
				 * @param {string} source
				 */
				function TokenizedBase(source) {
					if (source != null) {
						this.parse(source);
					}
				}


				__extends(TokenizedBase, ITokenized);


				/**
				 * The tokenized data structure
				 */
				TokenizedBase.prototype.data = null;

				/**
				 * The literal value after compiliation
				 */
				TokenizedBase.prototype.value = null;

				/**
				 * The original data structure
				 */
				TokenizedBase.prototype.source = null;

				/**
				 * Populates the data property with tokenized values
				 *
				 * @param   {Array.<Object>|Object|string|number|boolean} source  The tokenized data structure.
				 * @return  {Object} The parsed data structure.
				 */
				TokenizedBase.prototype.parse = function(source) {
					var value;
					if (source instanceof Array) {
						value = new TokenizedArray(source);
					} else if (source instanceof Object) {
						value = new TokenizedObject(source);
					} else {
						value = new TokenizedValue(source);
					}
					return value;
				};

				/**
				 * @constructor
				 * @private
				 * @extends {TokenizedBase}
				 * @param {Array.<Object>} data
				 */
				function TokenizedArray(data) {
					TokenizedArray.__super__.constructor.call(this, data);
				}


				__extends(TokenizedArray, TokenizedBase);


				/**
				 *
				 */
				TokenizedArray.prototype.parse = function(data) {
					var index, token, _i, _len;
					this.data = [];
					for (index = _i = 0, _len = data.length; _i < _len; index = ++_i) {
						token = data[index];
						this.data[index] = TokenizedArray.__super__.parse.call(this, token);
					}
					return this.data;
				};

				/**
				 *
				 */
				TokenizedArray.prototype.compile = function(context, suppressErrors) {
					var index, token, _i, _len, _ref;
					if (context == null) {
						context = {};
					}
					if (suppressErrors == null) {
						suppressErrors = false;
					}
					this.value = [];
					_ref = this.data;
					for (index = _i = 0, _len = _ref.length; _i < _len; index = ++_i) {
						token = _ref[index];
						try {
							this.value[index] = token.compile(context, suppressErrors);
						} catch (error) {
							this.value[index] = null;
							if (!suppressErrors) {
								Logger.error(error);
							}
						}
					}
					return this.value;
				};

				/**
				 * @constructor
				 * @private
				 * @extends {Error}
				 * @param {string} msg
				 */
				function TokenizationError(msg) {
					this.message = TokenizationError.MESSAGE + msg;
				}


				__extends(TokenizationError, Error);


				TokenizationError.MESSAGE = "Tokenization Error: Could not find token value for: ";

				/**
				 * @constructor
				 * @private
				 * @extends {TokenizedBase}
				 * @param {string|number|boolean} source
				 */
				function Literal(source) {
					Literal.__super__.constructor.call(this, source);
				}


				__extends(Literal, TokenizedBase);


				/**
				 * Populates the data property with tokenized values
				 *
				 * @param   source  The tokenized data structure.
				 * @return          The parsed data structure.
				 */
				Literal.prototype.parse = function(data) {
					this.source = this.data = this.value = data;
					return data;
				};

				/**
				 * Compiles the tokenized values in the data property
				 * and saves them to the value property. As a convenience
				 * this function returns the value property.
				 *
				 * @param context     An object who's properties can be called from within a token
				 * @param suppressErrors  Flag indicating wether or not to suppress errors. Useful when certain context items are known not to exist.
				 * @return          The compile value object.
				 */
				Literal.prototype.compile = function(context, suppressErrors) {
					if (context == null) {
						context = null;
					}
					if (suppressErrors == null) {
						suppressErrors = false;
					}
					return this.value;
				};

				/**
				 * @constructor
				 * @private
				 * @extends {TokenizedBase}
				 * @param {string} source
				 */
				function Token(source) {
					Token.__super__.constructor.call(this, source);
				}


				__extends(Token, TokenizedBase);


				/**
				 * The function used to evaluate a token value
				 */
				Token.prototype.exec = null;

				/**
				 *
				 */
				Token.prototype.parse = function(source) {
					this.source = this.data = source;
					this.exec = new Function("context", 'var value; with(context){value = ' + this.data + ';}return value;');
					return this.data;
				};

				/**
				 *
				 */
				Token.prototype.compile = function(context, suppressErrors) {
					if (context == null) {
						context = {};
					}
					if (suppressErrors == null) {
						suppressErrors = false;
					}
					if (!(this.exec != null)) {
						return this.value;
					}
					try {
						this.value = this.exec(context);
					} catch (error) {
						this.value = null;
						if (!suppressErrors) {
							throw new TokenizationError(this.data);
						}
					}
					return this.value;
				};

				/**
				 * @constructor
				 * @private
				 * @extends {TokenizedBase}
				 * @param {string} source
				 */
				function TokenizedValue(source) {
					this.token = new RegExp(this.tokenStart.source + "([^#]*)" + this.tokenEnd.source, "g");
					TokenizedValue.__super__.constructor.call(this, source);
				}


				__extends(TokenizedValue, TokenizedBase);


				/**
				 * The function used to evaluate a token value
				 */
				TokenizedValue.prototype.exec = null;

				/**
				 * The literal value after compiliation
				 */
				TokenizedValue.prototype.tokenStart = /#{/;

				TokenizedValue.prototype.tokenEnd = /}/;

				TokenizedValue.prototype.token = null;

				/**
				 *
				 */
				TokenizedValue.prototype.parse = function(source) {
					var piece, pieces, placeholder, spacer, temp, token, tokens, _i, _len;
					this.source = source;
					this.data = [];
					if (this.token.test(this.source)) {
						tokens = [];
						placeholder = "<<>>";
						spacer = null;
						temp = this.source.replace(this.token, function(match, token, offset, string) {
							tokens.push(token);
							spacer = placeholder;
							if ((0 < offset && offset < string.length - match.length)) {
								spacer += placeholder;
							}
							return spacer;
						});
						pieces = temp.split(placeholder);
						token = 0;
						for (_i = 0, _len = pieces.length; _i < _len; _i++) {
							piece = pieces[_i];
							if (piece === "" && tokens[token]) {
								this.data.push(new Token(tokens[token]));
								token++;
							} else {
								if (piece !== "") {
									this.data.push(new Literal(piece));
								}
							}
						}
						if (this.data.length === 1) {
							this.data = this.data[0];
						}
					} else {
						this.data = new Literal(source);
					}
					return this.data;
				};

				/**
				 *
				 */
				TokenizedValue.prototype.compile = function(context, suppressErrors) {
					var token, _i, _len, _ref;
					if (context == null) {
						context = {};
					}
					if (suppressErrors == null) {
						suppressErrors = false;
					}
					if (!(this.data != null)) {
						return this.value;
					}
					try {
						if (this.data instanceof ITokenized) {
							this.value = this.data.compile(context, suppressErrors);
						} else {
							this.value = "";
							_ref = this.data;
							for (_i = 0, _len = _ref.length; _i < _len; _i++) {
								token = _ref[_i];
								this.value += token.compile(context, suppressErrors);
							}
						}
					} catch (error) {
						this.value = null;
						if (!suppressErrors) {
							throw new TokenizationError(this.source);
						}
					}
					return this.value;
				};

				/**
				 * @constructor
				 * @private
				 * @extends {TokenizedBase}
				 * @param {Object} source
				 */
				function TokenizedObject(source) {
					TokenizedObject.__super__.constructor.call(this, source);
				}


				__extends(TokenizedObject, TokenizedBase);


				/**
				 *
				 */
				TokenizedObject.prototype.parse = function(source) {
					var key, token;
					this.source = source;
					this.data = {};
					for (key in source) {
						token = source[key];
						this.data[key] = TokenizedObject.__super__.parse.call(this, token);
					}
					return this.data;
				};

				/**
				 *
				 */
				TokenizedObject.prototype.compile = function(context, suppressErrors) {
					var key, value, _ref;
					if (context == null) {
						context = {};
					}
					if (suppressErrors == null) {
						suppressErrors = false;
					}
					this.value = {};
					_ref = this.data;
					for (key in _ref) {
						value = _ref[key];
						try {
							this.value[key] = value.compile(context, suppressErrors);
						} catch (error) {
							this.value[key] = null;
							Logger.error(error);
						}
					}
					return this.value;
				};

				/**
				 * The LocalizationProxy class. Used to track player localization settings.
				 *
				 * @constructor
				 * @private
				 * @extends {DataBindingContext}
				 * @param {Object}  init  The configuration object.
				 */
				function LocalizationProxy(init) {
					var key, lang;
					LocalizationProxy.__super__.constructor.call(this);
					if (init != null) {
						if (init.language != null) {
							this.data.language = init.language;
						}
						if (init.locales != null) {
							for (lang in init.locales) {
								if (this.data.locales[lang] != null) {
									for (key in init.locales[lang]) {
										this.data.locales[lang][key] = init.locales[lang][key];
									}
								} else {
									this.data.locales[lang] = init.locales[lang];
								}
							}
						}
					}
				}


				__extends(LocalizationProxy, DataBindingContext);


				/** @static
				 */
				LocalizationProxy.NAME = "LocalizationProxy";

				LocalizationProxy.prototype.contextName = "l10n";

				LocalizationProxy.prototype.data = {
					language: navigator.language || navigator.browserLanguage,
					locales: {
						en: {
							MSG_TIME_SEPARATOR: " / ",
							MSG_LIVE: "LIVE",
							MSG_REPLAY: "Replay",
							MSG_BUFFERING: "buffering...",
							MSG_CC: "CC",
							MSG_CC_TITLE: "Captions",
							MSG_CC_LANGUAGE: "Track :",
							MSG_CC_PRESETS: "Presets :",
							MSG_CC_FONT: "Font :",
							MSG_CC_EDGE: "Edge :",
							MSG_CC_SIZE: "Size :",
							MSG_CC_SCROLL: "Scroll :",
							MSG_CC_COLOR: "Color :",
							MSG_CC_BACKGROUND: "Background :",
							MSG_CC_WINDOW: "Window :",
							MSG_CC_OPACITY: "Opacity :",
							MSG_CC_SHOW_ADVANCED: "Show Advanced Settings",
							MSG_CC_HIDE_ADVANCED: "Hide Advanced Settings",
							MSG_CC_RESET: "Default",
							MSG_CC_CANCEL: "Cancel",
							MSG_CC_APPLY: "Apply",
							MSG_NEXT_VIDEO: "Video starts in: ",
							MSG_NEXT_AD: "Next ad starts in: ",
							MSG_CLOSE: "close",
							MSG_EN: "English",
							MSG_ES: "Spanish",
							MSG_DE: "German",
							MSG_FR: "French",
							MSG_IT: "Italian",
							MSG_RU: "Russian"
						}
					}
				};

				LocalizationProxy.prototype.locale = null;

				/** @override
				 */
				LocalizationProxy.prototype.onRegister = function() {
					this.setLocale(this.data.language);
				};

				/**
				 * Gets the context data for this proxy.
				 *
				 * @returns {Object} The contenxt data for this proxy
				 * @override
				 */
				LocalizationProxy.prototype.getContextData = function() {
					return this.locale;
				};

				/**
				 *
				 */
				LocalizationProxy.prototype.getLanguage = function() {
					return this.data.language;
				};

				LocalizationProxy.prototype.setLanguage = function(value) {
					this.data.language = value;
					this.setLocale(value);
					this.sendNotification(Notifications.LANGUAGE_CHANGE, value);
					return value;
				};

				/**
				 *
				 */
				LocalizationProxy.prototype.setLocale = function(value) {
					this.locale = this.data.locales[value];
					if (!(this.locale != null)) {
						this.locale = this.data.locales[value.substring(0, 2)];
					}
					this.facade.l10n = this.locale;
					return value;
				};

				/**
				 *
				 */
				LocalizationProxy.prototype.getLocales = function() {
					return this.data.locales;
				};

				LocalizationProxy.prototype.setLocales = function(value) {
					this.data.locales = value;
					return value;
				};

				/**
				 *
				 */
				LocalizationProxy.prototype.getString = function(key) {
					var locale;
					locale = this.locale || this.data.locales.en;
					return locale[key] || "";
				};

				/**
				 * Retrieves the full language name in the player's current language setting.
				 *
				 * @param   {string}  lang  The language code.
				 * @return  {string}        The full name of the language according to the player's current language setting.
				 */
				LocalizationProxy.prototype.getLanguageString = function(lang) {
					var key, str;
					if (typeof lang !== "string" || !(lang != null) || lang === "") {
						return "";
					}
					key = "MSG_" + (lang.toUpperCase());
					str = this.getString(key);
					if (str === "") {
						lang = lang.split("-").shift();
						key = "MSG_" + (lang.toUpperCase());
						str = this.getString(key);
					}
					return str;
				};

				/**
				 * @constructor
				 * @private
				 */
				function ParamsProxy(data) {
					ParamsProxy.__super__.constructor.call(this, data);
				}


				__extends(ParamsProxy, DataBoundConfigurationProxy);


				/** @static
				 */
				ParamsProxy.NAME = "ParamsProxy";

				ParamsProxy.prototype.defaults = {};

				ParamsProxy.prototype.configurationName = "params";

				/** @override
				 */
				ParamsProxy.prototype.setData = function(data) {
					var key, value, _ref;
					this.data = ((_ref = this.configurationData) != null ? _ref.source : void 0) || {};
					for (key in data) {
						value = data[key];
						this.data[key] = data[key];
					}
					this.configurationData = new TokenizedObject(this.data);
					return this.data;
				};

				/**
				 * The ExternalPlayCommand class.
				 *
				 * @constructor
				 * @private
				 * @extends {puremvc.MacroCommand}
				 */
				function ExternalPlayCommand() {
					ExternalPlayCommand.__super__.constructor.call(this);
				}


				__extends(ExternalPlayCommand, puremvc.MacroCommand);


				/** @override
				 */
				ExternalPlayCommand.prototype.initializeMacroCommand = function() {
					return this.addSubCommand(PlayRequestCommand);
				};

				/**
				 * Executes the command.
				 *
				 * @param {puremvc.Notification} notification
				 *    The notification.
				 *
				 * @override
				 */
				ExternalPlayCommand.prototype.execute = function(notification) {
					var playbackProxy;
					ExternalPlayCommand.__super__.execute.call(this, notification);
					playbackProxy = this.facade.retrieveProxy(PlaybackProxy.NAME);
					playbackProxy.play();
				};

				/**
				 * @enum {string}
				 * @const
				 * @private
				 */

				var DisplayState = {
					/**
					 * Constant representing the normal display state
					 */

					NORMAL: "normal",
					/**
					 * Constant representing the full screen display state
					 */

					FULL_SCREEN: "full-screen"
				};

				/**
				 * @enum {string}
				 * @const
				 * @private
				 */

				var RenderMode = {
					/**
					 * Constant representing the flash renderer.
					 */

					FLASH: "flash",
					/**
					 * Constant representing the html renderer.
					 */

					HTML: "html"
				};

				/**
				 * @enum {string}
				 * @const
				 * @private
				 */

				var ActiveState = {
					/**
					 * Constant representing the active state (controls on).
					 */

					ACTIVE: "active",
					/**
					 * Constant representing the inactive state (controls off).
					 */

					INACTIVE: "inactive"
				};

				/**
				 * Used to track the various states of the player like full screen mode and active state (controls visible).
				 *
				 * @constructor
				 * @private
				 * @extends {puremvc.Proxy}
				 */
				function ApplicationStateProxy() {
					ApplicationStateProxy.__super__.constructor.call(this);
					this.device = Utils.getDevice();
				}


				__extends(ApplicationStateProxy, puremvc.Proxy);


				/** @static
				 */
				ApplicationStateProxy.NAME = "ApplicationStateProxy";

				/** @private
				 */
				ApplicationStateProxy.prototype.displayState = null;

				ApplicationStateProxy.prototype.playState = null;

				ApplicationStateProxy.prototype.renderMode = null;

				ApplicationStateProxy.prototype.activeState = null;

				ApplicationStateProxy.prototype.seeking = false;

				ApplicationStateProxy.prototype.isUserActive = false;

				ApplicationStateProxy.prototype.device = null;

				/**
				 * The player's display state. Valid options are:
				 *
				 * ApplicationStateProxy.FULL_SCREEN
				 * ApplicationStateProxy.NORMAL
				 *
				 * @param {String} value
				 *    The new display state of the player
				 * @returns {String}
				 *    The display state of the player
				 * @type {String}
				 */
				ApplicationStateProxy.prototype.getDisplayState = function() {
					return this.displayState;
				};

				ApplicationStateProxy.prototype.setDisplayState = function(value) {
					var oldState;
					if (value === oldState) {
						return;
					}
					oldState = this.displayState;
					this.displayState = value;
					this.sendNotification(Notifications.DISPLAY_STATE_CHANGE, {
						oldState: oldState,
						newState: this.displayState
					});
				};

				/**
				 * The player's display state. Valid options are:
				 *
				 * ApplicationStateProxy.FULL_SCREEN
				 * ApplicationStateProxy.NORMAL
				 *
				 * @param {String} value
				 *    The new display state of the player
				 * @returns {String}
				 *    The display state of the player
				 * @type {String}
				 */
				ApplicationStateProxy.prototype.getPlayState = function() {
					return this.playState;
				};

				ApplicationStateProxy.prototype.setPlayState = function(value) {
					var oldState;
					if (value === this.playState) {
						return;
					}
					if (this.seeking === true) {
						switch (value) {
							case PlayState.PLAYING:
							case PlayState.READY:
								this.seeking = false;
								break;
							default:
								return;
						}
					}
					oldState = this.playState;
					this.playState = value;
					this.sendNotification(Notifications.PLAY_STATE_CHANGE, {
						oldState: oldState,
						newState: this.playState
					});
				};

				/**
				 * The player's device.
				 *
				 *
				 * @returns {String}
				 *    The display state of the player
				 * @type {String}
				 */
				ApplicationStateProxy.prototype.getDevice = function() {
					return this.device;
				};

				/**
				 * Indicates whether or not the player is seeking
				 *
				 * @param {String} value
				 *    The new currentTime value in seconds
				 * @returns {Number}
				 *    The currentTime value in seconds
				 * @type {Number}
				 */
				ApplicationStateProxy.prototype.getSeeking = function() {
					return this.seeking;
				};

				ApplicationStateProxy.prototype.setSeeking = function(value) {
					if (value !== this.seeking) {
						this.seeking = value;
					}
				};

				/**
				 * Indicates whether or not the user is currently interacting with the player
				 *
				 * @param {Boolean} value
				 *
				 * @returns {Boolean}
				 *
				 * @type {Boolean}
				 */
				ApplicationStateProxy.prototype.getIsUserActive = function() {
					return this.isUserActive;
				};

				ApplicationStateProxy.prototype.setIsUserActive = function(value) {
					if (value !== this.isUserActive) {
						this.isUserActive = value;
					}
				};

				/**
				 * The core type used for rendering the video.
				 *
				 * @param {String} value
				 *    The new currentTime value in seconds
				 * @returns {Number}
				 *    The currentTime value in seconds
				 * @type {Number}
				 */
				ApplicationStateProxy.prototype.getRenderMode = function() {
					return this.renderMode;
				};

				ApplicationStateProxy.prototype.setRenderMode = function(value) {
					if (value !== this.renderMode) {
						this.renderMode = value;
					}
				};

				/**
				 * The player's display state. Valid options are:
				 *
				 * ApplicationStateProxy.FULL_SCREEN
				 * ApplicationStateProxy.NORMAL
				 *
				 * @param {String} value
				 *    The new display state of the player
				 * @returns {String}
				 *    The display state of the player
				 * @type {String}
				 */
				ApplicationStateProxy.prototype.getMedium = function() {
					return this.medium;
				};

				ApplicationStateProxy.prototype.setMedium = function(value) {
					var oldState;
					if (value === this.medium) {
						return;
					}
					oldState = this.medium != null ? "medium-" + this.medium : this.medium;
					this.medium = value;
					this.sendNotification(Notifications.MEDIUM_CHANGE, {
						oldState: oldState,
						newState: "medium-" + this.medium
					});
				};

				/**
				 * The active state of the player. Used to display controls.
				 *
				 * @param {Boolean} value
				 *    The new active state of the video
				 * @returns {Boolean}
				 *    The active state of the video
				 * @type {Boolean}
				 */
				ApplicationStateProxy.prototype.getActiveState = function() {
					return this.activeState;
				};

				ApplicationStateProxy.prototype.setActiveState = function(value) {
					var oldState;
					if (value === this.activeState) {
						return;
					}
					oldState = this.activeState;
					this.activeState = value;
					this.sendNotification(Notifications.ACTIVE_STATE_CHANGE, {
						oldState: oldState,
						newState: this.activeState
					});
				};

				/**
				 * Used to track player configuration settings
				 */
				/**
				 * Creates a new instance of MediaProxy.
				 *
				 * @constructor
				 * @private
				 */
				function ConfigurationProxy(config) {
					ConfigurationProxy.__super__.constructor.call(this, config);
				}


				__extends(ConfigurationProxy, ModuleProxy);


				/** @static
				 */
				ConfigurationProxy.NAME = ModuleProxy.NAME;

				/** @private
				 */
				ConfigurationProxy.prototype.defaults = {
					name: null,
					autoplay: false,
					loop: false,
					controls: {},
					fullscreen: null,
					target: "_blank",
					domain: null,
					endslate: null,
					version: null
				};

				/**
				 * @override
				 */
				ConfigurationProxy.prototype.setData = function(data) {
					if (data.rules != null) {
						Utils.mergeRules(data.rules);
					}
					return ConfigurationProxy.__super__.setData.call(this, data);
				};

				/**
				 * Auto play.
				 */
				ConfigurationProxy.prototype.getAutoplay = function() {
					return this.data.autoplay;
				};

				ConfigurationProxy.prototype.setAutoplay = function(value) {
					return this.data.autoplay = value;
				};

				/**
				 * Auto play.
				 */
				ConfigurationProxy.prototype.getLoop = function() {
					return this.data.loop;
				};

				ConfigurationProxy.prototype.setLoop = function(value) {
					return this.data.loop = value;
				};

				/**
				 * End Slate.
				 */
				ConfigurationProxy.prototype.getEndSlate = function() {
					return this.data.endslate;
				};

				ConfigurationProxy.prototype.setEndSlate = function(value) {
					return this.data.endslate = value;
				};

				/**
				 * Domain
				 */
				ConfigurationProxy.prototype.getDomain = function() {
					return this.data.domain;
				};

				ConfigurationProxy.prototype.setDomain = function(value) {
					return this.data.domain = value;
				};

				/**
				 * Target.
				 */
				ConfigurationProxy.prototype.getTarget = function() {
					return this.data.target;
				};

				ConfigurationProxy.prototype.setTarget = function(value) {
					return this.data.target = value;
				};

				/**
				 * The player name.
				 */
				ConfigurationProxy.prototype.getName = function() {
					return this.data.name;
				};

				ConfigurationProxy.prototype.setName = function(value) {
					return this.data.name = value;
				};

				/**
				 * The player version.
				 */
				ConfigurationProxy.prototype.getVersion = function() {
					return this.data.version;
				};

				/**
				 * Controls
				 */
				ConfigurationProxy.prototype.getControls = function() {
					return this.data.controls;
				};

				ConfigurationProxy.prototype.setControls = function(value) {
					return this.data.controls = value;
				};

				/**
				 * Fullscreen configuration
				 */
				ConfigurationProxy.prototype.getFullscreen = function() {
					return this.data.fullscreen || {};
				};

				ConfigurationProxy.prototype.setFullscreen = function(value) {
					return this.data.fullscreen = value;
				};

				/**
				 * Binds an event(s) to a handler function.
				 *
				 * @param {IEventDispatcher}    target  The event target
				 * @param {string|Array|number} type    The event to listen for
				 * @param {Function}            handler The handler function to call when the event is dispatched.
				 * @constructor
				 * @private
				 */
				function EventHandler(target, type, handler) {
					var _ref;
					this.target = target;
					this.type = type;
					this.handler = handler;
					this.trigger = __bind(this.trigger, this);

					EventHandler.instances.push(this);
					this.types = [];
					if (_ref = this.type, __indexOf.call(EventHandler.EVENTS, _ref) >= 0) {
						if (Utils.isTouchDevice()) {
							this.types.push(EventHandler.TOUCH_EVENTS[this.type]);
							if (this.type === EventHandler.TOUCH_EVENTS[1]) {
								this.types.push(EventHandler.TOUCH_EVENTS[4]);
							}
						} else {
							this.types.push(EventHandler.MOUSE_EVENTS[this.type]);
						}
					} else if (this.type instanceof Array) {
						this.types = this.type;
					} else {
						this.types.push(this.type);
					}
					this.bind();
				}

				/**
				 * Represents the press user interaction
				 *
				 * @type {number}
				 * @static
				 * @const
				 */
				EventHandler.PRESS = 0;

				/**
				 * Represents the release user interaction
				 *
				 * @type {number}
				 * @static
				 * @const
				 */
				EventHandler.RELEASE = 1;

				/**
				 * Represents the move user interaction
				 *
				 * @type {number}
				 * @static
				 * @const
				 */
				EventHandler.MOVE = 2;

				/**
				 * Represents the click user interaction
				 *
				 * @type {number}
				 * @static
				 * @const
				 */
				EventHandler.CLICK = 3;

				/**
				 * Represents the right click (contextMenu) user interaction
				 *
				 * @type {number}
				 * @static
				 * @const
				 */
				EventHandler.CONTEXTMENU = 4;

				/**
				 * The list of user interactions
				 *
				 * @type {Array.<number>}
				 * @static
				 * @const
				 */
				EventHandler.EVENTS = [EventHandler.PRESS, EventHandler.RELEASE, EventHandler.MOVE, EventHandler.CLICK, EventHandler.CONTEXTMENU];

				/**
				 * The list of mouse interactions
				 *
				 * @type {Array.<string>}
				 * @static
				 * @const
				 */
				EventHandler.MOUSE_EVENTS = ["mousedown", "mouseup", "mousemove", "click", "contextmenu"];

				/**
				 * The list of touch interactions
				 *
				 * @type {Array.<string>}
				 * @static
				 * @const
				 */
				EventHandler.TOUCH_EVENTS = ["touchstart", "touchend", "touchmove", "click", "touchcancel"];

				/**
				 * An array of EventHandler instances.
				 *
				 * @type {Array.<EventHandler>}
				 * @static
				 */
				EventHandler.instances = [];

				/**
				 * Creates an EventHandler with the parameters provided.
				 *
				 * @param {IEventDispatcher}    target  The event target
				 * @param {string|Array|number} type    The event to listen for
				 * @param {Function}            handler The handler function to call when the event is dispatched.
				 * @static
				 * @return {EventHandler} the new EventHandler
				 */
				EventHandler.create = function(target, type, handler) {
					return new EventHandler(target, type, handler);
				};

				/**
				 * Binds all EventHandlers of the provided target.
				 *
				 * @param {IEventDispatcher} target
				 * @static
				 */
				EventHandler.bind = function(target, type) {
					var i, instance, _i, _len, _ref;
					_ref = EventHandler.instances;
					for (i = _i = 0, _len = _ref.length; _i < _len; i = ++_i) {
						instance = _ref[i];
						if (!(instance.target === target)) {
							continue;
						}
						if ((type != null) && instance.type !== type) {
							continue;
						}
						instance.bind();
					}
				};

				/**
				 * Unbinds all EventHandlers of the provided target.
				 *
				 * @param {IEventDispatcher} target
				 * @static
				 */
				EventHandler.unbind = function(target, type) {
					var i, instance, _i, _len, _ref;
					_ref = EventHandler.instances;
					for (i = _i = 0, _len = _ref.length; _i < _len; i = ++_i) {
						instance = _ref[i];
						if (!(instance.target === target)) {
							continue;
						}
						if ((type != null) && instance.type !== type) {
							continue;
						}
						instance.unbind();
					}
				};

				/**
				 * Clear all EventHandlers of the provided target.
				 *
				 * @param {IEventDispatcher} target
				 * @static
				 */
				EventHandler.clear = function(target, type) {
					var i, instance, _i, _len, _ref;
					_ref = EventHandler.instances;
					for (i = _i = 0, _len = _ref.length; _i < _len; i = ++_i) {
						instance = _ref[i];
						if (!((instance != null ? instance.target : void 0) === target)) {
							continue;
						}
						if ((type != null) && instance.type !== type) {
							continue;
						}
						instance.clear();
						EventHandler.instances.splice(i, 1);
					}
				};

				/**
				 * The system event types for this EventTarget
				 *
				 * @type {Array.<string>}
				 */
				EventHandler.prototype.types = null;

				/**
				 * Binds the target to the event
				 */
				EventHandler.prototype.bind = function() {
					var type, _i, _len, _ref;
					_ref = this.types;
					for (_i = 0, _len = _ref.length; _i < _len; _i++) {
						type = _ref[_i];
						if (this.target.addEventListener != null) {
							this.target.addEventListener(type, this.trigger, false);
						} else if (this.target.attachEvent != null) {
							this.target.attachEvent("on" + type, this.trigger);
						}
					}
				};

				/**
				 * Unbinds the target from the event
				 */
				EventHandler.prototype.unbind = function() {
					var type, _i, _len, _ref;
					_ref = this.types;
					for (_i = 0, _len = _ref.length; _i < _len; _i++) {
						type = _ref[_i];
						if (this.target.removeEventListener != null) {
							this.target.removeEventListener(type, this.trigger);
						} else if (this.target.attachEvent != null) {
							this.target.removeEvent("on" + type, this.trigger);
						}
					}
				};

				/**
				 * Clears the EventHandler
				 */
				EventHandler.prototype.clear = function() {
					this.unbind();
					this.target = null;
					this.handler = null;
					this.type = null;
					this.types = null;
				};

				/**
				 * Triggers the event handler
				 */
				EventHandler.prototype.trigger = function(event) {
					this.handler(event);
				};

				/**
				 * AudioPlaybackProxy constructor.
				 *
				 * @constructor
				 * @private
				 * @extends {PlaybackCoreProxy}
				 */
				function AudioPlaybackProxy() {
					AudioPlaybackProxy.__super__.constructor.call(this);
				}


				__extends(AudioPlaybackProxy, PlaybackCoreProxy);


				/** @override
				 */
				AudioPlaybackProxy.prototype.onRegister = function() {
					var mediaElement;
					mediaElement = new MediaElementMediator("html5", "audio");
					this.sendNotification(Notifications.PLAYBACK_CORE_CHANGE, mediaElement);
				};

				/** @override
				 */
				AudioPlaybackProxy.prototype.onRemove = function() {
					this.facade.createMediaElement();
				};

				/** @override
				 */
				AudioPlaybackProxy.prototype.canPlayType = function(mimeType) {
					if (/audio/.test(mimeType)) {
						return "maybe";
					}
					return "";
				};

				/**
				 * Creates a new instance of PlayerProxy.
				 *
				 * @constructor
				 * @private
				 * @extends {DataBindingContext}
				 */
				function PlayerProxy(defaultPlaybackCore) {
					this.defaultPlaybackCore = defaultPlaybackCore;
					PlayerProxy.__super__.constructor.call(this);
					this.playbackCoreMap = {};
					this.registerPlaybackCore(new AudioPlaybackProxy());
				}


				__extends(PlayerProxy, DataBindingContext);


				/** @static
				 */
				PlayerProxy.NAME = "PlayerProxy";

				PlayerProxy.prototype.contextName = "player";

				PlayerProxy.prototype.playbackCoreMap = null;

				PlayerProxy.prototype.defaultPlaybackCore = null;

				PlayerProxy.prototype.activePlaybackCore = null;

				/**
				 */
				PlayerProxy.prototype.getActivePlaybackCore = function() {
					return this.activePlaybackCore;
				};

				/**
				 */
				PlayerProxy.prototype.registerPlaybackCore = function(core) {
					if (!(core != null)) {
						return;
					}
					this.playbackCoreMap[core.getPlaybackCoreName()] = core;
				};

				/**
				 */
				PlayerProxy.prototype.retrievePlaybackCore = function(name) {
					return this.playbackCoreMap[name];
				};

				/**
				 */
				PlayerProxy.prototype.removePlaybackCore = function(name) {
					var core;
					core = this.playbackCoreMap[name];
					delete this.playbackCoreMap[name];
					return core;
				};

				/**
				 */
				PlayerProxy.prototype.setPlaybackType = function(type) {
					var core, name, playbackCore, playbackProxy, _ref;
					playbackCore = this.defaultPlaybackCore;
					_ref = this.playbackCoreMap;
					for (name in _ref) {
						core = _ref[name];
						if (core.canPlayType(type) !== "") {
							playbackCore = core;
							break;
						}
					}
					playbackProxy = this.facade.retrieveProxy(PlaybackProxy.NAME);
					if (playbackProxy !== playbackCore) {
						this.facade.removeProxy(PlaybackProxy.NAME);
						this.facade.registerProxy(playbackCore);
						playbackCore.setData(playbackProxy.getData());
					}
					this.activePlaybackCore = playbackCore;
					return type;
				};

				/**
				 */
				PlayerProxy.prototype.canPlayType = function(type) {
					var canPlay, core, name, _ref;
					_ref = this.playbackCoreMap;
					for (name in _ref) {
						core = _ref[name];
						canPlay = core.canPlayType(type);
						if (canPlay !== "") {
							return canPlay;
						}
					}
					canPlay = this.defaultPlaybackCore.canPlayType(type);
					return canPlay;
				};

				/**
				 * Gets the context data for this proxy.
				 *
				 * @returns {Object} The contenxt data for this proxy
				 * @override
				 */
				PlayerProxy.prototype.getContextData = function() {
					var configProxy, element, mediaProxy, playbackProxy;
					configProxy = this.facade.retrieveProxy(ConfigurationProxy.NAME);
					playbackProxy = this.facade.retrieveProxy(PlaybackProxy.NAME);
					mediaProxy = this.facade.retrieveProxy(MediaProxy.NAME);
					element = this.facade.getViewComponent();
					return {
						width: element.offsetWidth,
						height: element.offsetHeight,
						mode: "html5",
						autoplay: configProxy.getAutoplay(),
						domain: configProxy.getDomain(),
						name: configProxy.getName(),
						currentTime: playbackProxy.getCurrentTime(),
						duration: playbackProxy.getDuration(),
						version: configProxy.getVersion(),
						timecode: {
							duration: Utils.formatTimecode(mediaProxy.getDuration()),
							currentTime: Utils.formatTimecode(playbackProxy.getCurrentTime())
						}
					};
				};

				/**
				 * Creates a new instance of MediaProxy. Used to track metadata associated with the video such as src, title and duration.
				 *
				 * @constructor
				 * @private
				 * @extends {DataBindingContext}
				 */
				function MediaProxy() {
					this.data = {
						metadata: {}
					};
					MediaProxy.__super__.constructor.call(this);
				}


				__extends(MediaProxy, DataBindingContext);


				/** @static
				 */
				MediaProxy.NAME = "MediaProxy";

				MediaProxy.prototype.contextName = "media";

				/** @private
				 */
				MediaProxy.prototype.data = null;

				MediaProxy.prototype.authorized = true;

				/**
				 * Gets the context data for this proxy.
				 *
				 * @returns {Object} The contenxt data for this proxy
				 * @override
				 */
				MediaProxy.prototype.getContextData = function() {
					return {
						width: this.getWidth(),
						height: this.getHeight(),
						title: this.getTitle(),
						description: this.getDescription(),
						src: this.getSrc(),
						duration: this.getDuration(),
						guid: this.getGUID(),
						isLive: this.getIsLive(),
						metadata: this.getMetadata(),
						temporalType: this.getTemporalType(),
						poster: this.getPoster(),
						category: this.getCategory()
					};
				};

				/**
				 * Sets the data for this proxy.
				 *
				 * @param {Object} value
				 *    The new data for this proxy
				 * @override
				 */
				MediaProxy.prototype.setData = function(value) {
					var _ref;
					this.data.autoplay = value.autoplay;
					this.data.type = value.type;
					if (value.source != null) {
						this.setSource(value.source);
					}
					if (value.src != null) {
						this.setSrc(value.src);
					}
					this.data.title = value.title;
					if (value.duration != null) {
						this.setDuration(value.duration);
					}
					this.data.poster = value.poster;
					this.data.guid = value.guid;
					this.data.link = value.link;
					this.data.embed = value.embed;
					this.data.width = value.width;
					this.data.height = value.height;
					this.data.category = value.category;
					this.data.startTime = value.startTime;
					this.data.description = value.description;
					this.data.status = value.status || {};
					if (((_ref = this.data.status) != null ? _ref.state : void 0) === "blocked") {
						this.authorized = false;
					}
					this.data.category = value.category;
					this.data.metadata = value.metadata || {};
					if (value.isLive != null) {
						this.setIsLive(value.isLive);
					}
					if (value.temporalType != null) {
						this.setTemporalType(value.temporalType);
					} else {
						this.setTemporalType("vod");
					}
					if (value.medium != null) {
						this.setMedium(value.medium);
					}
					if (value.pubDate != null) {
						this.setPubDate(value.pubDate);
					}
					if (value.track != null) {
						this.setTrack(value.track);
					}
					return value;
				};

				MediaProxy.prototype.updateData = function(data) {
					var key, value;
					for (key in data) {
						value = data[key];
						if (key in this.data) {
							this.data[key] = value;
						}
					}
				};

				/**
				 * The global unique identifier for this to the video.
				 *
				 * @param {String} value
				 *    The new guid of the video
				 * @returns {String}
				 *    The guid of the video
				 * @type {String}
				 */
				MediaProxy.prototype.getGUID = function() {
					return this.data.guid;
				};

				MediaProxy.prototype.setGUID = function(value) {
					return this.data.guid = value;
				};

				MediaProxy.prototype.getLink = function() {
					return this.data.link;
				};

				MediaProxy.prototype.setLint = function(value) {
					return this.data.link = value;
				};

				MediaProxy.prototype.getStartTime = function() {
					return this.data.startTime || 0;
				};

				MediaProxy.prototype.getEmbed = function() {
					return this.data.embed;
				};

				MediaProxy.prototype.setEmbed = function(value) {
					return this.data.embed = value;
				};

				MediaProxy.prototype.getAutoplay = function() {
					return this.data.autoplay;
				};

				MediaProxy.prototype.setAutoplay = function(value) {
					return this.data.autoplay = value;
				};

				MediaProxy.prototype.getPubDate = function() {
					return this.data.pubDate;
				};

				MediaProxy.prototype.setPubDate = function(value) {
					return this.data.pubDate = value;
				};

				MediaProxy.prototype.getCategory = function() {
					return this.data.category;
				};

				MediaProxy.prototype.setCategory = function(value) {
					return this.data.category = value;
				};

				/**
				 * The url to the video.
				 *
				 * @param {String} value
				 *    The new title of the video
				 * @returns {Boolean}
				 *    The title of the video
				 * @type {String}
				 */
				MediaProxy.prototype.getSrc = function() {
					return this.data.src;
				};

				MediaProxy.prototype.setSrc = function(value) {
					this.data.src = value;
					if ((this.data.src != null) && !(this.data.type != null)) {
						return this.setType(Utils.getMimeType(this.data.src));
					}
				};

				/**
				 * The mimeType of the video.
				 */
				MediaProxy.prototype.getType = function() {
					return this.data.type;
				};

				MediaProxy.prototype.setType = function(value) {
					var medium;
					this.data.type = value;
					medium = /audio/.test(this.data.type) ? "audio" : "video";
					return this.setMedium(medium);
				};

				/**
				 * The medium the video. ie audio, video, executable
				 */
				MediaProxy.prototype.getMedium = function() {
					return this.data.medium;
				};

				MediaProxy.prototype.setMedium = function(value) {
					if (value === this.data.medium) {
						return;
					}
					this.data.medium = value;
					return this.facade.retrieveProxy(ApplicationStateProxy.NAME).setMedium(value);
				};

				/**
				 * Additional information about the vieo
				 */
				MediaProxy.prototype.getMetadata = function() {
					return this.data.metadata;
				};

				MediaProxy.prototype.setMetadata = function(value) {
					return this.data.metadata = value;
				};

				/**
				 * The source object of the video.
				 */
				MediaProxy.prototype.getSource = function() {
					return this.data.source;
				};

				MediaProxy.prototype.setSource = function(value) {
					var item, playerProxy,
						_this = this;
					if (!(value != null) || value.length < 1) {
						return;
					}
					this.data.source = value;
					playerProxy = this.facade.retrieveProxy(PlayerProxy.NAME) || this.facade;
					if (playerProxy != null) {
						item = Utils.selectSource(value, function(type) {
							return playerProxy.canPlayType(type);
						});
					}
					if (((item != null ? item.src : void 0) != null) && item.src !== "") {
						this.setSrc(item.src);
						return this.setType(item.type);
					} else {
						throw new Error("No valid source could be found");
					}
				};

				/**
				 * The source object of the video.
				 */
				MediaProxy.prototype.getTrack = function() {
					return this.data.track;
				};

				MediaProxy.prototype.setTrack = function(value) {
					return this.data.track = value;
				};

				/**
				 * The title of the video.
				 *
				 * @param {String} value
				 *    The new title of the video
				 * @returns {Boolean}
				 *    The title of the video
				 * @type {String}
				 */
				MediaProxy.prototype.getTitle = function() {
					return this.data.title;
				};

				MediaProxy.prototype.setTitle = function(value) {
					return this.data.title = value;
				};

				/**
				 * The native width of the video.
				 */
				MediaProxy.prototype.getWidth = function() {
					return this.data.width;
				};

				MediaProxy.prototype.setWidth = function(value) {
					return this.data.width = value;
				};

				/**
				 * The native width of the video.
				 */
				MediaProxy.prototype.getHeight = function() {
					return this.data.height;
				};

				MediaProxy.prototype.setHeight = function(value) {
					return this.data.height = value;
				};

				/**
				 * The description of the video.
				 *
				 * @param {String} value
				 *    The new description of the video
				 * @returns {Boolean}
				 *    The description of the video
				 * @type {String}
				 */
				MediaProxy.prototype.getDescription = function() {
					return this.data.description;
				};

				MediaProxy.prototype.setDescription = function(value) {
					return this.data.description = value;
				};

				/**
				 *
				 */
				MediaProxy.prototype.getCategory = function() {
					return this.data.category;
				};

				MediaProxy.prototype.setCategory = function(value) {
					return this.data.category = value;
				};

				/**
				 * The duration of the video. This property is used in situations where the
				 * duration cannot be determined from the video (i.e. before metadata is loaded)
				 *
				 * @param {Number} value
				 *    The new duration of the video
				 * @returns {Number}
				 *    The duration of the video
				 * @type {Number}
				 */
				MediaProxy.prototype.getDuration = function(value) {
					return this.data.duration;
				};

				MediaProxy.prototype.setDuration = function(value) {
					var ua;
					if (value === 0) {
						return;
					}
					ua = navigator.userAgent;
					if (value === 1 && (/Android/.test(ua) && !/Android.*Chrome/.test(ua))) {
						return;
					}
					if (value !== this.data.duration) {
						this.data.duration = value;
						this.sendNotification(Notifications.DURATION_CHANGE, value);
					}
					if (value === Infinity) {
						this.setTemporalType("live");
					}
					return value;
				};

				/**
				 * The poster image for the video.
				 *
				 * @param {String} value
				 *    The url of the new poster image
				 * @returns {String}
				 *    The url of the poster image
				 * @type {String}
				 */
				MediaProxy.prototype.getPoster = function(value) {
					return this.data.poster;
				};

				MediaProxy.prototype.setPoster = function(value) {
					return this.data.poster = value;
				};

				/**
				 *
				 */
				MediaProxy.prototype.getIsLive = function() {
					return this.data.isLive;
				};

				MediaProxy.prototype.setIsLive = function(value) {
					if (value !== this.data.isLive) {
						return this.data.isLive = value;
					}
				};

				/**
				 *
				 */
				MediaProxy.prototype.getTemporalType = function() {
					return this.data.temporalType;
				};

				MediaProxy.prototype.setTemporalType = function(value) {
					if (value !== this.data.temporalType) {
						this.data.temporalType = value;
						return this.sendNotification(Notifications.TEMPORAL_TYPE_CHANGE, value);
					}
				};

				/**
				 * The ExternalMediaProxy class.
				 *
				 * @constructor
				 * @private
				 * @extends {MediaProxy}
				 */
				function ExternalMediaProxy() {
					ExternalMediaProxy.__super__.constructor.call(this);
				}


				__extends(ExternalMediaProxy, MediaProxy);


				/** @static
				 */
				ExternalMediaProxy.NAME = "MediaProxy";

				/**
				 * The source object of the video.
				 */
				ExternalMediaProxy.prototype.setSource = function(value) {
					if (!(value != null) || value.length < 1) {
						return;
					}
					value = value.filter(function(item) {
						return item.type === "external";
					});
					return ExternalMediaProxy.__super__.setSource.call(this, value);
				};

				/**
				 * The ExternalPlayer class.
				 *
				 * @constructor
				 * @private
				 * @extends {Player}
				 * @param {Object} config
				 * @param {Object} viewComponent
				 * @param {EventDispatcher} dispatcher
				 */
				function ExternalPlayer(config, viewComponent, dispatcher) {
					ExternalPlayer.__super__.constructor.call(this, config, viewComponent, dispatcher);
				}


				__extends(ExternalPlayer, Player);


				ExternalPlayer.prototype.playerType = "external";

				/** @override
				 */
				ExternalPlayer.prototype.createModel = function() {
					var binding, playbackProxy;
					this.registerProxy(new LocalizationProxy(this.config));
					this.registerProxy(new ApplicationStateProxy());
					playbackProxy = new ExternalPlaybackProxy();
					this.registerProxy(new PlayerProxy(playbackProxy));
					binding = new DataBindingProxy();
					this.registerProxy(binding);
					this.registerProxy(new ConfigurationProxy(this.config));
					this.registerProxy(playbackProxy);
					this.registerProxy(new ExternalMediaProxy());
					this.registerProxy(new ParamsProxy(this.config.params));
					binding.initialize();
				};

				/** @override
				 */
				ExternalPlayer.prototype.createView = function() {
					var errorslate, overlay,
						_this = this;
					this.registerMediator(new PlayerMediator("external", this.getViewComponent()));
					this.registerMediator(new PluginAdapter());
					overlay = new OverlayLayerMediator();
					this.registerMediator(overlay);
					EventHandler.create(overlay.viewComponent, EventHandler.CLICK, function() {
						return _this.sendNotification(Notifications.TOGGLE_ACTIVE);
					});
					this.registerMediator(new PosterMediator());
					this.registerMediator(new TitleBarMediator());
					errorslate = new ErrorLayerMediator();
					this.viewComponent.appendChild(errorslate.getViewComponent());
					this.registerMediator(errorslate);
				};

				/** @override
				 */
				ExternalPlayer.prototype.createController = function() {
					this.registerCommand(Notifications.UPDATE_DATA_BINDINGS, UpdateDataBindingsCommand);
					this.registerCommand(UserNotifications.TOGGLE_PLAY_PAUSE, ExternalPlayCommand);
					this.registerCommand(Notifications.PLAY, ExternalPlayCommand);
					this.registerCommand(Notifications.CHANGE_PLAY_STATE, ChangePlayStateCommand);
					this.registerCommand(Notifications.SET_MEDIA, SetMediaCommand);
					this.registerCommand(Notifications.CHANGE_MEDIA, ChangeMediaCommand);
					this.registerCommand(Notifications.MEDIA_CHANGE, MediaChangeCommand);
					this.registerCommand(Notifications.MEDIA_VALIDATED, MediaValidatedCommand);
					this.registerCommand(Notifications.ERROR, ErrorCommand);
					this.registerCommand(PluginNotifications.PLUGINS_INITIALIZED, PluginsInitializedCommand);
					this.registerCommand(Notifications.READY, ReadyCommand);
					this.registerCommand(Notifications.CHANGE_PARAMS, ChangeParamsCommand);
				};

				ExternalPlayer.prototype.evaluateBinding = function(str) {
					var _ref;
					return (_ref = this.retrieveProxy(DataBindingProxy.NAME)) != null ? _ref.evaluateBinding(str) : void 0;
				};

				ExternalPlayer.prototype.canPlayType = function(mimeType) {
					return "maybe";
				};

				ExternalPlayer.prototype.play = function() {
					this.sendNotification(Notifications.PLAY);
				};

				ExternalPlayer.prototype.setParams = function(value) {
					this.sendNotification(Notifications.CHANGE_PARAMS, value);
					return value;
				};

				ExternalPlayer.prototype.getParams = function() {
					return this.retrieveProxy(ParamsProxy.NAME).getData();
				};

				ExternalPlayer.prototype.setAutoplay = function(value) {
					return false;
				};

				ExternalPlayer.prototype.getAutoplay = function() {
					return false;
				};

				ExternalPlayer.prototype.setLoop = function(value) {
					return false;
				};

				ExternalPlayer.prototype.getLoop = function() {
					return false;
				};

				ExternalPlayer.prototype.setMuted = function(value) {
					return false;
				};

				ExternalPlayer.prototype.getMuted = function() {
					return false;
				};

				ExternalPlayer.prototype.setMedia = function(value) {
					this.sendNotification(Notifications.SET_MEDIA, value);
					return value;
				};

				ExternalPlayer.prototype.getMedia = function(value) {
					var _ref;
					return (_ref = this.retrieveProxy(MediaProxy.NAME)) != null ? _ref.getData() : void 0;
				};

				ExternalPlayer.prototype.setCurrentTime = function(value) {
					return 0;
				};

				ExternalPlayer.prototype.getCurrentTime = function(value) {
					return 0;
				};

				ExternalPlayer.prototype.getDuration = function(value) {
					return this.retrieveProxy(MediaProxy.NAME).getDuration();
				};

				ExternalPlayer.prototype.setSrc = function(value) {
					this.sendNotification(Notifications.SET_MEDIA, {
						src: value
					});
					return value;
				};

				ExternalPlayer.prototype.getSrc = function(value) {
					return this.retrieveProxy(MediaProxy.NAME).getSrc();
				};

				ExternalPlayer.prototype.setSource = function(value) {
					this.sendNotification(Notifications.SET_MEDIA, {
						source: value
					});
					return value;
				};

				ExternalPlayer.prototype.getSource = function() {
					return this.retrieveProxy(MediaProxy.NAME).getSource();
				};

				ExternalPlayer.prototype.setVolume = function(value) {
					return value;
				};

				ExternalPlayer.prototype.getVolume = function(value) {
					return 1;
				};

				ExternalPlayer.prototype.getSeeking = function() {
					return false;
				};

				ExternalPlayer.prototype.getPaused = function() {
					return false;
				};

				ExternalPlayer.prototype.getEnded = function() {
					return false;
				};

				function FeedVO() {
					this.item = [];
					this.metadata = {};
				}

				FeedVO.prototype.title = null;

				FeedVO.prototype.link = null;

				FeedVO.prototype.description = null;

				FeedVO.prototype.category = null;

				FeedVO.prototype.pubDate = null;

				FeedVO.prototype.language = null;

				FeedVO.prototype.ttl = null;

				FeedVO.prototype.item = null;

				FeedVO.prototype.metadata = null;

				function MediaVO() {
					this.metadata = {};
				}

				MediaVO.prototype.src = null;

				MediaVO.prototype.source = null;

				MediaVO.prototype.title = null;

				MediaVO.prototype.description = null;

				MediaVO.prototype.link = null;

				MediaVO.prototype.guid = null;

				MediaVO.prototype.pubDate = null;

				MediaVO.prototype.poster = null;

				MediaVO.prototype.thumbnail = null;

				MediaVO.prototype.embed = null;

				MediaVO.prototype.category = null;

				MediaVO.prototype.type = null;

				MediaVO.prototype.medium = null;

				MediaVO.prototype.duration = null;

				MediaVO.prototype.track = null;

				MediaVO.prototype.metadata = null;

				MediaVO.prototype.scenes = null;

				MediaVO.prototype.startTime = null;

				/**
				 * Event constructor.
				 *
				 * @param {!string}  type  A string representing the event's type.
				 * @param {Object=} detail  Data to pass along with the event.
				 * @constructor
				 * @private
				 */
				function Event(type, detail) {
					this.type = type;
					if (detail != null) {
						this.detail = this.data = detail;
					}
				}

				/**
				 * The event's type.
				 *
				 * @type {string}
				 */
				Event.prototype.type = null;

				/**
				 * The event's target
				 *
				 * @type {Object}
				 */
				Event.prototype.target = null;

				/**
				 * Collection of event specific details.
				 *
				 * @type {Object}
				 */
				Event.prototype.detail = null;

				/**
				 * @constructor
				 * @private
				 */
				function MRSSHelper() {}

				/**
				 */
				MRSSHelper.prototype.getFeed = function(url, onload, onerror) {
					return Utils.getJson(url, onload, onerror);
				};

				/**
				 */
				MRSSHelper.prototype.getMediaNode = function(item, name, checkItem) {
					var base, mediaContent, mediaName, node;
					if (checkItem == null) {
						checkItem = true;
					}
					mediaName = "media-" + name;
					base = item['media-group'] || item;
					mediaContent = base['media-content'];
					if ((mediaContent != null) && (mediaContent[mediaName] != null)) {
						node = mediaContent[mediaName];
					} else if (base[mediaName] != null) {
						node = base[mediaName];
					} else if (item[mediaName] != null) {
						node = item[mediaName];
					} else if ((item[name] != null) && checkItem) {
						node = item[name];
					}
					return node;
				};

				MRSSHelper.prototype.createEmbed = function(item) {
					var embed, embedVO, param, _i, _len, _ref;
					try {
						embed = this.getMediaNode(item, "embed");
						if (!(embed != null)) {
							return embedVO;
						}
						embedVO = {};
						embedVO.url = embed["@attributes"].url;
						embedVO.width = embed["@attributes"].width;
						embedVO.height = embed["@attributes"].height;
						embedVO.params = {};
						if (!(embed["media-param"] instanceof Array)) {
							embed["media-param"] = [embed["media-param"]];
						}
						_ref = embed["media-param"];
						for (_i = 0, _len = _ref.length; _i < _len; _i++) {
							param = _ref[_i];
							embedVO.params[param["@attributes"].name] = param["#text"];
						}
					} catch (error) {
						Logger.error("[AMP Feed Parse Error] embed parse error: " + error.message, error);
					}
					return embedVO;
				};

				/**
				 */
				MRSSHelper.prototype.createFeed = function(json) {
					var channel, feedVO, item, items, key, mediaVO, value, _i, _len;
					try {
						channel = json.channel;
						feedVO = new FeedVO();
						if (channel != null) {
							feedVO.title = channel.title;
							feedVO.description = channel.description;
							feedVO.language = channel.language;
							feedVO.category = channel.category;
							feedVO.pubDate = new Date(Date.parse(channel.pubDate));
							feedVO.ttl = channel.ttl;
							items = channel.item instanceof Array ? channel.item : [channel.item];
							for (_i = 0, _len = items.length; _i < _len; _i++) {
								item = items[_i];
								mediaVO = this.createMedia(item);
								feedVO.item.push(mediaVO);
							}
							for (key in channel) {
								value = channel[key];
								if (!(key in feedVO)) {
									feedVO.metadata[key] = value;
								}
							}
						}
					} catch (error) {
						Logger.error("[AMP Feed Parse Error] feed parse error: " + error.message, error);
					}
					return feedVO;
				};

				/**
				 */
				MRSSHelper.prototype.createMedia = function(item) {
					var atts, category, content, key, label, mediaContent, mediaVO, node, source, track, value, _i, _j, _k, _len, _len1, _len2, _ref, _ref1, _ref2;
					try {
						mediaVO = new MediaVO();
						mediaContent = this.getMediaNode(item, 'content');
						if (mediaContent instanceof Array) {
							mediaVO.source = [];
							for (_i = 0, _len = mediaContent.length; _i < _len; _i++) {
								content = mediaContent[_i];
								source = {
									src: content['@attributes'].url,
									type: content['@attributes'].type
								};
								category = content["media-category"];
								if (category != null) {
									atts = category["@attributes"];
									if (atts.schema === "http://mrss.akamai.com/user_agent_hint") {
										label = atts.label || category["#text"];
										if ((label != null) && label !== "") {
											if (source.rules == null) {
												source.rules = [];
											}
											source.rules.push(label);
										}
									}
								}
								mediaVO.source.push(source);
								mediaVO.medium = content['@attributes'].medium;
								mediaVO.duration = parseFloat(content['@attributes'].duration);
							}
						} else {
							mediaVO.type = mediaContent['@attributes'].type;
							mediaVO.src = mediaContent['@attributes'].url;
							mediaVO.medium = mediaContent['@attributes'].medium;
							mediaVO.duration = parseFloat(mediaContent['@attributes'].duration);
						}
						mediaVO.guid = item.guid;
						mediaVO.title = this.getMediaNode(item, "title");
						mediaVO.link = item.link;
						mediaVO.description = this.getMediaNode(item, "description");
						mediaVO.pubDate = new Date(Date.parse(item.pubDate));
						mediaVO.thumbnail = mediaVO.poster = (_ref = this.getMediaNode(item, 'thumbnail')) != null ? (_ref1 = _ref['@attributes']) != null ? _ref1.url : void 0 : void 0;
						mediaVO.embed = this.createEmbed(item);
						mediaVO.scenes = (_ref2 = this.getMediaNode(item, "scenes")) != null ? _ref2['media-scene'] : void 0;
						node = this.getMediaNode(item, "status", false);
						if (node != null) {
							mediaVO.status = {
								state: node['@attributes'].state,
								reason: node['@attributes'].reason
							};
						}
						mediaVO.category = item.category;
						if (!(mediaVO.category instanceof Array)) {
							mediaVO.category = [mediaVO.category];
						}
						node = this.getMediaNode(item, "category", false);
						if (node != null) {
							for (_j = 0, _len1 = node.length; _j < _len1; _j++) {
								category = node[_j];
								if ((category["#text"] != null) && category["#text"] !== "") {
									mediaVO.category.push(category["#text"]);
								}
							}
						}
						if (mediaVO.category != null) {
							mediaVO.category.sort(function(a, b) {
								a = a.toLowerCase();
								b = b.toLowerCase();
								if (a > b) {
									return 1;
								} else if (a < b) {
									return -1;
								} else {
									return 0;
								}
							});
						}
						node = this.getMediaNode(item, "subTitle");
						if (node != null) {
							if (mediaVO.track == null) {
								mediaVO.track = [];
							}
							if (!(node instanceof Array)) {
								node = [node];
							}
							for (_k = 0, _len2 = node.length; _k < _len2; _k++) {
								track = node[_k];
								if (track["@attributes"] != null) {
									mediaVO.track.push({
										src: track["@attributes"].href,
										type: track["@attributes"].type,
										kind: "captioning",
										srclang: track["@attributes"].lang || "en"
									});
								}
							}
						}
						category = item.category;
						if (!(category instanceof Array)) {
							category = [category];
						}
						mediaVO.isLive = item.temporalType === "live" || ((category != null) && category.join(",").indexOf("live_stream") !== -1);
						mediaVO.temporalType = mediaVO.isLive ? "live" : "ondemand";
						for (key in item) {
							value = item[key];
							if (!(key in mediaVO)) {
								mediaVO.metadata[key] = value;
							}
						}
					} catch (error) {
						Logger.error("[AMP Feed Parse Error] media parse error: " + error.message, error);
					}
					return mediaVO;
				};

				function Logger() {}

				Logger.enabled = false;

				Logger.enable = function(enabled) {
					if (enabled == null) {
						enabled = /debug\=true/.test(location.search.toLowerCase());
					}
					this.enabled = enabled;
					if (!this.enabled) {
						this.log = this.trace = this.debug = this.info = this.warn = this.error = this.fatal = function() {};
					}
					return enabled;
				};

				Logger.log = function() {
					try {
						console.log.apply(console, arguments);
					} catch (error) {

					}
				};

				Logger.trace = function() {
					try {
						console.trace.apply(console, arguments);
					} catch (error) {

					}
				};

				Logger.debug = function() {
					try {
						console.log.apply(console, arguments);
					} catch (error) {
						this.log.apply(this, arguments);
					}
				};

				Logger.info = function() {
					try {
						console.info.apply(console, arguments);
					} catch (error) {

					}
				};

				Logger.warn = function() {
					try {
						console.warn.apply(console, arguments);
					} catch (error) {

					}
				};

				Logger.error = function() {
					try {
						console.error.apply(console, arguments);
					} catch (error) {
						this.log.apply(this, arguments);
					}
				};

				Logger.fatal = function() {
					try {
						console.fatal.apply(console, arguments);
					} catch (error) {

					}
				};

				/**
				 * Creates a new EventDispatcher
				 *
				 * @constructor
				 * @private
				 * @implements {IEventDispatcher}
				 */
				function EventDispatcher(target, catchErrors) {
					this.target = target != null ? target : this;
					this.catchErrors = catchErrors != null ? catchErrors : true;
					this.listenerMap = {};
				}

				/**
				 * Adds a listener for a given event type.
				 *
				 * @param {!string}  type  A string representing the event's type.
				 * @param {!Function} func  A function to call when the event is triggered.
				 * @param {boolean=} capture
				 */
				EventDispatcher.prototype.addEventListener = function(type, func, capture) {
					if (!(func != null) || !(type != null)) {
						return;
					}
					if (!(this.listenerMap[type] != null)) {
						this.listenerMap[type] = [];
					}
					if (this.listenerMap[type].indexOf(func) !== -1) {
						return;
					}
					this.listenerMap[type].push(func);
				};

				/**
				 * Dispathes and event, triggering all event listener of the event's type.
				 *
				 * @param {!IEvent} event The event to dispatch.
				 */
				EventDispatcher.prototype.dispatchEvent = function(event) {
					var listener, listeners, _i, _len;
					listeners = this.listenerMap[event.type];
					listener = this.target["on" + event.type];
					event.target = this.target;
					if (listener != null) {
						listener.apply(this.target, [event]);
					}
					if (!(listeners != null)) {
						return;
					}
					for (_i = 0, _len = listeners.length; _i < _len; _i++) {
						listener = listeners[_i];
						listener.apply(this.target, [event]);
					}
				};

				EventDispatcher.prototype.callListener = function(event, listener) {
					try {
						listener.apply(this.target, [event]);
					} catch (error) {
						if (this.catchErrors === true) {
							this.processEventError(error, event, listener);
						} else {
							throw error;
						}
					}
				};

				EventDispatcher.prototype.processEventError = function(error, event, listener) {
					var err, file, line;
					file = error.fileName || error.sourceURL;
					line = error.lineNumber || error.line;
					err = {
						message: error.message,
						name: "AMP Event Listener Error",
						file: file,
						fileName: file,
						line: line,
						lineNumber: line,
						error: error,
						event: event,
						listener: listener,
						functionName: listener.name,
						toString: function() {
							var message;
							message = "" + this.name + ":";
							message += "\n\t" + (this.error.toString());
							if (this.event != null) {
								message += "\n\t\tevent: " + this.event.type;
							}
							if (this.listener != null) {
								message += "\n\t\tfunction: " + this.listener.name;
							}
							if (this.file != null) {
								message += "\n\t\tfile: " + this.file;
							}
							if (this.line != null) {
								message += "\n\t\tline: " + this.line;
							}
							return message;
						}
					};
					setTimeout(function (err) { throw err; }, 0, err);
				};

				/**
				 * Removes a listener for a given event type.
				 *
				 * @param {!string}  type  A string representing the event's type.
				 * @param {!Function} func  A function to call when the event is triggered.
				 * @return {?Function} the handler that was removed if any
				 * @param {boolean=} capture
				 */
				EventDispatcher.prototype.removeEventListener = function(type, func, capture) {
					var index, listeners;
					if (!(func != null) || !(type != null)) {
						return;
					}
					listeners = this.listenerMap[type];
					if (!(listeners != null)) {
						return;
					}
					index = listeners != null ? listeners.indexOf(func) : void 0;
					if (index === -1) {
						return;
					}
					return listeners.splice(index, 1);
				};

				/**
				 * @constructor
				 * @private
				 * @extends {EventDispatcher}
				 */
				function XHR() {
					XHR.__super__.constructor.call(this);
				}


				__extends(XHR, EventDispatcher);


				XHR.prototype.xhr = null;

				XHR.prototype.headers = null;

				XHR.prototype.response = null;

				XHR.prototype.responseXML = null;

				XHR.prototype.responseText = null;

				XHR.prototype.responseType = null;

				XHR.prototype.withCredentials = false;

				XHR.prototype.readyState = 0;

				XHR.prototype.status = null;

				XHR.prototype.open = function(method, url) {
					var xdr, xhr,
						_this = this;
					try {
						xhr = new XMLHttpRequest();
					} catch (error) {
						xhr = new window.ActiveXObject("Microsoft.XMLHTTP");
					}
					if (XHR.isCORS(url)) {
						if (Object.prototype.hasOwnProperty.call(xhr, "withCredentials")) {
							try {
								xhr.withCredentials = this.withCredentials;
							} catch (error) {
								Logger.warn("[AMP XHR WARNING]", "withCredentials not properly supported in this browser.", error);
							}
						} else if (typeof XDomainRequest !== "undefined") {
							xdr = true;
							xhr = new XDomainRequest();
						}
					}
					if (xhr != null) {
						if (xdr) {
							xhr.onprogress = function() {};
							xhr.ontimeout = function() {};
							xhr.onerror = function() {};
							xhr.onload = function(event) {
								if (typeof xhr.onreadystatechange === 'function') {
									xhr.readyState = 4;
									xhr.status = 200;
									if (xhr.contentType.match(/\/xml/)) {
										xhr.responseXML = new ActiveXObject('Microsoft.XMLDOM');
										xhr.responseXML.async = false;
										xhr.responseXML.loadXML(xhr.responseText);
									}
									xhr.onreadystatechange.call(xhr, event, false);
								}
							};
						}
						xhr.onreadystatechange = function(event) {
							var _ref, _ref1;
							_this.readyState = xhr.readyState;
							_this.dispatchEvent(new Event("readystatechange", xhr));
							if (xhr.readyState === 4) {
								_this.status = xhr.status;
								if ((199 < (_ref = _this.status) && _ref < 400) || _this.status === 0) {
									if (xhr.responseText == null) {
										xhr.responseText = xhr.text;
									}
									_this.responseText = xhr.responseText;
									if ((xhr.responseXML != null) && ((_ref1 = xhr.responseXML.childNodes) != null ? _ref1.length : void 0) > 0) {
										_this.response = _this.responseXML = xhr.responseXML;
										_this.responseType = "document";
									} else {
										try {
											_this.response = JSON.parse(xhr.responseText);
											_this.responseType = "json";
										} catch (error) {
											_this.response = xhr.responseText;
											_this.responseType = "text";
										}
									}
									_this.dispatchEvent(new Event("load", _this));
								} else {
									if (_this.status !== 0) {
										_this.dispatchEvent(new Event("error", _this));
									}
								}
							}
						};
						try {
							if (typeof xhr.onerror !== "undefined") {
								xhr.onerror = function(event) {
									_this.dispatchEvent(new Event("error", _this));
								};
							}
						} catch (error) {

						}
						xhr.open(method, url);
					}
					this.xhr = xhr;
				};

				XHR.prototype.send = function(data) {
					var key, value, _ref;
					if (this.headers != null) {
						_ref = this.headers;
						for (key in _ref) {
							value = _ref[key];
							if ((key != null) && (value != null)) {
								this.xhr.setRequestHeader(key, value);
							}
						}
					}
					setTimeout(this.xhr.send.bind(this.xhr, data), 0);
				};

				XHR.prototype.setRequestHeader = function(key, value) {
					if (!(key != null) || !(value != null)) {
						return;
					}
					if (this.headers == null) {
						this.headers = {};
					}
					this.headers[key] = value;
				};

				XHR.prototype.setRequestHeaders = function(headers) {
					this.headers = headers;
					return headers;
				};

				XHR.prototype.getResponseHeader = function(name) {
					var _ref;
					return (_ref = this.xhr) != null ? typeof _ref.getResponseHeader === "function" ? _ref.getResponseHeader(name) : void 0 : void 0;
				};

				XHR.prototype.getAllResponseHeaders = function() {
					var _ref;
					return (_ref = this.xhr) != null ? typeof _ref.getAllResponseHeaders === "function" ? _ref.getAllResponseHeaders() : void 0 : void 0;
				};

				XHR.isCORS = function(url) {
					var hostname, parser, port, protocol;
					parser = document.createElement('a');
					parser.href = url;
					hostname = parser.hostname !== "" ? parser.hostname : location.hostname;
					port = parser.port !== "0" ? parser.port : location.port;
					protocol = parser.protocol !== ":" ? parser.protocol : location.protocol;
					return location.protocol !== protocol || location.hostname !== hostname || location.port !== port && !(location.port === "" && port === "80");
				};

				function Utils() {}

				Utils.blankImage = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAMAAAAoyzS7AAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAAyJpVFh0WE1MOmNvbS5hZG9iZS54bXAAAAAAADw/eHBhY2tldCBiZWdpbj0i77u/IiBpZD0iVzVNME1wQ2VoaUh6cmVTek5UY3prYzlkIj8+IDx4OnhtcG1ldGEgeG1sbnM6eD0iYWRvYmU6bnM6bWV0YS8iIHg6eG1wdGs9IkFkb2JlIFhNUCBDb3JlIDUuMC1jMDYwIDYxLjEzNDc3NywgMjAxMC8wMi8xMi0xNzozMjowMCAgICAgICAgIj4gPHJkZjpSREYgeG1sbnM6cmRmPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5LzAyLzIyLXJkZi1zeW50YXgtbnMjIj4gPHJkZjpEZXNjcmlwdGlvbiByZGY6YWJvdXQ9IiIgeG1sbnM6eG1wPSJodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAvIiB4bWxuczp4bXBNTT0iaHR0cDovL25zLmFkb2JlLmNvbS94YXAvMS4wL21tLyIgeG1sbnM6c3RSZWY9Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC9zVHlwZS9SZXNvdXJjZVJlZiMiIHhtcDpDcmVhdG9yVG9vbD0iQWRvYmUgUGhvdG9zaG9wIENTNSBNYWNpbnRvc2giIHhtcE1NOkluc3RhbmNlSUQ9InhtcC5paWQ6NjI2QkJDQTBCMzQ4MTFFMUFERDJBRkRGQUQwNTcxRTIiIHhtcE1NOkRvY3VtZW50SUQ9InhtcC5kaWQ6NjI2QkJDQTFCMzQ4MTFFMUFERDJBRkRGQUQwNTcxRTIiPiA8eG1wTU06RGVyaXZlZEZyb20gc3RSZWY6aW5zdGFuY2VJRD0ieG1wLmlpZDowODg4NjdFQkIzNDgxMUUxQUREMkFGREZBRDA1NzFFMiIgc3RSZWY6ZG9jdW1lbnRJRD0ieG1wLmRpZDowODg4NjdFQ0IzNDgxMUUxQUREMkFGREZBRDA1NzFFMiIvPiA8L3JkZjpEZXNjcmlwdGlvbj4gPC9yZGY6UkRGPiA8L3g6eG1wbWV0YT4gPD94cGFja2V0IGVuZD0iciI/Pu0++ecAAAAGUExURf///wAAAFXC034AAAABdFJOUwBA5thmAAAADElEQVR42mJgAAgwAAACAAFPbVnhAAAAAElFTkSuQmCC";

				Utils.flashTypes = ["video/mp4", "video/x-flv", "video/f4m", "application/smil", "application/smil+xml"];

				Utils.mimeTypes = {
					mp4: "video/mp4",
					flv: "video/x-flv",
					f4m: "video/f4m",
					smil: "application/smil",
					m3u8: "application/x-mpegURL",
					mp3: "audio/mpeg",
					json: "application/json",
					txt: "text/plain",
					xml: "application/xml",
					ogv: "video/ogg",
					webm: "video/webm",
					mpd: "application/dash+xml",
					ism: "application/vnd.ms-sstr+xml",
					js: "text/javascript",
					css: "text/css"
				};

				Utils.rules = {
					flashTablets: {
						label: "Android 2 & 3 or Kindle Fire 1",
						regexp: "Android [23]|Silk\/1"
					},
					html5Phones: {
						label: "iPhone",
						regexp: "iPhone"
					},
					html5Tablets: {
						label: "HTML5 Tablets",
						regexp: "iPad|Android [4-9]|Silk\/2"
					},
					desktop: {
						label: "Desktop",
						regexp: "^((?!iPad|iPhone|Android|BlackBerry|PlayBook|Silk).)*$"
					}
				};

				Utils.playbackModes = {
					HTML: "html",
					AUTO: "auto",
					FLASH: "flash",
					NONE: "none",
					EXTERNAL: "external"
				};

				Utils.getPlaybackMode = function(mode) {
					var key, valid, value, _ref, _ref1;
					if (mode == null) {
						mode = ((_ref = QueryString["amp-mode"]) != null ? _ref.toLowerCase() : void 0) || this.playbackModes.AUTO;
					}
					valid = false;
					_ref1 = this.playbackModes;
					for (key in _ref1) {
						value = _ref1[key];
						if (value === mode) {
							valid = true;
							break;
						}
					}
					if (!valid) {
						mode = this.playbackModes.AUTO;
					}
					if (mode !== this.playbackModes.AUTO) {
						if (mode === this.playbackModes.FLASH && !this.hasFlash()) {
							mode = this.playbackModes.NONE;
						}
						return mode;
					}
					if (!this.hasFlash()) {
						mode = this.supportsHTML5Video() ? this.playbackModes.HTML : this.playbackModes.NONE;
					}
					if (mode === this.playbackModes.AUTO) {
						mode = this.isHTML5() ? this.playbackModes.HTML : this.playbackModes.FLASH;
					}
					return mode;
				};

				Utils.mergeRules = function(rules) {
					var id, rule, _results;
					_results = [];
					for (id in rules) {
						rule = rules[id];
						_results.push(Utils.rules[id] = rule);
					}
					return _results;
				};

				Utils.checkRules = function(rules) {
					var id, regExp, rule, _i, _len;
					if ((rules != null) && rules.length > 0) {
						for (_i = 0, _len = rules.length; _i < _len; _i++) {
							id = rules[_i];
							if (!(rule = Utils.rules[id])) {
								continue;
							}
							regExp = new RegExp(rule.regexp);
							if (regExp.test(navigator.userAgent)) {
								return true;
							}
						}
					}
					return false;
				};

				Utils.selectSource = function(sources, canPlayType) {
					var item, _i, _j, _len, _len1;
					for (_i = 0, _len = sources.length; _i < _len; _i++) {
						item = sources[_i];
						if (Utils.checkRules(item.rules)) {
							return item;
						}
					}
					for (_j = 0, _len1 = sources.length; _j < _len1; _j++) {
						item = sources[_j];
						if (canPlayType(item.type || Utils.getMimeType(item.src)) !== "") {
							return item;
						}
					}
					return null;
				};

				Utils.getMimeType = function(file) {
					return this.mimeTypes[Utils.getFileExtension(file)];
				};

				Utils.selectTrack = function(tracks, kind) {
					var item, track, _i, _len;
					for (_i = 0, _len = tracks.length; _i < _len; _i++) {
						item = tracks[_i];
						if (!(item.kind === kind)) {
							continue;
						}
						track = item;
						break;
					}
					return track;
				};

				Utils.isIPhone = function() {
					return /iPhone/.test(navigator.platform) || /iPhone/.test(navigator.userAgent);
				};

				Utils.isIPad = function() {
					return /iPad/.test(navigator.platform) || /iPad/.test(navigator.userAgent);
				};

				Utils.isAndroid = function() {
					return /Android [4-9]/.test(navigator.userAgent);
				};

				Utils.isKindleFireHD = function() {
					return /Silk\/2/.test(navigator.userAgent);
				};

				Utils.isKindleFire = function() {
					return /Silk\/1/.test(navigator.userAgent);
				};

				Utils.isBlackBerry = function() {
					return /BlackBerry;|PlayBook|BB10/.test(navigator.userAgent);
				};

				Utils.isFirefoxOS = function() {
					return /\(Mobile;.*Firefox\//.test(navigator.userAgent);
				};

				Utils.supportsHTML5Video = function() {
					var video;
					video = document.createElement("video");
					return video.canPlayType != null;
				};

				Utils.isHTML5 = function() {
					return this.isIOS() || this.isAndroid() || this.isKindleFireHD() || this.isBlackBerry() || this.isFirefoxOS();
				};

				Utils.isIOS = function() {
					var iOSRegEx, isIOS;
					iOSRegEx = /iPad|iPhone|iPod/i;
					return isIOS = iOSRegEx.test(navigator.platform) || iOSRegEx.test(navigator.userAgent);
				};

				Utils.getIOSversion = function() {
					var ver;
					if (/iP(hone|od|ad)/.test(navigator.platform)) {
						ver = navigator.appVersion.match(/OS (\d+)_(\d+)_?(\d+)?/);
						return [parseInt(ver[1], 10), parseInt(ver[2], 10), parseInt(ver[3] || 0, 10)];
					}
				};

				Utils.hasFlash = function() {
					return swfobject.hasFlashPlayerVersion("1");
				};

				Utils.isFullscreenDevice = function() {
					return this.isKindleFireHD() || this.isIPhone();
				};

				Utils.getDevice = function() {
					var device;
					device = null;
					if (this.isIPhone()) {
						device = "iphone";
					} else if (this.isIPad()) {
						device = "ipad";
					} else if (/Android/.test(navigator.userAgent)) {
						device = "android";
					} else if (this.isKindleFireHD()) {
						device = "kindlefirehd";
					} else if (this.isKindleFire()) {
						device = "kindlefire";
					} else if (/Mac|Win32/.test(navigator.platform)) {
						device = "desktop";
					}
					return device;
				};

				Utils.xmlToJson = function(xml) {
					var attribute, child, element, index, nodeName, obj, _i, _j, _len, _len1, _ref, _ref1;
					obj = {};
					if (xml.nodeType === 9) {
						xml = xml.firstChild;
					}
					if (xml.nodeType === 1) {
						if (xml.attributes.length > 0) {
							obj["@attributes"] = {};
							_ref = xml.attributes;
							for (index = _i = 0, _len = _ref.length; _i < _len; index = ++_i) {
								attribute = _ref[index];
								obj["@attributes"][attribute.nodeName] = attribute.nodeValue;
							}
						}
					} else if (xml.nodeType === 3 || xml.nodeType === 4) {
						obj = xml.nodeValue;
					}
					if (xml.hasChildNodes()) {
						_ref1 = xml.childNodes;
						for (index = _j = 0, _len1 = _ref1.length; _j < _len1; index = ++_j) {
							child = _ref1[index];
							if (child.nodeType === 3 && !/\S/.test(child.nodeValue)) {
								continue;
							}
							nodeName = child.nodeName.replace(/:/, "-");
							element = this.xmlToJson(child);
							if (!(element["@attributes"] != null) && (element["#text"] != null)) {
								element = element["#text"];
							}
							if (!(obj[nodeName] != null)) {
								obj[nodeName] = element;
							} else {
								if (!(obj[nodeName] instanceof Array)) {
									obj[nodeName] = [obj[nodeName]];
								}
								obj[nodeName].push(element);
							}
						}
					}
					return obj;
				};

				/**
				 * Returns a platform specific XHR object.
				 *
				 * @static
				 */
				Utils.getXHR = function() {
					return new XHR();
				};

				/**
				 * Retrieves a remote text file
				 *
				 * @static
				 */
				Utils.get = function(url, client, headers) {
					var xhr;
					if (client == null) {
						client = {};
					}
					if (headers == null) {
						headers = null;
					}
					xhr = Utils.getXHR();
					if (client != null) {
						if (client.withCredentials != null) {
							xhr.withCredentials = client.withCredentials;
						}
						if (client.onload != null) {
							xhr.onload = client.onload;
						}
						if (client.onerror != null) {
							xhr.onerror = client.onerror;
						}
					}
					xhr.open("GET", url);
					if (headers != null) {
						xhr.setRequestHeaders(headers);
					}
					xhr.send();
					return xhr;
				};

				/**
				 * Posts a string to NetStorage.
				 *
				 * @static
				 */
				Utils.send = function(url, data, client, headers) {
					var xhr;
					if (client == null) {
						client = {};
					}
					if (headers == null) {
						headers = {
							"Content-Type": "String"
						};
					}
					xhr = Utils.getXHR();
					if (client.onload != null) {
						xhr.onload = client.onload;
					}
					if (client.onerror != null) {
						xhr.onerror = client.onerror;
					}
					xhr.open("POST", url);
					if (headers != null) {
						xhr.setRequestHeaders(headers);
					}
					xhr.send(data);
					return xhr;
				};

				/**
				 * Attaches a JavaScript file to the head of the document.
				 *
				 * @static
				 */
				Utils.loadScript = function(src, onload, parent) {
					var head, script;
					head = parent || document.getElementsByTagName("head")[0];
					script = document.createElement("script");
					script.type = 'text/javascript';
					if (onload != null) {
						if (script.addEventListener) {
							script.onload = function(event) {
								onload();
							};
						} else if (script.readyState) {
							script.onreadystatechange = function(event) {
								if (this.readyState === 'loaded' || this.readyState === 'complete') {
									this.onreadystatechange = null;
									onload();
								}
							};
						}
					}
					script.src = src;
					head.appendChild(script);
					return script;
				};

				/**
				 * Attaches a CSS file to the head of the document.
				 *
				 * @static
				 */
				Utils.loadStyleSheet = function(href) {
					var head, link;
					head = document.getElementsByTagName("head")[0];
					link = document.createElement("link");
					link.rel = "stylesheet";
					link.type = 'text/css';
					link.href = href;
					return head.appendChild(link);
				};

				Utils.read = function(url, client, type, headers) {
					var text, xhr;
					if (client == null) {
						client = {};
					}
					if (type == null) {
						type = "";
					}
					if (headers == null) {
						headers = [];
					}
					try {
						xhr = this.get(url, client, headers);
						text = xhr.responseText || xhr.text;
						if (type === Utils.mimeTypes.json) {
							return JSON.parse(text);
						} else if ((type === Utils.mimeTypes.xml) && (xhr.responseXML != null)) {
							return xhr.responseXML;
						} else {
							return text;
						}
					} catch (error) {
						if (typeof console !== "undefined" && console !== null) {
							if (typeof console.error === "function") {
								console.error("Read Error: ", error);
							}
						}
						return null;
					}
				};

				Utils.getFileExtension = function(url) {
					return url.split('.').pop().replace(/\?.*/, "");
				};

				Utils.getResponseHeader = function(url, header, client) {
					var xhr;
					if (client == null) {
						client = {};
					}
					xhr = Utils.getXHR();
					if (client.onerror != null) {
						xhr.onerror = client.onerror;
					}
					xhr.open("HEAD", url, false);
					xhr.send();
					return xhr.getResponseHeader(header);
				};

				Utils.getResponseHeaders = function(url, headers, client) {
					var header, results, xhr, _i, _len;
					if (client == null) {
						client = {};
					}
					xhr = Utils.getXHR();
					if (client.onerror != null) {
						xhr.onerror = client.onerror;
					}
					xhr.open("HEAD", url, false);
					xhr.send();
					results = {};
					if (!(headers != null)) {
						return xhr.getAllResponseHeaders();
					}
					for (_i = 0, _len = headers.length; _i < _len; _i++) {
						header = headers[_i];
						results[header] = xhr.getResponseHeader(header);
					}
					return results;
				};

				/**
				 * Determines if the device supports touch events
				 *
				 * @static
				 */
				Utils.isTouch = null;

				/**
				 * Determines if the device supports touch events
				 *
				 * @static
				 */
				Utils.isTouchDevice = function() {
					if (!(this.isTouch != null)) {
						try {
							document.createEvent("TouchEvent");
							this.isTouch = true;
						} catch (error) {
							this.isTouch = false;
						}
					}
					return this.isTouch;
				};

				/**
				 * Forces a number between a min and a max
				 *
				 * @static
				 */
				Utils.clamp = function(value, min, max) {
					if (value < min) {
						value = min;
					}
					if (value > max) {
						value = max;
					}
					return value;
				};

				/**
				 * Beacons a url via an img tag
				 *
				 * @static
				 */
				Utils.beacon = function(url) {
					var beaconImg;
					beaconImg = document.getElementById("beaconId");
					if (!(beaconImg != null)) {
						beaconImg = document.createElement("img");
						beaconImg.setAttribute("id", "beaconId");
						beaconImg.setAttribute("height", 0);
						beaconImg.setAttribute("width", 0);
						document.body.appendChild(beaconImg);
						beaconImg.style.display = "none";
					}
					beaconImg.setAttribute("src", url);
					return beaconImg;
				};

				/**
				 * Beacons a url via an img tag
				 *
				 * @static
				 */
				Utils.getElementOffset = function(element) {
					var offset;
					offset = {
						left: 0,
						top: 0
					};
					if (element.offsetParent) {
						offset.left = element.offsetLeft;
						offset.top = element.offsetTop;
						while ((element = element.offsetParent)) {
							offset.left += element.offsetLeft;
							offset.top += element.offsetTop;
						}
					}
					return offset;
				};

				/**
				 * Override the properties of a base object with the values
				 * of an override object.
				 *
				 * @param {Object} base     The base object.
				 * @param {Object} overrides  key/value overrides
				 * @return {Object}
				 * @static
				 */
				Utils.override = function(base, overrides, clone) {
					var key, value;
					if (clone == null) {
						clone = true;
					}
					if (!(base != null)) {
						return overrides;
					}
					if (!(overrides != null)) {
						return base;
					}
					if (clone === true) {
						base = Utils.clone(base);
						overrides = Utils.clone(overrides);
					}
					for (key in overrides) {
						value = overrides[key];
						if (typeof value === "object") {
							if (base[key] == null) {
								base[key] = value instanceof Array ? [] : {};
							}
							base[key] = Utils.override(base[key], value, false);
						} else {
							base[key] = value;
						}
					}
					return base;
				};

				/**
				 * Clones an object.
				 *
				 * @param {Object} obj The object to be cloned.
				 * @return {Object}
				 * @static
				 */
				Utils.clone = function(obj, deepCopy) {
					var clone, item, k, key, v, value, _i, _len;
					if (deepCopy == null) {
						deepCopy = true;
					}
					if (typeof obj !== "object") {
						clone = obj;
					} else {
						if (obj instanceof Array) {
							clone = [];
						} else {
							clone = {};
						}
						for (key in obj) {
							value = obj[key];
							if (typeof value === "object" && deepCopy === true) {
								if (value instanceof Array) {
									clone[key] = [];
									for (_i = 0, _len = value.length; _i < _len; _i++) {
										item = value[_i];
										clone[key].push(this.clone(item));
									}
								} else {
									clone[key] = {};
									for (k in value) {
										v = value[k];
										clone[key][k] = this.clone(v);
									}
								}
							} else {
								clone[key] = value;
							}
						}
					}
					return clone;
				};

				/**
				 * Takes a time in seconds and converts it to timecode.
				 *
				 * @param   {Number}  time  The time in seconds to be formatted.
				 * @return  {String}  A SMTP formatted string.
				 */
				Utils.formatTimecode = function(time, duration) {
					var strTime;
					time = parseInt(time);
					if (isNaN(time)) {
						return "00:00";
					}
					strTime = Utils.formatZeroFill(time % 60);
					time = parseInt(time / 60);
					strTime = Utils.formatZeroFill(time % 60) + ":" + strTime;
					time = parseInt(time / 60);
					if (time > 0) {
						strTime = Utils.formatZeroFill(time) + ":" + strTime;
					}
					if (duration >= 3600 && strTime.length === 5) {
						strTime = "00:" + strTime;
					}
					return strTime;
				};

				/**
				 * Converts a time in seconds to a string and adds a zero in front of any number lower than 10.
				 *
				 * @param Number time The number to be zero filled.
				 */
				Utils.formatZeroFill = function(time) {
					var str;
					str = time.toString();
					if (time < 10) {
						str = "0" + str;
					}
					return str;
				};

				/**
				 * Converts timecode to seconds.
				 *
				 * @param   {string}  timeCode        A SMTP formatted string.
				 * @param   {number}  [framerate=30]  The frame rate. Used to calculate milliseconds.
				 * @return  {number}                  The number of seconds represented by the time code
				 */
				Utils.flattenTimecode = function(timeCode, framerate) {
					var ms, parts, pieces, time;
					if (framerate == null) {
						framerate = 30;
					}
					if (!(timeCode != null) || timeCode === "") {
						return NaN;
					}
					pieces = timeCode.split(":");
					ms = 0;
					if (pieces.length === 4) {
						ms = parseInt(pieces.pop()) / framerate;
					} else if (pieces.length === 3) {
						pieces[2] = pieces[2].replace(",", ".");
						if (pieces[2].indexOf(".") !== -1) {
							parts = pieces[2].split(".");
						}
						if ((parts != null ? parts.length : void 0) > 1) {
							pieces[2] = parts[0];
							ms = parseInt(parts[1]) / 1000;
						}
					}
					time = parseInt(pieces.pop());
					while (pieces.length > 0) {
						time += Math.pow(60, pieces.length) * parseInt(pieces.shift());
					}
					return time + ms;
				};

				/**
				 * Adds a cache busting query string parameter to a url.
				 *
				 * @param String url The url.
				 * @param String key The name of the query string variable
				 * @param Object value The value of the query string variable
				 */
				Utils.cacheBust = function(url, key, value) {
					var op;
					if (key == null) {
						key = "cacheBust";
					}
					if (value == null) {
						value = Date.now();
					}
					op = url.indexOf('?') === -1 ? "?" : "&";
					return url + op + key + "=" + value;
				};

				/**
				 * Converts a camel case string in to a CSS proptery name.
				 */
				Utils.formatStyleName = function(styleName) {
					return styleName.replace(/([A-Z])/, "-$1").toLowerCase();
				};

				/**
				 * Trims whitespace from the beginning and end of a string
				 */
				Utils.trim = function(str) {
					var trim;
					trim = str.replace(/^\s*(.*)/, "$1");
					return trim.replace(/(.*)\s*$/, "$1");
				};

				/**
				 */
				Utils.getJson = function(url, onload, onerror) {
					var xhr;
					xhr = Utils.getXHR();
					xhr.open("GET", url);
					xhr.onload = function(event) {
						var feed;
						if (xhr.responseType === "document") {
							feed = Utils.xmlToJson(xhr.responseXML);
						} else {
							feed = xhr.response;
						}
						if (typeof onload === "function") {
							onload(feed);
						}
					};
					xhr.onerror = function(event) {
						if (typeof onerror === "function") {
							onerror(event);
						}
					};
					xhr.send();
					return xhr;
				};

				/**
				 */
				Utils.getSource = function(url, onload, onerror) {
					var feedloadedHandler, mode;
					mode = Utils.getPlaybackMode();
					feedloadedHandler = function(feed) {
						var canPlayType, helper, source, _ref;
						helper = new MRSSHelper();
						feed = helper.createFeed(feed);
						if ((feed != null ? (_ref = feed.item) != null ? _ref.length : void 0 : void 0) > 0) {
							canPlayType = function(type) {
								if ((mode === "flash" && Utils.flashTypes.indexOf(type) !== -1) || (mode === "html" && Utils.flashTypes.indexOf(type) === -1)) {
									return "maybe";
								} else {
									return "";
								}
							};
							source = Utils.selectSource(feed.item[0].source, canPlayType);
						}
						if (typeof onload === "function") {
							onload(source);
						}
					};
					Utils.getJson(url, feedloadedHandler, onerror);
				};

				/**
				 */
				Utils.trackMouse = function() {
					try {
						if (document.addEventListener != null) {
							document.addEventListener("mousemove", this.mouseTracker);
						} else if (document.attachEvent != null) {
							document.attachEvent("mousemove", this.mouseTracker);
						}
					} catch (error) {

					}
				};

				/**
				 */
				Utils.mouseTracker = function(event) {
					Utils.clientX = event.clientX;
					Utils.clientY = event.clientY;
					Utils.pageX = event.pageX;
					Utils.pageY = event.pageY;
				};

				/**
				 */
				Utils.isMouseOverElement = function(element) {
					if (!(element != null)) {
						return false;
					}
					return element.contains(document.elementFromPoint(Utils.clientX, Utils.clientY));
				};

				Utils.trackMouse();

				/** Function to get Outer Dimensions
				 */
				Utils.getActualSize = function(element, margin) {
					var height, style, width;
					if (margin == null) {
						margin = true;
					}
					width = element.offsetWidth;
					height = element.offsetHeight;
					if (margin === true) {
						style = getComputedStyle(element);
						width += parseInt(style.marginLeft) + parseInt(style.marginRight);
						height += parseInt(style.marginTop) + parseInt(style.marginBottom);
					}
					return {
						"width": width,
						"height": height
					};
				};

				/**
				 * The AMPConfig class
				 *
				 * @constructor
				 * @private
				 * @extends {EventDispatcher}
				 */
				function AMPConfig() {
					AMPConfig.__super__.constructor.call(this, this, false);
				}


				__extends(AMPConfig, EventDispatcher);


				AMPConfig.UNINITIALIZED = 0;

				AMPConfig.LOADING = 1;

				AMPConfig.LOADED = 2;

				/**
				 * Converst XML to a native JS object
				 *
				 * @param   {Element} xml   The XML to convert
				 * @return  {Object}
				 * @static
				 */
				AMPConfig.parseModule = function(xml) {
					var child, childNodes, count, i, k, node, obj, _i, _len;
					obj = {};
					i = 0;
					childNodes = xml.childNodes;
					count = childNodes.length;
					k = 0;
					node = null;
					child = null;
					for (_i = 0, _len = childNodes.length; _i < _len; _i++) {
						node = childNodes[_i];
						if ((node != null ? node.nodeType : void 0) === 1) {
							obj[node.nodeName] = this.parseItem(node);
						}
					}
					return obj;
				};

				AMPConfig.parseItem = function(node) {
					var child, children, type, value, _i, _len;
					type = ("" + (node.getAttribute('type'))).toLowerCase();
					value = node.textContent || node.text || node.innerText;
					if (type !== "object" && type !== "array" && /#\{.*\}/.test(value)) {
						return value;
					}
					switch (type) {
						case "object":
							value = this.parseModule(node);
							break;
						case "array":
							value = [];
							children = node.childNodes;
							for (_i = 0, _len = children.length; _i < _len; _i++) {
								child = children[_i];
								if (child.nodeType !== 1) {
									continue;
								}
								value.push(this.parseItem(child));
							}
							break;
						case "boolean":
							value = value.toLowerCase() === "true";
							break;
						case "number":
							value = parseFloat(value);
					}
					return value;
				};

				AMPConfig.prototype.url = null;

				AMPConfig.prototype.data = null;

				AMPConfig.prototype.xml = null;

				AMPConfig.prototype.readyState = AMPConfig.UNINITIALIZED;

				AMPConfig.prototype.loaded = false;

				/**
				 */
				AMPConfig.prototype.loadURL = function(url, withCredentials) {
					var xhr,
						_this = this;
					if (withCredentials == null) {
						withCredentials = false;
					}
					this.url = url;
					this.setReadyState(AMPConfig.LOADING);
					xhr = Utils.get(url, {
						withCredentials: withCredentials,
						onload: function(event) {
							var data, firstChild, xmlhttp;
							xmlhttp = event.detail;
							if (xmlhttp.responseType === "document") {
								_this.xml = xmlhttp.responseXML;
								firstChild = _this.xml.firstChild.nodeType !== 7 ? _this.xml.firstChild : _this.xml.childNodes[1];
								data = AMPConfig.parseModule(firstChild);
							} else {
								data = xmlhttp.response;
								if (typeof data === "string") {
									data = JSON.parse(data);
								}
							}
							_this.loadData(data);
						},
						onerror: function(event) {
							_this.dispatchEvent(new Event("error", event));
							Logger.error(event);
						}
					});
				};

				/**
				 */
				AMPConfig.prototype.loadData = function(data) {
					this.data = data;
					this.setReadyState(AMPConfig.LOADED);
				};

				/**
				 */
				AMPConfig.prototype.load = function(resource, withCredentials) {
					if (withCredentials == null) {
						withCredentials = false;
					}
					switch (typeof resource) {
						case "object":
							this.loadData(resource);
							break;
						case "string":
							this.loadURL(resource, withCredentials);
							break;
						default:
							throw new Error("[AMP ERROR] Invalid default configuration resource");
					}
				};

				/**
				 */
				AMPConfig.prototype.setReadyState = function(state) {
					this.readyState = state;
					this.dispatchEvent(new Event("readystatechange", state));
					if (state === AMPConfig.LOADED && !this.loaded) {
						this.loaded = true;
						this.dispatchEvent(new Event("load", this.data));
					}
				};

				/**
				 * @constructor
				 * @private
				 */
				function ButtonMediator(label, parent, element, componentName, onclick) {
					this.onclick = onclick != null ? onclick : this.onclick;
					ButtonMediator.__super__.constructor.call(this, componentName, null, parent, element);
					this.icon = this.create("icon");
					if (label != null) {
						this.label = this.createText("label", label);
					}
				}


				__extends(ButtonMediator, ComponentMediator);


				ButtonMediator.prototype.componentType = "button";

				ButtonMediator.prototype.icon = null;

				ButtonMediator.prototype.label = null;

				ButtonMediator.prototype.onclick = null;

				function IdleUtil(element, timeout) {
					this.element = element;
					this.timeout = timeout;
					IdleUtil.__super__.constructor.call(this);
					this.resetHandler = this.reset.bind(this);
				}


				__extends(IdleUtil, EventDispatcher);


				IdleUtil.prototype.events = ["mousemove", "mousedown", "keypress", "DOMMouseScroll", "mousewheel", "touchmove", "MSPointerMove"];

				IdleUtil.prototype.resetHandler = null;

				IdleUtil.prototype.element = null;

				IdleUtil.prototype.timeout = null;

				IdleUtil.prototype.active = true;

				IdleUtil.prototype.timeoutId = null;

				IdleUtil.prototype.applyListeners = function(action) {
					var event, _i, _len, _ref;
					if (action == null) {
						action = "add";
					}
					_ref = this.events;
					for (_i = 0, _len = _ref.length; _i < _len; _i++) {
						event = _ref[_i];
						this.element["" + action + "EventListener"](event, this.resetHandler);
					}
				};

				IdleUtil.prototype.start = function(timeout) {
					if (timeout != null) {
						this.timeout = timeout;
					}
					this.stop();
					this.applyListeners("add");
					this.timeoutId = setTimeout(this.setActive.bind(this, false), this.timeout);
				};

				IdleUtil.prototype.stop = function() {
					this.applyListeners("remove");
					clearTimeout(this.timeoutId);
				};

				IdleUtil.prototype.reset = function() {
					this.setActive(true);
					this.start();
				};

				IdleUtil.prototype.setActive = function(value) {
					if (value === this.active) {
						return;
					}
					this.active = value;
					this.dispatchEvent(new Event("activechange", {
						active: this.active
					}));
					return value;
				};

				IdleUtil.prototype.getActive = function() {
					return this.active;
				};

				/**
				 * The FullScreenMediator class.
				 *
				 * @constructor
				 * @private
				 * @extends {ModuleMediator}
				 * @param {Object} viewComponent
				 */
				function FullScreenMediator(parent) {
					FullScreenMediator.__super__.constructor.call(this, null, parent);
				}


				__extends(FullScreenMediator, ButtonMediator);


				FullScreenMediator.prototype.componentName = "full-screen";

				FullScreenMediator.prototype.onRegister = function() {
					FullScreenMediator.__super__.onRegister.call(this);
					this.sendNotification(Notifications.ADD_CONTROL_STATE, this.componentName + "-enabled");
				};

				FullScreenMediator.prototype.onclick = function(event) {
					event.stopImmediatePropagation();
					this.sendNotification(Notifications.TOGGLE_FULL_SCREEN);
					return false;
				};

				/**
				 * @override
				 */
				FullScreenMediator.prototype.listNotificationInterests = function() {
					return [Notifications.DISABLE_FULL_SCREEN, Notifications.ENABLE_FULL_SCREEN];
				};

				/**
				 * @override
				 */
				FullScreenMediator.prototype.handleNotification = function(notification) {
					var body, name;
					name = notification.getName();
					body = notification.getBody();
					switch (name) {
						case Notifications.DISABLE_FULL_SCREEN:
							this.setDisabled(true);
							break;
						case Notifications.ENABLE_FULL_SCREEN:
							this.setDisabled(false);
					}
				};

				/**
				 * @param {FlashPlayer} player
				 * @param {Object} config
				 * @constructor
				 * @private
				 * @extends {puremvc.Mediator}
				 */
				function PluginWrapper(player, config) {
					this.player = player;
					this.config = config;
					PluginWrapper.__super__.constructor.call(this);
					this.dispatcher = new EventDispatcher(this);
				}


				__extends(PluginWrapper, puremvc.Mediator);


				PluginWrapper.NAME = "PluginWrapper";

				PluginWrapper.prototype.player = null;

				PluginWrapper.prototype.config = null;

				PluginWrapper.prototype.dispatcher = null;

				PluginWrapper.prototype.createFlashVars = null;

				PluginWrapper.prototype.createXML = null;

				/**
				 */
				PluginWrapper.prototype.addEventListener = function(type, func) {
					this.dispatcher.addEventListener(type, func);
				};

				/**
				 */
				PluginWrapper.prototype.dispatchEvent = function(event) {
					if (event.type !== "timeupdate" && event.type !== "timeremaining") {
						this.player.logger.log("[AMP " + (this.constructor.NAME.replace('Wrapper', '').toUpperCase()) + " EVENT]", event.type, event.detail, event);
					}
					event.player = this.player.parent;
					this.dispatcher.dispatchEvent(event);
				};

				/**
				 */
				PluginWrapper.prototype.removeEventListener = function(type, func) {
					this.dispatcher.removeEventListener(type, func);
				};

				/**
				 */
				PluginWrapper.prototype.createElement = function(xml, id, parent) {
					var element;
					element = xml.createElement("element");
					element.setAttribute("id", id);
					if (!(parent != null)) {
						parent = this.getControls(xml).controls;
					}
					if (parent != null) {
						parent.appendChild(element);
					}
					return element;
				};

				/**
				 */
				PluginWrapper.prototype.createProperty = function(xml, key, value, parent) {
					var property, text, val;
					property = xml.createElement("property");
					property.setAttribute("key", key);
					if (parent != null) {
						parent.appendChild(property);
					}
					if (value != null) {
						if (typeof value === "object" && !(value instanceof Array)) {
							for (key in value) {
								val = value[key];
								this.createProperty(xml, key, val, property);
							}
						} else {
							text = XMLUtils.createTextContent(xml, value.toString());
							property.appendChild(text);
						}
					}
					return property;
				};

				/**
				 */
				PluginWrapper.prototype.getControls = function(xml) {
					var controls, element, elements, id, _i, _len;
					elements = xml.getElementsByTagName("element");
					if ((elements != null ? elements.length : void 0) < 1) {
						return null;
					}
					controls = {};
					for (_i = 0, _len = elements.length; _i < _len; _i++) {
						element = elements[_i];
						id = element.getAttribute("id");
						controls[id] = element;
					}
					return controls;
				};

				/**
				 */
				PluginWrapper.prototype.hasControls = function(xml) {
					var _ref;
					return ((_ref = this.getControls(xml)) != null ? _ref.controls : void 0) != null;
				};

				/** @override
				 */
				PluginWrapper.prototype.listNotificationInterests = function() {
					return [FlashNotifications.CREATE_FLASH_VARS, FlashNotifications.CREATE_XML];
				};

				/**
				 */
				PluginWrapper.prototype.handleNotification = function(notification) {
					var body, name;
					name = notification.getName();
					body = notification.getBody();
					switch (name) {
						case FlashNotifications.CREATE_FLASH_VARS:
							if (typeof this.createFlashVars === "function") {
								this.createFlashVars(body.flashvars);
							}
							break;
						case FlashNotifications.CREATE_XML:
							if (typeof this.createXML === "function") {
								this.createXML(body.xml);
							}
					}
				};

				/**
				 * The ControlsPlayCommand class.
				 *
				 * @constructor
				 * @private
				 * @extends {puremvc.SimpleCommand}
				 */
				function ControlsPlayCommand() {
					ControlsPlayCommand.__super__.constructor.call(this);
				}


				__extends(ControlsPlayCommand, puremvc.SimpleCommand);


				/**
				 * Executes the command.
				 *
				 * @param {puremvc.Notification} notification
				 *    The notification.
				 *
				 * @override
				 */
				ControlsPlayCommand.prototype.execute = function(notification) {
					var controls;
					controls = this.facade.retrieveProxy(ControlsProxy.NAME);
					controls.start();
				};

				/**
				 * The ControlsPauseCommand class.
				 *
				 * @constructor
				 * @private
				 * @extends {puremvc.SimpleCommand}
				 */
				function ControlsPauseCommand() {
					ControlsPauseCommand.__super__.constructor.call(this);
				}


				__extends(ControlsPauseCommand, puremvc.SimpleCommand);


				/**
				 * Executes the command.
				 *
				 * @param {puremvc.Notification} notification
				 *    The notification.
				 *
				 * @override
				 */
				ControlsPauseCommand.prototype.execute = function(notification) {
					var controls;
					controls = this.facade.retrieveProxy(ControlsProxy.NAME);
					controls.stop();
				};

				/**
				 * The ControlsActiveStateChangeCommand class.
				 *
				 * @constructor
				 * @private
				 * @extends {puremvc.SimpleCommand}
				 */
				function ControlsActiveStateChangeCommand() {
					ControlsActiveStateChangeCommand.__super__.constructor.call(this);
				}


				__extends(ControlsActiveStateChangeCommand, puremvc.SimpleCommand);


				/**
				 * Executes the command.
				 *
				 * @param {puremvc.Notification} notification
				 *    The notification.
				 *
				 * @override
				 */
				ControlsActiveStateChangeCommand.prototype.execute = function(notification) {
					var app, body, controls;
					controls = this.facade.retrieveProxy(ControlsProxy.NAME);
					app = this.facade.player.retrieveProxy(ApplicationStateProxy.NAME);
					body = notification.getBody();
					if (body.newState === ActiveState.ACTIVE && app.getPlayState() !== PlayState.READY && Utils.getDevice() !== "desktop") {
						controls.start();
					}
				};

				/**
				 * The ControlsAdBreakStartCommand class.
				 *
				 * @constructor
				 * @private
				 * @extends {puremvc.SimpleCommand}
				 */
				function ControlsAdBreakStartCommand() {
					ControlsAdBreakStartCommand.__super__.constructor.call(this);
				}


				__extends(ControlsAdBreakStartCommand, puremvc.SimpleCommand);


				/**
				 * Executes the command.
				 *
				 * @param {puremvc.Notification} notification
				 *    The notification.
				 *
				 * @override
				 */
				ControlsAdBreakStartCommand.prototype.execute = function(notification) {
					this.facade.player.getMediaElement().controls = false;
				};

				/**
				 * The ControlsAdBreakEndCommand class.
				 *
				 * @constructor
				 * @private
				 * @extends {puremvc.SimpleCommand}
				 */
				function ControlsAdBreakEndCommand() {
					ControlsAdBreakEndCommand.__super__.constructor.call(this);
				}


				__extends(ControlsAdBreakEndCommand, puremvc.SimpleCommand);


				/**
				 * Executes the command.
				 *
				 * @param {puremvc.Notification} notification
				 *    The notification.
				 *
				 * @override
				 */
				ControlsAdBreakEndCommand.prototype.execute = function(notification) {
					this.facade.player.getMediaElement().controls = true;
				};

				/**
				 * The ControlsMediaValidatedCommand class.
				 *
				 * @constructor
				 * @private
				 * @extends {puremvc.SimpleCommand}
				 */
				function ControlsMediaValidatedCommand() {
					ControlsMediaValidatedCommand.__super__.constructor.call(this);
				}


				__extends(ControlsMediaValidatedCommand, puremvc.SimpleCommand);


				/**
				 * Executes the command.
				 *
				 * @param {puremvc.Notification} notification
				 *    The notification.
				 *
				 * @override
				 */
				ControlsMediaValidatedCommand.prototype.execute = function(notification) {
					var element, media, src;
					media = notification.getBody();
					src = media.poster;
					element = this.facade.player.getMediaElement();
					if ((src != null) && src !== "") {
						element.poster = src;
					}
					element.src = media.src;
					if (this.facade.player.getAutoplay() !== true) {
						this.facade.applyClickHandler();
					}
				};

				/**
				 * The ControlsStartedCommand class.
				 *
				 * @constructor
				 * @private
				 * @extends {puremvc.SimpleCommand}
				 */
				function ControlsStartedCommand() {
					ControlsStartedCommand.__super__.constructor.call(this);
				}


				__extends(ControlsStartedCommand, puremvc.SimpleCommand);


				/**
				 * Executes the command.
				 *
				 * @param {puremvc.Notification} notification
				 *    The notification.
				 *
				 * @override
				 */
				ControlsStartedCommand.prototype.execute = function(notification) {
					this.facade.applyClickHandler(false);
				};

				/**
				 * The ControlsWrapper class.
				 *
				 * @constructor
				 * @private
				 * @extends {PluginWrapper}
				 * @param   {FlashPlayer}   player  The FlashPlayer
				 * @param   {Object}        config  The plugin config
				 */
				function ControlsWrapper(player, config) {
					ControlsWrapper.__super__.constructor.call(this, player, config);
				}


				__extends(ControlsWrapper, PluginWrapper);


				ControlsWrapper.NAME = "ControlsWrapper";

				ControlsWrapper.prototype.mode = "auto";

				ControlsWrapper.prototype.autoHide = 5;

				/** @override
				 */
				ControlsWrapper.prototype.listNotificationInterests = function() {
					return ControlsWrapper.__super__.listNotificationInterests.apply(this, arguments).concat([Notifications.MEDIUM_CHANGE]);
				};

				/**
				 */
				ControlsWrapper.prototype.handleNotification = function(notification) {
					var body, mode, name;
					ControlsWrapper.__super__.handleNotification.call(this, notification);
					name = notification.getName();
					body = notification.getBody();
					switch (name) {
						case Notifications.MEDIUM_CHANGE:
							mode = /audio/.test(body) ? "persistent" : this.mode;
							this.setMode(mode);
					}
				};

				/** @override
				 */
				ControlsWrapper.prototype.createFlashVars = function(flashvars) {
					if (this.config.mode != null) {
						this.mode = flashvars.controls_mode = this.config.mode;
					}
					return flashvars;
				};

				ControlsWrapper.prototype.createXML = function(xml) {
					var controls, element, elements, view, _i, _len;
					view = xml.getElementsByTagName("view")[0];
					elements = xml.getElementsByTagName("element");
					controls = null;
					for (_i = 0, _len = elements.length; _i < _len; _i++) {
						element = elements[_i];
						if (!(element.getAttribute("id") === "controls")) {
							continue;
						}
						controls = element;
						break;
					}
					if (!(controls != null)) {
						controls = xml.createElement("element");
						controls.setAttribute("id", "controls");
						view.appendChild(controls);
					}
					if (controls.attributes["autoHideDelay"] != null) {
						this.autoHide = controls.getAttribute("autoHideDelay");
					} else {
						if (this.config.autoHide != null) {
							this.autoHide = this.config.autoHide;
							controls.setAttribute("autoHideDelay", this.config.autoHide);
						}
					}
					return xml;
				};

				/**
				 */
				ControlsWrapper.prototype.getMode = function() {
					return this.mode;
				};

				ControlsWrapper.prototype.setMode = function(value) {
					if (value === this.mode) {
						return;
					}
					try {
						this.mode = value;
						this.player.mediaElement.setPlayerProperty("controlsMode", value);
					} catch (error) {
						this.facade.logger.error("[AMP CONTROLS ERROR]", error);
					}
					return value;
				};

				ControlsWrapper.prototype.getAutoHide = function() {
					return this.autoHide;
				};

				/**
				 * @constructor
				 * @private
				 */
				function ControlsProxy(config) {
					ControlsProxy.__super__.constructor.call(this, config);
				}


				__extends(ControlsProxy, ModuleProxy);


				ControlsProxy.NAME = ModuleProxy.NAME;

				ControlsProxy.prototype.defaults = {
					mode: "auto",
					autoHide: 3
				};

				ControlsProxy.prototype.timeout = null;

				ControlsProxy.prototype.appState = null;

				ControlsProxy.prototype.controls = null;

				ControlsProxy.prototype.interactiveElement = null;

				ControlsProxy.prototype.idleUtil = null;

				ControlsProxy.prototype.initializeNotifier = function(key) {
					ControlsProxy.__super__.initializeNotifier.call(this, key);
					this.appState = this.facade.player.retrieveProxy(ApplicationStateProxy.NAME);
					this.controls = this.facade.retrieveMediator(ApplicationStateProxy.NAME);
				};

				ControlsProxy.prototype.onRegister = function() {
					var _this = this;
					ControlsProxy.__super__.onRegister.call(this);
					if (this.config.mode != null) {
						this.changeMode(this.config.mode);
					}
					this.interactiveElement = this.facade.player.retrieveMediator(OverlayLayerMediator.NAME).getViewComponent();
					if (Utils.getDevice() === "desktop") {
						EventHandler.create(this.interactiveElement, "mouseenter", function() {
							_this.stop();
							_this.sendNotification(Notifications.CHANGE_ACTIVE_STATE, ActiveState.ACTIVE);
						});
						EventHandler.create(this.interactiveElement, "mouseleave", function() {
							_this.start();
						});
						this.idleUtil = new IdleUtil(this.facade.player.getViewComponent(), this.data.autoHide * 1000);
						this.idleUtil.addEventListener("activechange", function(event) {
							var state;
							state = event.detail.active !== true ? ActiveState.INACTIVE : ActiveState.ACTIVE;
							_this.sendNotification(Notifications.CHANGE_ACTIVE_STATE, state);
						});
						this.idleUtil.start();
					} else {
						EventHandler.create(this.interactiveElement, EventHandler.CLICK, function() {
							_this.sendNotification(Notifications.TOGGLE_ACTIVE);
						});
					}
				};

				ControlsProxy.prototype.setMode = function(value) {
					if (this.data.mode === value) {
						return value;
					}
					this.changeMode(value);
					return value;
				};

				ControlsProxy.prototype.changeMode = function(value) {
					if (this.data.mode === "auto") {
						this.stop();
					}
					this.facade.sendNotification(Notifications.REMOVE_APPLICATION_STATE, "controls-" + this.data.mode);
					this.data.mode = value;
					this.facade.sendNotification(Notifications.ADD_APPLICATION_STATE, "controls-" + this.data.mode);
				};

				ControlsProxy.prototype.getMode = function() {
					return this.data.mode;
				};

				ControlsProxy.prototype.setAutoHide = function(value) {
					this.data.autoHide = value;
					return value;
				};

				ControlsProxy.prototype.getAutoHide = function() {
					return this.data.autoHide;
				};

				ControlsProxy.prototype.start = function() {
					this.stop();
					if (this.data.mode !== "auto") {
						return;
					}
					this.timeout = setTimeout(this.hide.bind(this), this.data.autoHide * 1000);
				};

				ControlsProxy.prototype.stop = function() {
					clearTimeout(this.timeout);
					this.timeout = null;
				};

				ControlsProxy.prototype.hide = function() {
					if (this.data.mode !== "auto") {
						return;
					}
					if ((this.appState.getIsUserActive() === true || Utils.isMouseOverElement(this.facade.viewComponent)) && this.appState.getDisplayState() !== DisplayState.FULL_SCREEN) {
						this.start();
						return;
					}
					this.facade.sendNotification(Notifications.CHANGE_ACTIVE_STATE, ActiveState.INACTIVE);
				};

				/**
				 * The VolumeMediator class.
				 *
				 * @constructor
				 * @private
				 * @extends {ModuleMediator}
				 * @param {Object} viewComponent
				 */
				function SliderMediator(parent, direction) {
					this.direction = direction != null ? direction : this.direction;
					SliderMediator.__super__.constructor.call(this, null, null, parent);
				}


				__extends(SliderMediator, ComponentMediator);


				SliderMediator.prototype.componentType = "slider";

				SliderMediator.prototype.trackView = null;

				SliderMediator.prototype.handleView = null;

				SliderMediator.prototype.valueView = null;

				SliderMediator.prototype.startCapView = null;

				SliderMediator.prototype.endCapView = null;

				SliderMediator.prototype.min = 0;

				SliderMediator.prototype.max = 1;

				SliderMediator.prototype.value = 0;

				SliderMediator.prototype.dragging = false;

				SliderMediator.prototype.direction = "vertical";

				SliderMediator.prototype.pressHandler = null;

				SliderMediator.prototype.releaseHandler = null;

				SliderMediator.prototype.moveHandler = null;

				SliderMediator.prototype.clickHandler = null;

				/**
				 * @override
				 */
				SliderMediator.prototype.onRegister = function() {
					SliderMediator.__super__.onRegister.call(this);
					this.startCapView = this.create("start-cap");
					this.endCapView = this.create("end-cap");
					this.trackView = this.create("track");
					this.valueView = this.create("value", this.trackView);
					this.handleView = this.create("handle", this.trackView);
					this.pressHandler = EventHandler.create(this.handleView, EventHandler.PRESS, this.handlePressHandler.bind(this));
					this.releaseHandler = EventHandler.create(window, EventHandler.RELEASE, this.handleReleaseHandler.bind(this));
					this.releaseHandler.unbind();
					this.moveHandler = EventHandler.create(window, EventHandler.MOVE, this.updateHandler.bind(this));
					this.moveHandler.unbind();
					this.clickHandler = EventHandler.create(this.trackView, EventHandler.CLICK, this.updateHandler.bind(this));
				};

				/** sets the value
				 */
				SliderMediator.prototype.setDirection = function(value) {
					this.direction = value;
					return value;
				};

				SliderMediator.prototype.getDirection = function() {
					return this.direction;
				};

				/** sets the value
				 */
				SliderMediator.prototype.setValue = function(value) {
					this.updateValue(value);
					return value;
				};

				SliderMediator.prototype.getValue = function() {
					return this.value;
				};

				SliderMediator.prototype.setDragging = function(value) {
					if (value === this.dragging) {
						return;
					}
					this.dragging = value;
					this.sendNotification(Notifications.IS_USER_ACTIVE, this.dragging);
					return this.dragging;
				};

				SliderMediator.prototype.getDragging = function() {
					return this.dragging;
				};

				/** updates the view
				 */
				SliderMediator.prototype.updateValue = function(value) {
					var handle;
					this.value = Utils.clamp(value, this.min, this.max);
					if (this.direction === "vertical") {
						value = "height";
						handle = "bottom";
					} else {
						value = "width";
						handle = "left";
					}
					this.valueView.style[value] = this.handleView.style[handle] = "" + (this.value * 100) + "%";
				};

				/** calculates the value based on mouse/touch point
				 */
				SliderMediator.prototype.calculateValue = function(pos) {
					var offset, slider;
					if (this.getDirection() === "vertical") {
						slider = this.viewComponent.offsetHeight;
						offset = Utils.getElementOffset(this.viewComponent).top + slider;
						pos = -(pos.y - offset);
					} else {
						slider = this.viewComponent.offsetWidth;
						offset = Utils.getElementOffset(this.viewComponent).left;
						pos = pos.x - offset;
					}
					return Utils.clamp(pos / slider, 0, 1);
				};

				SliderMediator.prototype.handlePressHandler = function(event) {
					this.moveHandler.bind();
					this.releaseHandler.bind();
					this.setDragging(true);
					event.stopImmediatePropagation();
					return false;
				};

				SliderMediator.prototype.handleReleaseHandler = function(event) {
					this.moveHandler.unbind();
					this.releaseHandler.unbind();
					this.setDragging(false);
					event.stopImmediatePropagation();
					return false;
				};

				SliderMediator.prototype.updateHandler = function(event) {
					var pos;
					event.stopImmediatePropagation();
					pos = {
						x: event.clientX || event.targetTouches[0].screenX,
						y: event.clientY || event.targetTouches[0].screenY
					};
					this.setValue(this.calculateValue(pos));
					return false;
				};

				/**
				 * @enum {string}
				 * @const
				 * @private
				 */

				var PanelNotifications = {
					ADD_PANEL: "addPanel",
					REMOVE_PANEL: "removePanel",
					OPEN_PANEL: "openPanel",
					CLOSE_PANEL: "closePanel",
					TOGGLE_PANEL: "togglePanel",
					CLOSE_ALL_PANELS: "closeAllPanels"
				};

				/**
				 * The TimeDisplayMediator class.
				 *
				 * @constructor
				 * @private
				 * @extends {LocalizedMediator}
				 * @param {Object} viewComponent
				 */
				function TimeDisplayMediator(parent) {
					TimeDisplayMediator.__super__.constructor.call(this, null, null, parent);
				}


				__extends(TimeDisplayMediator, ComponentMediator);


				/**
				 * The name of the this Mediator.
				 *
				 * @static
				 * @type {string}
				 */
				TimeDisplayMediator.prototype.componentName = "time-display";

				TimeDisplayMediator.prototype.duration = null;

				TimeDisplayMediator.prototype.currentTimeDisplay = null;

				TimeDisplayMediator.prototype.separatorDisplay = null;

				TimeDisplayMediator.prototype.durationDisplay = null;

				TimeDisplayMediator.prototype.liveDisplay = null;

				/**
				 * @override
				 */
				TimeDisplayMediator.prototype.onRegister = function() {
					TimeDisplayMediator.__super__.onRegister.call(this);
					this.liveDisplay = this.createText("live-display", this.localizationManager.getString(LocalizationConstants.MSG_LIVE));
					this.currentTimeDisplay = this.createText("current-time-display", "00:00", this, "span");
					this.separatorDisplay = this.createText("separator-display", this.localizationManager.getString(LocalizationConstants.MSG_TIME_SEPARATOR), this, "span");
					this.durationDisplay = this.createText("duration-display", "00:00", this, "span");
				};

				/**
				 * @override
				 */
				TimeDisplayMediator.prototype.listNotificationInterests = function() {
					return [Notifications.PLAY, Notifications.DURATION_CHANGE, Notifications.ENDED, Notifications.DISPLAY_TIME];
				};

				/**
				 * @override
				 */
				TimeDisplayMediator.prototype.handleNotification = function(notification) {
					var body, name;
					name = notification.getName();
					body = notification.getBody();
					switch (name) {
						case Notifications.PLAY:
							this.updateDuration();
							break;
						case Notifications.DURATION_CHANGE:
							this.duration = body;
							this.updateCurrentTime();
							this.updateDuration();
							break;
						case Notifications.ENDED:
							this.updateCurrentTime(this.duration);
							this.updateDuration();
							break;
						case Notifications.DISPLAY_TIME:
							this.updateCurrentTime(body.currentTime, body.duration);
							this.updateDuration(body.duration);
					}
				};

				TimeDisplayMediator.prototype.updateCurrentTime = function(currentTime, duration) {
					if (currentTime == null) {
						currentTime = this.currentTime;
					}
					if (duration == null) {
						duration = this.duration;
					}
					this.currentTimeDisplay.textContent = Utils.formatTimecode(currentTime, duration);
				};

				TimeDisplayMediator.prototype.updateDuration = function(duration) {
					if (duration == null) {
						duration = this.duration;
					}
					this.durationDisplay.textContent = Utils.formatTimecode(duration);
				};

				/**
				 * The PanelsMediator class.
				 *
				 * @constructor
				 * @private
				 * @extends {LayerMediator}
				 */
				function PanelsMediator(parent) {
					this.panels = [];
					this.closeHandler = this.mouseupHandler.bind(this);
					PanelsMediator.__super__.constructor.call(this, null, null, parent);
				}


				__extends(PanelsMediator, ComponentMediator);


				PanelsMediator.prototype.componentName = "panels";

				PanelsMediator.prototype.activePanel = null;

				PanelsMediator.prototype.panels = null;

				PanelsMediator.prototype.closeHandler = null;

				/**
				 * @override
				 */
				PanelsMediator.prototype.listNotificationInterests = function() {
					var key, value;
					return ((function() {
						var _results;
						_results = [];
						for (key in PanelNotifications) {
							value = PanelNotifications[key];
							_results.push(value);
						}
						return _results;
					})()).concat([]);
				};

				/**
				 * @override
				 */
				PanelsMediator.prototype.handleNotification = function(notification) {
					var body, name;
					name = notification.getName();
					body = notification.getBody();
					switch (name) {
						case PanelNotifications.ADD_PANEL:
							this.addPanel(body);
							break;
						case PanelNotifications.REMOVE_PANEL:
							this.removePanel(body);
							break;
						case PanelNotifications.OPEN_PANEL:
							this.openPanel(body);
							break;
						case PanelNotifications.CLOSE_PANEL:
							this.closePanel(body);
							break;
						case PanelNotifications.CLOSE_ALL_PANELS:
							this.closeAllPanels(body);
							break;
						case PanelNotifications.TOGGLE_PANEL:
							this.togglePanel(body);
					}
				};

				PanelsMediator.prototype.addPanel = function(panel) {
					this.panels.push(panel);
					this.viewComponent.appendChild(panel.getViewComponent());
				};

				PanelsMediator.prototype.removePanel = function(panel) {
					this.panels.splice(this.panels.indexOf(panel), 1);
					this.viewComponent.removeChild(panel.getViewComponent());
				};

				PanelsMediator.prototype.openPanel = function(panel) {
					if (panel === this.activePanel || !(panel != null)) {
						return;
					}
					this.closeAllPanels();
					this.activePanel = panel;
					this.activePanel.classList.add("active");
					if (Utils.getDevice() !== "desktop") {
						this.sendNotification(Notifications.IS_USER_ACTIVE, true);
					}
					document.addEventListener("mouseup", this.closeHandler);
				};

				PanelsMediator.prototype.closePanel = function(panel) {
					panel.classList.remove("active");
					if (this.activePanel != null) {
						this.activePanel = null;
						if (Utils.getDevice() !== "desktop") {
							this.sendNotification(Notifications.IS_USER_ACTIVE, false);
						}
						document.removeEventListener("mouseup", this.closeHandler);
					}
				};

				PanelsMediator.prototype.togglePanel = function(panel) {
					if (panel === this.activePanel) {
						this.closePanel(panel);
					} else {
						this.openPanel(panel);
					}
				};

				PanelsMediator.prototype.closeAllPanels = function() {
					var panel, _i, _len, _ref;
					_ref = this.panels;
					for (_i = 0, _len = _ref.length; _i < _len; _i++) {
						panel = _ref[_i];
						this.closePanel(panel);
					}
				};

				PanelsMediator.prototype.mouseupHandler = function(event) {
					var button, element, panel;
					element = document.elementFromPoint(event.clientX, event.clientY);
					panel = this.activePanel.getViewComponent();
					button = this.activePanel.control.getViewComponent();
					if (element !== panel && panel.contains(element) === false && element !== button && button.contains(element) === false) {
						this.closeAllPanels();
					}
				};

				/**
				 * The ProgressMediator class.
				 *
				 * @constructor
				 * @private
				 * @extends {ModuleMediator}
				 * @param {Object} viewComponent
				 */
				function ProgressMediator(parent) {
					ProgressMediator.__super__.constructor.call(this, parent, "horizontal");
				}


				__extends(ProgressMediator, SliderMediator);


				/**
				 * The name of the this Mediator.
				 *
				 * @static
				 * @type {string}
				 */
				ProgressMediator.prototype.componentName = "progress";

				ProgressMediator.prototype.bufferValue = null;

				ProgressMediator.prototype.scrubTime = null;

				ProgressMediator.prototype.scrubTimeSeparator = null;

				ProgressMediator.prototype.cuePoints = null;

				ProgressMediator.prototype.duration = 0;

				ProgressMediator.prototype.isLive = false;

				ProgressMediator.prototype.previewData = {
					src: null,
					previewWidth: null,
					previewHeight: null,
					imgWidth: null,
					imgHeight: null,
					count: null
				};

				/**
				 * @override
				 */
				ProgressMediator.prototype.onRegister = function() {
					ProgressMediator.__super__.onRegister.call(this);
					this.bufferValue = this.create("buffer-value", false);
					this.trackView.insertBefore(this.bufferValue, this.trackView.lastChild);
					this.cuePoints = this.create("cue-points", this.trackView);
					this.scrubTimeSeparator = this.create("scrub-time-separator", this.trackView);
					this.scrubTime = this.create("scrub-time", this.trackView);
					this.thumbPreview = this.create("thumb-preview");
				};

				/**
				 * @override
				 */
				ProgressMediator.prototype.listNotificationInterests = function() {
					return [Notifications.ENDED, Notifications.MEDIA_CHANGE, Notifications.DURATION_CHANGE, Notifications.PROGRESS, Notifications.ADD_CUE_POINTS, Notifications.REMOVE_CUE_POINTS, Notifications.DISPLAY_TIME];
				};

				/**
				 * @override
				 */
				ProgressMediator.prototype.handleNotification = function(notification) {
					var body, cue, cuePoint, cues, name, value, _i, _len, _ref, _ref1;
					name = notification.getName();
					body = notification.getBody();
					switch (name) {
						case Notifications.MEDIA_CHANGE:
							this.isLive = body.temporalType === "live";
							this.updateValue(0);
							this.bufferValue.style.width = "0%";
							this.updatePreview(body.metadata);
							break;
						case Notifications.PROGRESS:
							value = Utils.clamp(body / this.duration * 100, 0, 100);
							this.bufferValue.style.width = value + "%";
							break;
						case Notifications.DURATION_CHANGE:
							this.duration = body;
							break;
						case Notifications.ENDED:
							this.updateValue(1.0);
							break;
						case Notifications.ADD_CUE_POINTS:
							if (((_ref = this.facade.player.config) != null ? (_ref1 = _ref.controls) != null ? _ref1.displaySceneMarkers : void 0 : void 0) != null) {
								if (this.facade.player.config.controls.displaySceneMarkers === false) {
									return;
								}
							}
							this.removeCuePoints();
							cues = body;
							for (_i = 0, _len = cues.length; _i < _len; _i++) {
								cue = cues[_i];
								if (!(cue !== 0 && cue !== -1)) {
									continue;
								}
								cuePoint = this.create("cue-point", this.cuePoints);
								cuePoint.style.left = (cue / this.duration * 100) + "%";
							}
							break;
						case Notifications.REMOVE_CUE_POINTS:
							this.removeCuePoints();
							break;
						case Notifications.DISPLAY_TIME:
							this.updateValue(body.currentTime / body.duration, body.duration);
					}
				};

				ProgressMediator.prototype.updatePreview = function(metadata) {
					var img,
						_this = this;
					this.previewData.src = metadata.previewThumbnailSrc;
					this.previewData.previewHeight = metadata.previewThumbnailHeight;
					this.previewData.previewWidth = metadata.previewThumbnailWidth;
					this.previewData.count = metadata.previewThumbnailCount;
					img = new Image();
					if (this.previewData.src) {
						img.src = this.previewData.src;
					}
					EventHandler.create(img, "load", function(event) {
						event.stopImmediatePropagation();
						_this.previewData.imgWidth = event.target.width;
						_this.previewData.imgHeight = event.target.height;
						return false;
					});
					if (this.previewData.src) {
						this.thumbPreview.style.backgroundImage = "url(" + this.previewData.src + ")";
					}
					this.thumbPreview.style.width = this.previewData.previewWidth + "px";
					this.thumbPreview.style.height = this.previewData.previewHeight + "px";
				};

				ProgressMediator.prototype.removeCuePoints = function() {
					if (!(this.cuePoints != null)) {
						return;
					}
					this.cuePoints.innerHTML = "";
				};

				/** sets the value
				 */
				ProgressMediator.prototype.setValue = function(value) {
					ProgressMediator.__super__.setValue.call(this, value);
					this.sendNotification(UserNotifications.SEEK, value * this.facade.player.retrieveProxy(MediaProxy.NAME).getDuration());
				};

				/** updates the view
				 */
				ProgressMediator.prototype.updateValue = function(percent, duration) {
					if (duration == null) {
						duration = this.duration;
					}
					if (this.isLive === true) {
						percent = 1;
					}
					if (isNaN(percent) === true) {
						percent = 0;
					}
					ProgressMediator.__super__.updateValue.call(this, percent);
					if (this.getDragging() === true) {
						this.scrubTime.textContent = Utils.formatTimecode(this.value * duration);
					}
					this.scrubTime.style.left = this.scrubTimeSeparator.style.left = "" + ((this.value * 100).toFixed(2)) + "%";
					this.previewInterval = this.duration / this.previewData.count;
					this.previewImgIndex = Math.floor(this.value * duration / this.previewInterval);
					this.previewRow = Math.floor((this.previewImgIndex * this.previewData.previewWidth) / this.previewData.imgWidth);
					this.xpos = "-" + this.previewData.previewWidth * this.previewImgIndex + "px ";
					this.ypos = "-" + this.previewData.previewHeight * this.previewRow.toFixed(0) + "px ";
					this.thumbPreview.style.backgroundPosition = this.xpos + this.ypos;
					this.thumbPreview.style.left = "" + (((this.value * 100) - 18).toFixed(2)) + "%";
				};

				ProgressMediator.prototype.handlePressHandler = function(event) {
					ProgressMediator.__super__.handlePressHandler.call(this, event);
					this.classList.add("scrubbing");
				};

				ProgressMediator.prototype.handleReleaseHandler = function(event) {
					ProgressMediator.__super__.handleReleaseHandler.call(this, event);
					this.classList.remove("scrubbing");
				};

				/**
				 * The PlayPauseMediator class.
				 *
				 * @constructor
				 * @private
				 * @extends {ButtonMediator}
				 */
				function PlayPauseMediator(parent) {
					PlayPauseMediator.__super__.constructor.call(this, null, parent);
				}


				__extends(PlayPauseMediator, ButtonMediator);


				PlayPauseMediator.prototype.componentName = "play-pause";

				PlayPauseMediator.prototype.onclick = function(event) {
					event.stopImmediatePropagation();
					event.preventDefault();
					this.sendNotification(UserNotifications.TOGGLE_PLAY_PAUSE);
					return false;
				};

				/**
				 * @enum {string}
				 * @const
				 * @private
				 */

				var AdNotifications = {
					BREAK_START: "adsbreakstart",
					BREAK_END: "adsbreakend",
					AD_CONTAINER_CREATED: "adscontainercreated",
					AD_LOADED: "adsloaded",
					AD_STARTED: "adsstarted",
					AD_TIME_UPDATE: "adstimeupdate",
					AD_TIME_REMAINING: "adstimeremaining",
					AD_DURATION_CHANGE: "adsdurationchange",
					AD_ENDED: "adsended",
					AD_ERROR: "adserror",
					AD_PLAY: "adsplay",
					AD_PAUSE: "adspause",
					AD_PAUSED: "adspaused",
					AD_RESUME: "adsresume",
					AD_COMPANION: "adscompanion",
					FIRST_QUARTILE: "adsfirstquartile",
					MIDPOINT: "adsmidpoint",
					THIRD_QUARTILE: "adsthirdquartile",
					LOG: "adslog",
					REQUEST: "adsrequest"
				};

				/**
				 * The ControlsMediator class.
				 *
				 * @constructor
				 * @private
				 * @extends {LayerMediator}
				 */
				function ControlsMediator() {
					ControlsMediator.__super__.constructor.call(this);
				}


				__extends(ControlsMediator, LayerMediator);


				ControlsMediator.prototype.componentName = "controls";

				ControlsMediator.prototype.activeControlPanel = null;

				ControlsMediator.prototype.controlBar = null;

				ControlsMediator.prototype.panels = null;

				/**
				 * @override
				 */
				ControlsMediator.prototype.onRegister = function() {
					var separator;
					ControlsMediator.__super__.onRegister.call(this);
					this.facade.viewComponent = this.viewComponent;
					this.controlBar = this.create("control-bar");
					this.facade.registerMediator(new PanelsMediator(this.viewComponent));
					this.facade.registerMediator(new PlayPauseMediator(this.controlBar));
					this.facade.registerMediator(new TimeDisplayMediator(this.controlBar));
					this.facade.registerMediator(new ProgressMediator(this.controlBar));
					separator = this.create("separator", this.controlBar);
				};

				/**
				 * @override
				 */
				ControlsMediator.prototype.listNotificationInterests = function() {
					return [Notifications.READY, Notifications.ADD_CONTROL, Notifications.REMOVE_CONTROL, Notifications.ADD_CONTROL_STATE, Notifications.REMOVE_CONTROL_STATE];
				};

				/**
				 * @override
				 */
				ControlsMediator.prototype.handleNotification = function(notification) {
					var body, name, _ref;
					name = notification.getName();
					body = notification.getBody();
					switch (name) {
						case Notifications.READY:
							if (((_ref = body.fullscreen) != null ? _ref.enabled : void 0) !== false) {
								this.facade.registerMediator(new FullScreenMediator(this.controlBar));
							}
							break;
						case Notifications.ADD_CONTROL_STATE:
							this.classList.add(body);
							break;
						case Notifications.REMOVE_CONTROL_STATE:
							this.classList.remove(body);
							break;
						case Notifications.ADD_CONTROL:
							this.controlBar.appendChild(body);
							break;
						case Notifications.REMOVE_CONTROL:
							this.controlBar.removeChild(body);
					}
				};

				/**
				 * @constructor
				 */
				function AMP() {}

				/**
				 * The base wrapper class for all AMP players.
				 *
				 * @param {string|HTMLElement} container
				 *    The id of the div the player will be attached to.
				 *
				 * @param {?(Object|string)} config
				 *    The configuration override object.
				 *
				 * @param {?Function} onready
				 *    Optional ready handler.
				 */
				AMP.create = function(container, config, onready) {
					var debug, player, version;
					if (typeof container === "string") {
						container = document.getElementById(container);
					}
					if (!(container != null)) {
						throw new Error("[AMP ERROR] Invalid container.");
					}
					debug = (config != null ? config.debug : void 0) != null ? config.debug : /amp\-debug\=true/.test(location.search.toLowerCase());
					Logger.enable(debug);
					if ((AMP.defaults.data != null)) {
						config = Utils.override(AMP.defaults.data, config);
					}
					version = this.getVersion();
					config.mode = Utils.getPlaybackMode(config.mode);
					if (config.version == null) {
						config.version = version;
					}
					if (container.dataset == null) {
						container.dataset = {};
					}
					container.dataset["amp.version"] = version;
					Logger.log("[AMP]", version);
					switch (config.mode) {
						case "html":
							player = new HTMLPlayer(container);
							break;
						case "flash":
							player = new FlashPlayer(container);
							break;
						case "external":
							player = new ExternalPlayer(container);
							break;
						case "none":
							player = new InstallPlayer(container);
					}
					player.onready = onready;
					player.initialize(config);
					container.amp = player;
					return player;
				};

				/**
				 * Returns the version string for this player library.
				 *
				 * @return {string} The version string.
				 */
				AMP.getVersion = function() {
					return this.VERSION;
				};

				/**
				 * The player version string
				 *
				 * @type {string}
				 * @private
				 * @static
				 */
				AMP.VERSION = 'AMP Premier v2.20.0.0005';

				/** @private
				 */
				AMP.defaults = new AMPConfig();

				/** @private
				 */
				AMP.plugins = [];

				/** @static
				 */
				AMP.loadDefaults = function(url, loaded, error, withCredentials) {
					if (withCredentials == null) {
						withCredentials = false;
					}
					if (loaded != null) {
						this.defaults.addEventListener("load", loaded);
					}
					if (error != null) {
						this.defaults.addEventListener("error", error);
					}
					this.defaults.load(url, withCredentials);
				};

				/** @static
				 */
				AMP.getPlaybackMode = function() {
					return Utils.getPlaybackMode();
				};

				/** @static
				 */
				AMP.registerPlugin = function(id, mode, plugin) {
					var _base;
					if ((_base = this.plugins)[id] == null) {
						_base[id] = {};
					}
					this.plugins[id][mode] = plugin;
				};

				/**
				 * @type {akamai.amp.ResourceManager}
				 * @private
				 */
				AMP.resourceManager = null;

				/**
				 * Short cut getter for the global renderer manager
				 */
				AMP.getResourceManager = function() {
					if (!(this.resourceManager != null)) {
						this.resourceManager = new ResourceManager();
					}
					return this.resourceManager;
				};

				/**
				 * @param {akamai.amp.Resource} resource
				 *    The resource definition
				 *
				 * @param {Function} callback
				 */
				AMP.addResource = function(resource, callback) {
					return this.getResourceManager().add(resource, callback);
				};

				/**
				 * @param {Array.<akamai.amp.Resource>} resources
				 *    The resource definition
				 *
				 * @param {Function} callback
				 */
				AMP.addResources = function(resources, callback) {
					return this.getResourceManager().addResources(resources, callback);
				};

				/**
				 * @param {!string} key
				 *     The resource's key
				 *
				 * @return {akamai.amp.Resource}
				 *     The resource definition
				 */
				AMP.getResource = function(key) {
					return this.getResourceManager().item(key);
				};

				/**
				 * @param {!string} key
				 *     The resource's key
				 *
				 * @return {Function}
				 *     The resource's constructor
				 */
				AMP.removeResource = function(key) {
					return this.getResourceManager().remove(key);
				};

				function PlayOverlayWrapper() {
					return PlayOverlayWrapper.__super__.constructor.apply(this, arguments);
				}


				__extends(PlayOverlayWrapper, PluginWrapper);


				PlayOverlayWrapper.NAME = "PlayOverlayWrapper";

				/**
				 */
				PlayOverlayWrapper.prototype.createFlashVars = function(flashvars) {
					flashvars.show_play_button_overlay = this.config.enabled != null ? this.config.enabled : true;
					return flashvars;
				};


				AMP.registerPlugin("playoverlay", "flash", PlayOverlayWrapper);

				/**
				 * @constructor
				 * @private
				 */
				function PlayOverlayMediator() {
					PlayOverlayMediator.__super__.constructor.call(this);
				}


				__extends(PlayOverlayMediator, OverlayMediator);


				PlayOverlayMediator.prototype.componentName = "play";

				PlayOverlayMediator.prototype.onclick = function(event) {
					event.stopImmediatePropagation();
					event.preventDefault();
					this.sendNotification(UserNotifications.TOGGLE_PLAY_PAUSE);
					return false;
				};

				/**
				 * The ControlsPlugin class.
				 *
				 * @param {Module}  app     The parent module of this plugin.
				 * @constructor
				 * @private
				 * @extends {Plugin}
				 */
				function ControlsPlugin() {
					ControlsPlugin.__super__.constructor.call(this);
				}


				__extends(ControlsPlugin, Plugin);


				ControlsPlugin.prototype.moduleName = "controls";

				/** @override
				 */
				ControlsPlugin.prototype.createFramework = function() {
					if (this.config["native"] === true) {
						this.player.getMediaElement().controls = true;
						this.player.sendNotification(Notifications.ADD_APPLICATION_STATE, "controls-native");
						this.registerCommand(Notifications.MEDIA_VALIDATED, ControlsMediaValidatedCommand);
						this.registerCommand(AdNotifications.BREAK_START, ControlsAdBreakStartCommand);
						this.registerCommand(AdNotifications.BREAK_END, ControlsAdBreakEndCommand);
						this.registerCommand(Notifications.STARTED, ControlsStartedCommand);
						this.createView = function() {};
						return;
					} else {
						ControlsPlugin.__super__.createFramework.call(this);
					}
				};

				/**
				 */
				ControlsPlugin.prototype.applyClickHandler = function(apply) {
					if (apply == null) {
						apply = true;
					}
					this.player.getMediaElement().onclick = apply ? this.clickHandler.bind(this) : null;
				};

				/**
				 */
				ControlsPlugin.prototype.clickHandler = function(event) {
					this.sendNotification(UserNotifications.TOGGLE_PLAY_PAUSE, true);
				};

				/** @override
				 */
				ControlsPlugin.prototype.createController = function() {
					this.registerCommand(Notifications.PLAY, ControlsPlayCommand);
					this.registerCommand(Notifications.PAUSE, ControlsPauseCommand);
					this.registerCommand(Notifications.ACTIVE_STATE_CHANGE, ControlsActiveStateChangeCommand);
				};

				/** @override
				 */
				ControlsPlugin.prototype.createModel = function() {
					this.proxy = new ControlsProxy(this.config);
					this.registerProxy(this.proxy);
				};

				/** @override
				 */
				ControlsPlugin.prototype.createView = function() {
					this.registerMediator(new ControlsMediator());
				};

				/**
				 */
				ControlsPlugin.prototype.listNotificationInterests = function() {
					var key, value;
					return ((function() {
						var _results;
						_results = [];
						for (key in PanelNotifications) {
							value = PanelNotifications[key];
							_results.push(value);
						}
						return _results;
					})()).concat([Notifications.MEDIA_CHANGE, Notifications.TIME_UPDATE, Notifications.DURATION_CHANGE, Notifications.PROGRESS, Notifications.ENDED, Notifications.ADD_CUE_POINTS, Notifications.REMOVE_CUE_POINTS, Notifications.DISABLE_FULL_SCREEN, Notifications.ENABLE_FULL_SCREEN, Notifications.READY, Notifications.ADD_CONTROL, Notifications.REMOVE_CONTROL, Notifications.ADD_CONTROL_STATE, Notifications.REMOVE_CONTROL_STATE, Notifications.ACTIVE_STATE_CHANGE, Notifications.PLAY, Notifications.PAUSE, AdNotifications.BREAK_START, AdNotifications.BREAK_END, Notifications.CHANGE_MEDIA, Notifications.DISPLAY_TIME, Notifications.MEDIA_VALIDATED, Notifications.STARTED]);
				};

				/**
				 */
				ControlsPlugin.prototype.listNotificationPublications = function() {
					return ControlsPlugin.__super__.listNotificationPublications.call(this).concat([Notifications.CHANGE_ACTIVE_STATE, Notifications.TOGGLE_FULL_SCREEN, UserNotifications.SEEK, Notifications.TOGGLE_ACTIVE, UserNotifications.TOGGLE_PLAY_PAUSE]);
				};

				/**
				 * @param {string} value The contorls mode.
				 * @expose
				 */
				ControlsPlugin.prototype.setMode = function(value) {
					this.proxy.setMode(value);
					return value;
				};

				/**
				 * @return {string} The controls mode.
				 * @expose
				 */
				ControlsPlugin.prototype.getMode = function() {
					return this.proxy.getMode();
				};

				/**
				 * @param {boolean} value The autohide flag.
				 * @expose
				 */
				ControlsPlugin.prototype.setAutoHide = function(value) {
					this.proxy.setAutoHide(value);
					return value;
				};

				/**
				 * @return {boolean} The autohide flag.
				 * @expose
				 */
				ControlsPlugin.prototype.getAutoHide = function() {
					return this.proxy.getAutoHide();
				};


				AMP.registerPlugin("controls", "html", ControlsPlugin);
				AMP.registerPlugin("controls", "flash", ControlsWrapper);
				AMP.registerPlugin("controls", "external", ControlsPlugin);

				/**
				 * The PlayerCommand class. Base class for commands that need access
				 * to the application state or the media
				 *
				 * @constructor
				 * @private
				 * @extends {puremvc.SimpleCommand}
				 */
				function PlayerCommand() {
					PlayerCommand.__super__.constructor.call(this);
				}


				__extends(PlayerCommand, puremvc.SimpleCommand);


				PlayerCommand.prototype.applicationState = null;

				PlayerCommand.prototype.media = null;

				PlayerCommand.prototype.player = null;

				/** @override
				 */
				PlayerCommand.prototype.initializeNotifier = function(key) {
					var target;
					PlayerCommand.__super__.initializeNotifier.call(this, key);
					target = this.facade.player || this.facade;
					this.applicationState = target.retrieveProxy(ApplicationStateProxy.NAME);
					this.media = target.retrieveProxy(MediaProxy.NAME);
					this.player = target;
				};

				/**
				 * The AdContentEndedCommand class.
				 *
				 * @constructor
				 * @private
				 * @extends {puremvc.SimpleCommand}
				 */
				function AdCommand() {
					AdCommand.__super__.constructor.call(this);
				}


				__extends(AdCommand, PlayerCommand);


				AdCommand.prototype.ads = null;

				/** @override
				 */
				AdCommand.prototype.initializeNotifier = function(key) {
					AdCommand.__super__.initializeNotifier.call(this, key);
					this.ads = this.facade.retrieveProxy(ModuleProxy.NAME);
				};

				/**
				 * The AdStartCommand class.
				 *
				 * @constructor
				 * @private
				 * @extends {puremvc.MacroCommand}
				 */
				function AdStartCommand() {
					AdStartCommand.__super__.constructor.call(this);
				}


				__extends(AdStartCommand, puremvc.MacroCommand);


				AdStartCommand.prototype.ads = null;

				/** @override
				 */
				AdStartCommand.prototype.initializeNotifier = function(key) {
					AdStartCommand.__super__.initializeNotifier.call(this, key);
					this.ads = this.facade.retrieveProxy(AdProxy.NAME);
				};

				/** @override
				 */
				AdStartCommand.prototype.initializeMacroCommand = function() {
					this.addSubCommand(PlayRequestCommand);
				};

				/**
				 * Executes the command.
				 *
				 * @param {puremvc.Notification} notification
				 *    The notification.
				 *
				 * @override
				 */
				AdStartCommand.prototype.execute = function(notification) {
					var playback;
					AdStartCommand.__super__.execute.call(this, notification);
					playback = this.facade.player.retrieveProxy(PlaybackProxy.NAME);
					if (playback.initialized === false) {
						this.facade.player.sendNotification(Notifications.INITIALIZED);
					}
					this.ads.start();
					this.facade.player.sendNotification(Notifications.CHANGE_PLAY_STATE, PlayState.PLAYING);
				};

				/**
				 * @constructor
				 * @private
				 * @extends {puremvc.SimpleCommand}
				 */
				function PluginCommand() {
					PluginCommand.__super__.constructor.call(this);
				}


				__extends(PluginCommand, puremvc.SimpleCommand);


				PluginCommand.prototype.config = null;

				PluginCommand.prototype.plugin = null;

				/** @override
				 */
				PluginCommand.prototype.initializeNotifier = function(key) {
					PluginCommand.__super__.initializeNotifier.call(this, key);
					return this.config = this.plugin = this.facade.retrieveProxy(ModuleProxy.NAME);
				};

				/**
				 * The MediaAnalyticsAdBreakStartCommand class.
				 *
				 * @constructor
				 * @private
				 * @extends {puremvc.SimpleCommand}
				 */
				function MediaAnalyticsAdBreakStartCommand() {
					MediaAnalyticsAdBreakStartCommand.__super__.constructor.call(this);
				}


				__extends(MediaAnalyticsAdBreakStartCommand, puremvc.SimpleCommand);


				/**
				 * Executes the command.
				 *
				 * @param {puremvc.Notification} notification
				 *    The notification.
				 *
				 * @override
				 */
				MediaAnalyticsAdBreakStartCommand.prototype.execute = function(notification) {
					this.facade.player.getMediaElement().dataset.isad = true;
				};

				/**
				 * The MediaAnalyticsAdBreakEndCommand class.
				 *
				 * @constructor
				 * @private
				 * @extends {puremvc.SimpleCommand}
				 */
				function MediaAnalyticsAdBreakEndCommand() {
					MediaAnalyticsAdBreakEndCommand.__super__.constructor.call(this);
				}


				__extends(MediaAnalyticsAdBreakEndCommand, puremvc.SimpleCommand);


				/**
				 * Executes the command.
				 *
				 * @param {puremvc.Notification} notification
				 *    The notification.
				 *
				 * @override
				 */
				MediaAnalyticsAdBreakEndCommand.prototype.execute = function(notification) {
					this.facade.player.getMediaElement().dataset.isad = false;
				};

				/**
				 * The MediaAnalyticsAdLoadedCommand class.
				 *
				 * @constructor
				 * @private
				 * @extends {puremvc.SimpleCommand}
				 */
				function MediaAnalyticsAdLoadedCommand() {
					MediaAnalyticsAdLoadedCommand.__super__.constructor.call(this);
				}


				__extends(MediaAnalyticsAdLoadedCommand, puremvc.SimpleCommand);


				/**
				 * Executes the command.
				 *
				 * @param {puremvc.Notification} notification
				 *    The notification.
				 *
				 * @override
				 */
				MediaAnalyticsAdLoadedCommand.prototype.execute = function(notification) {
					var adObject, adVO;
					try {
						adVO = notification.getBody();
						adObject = {
							adDuration: adVO.duration,
							adPartnerId: adVO.partner,
							adTitle: adVO.title,
							adId: adVO.id
						};
						if (typeof akamaiHandleAdLoaded === "function") {
							akamaiHandleAdLoaded(adObject);
						}
					} catch (error) {
						this.facade.logger.error("[AMP MEDIA ANALYTICS ERROR]", error);
					}
				};

				/**
				 * The MediaAnalyticsAdStartCommand class.
				 *
				 * @constructor
				 * @private
				 * @extends {puremvc.SimpleCommand}
				 */
				function MediaAnalyticsAdStartCommand() {
					MediaAnalyticsAdStartCommand.__super__.constructor.call(this);
				}


				__extends(MediaAnalyticsAdStartCommand, PluginCommand);


				/**
				 * Executes the command.
				 *
				 * @param {puremvc.Notification} notification
				 *    The notification.
				 *
				 * @override
				 */
				MediaAnalyticsAdStartCommand.prototype.execute = function(notification) {
					try {
						if (typeof akamaiHandleAdStarted === "function") {
							akamaiHandleAdStarted();
						}
					} catch (error) {
						this.facade.logger.error("[AMP MEDIA ANALYTICS ERROR]", error);
					}
				};

				/**
				 * The MediaAnalyticsTimeUpdateCommand class.
				 *
				 * @constructor
				 * @private
				 * @extends {puremvc.SimpleCommand}
				 */
				function MediaAnalyticsAdTimeUpdateCommand() {
					MediaAnalyticsAdTimeUpdateCommand.__super__.constructor.call(this);
				}


				__extends(MediaAnalyticsAdTimeUpdateCommand, PluginCommand);


				/**
				 * Executes the command.
				 *
				 * @param {puremvc.Notification} notification
				 *    The notification.
				 *
				 * @override
				 */
				MediaAnalyticsAdTimeUpdateCommand.prototype.execute = function(notification) {
					var core, percent;
					core = notification.getBody();
					percent = Math.round(core.currentTime / core.duration * 100);
					try {
						if (percent >= 25 && this.config.percent < 25) {
							this.facade.logger.debug("MediaAnalytics: First Quartile");
							if (typeof akamaiHandleAdFirstQuartile === "function") {
								akamaiHandleAdFirstQuartile();
							}
						} else if (percent >= 50 && this.config.percent < 50) {
							this.facade.logger.debug("MediaAnalytics: Second Quartile");
							if (typeof akamaiHandleAdMidpoint === "function") {
								akamaiHandleAdMidpoint();
							}
						} else if (percent >= 75 && this.config.percent < 75) {
							this.facade.logger.debug("MediaAnalytics: Third Quartile");
							if (typeof akamaiHandleAdThirdQuartile === "function") {
								akamaiHandleAdThirdQuartile();
							}
						}
					} catch (error) {
						this.facade.logger.error("[AMP MEDIA ANALYTICS ERROR]", error);
					}
					this.config.percent = percent;
				};

				/**
				 * The MediaAnalyticsAdEndCommand class.
				 *
				 * @constructor
				 * @private
				 * @extends {puremvc.SimpleCommand}
				 */
				function MediaAnalyticsAdEndCommand() {
					MediaAnalyticsAdEndCommand.__super__.constructor.call(this);
				}


				__extends(MediaAnalyticsAdEndCommand, puremvc.SimpleCommand);


				/**
				 * Executes the command.
				 *
				 * @param {puremvc.Notification} notification
				 *    The notification.
				 *
				 * @override
				 */
				MediaAnalyticsAdEndCommand.prototype.execute = function(notification) {
					try {
						if (typeof akamaiHandleAdCompleted === "function") {
							akamaiHandleAdCompleted();
						}
					} catch (error) {
						this.facade.logger.error("[AMP MEDIA ANALYTICS ERROR]", error);
					}
					this.facade.player.getMediaElement().dataset.isad = true;
				};

				/**
				 * The MediaAnalyticsSetDimensionsCommand class.
				 *
				 * @constructor
				 * @private
				 * @extends {puremvc.SimpleCommand}
				 */
				function MediaAnalyticsSetDimensionsCommand() {
					MediaAnalyticsSetDimensionsCommand.__super__.constructor.call(this);
				}


				__extends(MediaAnalyticsSetDimensionsCommand, PluginCommand);


				/**
				 * Executes the command.
				 *
				 * @param {puremvc.Notification} notification
				 *    The notification.
				 *
				 * @override
				 */
				MediaAnalyticsSetDimensionsCommand.prototype.execute = function(notification) {
					var dimensions;
					dimensions = notification.getBody();
					this.config.setDimensions(dimensions);
				};

				/**
				 * The MediaAnalyticsContentChangedCommand class.
				 *
				 * @constructor
				 * @private
				 * @extends {puremvc.SimpleCommand}
				 */
				function MediaAnalyticsContentChangedCommand() {
					MediaAnalyticsContentChangedCommand.__super__.constructor.call(this);
				}


				__extends(MediaAnalyticsContentChangedCommand, PluginCommand);


				/**
				 * Executes the command.
				 *
				 * @param {puremvc.Notification} notification
				 *    The notification.
				 *
				 * @override
				 */
				MediaAnalyticsContentChangedCommand.prototype.execute = function(notification) {
					this.config.updatedMedia(notification.getBody());
				};

				/**
				 * The MediaAnalyticsChangeMediaCommand class.
				 *
				 * @constructor
				 * @private
				 * @extends {puremvc.SimpleCommand}
				 */
				function MediaAnalyticsChangeMediaCommand() {
					MediaAnalyticsChangeMediaCommand.__super__.constructor.call(this);
				}


				__extends(MediaAnalyticsChangeMediaCommand, PluginCommand);


				/**
				 * Executes the command.
				 *
				 * @param {puremvc.Notification} notification
				 *    The notification.
				 *
				 * @override
				 */
				MediaAnalyticsChangeMediaCommand.prototype.execute = function(notification) {
					var media;
					media = notification.getBody();
					this.config.setMedia(media);
				};

				/**
				 * The AdPlayCommand class.
				 *
				 * @constructor
				 * @private
				 * @extends {AdCommand}
				 */
				function AdPlayCommand() {
					AdPlayCommand.__super__.constructor.call(this);
				}


				__extends(AdPlayCommand, AdCommand);


				/**
				 * Executes the command.
				 *
				 * @param {puremvc.Notification} notification
				 *    The notification.
				 *
				 * @override
				 */
				AdPlayCommand.prototype.execute = function(notification) {
					if (this.ads.getStarted() === false) {
						this.sendNotification(Notifications.START, true);
						return;
					}
					this.ads.play();
					this.facade.player.sendNotification(Notifications.CHANGE_PLAY_STATE, PlayState.PLAYING);
				};

				/**
				 * The AdPauseCommand class.
				 *
				 * @constructor
				 * @private
				 * @extends {AdCommand}
				 */
				function AdPauseCommand() {
					AdPauseCommand.__super__.constructor.call(this);
				}


				__extends(AdPauseCommand, AdCommand);


				/**
				 * Executes the command.
				 *
				 * @param {puremvc.Notification} notification
				 *    The notification.
				 *
				 * @override
				 */
				AdPauseCommand.prototype.execute = function(notification) {
					this.ads.pause();
					this.facade.player.sendNotification(Notifications.CHANGE_PLAY_STATE, PlayState.PAUSED);
				};

				/**
				 * The AdTogglePlayPauseCommand class.
				 *
				 * @constructor
				 * @private
				 * @extends {AdCommand}
				 */
				function AdTogglePlayPauseCommand() {
					AdTogglePlayPauseCommand.__super__.constructor.call(this);
				}


				__extends(AdTogglePlayPauseCommand, AdCommand);


				/**
				 * Executes the command.
				 *
				 * @param {puremvc.Notification} notification
				 *    The notification.
				 *
				 * @override
				 */
				AdTogglePlayPauseCommand.prototype.execute = function(notification) {
					var note;
					if (this.ads.getPaused() || this.ads.getStarted() === false) {
						note = Notifications.PLAY;
					} else {
						note = Notifications.PAUSE;
					}
					this.sendNotification(note, true);
				};

				/**
				 * The AdVolumeChangeCommand class.
				 *
				 * @constructor
				 * @private
				 * @extends {AdCommand}
				 */
				function AdVolumeChangeCommand() {
					AdVolumeChangeCommand.__super__.constructor.call(this);
				}


				__extends(AdVolumeChangeCommand, AdCommand);


				/**
				 * Executes the command.
				 *
				 * @param {puremvc.Notification} notification
				 *    The notification.
				 *
				 * @override
				 */
				AdVolumeChangeCommand.prototype.execute = function(notification) {
					this.ads.setVolume(notification.getBody());
				};

				/**
				 * The AdContentEndedCommand class.
				 *
				 * @constructor
				 * @private
				 * @extends {AdCommand}
				 */
				function AdContentEndedCommand() {
					AdContentEndedCommand.__super__.constructor.call(this);
				}


				__extends(AdContentEndedCommand, AdCommand);


				/**
				 * Executes the command.
				 *
				 * @param {puremvc.Notification} notification
				 *    The notification.
				 *
				 * @override
				 */
				AdContentEndedCommand.prototype.execute = function(notification) {
					this.ads.contentEnded();
				};

				/**
				 * The AdContentStartedCommand class.
				 *
				 * @constructor
				 * @private
				 * @extends {AdCommand}
				 */
				function AdContentStartedCommand() {
					AdContentStartedCommand.__super__.constructor.call(this);
				}


				__extends(AdContentStartedCommand, AdCommand);


				/**
				 * Executes the command.
				 *
				 * @param {puremvc.Notification} notification
				 *    The notification.
				 *
				 * @override
				 */
				AdContentStartedCommand.prototype.execute = function(notification) {
					this.ads.contentStarted();
				};

				function MediaAnalyticsWrapper(player, config) {
					MediaAnalyticsWrapper.__super__.constructor.call(this, player, config);
				}


				__extends(MediaAnalyticsWrapper, PluginWrapper);


				MediaAnalyticsWrapper.NAME = "MediaAnalyticsWrapper";

				/** @override
				 */
				MediaAnalyticsWrapper.prototype.listNotificationInterests = function() {
					return MediaAnalyticsWrapper.__super__.listNotificationInterests.call(this).concat([Notifications.MEDIA_CHANGE, MediaAnalyticsNotifications.SET_DIMENSIONS]);
				};

				MediaAnalyticsWrapper.prototype.createFlashVars = function(flashvars) {
					var dimensions, key, value, _ref, _ref1;
					dimensions = (_ref = this.player.config) != null ? (_ref1 = _ref.media) != null ? _ref1.mediaanalytics : void 0 : void 0;
					if (dimensions != null) {
						for (key in dimensions) {
							value = dimensions[key];
							flashvars["report_" + key] = value;
						}
					}
					return flashvars;
				};

				MediaAnalyticsWrapper.prototype.createXML = function(xml) {
					var application, dimensions, element, key, metrics, path, value, vendor, _ref, _ref1;
					application = xml.firstChild;
					metrics = xml.getElementsByTagName("metrics")[0];
					if (!(metrics != null)) {
						metrics = xml.createElement("metrics");
						application.appendChild(metrics);
					}
					vendor = xml.createElement("vendor");
					vendor.setAttribute("id", "akamai");
					metrics.appendChild(vendor);
					if (this.config.config != null) {
						element = xml.createElement("property");
						element.setAttribute("key", "MEDIA_ANALYTICS_BEACON");
						element.appendChild(XMLUtils.createTextContent(xml, this.config.config));
						vendor.appendChild(element);
						path = ((_ref = this.config.plugin) != null ? _ref.swf : void 0) || "http://79423.analytics.edgesuite.net/csma/plugin/csma.swf";
						element = xml.createElement("property");
						element.setAttribute("key", "MEDIA_ANALYTICS_PLUGIN_PATH");
						element.appendChild(XMLUtils.createTextContent(xml, path));
						vendor.appendChild(element);
					}
					if (this.config.dimensions != null) {
						dimensions = xml.createElement("property");
						dimensions.setAttribute("key", "dimensions");
						vendor.appendChild(dimensions);
						_ref1 = this.config.dimensions;
						for (key in _ref1) {
							value = _ref1[key];
							element = xml.createElement("property");
							element.setAttribute("key", key);
							element.appendChild(XMLUtils.createTextContent(xml, value));
							dimensions.appendChild(element);
						}
					}
					return xml;
				};

				MediaAnalyticsWrapper.prototype.handleNotification = function(notification) {
					var body, key, media, name, value, _ref, _ref1;
					MediaAnalyticsWrapper.__super__.handleNotification.call(this, notification);
					name = notification.getName();
					body = notification.getBody();
					switch (name) {
						case Notifications.MEDIA_CHANGE:
							media = body;
							if (((_ref = media.mediaanalytics) != null ? _ref.dimensions : void 0) != null) {
								media.dimensions = [];
								_ref1 = media.mediaanalytics.dimensions;
								for (key in _ref1) {
									value = _ref1[key];
									media.dimensions.push({
										key: key,
										value: value
									});
								}
							}
							break;
						case MediaAnalyticsNotifications.SET_DIMENSIONS:
							this.setDimensions(body);
					}
				};

				/**
				 */
				MediaAnalyticsWrapper.prototype.setDimensions = function(value) {
					this.player.mediaElement.setPlayerProperty("maDimensions", value);
					return value;
				};

				/**
				 * @enum {string}
				 * @const
				 * @private
				 */

				var IMANotifications = {
					INITIALIZED: "ima/initialize",
					ADD_OVERLAY: "ima/addOverlay",
					REMOVE_OVERLAY: "ima/removeOverlay"
				};

				/**
				 * @constructor
				 */
				function AdVO(id, title, duration, position, type, partner, advertiser, companions, request, metadata, totalAds) {
					this.id = id;
					this.title = title;
					this.duration = duration;
					this.position = position;
					this.type = type;
					this.partner = partner;
					this.advertiser = advertiser;
					this.companions = companions;
					this.request = request;
					this.metadata = metadata;
					this.totalAds = totalAds;
				}

				AdVO.prototype.id = null;

				AdVO.prototype.title = null;

				AdVO.prototype.duration = NaN;

				AdVO.prototype.position = NaN;

				AdVO.prototype.totalAds = NaN;

				AdVO.prototype.type = null;

				AdVO.prototype.partner = null;

				AdVO.prototype.advertiser = null;

				AdVO.prototype.companions = null;

				AdVO.prototype.metadata = null;

				AdVO.prototype.request = null;

				AdVO.prototype.error = null;

				/**
				 * Used to trigger overlay ads for Google IMA
				 *
				 * @constructor
				 * @private
				 */
				function IMAOverlayProxy(config) {
					IMAOverlayProxy.__super__.constructor.call(this, config);
				}


				__extends(IMAOverlayProxy, DataBoundConfigurationProxy);


				IMAOverlayProxy.prototype.configurationName = "imaoverlay";

				/** @static
				 */
				IMAOverlayProxy.NAME = "IMAOveralyProxy";

				IMAOverlayProxy.prototype.defaults = {
					adTagUrl: null,
					duration: 15,
					interval: 30,
					delay: 30
				};

				IMAOverlayProxy.prototype.durationTimer = null;

				IMAOverlayProxy.prototype.intervalTimer = null;

				IMAOverlayProxy.prototype.delayTimer = null;

				/** Stops polling and clears the ad
				 */
				IMAOverlayProxy.prototype.stop = function() {
					clearTimeout(this.durationTimer);
					clearTimeout(this.delayTimer);
					clearTimeout(this.intervalTimer);
				};

				/** Starts polling and load the first ad
				 */
				IMAOverlayProxy.prototype.play = function() {
					var _this = this;
					this.stop();
					this.delayTimer = setTimeout(function() {
						return _this.requestAd();
					}, this.value.delay * 1000);
				};

				/** Retrieves an ad image from VAST XML
				 */
				IMAOverlayProxy.prototype.requestAd = function() {
					var adTagUrl, xhr;
					adTagUrl = this.getValue("adTagUrl");
					if (adTagUrl != null) {
						adTagUrl = adTagUrl.replace("[timestamp]", new Date().getTime());
						adTagUrl = adTagUrl.replace("__random-number__", new Date().getTime());
					}
					xhr = Utils.get(adTagUrl, {
						withCredentials: true,
						onload: this.vastLoadHandler.bind(this),
						onerror: this.error.bind(this)
					}, false);
				};

				IMAOverlayProxy.prototype.vastLoadHandler = function(xhr) {
					var ad, clickThroughHref, creativeView, img, impression, xml;
					xml = xhr.target.responseXML;
					if (xml != null) {
						try {
							ad = xml.querySelector("NonLinear");
							if (ad != null) {
								impression = xml.querySelector("Impression") != null ? xml.querySelector("Impression").textContent : "";
								creativeView = xml.querySelector("Tracking[event=creativeView]") != null ? xml.querySelector("Tracking[event=creativeView]").textContent : "";
								clickThroughHref = ad.querySelector("NonLinearClickThrough") != null ? ad.querySelector("NonLinearClickThrough").textContent : "";
								img = {
									src: ad.querySelector("StaticResource").textContent,
									width: ad.getAttribute("width"),
									height: ad.getAttribute("height"),
									tracking: [impression, creativeView],
									href: clickThroughHref
								};
								this.displayAd(img);
							} else {
								this.error("No overlay was returned");
							}
						} catch (error) {
							this.error(error);
						}
					}
				};

				IMAOverlayProxy.prototype.error = function(error) {
					this.facade.logger.error("[AMP IMA OVERLAY ERROR]", error);
					this.stop();
				};

				/** Notifies the application that a new overlay is ready to display
				 */
				IMAOverlayProxy.prototype.displayAd = function(ad) {
					var _this = this;
					this.sendNotification(IMANotifications.ADD_OVERLAY, ad);
					this.durationTimer = setTimeout(function() {
						_this.sendNotification(IMANotifications.REMOVE_OVERLAY);
						return _this.intervalTimer = setTimeout(function() {
							return _this.requestAd();
						}, _this.value.interval * 1000);
					}, this.value.duration * 1000);
				};

				/**
				 * The AdProxy class.
				 *
				 * @constructor
				 * @private
				 * @extends {PluginProxy}
				 * @param {Object} config
				 * @implements {IDataBindingContext}
				 */
				function AdProxy(config) {
					AdProxy.__super__.constructor.call(this, config);
				}


				__extends(AdProxy, PluginProxy);


				/** @static
				 */
				AdProxy.NAME = PluginProxy.NAME;

				AdProxy.prototype.inprogress = false;

				AdProxy.prototype.paused = false;

				AdProxy.prototype.started = false;

				AdProxy.prototype.adVO = null;

				AdProxy.prototype.contextName = "ad";

				/**
				 * Gets the context data for this proxy.
				 *
				 * @returns {Object} The contenxt data for this proxy
				 */
				AdProxy.prototype.getContextData = function() {
					return this.adVO || {};
				};

				/**
				 */
				AdProxy.prototype.setCompanions = function(value) {
					this.adVO.companions = value;
					this.sendNotification(AdNotifications.AD_COMPANION, this.adVO);
					return value;
				};

				AdProxy.prototype.getCompanions = function() {
					var _ref;
					return (_ref = this.adVO) != null ? _ref.companions : void 0;
				};

				/**
				 */
				AdProxy.prototype.getInProgress = function() {
					return this.inprogress;
				};

				AdProxy.prototype.setInProgress = function(value) {
					return this.inprogress = value;
				};

				/**
				 */
				AdProxy.prototype.getStarted = function() {
					return this.started;
				};

				/**
				 */
				AdProxy.prototype.setStarted = function(value) {
					this.started = value;
					return value;
				};

				/**
				 */
				AdProxy.prototype.getPaused = function() {
					return this.paused;
				};

				AdProxy.prototype.setPaused = function(value) {
					this.paused = value;
					return value;
				};

				/**
				 */
				AdProxy.prototype.play = function() {
					this.setPaused(false);
					this.sendNotification(AdNotifications.AD_PLAY, this.adVO);
				};

				/**
				 */
				AdProxy.prototype.pause = function() {
					this.setPaused(true);
					this.sendNotification(AdNotifications.AD_PAUSE, this.adVO);
				};

				/**
				 */
				AdProxy.prototype.breakStart = function() {};

				/**
				 */
				AdProxy.prototype.breakEnd = function() {
					this.setInProgress(false);
					this.reset();
				};

				/**
				 */
				AdProxy.prototype.error = function(err, breakEnd) {
					var msg;
					if (breakEnd == null) {
						breakEnd = true;
					}
					msg = (typeof err.getMessage === "function" ? err.getMessage() : void 0) || err.message;
					this.facade.logger.error("[AMP AD ERROR]", "" + msg + " Skipping ad content.", err);
					if (this.adVO == null) {
						this.adVO = {};
					}
					this.adVO.error = err;
					this.sendNotification(AdNotifications.AD_ERROR, this.adVO);
					if (breakEnd === true) {
						this.sendNotification(AdNotifications.BREAK_END);
					}
				};

				/**
				 */
				AdProxy.prototype.engage = function(media) {
					if (this.getEnabled() === false) {
						return;
					}
					this.setStarted(false);
					if (this.getInProgress()) {
						this.reset();
						this.facade.player.sendNotification(Notifications.REMOVE_APPLICATION_STATE, "ad-mode");
					}
					this.engageAds();
				};

				/**
				 */
				AdProxy.prototype.engageAds = function() {
					this.facade.player.removeCommand(Notifications.START);
					this.facade.player.removeCommand(Notifications.PLAY);
					this.facade.player.removeCommand(Notifications.PAUSE);
					this.facade.player.removeCommand(Notifications.ENDED);
					this.facade.player.removeCommand(UserNotifications.PLAY);
					this.facade.player.removeCommand(UserNotifications.PAUSE);
					this.facade.player.removeCommand(UserNotifications.TOGGLE_PLAY_PAUSE);
					if (this.facade.isFullscreenDevice()) {
						this.facade.player.removeCommand(Notifications.CHANGE_DURATION);
					}
					this.facade.removeCommand(Notifications.STARTED);
					this.facade.removeCommand(Notifications.ENDED);
					this.facade.registerCommand(Notifications.START, AdStartCommand);
					this.facade.registerCommand(Notifications.PLAY, AdPlayCommand);
					this.facade.registerCommand(Notifications.PAUSE, AdPauseCommand);
					this.facade.registerCommand(UserNotifications.PLAY, AdPlayCommand);
					this.facade.registerCommand(UserNotifications.PAUSE, AdPauseCommand);
					this.facade.registerCommand(UserNotifications.TOGGLE_PLAY_PAUSE, AdTogglePlayPauseCommand);
					this.facade.registerCommand(Notifications.VOLUME_CHANGE, AdVolumeChangeCommand);
				};

				/**
				 */
				AdProxy.prototype.reset = function() {
					this.facade.removeCommand(Notifications.START);
					this.facade.removeCommand(Notifications.PLAY);
					this.facade.removeCommand(Notifications.PAUSE);
					this.facade.removeCommand(UserNotifications.PLAY);
					this.facade.removeCommand(UserNotifications.PAUSE);
					this.facade.removeCommand(UserNotifications.TOGGLE_PLAY_PAUSE);
					this.facade.removeCommand(Notifications.VOLUME_CHANGE);
					this.facade.player.registerCommand(Notifications.START, StartCommand);
					this.facade.player.registerCommand(Notifications.PLAY, PlayCommand);
					this.facade.player.registerCommand(Notifications.PAUSE, PauseCommand);
					this.facade.player.registerCommand(Notifications.ENDED, EndedCommand);
					this.facade.player.registerCommand(UserNotifications.PLAY, PlayCommand);
					this.facade.player.registerCommand(UserNotifications.PAUSE, PauseCommand);
					this.facade.player.registerCommand(UserNotifications.TOGGLE_PLAY_PAUSE, TogglePlayPauseCommand);
					if (this.facade.isFullscreenDevice()) {
						this.facade.player.registerCommand(Notifications.CHANGE_DURATION, ChangeDurationCommand);
					}
					this.facade.registerCommand(Notifications.STARTED, AdContentStartedCommand);
					this.facade.registerCommand(Notifications.ENDED, AdContentEndedCommand);
				};

				/**
				 */
				AdProxy.prototype.start = function() {
					if (this.getEnabled() === false) {
						this.sendNotification(AdNotifications.BREAK_END);
						return false;
					}
					this.setStarted(true);
					return true;
				};

				/**
				 */
				AdProxy.prototype.contentPlay = function() {
					this.facade.player.sendNotification(Notifications.PLAY, true);
				};

				/**
				 */
				AdProxy.prototype.contentPause = function() {
					this.facade.player.mediaElement.pause();
				};

				/**
				 */
				AdProxy.prototype.contentStarted = function() {};

				/**
				 */
				AdProxy.prototype.contentSeek = function(time) {};

				/**
				 */
				AdProxy.prototype.contentEnded = function() {};

				/**
				 */
				AdProxy.prototype.setVolume = function(value) {};

				/**
				 */
				AdProxy.prototype.getVolume = function() {};

				/**
				 */
				AdProxy.prototype.terminateAd = function() {};

				/**
				 */
				AdProxy.prototype.terminateAllAds = function() {};

				/**
				 * The IMAProxy class.
				 *
				 * @constructor
				 * @private
				 * @extends {AdProxy}
				 * @param {Object} config
				 */
				function IMAProxy(config) {
					IMAProxy.__super__.constructor.call(this, config);
					this.intervals = [];
					this.loadedmetadata = this.onLoadedMetadata.bind(this);
				}


				__extends(IMAProxy, AdProxy);


				/** @static
				 */
				IMAProxy.NAME = AdProxy.NAME;

				IMAProxy.prototype.defaults = {
					adTagUrl: null,
					overlay: null,
					width: null,
					height: null,
					maxBitrate: -1,
					ppid: null,
					companions: null
				};

				IMAProxy.prototype.key = "ima";

				IMAProxy.prototype.intervals = null;

				IMAProxy.prototype.adDisplayContainer = null;

				IMAProxy.prototype.adDisplayContainerInitialized = false;

				IMAProxy.prototype.adsLoader = null;

				IMAProxy.prototype.adsRenderingSettings = null;

				IMAProxy.prototype.adsManagerLoaded = false;

				IMAProxy.prototype.adsManager = null;

				IMAProxy.prototype.cuepoints = null;

				IMAProxy.prototype.adLoaded = false;

				IMAProxy.prototype.playWhenLoaded = false;

				IMAProxy.prototype.contentHasEnded = false;

				IMAProxy.prototype.adTagUrl = null;

				IMAProxy.prototype.viewMode = null;

				IMAProxy.prototype.playbackCore = null;

				IMAProxy.prototype.loadedmetadata = null;

				/**
				 */
				IMAProxy.prototype.setEnabled = function(value) {
					var _ref;
					IMAProxy.__super__.setEnabled.call(this, value);
					if (value === false) {
						if ((_ref = this.adsManager) != null) {
							if (typeof _ref.destroy === "function") {
								_ref.destroy();
							}
						}
						if (this.getInProgress()) {
							this.contentPlay();
						}
					}
					return value;
				};

				/** @override
				 */
				IMAProxy.prototype.onLoadedMetadata = function(event) {
					event.target.removeEventListener("loadedmetadata", this.loadedmetadata);
					if (this.canPlay() && this.playWhenLoaded === true) {
						this.startAd();
					}
				};

				/** @override
				 */
				IMAProxy.prototype.initialize = function() {
					this.facade.player.getViewComponent().addEventListener("resize", this.resize.bind(this));
				};

				/** @override
				 */
				IMAProxy.prototype.ready = function() {
					this.viewMode = google.ima.ViewMode.NORMAL;
					this.facade.player.getViewComponent().addEventListener("resize", this.resize.bind(this));
					if (this.config.vpaidAllowed != null) {
						google.ima.settings.setVpaidAllowed(this.config.vpaidAllowed);
					}
					this.adDisplayContainer = this.createPlugin();
					this.adsLoader = new google.ima.AdsLoader(this.adDisplayContainer);
					this.adsRenderingSettings = new google.ima.AdsRenderingSettings();
					this.adsLoader.addEventListener(google.ima.AdsManagerLoadedEvent.Type.ADS_MANAGER_LOADED, this.onAdsManagerLoaded.bind(this), false);
					this.adsLoader.addEventListener(google.ima.AdErrorEvent.Type.AD_ERROR, this.onAdError.bind(this), false);
				};

				/** @override
				 */
				IMAProxy.prototype.createPlugin = function() {
					return new google.ima.AdDisplayContainer(this.facade.getViewComponent().container);
				};

				/** @override
				 */
				IMAProxy.prototype.engage = function(override) {
					var _ref;
					if (override == null) {
						override = true;
					}
					if (this.getEnabled() === false) {
						return;
					}
					IMAProxy.__super__.engage.call(this);
					if (this.adsManagerLoaded === true && this.contentHasEnded === false) {
						if ((_ref = this.adsManager) != null) {
							if (typeof _ref.destroy === "function") {
								_ref.destroy();
							}
						}
					}
					this.adsManagerLoaded = false;
					this.contentHasEnded = false;
					this.adsManagerLoaded = false;
					this.playWhenLoaded = false;
				};

				/**
				 */
				IMAProxy.prototype.setVolume = function(value) {
					var _ref;
					if ((_ref = this.adsManager) != null) {
						_ref.setVolume(value);
					}
					return value;
				};

				/**
				 */
				IMAProxy.prototype.getVolume = function() {
					var _ref;
					return (_ref = this.adsManager) != null ? _ref.getVolume() : void 0;
				};

				/** @override
				 */
				IMAProxy.prototype.requestAd = function() {
					var adsRequest, adsResponse, height, settings, width, _ref, _ref1;
					this.sendNotification(AdNotifications.REQUEST, this.adVO);
					width = this.facade.player.getViewComponent().clientWidth;
					height = this.facade.player.getViewComponent().clientHeight;
					adsRequest = new google.ima.AdsRequest();
					this.adTagUrl = this.getValue("adTagUrl");
					adsResponse = this.getValue("adsResponse");
					if ((adsResponse != null) && adsResponse !== "") {
						adsRequest.adsResponse = Utils.read(adsResponse, null, Utils.mimeTypes.txt);
					} else {
						adsRequest.adTagUrl = this.adTagUrl;
					}
					if (!(adsRequest.adsResponse != null) && !(adsRequest.adTagUrl != null)) {
						this.onAdError("No valid adTagUrl or adsResponse provided.");
						return;
					}
					adsRequest.linearAdSlotWidth = width;
					adsRequest.linearAdSlotHeight = height;
					adsRequest.nonLinearAdSlotWidth = ((_ref = this.value.overlay) != null ? _ref.width : void 0) || width;
					adsRequest.nonLinearAdSlotHeight = ((_ref1 = this.value.overlay) != null ? _ref1.height : void 0) || height;
					settings = this.adsLoader.getSettings();
					if (this.config.ppid != null) {
						settings.setPpid(this.getValue("ppid"));
					}
					this.adsLoader.requestAds(adsRequest);
				};

				/** @override
				 */
				IMAProxy.prototype.requestOverlay = function() {
					var adsRequest, overlay;
					overlay = this.value.overlay;
					if (!(overlay != null)) {
						return;
					}
					adsRequest = new google.ima.AdsRequest();
					adsRequest.adTagUrl = overlay.adTagUrl;
					adsRequest.nonLinearAdSlotWidth = overlay.width || 300;
					adsRequest.nonLinearAdSlotHeight = overlay.height || 50;
					this.adsLoader.requestAds(adsRequest);
				};

				/** @override
				 */
				IMAProxy.prototype.start = function() {
					var video;
					this.playbackCore = this.facade.player.retrieveProxy(PlayerProxy.NAME).getActivePlaybackCore();
					video = this.facade.player.getMediaElement();
					this.playbackCore.setEnabled(false);
					video.src = this.playbackCore.getSrc();
					video.addEventListener("loadedmetadata", this.loadedmetadata);
					video.load();
					if (IMAProxy.__super__.start.call(this) === false) {
						return false;
					}
					if (this.adDisplayContainerInitialized !== true) {
						this.adDisplayContainer.initialize();
						this.adDisplayContainerInitialized = true;
					}
					if (this.canPlay() === true) {
						this.startAd();
					} else {
						this.playWhenLoaded = true;
						this.requestAd();
					}
				};

				/**
				 */
				IMAProxy.prototype.canPlay = function() {
					return this.adsManagerLoaded === true;
				};

				/**
				 */
				IMAProxy.prototype.startAd = function() {
					var volume;
					this.playWhenLoaded = false;
					try {
						volume = this.facade.player.retrieveProxy(PlaybackProxy.NAME).getVolume();
						this.setVolume(volume);
						if (this.viewMode == null) {
							this.viewMode = google.ima.ViewMode.NORMAL;
						}
						this.adsManager.init(this.facade.player.getViewComponent().clientWidth, this.facade.player.getViewComponent().clientHeight, this.viewMode);
						this.adsManager.start();
					} catch (adError) {
						this.error(adError);
					}
				};

				IMAProxy.prototype.resize = function(state) {
					var _ref;
					if (state != null) {
						this.viewMode = state === DisplayState.FULL_SCREEN ? google.ima.ViewMode.FULLSCREEN : google.ima.ViewMode.NORMAL;
					}
					if ((_ref = this.adsManager) != null) {
						_ref.resize(this.facade.player.getViewComponent().clientWidth, this.facade.player.getViewComponent().clientHeight, this.viewMode);
					}
				};

				/**
				 */
				IMAProxy.prototype.onAdsManagerLoaded = function(adsManagerLoadedEvent) {
					var adEventHandler, _ref;
					this.adsRenderingSettings.bitrate = this.getValue("maxBitrate");
					this.adsRenderingSettings.autoAlign = true;
					this.adsRenderingSettings.useStyledNonLinearAds = true;
					if ((_ref = this.adsManager) != null) {
						if (typeof _ref.destroy === "function") {
							_ref.destroy();
						}
					}
					this.adsManager = adsManagerLoadedEvent.getAdsManager(this.facade.player.mediaElement, this.adsRenderingSettings);
					this.adsManagerLoaded = true;
					this.cuePoints = this.adsManager.getCuePoints();
					this.facade.player.sendNotification(Notifications.ADD_CUE_POINTS, this.cuePoints);
					adEventHandler = this.onAdEvent.bind(this);
					this.adsManager.addEventListener(google.ima.AdErrorEvent.Type.AD_ERROR, this.onAdError.bind(this));
					this.adsManager.addEventListener(google.ima.AdEvent.Type.CONTENT_PAUSE_REQUESTED, this.contentPause.bind(this));
					this.adsManager.addEventListener(google.ima.AdEvent.Type.CONTENT_RESUME_REQUESTED, this.contentPlay.bind(this));
					this.adsManager.addEventListener(google.ima.AdEvent.Type.ALL_ADS_COMPLETED, adEventHandler);
					this.adsManager.addEventListener(google.ima.AdEvent.Type.LOADED, adEventHandler);
					this.adsManager.addEventListener(google.ima.AdEvent.Type.STARTED, adEventHandler);
					this.adsManager.addEventListener(google.ima.AdEvent.Type.RESUME, this.onAdResumed.bind(this));
					this.adsManager.addEventListener(google.ima.AdEvent.Type.PAUSED, this.onAdPaused.bind(this));
					this.adsManager.addEventListener(google.ima.AdEvent.Type.COMPLETE, adEventHandler);
					this.adsManager.addEventListener(google.ima.AdEvent.Type.CLICK, this.onAdClick.bind(this));
					this.adsManager.addEventListener(google.ima.AdEvent.Type.FIRST_QUARTILE, adEventHandler);
					this.adsManager.addEventListener(google.ima.AdEvent.Type.MIDPOINT, adEventHandler);
					this.adsManager.addEventListener(google.ima.AdEvent.Type.THIRD_QUARTILE, adEventHandler);
					this.adsManager.addEventListener(google.ima.AdEvent.Type.LOG, adEventHandler);
					if (this.canPlay() && this.playWhenLoaded === true) {
						this.startAd();
					}
				};

				/**
				 */
				IMAProxy.prototype.onAdClick = function(adEvent) {
					if ((adEvent != null ? adEvent.getAd().isLinear() : void 0) === false) {
						this.facade.player.sendNotification(Notifications.PAUSE);
						return;
					}
					if (!this.getPaused()) {
						this.pause();
					}
				};

				/**
				 */
				IMAProxy.prototype.onAdPaused = function(adEvent) {
					this.setPaused(true);
					this.facade.player.sendNotification(Notifications.CHANGE_PLAY_STATE, PlayState.PAUSED);
					this.facade.player.sendNotification(Notifications.CHANGE_ACTIVE_STATE, ActiveState.ACTIVE);
					this.facade.player.sendNotification(AdNotifications.AD_PAUSED, this.adVO);
				};

				/**
				 */
				IMAProxy.prototype.onAdResumed = function(adEvent) {
					this.setPaused(false);
					this.facade.player.sendNotification(Notifications.CHANGE_PLAY_STATE, PlayState.PLAYING);
				};

				/**
				 */
				IMAProxy.prototype.onAdEvent = function(adEvent) {
					var ad, companion, companions, pos, type, _i, _len, _ref;
					ad = adEvent.getAd();
					if (this.adVO != null) {
						if (ad != null) {
							ad.wrapperAdIds = typeof ad.getWrapperAdIds === "function" ? ad.getWrapperAdIds() : void 0;
							ad.wrapperAdSystems = typeof ad.getWrapperAdSystems === "function" ? ad.getWrapperAdSystems() : void 0;
						}
						this.adVO.metadata = ad;
					}
					switch (adEvent.type) {
						case google.ima.AdEvent.Type.LOADED:
							if (ad.isLinear()) {
								pos = ad.getAdPodInfo().getPodIndex();
								type = pos === 0 ? "preroll" : pos === -1 ? "postroll" : "midroll";
								this.adVO = new AdVO(ad.getAdId(), ad.getAdId(), ad.getDuration(), pos, type, "ima", null, null, this.adTagUrl, ad, ad.getAdPodInfo().getTotalAds());
								this.sendNotification(AdNotifications.AD_LOADED, this.adVO);
								this.sendNotification(AdNotifications.AD_DURATION_CHANGE, this.adVO);
								if (type === "midroll" || type === "postroll") {
									this.engageAds();
								}
							} else {
								this.facade.player.sendNotification(Notifications.ADD_APPLICATION_STATE, "ad-overlaymode");
								this.contentPlay();
							}
							break;
						case google.ima.AdEvent.Type.STARTED:
							if (ad.isLinear()) {
								this.setInProgress(true);
								this.adVO.position = ad.getAdPodInfo().getAdPosition();
								this.sendNotification(AdNotifications.AD_STARTED, this.adVO);
								this.intervals.push(setInterval(this.onAdTimeUpdate.bind(this), 300));
								this.facade.player.sendNotification(Notifications.CHANGE_PLAY_STATE, PlayState.PLAYING);
								this.sendNotification(AdNotifications.AD_PLAY, this.adVO);
							}
							try {
								companions = [];
								_ref = this.getConfigurationData().companions;
								for (_i = 0, _len = _ref.length; _i < _len; _i++) {
									companion = _ref[_i];
									companions = companions.concat(ad.getCompanionAds(companion.width, companion.height));
								}
								if ((companions != null ? companions.length : void 0) > 0) {
									this.setCompanions(companions);
								}
							} catch (error) {
								this.facade.logger.error("[AMP IMA ERROR]", "Could not retrieve companion ads:", error);
							}
							break;
						case google.ima.AdEvent.Type.COMPLETE:
							if (ad.isLinear()) {
								this.sendNotification(AdNotifications.AD_ENDED, this.adVO);
							}
							break;
						case google.ima.AdEvent.Type.FIRST_QUARTILE:
							this.sendNotification(AdNotifications.FIRST_QUARTILE, this.adVO);
							break;
						case google.ima.AdEvent.Type.MIDPOINT:
							this.sendNotification(AdNotifications.MIDPOINT, this.adVO);
							break;
						case google.ima.AdEvent.Type.THIRD_QUARTILE:
							this.sendNotification(AdNotifications.THIRD_QUARTILE, this.adVO);
							break;
						case google.ima.AdEvent.Type.LOG:
							this.sendNotification(AdNotifications.LOG, this.adVO);
					}
				};

				/**
				 */
				IMAProxy.prototype.onAdTimeUpdate = function(adErrorEvent) {
					this.sendNotification(AdNotifications.AD_TIME_REMAINING, this.adsManager.getRemainingTime());
				};

				/**
				 */
				IMAProxy.prototype.onAdError = function(adErrorEvent) {
					var error;
					error = (adErrorEvent != null ? adErrorEvent.getError() : void 0) || adErrorEvent;
					this.error(error);
					this.contentPlay();
				};

				/**
				 */
				IMAProxy.prototype.play = function() {
					var _ref;
					IMAProxy.__super__.play.call(this);
					try {
						if ((_ref = this.adsManager) != null) {
							_ref.resume();
						}
						this.sendNotification(AdNotifications.AD_RESUME);
					} catch (error) {
						this.facade.logger.error("[AMP IMA ERROR]", "resume", error);
					}
				};

				/**
				 */
				IMAProxy.prototype.pause = function() {
					IMAProxy.__super__.pause.call(this);
					try {
						this.adsManager.pause();
					} catch (error) {
						this.facade.logger.error("[AMP IMA ERROR]", "pause", error);
					}
				};

				/**
				 */
				IMAProxy.prototype.breakEnd = function() {
					var interval, overlayProxy, _i, _len, _ref;
					_ref = this.intervals;
					for (_i = 0, _len = _ref.length; _i < _len; _i++) {
						interval = _ref[_i];
						clearInterval(this.intervals.pop());
					}
					IMAProxy.__super__.breakEnd.call(this);
					overlayProxy = this.facade.retrieveProxy(IMAOverlayProxy.NAME);
					if (overlayProxy != null) {
						overlayProxy.play();
					}
				};

				/**
				 */
				IMAProxy.prototype.setCompanions = function(value) {
					var companion, companions, _i, _len, _ref;
					companions = [];
					for (_i = 0, _len = value.length; _i < _len; _i++) {
						companion = value[_i];
						companions.push({
							data: companion.getContent(),
							type: (_ref = companion.getContentType()) != null ? _ref.toLowerCase() : void 0,
							width: companion.getWidth(),
							height: companion.getHeight(),
							metadata: companion
						});
					}
					IMAProxy.__super__.setCompanions.call(this, companions);
					return value;
				};

				/**
				 */
				IMAProxy.prototype.contentPause = function() {
					this.sendNotification(Notifications.DISABLE_VIDEO_EVENTS, ["paused", "ended", "durationchange", "error"]);
					IMAProxy.__super__.contentPause.call(this);
					this.sendNotification(AdNotifications.BREAK_START, this.adVO);
				};

				/**
				 */
				IMAProxy.prototype.contentPlay = function() {
					var _ref, _ref1;
					this.sendNotification(Notifications.ENABLE_VIDEO_EVENTS, ["paused", "ended", "durationchange", "error"]);
					this.sendNotification(AdNotifications.BREAK_END, this.adVO);
					if (((_ref = this.adVO) != null ? _ref.type : void 0) === "midroll" && Utils.getDevice() === "desktop") {
						this.facade.player.setCurrentTime(Math.floor(this.facade.player.getCurrentTime()));
					}
					if (((_ref1 = this.adVO) != null ? _ref1.type : void 0) === "postroll") {
						this.facade.player.sendNotification(Notifications.ENDED);
						return;
					}
					IMAProxy.__super__.contentPlay.call(this);
				};

				/**
				 */
				IMAProxy.prototype.contentEnded = function() {
					var _ref;
					this.contentHasEnded = true;
					try {
						if ((_ref = this.adsLoader) != null) {
							if (typeof _ref.contentComplete === "function") {
								_ref.contentComplete();
							}
						}
					} catch (error) {
						this.facade.logger.error("[AMP IMA ERROR]", "contentComplete", error);
					}
				};

				/**
				 */
				IMAProxy.prototype.terminateAd = function() {
					var _ref;
					try {
						if ((_ref = this.adsManager) != null) {
							_ref.stop();
						}
					} catch (error) {
						this.facade.logger.error("[AMP IMA ERROR]", "terminateAd", error);
					}
					this.breakEnd();
					this.contentPlay();
				};

				/**
				 */
				IMAProxy.prototype.terminateAllAds = function() {
					var _ref;
					try {
						if ((_ref = this.adsManager) != null) {
							_ref.destroy();
						}
					} catch (error) {
						this.facade.logger.error("[AMP IMA ERROR]", "terminateAllAds", error);
					}
					this.breakEnd();
					this.contentPlay();
				};

				/**
				 * @constructor
				 * @private
				 */
				function MediaAnalyticsProxy(config) {
					MediaAnalyticsProxy.__super__.constructor.call(this, config);
				}


				__extends(MediaAnalyticsProxy, PluginProxy);


				/** @static
				 */
				MediaAnalyticsProxy.NAME = ModuleProxy.NAME;

				MediaAnalyticsProxy.prototype.defaults = {
					config: null,
					dimensions: null
				};

				/**
				 */
				MediaAnalyticsProxy.prototype.ready = function() {
					try {
						window.akamaiSetVideoObject(this.facade.player.getMediaElement());
					} catch (error) {
						this.facade.logger.error("[AMP MEDIA ANALYTICS ERROR]", "Could not set video tag", error);
					}
				};

				/**
				 */
				MediaAnalyticsProxy.prototype.setDimensions = function(value) {
					var dimensions, key, val;
					dimensions = this.configurationData.source.dimensions;
					for (key in value) {
						val = value[key];
						if (val != null) {
							dimensions[key] = val;
						}
					}
					this.configurationData.parse(this.configurationData.source);
					this.applyDimensions(dimensions);
					return value;
				};

				/**
				 */
				MediaAnalyticsProxy.prototype.applyDimensions = function(dimensions) {
					var key, value;
					if (!(window.setAkamaiMediaAnalyticsData != null)) {
						return;
					}
					try {
						for (key in dimensions) {
							value = dimensions[key];
							setAkamaiMediaAnalyticsData(key, value);
						}
					} catch (error) {
						this.facade.logger.error("[AMP MEDIA ANALYTICS ERROR]", "Could not set dimensions:", error);
					}
				};

				/**
				 */
				MediaAnalyticsProxy.prototype.setMedia = function(media) {
					var dimensions, _ref;
					if (((_ref = media.mediaanalytics) != null ? _ref.dimensions : void 0) != null) {
						dimensions = Utils.override(this.value.dimensions, media.mediaanalytics.dimensions);
					} else {
						dimensions = this.value.dimensions;
					}
					this.applyDimensions(dimensions);
					return media;
				};

				/**
				 */
				MediaAnalyticsProxy.prototype.udpateMedia = function(media) {
					if (typeof akamaiHandleTitleSwitch === "function") {
						akamaiHandleTitleSwitch(media);
					}
					return media;
				};

				/**
				 * The MediaAnalyticsReadyCommand class.
				 *
				 * @constructor
				 * @private
				 * @extends {puremvc.SimpleCommand}
				 */
				function MediaAnalyticsReadyCommand() {
					MediaAnalyticsReadyCommand.__super__.constructor.call(this);
				}


				__extends(MediaAnalyticsReadyCommand, puremvc.SimpleCommand);


				/**
				 * Executes the command.
				 *
				 * @param {puremvc.Notification} notification
				 *    The notification.
				 *
				 * @override
				 */
				MediaAnalyticsReadyCommand.prototype.execute = function(notification) {
					this.facade.retrieveProxy(MediaAnalyticsProxy.NAME).ready();
				};

				/**
				 * The PlayOverlayPlugin class.
				 *
				 * @param {Module}  app     The parent module of this plugin.
				 * @constructor
				 * @private
				 * @extends {Plugin}
				 */
				function PlayOverlayPlugin() {
					PlayOverlayPlugin.__super__.constructor.call(this);
				}


				__extends(PlayOverlayPlugin, Plugin);


				PlayOverlayPlugin.prototype.moduleName = "playoverlay";

				/** @override
				 */
				PlayOverlayPlugin.prototype.createModel = function() {};

				/** @override
				 */
				PlayOverlayPlugin.prototype.createView = function() {
					this.registerMediator(new PlayOverlayMediator());
				};

				/** @override
				 */
				PlayOverlayPlugin.prototype.listNotificationPublications = function() {
					return PlayOverlayPlugin.__super__.listNotificationPublications.call(this).concat([UserNotifications.TOGGLE_PLAY_PAUSE]);
				};


				AMP.registerPlugin("playoverlay", "html", PlayOverlayPlugin);
				AMP.registerPlugin("playoverlay", "external", PlayOverlayPlugin);

				/**
				 * @enum {string}
				 * @const
				 * @private
				 */

				var EventManagementNotifications = {
					EVENT_STATE_CHANGED: "eventStateChanged"
				};

				/**
				 * Poller class
				 *
				 * @constructor
				 * @private
				 * @extends {EventDispatcher}
				 * @param {string} url
				 * @param {number} interval
				 * @param {string} type
				 * @param {Object} headers
				 */
				function Poller(url, interval, type, headers) {
					this.url = url;
					this.interval = interval != null ? interval : 10000;
					this.type = type != null ? type : null;
					this.headers = headers != null ? headers : null;
					Poller.__super__.constructor.call(this);
				}


				__extends(Poller, EventDispatcher);


				Poller.prototype.timeout = null;

				Poller.prototype.interval = null;

				Poller.prototype.url = null;

				Poller.prototype.lastModified = null;

				Poller.prototype.contentLenght = null;

				Poller.prototype.data = null;

				Poller.prototype.text = null;

				Poller.prototype.type = null;

				Poller.prototype.headers = null;

				Poller.prototype.useHeadRequest = true;

				Poller.prototype.xhr = null;

				/**
				 */
				Poller.prototype.start = function() {
					if ((this.url != null) && this.url !== "") {
						this.poll();
					}
				};

				/**
				 */
				Poller.prototype.poll = function() {
					var xhr,
						_this = this;
					xhr = Utils.getXHR();
					if (!this.useHeadRequest) {
						this.updateData();
					} else {
						xhr.onload = function(event) {
							var contentLength, lastModified;
							if (xhr.status === 304) {
								_this.invoke();
								return;
							}
							lastModified = xhr.getResponseHeader("Last-Modified");
							contentLength = xhr.getResponseHeader("Content-Length");
							if ((!(lastModified != null) && !(contentLength != null)) || ((lastModified != null) && lastModified !== _this.lastModified) || ((contentLength != null) && contentLength !== _this.contentLength)) {
								_this.lastModified = lastModified;
								_this.contentLength = contentLength;
								_this.updateData();
							} else {
								_this.invoke();
							}
						};
						xhr.onerror = function(event) {
							_this.error(event);
						};
						xhr.open("HEAD", Utils.cacheBust(this.url), false);
						this.applyHeaders();
						if (this.lastModified != null) {
							xhr.setRequestHeader("If-Modified-Since", this.lastModified);
						}
						xhr.send();
					}
				};

				/**
				 */
				Poller.prototype.applyHeaders = function() {
					if (!(this.headers != null)) {
						return;
					}
					this.xhr.setRequestHeaders(this.headers);
				};

				/**
				 */
				Poller.prototype.updateData = function() {
					var xhr,
						_this = this;
					xhr = Utils.getXHR();
					xhr.open("GET", Utils.cacheBust(this.url), true);
					xhr.onload = function(event) {
						var text;
						text = xhr.responseText;
						_this.setText(text);
						_this.invoke();
					};
					xhr.onerror = function(event) {
						_this.error(event);
					};
					this.applyHeaders();
					return xhr.send();
				};

				/**
				 */
				Poller.prototype.setText = function(value) {
					var data;
					if (value !== this.text) {
						this.text = value;
						data = this.text;
						if (this.type === Utils.mimeTypes.json) {
							try {
								data = this.xhr.response;
							} catch (error) {
								data = this.text;
							}
						}
						this.setData(data);
					}
					return value;
				};

				/**
				 */
				Poller.prototype.setData = function(value) {
					if (value !== this.data) {
						this.data = value;
						this.dispatchEvent(new Event("datachanged", this.data));
					}
					return value;
				};

				/**
				 */
				Poller.prototype.error = function(error) {
					Logger.error(event);
					this.stop();
				};

				/**
				 */
				Poller.prototype.invoke = function() {
					var _this = this;
					this.stop();
					this.timeout = setTimeout(function() {
						_this.poll();
					}, this.interval);
				};

				/**
				 */
				Poller.prototype.stop = function() {
					clearTimeout(this.timeout);
				};

				function EventManagementWrapper() {
					return EventManagementWrapper.__super__.constructor.apply(this, arguments);
				}


				__extends(EventManagementWrapper, PluginWrapper);


				EventManagementWrapper.NAME = "EventManagementWrapper";

				/** @override
				 */
				EventManagementWrapper.prototype.createFlashVars = function(flashvars) {
					if (this.config.enabled != null) {
						flashvars.eventmanagementstates_enabled = this.config.enabled;
					}
					if (this.config.url != null) {
						flashvars.eventmanagementstates_status_url = this.config.url;
					}
					if (this.config.interval != null) {
						flashvars.eventmanagementstates_status_interval = this.config.interval;
					}
					return flashvars;
				};

				/** @override
				 */
				EventManagementWrapper.prototype.createXML = function(xml) {
					var application, eventmanagementstates, node, property, state, states, _i, _len, _ref;
					application = xml.firstChild;
					eventmanagementstates = xml.getElementsByTagName("eventmanagementstates");
					if (!(eventmanagementstates != null) || eventmanagementstates.length === 0) {
						eventmanagementstates = xml.createElement("eventmanagementstates");
						application.appendChild(eventmanagementstates);
					} else {
						eventmanagementstates = eventmanagementstates[0];
					}
					states = xml.createElement("states");
					eventmanagementstates.appendChild(states);
					_ref = this.config.states;
					for (_i = 0, _len = _ref.length; _i < _len; _i++) {
						state = _ref[_i];
						node = xml.createElement("state");
						states.appendChild(node);
						property = xml.createElement("property");
						property.setAttribute("key", "ID");
						property.appendChild(XMLUtils.createTextContent(xml, state.id));
						node.appendChild(property);
						property = xml.createElement("property");
						property.setAttribute("key", "POSTER_SRC");
						property.appendChild(XMLUtils.createTextContent(xml, state.poster));
						node.appendChild(property);
						if (state.url != null) {
							property = xml.createElement("property");
							property.setAttribute("key", "URL");
							property.appendChild(XMLUtils.createTextContent(xml, state.url));
							node.appendChild(property);
						}
					}
					return xml;
				};

				/**
				 * The EventManagementMediator class.
				 *
				 * @constructor
				 * @private
				 * @extends {OverlayMediator}
				 * @param {Object} viewComponent
				 */
				function EventManagementMediator() {
					EventManagementMediator.__super__.constructor.call(this);
				}


				__extends(EventManagementMediator, OverlayMediator);


				EventManagementMediator.prototype.componentName = "event-management";

				EventManagementMediator.prototype.poster = null;

				/**
				 * @override
				 */
				EventManagementMediator.prototype.onRegister = function() {
					this.classList.add("hidden");
					this.poster = this.create("event-poster", false, "img");
					EventManagementMediator.__super__.onRegister.call(this);
				};

				/**
				 * @override
				 */
				EventManagementMediator.prototype.listNotificationInterests = function() {
					return [EventManagementNotifications.EVENT_STATE_CHANGED];
				};

				/**
				 * @override
				 */
				EventManagementMediator.prototype.handleNotification = function(notification) {
					var state;
					switch (notification.getName()) {
						case EventManagementNotifications.EVENT_STATE_CHANGED:
							state = notification.getBody();
							if (state.id !== "on") {
								if (state.poster != null) {
									this.poster.src = state.poster;
									this.viewComponent.appendChild(this.poster);
								}
								this.classList.remove("hidden");
								this.sendNotification(Notifications.PAUSE);
								this.sendNotification(Notifications.CHANGE_DISPLAY_STATE, DisplayState.NORMAL);
							} else {
								if (this.viewComponent.contains(this.poster)) {
									this.viewComponent.removeChild(this.poster);
								}
								this.classList.add("hidden");
							}
					}
				};

				/**
				 * The EventManagementPlayCommand class.
				 *
				 * @constructor
				 * @private
				 * @extends {puremvc.SimpleCommand}
				 */
				function EventManagementPlayCommand() {
					EventManagementPlayCommand.__super__.constructor.call(this);
				}


				__extends(EventManagementPlayCommand, puremvc.SimpleCommand);


				/**
				 * Executes the command.
				 *
				 * @param {puremvc.Notification} notification
				 *    The notification.
				 *
				 * @override
				 */
				EventManagementPlayCommand.prototype.execute = function(notification) {
					var eventManagementProxy, _ref;
					eventManagementProxy = this.facade.retrieveProxy(EventManagementProxy.NAME);
					if (((_ref = eventManagementProxy.getState()) != null ? _ref.id : void 0) !== EventManagementProxy.ON.id) {
						this.sendNotification(Notifications.PAUSE);
					}
				};

				/**
				 * @constructor
				 * @private
				 */
				function EventManagementProxy(config) {
					var _this = this;
					EventManagementProxy.__super__.constructor.call(this, config);
					this.poller = new Poller();
					this.poller.ondatachanged = function(event) {
						var id, state, _i, _len, _ref;
						id = event.detail;
						if (id === "on") {
							state = EventManagementProxy.ON;
						} else {
							_ref = _this.data.states;
							for (_i = 0, _len = _ref.length; _i < _len; _i++) {
								state = _ref[_i];
								if (state.id === id) {
									break;
								}
							}
						}
						if (state != null) {
							return _this.setState(state);
						}
					};
				}


				__extends(EventManagementProxy, ModuleProxy);


				EventManagementProxy.NAME = ModuleProxy.NAME;

				EventManagementProxy.ON = {
					id: "on"
				};

				EventManagementProxy.prototype.defaults = {
					url: null,
					interval: null,
					states: null,
					enabled: false
				};

				EventManagementProxy.prototype.poller = null;

				EventManagementProxy.prototype.state = null;

				EventManagementProxy.prototype.initialize = function() {
					if (this.data.enabled === true) {
						this.setURL(this.data.url);
						this.setInterval(this.data.interval);
						this.poller.start();
					}
				};

				EventManagementProxy.prototype.setURL = function(value) {
					this.data.url = this.poller.url = value;
					return value;
				};

				EventManagementProxy.prototype.getURL = function() {
					return this.data.url;
				};

				/**
				 *
				 */
				EventManagementProxy.prototype.getInterval = function() {
					return this.data.interval;
				};

				EventManagementProxy.prototype.setInterval = function(value) {
					this.data.interval = this.poller.interval = value * 1000;
					return value;
				};

				EventManagementProxy.prototype.setState = function(value) {
					this.state = value;
					this.sendNotification(EventManagementNotifications.EVENT_STATE_CHANGED, value);
					return value;
				};

				EventManagementProxy.prototype.getState = function() {
					return this.state;
				};

				/**
				 * The MediaAnalyticsPlugin class.
				 *
				 * @param {Module}  app     The parent module of this plugin.
				 * @constructor
				 * @private
				 * @extends {Plugin}
				 */
				function MediaAnalyticsPlugin() {
					MediaAnalyticsPlugin.__super__.constructor.call(this);
				}


				__extends(MediaAnalyticsPlugin, Plugin);


				MediaAnalyticsPlugin.prototype.moduleName = "mediaanalytics";

				/** @override
				 */
				MediaAnalyticsPlugin.prototype.initialize = function(config, player) {
					window.AKAMAI_MEDIA_ANALYTICS_CONFIG_FILE_PATH = config.config;
					MediaAnalyticsPlugin.__super__.initialize.call(this, config, player);
				};

				/** @override
				 */
				MediaAnalyticsPlugin.prototype.createModel = function() {
					this.proxy = new MediaAnalyticsProxy(this.config);
					this.registerProxy(this.proxy);
				};

				/** @override
				 */
				MediaAnalyticsPlugin.prototype.createController = function() {
					this.registerCommand(Notifications.READY, MediaAnalyticsReadyCommand);
					this.registerCommand(Notifications.MEDIA_CHANGE, MediaAnalyticsChangeMediaCommand);
					this.registerCommand(AdNotifications.BREAK_START, MediaAnalyticsAdBreakStartCommand);
					this.registerCommand(AdNotifications.BREAK_END, MediaAnalyticsAdBreakEndCommand);
					this.registerCommand(AdNotifications.AD_LOADED, MediaAnalyticsAdLoadedCommand);
					this.registerCommand(AdNotifications.AD_STARTED, MediaAnalyticsAdStartCommand);
					this.registerCommand(AdNotifications.AD_TIME_UPDATE, MediaAnalyticsAdTimeUpdateCommand);
					this.registerCommand(AdNotifications.AD_ENDED, MediaAnalyticsAdEndCommand);
					this.registerCommand(MediaAnalyticsNotifications.SET_DIMENSIONS, MediaAnalyticsSetDimensionsCommand);
					this.registerCommand(Notifications.CONTENT_CHANGED, MediaAnalyticsContentChangedCommand);
				};

				/**
				 */
				MediaAnalyticsPlugin.prototype.listNotificationInterests = function() {
					return [Notifications.READY, Notifications.MEDIA_CHANGE, AdNotifications.BREAK_START, AdNotifications.BREAK_END, AdNotifications.AD_LOADED, AdNotifications.AD_STARTED, AdNotifications.AD_TIME_UPDATE, AdNotifications.AD_ENDED, MediaAnalyticsNotifications.SET_DIMENSIONS, Notifications.CONTENT_CHANGED];
				};

				/**
				 * Sets the media analytics dimensions.
				 *
				 * @param {Object} value The hash representing dimensions.
				 * @expose
				 */
				MediaAnalyticsPlugin.prototype.setDimensions = function(value) {
					this.retrieveProxy(MediaAnalyticsProxy.NAME).setDimensions(value);
					return value;
				};


				AMP.registerPlugin("mediaanalytics", "html", MediaAnalyticsPlugin);
				AMP.registerPlugin("mediaanalytics", "flash", MediaAnalyticsWrapper);

				function BrandingWrapper() {
					return BrandingWrapper.__super__.constructor.apply(this, arguments);
				}


				__extends(BrandingWrapper, PluginWrapper);


				BrandingWrapper.NAME = "BrandingWrapper";

				BrandingWrapper.prototype.createFlashVars = function(flashvars) {
					if (this.config.id != null) {
						flashvars.branding = this.config.id;
					}
					return flashvars;
				};

				BrandingWrapper.prototype.createXML = function(xml) {
					var backgroundImage, controls, element, elements, id, logo, logoId, style, _i, _len, _ref;
					if (((_ref = this.config) != null ? _ref.logo : void 0) != null) {
						logoId = "logoOverlay";
						backgroundImage = "background-image: url('" + this.config.logo + "');";
						elements = xml.getElementsByTagName("element");
						for (_i = 0, _len = elements.length; _i < _len; _i++) {
							element = elements[_i];
							id = element.getAttribute("id");
							if (id === logoId) {
								logo = element;
							} else if (id === "controls") {
								controls = element;
							}
						}
						if (!(logo != null)) {
							logo = xml.createElement("element");
							logo.setAttribute("id", logoId);
							logo.setAttribute("style", "width: 150px; height: 53px; right: 15px; top: 15px; opacity: 0.5; " + backgroundImage);
							controls.appendChild(logo);
						} else {
							style = logo.getAttribute("style");
							if (style.indexOf("background-image:") !== -1) {
								style = style.replace(/background-image: [A-Za-z0-9_\-\.\/\\;\(\)"']+/, backgroundImage);
							} else {
								style = backgroundImage + style;
							}
							logo.setAttribute("style", style);
						}
					}
					return xml;
				};

				/**
				 * The AdChoicesMediator class.
				 *
				 * @constructor
				 * @private
				 * @extends {OverlayMediator}
				 * @param {Object} viewComponent
				 */
				function BrandingMediator() {
					BrandingMediator.__super__.constructor.call(this);
				}


				__extends(BrandingMediator, OverlayMediator);


				BrandingMediator.prototype.componentName = "branding";

				BrandingMediator.prototype.logo = null;

				BrandingMediator.prototype.text = null;

				BrandingMediator.prototype.container = null;

				BrandingMediator.prototype.onRegister = function() {
					this.container = this.create("branding-container");
					this.logo = this.create(["branding-image", "hidden"], this.container, "img");
					this.text = this.create("branding-text", this.container);
					BrandingMediator.__super__.onRegister.call(this);
				};

				/**
				 * @override
				 */
				BrandingMediator.prototype.listNotificationInterests = function() {
					return [Notifications.READY];
				};

				/**
				 * @override
				 */
				BrandingMediator.prototype.handleNotification = function(notification) {
					var branding, href;
					switch (notification.getName()) {
						case Notifications.READY:
							branding = notification.getBody().branding;
							if (!(branding != null)) {
								return;
							}
							if (branding.logo != null) {
								this.logo.src = branding.logo;
								this.classList.remove("hidden", this.logo);
							} else {
								this.classList.add("hidden", this.logo);
							}
							href = this.config.getDomain();
							if ((href != null) && href.indexOf("http") !== 0) {
								href = location.protocol + "//" + href;
								this.text.innerHTML = '<span>View all <a href="' + href + '" target="' + this.config.getTarget() + '">' + this.config.getDomain() + '</a> videos.';
							}
					}
				};

				/**
				 * @constructor
				 * @private
				 */
				function BrandingProxy(config) {
					BrandingProxy.__super__.constructor.call(this, config);
				}


				__extends(BrandingProxy, ModuleProxy);


				/** @static
				 */
				BrandingProxy.NAME = ModuleProxy.NAME;

				BrandingProxy.prototype.defaults = {
					id: null,
					title: null,
					link: null,
					logo: null,
					target: null
				};

				/**
				 *
				 */
				BrandingProxy.prototype.getID = function() {
					return this.data.id;
				};

				BrandingProxy.prototype.setID = function(value) {
					return this.data.id = value;
				};

				/**
				 *
				 */
				BrandingProxy.prototype.getTarget = function() {
					return this.data.target;
				};

				BrandingProxy.prototype.setTarget = function(value) {
					return this.data.target = value;
				};

				/**
				 *
				 */
				BrandingProxy.prototype.getTitle = function() {
					return this.data.title;
				};

				BrandingProxy.prototype.setTitle = function(value) {
					return this.data.title = value;
				};

				/**
				 *
				 */
				BrandingProxy.prototype.getLink = function() {
					return this.data.link;
				};

				BrandingProxy.prototype.setLink = function(value) {
					return this.data.link = value;
				};

				/**
				 *
				 */
				BrandingProxy.prototype.getLogo = function() {
					return this.data.logo;
				};

				BrandingProxy.prototype.setLogo = function(value) {
					return this.data.logo = value;
				};

				/**
				 * @enum {string}
				 * @const
				 * @private
				 */

				var FeedNotifications = {
					LOAD_FEED: "loadfeed",
					FEED_CHANGED: "feedchanged",
					FEED_LOADED: "feedcoaded"
				};

				/**
				 * The EventManagementPlugin class.
				 *
				 * @param {Module}  app     The parent module of this plugin.
				 * @constructor
				 * @extends {Plugin}
				 * @private
				 */
				function EventManagementPlugin() {
					EventManagementPlugin.__super__.constructor.call(this);
				}


				__extends(EventManagementPlugin, Plugin);


				EventManagementPlugin.prototype.moduleName = "eventmanagement";

				/** @override
				 */
				EventManagementPlugin.prototype.createModel = function() {
					this.registerProxy(new EventManagementProxy(this.config));
				};

				/** @override
				 */
				EventManagementPlugin.prototype.createController = function() {
					this.registerCommand(Notifications.PLAY, EventManagementPlayCommand);
				};

				EventManagementPlugin.prototype.createView = function() {
					this.registerMediator(new EventManagementMediator());
				};

				/** @override
				 */
				EventManagementPlugin.prototype.listNotificationInterests = function() {
					return [Notifications.PLAY];
				};

				/** @override
				 */
				EventManagementPlugin.prototype.listNotificationPublications = function() {
					return EventManagementPlugin.__super__.listNotificationPublications.call(this).concat([Notifications.CHANGE_DISPLAY_STATE, Notifications.PAUSE, EventManagementNotifications.EVENT_STATE_CHANGED]);
				};

				/** @override
				 */
				EventManagementPlugin.prototype.listNotificationEvents = function() {
					return [EventManagementNotifications.EVENT_STATE_CHANGED];
				};


				AMP.registerPlugin("eventmanagement", "html", EventManagementPlugin);
				AMP.registerPlugin("eventmanagement", "flash", EventManagementWrapper);

				/**
				 * The FeedProxy class.
				 *
				 * @constructor
				 * @private
				 * @extends {ModuleProxy}
				 * @param {Object} config The configuration object.
				 */
				function FeedProxy(config) {
					FeedProxy.__super__.constructor.call(this, config);
					this.helper = new MRSSHelper();
				}


				__extends(FeedProxy, ModuleProxy);


				FeedProxy.NAME = ModuleProxy.NAME;

				FeedProxy.prototype.defaults = {
					url: null,
					data: null
				};

				FeedProxy.prototype.feed = null;

				FeedProxy.prototype.helper = null;

				FeedProxy.prototype.setURL = function(value) {
					var _this = this;
					this.data.url = value;
					this.helper.getFeed(value, function(feed) {
						_this.sendNotification(FeedNotifications.CHANGE_FEED, feed);
					}, function(error) {
						Logger.error("[AMP Feed Load Error]", value, error);
					});
					return value;
				};

				FeedProxy.prototype.getURL = function() {
					return this.data.url;
				};

				FeedProxy.prototype.setFeedData = function(value) {
					this.data.data = value;
					this.feed = this.helper.createFeed(value);
					this.sendNotification(FeedNotifications.FEED_CHANGED, this.feed);
					this.sendNotification(Notifications.DISPATCH_EVENT, new Event("loaded", value));
					return value;
				};

				FeedProxy.prototype.getFeedData = function() {
					return this.data.data;
				};

				FeedProxy.prototype.invoke = function() {
					if ((this.data.url != null) && this.data.url !== "") {
						this.sendNotification(FeedNotifications.LOAD_FEED, this.data.url);
					} else if (this.data.data != null) {
						this.sendNotification(FeedNotifications.CHANGE_FEED, this.data.data);
					}
				};

				/**
				 * The LoadFeedCommand class.
				 *
				 * @constructor
				 * @private
				 * @extends {puremvc.SimpleCommand}
				 */
				function LoadFeedCommand() {
					LoadFeedCommand.__super__.constructor.call(this);
				}


				__extends(LoadFeedCommand, puremvc.SimpleCommand);


				/**
				 * Executes the command.
				 *
				 * @param {puremvc.Notification} notification
				 *    The notification.
				 *
				 * @override
				 */
				LoadFeedCommand.prototype.execute = function(notification) {
					var feedProxy;
					feedProxy = this.facade.retrieveProxy(FeedProxy.NAME);
					feedProxy.setURL(notification.getBody());
				};

				/**
				 * The ChangeFeedCommand class.
				 *
				 * @constructor
				 * @private
				 * @extends {puremvc.SimpleCommand}
				 */
				function ChangeFeedCommand() {
					ChangeFeedCommand.__super__.constructor.call(this);
				}


				__extends(ChangeFeedCommand, puremvc.SimpleCommand);


				/**
				 * Executes the command.
				 *
				 * @param {puremvc.Notification} notification
				 *    The notification.
				 *
				 * @override
				 */
				ChangeFeedCommand.prototype.execute = function(notification) {
					var feedProxy;
					feedProxy = this.facade.retrieveProxy(FeedProxy.NAME);
					feedProxy.setFeedData(notification.getBody());
				};

				/**
				 * The FeedChangedCommand class.
				 *
				 * @constructor
				 * @private
				 * @extends {puremvc.SimpleCommand}
				 */
				function FeedChangedCommand() {
					FeedChangedCommand.__super__.constructor.call(this);
				}


				__extends(FeedChangedCommand, puremvc.SimpleCommand);


				/**
				 * Executes the command.
				 *
				 * @param {puremvc.Notification} notification
				 *    The notification.
				 *
				 * @override
				 */
				FeedChangedCommand.prototype.execute = function(notification) {
					var feed, mediaVO;
					this.facade.player.sendNotification(Notifications.CHANGE_PLAY_STATE, PlayState.READY);
					feed = notification.getBody();
					mediaVO = feed.item[0];
					this.facade.player.sendNotification(Notifications.SET_MEDIA, mediaVO);
				};

				/**
				 * The FeedInitializedCommand class.
				 *
				 * @constructor
				 * @private
				 * @extends {puremvc.SimpleCommand}
				 */
				function FeedInitializedCommand() {
					FeedInitializedCommand.__super__.constructor.call(this);
				}


				__extends(FeedInitializedCommand, puremvc.SimpleCommand);


				/**
				 * Executes the command.
				 *
				 * @param {puremvc.Notification} notification
				 *    The notification.
				 *
				 * @override
				 */
				FeedInitializedCommand.prototype.execute = function(notification) {
					var feedProxy;
					feedProxy = this.facade.retrieveProxy(FeedProxy.NAME);
					feedProxy.invoke();
				};

				function FeedWrapper(player, config) {
					if (config == null) {
						config = {};
					}
					FeedWrapper.__super__.constructor.call(this, player, config);
					if (config.url != null) {
						this.url = config.url;
					}
					if (config.data != null) {
						this.data = config.data;
					}
					this.player.load = function() {};
				}


				__extends(FeedWrapper, PluginWrapper);


				FeedWrapper.NAME = "FeedWrapper";

				FeedWrapper.prototype.url = null;

				FeedWrapper.prototype.data = null;

				FeedWrapper.prototype.updateData = true;

				/** @override
				 */
				FeedWrapper.prototype.createFlashVars = function(flashvars) {
					if ((this.url != null) && this.url !== "") {
						flashvars.data_feed_url = escape(this.url);
					}
				};

				/** @override
				 */
				FeedWrapper.prototype.listNotificationInterests = function() {
					return FeedWrapper.__super__.listNotificationInterests.apply(this, arguments).concat([FlashNotifications.READY, FlashNotifications.FEED_LOADED]);
				};

				/**
				 */
				FeedWrapper.prototype.handleNotification = function(notification) {
					var body, helper, media, name, type, _ref, _ref1,
						_this = this;
					FeedWrapper.__super__.handleNotification.call(this, notification);
					name = notification.getName();
					body = notification.getBody();
					switch (name) {
						case FlashNotifications.FEED_LOADED:
							if (this.updateData === false) {
								this.updateData = true;
							} else {
								this.data = JSON.parse(body);
							}
							type = "loaded";
							body = this.data;
							helper = new MRSSHelper();
							media = (_ref = helper.createFeed(this.data)) != null ? (_ref1 = _ref.item) != null ? _ref1[0] : void 0 : void 0;
							if (media != null) {
								this.player.mediaProxy.setData(media);
							}
							this.sendNotification(FeedNotifications.FEED_CHANGED, this.data);
							break;
						case FlashNotifications.READY:
							if (this.data != null) {
								setTimeout(function() {
									_this.setData(_this.data);
								}, 25);
							} else if ((this.url != null) && this.url !== "") {
								this.sendNotification(FeedNotifications.LOAD_FEED, this.url);
							}
					}
					if (type != null) {
						this.dispatchEvent(new Event(type, body));
					}
				};

				/**
				 */
				FeedWrapper.prototype.setURL = function(value) {
					if ((value != null) && value !== "") {
						this.url = value;
						this.player.mediaElement.playFile(this.url, this.player.getAutoplay());
						this.sendNotification(FeedNotifications.LOAD_FEED, this.url);
					}
					return value;
				};

				FeedWrapper.prototype.getURL = function() {
					return this.url;
				};

				/**
				 */
				FeedWrapper.prototype.setData = function(value) {
					this.data = value;
					this.updateData = false;
					this.player.mediaElement.playFile(this.data, this.player.getAutoplay());
					return value;
				};

				FeedWrapper.prototype.getData = function() {
					return this.data;
				};

				/**
				 * The BrandingPlugin class.
				 *
				 * @param {Module}  app     The parent module of this plugin.
				 * @constructor
				 * @private
				 * @extends {Plugin}
				 */
				function BrandingPlugin() {
					BrandingPlugin.__super__.constructor.call(this);
				}


				__extends(BrandingPlugin, Plugin);


				BrandingPlugin.NAME = "BrandingPlugin";

				BrandingPlugin.prototype.moduleName = "branding";

				/** @override
				 */
				BrandingPlugin.prototype.createModel = function() {
					this.registerProxy(new BrandingProxy(this.config));
				};

				BrandingPlugin.prototype.createView = function() {
					this.registerMediator(new BrandingMediator());
				};

				/** @override
				 */
				BrandingPlugin.prototype.onRegister = function() {
					if (this.config.id != null) {
						this.sendNotification(Notifications.ADD_APPLICATION_STATE, "branding-" + this.config.id);
					}
					BrandingPlugin.__super__.onRegister.call(this);
				};

				/**
				 */
				BrandingPlugin.prototype.listNotificationInterests = function() {
					return [Notifications.READY];
				};


				AMP.registerPlugin("branding", "html", BrandingPlugin);
				AMP.registerPlugin("branding", "flash", BrandingWrapper);
				AMP.registerPlugin("branding", "external", BrandingPlugin);

				/**
				 * @enum {string}
				 * @const
				 * @private
				 */

				var FeatureNotifications = {
					REGISTER_FEATURE: "registerfeature"
				};

				/**
				 * The Feature class. Acts as a base for features.
				 *
				 * @param {Module}  app     The parent module of this plugin.
				 * @param {Object}  config  The plugin's configuration object.
				 * @constructor
				 * @private
				 * @extends {Plugin}
				 */
				function Feature() {
					Feature.__super__.constructor.call(this);
				}


				__extends(Feature, Plugin);


				Feature.NAME = "Feature";

				Feature.prototype.featureName = null;

				/**
				 */
				Feature.prototype.getFeatureName = function() {
					return this.featureName;
				};

				/**
				 */
				Feature.prototype.registerFeature = function() {
					if (this.getFeatureName() != null) {
						this.player.sendNotification(FeatureNotifications.REGISTER_FEATURE, this);
					}
				};

				/** @override
				 */
				Feature.prototype.onRegister = function() {
					this.registerFeature();
					Feature.__super__.onRegister.call(this);
				};

				/** @override
				 */
				Feature.prototype.listNotificationPublications = function() {
					return Feature.__super__.listNotificationPublications.call(this).concat([FeatureNotifications.REGISTER_FEATURE]);
				};

				/**
				 * The FeedPlugin class.
				 *
				 * @param {Module}  app     The parent module of this plugin.
				 * @constructor
				 * @private
				 * @extends {Plugin}
				 */
				function FeedPlugin() {
					FeedPlugin.__super__.constructor.call(this);
				}


				__extends(FeedPlugin, Plugin);


				FeedPlugin.prototype.moduleName = "feed";

				/** @override
				 */
				FeedPlugin.prototype.createModel = function() {
					this.proxy = new FeedProxy(this.config);
					this.registerProxy(this.proxy);
				};

				/** @override
				 */
				FeedPlugin.prototype.createController = function() {
					FeedPlugin.__super__.createController.call(this);
					this.registerCommand(Notifications.READY, FeedInitializedCommand);
					this.registerCommand(FeedNotifications.LOAD_FEED, LoadFeedCommand);
					this.registerCommand(FeedNotifications.CHANGE_FEED, ChangeFeedCommand);
					this.registerCommand(FeedNotifications.FEED_CHANGED, FeedChangedCommand);
				};

				/** @override
				 */
				FeedPlugin.prototype.listNotificationInterests = function() {
					return FeedPlugin.__super__.listNotificationInterests.call(this).concat([Notifications.READY]);
				};

				/** @override
				 */
				FeedPlugin.prototype.listNotificationPublications = function() {
					var key, value;
					return FeedPlugin.__super__.listNotificationPublications.call(this).concat((function() {
						var _results;
						_results = [];
						for (key in FeedNotifications) {
							value = FeedNotifications[key];
							_results.push(value);
						}
						return _results;
					})());
				};

				/**
				 * @param {string} value The url of the feed.
				 * @expose
				 */
				FeedPlugin.prototype.setURL = function(value) {
					this.sendNotification(FeedNotifications.LOAD_FEED, value);
					return value;
				};

				/**
				 * @return {string} The url of the feed.
				 * @expose
				 */
				FeedPlugin.prototype.getURL = function() {
					return this.proxy.getURL();
				};

				/**
				 * @param {Object} value The MRSS feed object
				 * @expose
				 */
				FeedPlugin.prototype.setData = function(value) {
					this.sendNotification(FeedNotifications.CHANGE_FEED, value);
					return value;
				};

				/**
				 * @return {Object} The MRSS feed object.
				 * @expose
				 */
				FeedPlugin.prototype.getData = function() {
					return this.proxy.getData();
				};


				AMP.registerPlugin("feed", "html", FeedPlugin);
				AMP.registerPlugin("feed", "flash", FeedWrapper);

				/**
				 * @constructor
				 * @private
				 * @extends {OverlayMediator}
				 */
				function AdMediator() {
					AdMediator.__super__.constructor.call(this);
				}


				__extends(AdMediator, OverlayMediator);


				AdMediator.prototype.duration = null;

				AdMediator.prototype.currentTime = null;

				AdMediator.prototype.container = null;

				AdMediator.prototype.banner = null;

				AdMediator.prototype.text = null;

				AdMediator.prototype.adText = null;

				AdMediator.prototype.bg = null;

				AdMediator.prototype.totalAds = null;

				AdMediator.prototype.adPosition = null;

				AdMediator.prototype.adContainerRequired = true;

				AdMediator.prototype.componentName = "ads";

				/**
				 * @override
				 */
				AdMediator.prototype.onRegister = function() {
					if (this.adContainerRequired) {
						this.container = this.create("ad-container");
					}
					this.banner = this.create("ad-banner");
					this.bg = this.create("ad-text-bg", this.banner);
					this.adText = this.create("ad-text-title", this.banner);
					this.text = this.create("ad-text", this.banner);
					if (this.adContainerRequired) {
						this.viewComponent.container = this.container;
					}
					AdMediator.__super__.onRegister.call(this);
					this.sendNotification(AdNotifications.AD_CONTAINER_CREATED, this.viewComponent);
					this.facade.setViewComponent(this.viewComponent);
				};

				/**
				 * @override
				 */
				AdMediator.prototype.listNotificationInterests = function() {
					return [AdNotifications.BREAK_START, AdNotifications.BREAK_END, AdNotifications.AD_TIME_REMAINING, AdNotifications.AD_STARTED];
				};

				/**
				 * @override
				 */
				AdMediator.prototype.handleNotification = function(notification) {
					var adVO, duration, msg, time;
					switch (notification.getName()) {
						case AdNotifications.BREAK_END:
							this.text.textContent = "";
							this.adText.textContent = "";
							break;
						case AdNotifications.AD_TIME_REMAINING:
							time = notification.getBody();
							if ((this.totalAds != null) && this.totalAds > 0 && (this.adPosition != null) && this.adPosition !== this.totalAds) {
								msg = time > 0 ? "" + (this.localizationManager.getString(LocalizationConstants.MSG_NEXT_AD)) + (Utils.formatTimecode(time)) : "";
							} else {
								msg = time > 0 ? "" + (this.localizationManager.getString(LocalizationConstants.MSG_NEXT_VIDEO)) + (Utils.formatTimecode(time)) : "";
							}
							this.text.textContent = msg;
							duration = this.facade.retrieveProxy(ModuleProxy.NAME).adVO.duration;
							time = duration - time;
							break;
						case AdNotifications.AD_STARTED:
							adVO = notification.getBody();
							this.totalAds = adVO.totalAds;
							this.adPosition = adVO.position;
							msg = "Ad " + adVO.position + " of " + adVO.totalAds;
							if ((adVO.position != null) && (adVO.totalAds != null) && adVO.position !== 0) {
								this.adText.textContent = msg;
							}
					}
				};

				/**
				 * The AdMediaChangeCommand class.
				 *
				 * @constructor
				 * @private
				 * @extends {AdCommand}
				 */
				function AdMediaChangeCommand() {
					AdMediaChangeCommand.__super__.constructor.call(this);
				}


				__extends(AdMediaChangeCommand, AdCommand);


				/**
				 * Executes the command.
				 *
				 * @param {puremvc.Notification} notification
				 *    The notification.
				 *
				 * @override
				 */
				AdMediaChangeCommand.prototype.execute = function(notification) {
					var media;
					if (this.ads.getEnabled() === false) {
						return;
					}
					media = notification.getBody();
					this.ads.engage(media);
				};

				/**
				 * The AdLoadedCommand class.
				 *
				 * @constructor
				 * @private
				 * @extends {AdCommand}
				 */
				function AdLoadedCommand() {
					AdLoadedCommand.__super__.constructor.call(this);
				}


				__extends(AdLoadedCommand, AdCommand);


				/**
				 * Executes the command.
				 *
				 * @param {puremvc.Notification} notification
				 *    The notification.
				 *
				 * @override
				 */
				AdLoadedCommand.prototype.execute = function(notification) {
					this.sendNotification(Notifications.UPDATE_DATA_BINDINGS, {
						contexts: [this.ads.getContextName()]
					});
				};

				/**
				 * The AdBreakStartCommand class.
				 *
				 * @constructor
				 * @private
				 * @extends {AdCommand}
				 */
				function AdBreakStartCommand() {
					AdBreakStartCommand.__super__.constructor.call(this);
				}


				__extends(AdBreakStartCommand, AdCommand);


				/**
				 * Executes the command.
				 *
				 * @param {puremvc.Notification} notification
				 *    The notification.
				 *
				 * @override
				 */
				AdBreakStartCommand.prototype.execute = function(notification) {
					this.facade.player.sendNotification(Notifications.ADD_APPLICATION_STATE, "ad-mode");
					if (this.applicationState.getDevice() !== "desktop") {
						this.facade.player.sendNotification(Notifications.DISABLE_FULL_SCREEN);
					}
					this.ads.breakStart();
				};

				/**
				 * The AdBreakEndCommand class.
				 *
				 * @constructor
				 * @private
				 * @extends {AdCommand}
				 */
				function AdBreakEndCommand() {
					AdBreakEndCommand.__super__.constructor.call(this);
				}


				__extends(AdBreakEndCommand, AdCommand);


				/**
				 * Executes the command.
				 *
				 * @param {puremvc.Notification} notification
				 *    The notification.
				 *
				 * @override
				 */
				AdBreakEndCommand.prototype.execute = function(notification) {
					this.ads.breakEnd();
					this.facade.player.sendNotification(Notifications.REMOVE_APPLICATION_STATE, "ad-mode");
					if (this.applicationState.getDevice() !== "desktop") {
						this.facade.player.sendNotification(Notifications.ENABLE_FULL_SCREEN);
					}
				};

				/**
				 * @enum {string}
				 * @const
				 * @private
				 */

				var FlashAdNotifications = {
					BREAK_START: "adComponentBreakInitiated",
					BREAK_END: "adComponentBreakComplete",
					AD_LOADED: "adComponentLoaded",
					AD_STARTED: "adComponentAdBegin",
					AD_TIME_UPDATE: "adComponentPlaybackProgress",
					AD_TIME_REMAINING: "adComponentTimeElapsed",
					AD_DURATION_CHANGE: "addurationchange",
					AD_ENDED: "adComponentAdComplete",
					AD_ERROR: "adComponentInitFailed",
					AD_PLAY: "adComponentPlaybackResumed",
					AD_PAUSE: "adComponentPlaybackPaused",
					AD_LOG: "adComponentLog",
					AD_COMPANION: "adComponentCompanion",
					AD_PLAYBACK_FAILED: "adComponentPlaybackFailed",
					AD_PLAYBACK_TERMINATED: "adComponentPlaybackTerminated",
					AD_MEDIA_LOADED: "adComponentMediaLoaded",
					AD_CLICKED: "adComponentClicked",
					AD_FIRST_QUARTILE: "adComponentFirstQuartile",
					AD_MIDPOINT: "adComponentMidpoint",
					AD_THIRD_QUARTILE: "adComponentThirdQuartile",
					AD_REQUEST: "adComponentAdsRequest"
				};

				/**
				 * The AdSeekCommand class.
				 *
				 * @constructor
				 * @private
				 * @extends {AdCommand}
				 */
				function AdSeekCommand() {
					AdSeekCommand.__super__.constructor.call(this);
				}


				__extends(AdSeekCommand, AdCommand);


				/**
				 * Executes the command.
				 *
				 * @param {puremvc.Notification} notification
				 *    The notification.
				 *
				 * @override
				 */
				AdSeekCommand.prototype.execute = function(notification) {
					this.ads.contentSeek(notification.getBody());
				};

				/**
				 * The AuditudeProxy class.
				 *
				 * @constructor
				 * @private
				 * @extends {AdProxy}
				 * @param {Object} config
				 */
				function AuditudeProxy(config) {
					AuditudeProxy.__super__.constructor.call(this, config);
				}


				__extends(AuditudeProxy, AdProxy);


				/** @static
				 */
				AuditudeProxy.NAME = AdProxy.NAME;

				AuditudeProxy.prototype.defaults = {
					videoId: null,
					defaultId: null,
					domain: null,
					zoneId: null,
					companion: null,
					userData: null,
					params: null
				};

				AuditudeProxy.prototype.key = "auditude";

				AuditudeProxy.prototype.session = null;

				AuditudeProxy.prototype.options = null;

				/** @override
				 */
				AuditudeProxy.prototype.initialize = function() {
					var _this = this;
					this.options = {
						controls: false,
						auditudeHandlesChapterBreaks: false,
						style: {
							backgroundColor: '#000',
							width: this.facade.player.mediaElement.clientWidth,
							height: this.facade.player.mediaElement.clientHeight
						},
						handlers: {
							play: function() {
								_this.facade.logger.debug('ad play');
							},
							timeupdate: function(event, audPlayer, video) {
								_this.facade.sendNotification(AdNotifications.AD_TIME_REMAINING, video.duration - video.currentTime);
							},
							error: function(err) {
								_this.facade.logger.debug('ad error:', err);
								_this.error();
							},
							pause: function() {
								_this.facade.logger.debug('ad pause');
							},
							loadedmetadata: function(evt, player, video) {
								_this.facade.logger.debug('ad loadedmetadata');
							},
							end: function() {
								_this.facade.logger.debug('ad end');
							}
						}
					};
					try {
						this.plugin = this.createPlugin();
						this.plugin.subscribe(aud.events.init_complete, function(event, plugin) {
							_this.facade.logger.debug('init_complete:', event, plugin);
							try {
								_this.plugin.publish(aud.notifications.break_begin);
							} catch (err) {
								_this.error(err);
							}
						});
						this.plugin.subscribe(aud.events.init_failed, function(event, plugin) {
							_this.error(event);
						});
						this.plugin.subscribe(aud.events.break_begin, function(event, plugin) {
							_this.facade.logger.debug('break_begin:', event, plugin);
							_this.sendNotification(AdNotifications.BREAK_START);
						});
						this.plugin.subscribe(aud.events.pause_playback, function(event, plugin) {
							_this.facade.logger.debug('pause_playback: ' + event + ", " + plugin);
							_this.contentPause(event, plugin);
						});
						this.plugin.subscribe(aud.events.resume_playback, function(event, plugin) {
							_this.facade.logger.debug('resume_playback: ', event, plugin);
							_this.contentPlay(event, plugin);
						});
						this.plugin.subscribe(aud.events.linear_ad_begin, function(event, plugin, ctx) {
							var id, title, xml;
							_this.facade.logger.debug('linear ad begin:', event, plugin, ctx);
							xml = plugin._xmlDoc.querySelector("ad[id]");
							if (xml != null) {
								id = xml.getAttribute("id");
							}
							xml = plugin._xmlDoc.querySelector("inLine[adTitle]");
							if (xml != null) {
								title = xml.getAttribute("adTitle");
							}
							_this.adVO = new AdVO(id, title, ctx.asset.duration, 1, "preroll", "auditude", null, ctx.banners, null, ctx);
							_this.sendNotification(AdNotifications.AD_LOADED, _this.adVO);
							_this.sendNotification(AdNotifications.AD_DURATION_CHANGE, _this.adVO);
							_this.facade.player.sendNotification(Notifications.CHANGE_PLAY_STATE, PlayState.PLAYING);
							_this.sendNotification(AdNotifications.AD_PLAY);
							_this.setInProgress(true);
							_this.setCompanions(ctx.banners);
							_this.session = ctx.session;
							_this.sendNotification(AdNotifications.AD_STARTED);
						});
						this.plugin.subscribe(aud.events.linear_ad_end, function(event, plugin, ctx) {
							_this.facade.logger.debug('linear ad end:', event, plugin, ctx);
							_this.sendNotification(AdNotifications.AD_ENDED);
						});
						this.plugin.subscribe(aud.events.break_end, function(event, plugin) {
							_this.facade.logger.debug('break_end:', event, plugin);
							_this.sendNotification(AdNotifications.BREAK_END);
						});
						this.plugin.subscribe(aud.events.non_linear_ad_begin, function(event, plugin, ctx) {
							_this.facade.logger.debug('non linear ad begin');
							_this.setCompanions(ctx.banners);
						});
						this.plugin.subscribe(aud.events.non_linear_ad_end, function(event, plugin, ctx) {
							_this.facade.logger.debug('non linear ad end');
						});
					} catch (err) {
						this.error(err);
					}
				};

				/**
				 */
				AuditudeProxy.prototype.createPlugin = function() {
					return aud.html5.AdPlayer(this.facade.container.container, null, this.value.domain, this.value.zoneId, this.options);
				};

				/**
				 */
				AuditudeProxy.prototype.start = function() {
					var defaultId, id, key, params, userData, value, _ref;
					if (AuditudeProxy.__super__.start.call(this) === false) {
						return false;
					}
					try {
						params = this.value.params || {};
						userData = "";
						if (this.value.userData != null) {
							_ref = this.value.userData;
							for (key in _ref) {
								value = _ref[key];
								userData += "" + key + "=" + value + ";";
							}
						}
						if (params.userData != null) {
							userData += params.userData;
						}
						if (userData !== "") {
							params.userData = userData;
						}
						id = this.value.videoId + "";
						if (this.value.defaultId != null) {
							defaultId = this.value.defaultId + "";
							id = id != null ? [id, defaultId] : defaultId;
						}
						this.facade.logger.log("Auditude init: ", id, params);
						this.plugin.init(id, params);
					} catch (err) {
						this.error(err);
					}
				};

				/**
				 */
				AuditudeProxy.prototype.play = function() {
					AuditudeProxy.__super__.play.call(this);
					this.session.notifyResume();
				};

				/**
				 */
				AuditudeProxy.prototype.pause = function() {
					AuditudeProxy.__super__.pause.call(this);
					this.session.notifyPause();
				};

				/**
				 */
				AuditudeProxy.prototype.breakStart = function() {};

				/**
				 */
				AuditudeProxy.prototype.setCompanions = function(ads) {
					var ad, banner, companions, slot, _i, _j, _len, _len1;
					if (!(ads != null) || ads.length < 1) {
						return;
					}
					companions = [];
					for (_i = 0, _len = ads.length; _i < _len; _i++) {
						ad = ads[_i];
						companions.push({
							data: ad.data,
							type: ad.resourceType,
							width: parseInt(ad.width),
							height: parseInt(ad.height),
							metadata: ad
						});
					}
					AuditudeProxy.__super__.setCompanions.call(this, companions);
					if (!(this.value.companion != null)) {
						return;
					}
					banner = this.value.companion;
					slot = document.getElementById(banner.id);
					if (!(slot != null)) {
						return;
					}
					for (_j = 0, _len1 = ads.length; _j < _len1; _j++) {
						ad = ads[_j];
						if (!(banner.width === parseInt(ad.width) && banner.height === parseInt(ad.height))) {
							continue;
						}
						slot.innerHTML = ad.data;
						break;
					}
				};

				/**
				 */
				AuditudeProxy.prototype.contentStarted = function() {
					this.plugin.publish(aud.notifications.video_playback_started);
				};

				/**
				 */
				AuditudeProxy.prototype.contentEnded = function() {
					this.plugin.publish(aud.notifications.video_playback_complete);
				};

				/**
				 * @constructor
				 * @private
				 */
				function AuditudeFullscreenProxy(config) {
					AuditudeFullscreenProxy.__super__.constructor.call(this, config);
				}


				__extends(AuditudeFullscreenProxy, AuditudeProxy);


				/** @static
				 */
				AuditudeFullscreenProxy.NAME = AuditudeProxy.NAME;

				/**
				 */
				AuditudeFullscreenProxy.prototype.createPlugin = function() {
					return aud.html5.AdPlayer(this.facade.player.mediaElement, null, this.value.domain, this.value.zoneId, this.options);
				};

				/** @override
				 */
				AuditudeFullscreenProxy.prototype.engage = function(media) {
					AuditudeFullscreenProxy.__super__.engage.call(this, media);
					this.sendNotification(Notifications.DISABLE_VIDEO_EVENTS, ["ended"]);
				};

				/** @override
				 */
				AuditudeFullscreenProxy.prototype.reset = function(media) {
					AuditudeFullscreenProxy.__super__.reset.call(this, media);
					this.sendNotification(Notifications.ENABLE_VIDEO_EVENTS, ["ended"]);
				};

				/** @override
				 */
				AuditudeFullscreenProxy.prototype.play = function() {
					AuditudeFullscreenProxy.__super__.play.call(this);
					this.facade.player.mediaElement.play();
				};

				/** @override
				 */
				AuditudeFullscreenProxy.prototype.pause = function() {
					AuditudeFullscreenProxy.__super__.pause.call(this);
					this.facade.player.mediaElement.pause();
				};

				/** @override
				 */
				AuditudeFullscreenProxy.prototype.contentPause = function() {
					this.facade.player.mediaElement.pause();
				};

				/**
				 * @constructor
				 * @private
				 */
				function AdWrapper(player, init) {
					AdWrapper.__super__.constructor.call(this, player, init);
				}


				__extends(AdWrapper, PluginWrapper);


				AdWrapper.NAME = "AdWrapper";

				AdWrapper.prototype.enabled = true;

				AdWrapper.prototype.paused = false;

				AdWrapper.prototype.started = false;

				AdWrapper.prototype.adVO = null;

				/**
				 */
				AdWrapper.prototype.getFeatureName = function() {
					return "ads";
				};

				AdWrapper.prototype.getInProgress = function() {
					return this.player.mediaElement.getPlayerProperty("adInProgress");
				};

				AdWrapper.prototype.getStarted = function() {
					return this.started;
				};

				AdWrapper.prototype.getPaused = function() {
					return this.paused;
				};

				AdWrapper.prototype.getCompanions = function() {
					var _ref;
					return (_ref = this.adVO) != null ? _ref.companions : void 0;
				};

				AdWrapper.prototype.setEnabled = function(value) {
					this.enabled = value;
					this.player.mediaElement.setPlayerProperty("adsEnabled", value);
					return value;
				};

				AdWrapper.prototype.getEnabled = function() {
					return this.enabled;
				};

				AdWrapper.prototype.enable = function() {
					this.setEnabled(true);
				};

				AdWrapper.prototype.disable = function() {
					this.setEnabled(false);
				};

				/**
				 */
				AdWrapper.prototype.createFlashVars = function(flashvars) {
					flashvars.core_ads_enabled = true;
					return flashvars;
				};

				/**
				 */
				AdWrapper.prototype.listNotificationInterests = function() {
					var key, value;
					return AdWrapper.__super__.listNotificationInterests.call(this).concat((function() {
						var _results;
						_results = [];
						for (key in FlashAdNotifications) {
							value = FlashAdNotifications[key];
							_results.push(value);
						}
						return _results;
					})());
				};

				/** @override
				 */
				AdWrapper.prototype.handleNotification = function(notification) {
					var body, name, target, type;
					AdWrapper.__super__.handleNotification.call(this, notification);
					name = notification.getName();
					body = notification.getBody();
					this.adVO = this.createAdVO(body);
					target = this;
					switch (name) {
						case FlashAdNotifications.BREAK_START:
							type = "breakstart";
							break;
						case FlashAdNotifications.BREAK_END:
							type = "breakend";
							break;
						case FlashAdNotifications.AD_LOADED:
						case FlashAdNotifications.AD_MEDIA_LOADED:
							type = "loaded";
							this.start = false;
							break;
						case FlashAdNotifications.AD_STARTED:
							type = "started";
							this.started = true;
							this.sendNotification(Notifications.ADD_APPLICATION_STATE, "ad-mode");
							break;
						case FlashAdNotifications.AD_TIME_UPDATE:
						case FlashAdNotifications.AD_TIME_REMAINING:
							type = "timeupdate";
							break;
						case FlashAdNotifications.AD_ERROR:
						case FlashAdNotifications.AD_PLAYBACK_FAILED:
							type = "error";
							this.start = false;
							this.sendNotification(Notifications.REMOVE_APPLICATION_STATE, "ad-mode");
							break;
						case FlashAdNotifications.AD_ENDED:
						case FlashAdNotifications.AD_PLAYBACK_TERMINATED:
							type = "ended";
							this.sendNotification(Notifications.REMOVE_APPLICATION_STATE, "ad-mode");
							break;
						case FlashAdNotifications.AD_CLICKED:
							type = "clicked";
							break;
						case FlashAdNotifications.AD_COMPANION:
							type = "companion";
							if ((this.adVO != null) && (body != null)) {
								this.adVO.companions = body;
							}
							break;
						case FlashAdNotifications.AD_PAUSE:
							type = "pause";
							target = this.player;
							this.paused = true;
							this.player.setPlayState("paused");
							break;
						case FlashAdNotifications.AD_PLAY:
							type = "playing";
							target = this.player;
							this.paused = true;
							this.player.setPlayState("playing");
							target.dispatchEvent(new Event("play", body));
							break;
						case FlashAdNotifications.AD_LOG:
							type = "log";
							break;
						case FlashAdNotifications.AD_FIRST_QUARTILE:
							type = "firstquartile";
							break;
						case FlashAdNotifications.AD_MIDPOINT:
							type = "midpoint";
							break;
						case FlashAdNotifications.AD_THIRD_QUARTILE:
							type = "thirdquartile";
							break;
						case FlashAdNotifications.AD_REQUEST:
							type = "request";
					}
					if (type != null) {
						target.dispatchEvent(new Event(type, this.adVO));
					}
				};

				/**
				 */
				AdWrapper.prototype.createAdVO = function(ad) {
					if (!(ad != null)) {
						return null;
					}
					return new AdVO(ad.id, ad.title, ad.duration, ad.podIndex, ad.podPosition, ad.adPlatform, null, null, ad.requestURL, ad);
				};

				/**
				 * @expose
				 */
				AdWrapper.prototype.terminateAd = function() {
					this.player.mediaElement.terminateAd();
				};

				/**
				 * @expose
				 */
				AdWrapper.prototype.terminateAllAds = function() {
					this.player.mediaElement.terminateAllAds();
				};

				function AuditudeWrapper() {
					return AuditudeWrapper.__super__.constructor.apply(this, arguments);
				}


				__extends(AuditudeWrapper, AdWrapper);


				AuditudeWrapper.NAME = "AuditudeWrapper";

				/**
				 */
				AuditudeWrapper.prototype.createFlashVars = function(flashvars) {
					if ((this.config.companion != null)) {
						flashvars.ad_partner_companion_size = "" + this.config.companion.width + "x" + this.config.companion.height;
					}
					return flashvars;
				};

				AuditudeWrapper.prototype.createXML = function(xml) {
					var admedia, application, companion, companions, ids, prop, props, vendor, _i, _j, _len, _len1, _ref;
					application = xml.firstChild;
					admedia = xml.getElementsByTagName("admedia")[0];
					if (!(admedia != null)) {
						admedia = xml.createElement("admedia");
						application.appendChild(admedia);
					}
					vendor = xml.createElement("vendor");
					vendor.setAttribute("id", "auditude");
					admedia.appendChild(vendor);
					props = [
						{
							value: this.config.domain,
							key: "AUDITUDE_DOMAIN"
						}, {
							value: this.config.videoId,
							key: "AUDITUDE_MEDIA_ID"
						}, {
							value: this.config.defaultId,
							key: "AUDITUDE_DEFAULT_MEDIA_ID"
						}, {
							value: this.config.zoneId,
							key: "AUDITUDE_ZONE_ID"
						}, {
							value: this.config.prerollId,
							key: "AUDITUDE_PREROLL_MEDIA_ID"
						}, {
							value: this.config.midrollId,
							key: "AUDITUDE_MIDROLL_MEDIA_ID"
						}, {
							value: this.config.audienceManagerURL,
							key: "AUDITUDE_AUDIENCE_MGR_URL"
						}, {
							value: this.config.version,
							key: "AUDITUDE_VERSION"
						}
					];
					for (_i = 0, _len = props.length; _i < _len; _i++) {
						prop = props[_i];
						if (prop.value != null) {
							this.createProperty(xml, prop.key, prop.value, vendor);
						}
					}
					if (this.config.position != null) {
						vendor.setAttribute("position", this.config.position);
					}
					if (this.config.companions != null) {
						companions = [];
						ids = [];
						_ref = this.config.companions;
						for (_j = 0, _len1 = _ref.length; _j < _len1; _j++) {
							companion = _ref[_j];
							companions.push(companion.width + "x" + companion.height);
							ids.push(companion.id);
						}
						this.createProperty(xml, "AUDITUDE_COMPANION_SIZE", companions.join(","), vendor);
						this.createProperty(xml, "AUDITUDE_COMPANION_ID", companions.join(","), vendor);
					}
					if (this.config.params != null) {
						this.createProperty(xml, "AUDITUDE_PARAMS", this.config.params, vendor);
					}
					if (this.config.userData != null) {
						this.createProperty(xml, "AUDITUDE_USER_DATA", this.config.userData, vendor);
					}
					return xml;
				};

				/**
				 * The AdPlugin class.
				 *
				 * @param {Module}  app     The parent module of this plugin.
				 * @constructor
				 * @private
				 * @extends {Feature}
				 */
				function AdPlugin() {
					AdPlugin.__super__.constructor.call(this);
				}


				__extends(AdPlugin, Feature);


				AdPlugin.NAME = "AdPlugin";

				AdPlugin.prototype.container = null;

				AdPlugin.prototype.featureName = "ads";

				/** @override
				 */
				AdPlugin.prototype.createModel = function() {
					this.proxy = this.isFullscreenDevice() ? this.createFullscreenProxy() : this.createProxy();
					this.registerProxy(this.proxy);
				};

				/** @override
				 */
				AdPlugin.prototype.createController = function() {
					this.registerCommand(Notifications.CHANGE_MEDIA, AdMediaChangeCommand);
					this.registerCommand(AdNotifications.BREAK_START, AdBreakStartCommand);
					this.registerCommand(AdNotifications.AD_LOADED, AdLoadedCommand);
					this.registerCommand(AdNotifications.BREAK_END, AdBreakEndCommand);
					this.registerCommand(Notifications.SEEK, AdSeekCommand);
					this.registerCommand(UserNotifications.SEEK, AdSeekCommand);
				};

				/** @override
				 */
				AdPlugin.prototype.createView = function() {
					return this.registerMediator(new AdMediator());
				};

				AdPlugin.prototype.isFullscreenDevice = function() {
					return Utils.isFullscreenDevice();
				};

				AdPlugin.prototype.createProxy = function() {};

				AdPlugin.prototype.createFullscreenProxy = function() {};

				/** @override
				 */
				AdPlugin.prototype.registered = function() {
					var bindings;
					AdPlugin.__super__.registered.call(this);
					bindings = this.player.retrieveProxy(DataBindingProxy.NAME);
					bindings.registerContext(this.retrieveProxy(AdProxy.NAME));
				};

				/**
				 */
				AdPlugin.prototype.listNotificationInterests = function() {
					return [Notifications.CHANGE_MEDIA, Notifications.PLAY, Notifications.PAUSE, Notifications.START, Notifications.STARTED, Notifications.ENDED, Notifications.READY, Notifications.SEEK, Notifications.VOLUME_CHANGE, Notifications.FULL_SCREEN_CHANGE, UserNotifications.PLAY, UserNotifications.PAUSE, UserNotifications.SEEK, UserNotifications.TOGGLE_PLAY_PAUSE];
				};

				/**
				 */
				AdPlugin.prototype.listNotificationPublications = function() {
					var key, value;
					return AdPlugin.__super__.listNotificationPublications.call(this).concat((function() {
						var _results;
						_results = [];
						for (key in AdNotifications) {
							value = AdNotifications[key];
							_results.push(value);
						}
						return _results;
					})()).concat([Notifications.PLAY_REQUEST, Notifications.UPDATE_DATA_BINDINGS, Notifications.DISPLAY_TIME, Notifications.ADD_CUE_POINTS, Notifications.DISABLE_FULL_SCREEN]);
				};

				/**
				 */
				AdPlugin.prototype.listNotificationEvents = function() {
					var key, value;
					return AdPlugin.__super__.listNotificationEvents.call(this).concat((function() {
						var _results;
						_results = [];
						for (key in AdNotifications) {
							value = AdNotifications[key];
							_results.push(value);
						}
						return _results;
					})());
				};

				/**
				 * @param {boolean} value The enabled flag.
				 * @expose
				 */
				AdPlugin.prototype.setEnabled = function(value) {
					this.proxy.setEnabled(value);
				};

				/**
				 * @return {boolean} The enabled flag.
				 * @expose
				 */
				AdPlugin.prototype.getEnabled = function() {
					return this.proxy.getEnabled();
				};

				/**
				 * @return {boolean} The in progress flag.
				 * @expose
				 */
				AdPlugin.prototype.getInProgress = function() {
					return this.proxy.getInProgress();
				};

				/**
				 * @return {boolean} The started flag.
				 * @expose
				 */
				AdPlugin.prototype.getStarted = function() {
					return this.proxy.getStarted();
				};

				/**
				 * @return {boolean} The paused flag.
				 * @expose
				 */
				AdPlugin.prototype.getPaused = function() {
					return this.proxy.getPaused();
				};

				/**
				 * @return {Array.<Object>} The list of companion ads.
				 * @expose
				 */
				AdPlugin.prototype.getCompanions = function() {
					return this.proxy.getCompanions();
				};

				/**
				 * @expose
				 */
				AdPlugin.prototype.terminateAd = function() {
					this.proxy.terminateAd();
				};

				/**
				 * @expose
				 */
				AdPlugin.prototype.terminateAllAds = function() {
					this.proxy.terminateAllAds();
				};

				/**
				 * @enum {string}
				 * @const
				 * @private
				 */

				var AutoAdvanceNotifications = {
					TIME_UPDATE: "autoadvancetimeupdate",
					START: "autoadvancestart",
					STOP: "autoadvancestop",
					ADVANCE: "autoadvanceadvance"
				};

				/**
				 * @constructor
				 * @private
				 */
				function AutoAdvanceWrapper(player, config) {
					if (config == null) {
						config = {};
					}
					AutoAdvanceWrapper.__super__.constructor.call(this, player, config);
					if (config.interval != null) {
						this.interval = config.interval;
					}
					if (config.handler != null) {
						this.handler = config.handler;
					}
				}


				__extends(AutoAdvanceWrapper, PluginWrapper);


				AutoAdvanceWrapper.NAME = "AutoAdvanceWrapper";

				AutoAdvanceWrapper.prototype.interval = null;

				AutoAdvanceWrapper.prototype.handler = null;

				AutoAdvanceWrapper.prototype.getInterval = function() {
					return this.interval;
				};

				AutoAdvanceWrapper.prototype.setInterval = function(value) {
					return this.interval = value;
				};

				AutoAdvanceWrapper.prototype.getHandler = function() {
					return this.handler;
				};

				AutoAdvanceWrapper.prototype.setHandler = function(value) {
					return this.handler = value;
				};

				/** @override
				 */
				AutoAdvanceWrapper.prototype.listNotificationInterests = function() {
					return [FlashNotifications.CREATE_FLASH_VARS, FlashNotifications.AUTO_ADVANCE];
				};

				/**
				 */
				AutoAdvanceWrapper.prototype.handleNotification = function(notification) {
					var body, flashvars, name, type, _base;
					name = notification.getName();
					body = notification.getBody();
					switch (name) {
						case FlashNotifications.CREATE_FLASH_VARS:
							flashvars = body.flashvars;
							if (this.interval != null) {
								flashvars.next_video_timer = this.interval;
								flashvars.auto_play_list = true;
							}
							break;
						case FlashNotifications.AUTO_ADVANCE:
							if (typeof (_base = this.config).handler === "function") {
								_base.handler();
							}
							type = "advance";
					}
					if (type != null) {
						this.dispatchEvent(new Event(type));
					}
				};

				/**
				 * @constructor
				 * @private
				 */
				function AutoAdvanceProxy(config) {
					AutoAdvanceProxy.__super__.constructor.call(this, config);
				}


				__extends(AutoAdvanceProxy, ModuleProxy);


				/** @static
				 */
				AutoAdvanceProxy.NAME = ModuleProxy.NAME;

				AutoAdvanceProxy.prototype.defaults = {
					interval: 15,
					handler: null
				};

				AutoAdvanceProxy.prototype.currentTime = 0;

				AutoAdvanceProxy.prototype.timeout = null;

				AutoAdvanceProxy.prototype.start = function() {
					var _this = this;
					this.currentTime = this.data.interval;
					this.timeout = setInterval(function() {
						_this.updateTime();
					}, 1000);
					this.sendNotification(AutoAdvanceNotifications.TIME_UPDATE, this.currentTime);
				};

				AutoAdvanceProxy.prototype.stop = function() {
					clearInterval(this.timeout);
				};

				AutoAdvanceProxy.prototype.updateTime = function() {
					this.currentTime--;
					this.sendNotification(AutoAdvanceNotifications.TIME_UPDATE, this.currentTime);
					if (this.currentTime <= 0) {
						this.stop();
						this.sendNotification(AutoAdvanceNotifications.ADVANCE, this.data.handler);
					}
				};

				/**
				 * The AutoAdvanceStartCommand class.
				 *
				 * @constructor
				 * @private
				 * @extends {puremvc.SimpleCommand}
				 */
				function AutoAdvanceStartCommand() {
					AutoAdvanceStartCommand.__super__.constructor.call(this);
				}


				__extends(AutoAdvanceStartCommand, puremvc.SimpleCommand);


				/**
				 * Executes the command.
				 *
				 * @param {puremvc.Notification} notification
				 *    The notification.
				 *
				 * @override
				 */
				AutoAdvanceStartCommand.prototype.execute = function(notification) {
					var proxy;
					this.sendNotification(Notifications.ADD_APPLICATION_STATE, "autoadvance-mode");
					proxy = this.facade.retrieveProxy(AutoAdvanceProxy.NAME);
					proxy.start();
				};

				/**
				 * The AutoAdvanceAdvanceCommand class.
				 *
				 * @constructor
				 * @private
				 * @extends {puremvc.SimpleCommand}
				 */
				function AutoAdvanceAdvanceCommand() {
					AutoAdvanceAdvanceCommand.__super__.constructor.call(this);
				}


				__extends(AutoAdvanceAdvanceCommand, puremvc.SimpleCommand);


				/**
				 * Executes the command.
				 *
				 * @param {puremvc.Notification} notification
				 *    The notification.
				 *
				 * @override
				 */
				AutoAdvanceAdvanceCommand.prototype.execute = function(notification) {
					var handler, proxy;
					proxy = this.facade.retrieveProxy(AutoAdvanceProxy.NAME);
					handler = notification.getBody();
					if ((handler != null)) {
						if (typeof handler === "string") {
							eval("" + handler + "()");
						} else if (typeof handler === "function") {
							handler();
						}
					}
					this.sendNotification(Notifications.REMOVE_APPLICATION_STATE, "autoadvance-mode");
				};

				/**
				 * The AutoAdvanceEndedCommand class.
				 *
				 * @constructor
				 * @private
				 * @extends {puremvc.SimpleCommand}
				 */
				function AutoAdvanceEndedCommand() {
					AutoAdvanceEndedCommand.__super__.constructor.call(this);
				}


				__extends(AutoAdvanceEndedCommand, puremvc.SimpleCommand);


				/**
				 * Executes the command.
				 *
				 * @param {puremvc.Notification} notification
				 *    The notification.
				 *
				 * @override
				 */
				AutoAdvanceEndedCommand.prototype.execute = function(notification) {
					var data, proxy;
					proxy = this.facade.retrieveProxy(AutoAdvanceProxy.NAME);
					data = proxy.getData();
					if (data.interval != null) {
						this.sendNotification(AutoAdvanceNotifications.START);
					}
				};

				/**
				 * The AutoAdvanceStopCommand class.
				 *
				 * @constructor
				 * @private
				 * @extends {puremvc.SimpleCommand}
				 */
				function AutoAdvanceStopCommand() {
					AutoAdvanceStopCommand.__super__.constructor.call(this);
				}


				__extends(AutoAdvanceStopCommand, puremvc.SimpleCommand);


				/**
				 * Executes the command.
				 *
				 * @param {puremvc.Notification} notification
				 *    The notification.
				 *
				 * @override
				 */
				AutoAdvanceStopCommand.prototype.execute = function(notification) {
					var proxy;
					proxy = this.facade.retrieveProxy(AutoAdvanceProxy.NAME);
					proxy.stop();
				};

				/**
				 * The AutoAdvanceMediator class.
				 *
				 * @constructor
				 * @private
				 * @extends {OverlayMediator}
				 * @param {Object} viewComponent
				 */
				function AutoAdvanceMediator() {
					AutoAdvanceMediator.__super__.constructor.call(this);
				}


				__extends(AutoAdvanceMediator, OverlayMediator);


				AutoAdvanceMediator.prototype.componentName = "autoadvance";

				AutoAdvanceMediator.prototype.text = null;

				AutoAdvanceMediator.prototype.onRegister = function() {
					this.text = this.create("autoadvance-text");
					AutoAdvanceMediator.__super__.onRegister.call(this);
				};

				/**
				 * @override
				 */
				AutoAdvanceMediator.prototype.listNotificationInterests = function() {
					return [AutoAdvanceNotifications.TIME_UPDATE];
				};

				/**
				 * @override
				 */
				AutoAdvanceMediator.prototype.handleNotification = function(notification) {
					var time;
					switch (notification.getName()) {
						case AutoAdvanceNotifications.TIME_UPDATE:
							time = notification.getBody();
							this.text.textContent = "" + (this.localizationManager.getString('MSG_NEXT_VIDEO')) + " " + time + " " + (this.localizationManager.getString('MSG_SECONDS'));
					}
				};

				/**
				 * The AuditudePlugin class.
				 *
				 * @param {Module}  app     The parent module of this plugin.
				 * @constructor
				 * @private
				 * @extends {AdPlugin}
				 */
				function AuditudePlugin() {
					AuditudePlugin.__super__.constructor.call(this);
				}


				__extends(AuditudePlugin, AdPlugin);


				AuditudePlugin.NAME = "AuditudePlugin";

				AuditudePlugin.prototype.moduleName = "auditude";

				AuditudePlugin.prototype.featureName = "ads";

				AuditudePlugin.prototype.createFullscreenProxy = function() {
					return new AuditudeFullscreenProxy(this.config);
				};

				AuditudePlugin.prototype.createProxy = function() {
					return new AuditudeProxy(this.config);
				};

				AuditudePlugin.prototype.isFullscreenDevice = function() {
					return true;
				};


				AMP.registerPlugin("auditude", "html", AuditudePlugin);
				AMP.registerPlugin("auditude", "flash", AuditudeWrapper);

				/**
				 * @enum {string}
				 * @const
				 * @private
				 */

				var RecommendationsNotifications = {
					RECOMMENDATIONS_LOADED: "recommendationsloaded",
					RECOMMENDATION_SELECTED: "recommendationsselected"
				};

				function RecommendationVO(guid, link, title, description, thumbnail, duration, pubDate, target, metadata) {
					this.guid = guid;
					this.link = link;
					this.title = title;
					this.description = description;
					this.thumbnail = thumbnail;
					this.duration = duration;
					this.pubDate = pubDate;
					this.target = target;
					this.metadata = metadata != null ? metadata : {};
				}

				RecommendationVO.prototype.guid = null;

				RecommendationVO.prototype.link = null;

				RecommendationVO.prototype.title = null;

				RecommendationVO.prototype.description = null;

				RecommendationVO.prototype.thumbnail = null;

				RecommendationVO.prototype.duration = null;

				RecommendationVO.prototype.pubDate = null;

				RecommendationVO.prototype.target = null;

				RecommendationVO.prototype.metadata = null;

				/**
				 * @constructor
				 * @private
				 * @extends {PluginWrapper}
				 */
				function RecommendationsWrapper(player, config) {
					if (config == null) {
						config = {};
					}
					RecommendationsWrapper.__super__.constructor.call(this, player, config);
					if (config.url != null) {
						this.url = config.url;
					}
					if (config.target != null) {
						this.target = config.target;
					}
				}


				__extends(RecommendationsWrapper, PluginWrapper);


				RecommendationsWrapper.NAME = "RecommendationsWrapper";

				RecommendationsWrapper.prototype.url = null;

				RecommendationsWrapper.prototype.target = null;

				RecommendationsWrapper.prototype.recommendations = null;

				/**
				 */
				RecommendationsWrapper.prototype.getFeatureName = function() {
					return "recommendations";
				};

				/**
				 */
				RecommendationsWrapper.prototype.getData = function() {
					return this.recommendations;
				};

				RecommendationsWrapper.prototype.setData = function(value) {
					return this.recommendations = value;
				};

				/**
				 */
				RecommendationsWrapper.prototype.getTarget = function() {
					var _ref, _ref1;
					return this.target || ((_ref = this.player) != null ? (_ref1 = _ref.config) != null ? _ref1.target : void 0 : void 0);
				};

				/**
				 */
				RecommendationsWrapper.prototype.getURL = function() {
					return this.url;
				};

				/**
				 */
				RecommendationsWrapper.prototype.createFlashVars = function(flashvars) {
					flashvars.recommendations_partner = "mrss";
					if (this.config.target != null) {
						flashvars.external_target = this.config.target;
					}
				};

				/**
				 */
				RecommendationsWrapper.prototype.createXML = function(xml) {
					var application, recommendations, vendor;
					application = xml.firstChild;
					recommendations = xml.getElementsByTagName("recommendations")[0];
					if (!(recommendations != null)) {
						recommendations = xml.createElement("recommendations");
						application.appendChild(recommendations);
					}
					vendor = xml.createElement("vendor");
					vendor.setAttribute("id", "mrss");
					recommendations.appendChild(vendor);
					this.createProperty(xml, "RECOMMENDATIONS_MRSS_URL", this.url, vendor);
				};

				/** @override
				 */
				RecommendationsWrapper.prototype.listNotificationInterests = function() {
					return RecommendationsWrapper.__super__.listNotificationInterests.apply(this, arguments).concat([FlashNotifications.RECOMMENDATION_SELECTED, FlashNotifications.RECOMMENDATIONS_LOADED]);
				};

				/**
				 */
				RecommendationsWrapper.prototype.handleNotification = function(notification) {
					var body, name, type;
					RecommendationsWrapper.__super__.handleNotification.call(this, notification);
					name = notification.getName();
					body = notification.getBody();
					switch (name) {
						case FlashNotifications.RECOMMENDATIONS_LOADED:
							type = "loaded";
							this.recommendations = body;
							break;
						case FlashNotifications.RECOMMENDATION_SELECTED:
							type = "selected";
					}
					if (type != null) {
						this.dispatchEvent(new Event(type, body));
					}
				};

				/**
				 * The RecommendationsSelectedCommand class.
				 *
				 * @constructor
				 * @private
				 * @extends {puremvc.SimpleCommand}
				 */
				function RecommendationSelectedCommand() {
					RecommendationSelectedCommand.__super__.constructor.call(this);
				}


				__extends(RecommendationSelectedCommand, puremvc.SimpleCommand);


				/**
				 * Executes the command.
				 *
				 * @param {puremvc.Notification} notification
				 *    The notification.
				 *
				 * @override
				 */
				RecommendationSelectedCommand.prototype.execute = function(notification) {
					var rec, recProxy;
					recProxy = this.facade.retrieveProxy(RecommendationsProxy.NAME);
					rec = notification.getBody();
					if (rec.target !== "none" && rec.target !== "player") {
						window.open(rec.link, rec.target);
					}
				};

				/**
				 * The RecommendationsPlayCommand class.
				 *
				 * @constructor
				 * @private
				 * @extends {puremvc.SimpleCommand}
				 */
				function RecommendationsPlayCommand() {
					RecommendationsPlayCommand.__super__.constructor.call(this);
				}


				__extends(RecommendationsPlayCommand, puremvc.SimpleCommand);


				/**
				 * Executes the command.
				 *
				 * @param {puremvc.Notification} notification
				 *    The notification.
				 *
				 * @override
				 */
				RecommendationsPlayCommand.prototype.execute = function(notification) {
					var recommendationsProxy;
					recommendationsProxy = this.facade.retrieveProxy(RecommendationsProxy.NAME);
					recommendationsProxy.invoke();
				};

				/**
				 * The RecommendationsPlayStateChangeCommand class.
				 *
				 * @constructor
				 * @private
				 * @extends {puremvc.SimpleCommand}
				 */
				function RecommendationsPlayStateChangeCommand() {
					RecommendationsPlayStateChangeCommand.__super__.constructor.call(this);
				}


				__extends(RecommendationsPlayStateChangeCommand, puremvc.SimpleCommand);


				/**
				 * Executes the command.
				 *
				 * @param {puremvc.Notification} notification
				 *    The notification.
				 *
				 * @override
				 */
				RecommendationsPlayStateChangeCommand.prototype.execute = function(notification) {
					var recommendations, recommendationsProxy, states;
					recommendationsProxy = this.facade.retrieveProxy(RecommendationsProxy.NAME);
					recommendations = recommendationsProxy.getRecommendations();
					states = notification.getBody();
					if (states.newState === PlayState.ENDED) {
						if ((recommendations != null ? recommendations.length : void 0) > 0) {
							this.facade.sendNotification(Notifications.ADD_APPLICATION_STATE, "recommendations-mode");
						}
					} else if (states.oldState === PlayState.ENDED) {
						if ((recommendations != null ? recommendations.length : void 0) > 0) {
							this.facade.sendNotification(Notifications.REMOVE_APPLICATION_STATE, "recommendations-mode");
						}
					}
				};

				/**
				 * Proxy for recommendations feature
				 *
				 * @constructor
				 * @private
				 */
				function RecommendationsProxy(config) {
					RecommendationsProxy.__super__.constructor.call(this, config);
					this.helper = new MRSSHelper();
				}


				__extends(RecommendationsProxy, PluginProxy);


				/** @static
				 */
				RecommendationsProxy.NAME = ModuleProxy.NAME;

				RecommendationsProxy.prototype.defaults = {
					url: null,
					target: "_blank"
				};

				RecommendationsProxy.prototype.loaded = true;

				RecommendationsProxy.prototype.recommendations = null;

				RecommendationsProxy.prototype.helper = null;

				/** Getter/Setter for RecommendationVO.
				 */
				RecommendationsProxy.prototype.getRecommendations = function() {
					return this.recommendations;
				};

				RecommendationsProxy.prototype.setRecommendations = function(value) {
					this.recommendations = value;
					this.sendNotification(RecommendationsNotifications.RECOMMENDATIONS_LOADED, this.recommendations);
					return value;
				};

				RecommendationsProxy.prototype.getURL = function() {
					return this.getConfigurationData().url;
				};

				RecommendationsProxy.prototype.setURL = function(value) {
					this.data.url = value;
					this.invoke();
					return value;
				};

				RecommendationsProxy.prototype.getTarget = function() {
					return this.getConfigurationData().target || this.facade.player.retrieveProxy(ConfigurationProxy.NAME).getTarget();
				};

				RecommendationsProxy.prototype.setTarget = function(value) {
					this.data.target = value;
					return value;
				};

				/**
				 *
				 *
				 * @param {String} value
				 *    The new display state of the player
				 * @returns {String}
				 *    The display state of the player
				 * @type {String}
				 */
				RecommendationsProxy.prototype.invoke = function() {
					var url, xhr;
					url = this.getURL();
					if (!(url != null) || url === "") {
						this.facade.logger.error("[AMP RECOMMENDATIONS ERROR]", "Load Error: No url provided");
						return;
					}
					xhr = Utils.getJson(url, this.onload.bind(this), this.onerror.bind(this));
				};

				RecommendationsProxy.prototype.onload = function(json) {
					var recs;
					recs = this.createRecommendations(json);
					this.setRecommendations(recs);
				};

				RecommendationsProxy.prototype.onerror = function(error) {
					this.facade.logger.error("[AMP RECOMMENDATIONS ERROR]", "Load Error:", error);
				};

				/**
				 */
				RecommendationsProxy.prototype.createRecommendations = function(feed) {
					var item, rec, recs, _i, _len, _ref;
					feed = this.helper.createFeed(feed);
					recs = [];
					_ref = feed.item;
					for (_i = 0, _len = _ref.length; _i < _len; _i++) {
						item = _ref[_i];
						rec = new RecommendationVO(item.guid, item.link, item.title, item.description, item.thumbnail, item.duration, item.pubDate, this.getTarget(), item);
						recs.push(rec);
					}
					return recs;
				};

				/**
				 * The RecommendationsMediator class.
				 *
				 * @constructor
				 * @private
				 * @extends {OverlayMediator}
				 */
				function RecommendationsMediator() {
					RecommendationsMediator.__super__.constructor.call(this);
				}


				__extends(RecommendationsMediator, OverlayMediator);


				RecommendationsMediator.prototype.componentName = "recommendations";

				RecommendationsMediator.prototype.listArea = null;

				/**
				 * @override
				 */
				RecommendationsMediator.prototype.onRegister = function() {
					var label;
					label = this.createText("recommendations-label", "Recommended");
					this.listArea = this.create("recommendations-list-area");
					RecommendationsMediator.__super__.onRegister.call(this);
				};

				/**
				 * @override
				 */
				RecommendationsMediator.prototype.listNotificationInterests = function() {
					return [RecommendationsNotifications.RECOMMENDATIONS_LOADED];
				};

				/**
				 * @override
				 */
				RecommendationsMediator.prototype.handleNotification = function(notification) {
					var rec, recs, _i, _len;
					switch (notification.getName()) {
						case RecommendationsNotifications.RECOMMENDATIONS_LOADED:
							this.listArea.innerHTML = "";
							recs = notification.getBody();
							if ((recs != null) && recs.length > 0) {
								for (_i = 0, _len = recs.length; _i < _len; _i++) {
									rec = recs[_i];
									this.addElement(rec);
								}
							}
					}
				};

				RecommendationsMediator.prototype.addElement = function(recommendation) {
					var listItem,
						_this = this;
					listItem = this.create("recommendation", this.listArea);
					if (listItem.dataset == null) {
						listItem.dataset = {};
					}
					listItem.dataset.link = recommendation.link;
					listItem.dataset.target = recommendation.target;
					listItem.innerHTML = "<img src='" + recommendation.thumbnail + "' class='" + this.cssPrefix + "recommendation-thumbnail' /> <span class='" + this.cssPrefix + "recommendation-text'>" + recommendation.description + "</span>";
					listItem.onclick = function(event) {
						event.stopImmediatePropagation();
						_this.sendNotification(RecommendationsNotifications.RECOMMENDATION_SELECTED, event.currentTarget.dataset);
						return false;
					};
				};

				/**
				 * The AutoadvancePlugin class.
				 *
				 * @param {Module}  app     The parent module of this plugin.
				 * @constructor
				 * @private
				 * @extends {Plugin}
				 */
				function AutoAdvancePlugin() {
					AutoAdvancePlugin.__super__.constructor.call(this);
				}


				__extends(AutoAdvancePlugin, Plugin);


				AutoAdvancePlugin.NAME = "AutoAdvancePlugin";

				AutoAdvancePlugin.prototype.moduleName = "autoadvance";

				/** @override
				 */
				AutoAdvancePlugin.prototype.createController = function() {
					AutoAdvancePlugin.__super__.createController.call(this);
					this.registerCommand(AutoAdvanceNotifications.START, AutoAdvanceStartCommand);
					this.registerCommand(AutoAdvanceNotifications.ADVANCE, AutoAdvanceAdvanceCommand);
					this.registerCommand(Notifications.ENDED, AutoAdvanceEndedCommand);
					this.registerCommand(Notifications.CHANGE_MEDIA, AutoAdvanceStopCommand);
					this.registerCommand(Notifications.PLAY, AutoAdvanceStopCommand);
					this.registerCommand(Notifications.PLAYING, AutoAdvanceStopCommand);
					this.registerCommand(Notifications.REPLAY, AutoAdvanceStopCommand);
				};

				/** @override
				 */
				AutoAdvancePlugin.prototype.createModel = function() {
					this.registerProxy(new AutoAdvanceProxy(this.config));
				};

				/** @override
				 */
				AutoAdvancePlugin.prototype.createView = function() {
					this.registerMediator(new AutoAdvanceMediator());
				};

				/** @override
				 */
				AutoAdvancePlugin.prototype.listNotificationInterests = function() {
					return [Notifications.ENDED, Notifications.CHANGE_MEDIA, Notifications.PLAY, Notifications.PLAYING, Notifications.REPLAY];
				};

				/**
				 */
				AutoAdvancePlugin.prototype.listNotificationPublications = function() {
					var key, value;
					return AutoAdvancePlugin.__super__.listNotificationPublications.call(this).concat((function() {
						var _results;
						_results = [];
						for (key in AutoAdvanceNotifications) {
							value = AutoAdvanceNotifications[key];
							_results.push(value);
						}
						return _results;
					})());
				};

				/**
				 */
				AutoAdvancePlugin.prototype.listNotificationEvents = function() {
					var key, value;
					return AutoAdvancePlugin.__super__.listNotificationEvents.call(this).concat((function() {
						var _results;
						_results = [];
						for (key in AutoAdvanceNotifications) {
							value = AutoAdvanceNotifications[key];
							_results.push(value);
						}
						return _results;
					})());
				};


				AMP.registerPlugin("autoadvance", "html", AutoAdvancePlugin);
				AMP.registerPlugin("autoadvance", "flash", AutoAdvanceWrapper);

				/**
				 * The AdChoicesMediator class.
				 *
				 * @constructor
				 * @private
				 * @extends {LocalizedMediator}
				 */
				function RecommendationsGridMediator() {
					RecommendationsGridMediator.__super__.constructor.call(this);
				}


				__extends(RecommendationsGridMediator, OverlayMediator);


				RecommendationsGridMediator.prototype.componentName = "recommendations-grid";

				RecommendationsGridMediator.prototype.grid = null;

				RecommendationsGridMediator.prototype.onRegister = function() {
					var label;
					label = this.createText("recommendations-grid-label", this.localizationManager.getString(LocalizationConstants.MSG_RECOMMENDATIONS_TITLE));
					this.grid = this.create("recommendations-grid-table-grid", this, "table");
					RecommendationsGridMediator.__super__.onRegister.call(this);
				};

				/**
				 * @override
				 */
				RecommendationsGridMediator.prototype.listNotificationInterests = function() {
					return [RecommendationsNotifications.RECOMMENDATIONS_LOADED];
				};

				/**
				 * @override
				 */
				RecommendationsGridMediator.prototype.handleNotification = function(notification) {
					var rec, recs, _i, _len;
					switch (notification.getName()) {
						case RecommendationsNotifications.RECOMMENDATIONS_LOADED:
							this.grid.innerHTML = "";
							this.create("recommendations-grid-row", this.grid, "tr");
							this.create("recommendations-grid-row", this.grid, "tr");
							recs = notification.getBody();
							if ((recs != null) && recs.length > 0) {
								for (_i = 0, _len = recs.length; _i < _len; _i++) {
									rec = recs[_i];
									this.addElement(rec, _i);
								}
							}
					}
				};

				RecommendationsGridMediator.prototype.addElement = function(recommendation, recommendedIndex) {
					var gridRowIndex, td,
						_this = this;
					gridRowIndex = (recommendedIndex % 4) < 2 ? 0 : 1;
					td = this.create("recommendations-grid-item", this.grid.childNodes[gridRowIndex], "td");
					if (td.dataset == null) {
						td.dataset = {};
					}
					td.dataset.link = recommendation.link;
					td.dataset.target = this.config.getTarget();
					td.innerHTML = "<img src='" + recommendation.thumbnail + "' class='" + this.cssPrefix + "recommendations-grid-thumbnail' /> <span class='" + this.cssPrefix + "recommendations-grid-text'>" + recommendation.description + "</span>";
					td.onclick = function(event) {
						event.stopImmediatePropagation();
						_this.sendNotification(RecommendationsNotifications.RECOMMENDATION_SELECTED, event.currentTarget.dataset);
						return false;
					};
				};

				/**
				 * The RecommendationsPlugin class.
				 *
				 * @param {Module}  app     The parent module of this plugin.
				 * @constructor
				 * @private
				 * @extends {Plugin}
				 */
				function RecommendationsPlugin() {
					RecommendationsPlugin.__super__.constructor.call(this);
				}


				__extends(RecommendationsPlugin, Feature);


				RecommendationsPlugin.prototype.featureName = "recommendations";

				RecommendationsPlugin.prototype.moduleName = "recommendations";

				/** @override
				 */
				RecommendationsPlugin.prototype.createController = function() {
					this.registerCommand(RecommendationsNotifications.RECOMMENDATION_SELECTED, RecommendationSelectedCommand);
					this.registerCommand(Notifications.START, RecommendationsPlayCommand);
					this.registerCommand(Notifications.PLAY_STATE_CHANGE, RecommendationsPlayStateChangeCommand);
				};

				/** @override
				 */
				RecommendationsPlugin.prototype.createModel = function() {
					this.proxy = new RecommendationsProxy(this.config);
					this.registerProxy(this.proxy);
				};

				/** @override
				 */
				RecommendationsPlugin.prototype.createView = function() {
					this.registerMediator(new RecommendationsMediator());
				};

				/**
				 */
				RecommendationsPlugin.prototype.listNotificationInterests = function() {
					return [Notifications.START, Notifications.PLAY_STATE_CHANGE];
				};

				/**
				 */
				RecommendationsPlugin.prototype.listNotificationPublications = function() {
					var key, value;
					return RecommendationsPlugin.__super__.listNotificationPublications.call(this).concat((function() {
						var _results;
						_results = [];
						for (key in RecommendationsNotifications) {
							value = RecommendationsNotifications[key];
							_results.push(value);
						}
						return _results;
					})());
				};

				/**
				 */
				RecommendationsPlugin.prototype.listNotificationEvents = function() {
					var key, value;
					return RecommendationsPlugin.__super__.listNotificationEvents.call(this).concat((function() {
						var _results;
						_results = [];
						for (key in RecommendationsNotifications) {
							value = RecommendationsNotifications[key];
							_results.push(value);
						}
						return _results;
					})());
				};

				/**
				 * @param {string} value The url of the feed.
				 * @expose
				 */
				RecommendationsPlugin.prototype.setURL = function(value) {
					this.proxy.set(value);
				};

				/**
				 * @return {string} The url of the feed.
				 * @expose
				 */
				RecommendationsPlugin.prototype.getURL = function() {
					return this.proxy.getURL();
				};

				/**
				 * @return {Object} The MRSS feed object.
				 * @expose
				 */
				RecommendationsPlugin.prototype.getData = function() {
					return this.proxy.getData();
				};

				/**
				 * @param {Object} value The MRSS feed object
				 * @expose
				 */
				RecommendationsPlugin.prototype.setData = function(value) {
					this.proxy.setData(value);
				};

				/**
				 * @return {string} The window target for recommendations.
				 * @expose
				 */
				RecommendationsPlugin.prototype.getTarget = function() {
					return this.proxy.getTarget();
				};

				/**
				 * @param {string} value The window target for recommendations.
				 * @expose
				 */
				RecommendationsPlugin.prototype.setTarget = function(value) {
					this.proxy.setTarget(value);
				};


				AMP.registerPlugin("recommendations", "html", RecommendationsPlugin);
				AMP.registerPlugin("recommendations", "flash", RecommendationsWrapper);

				/**
				 * @constructor
				 * @private
				 */
				function NielsenProxy(config) {
					NielsenProxy.__super__.constructor.call(this, config);
				}


				__extends(NielsenProxy, DataBoundConfigurationProxy);


				NielsenProxy.prototype.configurationName = "nielsen";

				/** @static
				 */
				NielsenProxy.NAME = ModuleProxy.NAME;

				NielsenProxy.cg = "OnDemand";

				NielsenProxy.url = "http://secure-us.imrworldwide.com/cgi-bin/m";

				NielsenProxy.prototype.defaults = {
					url: null,
					data: {
						ci: null,
						c6: null,
						cg: null,
						tl: null
					},
					events: null
				};

				NielsenProxy.prototype.getTitle = function() {
					return this.title;
				};

				NielsenProxy.prototype.setTitle = function(value) {
					return this.title = value;
				};

				/**
				 */
				NielsenProxy.prototype.start = function() {
					var url;
					url = this.constructURL("video", "started");
					Utils.beacon(url);
				};

				NielsenProxy.prototype.end = function() {
					var url;
					url = this.constructURL("video", "ended");
					Utils.beacon(url);
				};

				NielsenProxy.prototype.constructURL = function(target, type) {
					var c6, cg, ci, event, events, item, tl, url, _i, _len, _ref, _ref1, _ref2, _ref3, _ref4;
					url = this.url || NielsenProxy.url;
					events = (_ref = this.value.events) != null ? _ref[target] : void 0;
					if (events != null) {
						for (_i = 0, _len = events.length; _i < _len; _i++) {
							item = events[_i];
							if (item.type === type) {
								event = item;
							}
						}
					}
					ci = (event != null ? (_ref1 = event.data) != null ? _ref1.ci : void 0 : void 0) || this.value.data.ci;
					c6 = (event != null ? (_ref2 = event.data) != null ? _ref2.c6 : void 0 : void 0) || this.value.data.c6;
					cg = (event != null ? (_ref3 = event.data) != null ? _ref3.cg : void 0 : void 0) || this.value.data.cg || NielsenProxy.cg;
					tl = (event != null ? (_ref4 = event.data) != null ? _ref4.tl : void 0 : void 0) || this.value.data.tl;
					return "" + url + "?ci=" + ci + "&c6=" + c6 + "&cc=1&tl=" + tl + "&cg=" + cg + "&rnd=" + (Date.now());
				};

				function NielsenWrapper() {
					return NielsenWrapper.__super__.constructor.apply(this, arguments);
				}


				__extends(NielsenWrapper, PluginWrapper);


				NielsenWrapper.NAME = "NielsenWrapper";

				/** @override
				 */
				NielsenWrapper.prototype.createXML = function(xml) {
					var application, element, event, events, map, metrics, node, prop, props, text, txtTest, type, urlElement, vendor, _i, _j, _len, _len1, _ref, _ref1, _ref2, _ref3;
					if (!(((_ref = this.config) != null ? _ref.events : void 0) != null)) {
						return;
					}
					application = xml.firstChild;
					metrics = xml.getElementsByTagName("metrics")[0];
					vendor = xml.createElement("vendor");
					vendor.setAttribute("id", "nielsen");
					metrics.appendChild(vendor);
					map = {
						ads: {
							started: "adStart",
							ended: "adComplete"
						},
						video: {
							started: "videoStart",
							ended: "videoComplete"
						}
					};
					props = [
						{
							value: "ci",
							key: "NIELSEN_CI"
						}, {
							value: "cg",
							key: "NIELSEN_CG"
						}, {
							value: "tl",
							key: "NIELSEN_TL"
						}, {
							value: "c6",
							key: "NIELSEN_C6"
						}
					];
					if (this.config.url != null) {
						urlElement = xml.createElement("property");
						urlElement.setAttribute("key", "serviceURL");
						txtTest = XMLUtils.createTextContent(xml, this.config.url.toString());
						urlElement.appendChild(txtTest);
						vendor.appendChild(urlElement);
					}
					_ref1 = this.config.events;
					for (type in _ref1) {
						events = _ref1[type];
						if ((events != null) && events.length > 0) {
							for (_i = 0, _len = events.length; _i < _len; _i++) {
								event = events[_i];
								node = xml.createElement("property");
								node.setAttribute("key", map[type][event.type]);
								vendor.appendChild(node);
								for (_j = 0, _len1 = props.length; _j < _len1; _j++) {
									prop = props[_j];
									text = ((_ref2 = event.data) != null ? _ref2[prop.value] : void 0) || ((_ref3 = this.config.data) != null ? _ref3[prop.value] : void 0);
									if ((text != null) && text !== "") {
										element = xml.createElement("property");
										element.setAttribute("key", prop.key);
										text = XMLUtils.createTextContent(xml, text);
										element.appendChild(text);
										node.appendChild(element);
									}
								}
							}
						}
					}
					return xml;
				};

				/**
				 * The NielsenEndCommand class.
				 *
				 * @constructor
				 * @private
				 * @extends {puremvc.SimpleCommand}
				 */
				function NielsenEndCommand() {
					NielsenEndCommand.__super__.constructor.call(this);
				}


				__extends(NielsenEndCommand, puremvc.SimpleCommand);


				/**
				 * Executes the command.
				 *
				 * @param {puremvc.Notification} notification
				 *    The notification.
				 *
				 * @override
				 */
				NielsenEndCommand.prototype.execute = function(notification) {
					var nielsen;
					nielsen = this.facade.retrieveProxy(NielsenProxy.NAME);
					nielsen.end();
				};

				/**
				 * The NielsenStartCommand class.
				 *
				 * @constructor
				 * @private
				 * @extends {puremvc.SimpleCommand}
				 */
				function NielsenStartCommand() {
					NielsenStartCommand.__super__.constructor.call(this);
				}


				__extends(NielsenStartCommand, puremvc.SimpleCommand);


				/**
				 * Executes the command.
				 *
				 * @param {puremvc.Notification} notification
				 *    The notification.
				 *
				 * @override
				 */
				NielsenStartCommand.prototype.execute = function(notification) {
					var nielsen;
					nielsen = this.facade.retrieveProxy(NielsenProxy.NAME);
					nielsen.start();
				};

				/**
				 * The RecommendationsGridPlugin class.
				 *
				 * @param {Module}  app     The parent module of this plugin.
				 * @constructor
				 * @private
				 * @extends {RecommendationsPlugin}
				 */
				function RecommendationsGridPlugin() {
					RecommendationsGridPlugin.__super__.constructor.call(this);
				}


				__extends(RecommendationsGridPlugin, RecommendationsPlugin);


				RecommendationsGridPlugin.prototype.moduleName = "recommendationsgrid";

				/** @override
				 */
				RecommendationsGridPlugin.prototype.createView = function() {
					this.registerMediator(new RecommendationsGridMediator());
				};


				AMP.registerPlugin("recommendationsgrid", "html", RecommendationsGridPlugin);
				AMP.registerPlugin("recommendationsgrid", "flash", RecommendationsWrapper);

				function NielsensdkWrapper() {
					return NielsensdkWrapper.__super__.constructor.apply(this, arguments);
				}


				__extends(NielsensdkWrapper, PluginWrapper);


				NielsensdkWrapper.NAME = "NielsensdkWrapper";

				/** @override
				 */
				NielsensdkWrapper.prototype.createXML = function(xml) {
					var application, element, event, events, map, metrics, node, pluginProp, pluginProps, prop, props, text, type, vendor, _i, _j, _k, _len, _len1, _len2, _ref, _ref1, _ref2, _ref3;
					if (!(((_ref = this.config) != null ? _ref.events : void 0) != null)) {
						return;
					}
					application = xml.firstChild;
					metrics = xml.getElementsByTagName("metrics")[0];
					if (!(metrics != null)) {
						metrics = xml.createElement("metrics");
						application.appendChild(metrics);
					}
					vendor = xml.createElement("vendor");
					vendor.setAttribute("id", "nielsenSDK");
					metrics.appendChild(vendor);
					map = {
						ads: {
							started: "adStart",
							ended: "adComplete"
						},
						video: {
							started: "videoStart",
							resume: "videoResume",
							ended: "videoComplete"
						}
					};
					props = [
						{
							value: "censusCategory",
							key: "NIELSEN_CENSUS_CATEGORY"
						}, {
							value: "category",
							key: "NIELSEN_CATEGORY"
						}, {
							value: "episodeTitle",
							key: "NIELSEN_EPISODE_TITLE"
						}, {
							value: "videoType",
							key: "NIELSEN_VIDEO_TYPE"
						}, {
							value: "length",
							key: "NIELSEN_LENGTH"
						}, {
							value: "assetId",
							key: "NIELSEN_ASSET_ID"
						}, {
							value: "dprFlag",
							key: "NIELSEN_DPR_FLAG"
						}
					];
					pluginProps = [
						{
							value: "apid",
							key: "NIELSEN_APID"
						}, {
							value: "sfcode",
							key: "NIELSEN_SF_CODE"
						}, {
							value: "apn",
							key: "NIELSEN_APN"
						}, {
							value: "fbTag",
							key: "NIELSEN_FBTAG"
						}
					];
					for (_i = 0, _len = pluginProps.length; _i < _len; _i++) {
						pluginProp = pluginProps[_i];
						if (this.config.data[pluginProp.value] != null) {
							this.createProperty(xml, pluginProp.key, this.config.data[pluginProp.value], vendor);
						}
					}
					_ref1 = this.config.events;
					for (type in _ref1) {
						events = _ref1[type];
						if ((events != null) && events.length > 0) {
							for (_j = 0, _len1 = events.length; _j < _len1; _j++) {
								event = events[_j];
								node = xml.createElement("property");
								node.setAttribute("key", map[type][event.type]);
								vendor.appendChild(node);
								for (_k = 0, _len2 = props.length; _k < _len2; _k++) {
									prop = props[_k];
									text = ((_ref2 = event.data) != null ? _ref2[prop.value] : void 0) || ((_ref3 = this.config.data) != null ? _ref3[prop.value] : void 0);
									if ((text != null) && text !== "") {
										element = xml.createElement("property");
										element.setAttribute("key", prop.key);
										text = XMLUtils.createTextContent(xml, text);
										element.appendChild(text);
										node.appendChild(element);
									}
								}
							}
						}
					}
					return xml;
				};

				/**
				 * @constructor
				 * @private
				 */
				function NielsensdkProxy(config) {
					NielsensdkProxy.__super__.constructor.call(this, config);
				}


				__extends(NielsensdkProxy, PluginProxy);


				/** @static
				 */
				NielsensdkProxy.NAME = ModuleProxy.NAME;

				NielsensdkProxy.prototype.defaults = {
					data: null,
					events: null,
					plugin: {
						js: "http://secure-us.imrworldwide.com/novms/js/2/ggcmb400.js"
					}
				};

				NielsensdkProxy.prototype.nielsensdkSDK = null;

				NielsensdkProxy.prototype.cur_position = 0;

				NielsensdkProxy.prototype.timer = null;

				NielsensdkProxy.prototype.queryInterval = 2;

				NielsensdkProxy.prototype.isLive = null;

				/** Overrides
				 */
				NielsensdkProxy.prototype.initialize = function() {
					NielsensdkProxy.__super__.initialize.call(this);
					this.nielsensdkSDK = new NOLCMB.ggInitialize(this.value.data);
				};

				/** Populate Nielsen VO
				 */
				NielsensdkProxy.prototype.generateNielsenVO = function(adVO, eventName) {
					var event, events, key, media, type, vo, _i, _len, _ref;
					if (adVO == null) {
						adVO = null;
					}
					if (eventName == null) {
						eventName = null;
					}
					vo = new Object();
					media = this.facade.player.getMedia();
					this.isLive = media.isLive;
					vo.assetid = media.guid;
					vo.category = media.category;
					vo.censuscategory = media.category;
					vo.dprflag = "true";
					vo.episodetitle = media.title ? media.title : episode_url;
					vo.length = adVO != null ? adVO.duration : String(media.duration.toFixed(1)) === "NaN" ? 86400 : String(media.duration.toFixed(1));
					vo.videotype = adVO != null ? adVO.type : "content";
					_ref = this.value.events;
					for (type in _ref) {
						events = _ref[type];
						if ((eventName != null) && (events != null) && events.length > 0) {
							for (_i = 0, _len = events.length; _i < _len; _i++) {
								event = events[_i];
								if ((event != null ? event.type : void 0) === eventName) {
									for (key in event.data) {
										vo[key.toLowerCase()] = event.data[key];
									}
								}
							}
						}
					}
					return vo;
				};

				/** MetaData Loaded
				 */
				NielsensdkProxy.prototype.metaLoad = function() {
					this.nielsensdkSDK.ggPM("15", this.generateNielsenVO());
					this.facade.logger.log("[AMP Nielsensdk Event] : loadMetadata");
				};

				NielsensdkProxy.prototype.adStart = function(adVO) {
					if ((adVO != null ? adVO.type : void 0) === "midroll") {
						this.nielsensdkSDK.ggPM("7", this.generateNielsenVO());
						this.facade.logger.log("[AMP Nielsensdk Event] : stop");
					}
					this.nielsensdkSDK.ggPM("15", this.generateNielsenVO(adVO));
					this.facade.logger.log("[AMP Nielsensdk Event] : Ad Start");
				};

				NielsensdkProxy.prototype.adEnd = function(adVO) {
					this.nielsensdkSDK.ggPM("7", this.generateNielsenVO(adVO));
					this.facade.logger.log("[AMP Nielsensdk Event] : Ad End");
					if ((adVO != null ? adVO.type : void 0) === "midroll") {
						this.nielsensdkSDK.ggPM("15", this.generateNielsenVO());
						this.facade.logger.log("[AMP Nielsensdk Event] : Video Resume");
					}
				};

				/** Media Started
				 */
				NielsensdkProxy.prototype.start = function(adVO) {
					if (adVO == null) {
						adVO = null;
					}
					if ((adVO != null ? adVO.type : void 0) === "midroll") {
						this.nielsensdkSDK.ggPM("15", this.generateNielsenVO(adVO, 'resume'));
						this.facade.logger.log("[AMP Nielsensdk Event] : Content Resume");
					} else {
						this.nielsensdkSDK.ggPM("15", this.generateNielsenVO(null, 'started'));
						this.facade.logger.log("[AMP Nielsensdk Event] : Content Play");
					}
				};

				/** Media Ended
				 */
				NielsensdkProxy.prototype.end = function() {
					var currentTime;
					currentTime = this.facade.player.getCurrentTime().toFixed(1);
					this.nielsensdkSDK.ggPM("57", currentTime);
					this.facade.logger.log("[AMP Nielsensdk Event] : Video Ended");
					this.cur_position = 0;
				};

				/** Time update
				 */
				NielsensdkProxy.prototype.timeupdate = function() {
					if (this.isLive) {
						this.nielsensdkSDK.ggPM("49", Math.floor(Date.now() / 1000));
						this.facade.logger.log("[AMP nielsensdk Event] : timeupdate Live");
					} else {
						this.cur_position = this.facade.player.getCurrentTime().toFixed(1);
						if (Math.abs(this.timer - this.cur_position) > this.queryInterval) {
							this.timer = this.cur_position;
							this.nielsensdkSDK.ggPM("49", this.cur_position);
							this.facade.logger.log("[AMP Nielsensdk Event] : timeupdate", this.cur_position);
						}
					}
				};

				/**
				 * The NielsensdkStartCommand class.
				 *
				 * @constructor
				 * @private
				 * @extends {puremvc.SimpleCommand}
				 */
				function NielsensdkStartCommand() {
					NielsensdkStartCommand.__super__.constructor.call(this);
				}


				__extends(NielsensdkStartCommand, puremvc.SimpleCommand);


				/**
				 * Executes the command.
				 *
				 * @param {puremvc.Notification} notification
				 *    The notification.
				 *
				 * @override
				 */
				NielsensdkStartCommand.prototype.execute = function(notification) {
					var nielsensdk;
					nielsensdk = this.facade.retrieveProxy(NielsensdkProxy.NAME);
					nielsensdk.start();
				};

				/**
				 * The NielsensdkAdStartCommand class.
				 *
				 * @constructor
				 * @private
				 * @extends {puremvc.SimpleCommand}
				 */
				function NielsensdkAdStartCommand() {
					NielsensdkAdStartCommand.__super__.constructor.call(this);
				}


				__extends(NielsensdkAdStartCommand, puremvc.SimpleCommand);


				/**
				 * Executes the command.
				 *
				 * @param {puremvc.Notification} notification
				 *    The notification.
				 *
				 * @override
				 */
				NielsensdkAdStartCommand.prototype.execute = function(notification) {
					var nielsensdk;
					nielsensdk = this.facade.retrieveProxy(NielsensdkProxy.NAME);
					nielsensdk.adStart(notification.body);
				};

				/**
				 * The NielsensdkAdEndCommand class.
				 *
				 * @constructor
				 * @private
				 * @extends {puremvc.SimpleCommand}
				 */
				function NielsensdkAdEndCommand() {
					NielsensdkAdEndCommand.__super__.constructor.call(this);
				}


				__extends(NielsensdkAdEndCommand, puremvc.SimpleCommand);


				/**
				 * Executes the command.
				 *
				 * @param {puremvc.Notification} notification
				 *    The notification.
				 *
				 * @override
				 */
				NielsensdkAdEndCommand.prototype.execute = function(notification) {
					var nielsensdk;
					nielsensdk = this.facade.retrieveProxy(NielsensdkProxy.NAME);
					nielsensdk.adEnd(notification.body);
				};

				/**
				 * The NielsensdkEndCommand class.
				 *
				 * @constructor
				 * @private
				 * @extends {puremvc.SimpleCommand}
				 */
				function NielsensdkEndCommand() {
					NielsensdkEndCommand.__super__.constructor.call(this);
				}


				__extends(NielsensdkEndCommand, puremvc.SimpleCommand);


				/**
				 * Executes the command.
				 *
				 * @param {puremvc.Notification} notification
				 *    The notification.
				 *
				 * @override
				 */
				NielsensdkEndCommand.prototype.execute = function(notification) {
					var nielsensdk;
					nielsensdk = this.facade.retrieveProxy(NielsensdkProxy.NAME);
					nielsensdk.end();
				};

				/**
				 * The NielsensdkMetaloadCommand class.
				 *
				 * @constructor
				 * @private
				 * @extends {puremvc.SimpleCommand}
				 */
				function NielsensdkMetaloadCommand() {
					NielsensdkMetaloadCommand.__super__.constructor.call(this);
				}


				__extends(NielsensdkMetaloadCommand, puremvc.SimpleCommand);


				/**
				 * Executes the command.
				 *
				 * @param {puremvc.Notification} notification
				 *    The notification.
				 *
				 * @override
				 */
				NielsensdkMetaloadCommand.prototype.execute = function(notification) {
					var nielsensdk;
					nielsensdk = this.facade.retrieveProxy(NielsensdkProxy.NAME);
					nielsensdk.metaLoad();
				};

				/**
				 * The NielsensdkTimeupdateCommand class.
				 *
				 * @constructor
				 * @private
				 * @extends {puremvc.SimpleCommand}
				 */
				function NielsensdkTimeupdateCommand() {
					NielsensdkTimeupdateCommand.__super__.constructor.call(this);
				}


				__extends(NielsensdkTimeupdateCommand, puremvc.SimpleCommand);


				/**
				 * Executes the command.
				 *
				 * @param {puremvc.Notification} notification
				 *    The notification.
				 *
				 * @override
				 */
				NielsensdkTimeupdateCommand.prototype.execute = function(notification) {
					var nielsensdk;
					nielsensdk = this.facade.retrieveProxy(NielsensdkProxy.NAME);
					nielsensdk.timeupdate();
				};

				/**
				 * The NielsenPlugin class.
				 *
				 * @param {Module}  app     The parent module of this plugin.
				 * @constructor
				 * @private
				 * @extends {Plugin}
				 */
				function NielsenPlugin() {
					NielsenPlugin.__super__.constructor.call(this);
				}


				__extends(NielsenPlugin, Plugin);


				NielsenPlugin.prototype.moduleName = "nielsen";

				/** @override
				 */
				NielsenPlugin.prototype.createController = function() {
					var event, events, _i, _len, _ref, _ref1;
					events = (_ref = this.config) != null ? (_ref1 = _ref.events) != null ? _ref1.video : void 0 : void 0;
					if (!(events != null)) {
						return;
					}
					for (_i = 0, _len = events.length; _i < _len; _i++) {
						event = events[_i];
						if (event.type === "started") {
							this.registerCommand(Notifications.STARTED, NielsenStartCommand);
							this.registerCommand(Notifications.CONTENT_CHANGED, NielsenStartCommand);
						}
						if (event.type === "ended") {
							this.registerCommand(Notifications.ENDED, NielsenEndCommand);
							this.registerCommand(Notifications.CHANGE_CONTENT, NielsenEndCommand);
						}
					}
				};

				/** @override
				 */
				NielsenPlugin.prototype.createModel = function() {
					this.registerProxy(new NielsenProxy(this.config));
				};

				/** @override
				 */
				NielsenPlugin.prototype.listNotificationInterests = function() {
					return [Notifications.STARTED, Notifications.ENDED, Notifications.CONTENT_CHANGED, Notifications.CHANGE_CONTENT];
				};


				AMP.registerPlugin("nielsen", "html", NielsenPlugin);
				AMP.registerPlugin("nielsen", "flash", NielsenWrapper);

				function ComscoreStreamsenseWrapper() {
					return ComscoreStreamsenseWrapper.__super__.constructor.apply(this, arguments);
				}


				__extends(ComscoreStreamsenseWrapper, PluginWrapper);


				ComscoreStreamsenseWrapper.NAME = "ComscoreStreamsenseWrapper";

				/** @override
				 */
				ComscoreStreamsenseWrapper.prototype.createXML = function(xml) {
					var application, metrics, prop, props, vendor, _i, _len;
					application = xml.firstChild;
					metrics = xml.getElementsByTagName("metrics")[0];
					if (!(metrics != null)) {
						metrics = xml.createElement("metrics");
						application.appendChild(metrics);
					}
					vendor = xml.createElement("vendor");
					vendor.setAttribute("id", "comscoreStreamSense");
					metrics.appendChild(vendor);
					props = [
						{
							value: this.config.data.clientId,
							key: "C2"
						}, {
							value: this.config.data.publisherSecret,
							key: "PUBLISHER_SECRET"
						}, {
							value: this.config.data.appVersion,
							key: "APP_VERSION"
						}, {
							value: this.config.data.metadata,
							key: "metadata"
						}
					];
					for (_i = 0, _len = props.length; _i < _len; _i++) {
						prop = props[_i];
						if (prop.value != null) {
							this.createProperty(xml, prop.key, prop.value, vendor);
						}
					}
					return xml;
				};

				/**
				 * @constructor
				 * @private
				 */
				function ComscoreStreamsenseProxy(config) {
					ComscoreStreamsenseProxy.__super__.constructor.call(this, config);
				}


				__extends(ComscoreStreamsenseProxy, PluginProxy);


				/** @static
				 */
				ComscoreStreamsenseProxy.NAME = ModuleProxy.NAME;

				ComscoreStreamsenseProxy.prototype.defaults = {
					plugin: {
						js: null
					},
					data: {
						clientId: null,
						publisherSecret: null,
						appVersion: null,
						metadata: null
					}
				};

				ComscoreStreamsenseProxy.prototype.myStreamingTag = null;

				/** Overrides
				 */
				ComscoreStreamsenseProxy.prototype.getScript = function() {
					return this.config.plugin.js;
				};

				/** Overrides
				 */
				ComscoreStreamsenseProxy.prototype.initialize = function() {
					ComscoreStreamsenseProxy.__super__.initialize.call(this);
					if ((typeof ns_ !== "undefined" && ns_ !== null) && this.myStreamingTag === null) {
						this.myStreamingTag = new ns_.StreamingTag({
							customerC2: this.value.data.clientId
						});
					}
				};

				ComscoreStreamsenseProxy.prototype.mediaChange = function() {
					if (this.myStreamingTag != null) {
						this.myStreamingTag.stop();
					}
					this.myStreamingTag = null;
					this.myStreamingTag = new ns_.StreamingTag({
						customerC2: this.value.data.clientId
					});
					this.facade.logger.log("[AMP ComscoreStreamsense Event] : Media Change, StreamTag ReInitialize");
				};

				ComscoreStreamsenseProxy.prototype.adStart = function(adVO) {
					if (adVO == null) {
						adVO = null;
					}
					this.myStreamingTag.playVideoAdvertisement(this.getMetaData());
					this.facade.logger.log("[AMP ComscoreStreamsense Event] : Ad Start");
				};

				/** Media Started
				 */
				ComscoreStreamsenseProxy.prototype.start = function(adVO) {
					if (adVO == null) {
						adVO = null;
					}
					this.myStreamingTag.playVideoContentPart(this.getMetaData());
					this.facade.logger.log("[AMP ComscoreStreamsense Event] : Content Play");
				};

				/** Media Stop
				 */
				ComscoreStreamsenseProxy.prototype.stop = function() {
					this.myStreamingTag.stop();
					this.facade.logger.log("[AMP ComscoreStreamsense Event] : Stop");
				};

				/** Media Ended
				 */
				ComscoreStreamsenseProxy.prototype.ended = function() {
					this.myStreamingTag = null;
					this.myStreamingTag = new ns_.StreamingTag({
						customerC2: this.value.data.clientId
					});
					this.facade.logger.log("[AMP ComscoreStreamsense Event] : End");
				};

				/** Get MetaData
				 */
				ComscoreStreamsenseProxy.prototype.getMetaData = function() {
					var metadata;
					metadata = this.value.data.metadata;
					return metadata;
				};

				/**
				 * The ComscoreStreamsenseStartedCommand class.
				 *
				 * @constructor
				 * @private
				 * @extends {puremvc.SimpleCommand}
				 */
				function ComscoreStreamsenseStartedCommand() {
					ComscoreStreamsenseStartedCommand.__super__.constructor.call(this);
				}


				__extends(ComscoreStreamsenseStartedCommand, puremvc.SimpleCommand);


				/**
				 * Executes the command.
				 *
				 * @param {puremvc.Notification} notification
				 *    The notification.
				 *
				 * @override
				 */
				ComscoreStreamsenseStartedCommand.prototype.execute = function(notification) {
					var comscoreProxy;
					comscoreProxy = this.facade.retrieveProxy(ComscoreStreamsenseProxy.NAME);
					comscoreProxy.start(notification.body);
				};

				/**
				 * The ComscoreStreamsenseAdStartedCommand class.
				 *
				 * @constructor
				 * @private
				 * @extends {puremvc.SimpleCommand}
				 */
				function ComscoreStreamsenseAdStartedCommand() {
					ComscoreStreamsenseAdStartedCommand.__super__.constructor.call(this);
				}


				__extends(ComscoreStreamsenseAdStartedCommand, puremvc.SimpleCommand);


				/**
				 * Executes the command.
				 *
				 * @param {puremvc.Notification} notification
				 *    The notification.
				 *
				 * @override
				 */
				ComscoreStreamsenseAdStartedCommand.prototype.execute = function(notification) {
					var comscoreProxy;
					comscoreProxy = this.facade.retrieveProxy(ComscoreStreamsenseProxy.NAME);
					comscoreProxy.adStart(notification.body);
				};

				/**
				 * The ComscoreStreamsenseStopCommand class.
				 *
				 * @constructor
				 * @private
				 * @extends {puremvc.SimpleCommand}
				 */
				function ComscoreStreamsenseStopCommand() {
					ComscoreStreamsenseStopCommand.__super__.constructor.call(this);
				}


				__extends(ComscoreStreamsenseStopCommand, puremvc.SimpleCommand);


				/**
				 * Executes the command.
				 *
				 * @param {puremvc.Notification} notification
				 *    The notification.
				 *
				 * @override
				 */
				ComscoreStreamsenseStopCommand.prototype.execute = function(notification) {
					var comscoreProxy;
					comscoreProxy = this.facade.retrieveProxy(ComscoreStreamsenseProxy.NAME);
					comscoreProxy.stop(notification.body);
				};

				/**
				 * The ComscoreStreamsenseAdErrorCommand class.
				 *
				 * @constructor
				 * @private
				 * @extends {puremvc.SimpleCommand}
				 */
				function ComscoreStreamsenseAdErrorCommand() {
					ComscoreStreamsenseAdErrorCommand.__super__.constructor.call(this);
				}


				__extends(ComscoreStreamsenseAdErrorCommand, puremvc.SimpleCommand);


				/**
				 * Executes the command.
				 *
				 * @param {puremvc.Notification} notification
				 *    The notification.
				 *
				 * @override
				 */
				ComscoreStreamsenseAdErrorCommand.prototype.execute = function(notification) {
					var comscoreProxy;
					comscoreProxy = this.facade.retrieveProxy(ComscoreStreamsenseProxy.NAME);
					comscoreProxy.adStart(notification.body);
					comscoreProxy.stop(notification.body);
				};

				/**
				 * The ComscoreStreamsenseChangeMediaCommand class.
				 *
				 * @constructor
				 * @private
				 * @extends {puremvc.SimpleCommand}
				 */
				function ComscoreStreamsenseChangeMediaCommand() {
					ComscoreStreamsenseChangeMediaCommand.__super__.constructor.call(this);
				}


				__extends(ComscoreStreamsenseChangeMediaCommand, puremvc.SimpleCommand);


				/**
				 * Executes the command.
				 *
				 * @param {puremvc.Notification} notification
				 *    The notification.
				 *
				 * @override
				 */
				ComscoreStreamsenseChangeMediaCommand.prototype.execute = function(notification) {
					var comscoreProxy;
					comscoreProxy = this.facade.retrieveProxy(ComscoreStreamsenseProxy.NAME);
					comscoreProxy.mediaChange();
				};

				/**
				 * The ComscoreStreamsenseEndedCommand class.
				 *
				 * @constructor
				 * @private
				 * @extends {puremvc.SimpleCommand}
				 */
				function ComscoreStreamsenseEndedCommand() {
					ComscoreStreamsenseEndedCommand.__super__.constructor.call(this);
				}


				__extends(ComscoreStreamsenseEndedCommand, puremvc.SimpleCommand);


				/**
				 * Executes the command.
				 *
				 * @param {puremvc.Notification} notification
				 *    The notification.
				 *
				 * @override
				 */
				ComscoreStreamsenseEndedCommand.prototype.execute = function(notification) {
					var comscoreProxy;
					comscoreProxy = this.facade.retrieveProxy(ComscoreStreamsenseProxy.NAME);
					comscoreProxy.ended();
				};

				/**
				 * The NielsenPlugin class.
				 *
				 * @param {Module}  app     The parent module of this plugin.
				 * @constructor
				 * @private
				 * @extends {Plugin}
				 */
				function NielsensdkPlugin() {
					NielsensdkPlugin.__super__.constructor.call(this);
				}


				__extends(NielsensdkPlugin, Plugin);


				NielsensdkPlugin.prototype.moduleName = "nielsensdk";

				/** @override
				 */
				NielsensdkPlugin.prototype.createModel = function() {
					this.registerProxy(new NielsensdkProxy(this.config));
				};

				/** @override
				 */
				NielsensdkPlugin.prototype.createController = function() {
					this.registerCommand(AdNotifications.BREAK_END, NielsensdkAdEndCommand);
					this.registerCommand(AdNotifications.AD_STARTED, NielsensdkAdStartCommand);
					this.registerCommand(Notifications.STARTED, NielsensdkStartCommand);
					this.registerCommand(Notifications.ENDED, NielsensdkEndCommand);
					this.registerCommand(Notifications.TIME_UPDATE, NielsensdkTimeupdateCommand);
					this.registerCommand(AdNotifications.AD_TIME_REMAINING, NielsensdkTimeupdateCommand);
				};

				/** @override
				 */
				NielsensdkPlugin.prototype.listNotificationInterests = function() {
					return [AdNotifications.AD_STARTED, AdNotifications.BREAK_END, Notifications.STARTED, Notifications.ENDED, Notifications.LOADED_METADATA, Notifications.TIME_UPDATE, Notifications.CONTENT_CHANGED, Notifications.CHANGE_CONTENT, AdNotifications.AD_TIME_REMAINING];
				};


				AMP.registerPlugin("nielsensdk", "html", NielsensdkPlugin);
				AMP.registerPlugin("nielsensdk", "flash", NielsensdkWrapper);

				/**
				 * @constructor
				 * @private
				 */
				function ComscoreProxy(config) {
					ComscoreProxy.__super__.constructor.call(this, config);
				}


				__extends(ComscoreProxy, DataBoundConfigurationProxy);


				ComscoreProxy.prototype.configurationName = "comscore";

				/** @static
				 */
				ComscoreProxy.NAME = ModuleProxy.NAME;

				ComscoreProxy.prototype.defaults = {
					url: "http://b.scorecardresearch.com/b",
					events: {
						ads: null,
						video: null
					},
					data: {
						c1: null,
						c2: null,
						c3: null,
						c4: null,
						c5: null,
						c6: null,
						c7: null,
						c8: null,
						c9: null,
						c10: null,
						c14: null
					}
				};

				/**
				 *
				 */
				ComscoreProxy.prototype.adStart = function() {
					var url;
					url = this.constructURL("ads", "started");
					Utils.beacon(url);
				};

				/**
				 *
				 */
				ComscoreProxy.prototype.videoStart = function() {
					var url;
					url = this.constructURL("video", "started");
					Utils.beacon(url);
				};

				/**
				 *
				 */
				ComscoreProxy.prototype.constructURL = function(target, type) {
					var data, event, events, item, key, query, url, value, _i, _len, _ref, _ref1, _ref2;
					data = {};
					events = (_ref = this.value.events) != null ? _ref[target] : void 0;
					if (events != null) {
						for (_i = 0, _len = events.length; _i < _len; _i++) {
							item = events[_i];
							if (item.type === type) {
								event = item;
							}
						}
					}
					_ref1 = this.value.data;
					for (key in _ref1) {
						value = _ref1[key];
						data[key] = (event != null ? (_ref2 = event.data) != null ? _ref2[key] : void 0 : void 0) || value;
					}
					if (data.c7 == null) {
						data.c7 = document.location.href.substr(0, 512);
					}
					if (data.c8 == null) {
						data.c8 = document.referrer.substr(0, 512);
					}
					if (data.c9 == null) {
						data.c9 = document.title;
					}
					if (data.cv == null) {
						data.cv = "2.0";
					}
					data.rn = Date.now();
					url = this.value.url;
					query = [];
					for (key in data) {
						value = data[key];
						if ((value != null) && value !== "") {
							query.push(key + "=" + escape(value));
						}
					}
					if (query.length > 0) {
						url += "?" + query.join("&");
					}
					return url.substr(0, 2080);
				};

				function ComscoreWrapper() {
					return ComscoreWrapper.__super__.constructor.apply(this, arguments);
				}


				__extends(ComscoreWrapper, PluginWrapper);


				ComscoreWrapper.NAME = "ComscoreWrapper";

				/** @override
				 */
				ComscoreWrapper.prototype.createXML = function(xml) {
					var application, element, event, events, map, metrics, node, prop, props, text, type, vendor, _i, _j, _len, _len1, _ref, _ref1, _ref2;
					application = xml.firstChild;
					metrics = xml.getElementsByTagName("metrics")[0];
					if (!(metrics != null)) {
						metrics = xml.createElement("metrics");
						application.appendChild(metrics);
					}
					vendor = xml.createElement("vendor");
					vendor.setAttribute("id", "comscore");
					metrics.appendChild(vendor);
					map = {
						ads: {
							started: "adStart",
							ended: "adComplete"
						},
						video: {
							started: "videoStart",
							ended: "videoComplete"
						}
					};
					props = [
						{
							value: "c1",
							key: "COMSCORE_CSC1"
						}, {
							value: "c2",
							key: "COMSCORE_CSC2"
						}, {
							value: "c3",
							key: "COMSCORE_CSC3"
						}, {
							value: "c4",
							key: "COMSCORE_CSC4"
						}, {
							value: "c5",
							key: "COMSCORE_CSC5"
						}, {
							value: "c6",
							key: "COMSCORE_CSC6"
						}, {
							value: "c7",
							key: "COMSCORE_CSC7"
						}, {
							value: "c8",
							key: "COMSCORE_CSC8"
						}, {
							value: "c9",
							key: "COMSCORE_CSC9"
						}, {
							value: "c10",
							key: "COMSCORE_CSC10"
						}, {
							value: "c11",
							key: "COMSCORE_CSC14"
						}
					];
					_ref = this.config.events;
					for (type in _ref) {
						events = _ref[type];
						if ((events != null) && events.length > 0) {
							for (_i = 0, _len = events.length; _i < _len; _i++) {
								event = events[_i];
								node = xml.createElement("property");
								node.setAttribute("key", map[type][event.type]);
								vendor.appendChild(node);
								element = xml.createElement("property");
								element.setAttribute("key", "COMSCORE_CSURL");
								text = XMLUtils.createTextContent(xml, this.config.url);
								element.appendChild(text);
								node.appendChild(element);
								for (_j = 0, _len1 = props.length; _j < _len1; _j++) {
									prop = props[_j];
									text = ((_ref1 = event.data) != null ? _ref1[prop.value] : void 0) || ((_ref2 = this.config.data) != null ? _ref2[prop.value] : void 0);
									if ((text != null) && text !== "") {
										element = xml.createElement("property");
										element.setAttribute("key", prop.key);
										text = XMLUtils.createTextContent(xml, text);
										element.appendChild(text);
										node.appendChild(element);
									}
								}
							}
						}
					}
					return xml;
				};

				/**
				 * The ComscoreAdStartCommand class.
				 *
				 * @constructor
				 * @private
				 * @extends {puremvc.SimpleCommand}
				 */
				function ComscoreAdStartCommand() {
					ComscoreAdStartCommand.__super__.constructor.call(this);
				}


				__extends(ComscoreAdStartCommand, puremvc.SimpleCommand);


				/**
				 * Executes the command.
				 *
				 * @param {puremvc.Notification} notification
				 *    The notification.
				 *
				 * @override
				 */
				ComscoreAdStartCommand.prototype.execute = function(notification) {
					var comscore;
					comscore = this.facade.retrieveProxy(ComscoreProxy.NAME);
					comscore.adStart();
				};

				/**
				 * The ComscoreStartCommand class.
				 *
				 * @constructor
				 * @private
				 * @extends {puremvc.SimpleCommand}
				 */
				function ComscoreStartCommand() {
					ComscoreStartCommand.__super__.constructor.call(this);
				}


				__extends(ComscoreStartCommand, puremvc.SimpleCommand);


				/**
				 * Executes the command.
				 *
				 * @param {puremvc.Notification} notification
				 *    The notification.
				 *
				 * @override
				 */
				ComscoreStartCommand.prototype.execute = function(notification) {
					var comscore;
					comscore = this.facade.retrieveProxy(ComscoreProxy.NAME);
					comscore.videoStart();
				};

				/**
				 * The ComscoreStreamsensePlugin class.
				 *
				 * @param {Module}  app     The parent module of this plugin.
				 * @constructor
				 * @private
				 * @extends {Plugin}
				 */
				function ComscoreStreamsensePlugin() {
					ComscoreStreamsensePlugin.__super__.constructor.call(this);
				}


				__extends(ComscoreStreamsensePlugin, Plugin);


				ComscoreStreamsensePlugin.prototype.moduleName = "comscorestreamsense";

				/** @override
				 */
				ComscoreStreamsensePlugin.prototype.createModel = function() {
					this.registerProxy(new ComscoreStreamsenseProxy(this.config));
				};

				/** @override
				 */
				ComscoreStreamsensePlugin.prototype.createController = function() {
					this.registerCommand(Notifications.MEDIA_CHANGE, ComscoreStreamsenseChangeMediaCommand);
					this.registerCommand(AdNotifications.AD_STARTED, ComscoreStreamsenseAdStartedCommand);
					this.registerCommand(AdNotifications.AD_ENDED, ComscoreStreamsenseStopCommand);
					this.registerCommand(AdNotifications.AD_ERROR, ComscoreStreamsenseAdErrorCommand);
					this.registerCommand(Notifications.PLAYING, ComscoreStreamsenseStartedCommand);
					this.registerCommand(Notifications.PAUSED, ComscoreStreamsenseStopCommand);
					this.registerCommand(Notifications.ENDED, ComscoreStreamsenseEndedCommand);
				};

				/** @override
				 */
				ComscoreStreamsensePlugin.prototype.listNotificationInterests = function() {
					return [Notifications.MEDIA_CHANGE, AdNotifications.AD_STARTED, AdNotifications.AD_RESUME, AdNotifications.AD_PAUSED, AdNotifications.AD_ENDED, AdNotifications.AD_ERROR, Notifications.PLAYING, Notifications.PAUSED, Notifications.ENDED];
				};


				AMP.registerPlugin("comscorestreamsense", "html", ComscoreStreamsensePlugin);
				AMP.registerPlugin("comscorestreamsense", "flash", ComscoreStreamsenseWrapper);

				/**
				 * @constructor
				 * @private
				 */
				function OmnitureAdProxy(proxy) {
					this.proxy = proxy;
					OmnitureAdProxy.__super__.constructor.call(this);
					this.plugin = this.proxy.plugin;
					this.error = this.proxy.error;
				}


				__extends(OmnitureAdProxy, puremvc.Proxy);


				/** @static
				 */
				OmnitureAdProxy.NAME = "OmnitureAdProxy";

				OmnitureAdProxy.prototype.proxy = null;

				OmnitureAdProxy.prototype.plugin = null;

				OmnitureAdProxy.prototype.error = null;

				OmnitureAdProxy.prototype.currentTime = null;

				OmnitureAdProxy.prototype.started = false;

				OmnitureAdProxy.prototype.ad = null;

				/** Pluging.
				 */
				OmnitureAdProxy.prototype.getAd = function() {
					return this.ad;
				};

				OmnitureAdProxy.prototype.setAd = function(value) {
					this.started = false;
					this.currentTime = 0;
					return this.ad = value;
				};

				OmnitureAdProxy.prototype.setTimeRemaining = function(time) {
					if (!(this.ad != null)) {
						return;
					}
					this.currentTime = this.ad.duration - time;
					return time;
				};

				/**
				 */
				OmnitureAdProxy.prototype.start = function() {
					try {
						this.plugin.Media.openAd(this.ad.title, this.ad.duration, this.proxy.value.playerName, this.proxy.getMediaName(), this.ad.type, this.ad.position, this.ad.cpm);
						this.started = true;
					} catch (error) {
						this.error("open", error);
					}
				};

				/**
				 */
				OmnitureAdProxy.prototype.play = function() {
					if (this.started !== true) {
						this.start();
					}
					try {
						this.plugin.Media.play(this.ad.title, this.currentTime || 0);
					} catch (error) {
						this.error("ad play", error);
					}
				};

				/**
				 */
				OmnitureAdProxy.prototype.pause = function() {
					try {
						this.plugin.Media.stop(this.ad.title, this.currentTime);
					} catch (error) {
						this.error("ad pause", error);
					}
				};

				/**
				 */
				OmnitureAdProxy.prototype.ended = function() {
					if (this.started === false) {
						return;
					}
					try {
						this.started = false;
						this.plugin.Media.stop(this.ad.title, this.ad.duration);
						this.plugin.Media.close(this.ad.title);
					} catch (error) {
						this.error("ad end", error);
					}
				};

				/**
				 * The OmnitureAdLoadedCommand class.
				 *
				 * @constructor
				 * @private
				 * @extends {PluginCommand}
				 */
				function OmnitureAdLoadedCommand() {
					OmnitureAdLoadedCommand.__super__.constructor.call(this);
				}


				__extends(OmnitureAdLoadedCommand, PluginCommand);


				/**
				 * Executes the command.
				 *
				 * @param {puremvc.Notification} notification
				 *    The notification.
				 *
				 * @override
				 */
				OmnitureAdLoadedCommand.prototype.execute = function(notification) {
					this.config.ads.setAd(notification.getBody());
				};

				/**
				 * The HeartbeatProxy class.
				 *
				 * @param {Object} config
				 * @constructor
				 * @private
				 * @extends {PluginProxy}
				 */
				function HeartbeatProxy(config) {
					HeartbeatProxy.__super__.constructor.call(this, config);
				}


				__extends(HeartbeatProxy, PluginProxy);


				/** @static
				 */
				HeartbeatProxy.NAME = ModuleProxy.NAME;

				HeartbeatProxy.prototype.defaults = {
					main: "s",
					heartbeat: null,
					account: null,
					playerName: null,
					mediaName: null,
					trackingServer: null,
					visitorNamespace: null
				};

				HeartbeatProxy.prototype.heartbeatConfig = null;

				HeartbeatProxy.prototype.delegate = null;

				HeartbeatProxy.prototype.media = null;

				HeartbeatProxy.prototype.started = false;

				HeartbeatProxy.prototype.ads = null;

				/** Pluging.
				 */
				HeartbeatProxy.prototype.getMedia = function() {
					return this.media;
				};

				HeartbeatProxy.prototype.setMedia = function(value) {
					this.started = false;
					return this.media = value;
				};

				HeartbeatProxy.prototype.setAd = function(value) {
					this.adVO = value;
				};

				HeartbeatProxy.prototype.getMediaName = function() {
					return this.getConfigurationData().mediaName || this.media.title;
				};

				/**
				 */
				HeartbeatProxy.prototype.initialize = function() {
					var aaPlugin, appMeasurement, config, heartbeatConfig, visitor;
					HeartbeatProxy.__super__.initialize.call(this);
					this.delegate = this.createDelegate();
					config = this.getConfigurationData();
					appMeasurement = new AppMeasurement();
					appMeasurement.account = config.account;
					appMeasurement.trackingServer = config.trackingServer;
					if ((config.visitorNamespace != null) && (typeof Visitor !== "undefined" && Visitor !== null)) {
						appMeasurement.visitorNamespace = config.visitorNamespace;
						visitor = new Visitor("2B8D246452DD9FBF0A490D45");
						visitor.trackingServer = config.trackingServer;
						appMeasurement.visitor = visitor;
					}
					aaPlugin = new ADB.va.plugins.AdobeAnalyticsPlugin(appMeasurement);
					this.plugin = new ADB.va.VideoHeartbeat(this.delegate, [aaPlugin]);
					heartbeatConfig = new ADB.va.ConfigData();
					heartbeatConfig.trackingServer = "http://heartbeats.omtrdc.net";
					heartbeatConfig.jobId = "sc_va";
					heartbeatConfig.debugLogging = this.facade.logger.enabled;
					heartbeatConfig.publisher = this.getConfigurationData().heartbeat.publisher;
					this.plugin.configure(heartbeatConfig);
				};

				/**
				 */
				HeartbeatProxy.prototype.createPlugin = function() {
					return ADB.va.VideoHeartbeat;
				};

				/**
				 */
				HeartbeatProxy.prototype.createDelegate = function() {
					var delegate,
						_this = this;
					delegate = new ADB.va.PlayerDelegate();
					delegate.getVideoInfo = function() {
						var playbackCore, videoInfo;
						playbackCore = _this.facade.player.retrieveProxy(PlayerProxy.NAME).getActivePlaybackCore();
						videoInfo = new ADB.va.VideoInfo();
						videoInfo.id = _this.media.guid || _this.media.title;
						videoInfo.playerName = _this.media.title;
						videoInfo.length = _this.media.temporalType === "live" ? -1 : playbackCore.getDuration();
						videoInfo.streamType = _this.media.temporalType || ADB.va.ASSET_TYPE_VOD;
						videoInfo.playhead = playbackCore.getCurrentTime();
						return videoInfo;
					};
					delegate.getAdInfo = function() {
						var adInfo;
						if (!(_this.adVO != null)) {
							return null;
						}
						adInfo = new ADB.va.AdInfo();
						adInfo.id = _this.adVO.id;
						adInfo.length = _this.adVO.duration;
						adInfo.position = _this.adVO.position;
						adInfo.name = _this.adVO.title;
						adInfo.cpm = "";
						return adInfo;
					};
					delegate.getChapterInfo = function() {
						var chapterInfo;
						if (!(_this.media.scenes != null)) {
							return null;
						}
						chapterInfo = new ADB.va.ChapterInfo();
						chapterInfo.name = "";
						chapterInfo.length = -1;
						chapterInfo.position = "1";
						chapterInfo.startTime = -1;
						return chapterInfo;
					};
					delegate.onError = function(error) {
						_this.facade.logger.error("Heartbeat Error:", error);
					};
					delegate.getQoSInfo = function() {
						return null;
					};
					return delegate;
				};

				/**
				 */
				HeartbeatProxy.prototype.start = function() {
					try {
						this.plugin.trackVideoLoad();
						this.started = true;
					} catch (error) {
						this.error(error);
					}
				};

				/**
				 */
				HeartbeatProxy.prototype.play = function() {
					if (this.started !== true) {
						this.start();
					}
					try {
						this.plugin.trackPlay();
					} catch (error) {
						this.error(error);
					}
				};

				/**
				 */
				HeartbeatProxy.prototype.pause = function() {
					try {
						this.plugin.trackPause();
					} catch (error) {
						this.error(error);
					}
				};

				/**
				 */
				HeartbeatProxy.prototype.seeking = function() {
					try {
						this.plugin.trackSeekStart();
					} catch (error) {
						this.error(error);
					}
				};

				/**
				 */
				HeartbeatProxy.prototype.seeked = function() {
					try {
						this.plugin.trackSeekComplete();
					} catch (error) {
						this.error(error);
					}
				};

				/**
				 */
				HeartbeatProxy.prototype.ended = function() {
					try {
						this.plugin.trackComplete();
						this.plugin.trackVideoUnload();
						this.started = false;
					} catch (error) {
						this.error(error);
					}
				};

				/**
				 * The OmniturePlayCommand class.
				 *
				 * @constructor
				 * @private
				 * @extends {PluginCommand}
				 */
				function OmniturePlayCommand() {
					OmniturePlayCommand.__super__.constructor.call(this);
				}


				__extends(OmniturePlayCommand, PluginCommand);


				/**
				 * Executes the command.
				 *
				 * @param {puremvc.Notification} notification
				 *    The notification.
				 *
				 * @override
				 */
				OmniturePlayCommand.prototype.execute = function(notification) {
					this.config.play();
				};

				/**
				 * The OmnitureChangeMediaCommand class.
				 *
				 * @constructor
				 * @private
				 * @extends {PluginCommand}
				 */
				function OmnitureChangeMediaCommand() {
					OmnitureChangeMediaCommand.__super__.constructor.call(this);
				}


				__extends(OmnitureChangeMediaCommand, PluginCommand);


				/**
				 * Executes the command.
				 *
				 * @param {puremvc.Notification} notification
				 *    The notification.
				 *
				 * @override
				 */
				OmnitureChangeMediaCommand.prototype.execute = function(notification) {
					this.config.setMedia(notification.getBody());
					this.facade.removeCommand(Notifications.PLAY);
				};

				/**
				 * The OmniturePauseCommand class.
				 *
				 * @constructor
				 * @private
				 * @extends {PluginCommand}
				 */
				function OmniturePauseCommand() {
					OmniturePauseCommand.__super__.constructor.call(this);
				}


				__extends(OmniturePauseCommand, PluginCommand);


				/**
				 * Executes the command.
				 *
				 * @param {puremvc.Notification} notification
				 *    The notification.
				 *
				 * @override
				 */
				OmniturePauseCommand.prototype.execute = function(notification) {
					this.config.pause();
				};

				/**
				 * The OmnitureSeekingCommand class.
				 *
				 * @constructor
				 * @private
				 * @extends {PluginCommand}
				 */
				function OmnitureSeekingCommand() {
					OmnitureSeekingCommand.__super__.constructor.call(this);
				}


				__extends(OmnitureSeekingCommand, PluginCommand);


				/**
				 * Executes the command.
				 *
				 * @param {puremvc.Notification} notification
				 *    The notification.
				 *
				 * @override
				 */
				OmnitureSeekingCommand.prototype.execute = function(notification) {
					this.config.seeking();
				};

				/**
				 * The OmnitureSeekedCommand class.
				 *
				 * @constructor
				 * @private
				 * @extends {PluginCommand}
				 */
				function OmnitureSeekedCommand() {
					OmnitureSeekedCommand.__super__.constructor.call(this);
				}


				__extends(OmnitureSeekedCommand, PluginCommand);


				/**
				 * Executes the command.
				 *
				 * @param {puremvc.Notification} notification
				 *    The notification.
				 *
				 * @override
				 */
				OmnitureSeekedCommand.prototype.execute = function(notification) {
					this.config.seeked();
				};

				/**
				 * The OmnitureEndedCommand class.
				 *
				 * @constructor
				 * @private
				 * @extends {PluginCommand}
				 */
				function OmnitureEndedCommand() {
					OmnitureEndedCommand.__super__.constructor.call(this);
				}


				__extends(OmnitureEndedCommand, PluginCommand);


				/**
				 * Executes the command.
				 *
				 * @param {puremvc.Notification} notification
				 *    The notification.
				 *
				 * @override
				 */
				OmnitureEndedCommand.prototype.execute = function(notification) {
					this.config.ended();
				};

				/**
				 * The OmnitureChangeMediaCommand class.
				 *
				 * @constructor
				 * @private
				 * @extends {PluginCommand}
				 */
				function OmnitureContentChangedCommand() {
					OmnitureContentChangedCommand.__super__.constructor.call(this);
				}


				__extends(OmnitureContentChangedCommand, PluginCommand);


				/**
				 * Executes the command.
				 *
				 * @param {puremvc.Notification} notification
				 *    The notification.
				 *
				 * @override
				 */
				OmnitureContentChangedCommand.prototype.execute = function(notification) {
					this.config.setMedia(notification.getBody());
					this.config.start();
				};

				/**
				 * The OmnitureStartCommand class.
				 *
				 * @constructor
				 * @private
				 * @extends {PluginCommand}
				 */
				function OmnitureStartCommand() {
					OmnitureStartCommand.__super__.constructor.call(this);
				}


				__extends(OmnitureStartCommand, PluginCommand);


				/**
				 * Executes the command.
				 *
				 * @param {puremvc.Notification} notification
				 *    The notification.
				 *
				 * @override
				 */
				OmnitureStartCommand.prototype.execute = function(notification) {
					this.config.start();
					this.facade.registerCommand(Notifications.PLAY, OmniturePlayCommand);
				};

				/**
				 * The OmnitureAdStartedCommand class.
				 *
				 * @constructor
				 * @private
				 * @extends {PluginCommand}
				 */
				function OmnitureAdStartedCommand() {
					OmnitureAdStartedCommand.__super__.constructor.call(this);
				}


				__extends(OmnitureAdStartedCommand, PluginCommand);


				/**
				 * Executes the command.
				 *
				 * @param {puremvc.Notification} notification
				 *    The notification.
				 *
				 * @override
				 */
				OmnitureAdStartedCommand.prototype.execute = function(notification) {
					this.config.ads.start();
				};

				/**
				 * The OmnitureAdPlayCommand class.
				 *
				 * @constructor
				 * @private
				 * @extends {PluginCommand}
				 */
				function OmnitureAdPlayCommand() {
					OmnitureAdPlayCommand.__super__.constructor.call(this);
				}


				__extends(OmnitureAdPlayCommand, PluginCommand);


				/**
				 * Executes the command.
				 *
				 * @param {puremvc.Notification} notification
				 *    The notification.
				 *
				 * @override
				 */
				OmnitureAdPlayCommand.prototype.execute = function(notification) {
					this.config.ads.play();
				};

				/**
				 * The OmnitureAdPauseCommand class.
				 *
				 * @constructor
				 * @private
				 * @extends {PluginCommand}
				 */
				function OmnitureAdPauseCommand() {
					OmnitureAdPauseCommand.__super__.constructor.call(this);
				}


				__extends(OmnitureAdPauseCommand, PluginCommand);


				/**
				 * Executes the command.
				 *
				 * @param {puremvc.Notification} notification
				 *    The notification.
				 *
				 * @override
				 */
				OmnitureAdPauseCommand.prototype.execute = function(notification) {
					this.config.ads.pause();
				};

				/**
				 * The OmnitureAdBreakEndCommand class.
				 *
				 * @constructor
				 * @private
				 * @extends {PluginCommand}
				 */
				function OmnitureAdBreakEndCommand() {
					OmnitureAdBreakEndCommand.__super__.constructor.call(this);
				}


				__extends(OmnitureAdBreakEndCommand, PluginCommand);


				/**
				 * Executes the command.
				 *
				 * @param {puremvc.Notification} notification
				 *    The notification.
				 *
				 * @override
				 */
				OmnitureAdBreakEndCommand.prototype.execute = function(notification) {
					this.config.ads.ended();
				};

				/**
				 * The OmnitureAdTimeRemainingCommand class.
				 *
				 * @constructor
				 * @private
				 * @extends {PluginCommand}
				 */
				function OmnitureAdTimeRemainingCommand() {
					OmnitureAdTimeRemainingCommand.__super__.constructor.call(this);
				}


				__extends(OmnitureAdTimeRemainingCommand, PluginCommand);


				/**
				 * Executes the command.
				 *
				 * @param {puremvc.Notification} notification
				 *    The notification.
				 *
				 * @override
				 */
				OmnitureAdTimeRemainingCommand.prototype.execute = function(notification) {
					this.config.ads.setTimeRemaining(notification.getBody());
				};

				function OmnitureWrapper() {
					return OmnitureWrapper.__super__.constructor.apply(this, arguments);
				}


				__extends(OmnitureWrapper, PluginWrapper);


				OmnitureWrapper.NAME = "OmnitureWrapper";

				/** @override
				 */
				OmnitureWrapper.prototype.createXML = function(xml) {
					var application, contextData, contextDataMapping, event, events, intervalProp, intervalReached, intervals, key, linkTracking, linkTrackingData, media, metrics, milestone, milestones, prop, property, props, trackMilestone, trackMilestones, type, value, vendor, _i, _j, _k, _l, _len, _len1, _len2, _len3, _len4, _len5, _len6, _m, _n, _o, _ref, _ref1, _ref2;
					application = xml.firstChild;
					metrics = xml.getElementsByTagName("metrics")[0];
					if (!(metrics != null)) {
						metrics = xml.createElement("metrics");
						application.appendChild(metrics);
					}
					vendor = xml.createElement("vendor");
					vendor.setAttribute("id", "omniture");
					metrics.appendChild(vendor);
					props = [
						{
							value: this.config.channel,
							key: "OMNITURE_CHANNEL"
						}, {
							value: this.config.account,
							key: "OMNITURE_ACCOUNT"
						}, {
							value: this.config.debugTracking,
							key: "OMNITURE_DEBUG_TRACKING"
						}, {
							value: this.config.trackLocal,
							key: "OMNITURE_TRACK_LOCAL"
						}, {
							value: this.config.visitorNamespace,
							key: "OMNITURE_VISITOR_NAMESPACE"
						}, {
							value: this.config.trackingServer,
							key: "OMNITURE_TRACKING_SERVER"
						}, {
							value: this.config.trackingServerSecure,
							key: "OMNITURE_TRACKING_SERVER_SECURE"
						}, {
							value: this.config.currencyCode,
							key: "OMNITURE_CURRENCY_CODE"
						}, {
							value: this.config.trackWhilePlaying,
							key: "OMNITURE_TRACK_WHILE_PLAYING"
						}, {
							value: this.config.trackMediaMethods,
							key: "OMNITURE_TRACK_MEDIA_METHODS"
						}, {
							value: this.config.mediaName,
							key: "OMNITURE_MEDIA_NAME"
						}, {
							value: this.config.playerName,
							key: "OMNITURE_PLAYER_NAME"
						}
					];
					for (_i = 0, _len = props.length; _i < _len; _i++) {
						prop = props[_i];
						if (prop.value != null) {
							this.createProperty(xml, prop.key, prop.value, vendor);
						}
					}
					media = this.config.Media;
					if (media != null) {
						props = [
							{
								value: media.autoTrack,
								key: "OMNITURE_AUTO_TRACK"
							}, {
								value: media.segmentByMilestones,
								key: "OMNITURE_SEGMENT_MILESTONES"
							}, {
								value: media.trackVars,
								key: "OMNITURE_TRACKVARS"
							}, {
								value: media.trackEvents,
								key: "OMNITURE_TRACKEVENTS"
							}, {
								value: media.trackUsingContextData,
								key: "OMNITURE_TRACK_CONTEXT_DATA"
							}, {
								value: media.trackSecondIntervals,
								key: "OMNITURE_TRACKSECOND_INTERVALS"
							}
						];
						for (_j = 0, _len1 = props.length; _j < _len1; _j++) {
							prop = props[_j];
							if (prop.value != null) {
								this.createProperty(xml, prop.key, prop.value, vendor);
							}
						}
						if (media.trackMilestones != null) {
							trackMilestones = this.createProperty(xml, "OMNITURE_TRACK_MILESTONES", null, vendor);
							milestones = media.trackMilestones;
							for (_k = 0, _len2 = milestones.length; _k < _len2; _k++) {
								milestone = milestones[_k];
								trackMilestone = this.createProperty(xml, milestone.percent, null, trackMilestones);
								for (key in milestone) {
									value = milestone[key];
									if (key !== "percent") {
										this.createProperty(xml, key, value, trackMilestone);
									}
								}
							}
						}
						contextDataMapping = media.contextDataMapping;
						if (contextDataMapping != null) {
							contextData = this.createProperty(xml, "OMNITURE_CONTEXT_DATA", null, vendor);
							for (key in contextDataMapping) {
								value = contextDataMapping[key];
								if (typeof value === "string") {
									this.createProperty(xml, key, value, contextData);
								}
								if (value instanceof Array) {
									property = this.createProperty(xml, key, null, contextData);
									for (_l = 0, _len3 = value.length; _l < _len3; _l++) {
										milestone = value[_l];
										this.createProperty(xml, milestone.percent, milestone.events, property);
									}
								}
							}
						}
					}
					linkTracking = this.config.customLinkTracking;
					if (linkTracking != null) {
						linkTrackingData = this.createProperty(xml, "OMNITURE_CUSTOM_LINK_TRACKING", null, vendor);
						for (key in linkTracking) {
							if (key === "intervalReached") {
								intervalReached = this.createProperty(xml, key, null, linkTrackingData);
								_ref = linkTracking[key];
								for (_m = 0, _len4 = _ref.length; _m < _len4; _m++) {
									intervals = _ref[_m];
									intervalProp = this.createProperty(xml, intervals.interval, null, intervalReached);
									for (key in intervals) {
										if (key !== "interval") {
											this.createProperty(xml, key, intervals[key], intervalProp);
										}
									}
								}
							} else {
								this.createProperty(xml, key, linkTracking[key], linkTrackingData);
							}
						}
					}
					events = (_ref1 = this.config.events) != null ? _ref1.video : void 0;
					if (events != null) {
						for (_n = 0, _len5 = events.length; _n < _len5; _n++) {
							event = events[_n];
							switch (event.type) {
								case "started":
									type = "videoStart";
									break;
								case "ended":
									type = "videoComplete";
									break;
								case "play":
									type = "videoResume";
									break;
								case "pause":
									type = "videoPause";
									break;
								default:
									type = event.type;
							}
							this.createProperty(xml, type, event.data, vendor);
						}
					}
					events = (_ref2 = this.config.events) != null ? _ref2.ads : void 0;
					if (events != null) {
						for (_o = 0, _len6 = events.length; _o < _len6; _o++) {
							event = events[_o];
							type = event.type === "started" ? 'adStart' : event.type === "ended" ? 'adComplete' : event.type;
							this.createProperty(xml, type, event.data, vendor);
						}
					}
				};

				/**
				 * The CaptionCue class.
				 *
				 * @constructor
				 * @private
				 * @param {number} startTime  The start time of the cue in seconds
				 * @param {number} endTime    The end time of the cue in seconds
				 * @param {number} text       The text of the cue
				 */
				function CaptionCue(startTime, endTime, id) {
					this.startTime = startTime;
					this.endTime = endTime;
					this.id = id;
				}

				CaptionCue.prototype.id = null;

				CaptionCue.prototype.startTime = null;

				CaptionCue.prototype.endTime = null;

				CaptionCue.prototype.text = null;

				CaptionCue.prototype.html = null;

				CaptionCue.prototype.align = null;

				/**
				 * The OmnitureProxy class.
				 *
				 * @param {Object} config
				 * @constructor
				 * @private
				 * @extends {PluginProxy}
				 */
				function OmnitureProxy(config) {
					OmnitureProxy.__super__.constructor.call(this, config);
				}


				__extends(OmnitureProxy, PluginProxy);


				/** @static
				 */
				OmnitureProxy.NAME = ModuleProxy.NAME;

				OmnitureProxy.prototype.defaults = {
					account: null,
					playerName: null,
					mediaName: null,
					main: "s"
				};

				OmnitureProxy.prototype.media = null;

				OmnitureProxy.prototype.started = false;

				OmnitureProxy.prototype.video = null;

				OmnitureProxy.prototype.ads = null;

				/** Pluging.
				 */
				OmnitureProxy.prototype.getMedia = function() {
					return this.media;
				};

				OmnitureProxy.prototype.setMedia = function(value) {
					this.started = false;
					return this.media = value;
				};

				OmnitureProxy.prototype.getMediaName = function() {
					return this.getConfigurationData().mediaName || this.media.title;
				};

				/**
				 */
				OmnitureProxy.prototype.initialize = function() {
					var _ref;
					OmnitureProxy.__super__.initialize.call(this);
					if (this.plugin != null) {
						try {
							if (!(this.plugin.Media != null)) {
								this.plugin.loadModule("Media");
							}
						} catch (error) {
							this.error("initialize", error);
						}
						if (((_ref = this.plugin.Media) != null ? _ref.openAd : void 0) != null) {
							this.ads = new OmnitureAdProxy(this);
							this.facade.registerProxy(this.ads);
							this.facade.registerCommand(AdNotifications.AD_LOADED, OmnitureAdLoadedCommand);
							this.facade.registerCommand(AdNotifications.AD_STARTED, OmnitureAdStartedCommand);
							this.facade.registerCommand(AdNotifications.AD_PLAY, OmnitureAdPlayCommand);
							this.facade.registerCommand(AdNotifications.AD_PAUSE, OmnitureAdPauseCommand);
							this.facade.registerCommand(AdNotifications.AD_TIME_REMAINING, OmnitureAdTimeRemainingCommand);
							this.facade.registerCommand(AdNotifications.BREAK_END, OmnitureAdBreakEndCommand);
						}
						this.video = this.facade.player.getMediaElement();
					}
				};

				/**
				 */
				OmnitureProxy.prototype.createPlugin = function() {
					return window[this.getConfigurationData().main];
				};

				/**
				 */
				OmnitureProxy.prototype.start = function() {
					try {
						this.plugin.Media.open(this.getMediaName(), this.media.duration, this.getConfigurationData().playerName);
						this.started = true;
						this.play();
					} catch (error) {
						this.error(error);
					}
				};

				/**
				 */
				OmnitureProxy.prototype.play = function() {
					if (this.started !== true) {
						this.start();
					}
					try {
						this.plugin.Media.play(this.getMediaName(), this.video.currentTime || 0);
					} catch (error) {
						this.error(error);
					}
				};

				/**
				 */
				OmnitureProxy.prototype.pause = function() {
					try {
						this.plugin.Media.stop(this.getMediaName(), this.video.currentTime);
					} catch (error) {
						this.error(error);
					}
				};

				/**
				 */
				OmnitureProxy.prototype.seeking = function() {
					try {
						this.plugin.Media.stop(this.getMediaName(), this.video.currentTime);
					} catch (error) {
						this.error(error);
					}
				};

				/**
				 */
				OmnitureProxy.prototype.seeked = function() {
					try {
						this.plugin.Media.play(this.getMediaName(), this.video.currentTime);
					} catch (error) {
						this.error(error);
					}
				};

				/**
				 */
				OmnitureProxy.prototype.ended = function() {
					try {
						this.plugin.Media.stop(this.getMediaName(), this.video.currentTime);
						this.plugin.Media.close(this.getMediaName());
						this.started = false;
					} catch (error) {
						this.error(error);
					}
				};

				function SRTParser() {}

				/**
				 * Parses a SRT (subrip) file into CaptionCue objects and attaches them to a given track.
				 *
				 * @param   {CaptionTrack}  track The caption track to populate
				 * @param   {String}        txt   The text of the srt file
				 * @return  {CaptionTrack}        The populated caption track
				 */
				SRTParser.prototype.parse = function(track, txt) {
					var caption, captions, cue, end, index, parts, start, text, times, _i, _len;
					txt = txt.replace(/\r/g, '');
					captions = txt.split("\n\n");
					for (_i = 0, _len = captions.length; _i < _len; _i++) {
						caption = captions[_i];
						parts = caption.split("\n");
						try {
							index = parts[0];
							times = parts[1].match(/([0-9:\,]+)\s*-->\s*([0-9:\,]+)/).slice(1);
							start = Utils.flattenTimecode(times[0]);
							end = Utils.flattenTimecode(times[1]);
							text = parts.slice(2);
						} catch (err) {
							Logger.warn("SRT Parsing Warning");
						}
						cue = new CaptionCue(start, end, "cue_" + index);
						cue.html = "<p>" + text.join("<br />") + "</p>";
						cue.text = text.join("\n");
						track.cues.push(cue);
					}
					return track;
				};

				function SMPTETTParser() {}

				/**
				 * Parses a SMPTETT file into CaptionCue objects and attaches them to a given track.
				 *
				 * @param   {CaptionTrack}  track The caption track to populate
				 * @param   {XMLDocument}   xml   The SMPTETT xml document
				 * @return  {CaptionTrack}        The populated caption track
				 */
				SMPTETTParser.prototype.parse = function(track, xml) {
					var captions, lang, styledElements, styles, tt,
						_this = this;
					if (typeof xml === "string") {
						xml = XMLUtils.parse(xml);
					}
					styles = Array.prototype.slice.call(xml.querySelectorAll("styling style"));
					styles.forEach(function(item, index, list) {
						var attributes, id, style;
						style = "";
						id = item.getAttribute("id") || item.getAttribute("xml:id");
						attributes = Array.prototype.slice.call(item.attributes);
						attributes.forEach(function(item, index, array) {
							if (item.prefix === "tts") {
								return style += Utils.formatStyleName(item.localName) + ":" + item.nodeValue + ";";
							}
						});
						track.styles[id] = style;
					});
					styledElements = Array.prototype.slice.call(xml.querySelectorAll("body [style]"));
					styledElements.forEach(function(item, index, array) {
						var id;
						id = item.getAttribute("style");
						item.setAttribute("style", track.styles[id]);
					});
					tt = xml.querySelector("tt");
					lang = tt.getAttribute("lang") || tt.getAttribute("xml:lang");
					if (track.language === void 0 || track.language === null) {
						track.language = lang;
					}
					captions = Array.prototype.slice.call(xml.querySelectorAll("body p[begin]"));
					captions.forEach(function(item, index, array) {
						var align, cue, end, start, text;
						start = item.getAttribute("begin");
						item.removeAttribute("begin");
						if (item.getAttribute("end") != null) {
							end = item.getAttribute("end");
							item.removeAttribute("end");
						} else if (captions[index + 1] != null) {
							end = captions[index + 1].getAttribute("begin");
						}
						cue = new CaptionCue(Utils.flattenTimecode(start), Utils.flattenTimecode(end), "cue_" + index);
						align = item.getAttributeNS("http://www.w3.org/ns/ttml#styling", "textAlign");
						if (align != null) {
							cue.align = align === "center" ? "middle" : align;
							item.removeAttributeNS("http://www.w3.org/ns/ttml#styling", "textAlign");
						}
						text = XMLUtils.serialize(item);
						text = text.replace(/\s*xmlns="[^"]*"/, "");
						cue.html = text;
						text = text.replace(/^<p[^>]*>/, "");
						text = text.replace(/<\/p>$/, "");
						text = text.replace(/<br\/>/, "\n");
						text = text.replace(/<span style="([^"]*)"/, "<c.$1");
						text = text.replace(/<\/span>/, "</c>");
						cue.text = text;
						track.cues.push(cue);
					});
					return track;
				};

				/**
				 * The ComscorePlugin class.
				 *
				 * @param {Module}  app     The parent module of this plugin.
				 * @constructor
				 * @private
				 * @extends {Plugin}
				 */
				function ComscorePlugin() {
					ComscorePlugin.__super__.constructor.call(this);
				}


				__extends(ComscorePlugin, Plugin);


				ComscorePlugin.prototype.moduleName = "comscore";

				/** @override
				 */
				ComscorePlugin.prototype.createController = function() {
					this.registerCommand(Notifications.STARTED, ComscoreStartCommand);
					this.registerCommand(Notifications.CONTENT_CHANGED, ComscoreStartCommand);
					this.registerCommand(AdNotifications.AD_STARTED, ComscoreAdStartCommand);
				};

				/** @override
				 */
				ComscorePlugin.prototype.createModel = function() {
					this.registerProxy(new ComscoreProxy(this.config));
				};

				/** @override
				 */
				ComscorePlugin.prototype.listNotificationInterests = function() {
					return [Notifications.STARTED, AdNotifications.AD_STARTED, Notifications.CONTENT_CHANGED];
				};


				AMP.registerPlugin("comscore", "html", ComscorePlugin);
				AMP.registerPlugin("comscore", "flash", ComscoreWrapper);

				/**
				 * @constructor
				 * @private
				 */
				function LiveCaptionProxy() {
					var com,
						_this = this;
					this.captions = [];
					this.head = document.getElementsByTagName("head")[0];
					com = window.com || {};
					com.akamai = com.akamai || {};
					com.akamai.amp = com.akamai.amp || {};
					com.akamai.amp.plugins = com.akamai.amp.plugins || {};
					com.akamai.amp.plugins.subply = com.akamai.amp.plugins.subply || {};
					com.akamai.amp.plugins.subply.response = function(json) {
						_this.parse(json);
						_this.poll();
					};
					if (!(window.com != null)) {
						window.com = com;
					}
					LiveCaptionProxy.__super__.constructor.call(this, this.constructor.NAME);
				}


				__extends(LiveCaptionProxy, puremvc.Proxy);


				/** @static
				 */
				LiveCaptionProxy.NAME = "LiveCaptionProxy";

				LiveCaptionProxy.prototype.data = {
					base: "http://test.plymedia.com.s3.amazonaws.com/online/Akamai_",
					interval: 1000
				};

				LiveCaptionProxy.prototype.caption = null;

				LiveCaptionProxy.prototype.head = null;

				LiveCaptionProxy.prototype.script = null;

				LiveCaptionProxy.prototype.timeout = null;

				/**
				 *
				 */
				LiveCaptionProxy.prototype.getURL = function() {
					return this.data.url;
				};

				LiveCaptionProxy.prototype.setURL = function(value) {
					this.data.url = value;
					return value;
				};

				LiveCaptionProxy.prototype.start = function() {
					this.send();
				};

				LiveCaptionProxy.prototype.poll = function() {
					var timeout,
						_this = this;
					timeout = setTimeout(function() {
						_this.send();
					}, this.data.interval || 1000);
				};

				LiveCaptionProxy.prototype.send = function() {
					if (this.script != null) {
						this.head.removeChild(this.script);
					}
					this.script = Utils.loadScript(this.data.base + this.data.url + ".js?nocache=" + Date.now());
				};

				LiveCaptionProxy.prototype.stop = function() {
					clearTimeout(timeout);
				};

				/**
				 *
				 */
				LiveCaptionProxy.prototype.parse = function(response) {
					var html, text, _i, _len, _ref;
					if (response.Stream !== this.data.url) {
						return;
					}
					if ((this.caption != null) && this.caption.id >= response.Ticks) {
						return;
					}
					this.caption = new CaptionCue(Utils.flattenTimecode(response.From), Utils.flattenTimecode(response.To), response.Ticks);
					this.caption.text = response.Text;
					html = "";
					_ref = response.Text.split("\n");
					for (_i = 0, _len = _ref.length; _i < _len; _i++) {
						text = _ref[_i];
						if (html !== "") {
							html += "<br />";
						}
						html += "<span>" + text + "</span>";
					}
					this.caption.html = "<p>" + html + "</p>";
					this.sendNotification(CaptioningNotifications.CUE_CHANGE, [this.caption]);
					return this.caption;
				};

				/**
				 * @private
				 */

				CaptionParsers = {
					"application/ttml+xml": new SMPTETTParser(),
					"application/x-subrip": new SRTParser(),
					undefined: new SMPTETTParser()
				};

				/**
				 * The CaptioningTimeUpdateCommand class.
				 *
				 * @constructor
				 * @private
				 * @extends {puremvc.SimpleCommand}
				 */
				function CaptioningTimeUpdateCommand() {
					CaptioningTimeUpdateCommand.__super__.constructor.call(this);
				}


				__extends(CaptioningTimeUpdateCommand, puremvc.SimpleCommand);


				/**
				 * Executes the command.
				 *
				 * @param {puremvc.Notification} notification
				 *    The notification.
				 *
				 * @override
				 */
				CaptioningTimeUpdateCommand.prototype.execute = function(notification) {
					var active, changed, cue, cues, index, proxy, time, track, _i, _len;
					time = notification.getBody();
					proxy = this.facade.retrieveProxy(CaptioningProxy.NAME);
					track = proxy.getTrack();
					if (!(track != null)) {
						return;
					}
					active = track.activeCues;
					cues = track.cues;
					changed = false;
					for (_i = 0, _len = cues.length; _i < _len; _i++) {
						cue = cues[_i];
						if (time >= cue.startTime && time < cue.endTime) {
							if (!(__indexOf.call(active, cue) >= 0)) {
								active.push(cue);
								changed = true;
							}
						} else {
							index = active.indexOf(cue);
							if (index !== -1) {
								active.splice(index, 1);
								changed = true;
							}
						}
					}
					if (changed === true) {
						this.sendNotification(CaptioningNotifications.CUE_CHANGE, active);
					}
				};

				/**
				 * The CaptioningChangeMediaCommand class.
				 *
				 * @constructor
				 * @private
				 * @extends {puremvc.SimpleCommand}
				 */
				function CaptioningChangeMediaCommand() {
					CaptioningChangeMediaCommand.__super__.constructor.call(this);
				}


				__extends(CaptioningChangeMediaCommand, puremvc.SimpleCommand);


				/**
				 * Executes the command.
				 *
				 * @param {puremvc.Notification} notification
				 *    The notification.
				 *
				 * @override
				 */
				CaptioningChangeMediaCommand.prototype.execute = function(notification) {
					var media, proxy;
					media = notification.getBody();
					proxy = this.facade.retrieveProxy(CaptioningProxy.NAME);
					if (media.track != null) {
						proxy.setTracks(media.track);
					}
					if (media.track != null) {
						this.sendNotification(CaptioningNotifications.ENABLED, true);
					}
				};

				/**
				 * The ChangeVisibilityCommand class.
				 *
				 * @constructor
				 * @private
				 * @extends {puremvc.SimpleCommand}
				 */
				function CaptioningVisibilityChangeCommand() {
					CaptioningVisibilityChangeCommand.__super__.constructor.call(this);
				}


				__extends(CaptioningVisibilityChangeCommand, puremvc.SimpleCommand);


				/**
				 * Executes the command.
				 *
				 * @param {puremvc.Notification} notification
				 *    The notification.
				 *
				 * @override
				 */
				CaptioningVisibilityChangeCommand.prototype.execute = function(notification) {
					var configProxy;
					configProxy = this.facade.retrieveProxy(CaptioningProxy.NAME);
					configProxy.setHidden(!notification.getBody());
				};

				/**
				 * @enum {string}
				 * @const
				 * @private
				 */

				var UserSettingsNotifications = {
					SETTING_CHANGE: "settingchange",
					UPDATE_SETTINGS: "updatesettings"
				};

				/**
				 * The CaptioningStartedCommand class.
				 *
				 * @constructor
				 * @private
				 * @extends {puremvc.SimpleCommand}
				 */
				function CaptioningStartedCommand() {
					CaptioningStartedCommand.__super__.constructor.call(this);
				}


				__extends(CaptioningStartedCommand, puremvc.SimpleCommand);


				/**
				 * Executes the command.
				 *
				 * @param {puremvc.Notification} notification
				 *    The notification.
				 *
				 * @override
				 */
				CaptioningStartedCommand.prototype.execute = function(notification) {
					var proxy, track, _ref;
					proxy = this.facade.retrieveProxy(CaptioningProxy.NAME);
					track = proxy.getTrack();
					if (!(track != null) && ((_ref = proxy.getTracks()) != null ? _ref.length : void 0) > 0) {
						track = proxy.autoSelectTrack();
					}
					if ((track != null ? track.isLive : void 0) === true) {
						this.facade.removeCommand(Notifications.TIME_UPDATE);
						proxy = this.facade.retrieveProxy(LiveCaptionProxy.NAME);
						if (!(proxy != null)) {
							proxy = new LiveCaptionProxy();
							this.facade.registerProxy(proxy);
						}
						proxy.setURL(track.src);
						proxy.start();
					}
				};

				/**
				 * The CaptioningWrapper class.
				 *
				 * @constructor
				 * @private
				 * @extends {PluginWrapper}
				 * @param {FlashPlayer}     player  The FlashPlayer
				 * @param {Object}          config  The plugin config
				 */
				function CaptioningWrapper(player, config) {
					CaptioningWrapper.__super__.constructor.call(this, player, config);
				}


				__extends(CaptioningWrapper, PluginWrapper);


				CaptioningWrapper.NAME = "CaptioningWrapper";

				CaptioningWrapper.prototype.hidden = true;

				/** @override
				 */
				CaptioningWrapper.prototype.createXML = function(xml) {
					var application, player, subply, _ref;
					subply = (_ref = this.config.flash) != null ? _ref.subply : void 0;
					if (subply != null) {
						try {
							if (subply.timeMethod != null) {
								player = xml.getElementsByTagName("player")[0];
								player.setAttribute("subply_time_method", subply.timeMethod);
							}
							if (subply.plugin != null) {
								application = xml.firstChild;
								subply = xml.getElementsByTagName("subply")[0];
								if (!(subply != null)) {
									subply = xml.createElement("subply");
									application.appendChild(subply);
								}
								this.createProperty(xml, "SUBPLY_URL", this.config.flash.subply.plugin, subply);
							}
						} catch (error) {
							this.facade.logger.error("[AMP CAPTIONING ERROR]", error);
						}
					}
				};

				/** @override
				 */
				CaptioningWrapper.prototype.createFlashVars = function(flashvars) {
					var captionLangArr, captionUrlArr, config, track, _i, _len, _ref, _ref1;
					config = this.player.config;
					if (((_ref = config.media) != null ? _ref.track : void 0) != null) {
						track = Utils.selectTrack(config.media.track, "captions");
						if ((track.src != null) && track.src !== "") {
							flashvars.caption_url = track.src;
						}
						if (config.media.track.length > 1) {
							captionUrlArr = [];
							captionLangArr = [];
							_ref1 = config.media.track;
							for (_i = 0, _len = _ref1.length; _i < _len; _i++) {
								track = _ref1[_i];
								captionUrlArr.push(track.src);
								captionLangArr.push(track.srclang);
							}
							flashvars.caption_url = captionUrlArr.join(",");
							flashvars.caption_language = captionLangArr.join(",");
						}
						flashvars.caption_type = track.type != null ? encodeURIComponent(track.type) : "application/ttml+xml";
					}
				};

				/** @override
				 */
				CaptioningWrapper.prototype.listNotificationInterests = function() {
					return CaptioningWrapper.__super__.listNotificationInterests.apply(this, arguments).concat([Notifications.MEDIA_CHANGE, FlashNotifications.CAPTIONING_REQUEST, FlashNotifications.CAPTION_LANG_CHANGE]);
				};

				/**
				 */
				CaptioningWrapper.prototype.handleNotification = function(notification) {
					var body, media, name, track, type;
					CaptioningWrapper.__super__.handleNotification.call(this, notification);
					name = notification.getName();
					body = notification.getBody();
					switch (name) {
						case FlashNotifications.CAPTION_LANG_CHANGE:
							type = "";
							break;
						case FlashNotifications.CAPTIONING_REQUEST:
							type = "visibilitychange";
							body = body.enabled;
							this.hidden = !body;
							break;
						case Notifications.MEDIA_CHANGE:
							media = body;
							if (media.track != null) {
								track = Utils.selectTrack(media.track, "captions");
								if (((track != null ? track.src : void 0) != null) && track.src !== "") {
									media.captioningUrl = track.src;
								}
								media.captioningType = track.type || "application/ttml+xml";
							}
					}
					if ((type != null) && type !== "") {
						this.dispatchEvent(new Event(type, body));
					}
				};

				/**
				 */
				CaptioningWrapper.prototype.getHidden = function() {
					return this.hidden;
				};

				CaptioningWrapper.prototype.setHidden = function(value) {
					this.hidden = value;
					this.facade.getMediaElement().setPlayerProperty("captionDisplay", {
						visible: !value
					});
					return value;
				};


				AMP.registerPlugin("captioning", "flash", CaptioningWrapper);

				/**
				 * The CaptionTrack class.
				 *
				 * @constructor
				 * @private
				 * @param {?Object} track A generic track object.
				 */
				function CaptionTrack(track, onload) {
					var xhr,
						_this = this;
					this.kind = track.kind;
					this.type = track.type;
					this.src = track.src;
					this.language = track.srclang;
					this.label = track.label || this.srclang || this.kind;
					this.cues = track.cues || [];
					this.styles = track.styles || {};
					this.activeCues = [];
					this.isLive = /live-subply/.test(this.type);
					if ((this.src != null) && this.src !== "" && !this.isLive) {
						xhr = Utils.get(this.src, {
							onload: function() {
								try {
									CaptionParsers[_this.type].parse(_this, xhr.response);
								} catch (error) {
									Logger.error("Could not parse caption track: " + _this.src);
									return;
								}
								if (typeof onload === "function") {
									onload();
								}
							},
							onerror: function() {
								Logger.error("Could not load caption track: " + _this.src);
							}
						});
					} else {
						setTimeout(onload, 1);
					}
				}

				CaptionTrack.prototype.kind = null;

				CaptionTrack.prototype.src = null;

				CaptionTrack.prototype.language = null;

				CaptionTrack.prototype.cues = null;

				CaptionTrack.prototype.label = null;

				CaptionTrack.prototype.activeCues = null;

				CaptionTrack.prototype.type = null;

				CaptionTrack.prototype.styles = null;

				CaptionTrack.prototype.isLive = false;

				/**
				 * @enum {string}
				 * @const
				 * @private
				 */

				var CaptioningNotifications = {
					VISIBILITY_CHANGE: "captioningvisibilitychange",
					ENABLED: "captioningEnabled",
					TRACKS_LOADED: "captioningTracksLoaded",
					TRACK_SELECTED: "captioningTrackSelected",
					CUE_CHANGE: "captioningCueChange",
					SETTINGS_VISIBILITY_CHANGE: "captioningsettingsvisibility",
					TOGGLE_SETTINGS_VISIBILITY: "togglesettingsvisibility",
					SETTINGS_CHANGE: "captioningsettingschange"
				};

				/**
				 * The CaptioningProxy class
				 *
				 * @constructor
				 * @private
				 * @extends {PluginProxy}
				 * @param   {Object}  config  The configuration object.
				 */
				function CaptioningProxy(config) {
					this.activeCaptions = [];
					this.providers = {};
					this.tracks = [];
					CaptioningProxy.__super__.constructor.call(this, config);
				}


				__extends(CaptioningProxy, PluginProxy);


				/** @static
				 */
				CaptioningProxy.NAME = ModuleProxy.NAME;

				CaptioningProxy.prototype.defaults = {};

				CaptioningProxy.prototype.hidden = true;

				CaptioningProxy.prototype.tracks = null;

				CaptioningProxy.prototype.track = null;

				CaptioningProxy.prototype.activeCaptions = null;

				CaptioningProxy.prototype.captions = null;

				CaptioningProxy.prototype.loaded = true;

				/**
				 *
				 */
				CaptioningProxy.prototype.useNative = function() {
					var _ref;
					return (this.facade.player.mediaElement.textTracks != null) && ((_ref = window.TextTrackCue) != null ? _ref.length : void 0) === 3;
				};

				/**
				 *
				 */
				CaptioningProxy.prototype.getTracks = function() {
					return this.tracks;
				};

				CaptioningProxy.prototype.setTracks = function(value) {
					var count, item, loaded, track, trackLoaded, _i, _len,
						_this = this;
					this.tracks = [];
					this.track = null;
					count = value.length;
					loaded = 0;
					trackLoaded = function() {
						loaded++;
						if (loaded === count) {
							_this.sendNotification(CaptioningNotifications.TRACKS_LOADED, _this.tracks);
							_this.autoSelectTrack();
						}
					};
					for (_i = 0, _len = value.length; _i < _len; _i++) {
						item = value[_i];
						track = new CaptionTrack(item, trackLoaded);
						this.tracks.push(track);
					}
					return value;
				};

				/**
				 *
				 */
				CaptioningProxy.prototype.getTrack = function() {
					return this.track;
				};

				CaptioningProxy.prototype.setTrack = function(value) {
					this.track = value;
					this.captions = this.track.cues;
					this.activeCaptions = [];
					this.sendNotification(CaptioningNotifications.TRACK_SELECTED, this.track);
					return value;
				};

				/**
				 *
				 */
				CaptioningProxy.prototype.selectTrackByIndex = function(index) {
					var track;
					if ((0 <= index && index < this.tracks.length)) {
						track = this.tracks[index];
						this.setTrack(track);
					}
					return track;
				};

				/**
				 *
				 */
				CaptioningProxy.prototype.selectTrackByLanguage = function(lang) {
					var item, track, _i, _len, _ref;
					_ref = this.tracks;
					for (_i = 0, _len = _ref.length; _i < _len; _i++) {
						item = _ref[_i];
						if (!(item.language === lang)) {
							continue;
						}
						track = item;
						break;
					}
					if (track != null) {
						this.setTrack(track);
					}
					return track;
				};

				/**
				 *
				 */
				CaptioningProxy.prototype.getHidden = function() {
					return this.hidden;
				};

				CaptioningProxy.prototype.setHidden = function(value) {
					this.hidden = value;
					return value;
				};

				/**
				 *
				 */
				CaptioningProxy.prototype.autoSelectTrack = function() {
					var lang, track, _ref;
					lang = (_ref = this.facade.player.retrieveProxy(LocalizationProxy.NAME)) != null ? _ref.getLanguage() : void 0;
					if (lang != null) {
						lang = lang.split("-").shift();
						track = this.selectTrackByLanguage(lang);
					}
					if (!(track != null)) {
						track = this.tracks[0];
						this.setTrack(track);
					}
					return track;
				};

				/**
				 * The CaptioningHTMLMediator class.
				 *
				 * @constructor
				 * @private
				 * @extends {LocalizedMediator}
				 * @param {Object} viewComponent
				 */
				function CaptioningHTMLMediator(viewComponent) {
					CaptioningHTMLMediator.__super__.constructor.call(this, null, null, viewComponent, null);
				}


				__extends(CaptioningHTMLMediator, ComponentMediator);


				CaptioningHTMLMediator.prototype.componentName = "captioning-settings";

				CaptioningHTMLMediator.prototype.captioningObject = {
					"default": {
						fontFamily: "Arial,sans-serif",
						size: "1.3em",
						scroll: "popout",
						fontColor: "rgba(255,255,255,1)",
						edgeType: null,
						edgeColor: "rgba(0, 0, 0, 0)",
						backgroundColor: "rgba(0,0,0,0)",
						windowColor: "rgba(0,0,0,0.5)"
					},
					appliedStyleText: "",
					selected: {
						fontFamily: null,
						size: null,
						fontColor: null,
						edgeType: null,
						edgeColor: null,
						backgroundColor: null,
						windowColor: null
					},
					preset1: {
						fontFamily: "Arial,sans-serif",
						size: "1.3em",
						fontColor: "rgba(255,255,255,1)",
						edgeType: null,
						edgeColor: "rgba(0, 0, 0, 0)",
						backgroundColor: "rgba(0,0,0,0)",
						windowColor: "rgba(0,0,0,0)"
					},
					preset2: {
						fontFamily: "Arial,sans-serif",
						size: "1.3em",
						fontColor: "rgba(255,255,0,1)",
						edgeType: null,
						edgeColor: "rgba(0, 0, 0, 0)",
						backgroundColor: "rgba(0,0,0,0)",
						windowColor: "rgba(0,0,0,0)"
					},
					preset3: {
						fontFamily: "Arial,sans-serif",
						size: "1.3em",
						fontColor: "rgba(255,255,255,1)",
						edgeType: null,
						edgeColor: "rgba(0, 0, 0, 0)",
						backgroundColor: "rgba(0,0,0,1)",
						windowColor: "rgba(0,0,0,0)"
					},
					preset4: {
						fontFamily: "Arial,sans-serif",
						size: "1.3em",
						fontColor: "rgba(255,255,0,1)",
						edgeType: null,
						edgeColor: "rgba(0, 0, 0, 1)",
						backgroundColor: "rgba(0,0,0,0)",
						windowColor: "rgba(0,0,0,0.5)"
					},
					instance: null
				};

				CaptioningHTMLMediator.prototype.captionText = null;

				CaptioningHTMLMediator.prototype.settingsUiVisible = false;

				CaptioningHTMLMediator.prototype.captionningStyle = null;

				CaptioningHTMLMediator.prototype.swatchColorCurr = null;

				CaptioningHTMLMediator.prototype.swatchOpacityCurr = null;

				CaptioningHTMLMediator.prototype.colorPicker = null;

				CaptioningHTMLMediator.prototype.colorPickerOpacity = null;

				CaptioningHTMLMediator.prototype.advancedSettingContainer = null;

				CaptioningHTMLMediator.prototype.list = {
					font: null,
					language: null,
					edge: null,
					size: null,
					scroll: null
				};

				CaptioningHTMLMediator.prototype.picker = {
					color: null,
					background: null,
					edge: null,
					window: null
				};

				CaptioningHTMLMediator.prototype.toggle = {
					ON: null,
					OFF: null,
					disabled: false
				};

				CaptioningHTMLMediator.prototype.scroll = {
					type: "popout",
					typeSpeed: 5,
					lines: 2,
					scrollTimer: [],
					speed: 10,
					popout: null,
					rollup: null,
					painton: null
				};

				/**
				 * @override
				 */
				CaptioningHTMLMediator.prototype.onRegister = function() {
					var applyButton, cancelButton, captionContainer, captionLabel, clonedSwatch, color, colorArray, isDefault, listOptions, preset1, preset2, preset3, preset4, previewContainer, previewPara, resetButton, swatch, titleBar, titleText, toggleAdvancedButton, _i, _len,
						_this = this;
					this.captionText = this.create("caption-text", this.viewComponent.parentElement);
					titleBar = this.create("captioning-titlebar");
					titleText = this.create("captioning-title", titleBar, "span", this.localizationManager.getString(LocalizationConstants.MSG_CC_TITLE));
					this.toggle.OFF = this.create("captioning-toggle-btn", titleBar, "div", "OFF");
					this.toggle.ON = this.create("captioning-toggle-btn", titleBar, "div", "ON");
					EventHandler.create(this.toggle.ON, EventHandler.CLICK, function(event) {
						event.stopImmediatePropagation();
						if (!_this.toggle.disabled) {
							_this.toggleButtonHandler(true);
						}
						return false;
					});
					if (!this.toggle.disabled) {
						this.classList.add("captioning-floater-btnselected", this.toggle.OFF);
					}
					EventHandler.create(this.toggle.OFF, EventHandler.CLICK, function(event) {
						event.stopImmediatePropagation();
						if (!_this.toggle.disabled) {
							_this.toggleButtonHandler(false);
						}
						return false;
					});
					captionContainer = this.create("captioning-row");
					captionLabel = this.create("captioning-label", captionContainer, "span", this.localizationManager.getString(LocalizationConstants.MSG_CC_LANGUAGE));
					this.list.language = this.create("captioning-dropdown", captionContainer, "select");
					this.languageListPopulate();
					EventHandler.create(this.list.language, "change", function(event) {
						var langIsSelected;
						event.stopImmediatePropagation();
						langIsSelected = event.target.selectedValue !== "None";
						_this.sendNotification(CaptioningNotifications.VISIBILITY_CHANGE, langIsSelected);
						if (langIsSelected) {
							_this.facade.setTrack(_this.facade.selectTrackByIndex(event.target.selectedIndex));
						}
						return false;
					});
					captionLabel = this.create("captioning-label", captionContainer, "span", this.localizationManager.getString(LocalizationConstants.MSG_CC_PRESETS));
					preset1 = this.create(["captioning-preset", "captioning-preset1"], captionContainer, null, "Aa");
					preset2 = this.create(["captioning-preset", "captioning-preset2"], captionContainer, null, "Aa");
					preset3 = this.create(["captioning-preset", "captioning-preset3"], captionContainer, null, "Aa");
					preset4 = this.create(["captioning-preset", "captioning-preset4"], captionContainer, null, "Aa");
					EventHandler.create(preset1, EventHandler.CLICK, function(event) {
						event.stopImmediatePropagation();
						_this.captioningObject.selected = _this.cloneObject(_this.captioningObject.preset1);
						_this.applyCaptioningStyle();
						return false;
					});
					EventHandler.create(preset2, EventHandler.CLICK, function(event) {
						event.stopImmediatePropagation();
						_this.captioningObject.selected = _this.cloneObject(_this.captioningObject.preset2);
						_this.applyCaptioningStyle();
						return false;
					});
					EventHandler.create(preset3, EventHandler.CLICK, function(event) {
						event.stopImmediatePropagation();
						_this.captioningObject.selected = _this.cloneObject(_this.captioningObject.preset3);
						_this.applyCaptioningStyle();
						return false;
					});
					EventHandler.create(preset4, EventHandler.CLICK, function(event) {
						event.stopImmediatePropagation();
						_this.captioningObject.selected = _this.cloneObject(_this.captioningObject.preset4);
						_this.applyCaptioningStyle();
						return false;
					});
					this.advancedSettingContainer = this.create("captioning-advanced-container");
					captionContainer = this.create("captioning-row", this.advancedSettingContainer);
					captionLabel = this.create("captioning-label", captionContainer, "span", this.localizationManager.getString(LocalizationConstants.MSG_CC_FONT));
					this.list.font = this.create("captioning-dropdown", captionContainer, "select");
					listOptions = this.create(null, this.list.font, "option", "Arial");
					listOptions.value = "Arial,sans-serif";
					this.create(null, this.list.font, "option", "Times New Roman");
					this.create(null, this.list.font, "option", "Courier");
					this.create(null, this.list.font, "option", "Georgia");
					this.create(null, this.list.font, "option", "Helvetica");
					this.create(null, this.list.font, "option", "Verdana");
					this.create(null, this.list.font, "option", "Impact");
					this.create(null, this.list.font, "option", "Comic Sans Serif");
					this.create(null, this.list.font, "option", "Times New Roman");
					EventHandler.create(this.list.font, "change", function(event) {
						event.stopImmediatePropagation();
						_this.captioningObject.selected.fontFamily = event.target.value;
						_this.applyCaptioningStyle(false);
						return false;
					});
					captionContainer.appendChild(this.list.font);
					captionLabel = this.create("captioning-label", captionContainer, "span", this.localizationManager.getString(LocalizationConstants.MSG_CC_EDGE));
					this.list.edge = this.create("captioning-dropdown", captionContainer, "select");
					this.create(null, this.list.edge, "option", "none").value = "none";
					this.create(null, this.list.edge, "option", "Depressed").value = "text-shadow: 0px 1px 0px";
					this.create(null, this.list.edge, "option", "Left drop shadow").value = "text-shadow: -3px 3px 2px";
					this.create(null, this.list.edge, "option", "Raised").value = "text-shadow: 0px 1px 1px";
					this.create(null, this.list.edge, "option", "Right drop shadow").value = "text-shadow: 3px 3px 2px";
					this.create(null, this.list.edge, "option", "Uniform").value = "text-shadow: 0px 0px 4px";
					EventHandler.create(this.list.edge, "change", function(event) {
						event.stopImmediatePropagation();
						_this.captioningObject.selected.edgeType = event.target.value;
						_this.applyCaptioningStyle(false);
						return false;
					});
					captionContainer = this.create("captioning-row", this.advancedSettingContainer);
					this.create("captioning-label", captionContainer, "span", this.localizationManager.getString(LocalizationConstants.MSG_CC_SIZE));
					this.list.size = this.create("captioning-dropdown", captionContainer, "select");
					this.create(null, this.list.size, "option", "Small").value = ".8em";
					this.create(null, this.list.size, "option", "Medium").value = "1.3em";
					this.create(null, this.list.size, "option", "Large").value = "2.3em";
					this.list.size.selectedIndex = 1;
					EventHandler.create(this.list.size, "change", function(event) {
						event.stopImmediatePropagation();
						_this.captioningObject.selected.size = event.target.value;
						_this.applyCaptioningStyle(false);
						return false;
					});
					this.create("captioning-label", captionContainer, "span", this.localizationManager.getString(LocalizationConstants.MSG_CC_SCROLL));
					this.list.scroll = this.create("captioning-dropdown", captionContainer, "select");
					this.create(null, this.list.scroll, "option", "Pop out").value = "popout";
					this.create(null, this.list.scroll, "option", "Roll on").value = "rollon";
					this.create(null, this.list.scroll, "option", "Paint on").value = "painton";
					EventHandler.create(this.list.scroll, "change", function(event) {
						event.stopImmediatePropagation();
						_this.scroll.type = event.target.value;
						if (event.target.value === "painton") {
							_this.captionText.classList.add('akamai-captioning-typed');
						} else {
							_this.captionText.classList.remove('akamai-captioning-typed');
						}
						return false;
					});
					captionContainer = this.create("captioning-row", this.advancedSettingContainer);
					this.create("captioning-label-small", captionContainer, "span", this.localizationManager.getString(LocalizationConstants.MSG_CC_COLOR));
					this.picker.color = this.create("captioning-color-picker", captionContainer);
					this.picker.color.style.backgroundColor = this.captioningObject["default"].fontColor;
					EventHandler.create(this.picker.color, EventHandler.CLICK, function(event) {
						var alpha, _ref;
						event.stopImmediatePropagation();
						_this.colorPicker.style.display = _this.colorPicker.style.display === "block" ? "none" : "block";
						if (_this.colorPicker.style.display === "block") {
							if ((_ref = _this.swatchColorCurr) != null) {
								_ref.style.borderColor = "rgba(0,0,0,0.3)";
							}
							_this.colorPicker.style.left = "152px";
							_this.colorPicker.name = "fontColor";
							_this.captioningObject.instance = _this.picker.color;
							if (_this.picker.color.style.backgroundColor.indexOf('rgba') !== -1) {
								alpha = _this.picker.color.style.backgroundColor.replace(/^rgba?\(|\s+|\)$/g, '').split(',')[3];
							}
							_this.colorPickerOpacity.value = alpha != null ? alpha : 1;
						}
						return false;
					});
					this.create("captioning-label-small", captionContainer, "span", this.localizationManager.getString(LocalizationConstants.MSG_CC_BACKGROUND));
					this.picker.background = this.create("captioning-color-picker", captionContainer);
					this.picker.background.style.backgroundColor = this.captioningObject["default"].backgroundColor;
					EventHandler.create(this.picker.background, EventHandler.CLICK, function(event) {
						var alpha, _ref;
						event.stopImmediatePropagation();
						_this.colorPicker.style.display = _this.colorPicker.style.display === "block" ? "none" : "block";
						if (_this.colorPicker.style.display === "block") {
							if ((_ref = _this.swatchColorCurr) != null) {
								_ref.style.borderColor = "rgba(0,0,0,0.3)";
							}
							_this.colorPicker.style.left = "264px";
							_this.colorPicker.name = "backgroundColor";
							_this.captioningObject.instance = _this.picker.background;
							if (_this.picker.background.style.backgroundColor.indexOf('rgba') !== -1) {
								alpha = _this.picker.background.style.backgroundColor.replace(/^rgba?\(|\s+|\)$/g, '').split(',')[3];
							}
							_this.colorPickerOpacity.value = alpha != null ? alpha : 1;
						}
						return false;
					});
					this.create("captioning-label-small", captionContainer, "span", this.localizationManager.getString(LocalizationConstants.MSG_CC_EDGE));
					this.picker.edge = this.create("captioning-color-picker", captionContainer);
					this.picker.edge.style.backgroundColor = this.captioningObject["default"].edgeColor;
					EventHandler.create(this.picker.edge, EventHandler.CLICK, function(event) {
						var alpha, _ref;
						event.stopImmediatePropagation();
						_this.colorPicker.style.display = _this.colorPicker.style.display === "block" ? "none" : "block";
						if (_this.colorPicker.style.display === "block") {
							if ((_ref = _this.swatchColorCurr) != null) {
								_ref.style.borderColor = "rgba(0,0,0,0.3)";
							}
							_this.colorPicker.style.left = "212px";
							_this.colorPicker.name = "edgeColor";
							_this.captioningObject.instance = _this.picker.edge;
							if (_this.picker.edge.style.backgroundColor.indexOf('rgba') !== -1) {
								alpha = _this.picker.edge.style.backgroundColor.replace(/^rgba?\(|\s+|\)$/g, '').split(',')[3];
							}
							_this.colorPickerOpacity.value = alpha != null ? alpha : 1;
						}
						return false;
					});
					this.create("captioning-label-small", captionContainer, "span", this.localizationManager.getString(LocalizationConstants.MSG_CC_WINDOW));
					this.picker.window = this.create("captioning-color-picker", captionContainer);
					this.picker.window.style.backgroundColor = this.captioningObject["default"].windowColor;
					EventHandler.create(this.picker.window, EventHandler.CLICK, function(event) {
						var alpha, _ref;
						event.stopImmediatePropagation();
						_this.colorPicker.style.display = _this.colorPicker.style.display === "block" ? "none" : "block";
						if (_this.colorPicker.style.display === "block") {
							if ((_ref = _this.swatchColorCurr) != null) {
								_ref.style.borderColor = "rgba(0,0,0,0.3)";
							}
							_this.colorPicker.style.left = "300px";
							_this.colorPicker.name = "windowColor";
							_this.captioningObject.instance = _this.picker.window;
							if (_this.picker.window.style.backgroundColor.indexOf('rgba') !== -1) {
								alpha = _this.picker.window.style.backgroundColor.replace(/^rgba?\(|\s+|\)$/g, '').split(',')[3];
							}
							_this.colorPickerOpacity.value = alpha != null ? alpha : 1;
						}
						return false;
					});
					previewContainer = this.create(["caption-text", "caption-text-preview"]);
					previewPara = this.create(null, previewContainer, "p", "Lorem ipsum dolor sit amet");
					captionContainer = this.create("captioning-footer-container");
					applyButton = this.create("captioning-footer-button", captionContainer, "div", this.localizationManager.getString(LocalizationConstants.MSG_CC_APPLY));
					cancelButton = this.create("captioning-footer-button", captionContainer, "div", this.localizationManager.getString(LocalizationConstants.MSG_CC_CANCEL));
					resetButton = this.create("captioning-footer-button", captionContainer, "div", this.localizationManager.getString(LocalizationConstants.MSG_CC_RESET));
					if (this.facade.getViewComponent().clientWidth >= 0) {
						toggleAdvancedButton = this.create("captioning-advanced-button", captionContainer, "div", this.localizationManager.getString(LocalizationConstants.MSG_CC_SHOW_ADVANCED));
						EventHandler.create(toggleAdvancedButton, EventHandler.CLICK, function(event) {
							event.stopImmediatePropagation();
							if (_this.advancedSettingContainer.style.display === "block") {
								event.target.innerHTML = _this.localizationManager.getString(LocalizationConstants.MSG_CC_SHOW_ADVANCED);
								_this.advancedSettingContainer.style.display = "none";
								_this.colorPicker.style.display = "none";
							} else {
								event.target.innerHTML = _this.localizationManager.getString(LocalizationConstants.MSG_CC_HIDE_ADVANCED);
								_this.advancedSettingContainer.style.display = "block";
							}
							return false;
						});
					}
					EventHandler.create(applyButton, EventHandler.CLICK, function(event) {
						event.stopImmediatePropagation();
						try {
							localStorage.setItem(Namespace.PREFIX + "captioningDefault", JSON.stringify(_this.captioningObject.selected));
						} catch (localStorageError) {
							_this.facade.logger.error("LocalStorage Not Supported on this Browser", localStorageError);
						}
						_this.sendNotification(CaptioningNotifications.SETTINGS_VISIBILITY_CHANGE, _this.settingsUiVisible);
						_this.applyCaptioningStyle(false, true);
						_this.sendNotification(CaptioningNotifications.SETTINGS_CHANGE, _this.captioningObject.selected);
						return false;
					});
					EventHandler.create(cancelButton, EventHandler.CLICK, function(event) {
						event.stopImmediatePropagation();
						_this.sendNotification(CaptioningNotifications.SETTINGS_VISIBILITY_CHANGE, _this.settingsUiVisible);
						return false;
					});
					EventHandler.create(resetButton, EventHandler.CLICK, function(event) {
						event.stopImmediatePropagation();
						_this.colorPicker.style.display = "none";
						_this.applyCaptioningStyle(true);
						return false;
					});
					this.captionningStyle = this.create(null, document.getElementsByTagName('head')[0], "style");
					this.captionningStyle.type = 'text/css';
					colorArray = ["#000000", "#660000", "#990000", "#ff0000", "#000066", "#660066", "#990066", "#ff0066", "#006600", "#666600", "#996600", "#ff6600", "#006666", "#666666", "#996666", "#ff6666", "#009900", "#669966", "#999900", "#ff9900", "#009966", "#669966", "#999966", "#ff9966", "#00ff00", "#66ff00", "#99ff00", "#ffff00", "#00ff66", "#66ff66", "#99ff66", "#ffff66", "#000099", "#660099", "#990099", "#ff0099", "#0000ff", "#6600ff", "#9900ff", "#ff00ff", "#006699", "#666699", "#996699", "#ff6699", "#0066ff", "#6666ff", "#9966ff", "#ff66ff", "#009999", "#669999", "#999999", "#ff9999", "#0099ff", "#6699ff", "#9999ff", "#ff99ff", "#0099ff", "#66ff99", "#99ff99", "#ffff99", "#00ffff", "#66ffff", "#99ffff", "#ffffff"];
					this.colorPicker = this.create("colorpicker-palette", this.viewComponent.parentElement);
					swatch = this.create("colorpicker-swatch", false, null, "&nbsp;");
					for (_i = 0, _len = colorArray.length; _i < _len; _i++) {
						color = colorArray[_i];
						swatch.style.backgroundColor = color;
						clonedSwatch = swatch.cloneNode();
						EventHandler.create(clonedSwatch, EventHandler.CLICK, function(event) {
							event.stopImmediatePropagation();
							if (_this.swatchColorCurr !== null) {
								_this.swatchColorCurr.style.borderColor = "rgba(0,0,0,0.3)";
							}
							_this.swatchColorCurr = event.target;
							_this.swatchColorCurr.style.borderColor = "rgba(255, 50, 50, 1)";
							_this.captioningObject.instance.style.backgroundColor = _this.captioningObject.selected[_this.colorPicker.name] = _this.toRGBA(event.target.style.backgroundColor);
							_this.applyCaptioningStyle(false);
							return false;
						});
						this.colorPicker.appendChild(clonedSwatch);
					}
					this.create("opacity-label", this.colorPicker, "span", this.localizationManager.getString(LocalizationConstants.MSG_CC_OPACITY));
					this.colorPickerOpacity = this.create("colorpicker-slider", this.colorPicker, "input");
					this.colorPickerOpacity.type = "range";
					this.colorPickerOpacity.min = 0;
					this.colorPickerOpacity.max = 1;
					this.colorPickerOpacity.step = .1;
					this.colorPickerOpacity.value = 1;
					EventHandler.create(this.colorPickerOpacity, "change", function(event) {
						event.stopImmediatePropagation();
						_this.captioningObject.instance.style.backgroundColor = _this.captioningObject.selected[_this.colorPicker.name] = _this.toRGBA(_this.captioningObject.instance.style.backgroundColor);
						_this.applyCaptioningStyle(false);
						return false;
					});
					this.swatchOpacityCurr = this.colorPickerOpacity;
					EventHandler.create(document, EventHandler.CLICK, function(event) {
						event.stopImmediatePropagation();
						if (event.target.className !== "akamai-colorpicker-palette" && event.target.className !== "akamai-opacity-label" && event.target.className !== "akamai-colorpicker-slider" && _this.colorPicker.style.display !== "none") {
							_this.colorPicker.style.display = "none";
						}
						return false;
					});
					if (localStorage.getItem(Namespace.PREFIX + "captioningDefault") != null) {
						this.captioningObject.selected = JSON.parse(localStorage.getItem(Namespace.PREFIX + "captioningDefault"));
						this.applyCaptioningStyle(false);
					} else {
						isDefault = !((this.facade.config.style != null) || this.facade.config.style !== "undefined");
						if (!isDefault) {
							this.captioningObject.selected = this.cloneObject(this.facade.config.style);
						}
						this.applyCaptioningStyle(isDefault);
					}
					CaptioningHTMLMediator.__super__.onRegister.call(this);
				};

				CaptioningHTMLMediator.prototype.toRGBA = function(colorCode) {
					var rbga, rgb;
					rgb = colorCode.replace(/^rgba?\(|\s+|\)$/g, '').split(',');
					rbga = 'rgba(' + rgb[0] + "," + rgb[1] + "," + rgb[2] + "," + this.swatchOpacityCurr.value + ')';
					return rbga;
				};

				CaptioningHTMLMediator.prototype.languageListPopulate = function() {
					var language, track, tracks, _i, _len;
					tracks = this.facade.getTracks();
					if (!(tracks != null)) {
						return;
					}
					this.list.language.innerHTML = "";
					for (_i = 0, _len = tracks.length; _i < _len; _i++) {
						track = tracks[_i];
						language = track.language;
						language = this.facade.player.retrieveProxy(LocalizationProxy.NAME).getLanguageString(language);
						if ((language != null) && language !== "") {
							this.create(null, this.list.language, "option", language);
						}
					}
					this.toggle.disabled = this.list.language.childElementCount === 0;
					if (this.toggle.disabled) {
						this.create(null, this.list.language, "option", "None");
					}
				};

				CaptioningHTMLMediator.prototype.cloneObject = function(clone) {
					var cloned, key;
					cloned = {};
					for (key in clone) {
						cloned[key] = clone[key];
					}
					return cloned;
				};

				CaptioningHTMLMediator.prototype.applyCaptioningStyle = function(isDefault, isApply) {
					var backgroundColor, color, edgeType, fontFamily, fontSize, windowColor;
					if (isDefault == null) {
						isDefault = false;
					}
					if (isApply == null) {
						isApply = false;
					}
					if (isDefault) {
						this.captioningObject.selected = this.cloneObject(this.captioningObject["default"]);
						this.list.font.value = this.captioningObject["default"].fontFamily;
						this.list.edge.value = this.captioningObject["default"].edgeType != null ? this.captioningObject["default"].edgeType : "none";
						this.list.size.value = this.captioningObject["default"].size;
						this.list.scroll.value = this.captioningObject["default"].scroll;
						this.picker.color.style.backgroundColor = this.captioningObject["default"].fontColor;
						this.picker.background.style.backgroundColor = this.captioningObject["default"].backgroundColor;
						this.picker.edge.style.backgroundColor = this.captioningObject["default"].edgeColor;
						this.picker.window.style.backgroundColor = this.captioningObject["default"].windowColor;
					} else {
						if (this.captioningObject.selected.fontFamily != null) {
							this.list.font.value = this.captioningObject.selected.fontFamily;
						}
						this.list.edge.value = this.captioningObject.selected.edgeType != null ? this.captioningObject.selected.edgeType : "none";
						if (this.captioningObject.selected.size != null) {
							this.list.size.value = this.captioningObject.selected.size;
						}
						this.picker.color.style.backgroundColor = this.captioningObject.selected.fontColor;
						if (this.captioningObject.selected.backgroundColor != null) {
							this.picker.background.style.backgroundColor = this.captioningObject.selected.backgroundColor;
						}
						if (this.captioningObject.selected.edgeColor != null) {
							this.picker.edge.style.backgroundColor = this.captioningObject.selected.edgeColor;
						}
						if (this.captioningObject.selected.windowColor != null) {
							this.picker.window.style.backgroundColor = this.captioningObject.selected.windowColor;
						}
					}
					fontFamily = "font-family: " + (isDefault ? this.captioningObject["default"].fontFamily : this.list.font.value) + " !important;";
					edgeType = (isDefault ? this.captioningObject["default"].edgeType + this.captioningObject["default"].edgeColor : this.list.edge.value + " " + this.picker.edge.style.backgroundColor) + " !important;";
					fontSize = "font-size: " + (isDefault ? this.captioningObject["default"].size : this.list.size.value) + " !important;";
					color = "color: " + (isDefault ? this.captioningObject["default"].fontColor : this.picker.color.style.backgroundColor) + " !important;";
					backgroundColor = "background-color: " + (isDefault ? this.captioningObject["default"].backgroundColor : this.picker.background.style.backgroundColor) + " !important;";
					windowColor = "background-color: " + (isDefault ? this.captioningObject["default"].windowColor : this.picker.window.style.backgroundColor) + " !important;";
					if (isApply) {
						this.captionningStyle.innerHTML = this.captioningObject.appliedStyleText = '.akamai-caption-text { ' + fontFamily + fontSize + edgeType + windowColor + ' }' + '.akamai-caption-text p { ' + color + backgroundColor + ' }';
					} else {
						this.captionningStyle.innerHTML = this.captioningObject.appliedStyleText + '.akamai-caption-text-preview { ' + fontFamily + fontSize + edgeType + windowColor + ' }' + '.akamai-caption-text-preview p { ' + color + backgroundColor + ' }';
					}
				};

				CaptioningHTMLMediator.prototype.toggleButtonHandler = function(isON) {
					if (isON == null) {
						isON = false;
					}
					if (isON) {
						this.classList.add("captioning-floater-btnselected", this.toggle.ON);
						this.classList.remove("captioning-floater-btnselected", this.toggle.OFF);
					} else {
						this.classList.add("captioning-floater-btnselected", this.toggle.OFF);
						this.classList.remove("captioning-floater-btnselected", this.toggle.ON);
					}
					this.sendNotification(CaptioningNotifications.VISIBILITY_CHANGE, isON);
					this.sendNotification(UserSettingsNotifications.UPDATE_SETTINGS, {
						captioning: {
							hidden: !isON
						}
					});
				};

				/* Get Caption Container Display Height
				 */
				CaptioningHTMLMediator.prototype.getCaptionDisplayHeight = function() {
					var height, i, length;
					height = 0;
					i = length = this.captionText.childNodes.length;
					while (i) {
						--i;
						if (length === 3 && i === 0) {
							break;
						}
						height += Utils.getActualSize(this.captionText.childNodes[i]).height;
					}
					return height + "px";
				};

				/* Scroll Captions
				 */
				CaptioningHTMLMediator.prototype.scrollCaptions = function(scrollHeight, scrollTop, steps) {
					var captionTextInstance, scroll, stepSize;
					if (scrollHeight == null) {
						scrollHeight = this.captionText.scrollHeight;
					}
					if (scrollTop == null) {
						scrollTop = this.captionText.scrollTop;
					}
					if (steps == null) {
						steps = 20;
					}
					stepSize = (scrollHeight - scrollTop) / steps;
					captionTextInstance = this.captionText;
					scroll = function() {
						var _results;
						if (scrollTop < scrollHeight) {
							captionTextInstance.scrollTop = scrollTop += stepSize;
							return setTimeout(scroll, 20);
						} else {
							_results = [];
							while (captionTextInstance.childNodes.length > 2) {
								_results.push(captionTextInstance.removeChild(captionTextInstance.firstChild));
							}
							return _results;
						}
					};
					scroll();
				};

				/**
				 * @override
				 */
				CaptioningHTMLMediator.prototype.listNotificationInterests = function() {
					return [CaptioningNotifications.CUE_CHANGE, CaptioningNotifications.SETTINGS_VISIBILITY_CHANGE, CaptioningNotifications.TOGGLE_SETTINGS_VISIBILITY, CaptioningNotifications.SETTINGS_CHANGE];
				};

				/**
				 * @override
				 */
				CaptioningHTMLMediator.prototype.handleNotification = function(notification) {
					var body, captions, childNode, cue, i, name, note, state, temp, _i, _j, _len, _len1, _ref;
					name = notification.getName();
					body = notification.getBody();
					switch (name) {
						case CaptioningNotifications.CUE_CHANGE:
							captions = "";
							for (_i = 0, _len = body.length; _i < _len; _i++) {
								cue = body[_i];
								captions += cue.html;
							}
							switch (this.scroll.type) {
								case "popout":
									this.captionText.innerHTML = captions;
									break;
								case "rollon":
								case "painton":
									temp = document.createElement("div");
									temp.innerHTML = captions;
									_ref = temp.childNodes;
									for (i = _j = 0, _len1 = _ref.length; _j < _len1; i = ++_j) {
										childNode = _ref[i];
										this.captionText.appendChild(childNode);
									}
									this.captionText.style.maxHeight = this.getCaptionDisplayHeight();
									this.scrollCaptions();
							}
							break;
						case CaptioningNotifications.SETTINGS_VISIBILITY_CHANGE:
						case CaptioningNotifications.TOGGLE_SETTINGS_VISIBILITY:
							if (this.settingsUiVisible) {
								this.colorPicker.style.display = "none";
							}
							this.settingsUiVisible = !this.settingsUiVisible;
							if (this.settingsUiVisible && this.list.language.length === 1) {
								this.languageListPopulate();
							}
							note = this.settingsUiVisible ? Notifications.ADD_APPLICATION_STATE : Notifications.REMOVE_APPLICATION_STATE;
							state = "cc-setting-active";
							this.sendNotification(note, state);
							break;
						case CaptioningNotifications.SETTINGS_CHANGE:
							this.captioningObject.selected = body;
							this.applyCaptioningStyle(false, true);
					}
				};

				/**
				 * The CaptioningMediator class.
				 *
				 * @constructor
				 * @private
				 * @extends {PluginMediator}
				 * @param {Object} viewComponent
				 */
				function CaptioningNativeMediator(viewComponent) {
					CaptioningNativeMediator.__super__.constructor.call(this, CaptioningNativeMediator.NAME, viewComponent);
				}


				__extends(CaptioningNativeMediator, LocalizedMediator);


				/**
				 * The name of the this Mediator.
				 *
				 * @static
				 * @type {string}
				 */
				CaptioningNativeMediator.NAME = "CaptioningNativeMediator";

				CaptioningNativeMediator.prototype.video = null;

				CaptioningNativeMediator.prototype.index = -1;

				CaptioningNativeMediator.prototype.plugin = null;

				/**
				 * @override
				 */
				CaptioningNativeMediator.prototype.onRegister = function() {
					this.video = this.facade.player.mediaElement;
					this.plugin = this.facade.retrieveProxy(CaptioningProxy.NAME);
				};

				/**
				 * @override
				 */
				CaptioningNativeMediator.prototype.listNotificationInterests = function() {
					return [CaptioningNotifications.VISIBILITY_CHANGE, CaptioningNotifications.TRACK_SELECTED, CaptioningNotifications.TRACKS_LOADED];
				};

				/**
				 * @override
				 */
				CaptioningNativeMediator.prototype.handleNotification = function(notification) {
					var body, cue, textTrack, textTrackCue, track, _i, _j, _len, _len1, _ref;
					body = notification.getBody();
					switch (notification.getName()) {
						case CaptioningNotifications.TRACKS_LOADED:
							for (_i = 0, _len = body.length; _i < _len; _i++) {
								track = body[_i];
								if (!(track.kind === "captions" || track.kind === "subtitles")) {
									continue;
								}
								textTrack = this.video.addTextTrack(track.kind, track.label, track.srclang);
								_ref = track.cues;
								for (_j = 0, _len1 = _ref.length; _j < _len1; _j++) {
									cue = _ref[_j];
									textTrackCue = new TextTrackCue(cue.startTime, cue.endTime, cue.text);
									cue.id = cue.id;
									textTrack.addCue(textTrackCue);
								}
							}
							break;
						case CaptioningNotifications.TRACK_SELECTED:
							if (this.index > -1) {
								this.video.textTracks[this.index].mode = "hidden";
							}
							this.index = this.plugin.getTracks().indexOf(body);
							if (!this.plugin.getHidden()) {
								this.video.textTracks[this.index].mode = "showing";
							}
							break;
						case CaptioningNotifications.VISIBILITY_CHANGE:
							this.video.textTracks[this.index].mode = this.plugin.getHidden() ? "hidden" : "showing";
					}
				};

				/**
				 * PluginMediator class.
				 *
				 * @constructor
				 * @private
				 * @extends {OverlayMediator}
				 */
				function PluginMediator() {
					PluginMediator.__super__.constructor.call(this);
				}


				__extends(PluginMediator, OverlayMediator);


				/** @override
				 */
				PluginMediator.prototype.initializeNotifier = function(key) {
					PluginMediator.__super__.initializeNotifier.call(this, key);
					this.plugin = this.facade.retrieveProxy(ModuleProxy.NAME);
					this.media = this.facade.player.retrieveProxy(MediaProxy.NAME);
				};

				/** @override
				 */
				PluginMediator.prototype.onRegister = function() {
					PluginMediator.__super__.onRegister.call(this);
					this.facade.viewComponent = this.viewComponent;
				};

				/**
				 * The CaptioningMediator class.
				 *
				 * @constructor
				 * @private
				 * @extends {PluginMediator}
				 * @param {Object} viewComponent
				 */
				function CaptioningMediator(viewComponent) {
					CaptioningMediator.__super__.constructor.call(this, viewComponent);
				}


				__extends(CaptioningMediator, PluginMediator);


				CaptioningMediator.prototype.componentName = "captioning";

				CaptioningMediator.prototype.captionButton = null;

				/**
				 * @override
				 */
				CaptioningMediator.prototype.onRegister = function() {
					var button;
					button = new ButtonMediator(this.localizationManager.getString(LocalizationConstants.MSG_CC), this.viewComponent, null, "caption", this.onclick.bind(this));
					this.facade.registerMediator(button);
					this.captionButton = button.getViewComponent();
					this.sendNotification(Notifications.ADD_CONTROL, this.captionButton);
					CaptioningMediator.__super__.onRegister.call(this);
				};

				/**
				 */
				CaptioningMediator.prototype.onclick = function(event) {
					var _ref;
					event.stopImmediatePropagation();
					if (((_ref = this.plugin.getTrack()) != null ? _ref.type : void 0) === "embedded") {
						this.sendNotification(CaptioningNotifications.VISIBILITY_CHANGE, this.plugin.getHidden());
					} else if (event.currentTarget === this.captionButton) {
						this.sendNotification(CaptioningNotifications.SETTINGS_VISIBILITY_CHANGE, this.plugin.getHidden());
					}
					return false;
				};

				/**
				 * @override
				 */
				CaptioningMediator.prototype.listNotificationInterests = function() {
					return [CaptioningNotifications.VISIBILITY_CHANGE, CaptioningNotifications.ENABLED, CaptioningNotifications.TRACK_SELECTED];
				};

				/**
				 * @override
				 */
				CaptioningMediator.prototype.handleNotification = function(notification) {
					var body, note, state;
					body = notification.getBody();
					note = body ? Notifications.ADD_APPLICATION_STATE : Notifications.REMOVE_APPLICATION_STATE;
					switch (notification.getName()) {
						case CaptioningNotifications.TRACK_SELECTED:
							state = "cc-embedded";
							note = body.type === "embedded" ? Notifications.ADD_APPLICATION_STATE : Notifications.REMOVE_APPLICATION_STATE;
							break;
						case CaptioningNotifications.VISIBILITY_CHANGE:
							state = "cc-active";
							break;
						case CaptioningNotifications.ENABLED:
							note = body ? Notifications.ADD_CONTROL_STATE : Notifications.REMOVE_CONTROL_STATE;
							state = "cc-enabled";
					}
					this.sendNotification(note, state);
				};

				/**
				 * The OmniturePlugin class.
				 *
				 * @param {Module}  app     The parent module of this plugin.
				 * @constructor
				 * @private
				 * @extends {Plugin}
				 */
				function OmniturePlugin() {
					OmniturePlugin.__super__.constructor.call(this);
				}


				__extends(OmniturePlugin, Plugin);


				OmniturePlugin.prototype.moduleName = "omniture";

				/** @override
				 */
				OmniturePlugin.prototype.createController = function() {
					this.registerCommand(Notifications.CHANGE_MEDIA, OmnitureChangeMediaCommand);
					this.registerCommand(Notifications.ENDED, OmnitureEndedCommand);
					this.registerCommand(Notifications.STARTED, OmnitureStartCommand);
					this.registerCommand(Notifications.PAUSE, OmniturePauseCommand);
					this.registerCommand(Notifications.SEEKING, OmnitureSeekingCommand);
					this.registerCommand(Notifications.SEEKED, OmnitureSeekedCommand);
					this.registerCommand(Notifications.CHANGE_CONTENT, OmnitureEndedCommand);
					this.registerCommand(Notifications.CONTENT_CHANGED, OmnitureContentChangedCommand);
				};

				/** @override
				 */
				OmniturePlugin.prototype.createModel = function() {
					if ((this.config.heartbeat != null) && this.config.heartbeat.enabled === true) {
						this.registerProxy(new HeartbeatProxy(this.config));
					} else {
						this.registerProxy(new OmnitureProxy(this.config));
					}
				};

				/**
				 */
				OmniturePlugin.prototype.listNotificationInterests = function() {
					return [Notifications.CHANGE_MEDIA, Notifications.CHANGE_CONTENT, Notifications.CONTENT_CHANGED, Notifications.TIME_UPDATE, Notifications.ENDED, Notifications.STARTED, Notifications.PLAY, Notifications.PAUSE, Notifications.SEEKING, Notifications.SEEKED, AdNotifications.AD_LOADED, AdNotifications.AD_STARTED, AdNotifications.AD_PLAY, AdNotifications.AD_PAUSE, AdNotifications.AD_TIME_REMAINING, AdNotifications.BREAK_END];
				};


				AMP.registerPlugin("omniture", "html", OmniturePlugin);
				AMP.registerPlugin("omniture", "flash", OmnitureWrapper);

				/**
				 * @constructor
				 * @private
				 */
				function InfoWrapper(player, config) {
					if (config == null) {
						config = {};
					}
					InfoWrapper.__super__.constructor.call(this, player, config);
				}


				__extends(InfoWrapper, PluginWrapper);


				InfoWrapper.NAME = "InfoWrapper";

				/** @override
				 */
				InfoWrapper.prototype.listNotificationInterests = function() {
					return [FlashNotifications.CREATE_FLASH_VARS, FlashNotifications.CREATE_XML, FlashNotifications.SHARE, FlashNotifications.SHARE_REQUEST];
				};

				/**
				 */
				InfoWrapper.prototype.handleNotification = function(notification) {
					var application, body, data, element, elements, flashvars, info, name, property, provider, text, type, view, xml, _i, _len;
					name = notification.getName();
					body = notification.getBody();
					switch (name) {
						case FlashNotifications.CREATE_FLASH_VARS:
							flashvars = body.flashvars;
							break;
						case FlashNotifications.CREATE_XML:
							xml = body.xml;
							application = xml.firstChild;
							view = xml.getElementsByTagName("view")[0];
							elements = xml.getElementsByTagName("element");
							for (_i = 0, _len = elements.length; _i < _len; _i++) {
								element = elements[_i];
								if (!(element.getAttribute("id") === "infoOverlayAdvanced")) {
									continue;
								}
								info = element;
								break;
							}
							if (!(view != null)) {
								return;
							}
							if (!(info != null)) {
								info = xml.createElement("element");
								info.setAttribute("id", "infoOverlayAdvanced");
								info.setAttribute("displayStates", "preplay,paused,ns,fs,mouseover");
								view.insertBefore(info, view.childNodes[0]);
							}
							data = xml.createElement("data");
							info.appendChild(data);
							if (this.config.title != null) {
								property = xml.createElement("property");
								property.setAttribute("key", "title");
								text = XMLUtils.createTextContent(xml, this.config.title);
								property.appendChild(text);
								data.appendChild(property);
							}
							if (this.config.description != null) {
								property = xml.createElement("property");
								property.setAttribute("key", "description");
								text = XMLUtils.createTextContent(xml, this.config.description);
								property.appendChild(text);
								data.appendChild(property);
							}
							if (this.config.more != null) {
								property = xml.createElement("property");
								property.setAttribute("key", "more");
								text = XMLUtils.createTextContent(xml, this.config.more);
								property.appendChild(text);
								data.appendChild(property);
							}
							if (this.config.less != null) {
								property = xml.createElement("property");
								property.setAttribute("key", "less");
								text = XMLUtils.createTextContent(xml, this.config.less);
								property.appendChild(text);
								data.appendChild(property);
							}
							if (this.config.provider != null) {
								provider = xml.createElement("property");
								provider.setAttribute("key", "provider");
								data.appendChild(provider);
								if (this.config.provider.name != null) {
									property = xml.createElement("property");
									property.setAttribute("key", "name");
									text = XMLUtils.createTextContent(xml, this.config.provider.name);
									property.appendChild(text);
									provider.appendChild(property);
								}
								if (this.config.provider.image != null) {
									property = xml.createElement("property");
									property.setAttribute("key", "image");
									text = XMLUtils.createTextContent(xml, this.config.provider.image);
									property.appendChild(text);
									provider.appendChild(property);
								}
							}
							break;
						case FlashNotifications.SHARE:
						case FlashNotifications.SHARE_REQUEST:
							type = "share";
					}
					if (type != null) {
						return this.dispatchEvent(new Event(type, body));
					}
				};


				AMP.registerPlugin("info", "flash", InfoWrapper);

				/**
				 * The InfoMediator class.
				 *
				 * @constructor
				 * @private
				 * @extends {PluginMediator}
				 */
				function InfoMediator() {
					InfoMediator.__super__.constructor.call(this);
				}


				__extends(InfoMediator, PluginMediator);


				InfoMediator.prototype.componentName = "info";

				InfoMediator.prototype.title = null;

				InfoMediator.prototype.shortDescription = null;

				InfoMediator.prototype.icon = null;

				InfoMediator.prototype.provider = null;

				/**
				 * @override
				 */
				InfoMediator.prototype.onRegister = function() {
					this.title = this.create("info-title");
					this.provider = this.create("info-provider");
					this.shortDescription = this.create("info-short-description");
					this.icon = this.create("info-icon", this, "img");
					this.dataChangedHandler();
					InfoMediator.__super__.onRegister.call(this);
				};

				/**
				 * @override
				 */
				InfoMediator.prototype.listNotificationInterests = function() {
					return [Notifications.MEDIA_CHANGE];
				};

				/**
				 * @override
				 */
				InfoMediator.prototype.handleNotification = function(notification) {
					var body, name;
					name = notification.getName();
					body = notification.getBody();
					switch (name) {
						case Notifications.MEDIA_CHANGE:
							this.dataChangedHandler();
					}
				};

				InfoMediator.prototype.moreClicked = function(event) {
					return this.classList.add("open");
				};

				InfoMediator.prototype.closeClicked = function(event) {
					return this.classList.remove("open");
				};

				InfoMediator.prototype.dataChangedHandler = function() {
					var styles, _ref;
					if (this.plugin.value.title != null) {
						this.title.textContent = this.plugin.value.title;
					}
					if (((_ref = this.plugin.value.provider) != null ? _ref.image : void 0) != null) {
						this.icon.src = this.plugin.value.provider.image;
					}
					styles = getComputedStyle(this.title);
					if (this.title.clientHeight > parseInt(styles.lineHeight)) {
						this.classList.add("info-small");
						this.shortDescription.innerHTML = this.provider.innerHTML = "";
						return;
					} else {
						this.classList.remove("info-small");
					}
					this.truncateDescription(this.plugin.value.description, this.plugin.value.more);
					this.provider.textContent = this.plugin.value.provider.name != null ? "" + this.plugin.value.provider.name : "";
				};

				InfoMediator.prototype.truncateDescription = function(desc) {
					var character, ellp, index, text, tf, _i, _len;
					ellp = "...";
					text = "";
					tf = this.shortDescription;
					tf.textContent = "";
					if (!(desc != null)) {
						return;
					}
					for (index = _i = 0, _len = desc.length; _i < _len; index = ++_i) {
						character = desc[index];
						tf.textContent = text + character + ellp;
						if (tf.scrollHeight > tf.clientHeight) {
							tf.textContent = text + ellp;
							break;
						} else {
							text += character;
						}
					}
				};

				/**
				 * The InfoProxy class.
				 *
				 * @constructor
				 * @private
				 * @extends {DataBoundConfigurationProxy}
				 * @param {Object} data
				 */
				function InfoProxy(data) {
					InfoProxy.__super__.constructor.call(this, data);
				}


				__extends(InfoProxy, DataBoundConfigurationProxy);


				InfoProxy.prototype.configurationName = "info";

				/** @static
				 */
				InfoProxy.NAME = ModuleProxy.NAME;

				InfoProxy.prototype.defaults = {
					title: '#{media.title}',
					description: '#{media.description}',
					provider: {},
					more: "read more",
					less: "less"
				};

				/**
				 * The CaptioningPlugin class.
				 *
				 * @param {Module}  app     The parent module of this plugin.
				 * @constructor
				 * @private
				 * @extends {Feature}
				 */
				function CaptioningPlugin() {
					CaptioningPlugin.__super__.constructor.call(this);
				}


				__extends(CaptioningPlugin, Feature);


				CaptioningPlugin.prototype.featureName = "captioning";

				CaptioningPlugin.prototype.moduleName = "captioning";

				/** @override
				 */
				CaptioningPlugin.prototype.createController = function() {
					this.registerCommand(Notifications.CHANGE_MEDIA, CaptioningChangeMediaCommand);
					this.registerCommand(Notifications.STARTED, CaptioningStartedCommand);
					this.registerCommand(Notifications.TIME_UPDATE, CaptioningTimeUpdateCommand);
					this.registerCommand(CaptioningNotifications.VISIBILITY_CHANGE, CaptioningVisibilityChangeCommand);
				};

				/** @override
				 */
				CaptioningPlugin.prototype.createModel = function() {
					this.proxy = new CaptioningProxy(this.config);
					this.registerProxy(this.proxy);
				};

				/** @override
				 */
				CaptioningPlugin.prototype.createView = function() {
					var mediator;
					mediator = new CaptioningMediator();
					this.registerMediator(mediator);
					this.registerMediator(new CaptioningHTMLMediator(mediator.viewComponent));
				};

				/** @override
				 */
				CaptioningPlugin.prototype.createAPI = function() {
					return new CaptioningAPI(this);
				};

				/**
				 */
				CaptioningPlugin.prototype.listNotificationInterests = function() {
					return [Notifications.CHANGE_MEDIA, Notifications.STARTED, Notifications.TIME_UPDATE, CaptioningNotifications.TOGGLE_SETTINGS_VISIBILITY];
				};

				/**
				 */
				CaptioningPlugin.prototype.listNotificationPublications = function() {
					var key, value;
					return CaptioningPlugin.__super__.listNotificationPublications.call(this).concat((function() {
						var _results;
						_results = [];
						for (key in CaptioningNotifications) {
							value = CaptioningNotifications[key];
							if (value !== CaptioningNotifications.TOGGLE_SETTINGS_VISIBILITY) {
								_results.push(value);
							}
						}
						return _results;
					})()).concat([Notifications.ADD_CONTROL, Notifications.REMOVE_CONTROL, UserSettingsNotifications.UPDATE_SETTINGS, Notifications.ADD_CONTROL_STATE, Notifications.REMOVE_CONTROL_STATE]);
				};

				/** @override
				 */
				CaptioningPlugin.prototype.listNotificationEvents = function() {
					return [CaptioningNotifications.VISIBILITY_CHANGE, CaptioningNotifications.ENABLED];
				};

				/**
				 * @return {boolean} The hidden flag.
				 * @expose
				 */
				CaptioningPlugin.prototype.getHidden = function() {
					return this.proxy.getHidden();
				};

				/**
				 * @param {boolean} value The hidden flag.
				 * @expose
				 */
				CaptioningPlugin.prototype.setHidden = function(value) {
					this.sendNotification(CaptioningNotifications.VISIBILITY_CHANGE, !value);
					return value;
				};

				/**
				 * Returns an array of caption tracks
				 *
				 * @return {Array.<CaptionTrack>} The list of text tracks.
				 * @expose
				 */
				CaptioningPlugin.prototype.getTracks = function() {
					return this.proxy.getTracks();
				};

				/**
				 * Returns the currently selected track.
				 *
				 * @return {CaptionTrack} The currently selected caption track.
				 * @expose
				 */
				CaptioningPlugin.prototype.getTrack = function() {
					return this.proxy.getTrack();
				};

				/**
				 * Selects a caption track
				 *
				 * @param {CaptionTrack} value The caption track to select
				 * @expose
				 */
				CaptioningPlugin.prototype.setTrack = function(value) {
					this.proxy.setTrack(value);
					return value;
				};

				/**
				 * Selects a caption track by its index in the getTracks array.
				 *
				 * @param {number}        index   The index to select
				 * @return {CaptionTrack}         The selected caption track.
				 * @expose
				 */
				CaptioningPlugin.prototype.selectTrackByIndex = function(index) {
					return this.proxy.selectTrackByIndex(index);
				};

				/**
				 * Selects a caption track by it's language property.
				 *
				 * @param {string}        lang  The language to select
				 * @return {CaptionTrack}       The selected caption track.
				 * @expose
				 */
				CaptioningPlugin.prototype.selectTrackByLanguage = function(lang) {
					return this.proxy.selectTrackByLanguage(lang);
				};

				/**
				 * Sets a caption Settings Object (styles)
				 *
				 * @param {Object}  object  The caption settings object.
				 * @expose
				 */
				CaptioningPlugin.prototype.changeSettings = function(object) {
					this.sendNotification(CaptioningNotifications.SETTINGS_CHANGE, object);
					return object;
				};


				AMP.registerPlugin("captioning", "html", CaptioningPlugin);

				function IMAWrapper() {
					return IMAWrapper.__super__.constructor.apply(this, arguments);
				}


				__extends(IMAWrapper, AdWrapper);


				IMAWrapper.NAME = "IMAWrapper";

				/**
				 */
				IMAWrapper.prototype.createXML = function(xml) {
					var admedia, application, companion, companions, ids, overlay, prop, props, vendor, _i, _j, _k, _len, _len1, _len2, _ref;
					application = xml.firstChild;
					admedia = xml.getElementsByTagName("admedia")[0];
					if (!(admedia != null)) {
						admedia = xml.createElement("admedia");
						application.appendChild(admedia);
					}
					vendor = xml.createElement("vendor");
					vendor.setAttribute("id", "dfp");
					admedia.appendChild(vendor);
					props = [
						{
							value: this.config.adTagUrl,
							key: "DFP_AD_TAG_URL"
						}, {
							value: this.config.maxBitrate,
							key: "DFP_MAX_BITRATE"
						}, {
							value: this.config.sceneMarkers,
							key: "displaySceneMarkers"
						}, {
							value: this.config.ppid,
							key: "DFP_PPID"
						}
					];
					for (_i = 0, _len = props.length; _i < _len; _i++) {
						prop = props[_i];
						if (prop.value != null) {
							this.createProperty(xml, prop.key, prop.value, vendor);
						}
					}
					if (this.config.position != null) {
						vendor.setAttribute("position", this.config.position);
					}
					if (this.config.params != null) {
						if (this.config.params.adTag != null) {
							this.createProperty(xml, "DFP_AD_TAG_PARAMS", this.config.params.adTag, vendor);
						}
						if (this.config.params.manual != null) {
							this.createProperty(xml, "DFP_MANUAL_PARAMS", this.config.params.manual, vendor);
						}
					}
					if (this.config.companions != null) {
						companions = [];
						ids = [];
						_ref = this.config.companions;
						for (_j = 0, _len1 = _ref.length; _j < _len1; _j++) {
							companion = _ref[_j];
							companions.push(companion.width + "x" + companion.height);
							ids.push(companion.id);
						}
						this.createProperty(xml, "DFP_SIZE", companions.join(","), vendor);
						this.createProperty(xml, "COMPANION_ID", ids.join(","), vendor);
					}
					if (this.config.disableCompanionAds != null) {
						this.createProperty(xml, "disableCompanionAds", this.config.disableCompanionAds, vendor);
					}
					if (this.config.overlay != null) {
						if (this.config.overlay.enabled === true) {
							overlay = xml.createElement("overlay");
							admedia.appendChild(overlay);
						}
						props = [
							{
								value: "dfp",
								key: "OVERLAY_AD_PARTNER"
							}, {
								value: this.config.overlay.adTagUrl,
								key: "OVERLAY_AD_BASE_URL"
							}, {
								value: this.config.overlay.delay,
								key: "OVERLAY_AD_DELAY"
							}, {
								value: this.config.overlay.interval,
								key: "OVERLAY_AD_INTERVAL"
							}, {
								value: this.config.overlay.duration,
								key: "OVERLAY_AD_DURATION"
							}, {
								value: "" + this.config.overlay.width + "x" + this.config.overlay.height,
								key: "OVERLAY_AD_SIZE"
							}
						];
						for (_k = 0, _len2 = props.length; _k < _len2; _k++) {
							prop = props[_k];
							if (prop.value != null) {
								this.createProperty(xml, prop.key, prop.value, overlay);
							}
						}
					}
					return xml;
				};

				/**
				 * The IMAFullscreenProxy class.
				 *
				 * @constructor
				 * @private
				 * @extends {IMAProxy}
				 * @param   {Object}    config  The configuration object.
				 */
				function IMAFullscreenProxy(config) {
					IMAFullscreenProxy.__super__.constructor.call(this, config);
				}


				__extends(IMAFullscreenProxy, IMAProxy);


				/** @static
				 */
				IMAFullscreenProxy.NAME = IMAProxy.NAME;

				/**
				 */
				IMAFullscreenProxy.prototype.createPlugin = function() {
					return new google.ima.AdDisplayContainer(this.facade.getViewComponent().container, this.facade.player.getMediaElement(), this.facade.getViewComponent().container);
				};

				/** @override
				 */
				IMAFullscreenProxy.prototype.engage = function(media) {
					IMAFullscreenProxy.__super__.engage.call(this, media);
					this.sendNotification(Notifications.DISABLE_VIDEO_EVENTS, ["paused", "ended", "durationchange", "error"]);
				};

				/** @override
				 */
				IMAFullscreenProxy.prototype.reset = function(media) {
					IMAFullscreenProxy.__super__.reset.call(this, media);
					this.sendNotification(Notifications.ENABLE_VIDEO_EVENTS, ["paused", "ended", "durationchange", "error"]);
				};

				/** @override
				 */
				IMAFullscreenProxy.prototype.breakStart = function() {
					this.playbackCore = this.facade.player.retrieveProxy(PlayerProxy.NAME).getActivePlaybackCore();
					this.playbackCore.setEnabled(false);
				};

				/** @override
				 */
				IMAFullscreenProxy.prototype.breakEnd = function() {
					IMAFullscreenProxy.__super__.breakEnd.call(this);
					this.playbackCore.setEnabled(true);
				};

				/**
				 * The IMAAddOverlayCommand class.
				 *
				 * @constructor
				 * @private
				 * @extends {puremvc.SimpleCommand}
				 */
				function IMAAddOverlayCommand() {
					IMAAddOverlayCommand.__super__.constructor.call(this);
				}


				__extends(IMAAddOverlayCommand, puremvc.SimpleCommand);


				/**
				 * Executes the command.
				 *
				 * @param {puremvc.Notification} notification
				 *    The notification.
				 *
				 * @override
				 */
				IMAAddOverlayCommand.prototype.execute = function(notification) {
					this.facade.sendNotification(Notifications.ADD_APPLICATION_STATE, "ad-overlay-mode");
				};

				/**
				 * The IMARemoveOverlayCommand class.
				 *
				 * @constructor
				 * @private
				 * @extends {puremvc.SimpleCommand}
				 */
				function IMARemoveOverlayCommand() {
					IMARemoveOverlayCommand.__super__.constructor.call(this);
				}


				__extends(IMARemoveOverlayCommand, puremvc.SimpleCommand);


				/**
				 * Executes the command.
				 *
				 * @param {puremvc.Notification} notification
				 *    The notification.
				 *
				 * @override
				 */
				IMARemoveOverlayCommand.prototype.execute = function(notification) {
					var proxy;
					proxy = this.facade.retrieveProxy(IMAOverlayProxy.NAME);
					proxy.stop();
					this.facade.player.sendNotification(Notifications.REMOVE_APPLICATION_STATE, "ad-overlay-mode");
				};

				/**
				 * The IMAOverlayMediator class.
				 *
				 * @constructor
				 * @private
				 * @extends {OverlayMediator}
				 * @param {Object} viewComponent
				 */
				function IMAOverlayMediator() {
					IMAOverlayMediator.__super__.constructor.call(this);
				}


				__extends(IMAOverlayMediator, OverlayMediator);


				IMAOverlayMediator.prototype.componentName = "ad-overlay";

				IMAOverlayMediator.prototype.anchor = null;

				IMAOverlayMediator.prototype.image = null;

				IMAOverlayMediator.prototype.tracker = null;

				IMAOverlayMediator.prototype.tracker2 = null;

				IMAOverlayMediator.prototype.closeButton = null;

				IMAOverlayMediator.prototype.closeText = null;

				/**
				 * @override
				 */
				IMAOverlayMediator.prototype.onRegister = function() {
					var _this = this;
					this.anchor = this.create("ad-overlay-anchor");
					this.anchor.target = "_blank";
					this.image = this.create("ad-overlay-img", this.anchor, "img");
					this.tracker = this.create();
					this.tracker.width = 0;
					this.tracker.height = 0;
					this.tracker2 = this.create(null, this, "img");
					this.tracker2.width = 0;
					this.tracker2.height = 0;
					this.closeButton = this.create("ad-close-button", this.anchor);
					this.closeButton.onclick = function(event) {
						event.stopImmediatePropagation();
						_this.sendNotification(IMANotifications.REMOVE_OVERLAY);
						return false;
					};
					this.closeText = this.createText("ad-close-text", "x", this.closeButton);
					IMAOverlayMediator.__super__.onRegister.call(this);
				};

				/**
				 * @override
				 */
				IMAOverlayMediator.prototype.listNotificationInterests = function() {
					return [IMANotifications.ADD_OVERLAY, IMANotifications.REMOVE_OVERLAY];
				};

				/**
				 * @override
				 */
				IMAOverlayMediator.prototype.handleNotification = function(notification) {
					var ad;
					switch (notification.getName()) {
						case IMANotifications.ADD_OVERLAY:
							ad = notification.getBody();
							this.image.src = ad.src;
							this.anchor.href = ad.href;
							this.tracker.src = ad.tracking[0];
							this.tracker2.src = ad.tracking[1];
					}
				};

				/**
				 * The IMAReadyCommand class.
				 *
				 * @constructor
				 * @private
				 * @extends {puremvc.SimpleCommand}
				 */
				function IMAReadyCommand() {
					IMAReadyCommand.__super__.constructor.call(this);
				}


				__extends(IMAReadyCommand, puremvc.SimpleCommand);


				/**
				 * Executes the command.
				 *
				 * @param {puremvc.Notification} notification
				 *    The notification.
				 *
				 * @override
				 */
				IMAReadyCommand.prototype.execute = function(notification) {
					this.facade.retrieveProxy(IMAProxy.NAME).ready();
				};

				/**
				 * The IMADisplayStateChangeCommand class.
				 *
				 * @constructor
				 * @private
				 * @extends {puremvc.SimpleCommand}
				 */
				function IMADisplayStateChangeCommand() {
					IMADisplayStateChangeCommand.__super__.constructor.call(this);
				}


				__extends(IMADisplayStateChangeCommand, puremvc.SimpleCommand);


				/**
				 * Executes the command.
				 *
				 * @param {puremvc.Notification} notification
				 *    The notification.
				 *
				 * @override
				 */
				IMADisplayStateChangeCommand.prototype.execute = function(notification) {
					this.facade.retrieveProxy(IMAProxy.NAME).resize(notification.getBody());
				};

				/**
				 * The InfoPlugin class.
				 *
				 * @param {Module}  app     The parent module of this plugin.
				 * @constructor
				 * @private
				 * @extends {Plugin}
				 */
				function InfoPlugin() {
					InfoPlugin.__super__.constructor.call(this);
				}


				__extends(InfoPlugin, Plugin);


				InfoPlugin.prototype.moduleName = "info";

				/** @override
				 */
				InfoPlugin.prototype.createModel = function() {
					this.registerProxy(new InfoProxy(this.config));
				};

				/** @override
				 */
				/** @override
				 */
				InfoPlugin.prototype.createView = function() {
					this.registerMediator(new InfoMediator());
				};

				/** @override
				 */
				InfoPlugin.prototype.listNotificationInterests = function() {
					return [Notifications.MEDIA_CHANGE];
				};


				AMP.registerPlugin("info", "html", InfoPlugin);
				AMP.registerPlugin("info", "external", InfoPlugin);

				/**
				 * @constructor
				 * @private
				 */
				function ShareWrapper(player, config) {
					if (config == null) {
						config = {};
					}
					ShareWrapper.__super__.constructor.call(this, player, config);
				}


				__extends(ShareWrapper, PluginWrapper);


				/**
				 * @static
				 */
				ShareWrapper.NAME = "ShareWrapper";

				ShareWrapper.prototype.controls = ["share", "facebook", "twitter"];

				/** @override
				 */
				ShareWrapper.prototype.createFlashVars = function(flashvars) {
					if (flashvars.share_mode == null) {
						flashvars.share_mode = 2;
					}
					return flashvars;
				};

				/** @override
				 */
				ShareWrapper.prototype.createXML = function(xml) {
					this.createControls(xml);
					return xml;
				};

				/**
				 */
				ShareWrapper.prototype.createControls = function(xml) {
					var id, key, _i, _len, _ref;
					if (this.hasControls(xml) === false) {
						return;
					}
					this.config.share = true;
					this.controls = this.getControls(xml);
					_ref = this.controls;
					for (_i = 0, _len = _ref.length; _i < _len; _i++) {
						key = _ref[_i];
						id = "" + key + "Btn";
						if (!(controls[id] != null) && this.config[key] === true) {
							this.createElement(xml, id);
						}
					}
				};

				/** @override
				 */
				ShareWrapper.prototype.listNotificationInterests = function() {
					return ShareWrapper.__super__.listNotificationInterests.call(this).concat([FlashNotifications.SHARE, FlashNotifications.SHARE_REQUEST]);
				};

				/** @override
				 */
				ShareWrapper.prototype.handleNotification = function(notification) {
					var body, name, type;
					ShareWrapper.__super__.handleNotification.call(this, notification);
					name = notification.getName();
					body = notification.getBody();
					switch (name) {
						case FlashNotifications.SHARE:
						case FlashNotifications.SHARE_REQUEST:
							type = "share";
					}
					if (type != null) {
						this.dispatchEvent(new Event(type, body));
					}
				};


				AMP.registerPlugin("share", "flash", ShareWrapper);

				/**
				 * The ShareMediator class.
				 *
				 * @constructor
				 * @private
				 * @extends {PluginMediator}
				 */
				function ShareMediator() {
					ShareMediator.__super__.constructor.call(this);
				}


				__extends(ShareMediator, PluginMediator);


				ShareMediator.prototype.componentName = "share";

				ShareMediator.prototype.shareControl = null;

				ShareMediator.prototype.shareSeparator = null;

				ShareMediator.prototype.embed = null;

				/**
				 * @override
				 */
				ShareMediator.prototype.onRegister = function() {
					this.sendNotification(Notifications.ADD_CONTROL_STATE, "share-enabled");
					this.shareControl = this.create(["share", "control"], false);
					this.shareSeparator = this.create(["share", "separator"], this.shareControl);
					this.createButton("share");
					if (this.plugin.getFacebook() === true) {
						this.createButton("facebook");
					}
					if (this.plugin.getTwitter() === true) {
						this.createButton("twitter");
					}
					this.sendNotification(Notifications.ADD_CONTROL, this.shareControl);
					ShareMediator.__super__.onRegister.call(this);
				};

				/**
				 */
				ShareMediator.prototype.createButton = function(id) {
					var button;
					button = new ButtonMediator(null, this.shareControl, null, id, this.clickHandler.bind(this, id));
					this.facade.registerMediator(button);
				};

				/**
				 */
				ShareMediator.prototype.clickHandler = function(provider, event) {
					event.stopImmediatePropagation();
					this.sendNotification(Notifications.DISPATCH_EVENT, new Event("share", {
						provider: provider,
						link: this.plugin.getLink(),
						embed: this.plugin.getEmbed()
					}));
					return false;
				};

				/**
				 * @override
				 */
				ShareMediator.prototype.listNotificationInterests = function() {
					return [Notifications.MEDIA_CHANGE];
				};

				/**
				 * @override
				 */
				ShareMediator.prototype.handleNotification = function(notification) {
					var body, media, name;
					name = notification.getName();
					body = notification.getBody();
					switch (name) {
						case Notifications.MEDIA_CHANGE:
							media = body;
							if (media.embed != null) {
								this.sendNotification(Notifications.ADD_CONTROL_STATE, "share-enabled");
							} else {
								this.sendNotification(Notifications.REMOVE_CONTROL_STATE, "share-enabled");
							}
					}
				};

				/**
				 * The ShareProxy class.
				 *
				 * @constructor
				 * @private
				 * @extends {PluginProxy}
				 */
				function ShareProxy(config) {
					ShareProxy.__super__.constructor.call(this, config);
				}


				__extends(ShareProxy, PluginProxy);


				/** @static
				 */
				ShareProxy.NAME = ModuleProxy.NAME;

				ShareProxy.prototype.defaults = {
					facebook: false,
					twitter: false
				};

				ShareProxy.prototype.loaded = true;

				ShareProxy.prototype.link = null;

				ShareProxy.prototype.embed = null;

				/**
				 *
				 */
				ShareProxy.prototype.getEmbed = function() {
					return this.embed;
				};

				ShareProxy.prototype.setEmbed = function(value) {
					return this.embed = value;
				};

				/**
				 *
				 */
				ShareProxy.prototype.getLink = function() {
					return this.link;
				};

				ShareProxy.prototype.setLink = function(value) {
					return this.link = value;
				};

				/**
				 *
				 */
				ShareProxy.prototype.getFacebook = function() {
					return this.getConfigurationData().facebook;
				};

				ShareProxy.prototype.setFacebook = function(value) {
					return this.data.facebook = value;
				};

				/**
				 *
				 */
				ShareProxy.prototype.getTwitter = function() {
					return this.getConfigurationData().twitter;
				};

				ShareProxy.prototype.setTwitter = function(value) {
					return this.data.twitter = value;
				};

				/**
				 * The ShareMediaChangeCommand class.
				 *
				 * @constructor
				 * @private
				 * @extends {puremvc.SimpleCommand}
				 */
				function ShareMediaChangeCommand() {
					ShareMediaChangeCommand.__super__.constructor.call(this);
				}


				__extends(ShareMediaChangeCommand, puremvc.SimpleCommand);


				/**
				 * Executes the command.
				 *
				 * @param {puremvc.Notification} notification
				 *    The notification.
				 *
				 * @override
				 */
				ShareMediaChangeCommand.prototype.execute = function(notification) {
					var media, proxy;
					media = notification.getBody();
					proxy = this.facade.retrieveProxy(ShareProxy.NAME);
					proxy.setEmbed(media.embed);
					proxy.setLink(media.link);
				};

				/**
				 * @enum {string}
				 * @const
				 * @private
				 */

				var StatsNotifications = {
					VISIBILITY_CHANGE: "statsvisibilitychange",
					BITRATES_UPDATE: "bitratesUpdate"
				};

				/**
				 * The IMAPlugin class.
				 *
				 * @param {Module}  app     The parent module of this plugin.
				 * @constructor
				 * @private
				 * @extends {AdPlugin}
				 */
				function IMAPlugin() {
					IMAPlugin.__super__.constructor.call(this);
				}


				__extends(IMAPlugin, AdPlugin);


				IMAPlugin.prototype.moduleName = "ima";

				IMAPlugin.prototype.createFullscreenProxy = function() {
					return new IMAFullscreenProxy(this.config);
				};

				IMAPlugin.prototype.createProxy = function() {
					return new IMAProxy(this.config);
				};

				IMAPlugin.prototype.isFullscreenDevice = function() {
					var ua;
					ua = navigator.userAgent;
					return Utils.isFullscreenDevice() || /Android 4\.[0-1]/.test(ua) || /CrKey/.test(ua);
				};

				/** @override
				 */
				IMAPlugin.prototype.createModel = function() {
					IMAPlugin.__super__.createModel.call(this);
					if (this.config.overlay != null) {
						this.registerProxy(new IMAOverlayProxy(this.config.overlay));
					}
				};

				/** @override
				 */
				IMAPlugin.prototype.createController = function() {
					IMAPlugin.__super__.createController.call(this);
					if (this.config.overlay != null) {
						this.registerCommand(IMANotifications.ADD_OVERLAY, IMAAddOverlayCommand);
						this.registerCommand(IMANotifications.REMOVE_OVERLAY, IMARemoveOverlayCommand);
					}
					this.registerCommand(Notifications.READY, IMAReadyCommand);
					this.registerCommand(Notifications.FULL_SCREEN_CHANGE, IMADisplayStateChangeCommand);
				};

				/** @override
				 */
				IMAPlugin.prototype.createView = function() {
					IMAPlugin.__super__.createView.call(this);
					if (this.config.overlay != null) {
						this.registerMediator(new IMAOverlayMediator());
					}
				};


				AMP.registerPlugin("ima", "html", IMAPlugin);
				AMP.registerPlugin("ima", "flash", IMAWrapper);

				/**
				 * @constructor
				 * @private
				 */
				function StatsProxy(config) {
					StatsProxy.__super__.constructor.call(this, config);
				}


				__extends(StatsProxy, ModuleProxy);


				/** @static
				 */
				StatsProxy.NAME = ModuleProxy.NAME;

				StatsProxy.prototype.defaults = {
					url: null
				};

				StatsProxy.prototype.hidden = true;

				StatsProxy.prototype.getURL = function() {
					return this.data.url;
				};

				StatsProxy.prototype.setURL = function(value) {
					return this.data.url = value;
				};

				StatsProxy.prototype.getHidden = function() {
					return this.hidden;
				};

				StatsProxy.prototype.setHidden = function(value) {
					return this.hidden = value;
				};

				StatsProxy.prototype.invoke = function() {
					var xhr,
						_this = this;
					if (this.data.url != null) {
						return xhr = Utils.get(this.data.url, {
							onload: function() {
								if (xhr.response != null) {
									_this.sendNotification(StatsNotifications.BITRATES_UPDATE, xhr.response);
								}
							},
							onerror: function(error) {
								return _this.sendNotification(StatsNotifications.BITRATES_UPDATE, null);
							}
						});
					}
				};

				/**
				 * The StatsVisibilityChangeCommand class.
				 *
				 * @constructor
				 * @private
				 * @extends {puremvc.SimpleCommand}
				 */
				function StatsVisibilityChangeCommand() {
					StatsVisibilityChangeCommand.__super__.constructor.call(this);
				}


				__extends(StatsVisibilityChangeCommand, puremvc.SimpleCommand);


				/**
				 * Executes the command.
				 *
				 * @param {puremvc.Notification} notification
				 *    The notification.
				 *
				 * @override
				 */
				StatsVisibilityChangeCommand.prototype.execute = function(notification) {
					var statsProxy;
					statsProxy = this.facade.retrieveProxy(StatsProxy.NAME);
					statsProxy.setHidden(notification.getBody());
					statsProxy.setURL("" + (this.facade.player.getSrc()));
					if (notification.getBody() === false) {
						statsProxy.invoke();
					}
				};

				/**
				 * The StatsMediator class.
				 *
				 * @constructor
				 * @private
				 * @extends {PluginMediator}
				 * @param {Object} viewComponent
				 */
				function StatsMediator() {
					StatsMediator.__super__.constructor.call(this);
				}


				__extends(StatsMediator, PluginMediator);


				/**
				 * Stats Mediator
				 *
				 * @static
				 * @type {string}
				 */
				StatsMediator.prototype.componentName = "stats";

				StatsMediator.prototype.statsText = null;

				StatsMediator.prototype.statsButton = null;

				StatsMediator.prototype.bitrateText = null;

				StatsMediator.prototype.bitrateArr = null;

				/**
				 * @override
				 */
				StatsMediator.prototype.onRegister = function() {
					var _this = this;
					this.sendNotification(Notifications.ADD_CONTROL_STATE, "stats-enabled");
					this.classList.add("hidden");
					this.statsFormat = this.create("stats-text");
					this.statsBitRate = this.create("stats-text");
					this.statsPlayBack = this.create("stats-text");
					this.statsAnalytics = this.create("stats-text");
					this.statsButton = this.create("stats-button", false);
					this.statsButton.onclick = function(event) {
						event.stopImmediatePropagation();
						_this.sendNotification(StatsNotifications.VISIBILITY_CHANGE, !_this.plugin.getHidden());
						return false;
					};
					this.sendNotification(Notifications.ADD_CONTROL, this.statsButton);
					StatsMediator.__super__.onRegister.call(this);
				};

				/**
				 * @override
				 */
				StatsMediator.prototype.listNotificationInterests = function() {
					return [StatsNotifications.VISIBILITY_CHANGE, StatsNotifications.BITRATES_UPDATE];
				};

				/**
				 * @override
				 */
				StatsMediator.prototype.handleNotification = function(notification) {
					var body, name;
					name = notification.getName();
					body = notification.getBody();
					switch (name) {
						case StatsNotifications.VISIBILITY_CHANGE:
							if (this.plugin.getHidden()) {
								this.classList.add("hidden");
							} else {
								this.classList.remove("hidden");
								this.statsBitRate.innerHTML = "<p><b class='" + this.classList.prefix + "stats-header'>Adaptive Bitrate Renditions</b></p><p>Loading...</p>";
								this.renderStats();
							}
							break;
						case StatsNotifications.BITRATES_UPDATE:
							if (body != null) {
								this.checkContentType(body);
							} else {
								this.statsBitRate.innerHTML = "<p><b class='" + this.classList.prefix + "stats-header'>Adaptive Bitrate Renditions</b></p><p>Not Available</p>";
							}
					}
				};

				/*  Render Stats UI
				 */
				StatsMediator.prototype.renderStats = function() {
					var analyticsVal, device, formatVal, isDash, playbackVal, player, urlVal, _ref;
					try {
						player = this.facade.player;
						formatVal = player.getMedia() === void 0 ? "Not Available" : player.getMedia().type;
						urlVal = player.getSrc() === "" || player.getSrc() === null ? "Not Available" : player.getSrc();
						device = Utils.getDevice();
						if (device == null) {
							device = "";
						}
						playbackVal = this.facade.player.getConfig().mode !== "" && this.facade.player.getConfig().mode !== null && this.facade.player.getConfig().mode.indexOf("html") !== -1 ? this.facade.player.getVersion() + ", HTML5 Video: " + device : "Not Available";
						isDash = (_ref = this.facade.player.retrieveProxy(PlayerProxy.NAME).getActivePlaybackCore()) != null ? _ref.proxyName.indexOf("dash") : void 0;
						if (isDash > -1) {
							playbackVal += ", dash.js";
						}
						analyticsVal = this.facade.player.getConfig().mediaanalytics.config === "" || this.facade.player.getConfig().mediaanalytics.config === null ? "Not Available" : this.facade.player.getConfig().mediaanalytics.config;
						this.statsFormat.innerHTML = "<p><b class='" + this.classList.prefix + "stats-header'>Stream</b></p><p>Format: " + formatVal + "</p><p>URL: " + urlVal + "</p>";
						this.statsPlayBack.innerHTML = "<p><b class='" + this.classList.prefix + "stats-header'>Playback</b></p>" + playbackVal;
						this.statsAnalytics.innerHTML = "<p><b class='" + this.classList.prefix + "stats-header'>Analytics</b></p>" + analyticsVal;
					} catch (error) {
						this.facade.logger.error("[AMP Stats Render Error]:", error);
					}
				};

				/*  Check ContentType for HLS or Dash
				 */
				/*TODO: Remove this When Dash API to get Bitrate is found
				 */
				StatsMediator.prototype.checkContentType = function(items) {
					var item, xhr, _i, _len, _ref,
						_this = this;
					this.bitrateArr = [];
					if (typeof items === 'object' && this.facade.player.getMedia().type.indexOf("dash") !== -1) {
						xhr = Utils.get(items.URL, {
							onload: function(event) {
								var bitrateArray, bitrateStr, item, resStr, xml, _i, _len;
								xml = XMLUtils.parse(event.detail.responseText);
								bitrateArray = xml.querySelectorAll("AdaptationSet[mimeType*='video']")[0].querySelectorAll("Representation");
								for (_i = 0, _len = bitrateArray.length; _i < _len; _i++) {
									item = bitrateArray[_i];
									bitrateStr = (parseInt(item.getAttribute('bandwidth')) / 1000).toFixed(0);
									resStr = item.getAttribute('width') + "x" + item.getAttribute('height');
									_this.bitrateArr.push({
										bitrate: bitrateStr,
										res: resStr
									});
								}
								return _this.constructBitrateText(_this.bitrateArr);
							},
							onerror: function(event) {
								return _this.facade.logger.error("[AMP Stats ERROR]", event);
							}
						});
					} else {
						_ref = items.split("#");
						for (_i = 0, _len = _ref.length; _i < _len; _i++) {
							item = _ref[_i];
							if (item.indexOf("BANDWIDTH") !== -1 && item.indexOf("RESOLUTION") !== -1) {
								this.bitrateArr.push(this.parseBitrate(item));
							}
						}
						this.constructBitrateText(this.bitrateArr);
					}
				};

				/*  Format Bitrate HTML Text
				 */
				StatsMediator.prototype.constructBitrateText = function(bitrateArr) {
					var bitrateSlNo, item, _i, _len, _ref;
					this.bitrateArr = bitrateArr;
					this.bitrateText = '';
					this.bitrateArr.sort(function(a, b) {
						var aBitrate, bBitrate;
						aBitrate = parseInt(a.bitrate);
						bBitrate = parseInt(b.bitrate);
						if (aBitrate < bBitrate) {
							return -1;
						} else if (aBitrate > bBitrate) {
							return 1;
						} else {
							return 0;
						}
					});
					_ref = this.bitrateArr;
					for (bitrateSlNo = _i = 0, _len = _ref.length; _i < _len; bitrateSlNo = ++_i) {
						item = _ref[bitrateSlNo];
						this.bitrateText += "<p>" + (bitrateSlNo + 1) + ". " + item.bitrate + " kbps " + item.res + "</p>";
					}
					if (this.bitrateText === "") {
						this.bitrateText = "<p>Not Available</p>";
					}
					this.statsBitRate.innerHTML = "<p><b class='" + this.classList.prefix + "stats-header'>Adaptive Bitrate Renditions</b></p>" + this.bitrateText;
				};

				/*  Parse Bitrate String for HLS
				 */
				StatsMediator.prototype.parseBitrate = function(item) {
					var bandwidthEndIndex, bandwidthStartIndex, bandwidthStr, resolutionEndIndex, resolutionStartIndex, resolutionStr;
					bandwidthStartIndex = item.indexOf("BANDWIDTH");
					bandwidthEndIndex = item.indexOf(",", bandwidthStartIndex + 10);
					bandwidthStr = item.slice(bandwidthStartIndex + 10, bandwidthEndIndex);
					resolutionStartIndex = item.indexOf("RESOLUTION");
					resolutionEndIndex = item.indexOf(",", resolutionStartIndex + 10);
					if (resolutionEndIndex - resolutionStartIndex > 20 || resolutionEndIndex === -1) {
						resolutionEndIndex = item.indexOf("x", resolutionStartIndex + 10) + 4;
					}
					resolutionStr = item.slice(resolutionStartIndex + 11, resolutionEndIndex);
					return {
						bitrate: parseInt(bandwidthStr) / 1000,
						res: resolutionStr
					};
				};

				/**
				 * The AISLaunchIDPLoginCommand class.
				 *
				 * @constructor
				 * @private
				 * @extends {AISCommand}
				 */
				function AISLaunchIDPLoginCommand() {
					AISLaunchIDPLoginCommand.__super__.constructor.call(this);
				}


				__extends(AISLaunchIDPLoginCommand, AISCommand);


				/**
				 * Executes the command.
				 *
				 * @param {puremvc.Notification} notification
				 *    The notification.
				 *
				 * @override
				 */
				AISLaunchIDPLoginCommand.prototype.execute = function(notification) {
					this.getProxy().launchIDPLogin(notification.getBody());
				};

				/**
				 * The AISChooserMediator class.
				 *
				 * @constructor
				 * @private
				 * @extends {LocalizedMediator}
				 */
				function AISChooserMediator(parent) {
					AISChooserMediator.__super__.constructor.call(this, null, null, parent);
				}


				__extends(AISChooserMediator, ComponentMediator);


				AISChooserMediator.prototype.componentName = "ais-chooser";

				AISChooserMediator.prototype.menu = null;

				AISChooserMediator.prototype.label = null;

				AISChooserMediator.prototype.grid = null;

				AISChooserMediator.prototype.select = null;

				AISChooserMediator.prototype.login = null;

				AISChooserMediator.prototype.title = null;

				/**
				 * @override
				 */
				AISChooserMediator.prototype.onRegister = function() {
					var _this = this;
					this.classList.add("hidden");
					this.title = this.createText("ais-chooser-title", "Choose your provider");
					this.grid = this.create("ais-chooser-grid");
					this.menu = this.create("ais-chooser-menu");
					this.label = this.createText("ais-chooser-label", "Providers: ", this.menu);
					this.select = this.create("ais-chooser-select", this.menu, "select");
					this.login = this.create("ais-chooser-login", false, "input");
					this.login.type = "button";
					this.login.value = "Login";
					EventHandler.create(this.login, EventHandler.CLICK, function(event) {
						var idpID;
						if (typeof event.stopImmediatePropagation === "function") {
							event.stopImmediatePropagation();
						}
						idpID = _this.select.options[_this.select.selectedIndex].value;
						_this.sendNotification(AISNotifications.LAUNCH_IDP_LOGIN, idpID);
						return false;
					});
					this.menu.appendChild(this.login);
					AISChooserMediator.__super__.onRegister.call(this);
				};

				/**
				 * @override
				 */
				AISChooserMediator.prototype.listNotificationInterests = function() {
					return [AISNotifications.CHOOSE_AUTH_PROVIDER, AISNotifications.AUTHENTICATING];
				};

				/**
				 * @override
				 */
				AISChooserMediator.prototype.handleNotification = function(notification) {
					var baseURL, div, featuredGroup, footprints, group, groups, idp, idps, img, index, key, logos, member, option, options, proxy, resp, span, src, value, _i, _j, _k, _l, _len, _len1, _len2, _len3, _ref, _ref1,
						_this = this;
					switch (notification.getName()) {
						case AISNotifications.CHOOSE_AUTH_PROVIDER:
							resp = notification.getBody();
							idps = resp.possible_idps;
							footprints = resp.footprints || [];
							groups = resp.grouped_idps || [];
							proxy = this.facade.retrieveProxy(ModuleProxy.NAME);
							logos = proxy.value.logos;
							baseURL = logos != null ? logos.base : void 0;
							this.grid.innerHTML = "";
							if ((groups != null) && ((logos != null ? logos.group : void 0) != null)) {
								for (_i = 0, _len = groups.length; _i < _len; _i++) {
									group = groups[_i];
									if (!(group.name === logos.group)) {
										continue;
									}
									featuredGroup = group;
									break;
								}
								if (featuredGroup != null) {
									_ref = featuredGroup.members;
									for (index = _j = 0, _len1 = _ref.length; _j < _len1; index = ++_j) {
										member = _ref[index];
										idp = idps[member];
										div = this.create(["ais-chooser-grid-item", "ais-chooser-grid-index-" + (index + 1)], this.grid);
										if (div.dataset == null) {
											div.dataset = {};
										}
										div.dataset.key = member;
										div.onclick = function(event) {
											var idpID, target;
											if (typeof event.stopImmediatePropagation === "function") {
												event.stopImmediatePropagation();
											}
											target = (event.currentTarget != null) ? event.currentTarget : event.srcElement;
											idpID = target.dataset.key;
											_this.sendNotification(AISNotifications.LAUNCH_IDP_LOGIN, idpID);
											return false;
										};
										if (((_ref1 = idps[member].logos) != null ? _ref1[logos.key] : void 0) != null) {
											img = this.create("ais-chooser-grid-cell-img", div, "img");
											img.alt = idp.display_name;
											src = idp.logos[logos.key];
											if (src.indexOf("http") === -1) {
												src = baseURL + src;
											}
											img.src = src;
											if (img.dataset == null) {
												img.dataset = {};
											}
											img.dataset.key = member;
											span = this.create("ais-chooser-grid-cell-label", div, "span");
											span.innerHTML = idp.display_name;
										} else {
											div.innerHTML = idp.display_name;
										}
									}
								}
							}
							if (this.grid.innerHTML !== "") {
								this.classList.add("ais-chooser-featured");
								this.label.textContent = "Other ";
							}
							options = this.select.options;
							for (index = _k = 0, _len2 = options.length; _k < _len2; index = ++_k) {
								option = options[index];
								this.select.options.remove(index);
							}
							if (footprints.length > 0) {
								for (_l = 0, _len3 = footprints.length; _l < _len3; _l++) {
									key = footprints[_l];
									options[options.length] = new Option("" + idps[key].display_name, "" + key);
								}
							}
							for (key in idps) {
								value = idps[key];
								options[options.length] = new Option("" + value.display_name, "" + key);
							}
							this.classList.remove("hidden");
							break;
						case AISNotifications.AUTHENTICATING:
							this.classList.add("hidden");
					}
				};

				/**
				 * The AISPlayMediator class.
				 *
				 * @constructor
				 * @private
				 * @extends {LocalizedMediator}
				 * @param {Object} viewComponent
				 */
				function AISPlayMediator(parent) {
					AISPlayMediator.__super__.constructor.call(this, null, null, parent);
				}


				__extends(AISPlayMediator, ComponentMediator);


				AISPlayMediator.prototype.componentName = "ais-play";

				AISPlayMediator.prototype.menu = null;

				AISPlayMediator.prototype.restart = null;

				AISPlayMediator.prototype.resume = null;

				AISPlayMediator.prototype.resumeTime = null;

				/**
				 * @override
				 */
				AISPlayMediator.prototype.onRegister = function() {
					var _this = this;
					this.classList.add("hidden");
					this.menu = this.create("ais-play-menu");
					this.restart = this.create("ais-play-restart", this.menu);
					this.restart.type = "button";
					this.restart.textContent = "Restart";
					this.restart.onclick = function(event) {
						if (typeof event.stopImmediatePropagation === "function") {
							event.stopImmediatePropagation();
						}
						_this.play();
						return false;
					};
					this.resume = this.create("ais-play-resume", this.menu);
					this.resume.type = "button";
					this.resume.value = "Resume";
					this.restart.onclick = function(event) {
						if (typeof event.stopImmediatePropagation === "function") {
							event.stopImmediatePropagation();
						}
						_this.play(_this.resumeTime);
						return false;
					};
					AISPlayMediator.__super__.onRegister.call(this);
				};

				AISPlayMediator.prototype.play = function(time) {
					var proxy;
					proxy = this.facade.retrieveProxy(AISProxy.NAME);
					proxy.play(time);
				};

				/**
				 * @override
				 */
				AISPlayMediator.prototype.listNotificationInterests = function() {
					return [AISNotifications.CHOOSE_PLAY_OPTIONS];
				};

				/**
				 * @override
				 */
				AISPlayMediator.prototype.handleNotification = function(notification) {
					switch (notification.getName()) {
						case AISNotifications.CHOOSE_PLAY_OPTIONS:
							this.resumeTime = notification.getBody();
							this.classList.remove("hidden");
					}
				};

				/**
				 * The AISAuthenticateMediaCommand class.
				 *
				 * @constructor
				 * @private
				 * @extends {AISCommand}
				 */
				function AISAuthorizeCommand() {
					AISAuthorizeCommand.__super__.constructor.call(this);
				}


				__extends(AISAuthorizeCommand, AISCommand);


				/**
				 * Executes the command.
				 *
				 * @param {puremvc.Notification} notification
				 *    The notification.
				 *
				 * @override
				 */
				AISAuthorizeCommand.prototype.execute = function(notification) {
					var media, reason;
					media = this.facade.player.retrieveProxy(MediaProxy.NAME).getData();
					reason = media.status.reason;
					if (reason === "ais" || reason === "token") {
						this.getProxy().authorize();
					}
				};

				/**
				 * The AISAuthenticatingMediator class.
				 *
				 * @constructor
				 * @private
				 * @extends {LocalizedMediator}
				 */
				function AISAuthenticatingMediator(parent) {
					AISAuthenticatingMediator.__super__.constructor.call(this, null, null, parent);
				}


				__extends(AISAuthenticatingMediator, ComponentMediator);


				AISAuthenticatingMediator.prototype.componentName = "ais-authenticating";

				AISAuthenticatingMediator.prototype.retry = null;

				/**
				 * @override
				 */
				AISAuthenticatingMediator.prototype.onRegister = function() {
					this.classList.add("hidden");
					this.retry = this.create("ais-authenticating-button");
					this.retry.type = "button";
					this.retry.value = "Back to Providers";
					this.retry.onclick = this.onclick.bind(this);
					AISAuthenticatingMediator.__super__.onRegister.call(this);
				};

				/**
				 */
				AISAuthenticatingMediator.prototype.onclick = function(event) {
					if (typeof event.stopImmediatePropagation === "function") {
						event.stopImmediatePropagation();
					}
					this.classList.add("hidden");
					this.sendNotification(AISNotifications.START_AUTHENTICATION);
					return false;
				};

				/**
				 * @override
				 */
				AISAuthenticatingMediator.prototype.listNotificationInterests = function() {
					return [AISNotifications.AUTHENTICATING];
				};

				/**
				 * @override
				 */
				AISAuthenticatingMediator.prototype.handleNotification = function(notification) {
					switch (notification.getName()) {
						case AISNotifications.AUTHENTICATING:
							if (notification.getBody() === true) {
								this.classList.remove("hidden");
							} else {
								this.classList.add("hidden");
							}
					}
				};

				/**
				 * The AISStartAuthenticationCommand class.
				 *
				 * @constructor
				 * @private
				 * @extends {AISCommand}
				 */
				function AISStartAuthenticationCommand() {
					AISStartAuthenticationCommand.__super__.constructor.call(this);
				}


				__extends(AISStartAuthenticationCommand, AISCommand);


				/**
				 * Executes the command.
				 *
				 * @param {puremvc.Notification} notification
				 *    The notification.
				 *
				 * @override
				 */
				AISStartAuthenticationCommand.prototype.execute = function(notification) {
					this.getProxy().bounce();
				};

				/**
				 * @constructor
				 * @private
				 */
				function AISMediator() {
					AISMediator.__super__.constructor.call(this);
				}


				__extends(AISMediator, OverlayMediator);


				AISMediator.prototype.componentName = "ais";

				AISMediator.prototype.chooser = null;

				AISMediator.prototype.auth = null;

				AISMediator.prototype.play = null;

				AISMediator.prototype.onRegister = function() {
					var _this = this;
					this.classList.add("hidden");
					setTimeout(function() {
						_this.chooser = new AISChooserMediator(_this);
						_this.facade.registerMediator(_this.chooser);
						_this.auth = new AISAuthenticatingMediator(_this);
						_this.facade.registerMediator(_this.auth);
						_this.play = new AISPlayMediator(_this);
						return _this.facade.registerMediator(_this.play);
					}, 20);
					AISMediator.__super__.onRegister.call(this);
				};

				AISMediator.prototype.listNotificationInterests = function() {
					return [AISNotifications.START_AUTHENTICATION, AISNotifications.AUTHENTICATION_COMPLETE, AISNotifications.CHOOSE_PLAY_OPTIONS, Notifications.MEDIA_CHANGE];
				};

				AISMediator.prototype.handleNotification = function(notification) {
					switch (notification.getName()) {
						case AISNotifications.CHOOSE_PLAY_OPTIONS:
						case AISNotifications.START_AUTHENTICATION:
							this.classList.remove("hidden");
							break;
						case AISNotifications.AUTHENTICATION_COMPLETE:
						case Notifications.MEDIA_CHANGE:
							this.classList.add("hidden");
							this.facade.player.sendNotification(Notifications.REMOVE_APPLICATION_STATE, "authenticating");
					}
				};

				/**
				 * The AISPlugin class.
				 *
				 * @param {Module}  app     The parent module of this plugin.
				 * @constructor
				 * @private
				 * @extends {Feature}
				 */
				function AISPlugin() {
					AISPlugin.__super__.constructor.call(this);
				}


				__extends(AISPlugin, Feature);


				AISPlugin.NAME = "AISPlugin";

				AISPlugin.prototype.moduleName = "ais";

				AISPlugin.prototype.featureName = "auth";

				AISPlugin.prototype.idps = null;

				/** @override
				 */
				AISPlugin.prototype.createController = function() {
					this.registerCommand(SecurityNotifications.AUTHORIZE, AISAuthorizeCommand);
					this.registerCommand(AISNotifications.LAUNCH_IDP_LOGIN, AISLaunchIDPLoginCommand);
					this.registerCommand(AISNotifications.START_AUTHENTICATION, AISStartAuthenticationCommand);
				};

				/** @override
				 */
				AISPlugin.prototype.createModel = function() {
					this.proxy = new AISProxy(this.config);
					this.registerProxy(this.proxy);
				};

				/** @override
				 */
				AISPlugin.prototype.createView = function() {
					this.registerMediator(new AISMediator());
				};

				/** @override
				 */
				AISPlugin.prototype.listNotificationInterests = function() {
					return AISPlugin.__super__.listNotificationInterests.call(this).concat([Notifications.MEDIA_CHANGE, SecurityNotifications.AUTHORIZE]);
				};

				/**
				 */
				AISPlugin.prototype.listNotificationPublications = function() {
					return AISPlugin.__super__.listNotificationPublications.call(this).concat([SecurityNotifications.AUTHORIZATION_FAILED, SecurityNotifications.AUTHORIZED, SecurityNotifications.SET_TOKEN, SecurityNotifications.SET_KEY, Notifications.INITIALIZED, Notifications.PLAY, Notifications.SEEK]);
				};

				/**
				 */
				AISPlugin.prototype.listNotificationEvents = function() {
					return AISPlugin.__super__.listNotificationEvents.call(this).concat([AISNotifications.AUTHENTICATED]);
					/**
					 * @expose
					 */
				};

				AISPlugin.prototype.authorize = function(media) {
					this.proxy.authorize(media);
					return media;
				};

				/**
				 * @expose
				 */
				AISPlugin.prototype.logout = function() {
					this.proxy.logout();
				};

				/**
				 * @return {Array.<Object>} The list of IDPs.
				 * @expose
				 */
				AISPlugin.prototype.getIdps = function() {
					return this.idps;
				};


				AMP.registerPlugin("ais", "html", AISPlugin);

				/**
				 * The AISFlashPlugin class.
				 *
				 * @param {Module}  app     The parent module of this plugin.
				 * @constructor
				 * @private
				 * @extends {Plugin}
				 */
				function AISFlashPlugin() {
					AISFlashPlugin.__super__.constructor.call(this);
				}


				__extends(AISFlashPlugin, AISPlugin);


				AISFlashPlugin.NAME = "AISFlashPlugin";

				AISFlashPlugin.prototype.proxy = null;

				AISFlashPlugin.prototype.startTime = null;

				/**
				 */
				AISFlashPlugin.prototype.createController = function() {
					this.registerCommand(AISNotifications.LAUNCH_IDP_LOGIN, AISLaunchIDPLoginCommand);
					this.registerCommand(AISNotifications.START_AUTHENTICATION, AISStartAuthenticationCommand);
				};

				/**
				 */
				AISFlashPlugin.prototype.setData = function(data) {
					var proxy;
					proxy = this.retrieveProxy(AISProxy.NAME);
					proxy.data.platformID = data.platformID;
					proxy.data.resourceID = data.resourceID;
					proxy.data.contentID = data.contentID;
				};

				/**
				 */
				AISFlashPlugin.prototype.authorize = function(media) {
					this.retrieveProxy(AISProxy.NAME).authorize(media);
				};

				/**
				 * The SharePlugin class.
				 *
				 * @param {Module}  app     The parent module of this plugin.
				 * @constructor
				 * @private
				 * @extends {Feature}
				 */
				function SharePlugin() {
					SharePlugin.__super__.constructor.call(this);
				}


				__extends(SharePlugin, Feature);


				SharePlugin.prototype.moduleName = "share";

				SharePlugin.prototype.featureName = "share";

				/** @override
				 */
				SharePlugin.prototype.createModel = function() {
					this.registerProxy(new ShareProxy(this.config));
				};

				/** @override
				 */
				SharePlugin.prototype.createController = function() {
					this.registerCommand(Notifications.MEDIA_CHANGE, ShareMediaChangeCommand);
				};

				/** @override
				 */
				SharePlugin.prototype.createView = function() {
					this.registerMediator(new ShareMediator());
				};

				/** @override
				 */
				SharePlugin.prototype.listNotificationInterests = function() {
					return [Notifications.MEDIA_CHANGE];
				};

				/** @override
				 */
				SharePlugin.prototype.listNotificationPublications = function() {
					return SharePlugin.__super__.listNotificationPublications.apply(this, arguments).concat([Notifications.ADD_CONTROL, Notifications.REMOVE_CONTROL, Notifications.ADD_CONTROL_STATE, Notifications.REMOVE_CONTROL_STATE]);
				};


				AMP.registerPlugin("share", "html", SharePlugin);
				AMP.registerPlugin("share", "external", SharePlugin);

				/**
				 * @constructor
				 * @private
				 * @extends {PluginWrapper}
				 */
				function AISWrapper(player, init) {
					var _this = this;
					AISWrapper.__super__.constructor.call(this, player, init);
					this.plugin = new AISFlashPlugin();
					this.plugin.addEventListener("loggedin", function(event) {
						_this.facade.dispatcher.dispatchEvent(event);
					});
					this.plugin.oninitialized = player.registerModule.bind(player, this.plugin);
					this.plugin.initialize(init, this.player);
				}


				__extends(AISWrapper, PluginWrapper);


				AISWrapper.NAME = "AISWrapper";

				AISWrapper.prototype.plugin = null;

				/**
				 */
				AISWrapper.prototype.getFeatureName = function() {
					return "auth";
				};

				/**
				 */
				AISWrapper.prototype.createXML = function(xml) {
					var application, auth, element, prop, props, text, vendor, _i, _len;
					application = xml.firstChild;
					auth = xml.getElementsByTagName("authentication");
					if (!(auth != null) || auth.length === 0) {
						auth = xml.createElement("authentication");
						application.appendChild(auth);
					} else {
						auth = auth[0];
					}
					vendor = xml.createElement("vendor");
					vendor.setAttribute("id", "ais");
					auth.appendChild(vendor);
					props = [
						{
							value: this.config.platformID,
							key: "platformID"
						}, {
							value: this.config.resourceID,
							key: "resourceID"
						}, {
							value: this.config.contentID,
							key: "contentID"
						}
					];
					for (_i = 0, _len = props.length; _i < _len; _i++) {
						prop = props[_i];
						if (!(prop.value != null)) {
							continue;
						}
						element = xml.createElement("property");
						element.setAttribute("key", prop.key);
						text = XMLUtils.createTextContent(xml, prop.value);
						element.appendChild(text);
						vendor.appendChild(element);
					}
					return xml;
				};

				/**
				 */
				AISWrapper.prototype.listNotificationInterests = function() {
					return AISWrapper.__super__.listNotificationInterests.apply(this, arguments).concat([FlashNotifications.AUTHORIZE, FlashNotifications.TIME_UPDATE, FlashNotifications.ENDED, FlashNotifications.PAUSED, FlashNotifications.CAPABILITY_CHANGE, FlashNotifications.RESET]);
				};

				/**
				 */
				AISWrapper.prototype.handleNotification = function(notification) {
					var body, mediaProxy, name;
					AISWrapper.__super__.handleNotification.call(this, notification);
					name = notification.getName();
					body = notification.getBody();
					switch (name) {
						case FlashNotifications.AUTHORIZE:
							this.plugin.startTime = null;
							this.plugin.setData(body);
							mediaProxy = this.player.retrieveProxy(MediaProxy.NAME);
							if (!(mediaProxy.getSrc() != null)) {
								mediaProxy.setSrc(body.media.src);
							}
							this.plugin.authorize();
							break;
						case FlashNotifications.TIME_UPDATE:
							this.plugin.sendNotification(Notifications.TIME_UPDATE, body);
							break;
						case FlashNotifications.ENDED:
							this.plugin.sendNotification(Notifications.ENDED, body);
							break;
						case FlashNotifications.PAUSED:
							this.plugin.sendNotification(Notifications.PAUSE, body);
							break;
						case FlashNotifications.RESET:
							this.plugin.sendNotification(Notifications.MEDIA_CHANGE, body);
							break;
						case FlashNotifications.CAPABILITY_CHANGE:
							if ((this.plugin.startTime != null) && body.type === "canSeekChange" && body.enabled) {
								this.player.setCurrentTime(this.plugin.startTime);
							}
					}
				};


				AMP.registerPlugin("ais", "flash", AISWrapper);

				/**
				 * @constructor
				 * @private
				 */
				function FreeWheelProxy(config) {
					this.media = {};
					this.adtimeupdate = this.adTimeupdate.bind(this);
					this.timeupdate = this.midrollCheck.bind(this);
					FreeWheelProxy.__super__.constructor.call(this, config);
				}


				__extends(FreeWheelProxy, AdProxy);


				/** @static
				 */
				FreeWheelProxy.NAME = AdProxy.NAME;

				FreeWheelProxy.prototype.context = null;

				FreeWheelProxy.prototype.prerollSlots = null;

				FreeWheelProxy.prototype.midrollSlots = null;

				FreeWheelProxy.prototype.postrollSlots = null;

				FreeWheelProxy.prototype.initialized = false;

				FreeWheelProxy.prototype.playWhenLoaded = false;

				FreeWheelProxy.prototype.timeupdate = null;

				FreeWheelProxy.prototype.adtimeupdate = null;

				FreeWheelProxy.prototype.slot = null;

				FreeWheelProxy.prototype.playbackCore = null;

				FreeWheelProxy.prototype.nextMidroll = null;

				FreeWheelProxy.prototype.midrollEngaged = false;

				FreeWheelProxy.prototype.defaults = {
					networkId: "96749",
					serverUrl: "http://demo.v.fwmrm.net/ad/g/1",
					profileId: "global-js",
					siteSectionId: "DemoSiteGroup.01",
					siteSectionFallbackId: null,
					videoAssetId: '#{media.guid}',
					videoAssetFallbackId: null,
					prerollSlotId: null,
					midrollSlotId: null,
					postrollSlotId: null,
					visitorId: null,
					keyValues: null,
					keyValuesString: null,
					renderers: null
				};

				/**
				 */
				FreeWheelProxy.prototype.initialize = function() {
					this.plugin = this.createPlugin();
					this.plugin.setNetwork(this.value.networkId);
					this.plugin.setServer(this.value.serverUrl);
				};

				FreeWheelProxy.prototype.createPlugin = function() {
					return new tv.freewheel.SDK.AdManager();
				};

				/**
				 */
				FreeWheelProxy.prototype.engage = function(media) {
					var cuePoints, index, key, keyValue, pair, pairs, renderer, renderers, scene, time, value, _i, _j, _k, _len, _len1, _len2, _ref, _ref1, _ref2;
					FreeWheelProxy.__super__.engage.call(this, media);
					this.prerollSlots = [];
					this.midrollSlots = [];
					this.postrollSlots = [];
					this.context = this.plugin.newContext();
					this.context.registerVideoDisplayBase(this.facade.player.viewComponent.id);
					this.context.setProfile(this.value.profileId);
					this.context.setVideoAsset(this.value.videoAssetId, media.duration, this.value.networkId, null, null, null, null, this.value.videoAssetFallbackId);
					this.context.setSiteSection(this.value.siteSectionId, this.value.networkId, null, null, this.value.siteSectionFallbackId);
					if (this.value.visitorId != null) {
						this.context.setVisitor(this.value.visitorId);
					}
					if (this.value.keyValues != null) {
						_ref = this.value.keyValues;
						for (key in _ref) {
							value = _ref[key];
							if (value != null) {
								this.context.addKeyValue(key, value);
							}
						}
					}
					if (this.value.keyValuesString != null) {
						pairs = this.value.keyValuesString.split("&");
						for (_i = 0, _len = pairs.length; _i < _len; _i++) {
							pair = pairs[_i];
							if (!(pair !== "")) {
								continue;
							}
							keyValue = pair.split("=");
							this.context.addKeyValue(keyValue[0], keyValue[1]);
						}
					}
					this.context.addEventListener(tv.freewheel.SDK.EVENT_REQUEST_COMPLETE, this.onRequestComplete.bind(this));
					this.context.addEventListener(tv.freewheel.SDK.EVENT_SLOT_STARTED, this.onSlotStarted.bind(this));
					this.context.addEventListener(tv.freewheel.SDK.EVENT_SLOT_ENDED, this.onSlotEnded.bind(this));
					this.context.addEventListener(tv.freewheel.SDK.EVENT_AD_IMPRESSION, this.onAdImpression.bind(this));
					this.context.addEventListener(tv.freewheel.SDK.EVENT_AD_IMPRESSION_END, this.onAdImpressionEnd.bind(this));
					this.context.setParameter(tv.freewheel.SDK.PARAMETER_RENDERER_VIDEO_START_DETECT_TIMEOUT, 10000, tv.freewheel.SDK.PARAMETER_LEVEL_GLOBAL);
					this.context.setParameter(tv.freewheel.SDK.PARAMETER_RENDERER_VIDEO_PROGRESS_DETECT_TIMEOUT, 10000, tv.freewheel.SDK.PARAMETER_LEVEL_GLOBAL);
					if (this.value.prerollSlotId != null) {
						this.context.addTemporalSlot(this.value.prerollSlotId, tv.freewheel.SDK.ADUNIT_PREROLL, 0);
					}
					if (((_ref1 = media.scenes) != null ? _ref1.length : void 0) > 0 && (this.value.midrollSlotId != null)) {
						cuePoints = [];
						_ref2 = media.scenes;
						for (index = _j = 0, _len1 = _ref2.length; _j < _len1; index = ++_j) {
							scene = _ref2[index];
							if (!(index > 0)) {
								continue;
							}
							time = Utils.flattenTimecode(scene.sceneStartTime);
							cuePoints.push(time);
							this.context.addTemporalSlot(this.value.midrollSlotId, tv.freewheel.SDK.ADUNIT_MIDROLL, time);
						}
						this.facade.player.sendNotification(Notifications.ADD_CUE_POINTS, cuePoints);
					}
					if (this.value.postrollSlotId != null) {
						this.context.addTemporalSlot(this.value.postrollSlotId, tv.freewheel.SDK.ADUNIT_POSTROLL, media.duration);
					}
					renderers = this.value.renderers;
					if ((renderers != null ? renderers.length : void 0) > 0) {
						for (_k = 0, _len2 = renderers.length; _k < _len2; _k++) {
							renderer = renderers[_k];
							this.context.addRenderer(renderer.url, renderer.baseUnit, renderer.contentType, renderer.slotType, renderer.soAdUnit, renderer.creativeApi, renderer.parameters);
						}
					}
					this.initialized = false;
					this.context.submitRequest();
				};

				/**
				 */
				FreeWheelProxy.prototype.onRequestComplete = function(event) {
					var cues, slot, slots, _i, _len;
					cues = [];
					if (event.success) {
						slots = this.context.getTemporalSlots();
						for (_i = 0, _len = slots.length; _i < _len; _i++) {
							slot = slots[_i];
							switch (slot.getTimePositionClass()) {
								case tv.freewheel.SDK.TIME_POSITION_CLASS_PREROLL:
									if (this.value.prerollSlotId != null) {
										this.prerollSlots.push(slot);
									}
									break;
								case tv.freewheel.SDK.TIME_POSITION_CLASS_MIDROLL:
									if (this.value.midrollSlotId != null) {
										cues.push(slot.getTimePosition());
										this.midrollSlots.push(slot);
									}
									break;
								case tv.freewheel.SDK.TIME_POSITION_CLASS_POSTROLL:
									if (this.value.postrollSlotId != null) {
										this.postrollSlots.push(slot);
									}
							}
						}
					}
					if (cues.length > 0) {
						this.sendNotification(Notifications.ADD_CUE_POINTS, cues);
					}
					this.initialized = true;
					if (this.playWhenLoaded === true) {
						this.startAd();
					}
				};

				/** @override
				 */
				FreeWheelProxy.prototype.breakStart = function() {
					var video;
					this.playbackCore = this.facade.player.retrieveProxy(PlayerProxy.NAME).getActivePlaybackCore();
					this.playbackCore.setEnabled(false);
					video = this.facade.player.getMediaElement();
					video.addEventListener("playing", this.playbackCore.handlers.playing);
					video.addEventListener("pause", this.playbackCore.handlers.pause);
					video.addEventListener("waiting", this.playbackCore.handlers.waiting);
				};

				/**
				 */
				FreeWheelProxy.prototype.onAdImpression = function(event) {
					this.sendNotification(AdNotifications.AD_STARTED, this.adVO);
				};

				/**
				 */
				FreeWheelProxy.prototype.onAdImpressionEnd = function(event) {
					this.sendNotification(AdNotifications.AD_ENDED, this.adVO);
				};

				/**
				 */
				FreeWheelProxy.prototype.midrollCheck = function(event) {
					var video;
					video = event.currentTarget;
					if (this.playbackCore.getCurrentTime() >= this.nextMidroll.getTimePosition()) {
						video.removeEventListener("timeupdate", this.timeupdate);
						this.engageAds();
						this.midrollEngaged = false;
						this.playAd(this.nextMidroll);
					}
				};

				/**
				 */
				FreeWheelProxy.prototype.adTimeupdate = function(event) {
					try {
						if (this.slot) {
							this.sendNotification(AdNotifications.AD_TIME_REMAINING, this.slot.getTotalDuration() - this.slot.getPlayheadTime());
						}
					} catch (error) {
						this.facade.logger.error("[AMP FREEWHEEL ERROR]", error);
					}
				};

				/**
				 */
				FreeWheelProxy.prototype.onSlotStarted = function(event) {
					this.slot = event.slot;
					this.facade.player.getMediaElement().addEventListener("timeupdate", this.adtimeupdate);
				};

				/**
				 */
				FreeWheelProxy.prototype.onSlotEnded = function(event) {
					var index, slotTimePositionClass;
					this.facade.player.getMediaElement().removeEventListener("timeupdate", this.adtimeupdate);
					slotTimePositionClass = event.slot.getTimePositionClass();
					this.slot = null;
					switch (slotTimePositionClass) {
						case tv.freewheel.SDK.TIME_POSITION_CLASS_PREROLL:
							if (this.prerollSlots.length) {
								this.prerollSlots.shift();
								if (this.prerollSlots.length) {
									this.playAd(this.prerollSlots[0]);
								} else {
									this.sendNotification(AdNotifications.BREAK_END);
								}
							}
							break;
						case tv.freewheel.SDK.TIME_POSITION_CLASS_MIDROLL:
							index = this.midrollSlots.indexOf(this.nextMidroll);
							if (index > -1) {
								this.midrollSlots.splice(index, 1);
							}
							this.facade.player.getMediaElement().addEventListener("canplaythrough", this.canplaythrough);
							this.sendNotification(AdNotifications.BREAK_END);
							break;
						case tv.freewheel.SDK.TIME_POSITION_CLASS_POSTROLL:
							if (this.postrollSlots.length) {
								this.postrollSlots.shift();
								if (this.postrollSlots.length) {
									this.playAd(this.postrollSlots[0]);
								} else {
									this.sendNotification(AdNotifications.BREAK_END);
								}
							}
					}
				};

				/**
				 */
				FreeWheelProxy.prototype.playAd = function(ad) {
					this.adVO = new AdVO(ad.getCustomId(), ad.getCustomId(), ad.getTotalDuration(), ad.getTimePosition(), ad.getTimePositionClass().toLowerCase(), "freewheel", null, null, null, ad);
					this.sendNotification(AdNotifications.BREAK_START, this.adVO);
					this.sendNotification(AdNotifications.AD_LOADED, this.adVO);
					try {
						ad.play();
					} catch (error) {
						this.error(error);
					}
				};

				/** @override
				 */
				FreeWheelProxy.prototype.start = function() {
					if (FreeWheelProxy.__super__.start.call(this) === false) {
						return false;
					}
					if (this.canPlay() === true) {
						this.startAd();
					} else {
						this.playWhenLoaded = true;
					}
					return true;
				};

				/**
				 */
				FreeWheelProxy.prototype.canPlay = function() {
					return this.initialized === true;
				};

				/**
				 */
				FreeWheelProxy.prototype.startAd = function() {
					this.playWhenLoaded = false;
					if (this.prerollSlots.length) {
						this.playAd(this.prerollSlots[0]);
					} else {
						this.sendNotification(AdNotifications.BREAK_END, this.adVO);
					}
				};

				/**
				 */
				FreeWheelProxy.prototype.play = function() {
					FreeWheelProxy.__super__.play.call(this);
					this.facade.player.getMediaElement().play();
				};

				/**
				 */
				FreeWheelProxy.prototype.pause = function() {
					var video;
					FreeWheelProxy.__super__.pause.call(this);
					video = this.facade.player.getMediaElement();
					video.pause();
					setTimeout(function() {
						return video.controls = false;
					}, 0);
				};

				/**
				 */
				FreeWheelProxy.prototype.breakEnd = function() {
					var video;
					FreeWheelProxy.__super__.breakEnd.call(this);
					if (this.playbackCore == null) {
						this.playbackCore = this.facade.player.retrieveProxy(PlayerProxy.NAME).getActivePlaybackCore();
					}
					video = this.facade.player.getMediaElement();
					video.removeEventListener("playing", this.playbackCore.handlers.playing);
					video.removeEventListener("pause", this.playbackCore.handlers.pause);
					video.removeEventListener("waiting", this.playbackCore.handlers.waiting);
					if (this.playbackCore.getEnded()) {
						this.context.setVideoState(tv.freewheel.SDK.VIDEO_STATE_COMPLETED);
					} else {
						this.playbackCore.setEnabled(true);
						this.facade.player.sendNotification(Notifications.PLAY, true);
						this.context.setVideoState(tv.freewheel.SDK.VIDEO_STATE_PLAYING);
						this.engageMidrollCheck();
					}
				};

				/** @override
				 */
				FreeWheelProxy.prototype.contentStarted = function() {
					this.engageMidrollCheck();
				};

				/** @override
				 */
				FreeWheelProxy.prototype.contentSeek = function(time) {
					var midroll;
					midroll = this.getNextMidroll(time);
					if (!(midroll != null)) {
						return;
					}
					if (!(this.nextMidroll != null) || midroll.getTimePosition() < this.nextMidroll.getTimePosition()) {
						if (this.midrollEngaged) {
							this.nextMidroll = midroll;
						} else {
							this.engageMidrollCheck();
						}
					}
				};

				/**
				 */
				FreeWheelProxy.prototype.engageMidrollCheck = function() {
					var _ref;
					if (((_ref = this.midrollSlots) != null ? _ref.length : void 0) === 0 || this.midrollEngaged === true) {
						return;
					}
					this.nextMidroll = this.getNextMidroll(this.playbackCore.getCurrentTime());
					if (!(this.nextMidroll != null)) {
						return;
					}
					this.midrollEngaged = true;
					this.facade.player.getMediaElement().addEventListener("timeupdate", this.timeupdate);
				};

				/**
				 */
				FreeWheelProxy.prototype.getNextMidroll = function(time) {
					var midroll, nextMidroll, _i, _len, _ref;
					_ref = this.midrollSlots;
					for (_i = 0, _len = _ref.length; _i < _len; _i++) {
						midroll = _ref[_i];
						if (time < midroll.getTimePosition()) {
							nextMidroll = midroll;
							break;
						}
					}
					return nextMidroll;
				};

				/** @override
				 */
				FreeWheelProxy.prototype.contentEnded = function() {
					var _ref;
					this.context.setVideoState(tv.freewheel.SDK.VIDEO_STATE_STOPPED);
					if (((_ref = this.postrollSlots) != null ? _ref.length : void 0)) {
						this.playAd(this.postrollSlots[0]);
					} else {
						this.context.setVideoState(tv.freewheel.SDK.VIDEO_STATE_COMPLETED);
					}
				};

				function FreeWheelWrapper() {
					return FreeWheelWrapper.__super__.constructor.apply(this, arguments);
				}


				__extends(FreeWheelWrapper, AdWrapper);


				FreeWheelWrapper.NAME = "FreeWheelWrapper";

				/** @override
				 */
				FreeWheelWrapper.prototype.createXML = function(xml) {
					var admedia, application, key, keyValue, prop, props, value, vendor, _i, _len, _ref;
					application = xml.firstChild;
					admedia = xml.getElementsByTagName("admedia")[0];
					if (!(admedia != null)) {
						admedia = xml.createElement("admedia");
						application.appendChild(admedia);
					}
					vendor = xml.createElement("vendor");
					vendor.setAttribute("id", "freewheel");
					admedia.appendChild(vendor);
					props = [
						{
							value: this.config.plugin.swf,
							key: "FREEWHEEL_AD_MANAGER_URL"
						}, {
							value: this.config.serverUrl,
							key: "FREEWHEEL_SERVER_URL"
						}, {
							value: this.config.networkId,
							key: "FREEWHEEL_NETWORK_ID"
						}, {
							value: this.config.profileId,
							key: "FREEWHEEL_PROFILE"
						}, {
							value: this.config.siteSectionId,
							key: "FREEWHEEL_SITE_SECTION_ID"
						}, {
							value: this.config.siteSectionFallbackId,
							key: "FREEWHEEL_SITE_SECTION_FALLBACK_ID"
						}, {
							value: this.config.prerollSlotId,
							key: "FREEWHEEL_PREROLL_SLOT_ID"
						}, {
							value: this.config.midrollSlotId,
							key: "FREEWHEEL_MIDROLL_SLOT_ID"
						}, {
							value: this.config.postrollSlotId,
							key: "FREEWHEEL_POSTROLL_SLOT_ID"
						}, {
							value: this.config.videoAssetId,
							key: "FREEWHEEL_VIDEO_ASSET_ID"
						}, {
							value: this.config.videoAssetFallbackId,
							key: "FREEWHEEL_VIDEO_ASSET_FALLBACK_ID"
						}, {
							value: this.config.videoAssetVideoPlayRandom,
							key: "FREEWHEEL_VIDEO_ASSET_VIDEO_PLAY_RANDOM"
						}, {
							value: this.config.visitorId,
							key: "FREEWHEEL_VISITOR_ID"
						}, {
							value: this.config.keyValuesString,
							key: "FREEWHEEL_KEY_VALUES_STRING"
						}, {
							value: "30898",
							key: "FREEWHEEL_SITE_SECTION_PAGE_VIEW_RANDOM"
						}, {
							value: "EXACT",
							key: "FREEWHEEL_VIDEO_ASSET_DURATION_TYPE"
						}, {
							value: this.config.visitorHeader,
							key: "FREEWHEEL_VISITOR_HTTP_HEADER_KEY_VALUE"
						}
					];
					for (_i = 0, _len = props.length; _i < _len; _i++) {
						prop = props[_i];
						if (prop.value != null) {
							this.createProperty(xml, prop.key, prop.value, vendor);
						}
					}
					if (this.config.position != null) {
						vendor.setAttribute("position", this.config.position);
					}
					if (this.config.keyValues != null) {
						keyValue = xml.createElement("property");
						keyValue.setAttribute("key", "FREEWHEEL_KEY_VALUE");
						_ref = this.config.keyValues;
						for (key in _ref) {
							value = _ref[key];
							if (value != null) {
								this.createProperty(xml, key, value, keyValue);
							}
						}
						vendor.appendChild(keyValue);
					}
				};

				/**
				 * DASHPlaybackProxy constructor.
				 *
				 * @constructor
				 * @private
				 * @extends {PlaybackCoreProxy}
				 */
				function DASHPlaybackProxy(data) {
					DASHPlaybackProxy.__super__.constructor.call(this, data.types);
					this.buffer = data.buffer;
				}


				__extends(DASHPlaybackProxy, PlaybackCoreProxy);


				DASHPlaybackProxy.prototype.initialized = true;

				DASHPlaybackProxy.prototype.playbackCoreName = "dash";

				DASHPlaybackProxy.prototype.context = null;

				DASHPlaybackProxy.prototype.player = null;

				DASHPlaybackProxy.prototype.buffer = null;

				DASHPlaybackProxy.prototype.isDVR = false;

				/** @override
				 */
				DASHPlaybackProxy.prototype.resumecomplete = function() {
					this.applyHandlers(true);
					this.play();
				};

				/** @override
				 */
				DASHPlaybackProxy.prototype.load = function() {
					var video,
						_this = this;
					video = this.getMediaElement();
					video.addEventListener("loadedmetadata", this.resumeHandlers.canplay);
					this.context = new Dash.di.DashContext();
					this.player = new MediaPlayer(this.context);
					if (this.buffer != null) {
						MediaPlayer.dependencies.BufferController.DEFAULT_MIN_BUFFER_TIME = this.buffer;
					}
					this.player.startup();
					this.player.addEventListener("error", this.onError.bind(this));
					this.player.debug.setLogToBrowserConsole(this.facade.logger.enabled);
					this.player.attachView(video);
					this.player.setAutoPlay(false);
					this.player.attachSource(this.getSrc());
					this.isDVR = this.facade.retrieveProxy(MediaProxy.NAME).getTemporalType() === "dvr";
					if (this.isDVR === true) {
						video.addEventListener("timeupdate", function(event) {
							var duration, time;
							try {
								time = _this.player.time();
								duration = _this.player.duration();
								_this.sendNotification(Notifications.DISPLAY_TIME, {
									value: time / duration,
									currentTime: time,
									duration: duration
								});
							} catch (error) {
								_this.facade.logger.error(error);
							}
						});
					}
				};

				/**
				 */
				DASHPlaybackProxy.prototype.seek = function(value) {
					DASHPlaybackProxy.__super__.seek.call(this, this.isDVR === true ? this.player.getDVRSeekOffset(value) : value);
				};

				/**
				 */
				DASHPlaybackProxy.prototype.getDuration = function() {
					if (this.isDVR === true) {
						return this.player.duration();
					} else {
						return DASHPlaybackProxy.__super__.getDuration.call(this);
					}
				};

				/**
				 */
				DASHPlaybackProxy.prototype.getStats = function() {
					return {};
				};

				/**
				 */
				DASHPlaybackProxy.prototype.onError = function(event) {
					this.facade.logger.error("DASH JS Playback Error:", event);
				};

				/**
				 * The StatsPlugin class.
				 *
				 * @param {Module}  app     The parent module of this plugin.
				 * @constructor
				 * @private
				 * @extends {Plugin}
				 */
				function StatsPlugin() {
					StatsPlugin.__super__.constructor.call(this);
				}


				__extends(StatsPlugin, Plugin);


				StatsPlugin.prototype.moduleName = "stats";

				/** @override
				 */
				StatsPlugin.prototype.createModel = function() {
					this.proxy = new StatsProxy(this.config);
					this.registerProxy(this.proxy);
				};

				/** @override
				 */
				StatsPlugin.prototype.createController = function() {
					this.registerCommand(StatsNotifications.VISIBILITY_CHANGE, StatsVisibilityChangeCommand);
				};

				/** @override
				 */
				StatsPlugin.prototype.createView = function() {
					this.registerMediator(new StatsMediator());
				};

				/** @override
				 */
				StatsPlugin.prototype.listNotificationPublications = function() {
					return StatsPlugin.__super__.listNotificationPublications.call(this).concat([Notifications.ADD_CONTROL, Notifications.REMOVE_CONTROL, Notifications.ADD_CONTROL_STATE, Notifications.REMOVE_CONTROL_STATE, StatsNotifications.VISIBILITY_CHANGE]);
				};

				/**
				 * @return   {boolean}  A boolean indicating whether or not the stats are hidden.
				 * @expose
				 */
				StatsPlugin.prototype.getHidden = function() {
					return this.proxy.getHidden();
				};

				/**
				 *
				 * @param   {boolean} value A boolean indicating whether or not the stats are hidden.
				 * @expose
				 */
				StatsPlugin.prototype.setHidden = function(value) {
					this.sendNotification(StatsNotifications.VISIBILITY_CHANGE, value);
					return value;
				};


				AMP.registerPlugin("stats", "html", StatsPlugin);

				/**
				 * The DASHChangeDisplayStateCommand class.
				 *
				 * @constructor
				 * @private
				 * @extends {puremvc.SimpleCommand}
				 */
				function DASHChangeDisplayStateCommand() {
					DASHChangeDisplayStateCommand.__super__.constructor.call(this);
				}


				__extends(DASHChangeDisplayStateCommand, puremvc.SimpleCommand);


				/**
				 * Executes the command.
				 *
				 * @param {puremvc.Notification} notification
				 *    The notification.
				 *
				 * @override
				 */
				DASHChangeDisplayStateCommand.prototype.execute = function(notification) {
					var core, fullscreen, playback, proxy, state, target,
						_this = this;
					state = notification.getBody();
					playback = this.facade.retrieveProxy(PlaybackProxy.NAME);
					core = this.facade.getMediaElement();
					if (!(core != null) || !core.webkitSupportsFullscreen) {
						return;
					}
					proxy = this.facade.retrieveProxy(ApplicationStateProxy.NAME);
					proxy.setDisplayState(state);
					fullscreen = {};
					target = this.facade.viewComponent;
					if (target.requestFullscreen != null) {
						fullscreen.enter = function() {
							return target.requestFullscreen();
						};
						fullscreen.exit = function() {
							return document.cancelFullscreen();
						};
						fullscreen.event = "onfullscreenchange";
						fullscreen.element = "fullscreenElement";
					} else if (target.webkitRequestFullScreen != null) {
						fullscreen.enter = function() {
							return target.webkitRequestFullScreen();
						};
						fullscreen.exit = function() {
							return document.webkitCancelFullScreen();
						};
						fullscreen.event = "onwebkitfullscreenchange";
						fullscreen.element = "webkitFullscreenElement";
					} else if (target.mozRequestFullScreen != null) {
						fullscreen.enter = function() {
							return target.mozRequestFullscreen();
						};
						fullscreen.exit = function() {
							return document.mozCancelFullScreen();
						};
						fullscreen.event = "onmozfullscreenchange";
						fullscreen.element = "mozFullscreenElement";
					} else if (target.msRequestFullScreen != null) {
						fullscreen.enter = function() {
							return target.msRequestFullscreen();
						};
						fullscreen.exit = function() {
							return document.msCancelFullScreen();
						};
						fullscreen.event = "onmozfullscreenchange";
						fullscreen.element = "mozFullscreenElement";
					}
					if (state === DisplayState.FULL_SCREEN) {
						fullscreen.enter();
						if (fullscreen.event != null) {
							core[fullscreen.event] = function(event) {
								if (!(document[fullscreen.element] != null)) {
									return _this.sendNotification(Notifications.CHANGE_DISPLAY_STATE, DisplayState.NORMAL);
								}
							};
						}
					} else if (state === DisplayState.NORMAL) {
						fullscreen.exit();
						core[fullscreen.event] = null;
					}
					this.facade.dispatchEvent(new Event("fullscreenchange", state === DisplayState.FULL_SCREEN));
				};

				/**
				 * The DASHProxy class.
				 *
				 * @param {Object}  config  The plugin configuration object.
				 * @constructor
				 * @private
				 * @extends {PluginProxy}
				 */
				function DASHProxy(config) {
					DASHProxy.__super__.constructor.call(this, config);
				}


				__extends(DASHProxy, PluginProxy);


				/** @static
				 */
				DASHProxy.NAME = ModuleProxy.NAME;

				DASHProxy.prototype.defaults = {
					types: ["application/dash+xml"],
					buffer: null
				};

				DASHProxy.prototype.initialize = function() {
					var core, player;
					window.MediaSource = window.MediaSource || window.WebKitMediaSource;
					if (window.MediaSource != null) {
						this.sendNotification(Notifications.INITIALIZED);
						core = new DASHPlaybackProxy(this.getConfigurationData());
						player = this.facade.player.retrieveProxy(PlayerProxy.NAME);
						player.registerPlaybackCore(core);
					}
				};

				/**
				 * The AMPChromeCastPlayer class.
				 *
				 * @param {Object} player
				 *    The player instance
				 *
				 * @constructor
				 */
				function ChromeCastPlayer(shim) {
					var index, rule, sheet, style;
					this.shim = shim;
					ChromeCastPlayer.__super__.constructor.call(this);
					this.state = cast.receiver.media.PlayerState.IDLE;
					try {
						style = document.createElement('style');
						style.type = 'text/css';
						style.appendChild(document.createTextNode(""));
						document.head.appendChild(style);
						sheet = style.sheet;
						rule = ".akamai-html5.akamai-video::cue {color: #FFFFFF; background: #000000; visibility: hidden;}";
						index = sheet.insertRule(rule, 0);
						this.cssRule = sheet.rules[index];
					} catch (error) {
						Logger.error(error);
					}
				}


				__extends(ChromeCastPlayer, EventDispatcher);


				ChromeCastPlayer.prototype.player = null;

				ChromeCastPlayer.prototype.callbackMap = null;

				ChromeCastPlayer.prototype.state = null;

				ChromeCastPlayer.prototype.activeTrackId = null;

				ChromeCastPlayer.prototype.cssRule = null;

				ChromeCastPlayer.prototype.textTrackStyle = null;

				ChromeCastPlayer.prototype.ccHandler = null;

				ChromeCastPlayer.prototype.feed = null;

				ChromeCastPlayer.prototype.media = null;

				ChromeCastPlayer.prototype.tracks = null;

				/**
				 *
				 */
				ChromeCastPlayer.prototype.registerPlayer = function(player) {
					var events, listener, readyHandler,
						_this = this;
					this.player = player;
					events = ["loadedmetadata", "ended", "error"];
					listener = this.dispatchEvent.bind(this);
					events.forEach(function(type) {
						return player.addEventListener(type, listener);
					});
					readyHandler = function() {
						_this.player.removeEventListener("ready", readyHandler);
						_this.applyMedia();
						_this.applyFeed();
						_this.applyClassName();
					};
					this.player.addEventListener("ready", readyHandler);
					this.player.addEventListener("playing", this.setState.bind(this, cast.receiver.media.PlayerState.PLAYING));
					this.player.addEventListener("pause", this.setState.bind(this, cast.receiver.media.PlayerState.PAUSED));
					this.player.addEventListener("waiting", this.setState.bind(this, cast.receiver.media.PlayerState.BUFFERING));
				};

				/**
				 * @private
				 */
				ChromeCastPlayer.prototype.setState = function(state) {
					if (state === this.state) {
						return;
					}
					this.state = state;
					this.shim.mediaManager.broadcastStatus(true);
					return state;
				};

				/**
				 * Registers an API that the player should call when there is an error.
				 *
				 * @param {function(Object)} errorCallback
				 *    The callback method called when the player has an error.
				 */
				ChromeCastPlayer.prototype.registerErrorCallback = function(errorCallback) {
					this.onerror = errorCallback;
				};

				/**
				 * Registers an API that the player should call when the media has ended.
				 *
				 * @param {function()} endedCallback
				 *    The callback method called when the player has ended.
				 */
				ChromeCastPlayer.prototype.registerEndedCallback = function(endedCallback) {
					this.onended = endedCallback;
				};

				/**
				 * Registers an API that the player should call when load is complete.
				 *
				 * @param {function()} loadCallback
				 *    The callback method called when the player has completed load succesfully.
				 */
				ChromeCastPlayer.prototype.registerLoadCallback = function(loadCallback) {
					this.onloadedmetadata = loadCallback;
				};

				/**
				 * Called to unregister for error callbacks.
				 */
				ChromeCastPlayer.prototype.unregisterErrorCallback = function() {
					this.onerror = null;
				};

				/**
				 * Called to unregister for ended callbacks.
				 */
				ChromeCastPlayer.prototype.unregisterEndedCallback = function() {
					this.onended = null;
				};

				/**
				 * Called to unregister for load callbacks.
				 */
				ChromeCastPlayer.prototype.unregisterLoadCallback = function() {
					this.onloadedmetadata = null;
				};

				/**
				 * Loads content to be played.
				 *
				 * @param {string} contentId
				 *    The content ID. Should be treated as an opaque string.
				 *
				 * @param {boolean} autoplay
				 *    Whether the content should play after load.
				 *
				 * @param {number} opt_time
				 *    The expected current time after load (in seconds). Optional.
				 *
				 * @param {cast.receiver.media.TracksInfo} opt_tracksInfo
				 *    The tracks information. Optional.
				 */
				ChromeCastPlayer.prototype.load = function(contentId, autoplay, opt_time, opt_tracksInfo) {
					var customData, info, key, media, metadata, value, _ref, _ref1, _ref2, _ref3;
					info = this.shim.mediaManager.getMediaInformation();
					customData = info.customData || {};
					metadata = info.metadata || {};
					if (opt_tracksInfo != null) {
						this.editTracksInfo(opt_tracksInfo);
					} else {
						this.activeTrackId = null;
					}
					if ((customData.feed != null) && (((_ref = this.player) != null ? _ref.feed : void 0) != null)) {
						this.feed = customData.feed;
						this.media = null;
						this.applyFeed();
						return;
					}
					this.feed = null;
					media = {
						src: contentId,
						type: info.contentType,
						title: metadata.title,
						poster: (_ref1 = metadata.images) != null ? _ref1.url : void 0,
						description: metadata.subtitle,
						pubDate: new Date(info.releaseDate),
						metadata: customData,
						duration: info.duration,
						startTime: opt_time || ((_ref2 = customData.media) != null ? _ref2.startTime : void 0),
						autoplay: autoplay
					};
					if (customData.media != null) {
						_ref3 = customData.media;
						for (key in _ref3) {
							value = _ref3[key];
							if (!(media[key] != null)) {
								media[key] = value;
							}
						}
					}
					this.tracks = info.tracks;
					this.media = media;
					this.applyMedia();
				};

				/**
				 *
				 */
				ChromeCastPlayer.prototype.applyMedia = function() {
					if (!(this.player != null) || !(this.media != null)) {
						return;
					}
					this.player.setMedia(this.media);
					this.setState(cast.receiver.media.PlayerState.BUFFERING);
				};

				/**
				 *
				 */
				ChromeCastPlayer.prototype.loadTracks = function(tracks, event) {
					var track, type;
					this.player.removeEventListener("loadedmetadata", this.ccHandler);
					if ((tracks != null ? tracks.length : void 0) > 0) {
						track = this.getTrack(0);
						if (track != null) {
							type = /ttml/.test(track.trackContentType) ? "ttml" : track.trackContentType;
						}
					}
				};

				/**
				 *
				 */
				ChromeCastPlayer.prototype.applyFeed = function() {
					if (!(this.player != null) || !(this.feed != null)) {
						return;
					}
					this.player.addEventListener("mediachange", this.mediachangeHandler.bind(this));
					if (feed.data != null) {
						this.player.feed.setData(feed.data);
					} else if (feed.url != null) {
						this.player.feed.setURL(feed.url);
					}
				};

				/**
				 *
				 */
				ChromeCastPlayer.prototype.mediachangeHandler = function(event) {
					var media, mediaInfo;
					this.removeHandler("mediachange");
					media = this.player.getMedia();
					mediaInfo = new cast.receiver.media.MediaInformation();
					mediaInfo.contentId = media.src;
					mediaInfo.contentType = media.type;
					mediaInfo.customData = media.metadata;
					mediaInfo.duration = media.duration;
					mediaInfo.metadata = {
						title: media.title,
						subtitle: media.description,
						images: [
							{
								url: media.poster
							}
						],
						releaseDate: media.pubDate.toISOString()
					};
					this.media = media;
					this.shim.mediaManager.setMediaInformation(mediaInfo, true);
				};

				/**
				 * Resets the player.
				 */
				ChromeCastPlayer.prototype.reset = function() {};

				/**
				 * Starts playback.
				 */
				ChromeCastPlayer.prototype.play = function() {
					this.player.play();
				};

				/**
				 * Sets playback to start at a new time position.
				 *
				 * @param {number} time
				 *    The expected current time after seek (in seconds).
				 *
				 * @param {cast.receiver.media.SeekResumeState} opt_resumeState
				 *    The expected state after seek. Optional.
				 */
				ChromeCastPlayer.prototype.seek = function(time, opt_resumeState) {
					this.player.setCurrentTime(time);
					switch (opt_resumeState) {
						case cast.receiver.media.SeekResumeState.PLAYBACK_PAUSE:
							this.player.pause();
							break;
						case cast.receiver.media.SeekResumeState.PLAYBACK_START:
							this.player.play();
					}
				};

				/**
				 * Pauses playback.
				 */
				ChromeCastPlayer.prototype.pause = function() {
					return this.player.pause();
				};

				/**
				 * Provides the state of the player.
				 *
				 * @return {cast.receiver.media.PlayerState
 *    The current state of the player
*/
				ChromeCastPlayer.prototype.getState = function() {
					return this.state;
				};

				/**
				 * Provides the current time of the media in seconds.
				 *
				 * @return {number
 *    The current time of the video, in seconds.
*/
				ChromeCastPlayer.prototype.getCurrentTimeSec = function() {
					if (this.player != null) {
						return this.player.getCurrentTime();
					} else {
						return 0;
					}
				};

				/**
				 * Provides the duration of the media in seconds.
				 *
				 * @return {number
 *    Duration of the video, in seconds.
*/
				ChromeCastPlayer.prototype.getDurationSec = function() {
					if (this.player != null) {
						return this.player.getDuration();
					} else {
						return 0;
					}
				};

				/**
				 * Provides the stream volume.
				 *
				 * @return {cast.receiver.media.Volume
 *    The media volume
*/
				ChromeCastPlayer.prototype.getVolume = function() {
					var volume;
					volume = new cast.receiver.media.Volume();
					volume.level = this.player.getVolume();
					volume.muted = this.player.getMuted();
					return volume;
				};

				/**
				 * Sets the stream volume.
				 *
				 * @param {cast.receiver.media.Volume} volume
				 *    New volume
				 */
				ChromeCastPlayer.prototype.setVolume = function(volume) {
					if (volume.level != null) {
						this.player.setVolume(volume.level);
					}
					if (volume.muted === true) {
						this.player.setMuted(true);
					} else {
						if (this.player.getMuted() === true) {
							this.player.setMuted(false);
						}
					}
					return volume;
				};

				/**
				 * Allows to edit the tracks information (active tracks and style).
				 *
				 * @param {cast.receiver.MediaManager.EditTracksInfoData} data
				 *    The tracks information. The tracks definition can not change so
				 *    the tracks field will be undefined (and should be ignored).
				 */
				ChromeCastPlayer.prototype.editTracksInfo = function(data) {
					var activeTrack, style;
					if (data.activeTrackIds != null) {
						activeTrack = data.activeTrackIds[0];
						if (this.activeTrackId !== activeTrack) {
							this.activeTrackId = activeTrack;
							this.applyClassName();
						}
					}
					style = data.textTrackStyle;
					if ((style != null) && (this.cssRule != null)) {
						this.textTrackStyle = style;
						if (style.foregroundColor != null) {
							this.cssRule.style.color = this.hexToRgba(style.foregroundColor);
						}
						if (style.backgroundColor != null) {
							this.cssRule.style.backgroundColor = this.hexToRgba(style.backgroundColor);
						}
						if (style.windowType === cast.receiver.media.TextTrackWindowType.ROUNDED_CORNERS) {
							this.cssRule.style.borderRadius = style.windowRoundedCornerRadius + "px";
						}
						if (style.fontScale != null) {
							this.cssRule.style.fontSize = style.fontScale + "em";
						}
						if (style.fontFamily != null) {
							this.cssRule.style.fontFamily = style.fontFamily;
						}
					}
				};

				ChromeCastPlayer.prototype.applyClassName = function(hex) {
					var classList, className;
					if (!(this.player != null)) {
						return;
					}
					className = "akamai-cc";
					classList = this.player.getMediaElement().classList;
					if (this.activeTrackId != null) {
						classList.add(className);
					} else {
						classList.remove(className);
					}
				};

				ChromeCastPlayer.prototype.hexToRgba = function(hex) {
					var a, b, g, r;
					if (!/^#[A-Fa-f0-9]{6}([A-Fa-f0-9]{2})?$/.test(hex)) {
						return hex;
					}
					r = parseInt(hex.substring(1, 3), 16);
					g = parseInt(hex.substring(3, 5), 16);
					b = parseInt(hex.substring(5, 7), 16);
					a = hex.length === 9 ? parseInt(hex.substring(7, 9), 16) / 256 : 1;
					return "rgba(" + r + "," + g + "," + b + "," + a + ")";
				};

				ChromeCastPlayer.prototype.getTrack = function(id) {
					var track;
					if (!(id != null)) {
						id = this.activeTrackId;
					}
					track = this.tracks.filter(function(item) {
						return item.trackId === id;
					})[0];
					if (track != null) {
						if (!(track.trackContentType != null)) {
							track.trackContentType = cast.player.api.CaptionsType.CEA608;
						}
					}
					return track;
				};

				/**
				 * @enum {string}
				 * @const
				 * @private
				 */

				var ChromeCastConstants = {
					CHANNEL_ID: "urn:x-cast:com.akamai.amp.cast",
					APPLICATION_ID: "CC1AD845",
					SUPPORTED_TYPES: [Utils.mimeTypes.m3u8, Utils.mimeTypes.mp4, Utils.mimeTypes.mpd, Utils.mimeTypes.ism, Utils.mimeTypes.webm, Utils.mimeTypes.mp3]
				};

				/**
				 * The ChromeCastSenderProxy class.
				 *
				 * @param {Object}  config  The plugin configuration object.
				 * @constructor
				 * @private
				 * @extends {PluginProxy}
				 */
				function ChromeCastSenderProxy(config) {
					this.messageBus = config.messageBus || ChromeCastConstants.CHANNEL_ID;
					ChromeCastSenderProxy.__super__.constructor.call(this, config.sender);
				}


				__extends(ChromeCastSenderProxy, PluginProxy);


				/** @static
				 */
				ChromeCastSenderProxy.NAME = ModuleProxy.NAME;

				ChromeCastSenderProxy.prototype.defaults = {
					applicationID: ChromeCastConstants.APPLICATION_ID
				};

				ChromeCastSenderProxy.prototype.session = null;

				ChromeCastSenderProxy.prototype.media = null;

				ChromeCastSenderProxy.prototype.messageBus = null;

				ChromeCastSenderProxy.prototype.feed = null;

				ChromeCastSenderProxy.prototype.currentTime = null;

				ChromeCastSenderProxy.prototype.duration = null;

				ChromeCastSenderProxy.prototype.receiverAvailable = false;

				ChromeCastSenderProxy.prototype.currentTime = 0;

				ChromeCastSenderProxy.prototype.duration = 0;

				ChromeCastSenderProxy.prototype.playerState = null;

				ChromeCastSenderProxy.prototype.displayTimeTimeout = null;

				/** @override
				 */
				ChromeCastSenderProxy.prototype.initialize = function() {
					var _ref,
						_this = this;
					if (typeof chrome !== "undefined" && chrome !== null ? (_ref = chrome.cast) != null ? _ref.isAvailable : void 0 : void 0) {
						this.initializeCastApi();
					} else {
						window['__onGCastApiAvailable'] = function(loaded, errorInfo) {
							if (loaded === true) {
								_this.initializeCastApi();
							} else {
								_this.logError("cast load error", errorInfo);
							}
						};
					}
				};

				ChromeCastSenderProxy.prototype.initializeCastApi = function() {
					var apiConfig, applicationID, sessionRequest;
					applicationID = this.getConfigurationData().applicationID;
					sessionRequest = new chrome.cast.SessionRequest(applicationID);
					apiConfig = new chrome.cast.ApiConfig(sessionRequest, this.sessionListener.bind(this), this.receiverListener.bind(this), chrome.cast.AutoJoinPolicy.ORIGIN_SCOPED);
					chrome.cast.initialize(apiConfig, this.onInitSuccess.bind(this), this.onInitError.bind(this));
				};

				ChromeCastSenderProxy.prototype.onInitSuccess = function(event) {
					this.logEvent("init success", event);
				};

				ChromeCastSenderProxy.prototype.onInitError = function(event) {
					this.logError("init error", event);
				};

				ChromeCastSenderProxy.prototype.receiverListener = function(event) {
					this.receiverAvailable = event === 'available';
					this.sendNotification(ChromeCastNotifications.AVAILABILITY_CHANGE, this.receiverAvailable);
					this.logEvent("receiver " + (this.receiverAvailable ? "found" : "list empty"));
				};

				ChromeCastSenderProxy.prototype.sessionListener = function(event) {
					var session;
					this.logEvent("session listener", event);
					session = event;
					if (session.media.length !== 0) {
						this.onMediaDiscovered(session.media[0]);
					} else {
						this.onRequestSessionSuccess(event);
					}
				};

				ChromeCastSenderProxy.prototype.launch = function() {
					chrome.cast.requestSession(this.onRequestSessionSuccess.bind(this), this.onLaunchError.bind(this));
				};

				ChromeCastSenderProxy.prototype.send = function(msg) {
					this.session.sendMessage(this.messageBus, msg, this.onMessageSuccess.bind(this), this.onMessageError.bind(this));
				};

				ChromeCastSenderProxy.prototype.onLaunchError = function(event) {
					this.logError("launch error.", event);
				};

				ChromeCastSenderProxy.prototype.onRequestSessionSuccess = function(event) {
					var playbackProxy;
					this.logEvent("request session success.", event);
					this.session = event;
					this.session.addMessageListener(this.messageBus, this.onMessage.bind(this));
					this.session.addUpdateListener(this.onUpdate.bind(this));
					playbackProxy = this.facade.player.retrieveProxy(PlaybackProxy.NAME);
					if (this.session.media.length === 0) {
						this.loadMedia(playbackProxy.getCurrentTime());
					}
				};

				ChromeCastSenderProxy.prototype.onUpdate = function(isAlive) {
					if (!isAlive) {
						this.sendNotification(Notifications.PLAYBACK_TARGET_CHANGE, {
							target: "amp"
						});
						this.stopDisplayTimeUpdate();
					}
				};

				ChromeCastSenderProxy.prototype.onMessageSuccess = function(event) {
					this.logEvent("message sent", event);
				};

				ChromeCastSenderProxy.prototype.onMessageError = function(event) {
					this.logError("message error", event);
				};

				ChromeCastSenderProxy.prototype.onMessage = function(namespace, message) {
					var detail, target, type;
					message = JSON.parse(message);
					type = message.type;
					detail = message.detail || {};
					switch (type) {
						case "dispatchevent":
							target = detail.target === "player" ? this.facade.player.parent : this.facade.player.parent[detail.target];
							if (target != null) {
								target.dispatchEvent(detail.event);
							}
					}
					this.sendNotification(Notifications.DISPATCH_EVENT, {
						type: "message",
						message: message
					});
				};

				ChromeCastSenderProxy.prototype.onStop = function(event) {
					this.logEvent("stop");
					this.session.stop(this.onStopSuccess.bind(this), this.onStopError.bind(this));
				};

				ChromeCastSenderProxy.prototype.onStopSuccess = function(event) {
					this.logEvent("stop success", event);
				};

				ChromeCastSenderProxy.prototype.onStopError = function(event) {
					this.logError("stop error", event);
				};

				ChromeCastSenderProxy.prototype.logEvent = function(message, data) {
					if (message == null) {
						message = data.type || "";
					}
					this.facade.logger.log("[AMP CHROMECAST] " + message, data);
				};

				ChromeCastSenderProxy.prototype.logError = function(message, data) {
					this.facade.logger.error("[AMP CHROMECAST ERROR] " + message, data);
				};

				ChromeCastSenderProxy.prototype.getFeed = function() {
					return this.feed;
				};

				ChromeCastSenderProxy.prototype.setFeed = function(value) {
					if (this.feed === value) {
						return;
					}
					this.feed = value;
					if (this.session != null) {
						this.loadMedia();
					}
				};

				ChromeCastSenderProxy.prototype.loadMedia = function(startTime) {
					var customData, feed, media, receiverCanPlay, request, source, _ref;
					if (startTime == null) {
						startTime = 0;
					}
					media = this.facade.player.retrieveProxy(MediaProxy.NAME).getData();
					if (!(media != null)) {
						return;
					}
					receiverCanPlay = function(type) {
						if (ChromeCastConstants.SUPPORTED_TYPES.indexOf(type) > -1) {
							return "maybe";
						} else {
							return "";
						}
					};
					source = Utils.selectSource(media.source, receiverCanPlay);
					if (!(source != null)) {
						return;
					}
					customData = {
						media: media
					};
					feed = (_ref = this.facade.player.getModules()) != null ? _ref.feed : void 0;
					if (feed != null) {
						customData.feed = {
							data: feed.getData(),
							url: feed.getURL()
						};
					}
					request = this.mediaToLoadRequest(media, source, startTime, customData);
					this.session.loadMedia(request, this.onMediaDiscovered.bind(this), this.onMediaError.bind(this));
				};

				ChromeCastSenderProxy.prototype.mediaToLoadRequest = function(media, source, startTime, customData) {
					var index, mediaInfo, metadata, request, track, value, _i, _len, _ref, _ref1, _ref2;
					metadata = new chrome.cast.media.GenericMediaMetadata();
					metadata.title = media.title;
					metadata.subtitle = media.description;
					metadata.image = [new chrome.cast.Image(media.poster)];
					metadata.releaseDate = (_ref = media.pubDate) != null ? typeof _ref.toISOString === "function" ? _ref.toISOString() : void 0 : void 0;
					mediaInfo = new chrome.cast.media.MediaInfo(source.src, source.type);
					mediaInfo.duration = media.duration;
					mediaInfo.customData = customData;
					mediaInfo.metadata = metadata;
					if (((_ref1 = media.track) != null ? _ref1.length : void 0) > 0) {
						mediaInfo.tracks = [];
						_ref2 = media.track;
						for (index = _i = 0, _len = _ref2.length; _i < _len; index = ++_i) {
							value = _ref2[index];
							track = new chrome.cast.media.Track(index, chrome.cast.media.TrackType.TEXT);
							track.subtype = chrome.cast.media.TextTrackType.CAPTIONS;
							track.name = "Closed Captions";
							track.language = value.srclang;
							track.customData = value;
							track.trackContentId = value.src;
							track.trackContentType = value.type;
							mediaInfo.tracks.push(track);
						}
					}
					request = new chrome.cast.media.LoadRequest(mediaInfo);
					request.currentTime = startTime;
					return request;
				};

				ChromeCastSenderProxy.prototype.onMediaDiscovered = function(media) {
					if (this.media != null) {
						this.media.removeUpdateListener(this.mediaStatusUpdate);
					}
					this.media = media;
					this.mediaStatusUpdate = this.onMediaStatusUpdate.bind(this);
					this.media.addUpdateListener(this.mediaStatusUpdate);
					this.sendNotification(Notifications.PLAYBACK_TARGET_CHANGE, {
						target: "chromecast"
					});
				};

				ChromeCastSenderProxy.prototype.onMediaStatusUpdate = function(status) {
					this.logEvent("mediastatusupdate", status);
					this.updatePlayerState(this.media.playerState);
					this.updateDisplayTime();
					if (status === false) {
						this.stopDisplayTimeUpdate();
					}
				};

				ChromeCastSenderProxy.prototype.updatePlayerState = function(playerState) {
					var state;
					if (playerState === this.playerState) {
						return;
					}
					this.playerState = playerState;
					switch (this.playerState) {
						case chrome.cast.media.PlayerState.BUFFERING:
							state = PlayState.WAITING;
							break;
						case chrome.cast.media.PlayerState.PLAYING:
							state = PlayState.PLAYING;
							break;
						case chrome.cast.media.PlayerState.PAUSED:
							state = PlayState.PAUSED;
					}
					this.sendNotification(Notifications.CHANGE_PLAY_STATE, state);
					if (this.playerState === chrome.cast.media.PlayerState.PLAYING) {
						this.startDisplayTimeUpdate();
					} else {
						this.stopDisplayTimeUpdate();
					}
				};

				ChromeCastSenderProxy.prototype.startDisplayTimeUpdate = function() {
					this.stopDisplayTimeUpdate();
					this.displayTimeTimeout = setInterval(this.updateDisplayTime.bind(this), 100);
				};

				ChromeCastSenderProxy.prototype.stopDisplayTimeUpdate = function() {
					clearInterval(this.displayTimeTimeout);
					this.displayTimeTimeout = null;
				};

				ChromeCastSenderProxy.prototype.updateDisplayTime = function() {
					var currentTime, duration, _ref;
					currentTime = this.media.getEstimatedTime() || 0;
					duration = ((_ref = this.media.media) != null ? _ref.duration : void 0) || currentTime;
					if (duration !== this.duration) {
						this.duration = duration;
						this.sendNotification(Notifications.CHANGE_DURATION, this.duration);
						return;
					}
					if (currentTime !== this.currentTime) {
						this.currentTime = currentTime;
						this.sendNotification(Notifications.DISPLAY_TIME, {
							currentTime: this.currentTime,
							duration: this.duration
						});
					}
				};

				ChromeCastSenderProxy.prototype.onMediaError = function(error) {
					this.logError("media error", error);
					this.stopDisplayTimeUpdate();
				};

				ChromeCastSenderProxy.prototype.play = function() {
					this.media.play();
				};

				ChromeCastSenderProxy.prototype.pause = function() {
					this.media.pause();
				};

				ChromeCastSenderProxy.prototype.setCurrentTime = function(time) {
					var request;
					request = new chrome.cast.media.SeekRequest();
					request.currentTime = time;
					this.media.seek(request);
				};

				ChromeCastSenderProxy.prototype.getCurrentTime = function() {
					return this.currentTime;
				};

				ChromeCastSenderProxy.prototype.isReceiverAvailable = function() {
					return this.receiverAvailable;
				};

				/**
				 * The ChromeCastLaunchCommand class.
				 *
				 * @constructor
				 * @private
				 * @extends {PluginCommand}
				 */
				function ChromeCastLaunchCommand() {
					ChromeCastLaunchCommand.__super__.constructor.call(this);
				}


				__extends(ChromeCastLaunchCommand, PluginCommand);


				/**
				 * Executes the command.
				 *
				 * @param {puremvc.Notification} notification
				 *    The notification.
				 *
				 * @override
				 */
				ChromeCastLaunchCommand.prototype.execute = function(notification) {
					this.config.launch();
				};

				/**
				 * The ChromeCastCaptioningVisibilityChangeCommand class.
				 *
				 * @constructor
				 * @private
				 * @extends {PluginCommand}
				 */
				function ChromeCastCaptioningVisibilityChangeCommand() {
					ChromeCastCaptioningVisibilityChangeCommand.__super__.constructor.call(this);
				}


				__extends(ChromeCastCaptioningVisibilityChangeCommand, PluginCommand);


				/**
				 * Executes the command.
				 *
				 * @param {puremvc.Notification} notification
				 *    The notification.
				 *
				 * @override
				 */
				ChromeCastCaptioningVisibilityChangeCommand.prototype.execute = function(notification) {
					this.config.send({
						type: "captioning.visibilitychange",
						detail: {
							visibility: notification.getBody()
						}
					});
				};

				/**
				 * The ChromeCastCaptioningSettingsChangeCommand class.
				 *
				 * @constructor
				 * @private
				 * @extends {PluginCommand}
				 */
				function ChromeCastCaptioningSettingsChangeCommand() {
					ChromeCastCaptioningSettingsChangeCommand.__super__.constructor.call(this);
				}


				__extends(ChromeCastCaptioningSettingsChangeCommand, PluginCommand);


				/**
				 * Executes the command.
				 *
				 * @param {puremvc.Notification} notification
				 *    The notification.
				 *
				 * @override
				 */
				ChromeCastCaptioningSettingsChangeCommand.prototype.execute = function(notification) {
					this.config.send({
						type: "captioning.settingschange",
						detail: notification.getBody()
					});
				};

				/**
				 * The ChromeCastReceiverReadyCommand class.
				 *
				 * @constructor
				 * @private
				 * @extends {PluginCommand}
				 */
				function ChromeCastReceiverReadyCommand() {
					ChromeCastReceiverReadyCommand.__super__.constructor.call(this);
				}


				__extends(ChromeCastReceiverReadyCommand, PluginCommand);


				/**
				 * Executes the command.
				 *
				 * @param {puremvc.Notification} notification
				 *    The notification.
				 *
				 * @override
				 */
				ChromeCastReceiverReadyCommand.prototype.execute = function(notification) {
					this.facade.player.getViewComponent().hidden = false;
					this.plugin.ready();
				};

				/**
				 * ChromeCastPlaybackProxy constructor.
				 *
				 * @constructor
				 * @private
				 * @extends {PlaybackCoreProxy}
				 */
				function ChromeCastPlaybackProxy(types, receiver) {
					this.receiver = receiver;
					ChromeCastPlaybackProxy.__super__.constructor.call(this, types);
				}


				__extends(ChromeCastPlaybackProxy, PlaybackCoreProxy);


				ChromeCastPlaybackProxy.prototype.initialized = true;

				ChromeCastPlaybackProxy.prototype.player = null;

				ChromeCastPlaybackProxy.prototype.host = null;

				ChromeCastPlaybackProxy.prototype.protocol = null;

				ChromeCastPlaybackProxy.prototype.playbackCoreName = "chromecast";

				ChromeCastPlaybackProxy.prototype.manifest = null;

				ChromeCastPlaybackProxy.prototype.xhr = null;

				ChromeCastPlaybackProxy.prototype.trackInfo = null;

				ChromeCastPlaybackProxy.prototype.receiver = null;

				/**
				 * @override
				 * @private
				 */
				ChromeCastPlaybackProxy.prototype.reset = function() {
					ChromeCastPlaybackProxy.__super__.reset.call(this);
					this.xhr = null;
					this.manifest = null;
				};

				ChromeCastPlaybackProxy.prototype.unload = function() {
					if (this.player != null) {
						this.trackInfo = {
							activeTrackIds: [this.receiver.chromecastPlayer.activeTrackId],
							textTrackStyle: this.receiver.chromecastPlayer.textTrackStyle
						};
						this.receiver.chromecastPlayer.activeTrackId = null;
						this.receiver.chromecastPlayer.textTrackStyle = null;
						this.player.unload();
						this.player = null;
					}
				};

				/** @override
				 */
				ChromeCastPlaybackProxy.prototype.load = function() {
					var _this = this;
					if (this.xhr != null) {
						if (this.manifest != null) {
							this.loadMediaPlayer();
						}
					} else {
						this.xhr = new XMLHttpRequest();
						this.xhr.onload = function(event) {
							if (_this.xhr.status === 200) {
								_this.manifest = _this.xhr.responseText;
								_this.loadMediaPlayer();
							}
						};
						this.xhr.onerror = function(event) {
							_this.facade.logger.error(event);
							_this.player.unload();
						};
						this.xhr.open("GET", this.getSrc());
						this.xhr.send();
					}
				};

				ChromeCastPlaybackProxy.prototype.loadMediaPlayer = function() {
					var initStart, mediaProxy, type, types, video,
						_this = this;
					this.data.loading = true;
					this.playWhenLoaded = true;
					this.unload();
					video = this.facade.getMediaElement();
					video.addEventListener("canplay", this.resumeHandlers.canplay);
					video.addEventListener("loadedmetadata", this.handlers.loadedmetadata);
					video.addEventListener("durationchange", this.handlers.durationchange);
					video.addEventListener("canplaythrough", this.handlers.canplaythrough);
					if (video.src != null) {
						video.src = null;
					}
					initStart = 0;
					if (Logger.enabled === true) {
						cast.player.api.setLoggerLevel(cast.player.api.LoggerLevel.DEBUG);
					}
					this.host = new cast.player.api.Host({
						'mediaElement': video,
						'url': this.getSrc()
					});
					this.host.updateManifestRequestInfo = function(requestInfo) {
						if (requestInfo.url === _this.getSrc()) {
							requestInfo.skipRequest = true;
							requestInfo.setResponse(_this.manifest);
						}
					};
					this.host.onError = function(errorCode) {
						_this.facade.logger.error("Google Media Player Fatal Error - " + errorCode);
						_this.player.unload();
					};
					mediaProxy = this.facade.retrieveProxy(MediaProxy.NAME);
					type = mediaProxy.getType();
					types = Utils.mimeTypes;
					switch (type) {
						case types.m3u8:
							this.protocol = cast.player.api.CreateHlsStreamingProtocol(this.host);
							break;
						case types.mpd:
							this.protocol = cast.player.api.CreateDashStreamingProtocol(this.host);
							break;
						case types.ism:
							this.protocol = cast.player.api.CreateSmoothStreamingProtocol(this.host);
					}
					if (this.protocol != null) {
						this.player = new cast.player.api.Player(this.host);
						this.player.load(this.protocol, initStart);
					} else {
						this.facade.logger.error("Google Media Player Error: Could not create protocol");
					}
				};

				/**
				 * @override
				 */
				ChromeCastPlaybackProxy.prototype.resumecomplete = function() {
					ChromeCastPlaybackProxy.__super__.resumecomplete.call(this);
				};

				/**
				 * The ChromeCastBreakStartCommand class.
				 *
				 * @constructor
				 * @private
				 * @extends {PluginCommand}
				 */
				function ChromeCastBreakStartCommand() {
					ChromeCastBreakStartCommand.__super__.constructor.call(this);
				}


				__extends(ChromeCastBreakStartCommand, PluginCommand);


				/**
				 * Executes the command.
				 *
				 * @param {puremvc.Notification} notification
				 *    The notification.
				 *
				 * @override
				 */
				ChromeCastBreakStartCommand.prototype.execute = function(notification) {
					var playbackCore;
					this.facade.logger.debug("ChromeCastBreakStartCommand");
					playbackCore = this.facade.player.retrieveProxy(PlayerProxy.NAME).getActivePlaybackCore();
					if (playbackCore.getPlaybackCoreName() === "chromecast") {
						playbackCore.unload();
						playbackCore.src = null;
					}
				};

				/**
				 * The ChromeCastReceiverMediator class.
				 *
				 * @constructor
				 * @private
				 * @extends {PluginMediator}
				 */
				function ChromeCastReceiverMediator() {
					ChromeCastReceiverMediator.__super__.constructor.call(this);
				}


				__extends(ChromeCastReceiverMediator, PluginMediator);


				/**
				 * @override
				 */
				ChromeCastReceiverMediator.prototype.onRegister = function() {
					this.sendNotification(Notifications.ADD_APPLICATION_STATE, "chromecast-receiver");
					ChromeCastReceiverMediator.__super__.onRegister.call(this);
				};

				/**
				 * The ChromeCastSenderMediator class.
				 *
				 * @constructor
				 * @private
				 * @extends {PluginMediator}
				 */
				function ChromeCastSenderMediator() {
					ChromeCastSenderMediator.__super__.constructor.call(this);
				}


				__extends(ChromeCastSenderMediator, PluginMediator);


				ChromeCastSenderMediator.prototype.componentName = "chromecast";

				ChromeCastSenderMediator.prototype.controls = null;

				/**
				 * @override
				 */
				ChromeCastSenderMediator.prototype.onRegister = function() {
					this.controls = new ChromeCastControlsMediator();
					ChromeCastSenderMediator.__super__.onRegister.call(this);
				};

				/**
				 * @override
				 */
				ChromeCastSenderMediator.prototype.registerOverlay = function() {};

				/**
				 * @override
				 */
				ChromeCastSenderMediator.prototype.listNotificationInterests = function() {
					return [Notifications.PLAYBACK_TARGET_CHANGE, Notifications.CHANGE_PLAY_STATE];
				};

				/**
				 * @override
				 */
				ChromeCastSenderMediator.prototype.handleNotification = function(notification) {
					var body, name, target;
					name = notification.getName();
					body = notification.getBody();
					switch (name) {
						case Notifications.PLAYBACK_TARGET_CHANGE:
							target = body.target;
							if (target === "chromecast") {
								this.facade.registerMediator(this.controls);
							} else {
								this.facade.removeMediator(this.controls.getMediatorName());
							}
							break;
						case Notifications.CHANGE_PLAY_STATE:
							this.controls.setState(body);
					}
				};

				/**
				 * The ChromeCastSenderMediator class.
				 *
				 * @constructor
				 * @extends {ChromeCastSenderMediator}
				 * @private
				 */
				function ChromeCastHTMLSenderMediator() {
					ChromeCastHTMLSenderMediator.__super__.constructor.call(this);
				}


				__extends(ChromeCastHTMLSenderMediator, ChromeCastSenderMediator);


				ChromeCastHTMLSenderMediator.prototype.chromeCastButton = null;

				/**
				 * @override
				 */
				ChromeCastHTMLSenderMediator.prototype.onRegister = function() {
					this.chromeCastButton = new ChromeCastButtonMediator();
					this.facade.registerMediator(this.chromeCastButton);
					ChromeCastHTMLSenderMediator.__super__.onRegister.call(this);
				};

				/**
				 * @override
				 */
				ChromeCastHTMLSenderMediator.prototype.listNotificationInterests = function() {
					return ChromeCastHTMLSenderMediator.__super__.listNotificationInterests.call(this).concat([ChromeCastNotifications.AVAILABILITY_CHANGE]);
				};

				/**
				 * @override
				 */
				ChromeCastHTMLSenderMediator.prototype.handleNotification = function(notification) {
					var body, name;
					ChromeCastHTMLSenderMediator.__super__.handleNotification.call(this, notification);
					name = notification.getName();
					body = notification.getBody();
					switch (name) {
						case ChromeCastNotifications.AVAILABILITY_CHANGE:
							if (body === true) {
								this.sendNotification(Notifications.ADD_CONTROL_STATE, "chromecast");
								this.facade.player.sendNotification(Notifications.ADD_CONTROL, this.chromeCastButton.getViewComponent());
							} else {
								this.sendNotification(Notifications.REMOVE_CONTROL_STATE, "chromecast");
								this.facade.player.sendNotification(Notifications.REMOVE_CONTROL, this.chromeCastButton.getViewComponent());
							}
					}
				};

				/**
				 * The ChromeCastReceiverProxy class.
				 *
				 * @param {Object}  config  The plugin configuration object.
				 * @constructor
				 * @private
				 * @extends {PluginProxy}
				 */
				function ChromeCastReceiverProxy(config) {
					this.messageBus = config.messageBus || ChromeCastConstants.CHANNEL_ID;
					ChromeCastReceiverProxy.__super__.constructor.call(this, config.receiver);
				}


				__extends(ChromeCastReceiverProxy, PluginProxy);


				/** @static
				 */
				ChromeCastReceiverProxy.NAME = ModuleProxy.NAME;

				ChromeCastReceiverProxy.prototype.defaults = {
					shim: null,
					types: ["application/x-mpegURL", "application/dash+xml", "application/vnd.ms-sstr+xml"]
				};

				ChromeCastReceiverProxy.prototype.messageBus = null;

				ChromeCastReceiverProxy.prototype.castReceiverManager = null;

				ChromeCastReceiverProxy.prototype.castMessageBus = null;

				ChromeCastReceiverProxy.prototype.startTime = 0;

				ChromeCastReceiverProxy.prototype.currentTime = 0;

				ChromeCastReceiverProxy.prototype.boundHandler = null;

				ChromeCastReceiverProxy.prototype.amp = null;

				ChromeCastReceiverProxy.prototype.mediaManager = null;

				ChromeCastReceiverProxy.prototype.playbackCore = null;

				ChromeCastReceiverProxy.prototype.teardownTimeout = null;

				ChromeCastReceiverProxy.prototype.chromecastPlayer = null;

				ChromeCastReceiverProxy.prototype.initialize = function() {
					var core, player;
					ChromeCastReceiverProxy.__super__.initialize.call(this);
					this.sendNotification(Notifications.INITIALIZED);
					core = new ChromeCastPlaybackProxy(this.getConfigurationData().types, this);
					player = this.facade.player.retrieveProxy(PlayerProxy.NAME);
					player.registerPlaybackCore(core);
				};

				ChromeCastReceiverProxy.prototype.ready = function() {
					if (this.facade.logger.enabled === true) {
						cast.receiver.logger.setLevelValue(cast.receiver.LoggerLevel.DEBUG);
					}
					this.shim = ChromeCastShim.getInstance();
					this.castReceiverManager = this.shim.castReceiverManager;
					this.castReceiverManager.onReady = this.castReceiverManager.onSystemVolumeChanged = this.castReceiverManager.onVisibilityChanged = this.logEvent.bind(this);
					this.castReceiverManager.onSenderConnected = this.onSenderConnected.bind(this);
					this.castReceiverManager.onSenderDisconnected = this.onSenderDisconnected.bind(this);
					this.amp = this.facade.player;
					this.chromecastPlayer = this.shim.player;
					this.chromecastPlayer.registerPlayer(this.amp);
					this.mediaManager = this.shim.mediaManager;
					this.castMessageBus = this.shim.castMessageBuses[this.messageBus];
					this.castMessageBus.onMessage = this.onMessage.bind(this);
					this.amp.addEventListener("seeking", this.eventHandler.bind(this));
					this.amp.addEventListener("seeked", this.eventHandler.bind(this));
					this.amp.addEventListener("pause", this.startTeardownTimeout.bind(this, 20 * 60));
					this.amp.addEventListener("ended", this.startTeardownTimeout.bind(this, 5 * 60));
					this.amp.addEventListener("error", this.startTeardownTimeout.bind(this, 5 * 60));
					this.amp.addEventListener("playing", this.stopTeardownTimeout.bind(this));
					this.amp.addEventListener("loadedmetadata", this.stopTeardownTimeout.bind(this));
					if (this.amp.ads != null) {
						this["amp"].ads.addEventListener("breakstart", this.dispatchEvent.bind(this, "ads"));
						this["amp"].ads.addEventListener("breakend", this.dispatchEvent.bind(this, "ads"));
						this["amp"].ads.addEventListener("started", this.dispatchEvent.bind(this, "ads"));
						this["amp"].ads.addEventListener("ended", this.dispatchEvent.bind(this, "ads"));
						this["amp"].ads.addEventListener("companion", this.dispatchEvent.bind(this, "ads"));
					}
					this.startTeardownTimeout(5 * 60);
				};

				ChromeCastReceiverProxy.prototype.logEvent = function(message, data) {
					if (!(message != null)) {
						message = data.type || "";
					} else if (!(data != null)) {
						data = message.data;
						message = data.type;
					}
					this.facade.logger.log("[CHROMECAST] ", message, data);
				};

				ChromeCastReceiverProxy.prototype.onSenderConnected = function(event) {
					this.logEvent("senderconnected", event);
					setTimeout(this.sendNotification.bind(this, Notifications.DISPATCH_EVENT, new Event("senderconnected", event)), 0);
				};

				ChromeCastReceiverProxy.prototype.onSenderDisconnected = function(event) {
					this.logEvent("sender disconnected", event);
					if (this.castReceiverManager.getSenders().length === 0 && event.reason === cast.receiver.system.DisconnectReason.REQUESTED_BY_SENDER) {
						this.teardown();
					}
					setTimeout(this.sendNotification.bind(this, Notifications.DISPATCH_EVENT, new Event("senderdisconnected", event)), 0);
				};

				ChromeCastReceiverProxy.prototype.onMessage = function(event) {
					var detail, ids, message, textTrackStyle, type;
					this.logEvent("message from sender", event);
					try {
						message = event.data || event.message;
						if (!(message != null)) {
							return;
						}
						type = message.type;
						detail = message.detail;
						if (typeof detail === "string") {
							detail = JSON.parse(detail);
						}
						if (!(detail != null)) {
							return;
						}
						switch (type) {
							case "captioning.visibilitychange":
								ids = [];
								if (detail.visibility === true) {
									ids.push(0);
								}
								this.chromecastPlayer.editTracksInfo({
									activeTrackIds: ids
								});
								break;
							case "captioning.settingschange":
								textTrackStyle = new cast.receiver.media.TextTrackStyle();
								textTrackStyle.foregroundColor = detail.fontColor;
								textTrackStyle.backgroundColor = detail.backgroundColor;
								textTrackStyle.fontScale = detail.size;
								textTrackStyle.windowColor = detail.windowColor;
								textTrackStyle.fontFamily = detail.fontFamily;
								textTrackStyle.edgeColor = detail.edgeColor;
								textTrackStyle.edgeType = detail.edgeType;
								this.chromecastPlayer.editTracksInfo({
									textTrackStyle: textTrackStyle
								});
								break;
							case "stats.visibilitychange":
								this["amp"].stats.setHidden(!detail.visibility);
						}
						this.sendNotification(Notifications.DISPATCH_EVENT, event);
					} catch (error) {
						this.error(error);
					}
				};

				ChromeCastReceiverProxy.prototype.onClose = function(event) {
					this.logEvent("message channel closed", event);
				};

				ChromeCastReceiverProxy.prototype.eventHandler = function(event) {
					var msg;
					msg = {
						type: event.type
					};
					if (event.detail != null) {
						msg.detail = event.detail;
					}
					this.send(msg);
				};

				ChromeCastReceiverProxy.prototype.dispatchEvent = function(target, event) {
					this.send({
						type: "dispatchevent",
						detail: {
							target: target,
							event: event
						}
					});
				};

				ChromeCastReceiverProxy.prototype.send = function(message) {
					this.castMessageBus.broadcast(message);
				};

				ChromeCastReceiverProxy.prototype.startTeardownTimeout = function(seconds) {
					this.stopTeardownTimeout();
					this.teardownTimeout = setTimeout(this.teardown.bind(this), seconds * 1000);
				};

				ChromeCastReceiverProxy.prototype.stopTeardownTimeout = function() {
					clearTimeout(this.teardownTimeout);
				};

				ChromeCastReceiverProxy.prototype.teardown = function() {
					window.close();
				};

				/**
				 * The ChromeCastFeedChangedCommand class.
				 *
				 * @constructor
				 * @private
				 * @extends {PluginCommand}
				 */
				function ChromeCastFeedChangedCommand() {
					ChromeCastFeedChangedCommand.__super__.constructor.call(this);
				}


				__extends(ChromeCastFeedChangedCommand, PluginCommand);


				/**
				 * Executes the command.
				 *
				 * @param {puremvc.Notification} notification
				 *    The notification.
				 *
				 * @override
				 */
				ChromeCastFeedChangedCommand.prototype.execute = function(notification) {
					this.config.setFeed(notification.getBody());
				};

				/**
				 * The ChromeCastSeekCommand class.
				 *
				 * @constructor
				 * @private
				 * @extends {PluginCommand}
				 */
				function ChromeCastSeekCommand() {
					ChromeCastSeekCommand.__super__.constructor.call(this);
				}


				__extends(ChromeCastSeekCommand, PluginCommand);


				/**
				 * Executes the command.
				 *
				 * @param {puremvc.Notification} notification
				 *    The notification.
				 *
				 * @override
				 */
				ChromeCastSeekCommand.prototype.execute = function(notification) {
					this.facade.logger.debug("ChromeCastSeekCommand");
					this.plugin.setCurrentTime(notification.getBody());
				};

				/**
				 * The ChromeCastButtonMediator class.
				 *
				 * @constructor
				 * @extends {PluginMediator}
				 * @param {Object} parent
				 * @private
				 */
				function ChromeCastButtonMediator() {
					ChromeCastButtonMediator.__super__.constructor.call(this);
				}


				__extends(ChromeCastButtonMediator, ButtonMediator);


				ChromeCastButtonMediator.prototype.componentName = "chromecast";

				ChromeCastButtonMediator.prototype.onclick = function(event) {
					event.stopImmediatePropagation();
					this.sendNotification(ChromeCastNotifications.LAUNCH);
					return false;
				};

				/**
				 * The ChromeCastTogglePlayPauseCommand class.
				 *
				 * @constructor
				 * @private
				 * @extends {PluginCommand}
				 */
				function ChromeCastTogglePlayPauseCommand() {
					ChromeCastTogglePlayPauseCommand.__super__.constructor.call(this);
				}


				__extends(ChromeCastTogglePlayPauseCommand, PluginCommand);


				/**
				 * Executes the command.
				 *
				 * @param {puremvc.Notification} notification
				 *    The notification.
				 *
				 * @override
				 */
				ChromeCastTogglePlayPauseCommand.prototype.execute = function(notification) {
					var appStateProxy;
					appStateProxy = this.facade.player.retrieveProxy(ApplicationStateProxy.NAME);
					switch (appStateProxy.getPlayState()) {
						case PlayState.ENDED:
							this.plugin.setCurrentTime(0);
							this.plugin.play();
							break;
						case PlayState.PAUSED:
						case PlayState.READY:
							this.plugin.play();
							break;
						case PlayState.PLAYING:
						case PlayState.WAITING:
							this.plugin.pause();
					}
				};

				/**
				 * The ChromeCastControlsMediator class.
				 *
				 * @constructor
				 * @extends {PluginMediator}
				 * @private
				 */
				function ChromeCastControlsMediator() {
					ChromeCastControlsMediator.__super__.constructor.call(this);
				}


				__extends(ChromeCastControlsMediator, ControlsMediator);


				ChromeCastControlsMediator.prototype.componentName = "chromecast-controls";

				ChromeCastControlsMediator.prototype.message = null;

				ChromeCastControlsMediator.prototype.messageContainer = null;

				ChromeCastControlsMediator.prototype.button = null;

				ChromeCastControlsMediator.prototype.captioningActive = false;

				/** @override
				 */
				ChromeCastControlsMediator.prototype.initializeNotifier = function(key) {
					ChromeCastControlsMediator.__super__.initializeNotifier.call(this, key);
					this.viewComponent.innerHTML = "";
					this.messageContainer = this.create("chromecast-message-container");
					this.message = this.createText("chromecast-message", this.localizationManager.getString("MSG_CHROMECAST_MESSAGE"), this.messageContainer);
					this.button = new ChromeCastButtonMediator();
				};

				/** @override
				 */
				ChromeCastControlsMediator.prototype.onRegister = function() {
					var button, fullscreen, _ref, _ref1;
					this.facade.registerMediator(this.button);
					ChromeCastControlsMediator.__super__.onRegister.call(this);
					fullscreen = new FullScreenMediator(this.controlBar);
					fullscreen.setDisabled(true);
					this.facade.registerMediator(fullscreen);
					this.sendNotification(Notifications.ADD_CONTROL, this.button.getViewComponent());
					if (!this.viewComponent.getElementsByClassName("akamai-caption akamai-button").length && ((_ref = this.facade.player.captioning) != null ? (_ref1 = _ref.config) != null ? _ref1.enabled : void 0 : void 0) === true) {
						button = new ButtonMediator(this.localizationManager.getString(LocalizationConstants.MSG_CC), this.viewComponent.getElementsByClassName("akamai-control-bar")[0], null, "caption", this.captionButtonClick.bind(this));
						this.facade.registerMediator(button);
						this.captionButton = button.getViewComponent();
						this.sendNotification(Notifications.ADD_CONTROL, this.captionButton);
						this.sendNotification(Notifications.ADD_CONTROL_STATE, "cc-enabled");
					}
				};

				ChromeCastControlsMediator.prototype.captionButtonClick = function() {
					var note;
					this.captioningActive = !this.captioningActive;
					try {
						this.facade.player.parent.chromecast.postMessage({
							type: "captioning.visibilitychange",
							detail: {
								visibility: this.captioningActive
							}
						});
					} catch (error) {
						this.facade.logger.error("[AMP Chromecast Captioning Error]", error);
					}
					note = this.captioningActive ? Notifications.ADD_APPLICATION_STATE : Notifications.REMOVE_APPLICATION_STATE;
					this.sendNotification(note, "cc-active");
				};

				/**
				 * The ChromeCastPlaybackTargetChangeCommand class.
				 *
				 * @constructor
				 * @private
				 * @extends {PluginCommand}
				 */
				function ChromeCastPlaybackTargetChangeCommand() {
					ChromeCastPlaybackTargetChangeCommand.__super__.constructor.call(this);
				}


				__extends(ChromeCastPlaybackTargetChangeCommand, PluginCommand);


				/**
				 * Executes the command.
				 *
				 * @param {puremvc.Notification} notification
				 *    The notification.
				 *
				 * @override
				 */
				ChromeCastPlaybackTargetChangeCommand.prototype.execute = function(notification) {
					var body, currentTime, duration, target;
					body = notification.getBody();
					target = body.target;
					if (target === "chromecast") {
						this.facade.player.pause();
					} else if (target === "amp") {
						currentTime = this.plugin.getCurrentTime();
						duration = this.facade.player.getDuration();
						if (currentTime !== 0) {
							if (currentTime !== duration) {
								this.seekedHandler = this.seeked.bind(this);
								this.facade.player.addEventListener("seeked", this.seekedHandler);
							}
							this.facade.player.setCurrentTime(currentTime);
						}
					}
				};

				ChromeCastPlaybackTargetChangeCommand.prototype.seeked = function(event) {
					this.facade.player.removeEventListener("seeked", this.seekedHandler);
					this.facade.player.play();
				};

				ChromeCastPlaybackTargetChangeCommand.prototype.seekedHandler = null;

				/**
				 * The ChromeCastPlugin class.
				 *
				 * @param {Module}  app     The parent module of this plugin.
				 * @constructor
				 * @private
				 * @extends {Plugin}
				 */
				function ChromeCastPlugin() {
					ChromeCastPlugin.__super__.constructor.call(this);
				}


				__extends(ChromeCastPlugin, Plugin);


				ChromeCastPlugin.prototype.moduleName = "chromecast";

				ChromeCastPlugin.prototype.isAvailable = function() {
					return this.isSender() || this.isReceiver();
				};

				/**
				 */
				ChromeCastPlugin.prototype.loadResources = function() {
					if (!this.isAvailable()) {
						this.resourcesLoaded();
						return;
					}
					ChromeCastPlugin.__super__.loadResources.call(this);
				};

				/** @override
				 */
				ChromeCastPlugin.prototype.onRegister = function() {
					if (!this.isAvailable()) {
						this.sendNotification(PluginNotifications.PLUGIN_REGISTERED, this);
					} else {
						ChromeCastPlugin.__super__.onRegister.call(this);
					}
				};

				/** @override
				 */
				ChromeCastPlugin.prototype.createModel = function() {
					this.proxy = this.isSender() ? new ChromeCastSenderProxy(this.config) : new ChromeCastReceiverProxy(this.config);
					this.registerProxy(this.proxy);
				};

				/** @override
				 */
				ChromeCastPlugin.prototype.createController = function() {
					if (this.isSender()) {
						this.registerCommand(Notifications.PLAYBACK_TARGET_CHANGE, ChromeCastPlaybackTargetChangeCommand);
						this.registerCommand(ChromeCastNotifications.LAUNCH, ChromeCastLaunchCommand);
						this.registerCommand(UserNotifications.TOGGLE_PLAY_PAUSE, ChromeCastTogglePlayPauseCommand);
						this.registerCommand(UserNotifications.SEEK, ChromeCastSeekCommand);
						this.registerCommand(CaptioningNotifications.VISIBILITY_CHANGE, ChromeCastCaptioningVisibilityChangeCommand);
						this.registerCommand(CaptioningNotifications.SETTINGS_CHANGE, ChromeCastCaptioningSettingsChangeCommand);
					} else if (this.isReceiver()) {
						this.registerCommand(Notifications.READY, ChromeCastReceiverReadyCommand);
						this.registerCommand(AdNotifications.BREAK_START, ChromeCastBreakStartCommand);
					}
				};

				/** @override
				 */
				ChromeCastPlugin.prototype.createView = function() {
					if (this.isSender()) {
						this.registerMediator(new ChromeCastHTMLSenderMediator());
					} else if (this.isReceiver()) {
						this.registerMediator(new ChromeCastReceiverMediator());
					}
				};

				ChromeCastPlugin.prototype.isSender = function() {
					return !this.isReceiver() && /Chrome/.test(navigator.userAgent);
				};

				ChromeCastPlugin.prototype.isReceiver = function() {
					return /CrKey/.test(navigator.userAgent);
				};

				/** @override
				 */
				ChromeCastPlugin.prototype.listNotificationInterests = function() {
					return [Notifications.READY, CaptioningNotifications.VISIBILITY_CHANGE, CaptioningNotifications.SETTINGS_CHANGE, AdNotifications.BREAK_START];
				};

				/**
				 */
				ChromeCastPlugin.prototype.listNotificationEvents = function() {
					return ChromeCastPlugin.__super__.listNotificationEvents.call(this).concat([ChromeCastNotifications.AVAILABILITY_CHANGE]);
				};

				/** @override
				 */
				ChromeCastPlugin.prototype.listNotificationPublications = function() {
					return ChromeCastPlugin.__super__.listNotificationPublications.apply(this, arguments).concat([Notifications.INITIALIZED, Notifications.ADD_CONTROL, Notifications.REMOVE_CONTROL, Notifications.ADD_CONTROL_STATE, Notifications.REMOVE_CONTROL_STATE, Notifications.PLAYBACK_TARGET_CHANGE, ChromeCastNotifications.AVAILABILITY_CHANGE, Notifications.MEDIA_CHANGE, Notifications.CHANGE_PLAY_STATE, Notifications.CHANGE_DURATION, Notifications.DISPLAY_TIME]);
				};

				/**
				 * @expose
				 */
				ChromeCastPlugin.prototype.play = function() {
					var _base;
					if (typeof (_base = this.proxy).play === "function") {
						_base.play();
					}
				};

				/**
				 * @expose
				 */
				ChromeCastPlugin.prototype.pause = function() {
					var _base;
					if (typeof (_base = this.proxy).pause === "function") {
						_base.pause();
					}
				};

				/**
				 * @param {Number}  value   The time in seconds to seek to.
				 * @expose
				 */
				ChromeCastPlugin.prototype.setCurrentTime = function(value) {
					this.proxy.setCurrentTime(value);
					return value;
				};

				/**
				 * Returns if The chromecast device's Availability
				 * @expose
				 */
				ChromeCastPlugin.prototype.isReceiverAvailable = function() {
					var _ref;
					return ((_ref = this.proxy) != null ? typeof _ref.isReceiverAvailable === "function" ? _ref.isReceiverAvailable() : void 0 : void 0) || false;
				};

				ChromeCastPlugin.prototype.getMedia = function() {
					return this.proxy.media;
				};

				ChromeCastPlugin.prototype.getSession = function() {
					return this.proxy.session;
				};

				ChromeCastPlugin.prototype.getMediaManager = function() {
					return this.proxy.mediaManager;
				};

				ChromeCastPlugin.prototype.getCastReceiverManager = function() {
					return this.proxy.castReceiverManager;
				};

				ChromeCastPlugin.prototype.getCastMessageBus = function() {
					return this.proxy.castMessageBuses[this.proxy.messageBus];
				};

				/**
				 * sends a message across the message bus.
				 *
				 * @param {Object} msg
				 * @expose
				 */
				ChromeCastPlugin.prototype.postMessage = function(msg) {
					this.proxy.send(msg);
				};


				AMP.registerPlugin("chromecast", "html", ChromeCastPlugin);

				/**
				 * The ChromeCastFlashPlugin class.
				 *
				 * @param {Module}  app     The parent module of this plugin.
				 * @param {Object}  config  The plugin's configuration object.
				 * @constructor
				 * @extends {ChromeCastPlugin}
				 * @private
				 */
				function ChromeCastFlashPlugin() {
					ChromeCastFlashPlugin.__super__.constructor.call(this);
				}


				__extends(ChromeCastFlashPlugin, ChromeCastPlugin);


				ChromeCastFlashPlugin.NAME = "ChromeCastFlashPlugin";

				/** @override
				 */
				ChromeCastFlashPlugin.prototype.createModel = function() {
					this.proxy = new ChromeCastSenderProxy(this.config);
					this.registerProxy(this.proxy);
				};

				/** @override
				 */
				ChromeCastFlashPlugin.prototype.createController = function() {
					this.registerCommand(Notifications.PLAYBACK_TARGET_CHANGE, ChromeCastPlaybackTargetChangeCommand);
					this.registerCommand(ChromeCastNotifications.LAUNCH, ChromeCastLaunchCommand);
					this.registerCommand(FeedNotifications.FEED_CHANGED, ChromeCastFeedChangedCommand);
					this.registerCommand(UserNotifications.TOGGLE_PLAY_PAUSE, ChromeCastTogglePlayPauseCommand);
					this.registerCommand(UserNotifications.SEEK, ChromeCastSeekCommand);
				};

				/** @override
				 */
				ChromeCastFlashPlugin.prototype.createView = function() {
					this.registerMediator(new ChromeCastSenderMediator());
				};

				/** @override
				 */
				ChromeCastFlashPlugin.prototype.listNotificationInterests = function() {
					return [FeedNotifications.FEED_CHANGED, Notifications.CHANGE_MEDIA];
				};

				/**
				 * @enum {string}
				 * @const
				 * @private
				 */

				var ChromeCastNotifications = {
					LAUNCH: "launch",
					AVAILABILITY_CHANGE: "availabilitychange"
				};

				/**
				 * @constructor
				 * @extends {PluginWrapper}
				 * @private
				 */
				function ChromeCastWrapper(player, init) {
					ChromeCastWrapper.__super__.constructor.call(this, player, init);
					this.plugin = new ChromeCastFlashPlugin();
					this.plugin.initialize(init, this.player);
					player.registerModule(this.plugin);
				}


				__extends(ChromeCastWrapper, PluginWrapper);


				ChromeCastWrapper.NAME = "ChromeCastWrapper";

				ChromeCastWrapper.prototype.buttonId = "chromecastBtn";

				ChromeCastWrapper.prototype.plugin = null;

				/** @override
				 */
				ChromeCastWrapper.prototype.createXML = function(xml) {
					var controls;
					if (this.hasControls(xml) === false) {
						return xml;
					}
					controls = this.getControls(xml);
					if (!(controls[this.buttonId] != null)) {
						this.createElement(xml, this.buttonId);
					}
					return xml;
				};

				/**
				 */
				ChromeCastWrapper.prototype.listNotificationInterests = function() {
					return ChromeCastWrapper.__super__.listNotificationInterests.call(this).concat([FlashNotifications.ELEMENT_EVENT, FlashNotifications.LOAD_STATE_READY, FlashNotifications.LOAD_STATE_LOADING, FlashNotifications.APPLICATION_STATE_CHANGE, ChromeCastNotifications.AVAILABILITY_CHANGE]);
				};

				/**
				 */
				ChromeCastWrapper.prototype.handleNotification = function(notification) {
					var body, isReceiverAvailable, name, _ref;
					ChromeCastWrapper.__super__.handleNotification.call(this, notification);
					name = notification.getName();
					body = notification.getBody();
					switch (name) {
						case FlashNotifications.ELEMENT_EVENT:
							if (body.type === "click" && body.element === this.buttonId) {
								this.plugin.sendNotification(ChromeCastNotifications.LAUNCH);
							}
							break;
						case ChromeCastNotifications.AVAILABILITY_CHANGE:
							if (((_ref = this.player.mediaElement) != null ? _ref.setPlayerProperty : void 0) != null) {
								this.player.mediaElement.setPlayerProperty(this.buttonId, {
									visible: body
								});
							}
							break;
						case FlashNotifications.APPLICATION_STATE_CHANGE:
						case FlashNotifications.LOAD_STATE_READY:
						case FlashNotifications.LOAD_STATE_LOADING:
							isReceiverAvailable = this.plugin.isReceiverAvailable();
							if (isReceiverAvailable) {
								this.player.mediaElement.setPlayerProperty(this.buttonId, {
									state: 1
								});
							}
							this.player.mediaElement.setPlayerProperty(this.buttonId, {
								visible: isReceiverAvailable
							});
					}
				};

				/**
				 * @expose
				 */
				ChromeCastWrapper.prototype.play = function() {
					this.plugin.play();
				};

				/**
				 * @expose
				 */
				ChromeCastWrapper.prototype.pause = function() {
					this.plugin.pause();
				};

				/**
				 * @param {Number}  value   The time in seconds to seek to.
				 * @expose
				 */
				ChromeCastWrapper.prototype.setCurrentTime = function(value) {
					this.plugin.setCurrentTime(value);
					return value;
				};

				ChromeCastWrapper.prototype.getMedia = function() {
					return this.plugin.getMedia();
				};

				ChromeCastWrapper.prototype.getSession = function() {
					return this.plugin.getSession();
				};

				ChromeCastWrapper.prototype.getMediaManager = function() {
					return this.plugin.getMediaManager();
				};

				ChromeCastWrapper.prototype.getCastReceiverManager = function() {
					return this.plugin.getCastReceiverManager();
				};

				ChromeCastWrapper.prototype.getCastMessageBus = function() {
					return this.plugin.getCastMessageBuses();
				};

				/**
				 * sends a message across the message bus.
				 *
				 * @param {Object} msg
				 * @expose
				 */
				ChromeCastWrapper.prototype.postMessage = function(msg) {
					this.plugin.postMessage(msg);
				};


				AMP.registerPlugin("chromecast", "flash", ChromeCastWrapper);

				/**
				 * @constructor
				 * @private
				 */
				function FreeWheelPlugin() {
					FreeWheelPlugin.__super__.constructor.call(this);
				}


				__extends(FreeWheelPlugin, AdPlugin);


				FreeWheelPlugin.prototype.moduleName = "freewheel";

				FreeWheelPlugin.prototype.featureName = "ads";

				/** @override
				 */
				FreeWheelPlugin.prototype.createProxy = function() {
					return new FreeWheelProxy(this.config);
				};

				/** @override
				 */
				FreeWheelPlugin.prototype.isFullscreenDevice = function() {
					return false;
				};


				AMP.registerPlugin("freewheel", "html", FreeWheelPlugin);
				AMP.registerPlugin("freewheel", "flash", FreeWheelWrapper);

				/**
				 * Create a ChromeCastShim.
				 *
				 * @param {?cast.receiver.CastReceiverManager.Config} config
				 * @param {Object.<string, string>} messageBuses
				 */
				function ChromeCastShim(config, messageBuses) {
					var key, value;
					if (!/CrKey/.test(navigator.userAgent) || !(typeof cast !== "undefined" && cast !== null)) {
						return;
					}
					ChromeCastShim.__super__.constructor.call(this);
					this.castReceiverManager = cast.receiver.CastReceiverManager.getInstance();
					this.castReceiverManager.onReady = this.dispatchEvent.bind(this, {
						type: "ready"
					});
					this.castReceiverManager.onSenderConnected = this.dispatchEvent.bind(this, {
						type: "senderconnected"
					});
					this.castReceiverManager.onSenderDisconnected = this.dispatchEvent.bind(this, {
						type: "senderdisconnected"
					});
					this.castReceiverManager.onShutdown = this.dispatchEvent.bind(this, {
						type: "shutdown"
					});
					this.castReceiverManager.onStandbyChanged = this.dispatchEvent.bind(this, {
						type: "standbychange"
					});
					this.castReceiverManager.onSystemVolumeChanged = this.dispatchEvent.bind(this, {
						type: "systemvolumechanged"
					});
					this.castReceiverManager.onVisibilityChanged = this.dispatchEvent.bind(this, {
						type: "visibilitychanged"
					});
					this.player = new ChromeCastPlayer(this);
					this.mediaManager = new cast.receiver.MediaManager(this.player);
					if (!(messageBuses != null)) {
						messageBuses = {};
					}
					messageBuses[ChromeCastConstants.CHANNEL_ID] = cast.receiver.CastMessageBus.MessageType.JSON;
					this.castMessageBuses = {};
					for (key in messageBuses) {
						value = messageBuses[key];
						this.castMessageBuses[key] = this.castReceiverManager.getCastMessageBus(key, value);
					}
					this.castReceiverManager.start(config);
					return;
				}


				__extends(ChromeCastShim, EventDispatcher);


				/**
				 * @type {cast.receiver.CastReceiverManager}
				 */
				ChromeCastShim.prototype.castReceiverManager = null;

				/**
				 * @type {cast.receiver.MediaManager}
				 */
				ChromeCastShim.prototype.mediaManager = null;

				/**
				 * @type {Object.<string, cast.receiver.CastMessageBus>}
				 */
				ChromeCastShim.prototype.castMessageBuses = null;

				/**
				 * @type {cast.receiver.media.Player}
				 */
				ChromeCastShim.prototype.player = null;

				ChromeCastShim.getInstance = function() {
					return this.instance;
				};

				ChromeCastShim.instance = new ChromeCastShim();

				/**
				 * The DASHPlugin class.
				 *
				 * @param {Module}  app     The parent module of this plugin.
				 * @constructor
				 * @private
				 * @extends {Plugin}
				 */
				function DASHPlugin() {
					DASHPlugin.__super__.constructor.call(this);
				}


				__extends(DASHPlugin, Plugin);


				DASHPlugin.prototype.moduleName = "dash";

				/** @override
				 */
				DASHPlugin.prototype.createModel = function() {
					this.registerProxy(new DASHProxy(this.config));
				};

				DASHPlugin.prototype.registered = function() {
					this.player.registerCommand(Notifications.CHANGE_DISPLAY_STATE, DASHChangeDisplayStateCommand);
					DASHPlugin.__super__.registered.call(this);
				};


				AMP.registerPlugin("dash", "html", DASHPlugin);

				/**
				 * The ControlPanelPlugin class.
				 *
				 * @param {Module}  app     The parent module of this plugin.
				 * @constructor
				 * @private
				 * @extends {Plugin}
				 */
				function ControlPlugin() {
					ControlPlugin.__super__.constructor.call(this);
				}


				__extends(ControlPlugin, Plugin);


				/** @override
				 */
				ControlPlugin.prototype.listNotificationPublications = function() {
					return ControlPlugin.__super__.listNotificationPublications.apply(this, arguments).concat([Notifications.ADD_CONTROL, Notifications.REMOVE_CONTROL, Notifications.ADD_CONTROL_STATE, Notifications.REMOVE_CONTROL_STATE]);
				};

				/**
				 * The PanelControlMediator class.
				 *
				 * @constructor
				 * @private
				 * @extends {ButtonMediator}
				 */
				function PanelControlMediator(componentName) {
					PanelControlMediator.__super__.constructor.call(this, null, null, null, componentName, onclick);
				}


				__extends(PanelControlMediator, ButtonMediator);


				PanelControlMediator.prototype.panel = null;

				PanelControlMediator.prototype.timeout = null;

				PanelControlMediator.prototype.closePanelDelayed = null;

				/**
				 * @override
				 */
				PanelControlMediator.prototype.onRegister = function() {
					this.closePanelDelayed = this.delayedClosePanel.bind(this);
					if (Utils.getDevice() === "desktop") {
						this.onmouseleave = this.closePanelDelayed;
						this.onmouseenter = this.openPanel;
						this.onclick = this.clickHandler;
					} else {
						this.onclick = this.togglePanel;
					}
					PanelControlMediator.__super__.onRegister.call(this);
					this.sendNotification(Notifications.ADD_CONTROL_STATE, "" + this.componentName + "-enabled");
					this.sendNotification(Notifications.ADD_CONTROL, this.viewComponent);
				};

				PanelControlMediator.prototype.openPanel = function() {
					clearTimeout(this.timeout);
					this.sendNotification(PanelNotifications.OPEN_PANEL, this.panel);
					this.panel.viewComponent.addEventListener("mouseleave", this.closePanelDelayed);
				};

				PanelControlMediator.prototype.closePanel = function() {
					if (Utils.isMouseOverElement(this.panel.viewComponent) || Utils.isMouseOverElement(this.viewComponent) || this.facade.player.retrieveProxy(ApplicationStateProxy.NAME).getIsUserActive()) {
						return;
					}
					this.panel.viewComponent.addEventListener("mouseleave", this.closePanelDelayed);
					this.sendNotification(PanelNotifications.CLOSE_PANEL, this.panel);
				};

				PanelControlMediator.prototype.delayedClosePanel = function() {
					this.timeout = setTimeout(this.closePanel.bind(this), 350);
				};

				PanelControlMediator.prototype.togglePanel = function() {
					this.sendNotification(PanelNotifications.TOGGLE_PANEL, this.panel);
				};

				PanelControlMediator.prototype.clickPanel = function() {};

				/**
				 * The PlayPauseMediator class.
				 *
				 * @constructor
				 * @private
				 * @extends {ButtonMediator}
				 */
				function PanelMediator(componentName) {
					PanelMediator.__super__.constructor.call(this, componentName, null, null, null);
				}


				__extends(PanelMediator, ComponentMediator);


				PanelMediator.prototype.componentType = "panel";

				PanelMediator.prototype.control = null;

				/**
				 * @override
				 */
				PanelMediator.prototype.onRegister = function() {
					PanelMediator.__super__.onRegister.call(this);
					this.sendNotification(PanelNotifications.ADD_PANEL, this);
				};

				/**
				 * The ControlProxy class.
				 *
				 * @constructor
				 * @private
				 * @extends {PluginProxy}
				 */
				function ControlProxy(config) {
					ControlProxy.__super__.constructor.call(this, config);
				}


				__extends(ControlProxy, PluginProxy);


				/** @static
				 */
				ControlProxy.NAME = ModuleProxy.NAME;

				ControlProxy.prototype.loaded = true;

				ControlProxy.prototype.controlName = null;

				/**
				 *
				 */
				ControlProxy.prototype.getControlName = function() {
					return this.controlName;
				};

				ControlProxy.prototype.setControlName = function(value) {
					return this.controlName = value;
				};

				/**
				 * The ControlPanelProxy class.
				 *
				 * @constructor
				 * @private
				 * @extends {PluginProxy}
				 */
				function ControlPanelProxy(config) {
					ControlPanelProxy.__super__.constructor.call(this, config);
				}


				__extends(ControlPanelProxy, ControlProxy);


				/** @static
				 */
				ControlPanelProxy.NAME = ModuleProxy.NAME;

				ControlPanelProxy.prototype.hidden = true;

				/**
				 *
				 */
				ControlPanelProxy.prototype.getHidden = function() {
					return this.hidden;
				};

				ControlPanelProxy.prototype.setHidden = function(value) {
					this.hidden = value;
					return value;
				};

				/**
				 * The VolumePanelProxy class.
				 *
				 * @constructor
				 * @private
				 * @extends {ControlPanelProxy}
				 */
				function VolumePanelProxy(config) {
					VolumePanelProxy.__super__.constructor.call(this, config);
				}


				__extends(VolumePanelProxy, ControlPanelProxy);


				/** @static
				 */
				VolumePanelProxy.NAME = ModuleProxy.NAME;

				VolumePanelProxy.prototype.controlName = "volume";

				VolumePanelProxy.prototype.defaults = {
					direction: "vertical"
				};

				VolumePanelProxy.prototype.getDirection = function() {
					return this.data.direction;
				};

				/**
				 */
				function VolumePanelWrapper(player, config) {
					if (config == null) {
						config = {};
					}
					VolumePanelWrapper.__super__.constructor.call(this, player, config);
				}


				__extends(VolumePanelWrapper, PluginWrapper);


				VolumePanelWrapper.NAME = "VolumePanelWrapper";


				AMP.registerPlugin("volumepanel", "flash", VolumePanelWrapper);

				function VolumePanelControlMediator(componentName) {
					VolumePanelControlMediator.__super__.constructor.call(this, componentName);
				}


				__extends(VolumePanelControlMediator, PanelControlMediator);


				VolumePanelControlMediator.prototype.clickHandler = function() {
					this.sendNotification(Notifications.TOGGLE_MUTED);
				};

				/**
				 * The VolumeMediator class.
				 *
				 * @constructor
				 * @private
				 * @extends {ModuleMediator}
				 * @param {Object} viewComponent
				 */
				function VolumeMediator(parent, direction) {
					VolumeMediator.__super__.constructor.call(this, parent, direction);
				}


				__extends(VolumeMediator, SliderMediator);


				VolumeMediator.prototype.componentName = "volume";

				/** sets the value
				 */
				VolumeMediator.prototype.setValue = function(percent) {
					VolumeMediator.__super__.setValue.call(this, percent);
					this.sendNotification(Notifications.CHANGE_VOLUME, percent);
					this.sendNotification(UserSettingsNotifications.UPDATE_SETTINGS, {
						volume: percent
					});
					return percent;
				};

				/**
				 * @override
				 */
				VolumeMediator.prototype.listNotificationInterests = function() {
					return [Notifications.VOLUME_CHANGE, Notifications.READY];
				};

				/**
				 * @override
				 */
				VolumeMediator.prototype.handleNotification = function(notification) {
					switch (notification.getName()) {
						case Notifications.READY:
							this.updateValue(this.facade.player.retrieveProxy(PlaybackProxy.NAME).getVolume());
							break;
						case Notifications.VOLUME_CHANGE:
							this.updateValue(notification.getBody());
					}
				};

				/**
				 * The ControlPanelMediator class.
				 *
				 * @constructor
				 * @private
				 * @extends {PluginMediator}
				 */
				function ControlPanelMediator() {
					ControlPanelMediator.__super__.constructor.call(this);
					this.controls = {};
				}


				__extends(ControlPanelMediator, PluginMediator);


				ControlPanelMediator.prototype.panel = null;

				ControlPanelMediator.prototype.control = null;

				ControlPanelMediator.prototype.separator = null;

				ControlPanelMediator.prototype.controls = null;

				ControlPanelMediator.prototype.labels = null;

				ControlPanelMediator.prototype.closed = true;

				ControlPanelMediator.prototype.panelClass = PanelMediator;

				ControlPanelMediator.prototype.controlClass = PanelControlMediator;

				/**
				 * @override
				 */
				ControlPanelMediator.prototype.onRegister = function() {
					this.panel = this.createPanel(this.componentName);
					this.control = this.createControl(this.componentName);
					this.separator = this.createSeparator(this.componentName);
					this.panel.control = this.control;
					this.control.panel = this.panel;
					if (this.labels == null) {
						this.labels = {};
					}
					this.createPanelControls(name);
				};

				ControlPanelMediator.prototype.createControl = function(name) {
					var control;
					control = new this.controlClass(name);
					this.facade.registerMediator(control);
					return control;
				};

				ControlPanelMediator.prototype.createPanel = function(name) {
					var panel;
					panel = new this.panelClass(name);
					this.facade.registerMediator(panel);
					return panel;
				};

				ControlPanelMediator.prototype.createSeparator = function(name) {
					return this.create(["separator", "icon"], this.panel);
				};

				ControlPanelMediator.prototype.createPanelControls = function(name) {
					var data, key, value, _ref;
					data = this.plugin.getConfigurationData();
					for (key in data) {
						value = data[key];
						if (value === true) {
							this.controls[key] = this.addPanelControl(new ButtonMediator(this.localizationManager.getString(this.labels[key]), null, null, key, (_ref = this.panelButtonClickHandler) != null ? typeof _ref.bind === "function" ? _ref.bind(this, key) : void 0 : void 0));
						}
					}
				};

				ControlPanelMediator.prototype.addPanelControl = function(control) {
					this.facade.registerMediator(control);
					this.panel.getViewComponent().appendChild(control.getViewComponent());
					return control;
				};

				/**
				 */
				ControlPanelMediator.prototype.panelButtonClickHandler = function() {
					this.sendNotification(PanelNotifications.CLOSE_PANEL, this.panel);
				};

				/**
				 * The VolumePanelMediator class.
				 *
				 * @constructor
				 * @private
				 * @extends {ControlPanelMediator}
				 */
				function VolumePanelMediator() {
					VolumePanelMediator.__super__.constructor.call(this);
				}


				__extends(VolumePanelMediator, ControlPanelMediator);


				VolumePanelMediator.prototype.componentName = "volume";

				VolumePanelMediator.prototype.slider = null;

				VolumePanelMediator.prototype.level = null;

				VolumePanelMediator.prototype.controlClass = VolumePanelControlMediator;

				/**
				 */
				VolumePanelMediator.prototype.onRegister = function() {
					VolumePanelMediator.__super__.onRegister.call(this);
					this.slider = new VolumeMediator(this.panel, this.plugin.getDirection());
					this.facade.registerMediator(this.slider);
				};

				VolumePanelMediator.prototype.updateVolumeButton = function(percent) {
					var level;
					level = Math.ceil(percent * 10);
					if (level === this.level) {
						return;
					}
					if (this.level != null) {
						this.sendNotification(Notifications.REMOVE_CONTROL_STATE, "volume-" + this.level);
					}
					this.level = level;
					this.sendNotification(Notifications.ADD_CONTROL_STATE, "volume-" + this.level);
				};

				/**
				 * @override
				 */
				VolumePanelMediator.prototype.listNotificationInterests = function() {
					return VolumePanelMediator.__super__.listNotificationInterests.apply(this, arguments).concat([Notifications.VOLUME_CHANGE]);
				};

				/**
				 * @override
				 */
				VolumePanelMediator.prototype.handleNotification = function(notification) {
					VolumePanelMediator.__super__.handleNotification.call(this, notification);
					switch (notification.getName()) {
						case Notifications.VOLUME_CHANGE:
							this.updateVolumeButton(notification.body);
					}
				};

				/**
				 * The ControlPanelPlugin class.
				 *
				 * @param {Module}  app     The parent module of this plugin.
				 * @constructor
				 * @private
				 * @extends {Plugin}
				 */
				function ControlPanelPlugin() {
					ControlPanelPlugin.__super__.constructor.call(this);
				}


				__extends(ControlPanelPlugin, ControlPlugin);


				/** @override
				 */
				ControlPanelPlugin.prototype.listNotificationPublications = function() {
					var key, value;
					return ControlPanelPlugin.__super__.listNotificationPublications.call(this).concat((function() {
						var _results;
						_results = [];
						for (key in PanelNotifications) {
							value = PanelNotifications[key];
							_results.push(value);
						}
						return _results;
					})());
				};

				/**
				 * The PlaylistMediator class.
				 *
				 * @constructor
				 * @private
				 * @extends {PluginMediator}
				 * @param {Object} viewComponent
				 */
				function PlaylistMediator(viewComponent) {
					PlaylistMediator.__super__.constructor.call(this, viewComponent);
				}


				__extends(PlaylistMediator, PluginMediator);


				/**
				 * Stats Mediator
				 *
				 * @static
				 * @type {string}
				 */
				PlaylistMediator.prototype.componentName = "playlist";

				PlaylistMediator.prototype.playlistButton = null;

				/**
				 * @override
				 */
				PlaylistMediator.prototype.onRegister = function() {
					var button;
					button = new ButtonMediator(null, this.viewComponent, null, "playlist", this.playlistOnClick.bind(this));
					this.facade.registerMediator(button);
					this.playlistButton = button.getViewComponent();
					this.sendNotification(Notifications.ADD_CONTROL, this.playlistButton);
					this.sendNotification(Notifications.ADD_CONTROL_STATE, "playlist-enabled");
					PlaylistMediator.__super__.onRegister.call(this);
				};

				PlaylistMediator.prototype.playlistOnClick = function(event) {
					this.facade.logger.debug('AMP Event: Playlist Clicked');
				};

				/**
				 * The VolumePanelPlugin class.
				 *
				 * @constructor
				 * @private
				 * @extends {Plugin}
				 */
				function VolumePanelPlugin() {
					VolumePanelPlugin.__super__.constructor.call(this);
				}


				__extends(VolumePanelPlugin, ControlPanelPlugin);


				VolumePanelPlugin.prototype.moduleName = "volumepanel";

				/**
				 */
				VolumePanelPlugin.prototype.isVolumeSettable = function() {
					var newVolume, oldVolume, settable, video;
					settable = false;
					video = this.player.getMediaElement();
					oldVolume = video.volume;
					newVolume = Math.random();
					video.volume = newVolume;
					if (video.volume === newVolume) {
						settable = true;
					}
					video.volume = oldVolume;
					return settable;
				};

				/** @override
				 */
				VolumePanelPlugin.prototype.createFramework = function() {
					if (!this.isVolumeSettable()) {
						return;
					} else {
						VolumePanelPlugin.__super__.createFramework.call(this);
					}
				};

				/** @override
				 */
				VolumePanelPlugin.prototype.createModel = function() {
					this.registerProxy(new VolumePanelProxy(this.config));
				};

				/** @override
				 */
				VolumePanelPlugin.prototype.createView = function() {
					if (!this.isVolumeSettable()) {
						return;
					}
					this.registerMediator(new VolumePanelMediator());
				};

				/** @override
				 */
				VolumePanelPlugin.prototype.listNotificationPublications = function() {
					return VolumePanelPlugin.__super__.listNotificationPublications.apply(this, arguments).concat([Notifications.CHANGE_VOLUME, Notifications.TOGGLE_MUTED, UserSettingsNotifications.UPDATE_SETTINGS]);
				};

				/** @override
				 */
				VolumePanelPlugin.prototype.listNotificationInterests = function() {
					return VolumePanelPlugin.__super__.listNotificationInterests.apply(this, arguments).concat([Notifications.VOLUME_CHANGE, Notifications.READY]);
				};


				AMP.registerPlugin("volumepanel", "html", VolumePanelPlugin);

				/**
				 */
				/** @constructor
				 */
				function OutbrainProxy(config) {
					OutbrainProxy.__super__.constructor.call(this, config);
				}


				__extends(OutbrainProxy, RecommendationsProxy);


				/** @static
				 */
				OutbrainProxy.NAME = ModuleProxy.NAME;

				/** @override
				 */
				OutbrainProxy.prototype.data = {
					url: null,
					target: null,
					apiKey: null,
					jsWidgetId: null
				};

				/** @override
				 */
				OutbrainProxy.prototype.createRecommendations = function(feed) {
					var item, rec, recs, _i, _len, _ref;
					recs = [];
					_ref = feed.documents.doc;
					for (_i = 0, _len = _ref.length; _i < _len; _i++) {
						item = _ref[_i];
						rec = new RecommendationVO(item.video.id, item.url, item.video.title, item.video.title, item.thumbnail.url, 0, null, this.getTarget(), item);
						recs.push(rec);
					}
					return recs;
				};

				/** @override
				 */
				OutbrainProxy.prototype.getURL = function() {
					var format, href, key, url, widgetJSId;
					format = "json";
					widgetJSId = encodeURIComponent(this.data.jsWidgetId);
					key = encodeURIComponent(this.data.apiKey);
					href = encodeURIComponent(document.location.href);
					url = this.data.url + "?format=" + format + "&widgetJSId=" + widgetJSId + "&settings=false&url=" + href + "&idx=0&key=" + key + "&rand=" + Date.now() + "&recs=true";
					return url;
				};

				/**
				 * @constructor
				 * @private
				 * @extends {RecommendationsWrapper}
				 */
				function OutbrainWrapper(player, config) {
					if (config == null) {
						config = {};
					}
					OutbrainWrapper.__super__.constructor.call(this, player, config);
				}


				__extends(OutbrainWrapper, RecommendationsWrapper);


				OutbrainWrapper.NAME = "OutbrainWrapper";

				/**
				 */
				OutbrainWrapper.prototype.createFlashVars = function(flashvars) {
					OutbrainWrapper.__super__.createFlashVars.call(this, flashvars);
					flashvars.recommendations_partner = "outbrain";
					return flashvars;
				};

				/**
				 */
				OutbrainWrapper.prototype.createXML = function(xml) {
					var application, prop, props, recommendations, vendor, _i, _len;
					application = xml.firstChild;
					recommendations = xml.getElementsByTagName("recommendations")[0];
					if (!(recommendations != null)) {
						recommendations = xml.createElement("recommendations");
						application.appendChild(recommendations);
					}
					vendor = xml.createElement("vendor");
					vendor.setAttribute("id", "outbrain");
					recommendations.appendChild(vendor);
					props = [
						{
							value: this.config.url,
							key: "OUTBRAIN_BASE_URL"
						}, {
							value: this.config.apiKey,
							key: "OUTBRAIN_API_KEY"
						}, {
							value: this.config.jsWidgetId,
							key: "OUTBRAIN_WIDGET_JS_ID"
						}, {
							value: this.config.mode,
							key: "OUTBRAIN_MODE"
						}, {
							value: this.config.playerSrcId,
							key: "OUTBRAIN_PLAYER_SRC_ID"
						}, {
							value: "internal",
							key: "OUTBRAIN_VIEW_PROVIDER"
						}, {
							value: this.config.videoData,
							key: "videoData"
						}
					];
					for (_i = 0, _len = props.length; _i < _len; _i++) {
						prop = props[_i];
						if (prop.value != null) {
							this.createProperty(xml, prop.key, prop.value, vendor);
						}
					}
					return xml;
				};

				/**
				 * The PlaylistPlugin class.
				 *
				 * @param {Module}  app     The parent module of this plugin.
				 * @constructor
				 * @private
				 * @extends {Plugin}
				 */
				function PlaylistPlugin() {
					PlaylistPlugin.__super__.constructor.call(this);
				}


				__extends(PlaylistPlugin, Plugin);


				PlaylistPlugin.prototype.moduleName = "playlist";

				/** @override
				 */
				PlaylistPlugin.prototype.createView = function() {
					this.registerMediator(new PlaylistMediator());
				};

				/** @override
				 */
				PlaylistPlugin.prototype.listNotificationPublications = function() {
					return PlaylistPlugin.__super__.listNotificationPublications.call(this).concat([Notifications.ADD_CONTROL, Notifications.REMOVE_CONTROL, Notifications.ADD_CONTROL_STATE, Notifications.REMOVE_CONTROL_STATE]);
				};


				AMP.registerPlugin("playlist", "html", PlaylistPlugin);

				function AdChoicesWrapper() {
					return AdChoicesWrapper.__super__.constructor.apply(this, arguments);
				}


				__extends(AdChoicesWrapper, PluginWrapper);


				AdChoicesWrapper.NAME = "AdChoicesWrapper";

				/** @override
				 */
				AdChoicesWrapper.prototype.createXML = function(xml) {
					var element, options, view;
					view = xml.getElementsByTagName("view")[0];
					options = xml.createElement("element");
					options.setAttribute("id", "adOptions");
					view.appendChild(options);
					element = xml.createElement("element");
					element.setAttribute("id", "adChoices");
					element.setAttribute("target", this.config.target);
					options.appendChild(element);
					element = xml.createElement("element");
					element.setAttribute("id", "adCountdown");
					options.appendChild(element);
					return xml;
				};

				/**
				 * The AdChoicesMediator class.
				 *
				 * @constructor
				 * @extends {ComponentMediator}
				 * @private
				 */
				function AdChoicesMediator() {
					AdChoicesMediator.__super__.constructor.call(this);
				}


				__extends(AdChoicesMediator, ComponentMediator);


				AdChoicesMediator.prototype.componentName = "ad-choices";

				AdChoicesMediator.prototype.icon = null;

				AdChoicesMediator.prototype.text = null;

				AdChoicesMediator.prototype.container = null;

				/**
				 * @override
				 */
				AdChoicesMediator.prototype.onRegister = function() {
					var data;
					data = this.facade.retrieveProxy(ModuleProxy.NAME);
					this.container = this.create("ad-choices-link", this, "a");
					this.container.target = "_blank";
					this.container.href = data.getTarget();
					this.text = this.createText("ad-choices-text", "AdChoices", this.container);
					this.icon = this.create("ad-choices-icon", this.container);
					AdChoicesMediator.__super__.onRegister.call(this);
				};

				/**
				 * @override
				 */
				AdChoicesMediator.prototype.listNotificationInterests = function() {
					return [AdNotifications.AD_CONTAINER_CREATED];
				};

				/**
				 * @override
				 */
				AdChoicesMediator.prototype.handleNotification = function(notification) {
					var container;
					switch (notification.getName()) {
						case AdNotifications.AD_CONTAINER_CREATED:
							container = notification.getBody();
							if (container != null) {
								container.appendChild(this.viewComponent);
							}
					}
				};

				/**
				 *
				 */
				/** @constructor
				 */
				function AdChoicesProxy(config) {
					AdChoicesProxy.__super__.constructor.call(this, config);
				}


				__extends(AdChoicesProxy, ModuleProxy);


				/** @static
				 */
				AdChoicesProxy.NAME = ModuleProxy.NAME;

				AdChoicesProxy.prototype.defaults = {
					target: null
				};

				/**
				 *
				 */
				AdChoicesProxy.prototype.getTarget = function() {
					return this.data.target;
				};

				AdChoicesProxy.prototype.setTarget = function(value) {
					return this.data.target = value;
				};

				/**
				 * The OutbrainPlugin class.
				 *
				 * @param {Module}  app     The parent module of this plugin.
				 * @constructor
				 * @private
				 * @extends {RecommendationsPlugin}
				 */
				function OutbrainPlugin() {
					OutbrainPlugin.__super__.constructor.call(this);
				}


				__extends(OutbrainPlugin, RecommendationsPlugin);


				OutbrainPlugin.prototype.moduleName = "outbrain";

				/** @override
				 */
				OutbrainPlugin.prototype.createModel = function() {
					OutbrainPlugin.__super__.createModel.call(this);
					this.registerProxy(new OutbrainProxy(this.config));
				};


				AMP.registerPlugin("outbrain", "html", OutbrainPlugin);
				AMP.registerPlugin("outbrain", "flash", OutbrainWrapper);

				/**
				 * The AdChoicesPlugin class.
				 *
				 * @param {Module}  app     The parent module of this plugin.
				 * @constructor
				 * @private
				 * @extends {Plugin}
				 */
				function AdChoicesPlugin() {
					AdChoicesPlugin.__super__.constructor.call(this);
				}


				__extends(AdChoicesPlugin, Plugin);


				AdChoicesPlugin.prototype.moduleName = "adchoices";

				/** @override
				 */
				AdChoicesPlugin.prototype.createModel = function() {
					this.registerProxy(new AdChoicesProxy(this.config));
				};

				/** @override
				 */
				AdChoicesPlugin.prototype.createView = function() {
					this.registerMediator(new AdChoicesMediator());
				};

				/**
				 * @override
				 */
				AdChoicesPlugin.prototype.listNotificationInterests = function() {
					return [AdNotifications.AD_CONTAINER_CREATED];
				};


				AMP.registerPlugin("adchoices", "html", AdChoicesPlugin);
				AMP.registerPlugin("adchoices", "flash", AdChoicesWrapper);


				global["akamai"] = {
					"amp": {
						"AMP": AMP,
						"utils": {
							"Utils": Utils,
							"QueryString": QueryString,
							"Logger": Logger
						}
					}
				};
				/* End JS Lib
				 */
				window["AKAMAI_MEDIA_PLAYER"].saveSDK(version, global);
			}
			window.AKAMAI_MEDIA_PLAYER.setVersion(version);
		})();

		return akamai.amp.AMP;
	}
);
