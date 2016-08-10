import $            from 'jquery';
import Utils		from './utils/util';
import infosite		from 'infosite-core/infosite-core';

infosite.init(); // code from infosite-core module 

// infositeConfig is object from infosite-config file for configuration of features and modules

// CSS based on the config

let cssUrl;
if(infositeConfig.style.responsive){
	cssUrl = infositeConfig.style.cssUrl.responsive;
} else {
	if(Utils.isMobile()){
		cssUrl = infositeConfig.style.cssUrl.mobile;
	} else {
		cssUrl = infositeConfig.style.cssUrl.desktop;
	}
}
$('#infosite-main').attr('href', cssUrl); // getting main CSS beased on config 

// Gift Manager script (gm_ba2.js);
if(infositeConfig.features.giftmanager){
	require('../infositeR/js/gift-manager-v2.js');
}

console.log("infosite and gm");
