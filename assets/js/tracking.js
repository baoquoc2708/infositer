/* Created 10/19/15 by MN - AP */
// DEPENDENCIES: core.js(Brand Advance 2.0), jQuery, Crypto(MD5).
// This library is used on Brand Advance 2.0

/*=== Brand Advance Tracking Object: ===*/
module.exports = function () {
    brandAdvance2.tracking = {

    /*=== Settings object for tracking: ===*/
        settings: {
            type: 'tracking',
            omnitureEnable: true,
            vptrackEnable: true,
            vpUrl: window.location.href.split("?")[0].split("#")[0].replace(/\/$/, ''), //default vpTrack URL points to window location
            omniPagenameDefault: window.location.href.split("://")[1].split("?")[0].split("#")[0].replace('www.', ''),
            pamProductName: 'brandadvance2',
            pamHashArray: [],
            iOsDropOffFlag: false,
            appRequestCSD: false,
            appDropOff: false,
            sfNumObj: {}
        },

    /*=== Custom Listeners for omni tracking: ===*/
        startListeners: function() {
            var self = this;
            $(document).on("TrackBind", function(event, param) {
                var activeFunc = eval('self.' + param[0]);
                param.shift();
                activeFunc.apply(self, param);
            });
            $(document).on("PageNamePAM", function(event, param) {
                s_md.pageName = document.domain.replace('wp.', '').replace(/www\.(.+\.com)/, '$1') + '/' + self.settings.pamProductName + '/' + self.settings.ippObj.sfNum + '/' + window.CryptoJS.MD5(self.settings.ippObj.sfNum + '_' + param) + '/';
                self.settings.omniPagenameDefault = document.domain.replace('wp.', '').replace(/www\.(.+\.com)/, '$1') + '/' + self.settings.pamProductName + '/' + self.settings.ippObj.sfNum + '/' + window.CryptoJS.MD5(self.settings.ippObj.sfNum + '_' + param) + '/';
            });
        },

    /*=== Function to call once to initialize the ba2Tracking framework.
     * Can be done at the top or bottom of the page.
     * Calling this multiple times will have no ill effects. ===*/
        init: function(){

            var self = this;

            /*=== Function that starts listeners for the tracking ===*/
                self.startListeners();

            /*=== Function for getting settings ===*/
                self.sfValidation();

            /*=== Firing the hash table function ===*/
                self.createHashTable();

            /*=== Firing the omni call on program load ===*/
                window.addEventListener('load', function(){
                    self.trackScn(0, -1);

                    /* If the Roadblock is active then we track it */
                    if($('#isi').hasClass('is-expanded')){
                        var link_type = 'SCENE-0_ROADBLOCK',
                            module_name = 'N/A',
                            //version = self.settings.sfNumObj.tracking.version,
                            sfNum = self.settings.sfNumObj.tracking.sfNum,
                            identifier = sfNum + '_' + link_type,
                            hashValue = window.CryptoJS.MD5(identifier),
                            domain = document.domain,
                            pName = domain + '/' + self.settings.pamProductName + '/' + sfNum + '/' + hashValue + '/';
                        self.omniPageLink(module_name, pName);
                    }
                });

            /*=== Firing the omni call on program close ===*/
                $(window).on('pagehide beforeunload', function(event) {
                    var module_name = 'vsp-close_bc',
                       // version = self.settings.sfNumObj.tracking.version,
                        sfNum = self.settings.sfNumObj.tracking.sfNum,
                        domain = document.domain,
                        identifier = sfNum  + '-scene-0';
                        
                    hashValue = window.CryptoJS.MD5(identifier);
                    pName = domain + '/' + self.settings.pamProductName + '/' + sfNum + '/' + hashValue + '/';
                    self.omniPageLink(module_name, pName);
                });

            /*=== Creating HashTable based on the parameter "#getHash" ===*/
                if(window.location.hash === '#getHash') {
                    self.getHashTable();
                }
            return this;
        },

    /*=== This function gets the SF number from the main JSP ===*/
        sfValidation: function(){
            if($('meta[data-tracking]').length > 0){
                this.settings.sfNumObj = $('meta[data-tracking]').data();
            } else {
                console.log('The SF number is missing');
            }
        },

    /*=== This function updates pamHashArray for Hash Table ===*/
        createHashTable: function(){
            var self = this, extLinkCount = 0, intLinkCount = 0, scnNo = "",
                expandCount = 0, collapseCount = 0, aExpandCount = 0, asset_name = "",
                aCollapseCount = 0, module_name = "", domain = document.domain,
                version = self.settings.sfNumObj.tracking.version,hash_value = "",
                sfNum = self.settings.sfNumObj.tracking.sfNum, actionID = "",
                specificPercentArray = [25, 50, 75], link_text = '', identifier = '', 
                hashValue = '', hashIdentifier = '';

            /* We generate the parameters for the scene tracking */
            for(var index=0;index<=$('.scene').length;index++){
                scnNo = "scene-"+(index);
                asset_name = sfNum +'-'+ scnNo;
                hash_value = window.CryptoJS.MD5(asset_name);

                self.getHashValues(asset_name, hash_value, "N/A", "N/A");
            }

            /* The close hash would be generated based on Scene 0, the default hash */
            link_text = 'Close';
            module_name = 'vsp-close_bc';
            identifier = sfNum  + '-scene-0';
            hashValue = window.CryptoJS.MD5(identifier);
            self.getHashValues(identifier, hashValue, module_name, link_text);

            /* The video hashes includes start, pause, completion and 25, 50 and 75% of the video viewed*/
            $('body').find('.video-scene').each(function(index, el) {
              
                scnNo = 'scene-' + $(this).children("div").attr("data-scene");
                asset_name = sfNum +'-'+ scnNo;
                hash_value = window.CryptoJS.MD5(asset_name);

                for (var y = 0; y < specificPercentArray.length; y++) {
                    self.getHashValues(asset_name, hash_value, 'vidsvp-video' + specificPercentArray[y], 'N/A');
                }

                self.getHashValues(asset_name, hash_value, 'vidsvp-video100', 'N/A');
                self.getHashValues(asset_name, hash_value, 'vidsvp-videostart', 'N/A');
                self.getHashValues(asset_name, hash_value, 'vidsvp-videopause', 'N/A');
            });

            /* The Roadblock hash will be generated based on Scene 0, the default hashe */
            module_name = 'scene-0_ROADBLOCK';
            identifier = sfNum + '_' + module_name;
            hashValue = window.CryptoJS.MD5(identifier);
            self.getHashValues(identifier, hashValue, module_name,'N/A');

            /* We are tracking all those elements that have been set to be tracked, i.e.
               with the data attribute "idTracking" */
            $('body').find('[data-idTracking]').each(function(index, el) {
                /*If the element is expandable then we track it with a different module name */
                if($(this).hasClass('js-expandable-button')){
                    link_text = 'Expand';
                    module_name = 'vsp-expnd';
                    actionID = $(this).data('idtracking');
                    module_name = module_name + '_' + actionID;
                    scnNo = $(this).data('scene');
                    identifier = sfNum + '-' + scnNo + '_REFERENCES';
                    hashIdentifier = sfNum + '-' + 'scene-' + scnNo;
                    hashValue = window.CryptoJS.MD5(hashIdentifier);

                    self.getHashValues(identifier, hashValue, module_name, link_text);
                    
                    link_text = 'Collapse';
                    module_name = 'vsp-collpse_' + actionID;

                    self.getHashValues(identifier, hashValue, module_name, link_text);

                    /* We append the tracking for on click events to all the expandable elements */
                    $(this).on('click', function() {
                        var that = this;
                        setTimeout(function(){
                            link_type = '';
                            module_name = '';
                            actionID = $(that).data('idtracking');
                            if($(that).parent().hasClass('is-expanded')){
                                module_name = 'vsp-expnd_' + actionID;
                            } else {
                                module_name = 'vsp-collpse_' + actionID;
                            }

                            scnNo = brandAdvance2.settings.cur_scene;
                            identifier = sfNum + '-' + scnNo + '_REFERENCES';
                            hashIdentifier = sfNum + '-' + 'scene-' + scnNo;
                            hashValue = window.CryptoJS.MD5(hashIdentifier);
                            hashValue = self.hashOverride(identifier,module_name, hashValue);
                            pName = domain + '/' + self.settings.pamProductName + '/' + sfNum + '/' + hashValue + '/';
                            self.omniPageLink(module_name, pName);
                        }, 250);
                    });
                } else if ($(this).hasClass('isi-header')){ //We track the ISI expandable element separetely.
                    link_text = 'Expand ISI';
                    module_name = 'vsp-expnd_ISI';
                    identifier = sfNum + '_ISI';
                    hashValue = window.CryptoJS.MD5(identifier);
                    self.getHashValues(identifier, hashValue, module_name, link_text);

                    link_text = 'Collapse ISI';
                    module_name = 'vsp-collpse_ISI';
                    self.getHashValues(identifier, hashValue, module_name, link_text);

                    $('.isi-header').on('click touchmove touchstart', function() {
                        setTimeout(function(){
                            link_type = '';
                            module_name = '';
                            if($('.isi').hasClass('is-expanded')){
                                module_name = 'vsp-expnd_ISI';
                            } else {
                                module_name = 'vsp-collpse_ISI';
                            }
                            
                            hashValue = self.hashOverride(identifier, module_name,hashValue);
                            pName = domain + '/' + self.settings.pamProductName + '/' + sfNum + '/' + hashValue + '/';
                            self.omniPageLink(module_name, pName);
                        }, 250);
                    });
                } else if($(this).prop('tagName') === 'A'){ //We add tracking to all links
                    if($(this).hasClass('js-expandable-button')){ //If the element is expandable then we skip it
                        return;
                    }
                    var identifier = "",  hashValue ="", pName = "",
                        sCount = 0, linkType = "",link_type = "",
                        link_text = this.text, module_name = "", url_text = "",
                        url = this.href;

                    linkType = self.linkType(url);
                    link_type = linkType[0];
                    module_name = linkType[1];
                    actionID = $(this).data('idtracking');

                    /* We skip all the jump links and we track all the internal and external links */
                    if(url.indexOf(window.location.pathname) === -1){
                        if(link_type === 'EXTLINK_'){
                            module_name = module_name + '_' + actionID;
                        } else if(link_type === 'INTLINK_'){
                            module_name = module_name + '_' + actionID;
                        }

                        identifier = sfNum + '-scene-0';
                        hashValue = window.CryptoJS.MD5(identifier);
                        if(this.href === "http://www.medscape.com/"){
                            module_name = "vsp-close_rtm";
                        }
                        self.getHashValues(identifier, hashValue, module_name, link_text);
                        hashValue = self.hashOverride(identifier,module_name,hashValue);
                        pName = domain + '/' + self.settings.pamProductName + '/' + sfNum + '/' + hashValue + '/';

                        $(this).on('click', function() {
                            self.omniPageLink(module_name, pName);
                        });
                    }
                }
            });
            $('[data-animation]').each(function(index, el) {
               
                var identifier = sfNum + '-scene-' +  $(el).data('animation'),
                    hashValue = window.CryptoJS.MD5(identifier),
                    module_name = "vsp-anim";
                self.getHashValues(identifier, hashValue, module_name, 'N/A');
            });
        },

    /*=== This function tracks all scenes on scroll. It's used on core.js ===*/
        trackScn: function (prev, indexy){
            var self = this, scnNo = "", scnCount = (prev+indexy+1),
                //version = self.settings.sfNumObj.tracking.version,
                sfNum = self.settings.sfNumObj.tracking.sfNum, module_name = "",
                hashValue ="", pName = "", domain = document.domain, identifier = "N/A";

            scnNo = "scene-"+ (prev+indexy+1);
            identifier = sfNum +'-'+ scnNo;
            hashValue = window.CryptoJS.MD5(identifier);
            hashValue = self.hashOverride(identifier,module_name,hashValue);
            pName = domain + '/' + self.settings.pamProductName + '/' +
                sfNum + '/' + hashValue + '/';
            
            self.omniPageView(scnCount, pName);
        },

    /*=== This functions checks if the link is internal or external ===*/
        linkType: function(url){
            var medscape = "medscape",
                link = url.indexOf(medscape),
                identifier_link = "", module_name = "";

                if(url.charAt(0) !== '#'){
                    if (link > -1){
                        identifier_link = "INTLINK_";
                        module_name = "vsp-intlink";
                    }
                    else{
                        identifier_link="EXTLINK_";
                        module_name = "vsp-extlink";
                    }
                }
            return [identifier_link, module_name];
        },

    /*=== Omniture Page View function ===*/
        omniPageView: function(pCount, pName) {
            try {
                if (this.settings.omnitureEnable) {
                    if (typeof pName == 'object') {
                        pName = undefined;
                    }
                    if (typeof wmdPageview != 'undefined') {
                        if (typeof pName != 'undefined') {
                            wmdPageview(pName, pCount);
                        } else {
                            wmdPageview("", pCount);
                        }
                        if (typeof pName != 'undefined') {
                            s_md.pageName = this.settings.omniPagenameDefault;
                        }
                    }
                }
            } catch (err) {
                console.log(err);
            }
        },

    /*=== Omniture Ad Hoc tracking, for External-Domain destinations ===*/
        omniPageLink: function(sLink, pName) {
            try {
                if (this.settings.omnitureEnable) {
                    if (typeof pName == 'object') {
                        pName = undefined;
                    }
                    if (typeof wmdPageLink != 'undefined') {
                        if (typeof pName != 'undefined') {
                            s_md.pageName = pName;
                        }
                        wmdPageLink(sLink);
                        if (typeof pName != 'undefined') {
                            s_md.pageName = this.settings.omniPagenameDefault;
                        }
                    }
                }
            } catch (err) {
                console.log(err);
            }
        },

    /*=== This function overrides the default hash  ===*/
        hashOverride: function(identifier,module_name,hashValue){
            if($('[data-hash]').length>0){
                var dataHash = $('[data-hash]').data('hash');
                    
                if (identifier in dataHash){
                    hashValue = dataHash[identifier];
                } else if(module_name in dataHash){
                    hashValue = dataHash[module_name];
                }
            }
            return hashValue;
        },

    /*=== This function creates the Hash table entries  ===*/
        getHashValues: function(identifier,hashValue,module_name,link_text){
            var self = this;
            
            hashValue = self.hashOverride(identifier,module_name,hashValue);

            if ($.inArray('<tr><td>' + identifier +'</td><td>' + hashValue + '</td><td>'+ module_name + '</td><td>' + link_text + '</td></tr>', self.settings.pamHashArray) == -1) {
                self.settings.pamHashArray.push('<tr><td>' + identifier +'</td><td>' + hashValue + '</td><td>'+ module_name + '</td><td>' + link_text + '</td></tr>');
            }
        },

    /*=== This function creates the Hash table ===*/
        getHashTable: function() {
            try {
                var self = this;
                var hashWindow = window.open();
                hashWindow.document.write('<table cellpadding="3" border="1" cellspacing="3">');
                hashWindow.document.write('<tr><th>ASSET</th><th>HASH</th><th>MODULE NAME</th><th>LINK TEXT</th></tr>');

                $(this.settings.pamHashArray).each(function() {
                    hashWindow.document.write(this);
                });

                hashWindow.document.write('</table>');

                hashWindow.document.close();

            } catch (err) {
                console.log(err);
            }
        }
    
    };
    return brandAdvance2.tracking;
};

/*===== End Functions ======*/

/*========== End OF Scope For Brand Advance 2.0 ==========*/