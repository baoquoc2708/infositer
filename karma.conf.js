'use strict';

var webpack       = require('webpack'),
    webpackConfig = require('./webpack.config');

webpackConfig.resolve.alias.sinon = __dirname + '/ext_libraries/sinon/sinon.js';
// webpackConfig.devtool = 'inline-source-map';
webpackConfig.plugins.push(
  new webpack.NormalModuleReplacementPlugin(/sinon/, __dirname + '/ext_libraries/sinon/sinon.js')
);
webpackConfig.module.noParse = [
  /sinon/
];

module.exports = function(config) {
  config.set({
    basePath: '',
    frameworks: ['jasmine', 'sinon'],
    files: [
      // 'test/helpers/**/*.js',
      './test/index.js'
    ],
    preprocessors: {
      'test/index.js': ['webpack', 'sourcemap' ]
    },
    webpack: webpackConfig,
    webpackServer: {
      noInfo: true
    },
    exclude: [],
    port: 8081,
    logLevel: config.LOG_ERROR,
    colors: true,
    autoWatch: true,
    // Start these browsers, currently available:
    // - Chrome
    // - ChromeCanary
    // - Firefox
    // - Opera
    // - Safari (only Mac)
    // - PhantomJS
    // - IE (only Windows)
    browsers: ['Chrome'],
    reporters: ['progress'],
    captureTimeout: 60000,
    // singleRun: true
  });
};
