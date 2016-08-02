import { imageServer, envCheck } from 'utils/util';

export default {
  imageURL() {
    let serverPath = imageServer(envCheck() || '.qa01'),
        imagePath  = this.props.assetURL.replace(/^\/?en\//, '');
    return `${serverPath}/${imagePath}`;
  },

  htmlImageURL() {
    let serverPath = '',
    imagePath  = '';
    if (this.props.thumbnailOverride) {
      serverPath = imageServer(envCheck() || '.qa01');
      imagePath  = this.props.thumbnailOverride.replace(/^\/?en\//, '');
      return `${serverPath}/${imagePath}`;
    }
    return '';
  }
};
