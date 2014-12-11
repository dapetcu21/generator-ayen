var config = require('./common/config');
var paths = config.paths;

var gulp = require('gulp');
var nodefn = require('when/node');
var when = require('when');
var fs = require('fs.extra');
var _ = require('lodash');

var makeSymlink = require('./common/make-symlink');

gulp.task('mkdirp', function () {
  return nodefn.call(fs.mkdirp, paths.public);
});

function forEachAsset(cb) {
  var assetsPath = paths.client + '/assets';
  return nodefn.call(fs.readdir, assetsPath).then(function (files) {
    return when.all(_.map(files, function (file) {
      // Ignore dotfiles
      if (/^\./.test(file)) {
        return null;
      }
      return cb(file);
    }));
  });
}

// When doing a minimal build, just symlink all the assets
gulp.task('assets:link', ['mkdirp'], function () {
  return forEachAsset(function (file) {
    return makeSymlink(paths.client + '/assets/' + file, paths.public + '/' + file);
  });
});

// When doing a full build, remove the symlinks and copy them in full
gulp.task('assets:clean', function () {
  return forEachAsset(function (file) {
    return nodefn.call(fs.rmrf, paths.public + '/' + file);
  });
});

gulp.task('assets:copy', ['assets:clean'], function () {
  return gulp.src(paths.client + '/assets/**')
    .pipe(gulp.dest(paths.public));
});

