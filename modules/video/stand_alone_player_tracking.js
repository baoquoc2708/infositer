import md5             from 'md5';


const SATracking = function() {
    const omniPagenameDefault = window.location.href.split('://')[1].split('?')[0].split('#')[0].replace('www.', ''),
               pamProductName = '',
               omnitureEnable = true;

    let sfNumObj = {};

    if($('meta[data-ipp]').length > 0) {
      sfNumObj = $('meta[data-ipp]').data();
    }

    // Function to Send Track, or Bind to Elements
    // Omniture Ad Hoc tracking, for Internal or External-Domain destinations
    this.omni = (sLink, pName, obj) => {
      if (typeof pName === 'object') {
        obj = pName;
        pName = undefined;
      }
      if (omnitureEnable) {
        if (typeof obj !== 'undefined' && typeof obj === 'object') {
          if (typeof obj.href !== 'undefined') { // if referring element link points to external domain, fire external Omniture function
            if ((obj.href.match(/:\/\//) !== null && obj.href.match(/:\/\/[^\/]+\//)[0].split('/')[2] !== document.domain) || $.trim(obj.href) === window.location.href.split('#')[0] + '#') {
              this.omniPageLink(sLink, pName);
            } else { // else fire internal Omniture function
              this.omniTrack(sLink, pName);
            }
          } else if (typeof obj.action !== 'undefined') { // if referring element form action points to external domain, fire external Omniture function
            if ((obj.action.match(/:\/\//) !== null && obj.action.match(/:\/\/[^\/]+\//)[0].split('/')[2] !== document.domain) || $.trim(obj.action) === window.location.href.split('#')[0] + '#') {
              this.omniPageLink(sLink, pName);
            } else { // else fire internal Omniture function
              this.omniTrack(sLink, pName);
            }
          } else {
            this.omniPageLink(sLink, pName);
          }
        } else {
          this.omniPageLink(sLink, pName);
        }
      }
    };

    this.omniTrack = function(sLink, pName) { // Omniture Ad Hoc tracking, for In-Domain destinations
      if (omnitureEnable) {
        if (typeof pName === 'object') {
          pName = undefined;
        }
        if (typeof wmdTrack !== 'undefined') {
          if (typeof pName !== 'undefined') {
            s_md.pageName = pName;
          }
          wmdTrack(sLink);
          if (typeof pName !== 'undefined') {
            s_md.pageName = omniPagenameDefault;
          }
        }
      }
    };

    this.omniPageLink = function(sLink, pName) { // Omniture Ad Hoc tracking, for External-Domain destinations
      if (omnitureEnable) {
        if (typeof pName === 'object') {
          pName = undefined;
        }
        if (typeof wmdPageLink !== 'undefined') {
          if (typeof pName !== 'undefined') {
            s_md.pageName = pName;
          }
          wmdPageLink(sLink);
          if (typeof pName !== 'undefined') {
            s_md.pageName = omniPagenameDefault;
          }
        }
      }
    };

    this.omniPageview = function(pCount, pName) { // Omniture Page View function
      if (omnitureEnable) {
        if (typeof pName === 'object') {
          pName = undefined;
        }
        if (typeof wmdPageview !== 'undefined') {
          if (typeof pName !== 'undefined') {
            wmdPageview(pName, pCount);
          } else {
            wmdPageview('', pCount);
          }
          if (typeof pName !== 'undefined') {
            s_md.pageName = omniPagenameDefault;
          }
        }
      }
    };

    this.pamTrack = function(assetName, moduleStrOrPvNum, element) {
      var self = this, hashValue = '';

      if (typeof brandAdvance2 == 'undefined') {
          hashValue = md5(sfNumObj.ipp.sfNum + '_' + assetName);
      } else{
          hashValue = md5(sfNumObj.ipp.sfNum + '-' + assetName);
      }

      if (typeof element === 'object') {
        if (typeof moduleStrOrPvNum === 'number') {
          this.omniPageview(moduleStrOrPvNum, document.domain.replace('wp.', '').replace(/www\.(.+\.com)/, '$1') + '/' + pamProductName + '/' + sfNumObj.ipp.sfNum + '/' + hashValue + '/', element);
        } else {
          this.omni(moduleStrOrPvNum, document.domain.replace('wp.', '').replace(/www\.(.+\.com)/, '$1') + '/' + pamProductName + '/' + sfNumObj.ipp.sfNum + '/' + hashValue + '/', element);
        }
      } else {
        if (typeof moduleStrOrPvNum === 'number') {
          this.omniPageview(moduleStrOrPvNum, document.domain.replace('wp.', '').replace(/www\.(.+\.com)/, '$1') + '/' + pamProductName + '/' + sfNumObj.ipp.sfNum + '/' + hashValue + '/');
        } else {//console.log('md5 of '+sfNumObj.ipp.sfNum + '-' + assetName +': '+hashValue);
          this.omni(moduleStrOrPvNum, document.domain.replace('wp.', '').replace(/www\.(.+\.com)/, '$1') + '/' + pamProductName + '/' + sfNumObj.ipp.sfNum + '/' + hashValue + '/');
        }
      }
    };
};

export default SATracking;
