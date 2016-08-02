import { assign, keys } from '_';

export default {
  getWBChn() {
    this.setSubDOMenv = () => {
        let subDOMenv;
        const pageCurrentURL = window.location.href.toLowerCase();
        if (/qa02/i.test(pageCurrentURL)) {
            if (/staging/i.test(pageCurrentURL)) {
                subDOMenv = '.staging.qa02';
            } else {
                subDOMenv = '.qa02';
            }
        } else if (/qa01/i.test(pageCurrentURL)) {
            if (/staging/i.test(pageCurrentURL)) {
                subDOMenv = '.staging.qa01';
            } else {
                subDOMenv = '.qa01';
            }
        } else if (/qa00/i.test(pageCurrentURL)) {
            if (/staging/i.test(pageCurrentURL)) {
                subDOMenv = '.staging.qa00';
            } else {
                subDOMenv = '.qa00';
            }
        } else if (/proddev/i.test(pageCurrentURL)) {
            subDOMenv = '.proddev';
        } else if (/staging/i.test(pageCurrentURL)) {
            subDOMenv = '.staging';
        } else {
            subDOMenv = '';
        }
        return subDOMenv;
    };
    const subDOMenv = this.setSubDOMenv();
    const News = new RegExp('www' + subDOMenv + '.medscape.com|wp' + subDOMenv + '.medscape.com|search' + subDOMenv + '.medscape.com|profreg' + subDOMenv + '.medscape.com|directory' + subDOMenv + '.medscape.com');
    const Reference = new RegExp('reference' + subDOMenv + '.medscape.com|emedicine' + subDOMenv + '.medscape.com');
    const Education = new RegExp('www' + subDOMenv + '.medscape.org');
    let channel = 'reference';
    switch (true) {
      case (Reference.test(location.host)) :
        channel = 'reference';
        break;
      case (News.test(location.host))  :
        channel = 'news';
        break;
      case (Education.test(location.host)) :
        channel = 'education';
        break;
      case location.host.match('education.webmd.com')!== null  :
      default:
        channel = 'reference';
        break;
    }
    return channel;
  },

  onHamburger(isOpen) {
    const direction = isOpen? 'open' : 'close';
    this._metrics(`ctl_vist_${direction}`);
  },

  onSelectLanguage(language) {
    this._metrics(`lang_${language}`);
  },
  /**
   * @param action {string} - 1-based chapter index
   */
  onChapter(chapter) {
    this._metrics(`chaplist_${chapter}`);
  },
  /**
   * @param action {string} - 1-based chapter index
   */
  onPlayList(index) {
    const newIndex = parseInt(index, 10) + 1;
    this._metrics(`show_${newIndex}`);
  },
  /**
   * @param action {string} - one of 'prev', 'next'
   */
  onSlideNavigate(action) {
    this._metrics(`slide-pgnm_${action}`);
  },

  onSlideZoom(isZoomed) {
    const direction = isZoomed? 'in' : 'out';
    this._metrics(`slide-zoom_${direction}`);
  },

  onSlideThumb(isThumb) {
    const direction = isThumb? 'open' : 'close';
    this._metrics(`slide-thmbnl_${direction}`);
  },

  onSlideSelect()  {
    this._metrics('slide-thmbsel');
  },

  setupGlobals() {
    // setup globals so that Metrics code doesn't shit itself
    window.s_assetname   = window.s_assetname || null;
    window.s_pageview_id = window.s_pageview_id || null;
    window.s_md          = window.s_md || { };
  },

  getPlayerName(hostOverride) {
    const hostname = hostOverride || window.location.host,
          map      = {
            'www.medscape.com':            'mscp',
            'www.qa00.medscape.com':       'mscp',
            'www.qa01.medscape.com':       'mscp',
            'www.staging.medscape.com':    'mscp',
            'www.medscape.org':            'edu',
            'www.qa00.medscape.org':       'edu',
            'www.qa01.medscape.org':       'edu',
            'www.staging.medscape.org':    'edu',
            'reference.medscape.com':      'ref',
            'reference.qa00.medscape.com': 'ref',
            'reference.qa01.medscape.com': 'ref',
            'education.webmd.com':         'wbmdedu',
            'education.qa00.webmd.com':    'wbmdedu',
            'education.qa01.webmd.com':    'wbmdedu',
            'localhost:8080':         'edu'
          },
          name     = map[hostname] || 'default';

    return `${name}`;
  },

  pageLink(link, obj) {
    if(typeof addLinkTrackVars === 'undefined') return;
    addLinkTrackVars(keys(obj));
    try {
      assign(s_md, obj);
      wmdPageLink(link);
    } finally {
      remLinkTrackVars(keys(obj));
    }
  }
};
