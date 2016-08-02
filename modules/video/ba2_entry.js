import SA             from 'video/stand_alone_player.js';
import $              from 'jquery';
import React          from 'react';
import QNAPresenter   from 'components/qna/qna_standalone_presenter';
import _screenfull    from 'screenfull';

const brandAdvance2const = require('../../assets/js/core.js');
const ba2TrackingConst = require('../../assets/js/tracking.js');

window.brandAdvance2 = brandAdvance2const();
window.ba2Tracking = ba2TrackingConst();

require('../../assets/js/brandAdvance2.js');

window.SA = SA;
document.addEventListener('DOMContentLoaded', () => {
  /*=== Creating Video Player Component ===*/
  let autoplayFlg = [];
  window.videoPlayer = new Array($('.video-container').length);
  $('.video-container').each(function(i, el) {
    videoPlayer[i] = new SA();
    videoPlayer[i].create(el, i);
    autoplayFlg.push(true);
  });

  if(typeof brandAdvance2 != 'undefined'){
    let arrayLength = $('[data-autoplay]').length, ele = $('[data-autoplay]'),
      videoTop = new Array(arrayLength), videoBottom = new Array(arrayLength),
      header = $('#header').height() || 0, isi = $('#isi')[0].clientHeight/2 || 0,
      wHeight = $(window).height();


    $('[data-autoplay]').each(function(index, el) {
      let self = this, fullscreenFlg = false, fullscreenState = false,
          thisVideo = Number(self.getAttribute('id').split('-')[1]);
      videoTop.push(0);
      videoBottom.push(0);
      if (window.matchMedia("(min-width: 800px)").matches){
        $(document).on('scroll', function() {
          let s = $(window).scrollTop();
          videoTop[index] = s - $($(ele)[index]).offset().top + header;
          videoBottom[index] = s - $($(ele)[index]).offset().top - $($(ele)[index]).height() + wHeight - isi;
          if(videoTop[thisVideo] < 0 && videoBottom[thisVideo] > 0){
            if(autoplayFlg[thisVideo] && $(self).data('autoplay')){
              videoPlayer[thisVideo].mediaApi.play();
              autoplayFlg[thisVideo] = false;
            }
          }
          if(videoTop[thisVideo] > 0 || videoBottom[thisVideo] < 0){
            if($(self).data('autopause') && !screenfull.isFullscreen){
              videoPlayer[thisVideo].mediaApi._v.mediaElement.pause();
            }
          }
        });
      }
    });
  }

  videoPlayer.forEach((i) => {
    i.mediaApi._v.mediaElement.onplaying = function(){
      if($('.isi').length>0){
        $('.isi-header').on('click touchend', function() {
          i.mediaApi._v.mediaElement.pause();
        });
      }
      videoPlayer.forEach((j) => {
        if(j!==i){
          j.mediaApi._v.mediaElement.pause();
        }
      });
    };
  });

  /*=== Creating QnA Form/response Component ===*/
  $('[data-qnaFormId]').each((i, node)=> {
    const [qid, page] = node.getAttribute('data-qnaFormId').split('/'),
          component = new QNAPresenter(qid, page);
    React.render(React.createElement(component, {qid, page}), node);
  });
});
