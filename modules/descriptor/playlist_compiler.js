import { flatten, map, merge } from '_';
import { mixin, imageServer,
         envCheck }            from 'utils/util';
import HasPrettyTime           from 'mixins/has_pretty_time';
import CompilerMethods         from 'mixins/descriptor_compiler_methods';

let PlaylistCompiler = function(playlist, root) {
  this.playlist  = flatten([playlist]);
  this.root      = root;
  this.isValid   = !!playlist[0];
};

PlaylistCompiler.prototype = mixin(HasPrettyTime, CompilerMethods, {
  compile() {
    this.buildPlaylist();
    return this;
  },
  getPlaylist() {
    return this.playlist;
  },
  getArticleId(articleId) {
    if(articleId) {
        return `/${articleId.replace(/^\//, '')}`
    } else {
        return '';
    }
  },
  getThumbUrl(root, thumb) {
    if(thumb && root) {
      return `${root}/${thumb.replace(/^\/?en\//, '')}`;
    } else if (thumb) {
      const serverPath = imageServer(envCheck() || '.qa01');
      return serverPath + `/${thumb.replace(/^\/?en\//, '')}`;
    } else {
      return '';
    }
  },
  buildPlaylist() {
    this.playlist = map(this.playlist, (item) => {
      if(item.thumb) {
        if(item.articleId) {
          return merge(item, {
            articleURL: this.getArticleId(item.articleId),
            thumbURL: this.getThumbUrl(item.root, item.thumb)
          });
        } else {
          return merge(item, {
            articleURL: 'comingsoon',
            thumbURL: this.getThumbUrl(item.root, item.thumb)
          });
        }
      }
    });
    this.playlist.filter((item) => {
        return (typeof item !== 'undefined');
    });
    return this;
  }
});
export default PlaylistCompiler;
