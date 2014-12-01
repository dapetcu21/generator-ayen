'use strict';

var gulp = require('gulp');

var config = require('./_config.js');
var paths = config.paths;

var browserSync = require('browser-sync');

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

// Build the project and start a web development server.
gulp.task('watch', ['watch:common'], function (done) {
  browserSyncRun(done);
});

function browserSyncRun(done) {
  browserSync({
    server: {
      baseDir: paths.www
    },
    port: 4000
  }, function () {
    done();
  });
}

// Serve the ./www folder using a static web development server.
gulp.task('serve', function (done) {
  browserSyncRun(done);
});
