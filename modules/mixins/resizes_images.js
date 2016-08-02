export default {
  resizeImageTo(path, ratio, urlType) {
    const [ w, h ] = ratio.split('x'),
               url = `${path}?interpolation=lanczos-none&resize=${w}:${h}`;
    if(urlType === 'style') {
      return `url(${url})`;
    } else {
      return url;
    }
  }
};
