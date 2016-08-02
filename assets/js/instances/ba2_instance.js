/*==== Created 19/04/16 by MN ==================================================/  
/ This JS instance file will allow you to override the maien core.js so please, /
/ be careful with your changes.                                                 /
/==============================================================================*/

/* Animation Variables */
  var draw = [SVG('animation1'),SVG('animation9')];


/* Tracking variables here */
  var assetName = '',
      moduleName = 'vsp-anim',
      hashValue = '',
      sfNum = brandAdvance2.tracking.settings.sfNumObj.tracking.sfNum,
      domain = document.domain,
      pamProductName = brandAdvance2.tracking.settings.pamProductName,
      pName = '';


/* This scripts scans all the program looking for animations. To identify an animation
  you must add the data-attribute "data-animation" and assign to it the scene number*/
  $(document).on('currentScene', function() {
    $('[data-animation]').each(function(index, el) {
      if(brandAdvance2.settings.cur_scene === $(el).data('animation')){
        /* START Tracking */
          assetName = sfNum + '-scene-' + $(el).data('animation');
          hashValue = CryptoJS.MD5(assetName);
          pName = domain + '/' + pamProductName + '/' + sfNum + '/' + hashValue + '/';
         
          brandAdvance2.tracking.omniPageLink(moduleName, pName);
        /* END Tracking */


        /* START Animation Code */
          draw[index].clear();
          draw[index].image('http://img.staging.medscapestatic.com/pi/sp/ipp/7/14480/images/salutrib-logo.svg', 100, 100).animate(3000).move(20,10).size(300,100);
        /* END Animation Code */

      }
    });
  });
