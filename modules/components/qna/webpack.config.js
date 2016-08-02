const webpack = require('webpack');

/**
 * This webpack config is for building the brand play product
 *
 */
module.exports = {
  entry: [
    'webpack-dev-server/client?http://localhost:8080', // WebpackDevServer host and port
    'webpack/hot/only-dev-server',

    // './modules/video/brand_player.js',
    // './modules/video/cme_player.js',
    './modules/components/qna/qna_entry.js'
  ],
  devtool: 'source-map',
  resolve: {
    root: __dirname + '/modules',
    extensions: [ '', '.js', '.jsx' ],
    alias: {
      amp:        __dirname + '/amp-premier/amp.premier.js',
      react:      __dirname + '/ext_libraries/react',
      reflux:     __dirname + '/ext_libraries/reflux/index.js',
      _:          __dirname + '/ext_libraries/lodash/lodash.js',
      event:      __dirname + '/ext_libraries/event-emitter/dist/EventEmitter.js',
      jquery:     __dirname + '/ext_libraries/00-jquery1x/jquery-1.10.2.js',
      jqmobile:   __dirname + '/ext_libraries/00-jquery1x/jqmobile-1.4.5',
      md5:        __dirname + '/ext_libraries/MD5',
      screenfull: __dirname + '/ext_libraries/screenfull/screenfull.js',
      classnames: __dirname + '/ext_libraries/classnames/index.js',

      // component styles
      baseStyle:  __dirname + '/products/video-player/styles/main.scss',
      brandStyle: __dirname + '/products/brandplay/css/main.scss',
      cmeStyle:   __dirname + '/products/cme/css/main.scss',

      // legacy
      modernizr:      __dirname + '/ext_libraries/modernizr/modernizr.custom.43687.js',
      knockout:       __dirname + '/ext_libraries/knockout/knockout-2.3.0.js',
      jqplot:         __dirname + '/ext_libraries/jqplot/jquery.jqplot.min.js',
      jqplotStyles:   __dirname + '/ext_libraries/jqplot/jquery.jqplot.min.css',
      x2js:           __dirname + '/ext_libraries/parsing/x2js/xml2json.min.js',
      StandardModule: __dirname + '/modules/definitions/standardmodule.js',
      DataParserMin:  __dirname + '/modules/parsers/dataparser.js',
      QnaRadio:       __dirname + '/modules/qna/qnaRadio.js',
      ChartBuilder:   __dirname + '/modules/qna/chartBuilder',
      Util:           __dirname + '/modules/controllers/util'
    }
  },
  output: {
    path: __dirname + '/dist/qna',
    filename: 'qna.bundle.js'
  },
  module: {
    loaders: [
      {
        test: /\.jsx$/,
        loader: 'react-hot-loader!babel-loader',
        exclude: /node_modules|ext_libraries|amp.premier/
      },
      { test: /\.js$/, loader: 'babel-loader', exclude: /node_modules|ext_libraries|amp.premier/ },
      { test: /\.css$/,  loader: 'style-loader!css-loader!autoprefixer-loader' },
      { test: /\.scss$/,  loader: 'style-loader!css-loader!autoprefixer-loader!sass-loader' },
      { test: /modernizr/,  loader: 'imports?this=>window!exports?window.Modernizr' },
      { test: /screenfull/,  loader: 'exports?window.screenfull' },
      { test: __dirname + '/modules/video/brand_player', loader: 'expose-loader?Player!babel-loader' },
      { test: __dirname + '/modules/video/cme_player', loader: 'expose-loader?CMEPlayer!babel-loader' },
    ]
  },
  plugins: [
    new webpack.ProvidePlugin({
      $: 'jquery',
      jQuery: 'jquery',
      'window.jQuery': 'jquery',
      'CryptoJS': 'md5'
    }),
    new webpack.HotModuleReplacementPlugin(),
    new webpack.NoErrorsPlugin(),
    new webpack.optimize.LimitChunkCountPlugin({maxChunks: 1})
  ]
};
