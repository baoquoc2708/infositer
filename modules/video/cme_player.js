import $            from 'jquery';
import CME          from 'components/cme';
import Player       from 'video/player';
import SA           from 'video/stand_alone_player.js';


let player;
window.newVideoPlayer = function() {
  player = new Player(CME);
  player.create('cme-video-player');
};

if (typeof loadOnDocReady === 'undefined') {
  $(() => {
    const videoPlayers = $('[data-config]');
    if (videoPlayers.length > 1) {
      videoPlayers.each((iterator, object) => {
        let newPlayer = new SA();
        newPlayer.instance.create(iterator, object);
      });
    } else {
      newVideoPlayer();
    }
  });
}
