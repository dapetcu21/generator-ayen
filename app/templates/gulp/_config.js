'use strict';

var path = require('path');

var config = module.exports = {};
config.plugins = require('gulp-load-plugins')();

config.paths = {
  'public': './public',
  'client': './client',
  'server': './server',
  'test': './tests'
};

config.browserify = {
  
};

// Conventionally, Bower Javascript packages used to export globals. Deamdify
// strips away this behaviour in favor of module.exports
// Some bower packages depend on other packages to export globals, so we need
// a workaround to redefine them.
//
// For example, in a setup without deamdify, jquery would have exported
// window.$ and window.jQuery. Bootstrap depends on those globals to be
// defined and won't work without them.
config.bowerGlobals = {
  'jquery': ['$', 'jQuery'],
};

config.aliasify = {
  configDir: path.resolve(config.paths.client + '/js'),
  aliases: {
    'bower-components': './lib/bower-components',
    'templates': './lib/templates',
  }
};

config.stylus = {
    'include css': true,
    'resolve url': true,
};

config.autoprefixer = [
  'ie >= 8',
  'ie_mob >= 9',
  'ff >= 30',
  'chrome >= 30',
  'safari >= 6',
  'opera >= 23',
  'ios >= 6',
  'android >= 2.3',
  'bb >= 9'
];

config.serverPort = 4000;
config.serverProxyPort = 4500;
config.serverStartTimeout = 4000;
config.serverEnvVars = {};

config.handleError = function (e) {
  config.plugins.util.log(e.message);
  this.emit('end');
};
