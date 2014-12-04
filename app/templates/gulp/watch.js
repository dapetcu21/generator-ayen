'use strict';

var gulp = require('gulp');
var nodefn = require('when/node');

var config = require('./_config');
var paths = config.paths;

var browserSync = require('browser-sync');
var createServer = require('./server');

// Common watch hooks.
gulp.task('watch:common', ['build'], function () {
  gulp.watch(paths.client + '/index.jade', ['index.html']);
  gulp.watch(paths.client + '/**/**/*.styl', ['css']);
  gulp.watch(paths.client + '/templates/**/*.jade', ['js']);
  gulp.watch([
    paths.client + '/js/**/*.js',
    paths.client + '/js/**/*.json',
    '!' + paths.client + '/js/lib/templates.js',
    '!' + paths.client + '/js/lib/bower-components.js'
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
