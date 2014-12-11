var gulp = require('gulp');
var nodefn = require('when/node');

var config = require('./common/config');
var paths = config.paths;

var browserSync = require('browser-sync');
var createServer = require('./common/run-server');

// Common watch hooks.
gulp.task('watch:common', ['build'], function () {
  gulp.watch(paths.client + '/index.jade', ['index.html']);
  gulp.watch(paths.client + '/**/**/*.styl', ['css']);
  gulp.watch(paths.client + '/templates/**/*.jade', ['js:dependencies']);
  gulp.watch(['bower.json'], ['js:dependencies', 'index.html']);

  if (config.shared.incrementalBundle) {
    config.shared.incrementalBundle.on('update', function () {
      gulp.run('js:no-deps');
    });
  }
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
