import BrandPlay from 'components/brand_play';
import Player    from 'video/player';

require('stores/brand_play_tracking_store');
require('stores/brand_play_layout_store');

window.Player = new Player(BrandPlay);
export default window.Player;
