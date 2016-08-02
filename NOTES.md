## Notes for further development

### Incomplete features

* HTML slides - These are feature complete (the ajax works), but the
location of the files needs to be determined.
* Playlist is complete but unstyled

### Pernicious and/or weird defects

* Loading time seems slow. This is likely because of the player
  freezing up while the video loads. One way to make the effect better
  would be to load in the components _before_ loading the player,
  sending through dummy values optimistically. As far as I can tell,
  the parsing is very quick so that's not the bottleneck.
* IOS7 bugs with video. This os behaves quite badly with video and
  there are quite a few workarounds in place. Hopefully with iOS9
  coming out, the workarounds can be removed
* Rotating the ipad in fullscreen mode causes weirdness. Probably has
  to do with the meta viewport tag.
* Need to figure out the config variable for turning off the loading
  animation in the flash player

### Code that needs love

* The `modules/stores/brand_play_tracking_store.js` This little baby
  should be refactored to more closely resemble
  `modules/stores/cme_audio_tracking_store.js`. It was a mess because
  I was trying to reverse engineer the heartbeat and beacon
  tracking. It could probably use a ground up rewrite (but you could
  probably refactor most of that rewrite into a mixin that's shared
  between BrandPlay and CME Audio)
* Any code that is still using classic JS style rather than
ES6. Migrate these files as you come across them.
* The `product` directories could use some love.
** Rename the `products/video_player/styles` directory to `css`.
** Rename `video_player` to `core`.
** Clean up the `jsp` directories.

### Where to start with mobile

* Inside the `cme.jsx` component I would add a `renderMobile` and a
  `renderDesktop` method to handle the divergence (and rearrange the
  layouts). This might be a little tricky, given all of the
  configuration sniffing that takes place in the render method.

### Other things (HERE BE DRAGONS)

Watch out for all of the craziness around `onSetCurrentTime` in the
video store. iOS sends a bogus 0 for current time in the progress
event so we have to work with a `pushedTime` placeholder in order to
optimistically update the player until things are ready. This is
working, but it's just a hairy bit of code.

as mentioed before the `mixins/ios7_video_store_hacks.js` file can
hopefully be removed at some point. Currently it mimics the Akamai API
for the first play of a Brand Play video (Akamai is fussy on iOS7
until the `setMedia` method has been called a couple times.)

**VIDEO-API and VIDEO-METRICS.js!!** ahh yeah. These bad boys.

This is Dimitry's code and there are places where I've had to make
fixes specifically for metrics and/or to make it work with our setup
(such as the line in `video-api` that says 'this part is for testing
it will be removed' well, I removed it because it doesn't work with
our setup.)

Ideally we'd just include their libs from somewhere remote, but
currently we package them up with ours. Not a fan.
