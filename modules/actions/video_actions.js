import Reflux              from 'reflux';

const Actions = Reflux.createActions([
  'load',
  'enable',
  'disable',
  'selectVideo',
  'start',
  'end',
  'toggle',
  'replay',
  'pause',
  'subtitle',
  'setVolume',
  'setCurrentTime',
  'mute',
  'unmute',
  'fullScreen',
  'stopAutoplay',
  'setClosedCaptioning',
  'selectLanguage',
  'exitFullScreen',
  'deleteQna'
]);

export default Actions;
