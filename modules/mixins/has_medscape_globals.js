import $ from 'jquery';
export default {
  initMedscapeGlobals: function() {
    const empty = () => { };
    this.initGlobal('$userId',      window.s_registered_user_id, undefined);
    this.initGlobal('$metrics',     window.s_md, { });
    this.initGlobal('$wmdPageView', window.wmdPageview, empty);
    this.initGlobal('$wmdTrack',    window.wmdTrack, empty);
    this.initGlobal('$wmdPageLink', window.wmdPageLink, empty);
    this.initFromMeta('ipp');
    this.initFromMeta('cp');
  },
  initGlobal: function(name, globe, fallback) {
    if(typeof globe !== 'undefined') {
      this[name] = globe;
    } else {
      this[name] = fallback;
    }
  },
  initFromMeta: function(name) {
    try {
      delete this[name];
      const meta = $('[data-'+name+']:eq(0)').attr('data-' + name);
      if(meta) {
        this[name] = JSON.parse(meta);
      }
    } catch(error) {
      console.log(`Error parsing json from ${name} meta tags`, error);
    } finally {
      this['is' + name.toUpperCase() + 'Disabled'] = !this[name];
    }
  }
};
