'use strict';

var gulp = require('gulp');
var nodefn = require('when/node');

var config = require('./_config');
var paths = config.paths;

var browserSync = require('browser-sync');
var createServer = require('./server');

// Common watch hooks.
gulp.task('watch:common', ['build'], function () {
  gulp.watch(paths.app + '/index.jade', ['index.html']);
  gulp.watch(paths.app + '/**/**/*.styl', ['css']);
  gulp.watch(paths.app + '/templates/**/*.jade', ['js']);
  gulp.watch([
    paths.app + '/js/**/*.js',
    paths.app + '/js/**/*.json',
    '!' + paths.app + '/js/lib/templates.js',
    '!' + paths.app + '/js/lib/bower-components.js'
  ], ['js:no-deps']);
  gulp.watch(['bower.json'], ['js', 'index.html']);
});

// Run browserSync
function browserSyncRun() {
  return createServer(config.serverProxyPort)
    .then(function () {
      return nodefn.call(browserSync, {
        proxy: '127.0.0.1:' + config.serverProxyPort,
        port: config.serverPort,
      });
    });
}


// Build the project and start a web development server.
gulp.task('watch', ['watch:common'], function () {
  return browserSyncRun();
});

// Serve the ./www folder using a static web development server.
gulp.task('serve', function () {
  return browserSyncRun();
});
