import $            from 'jquery';
import utils		from 'utils/util';
import infosite		from 'infosite-core/infosite-core';

infosite.init();

// CSS based on the config
if(infositeConfig.responsive){
	require('../infositeR/css/responsive.css');
} else if(util.isMobile()){
	require('../infositeR/css/mobile.css');
} else {
	require('../infositeR/css/desktop.css');
}

// Gift Manager script (gm_ba2.js);
if(infositeConfig.giftmanager){
	require('../infositeR/js/gift-manager-v2.js');
}


console.log("infosite and gm");