var config = require('./common/config');
var paths = config.paths;
var $ = config.plugins;

var gulp = require('gulp');
var mainBowerFiles = require('main-bower-files');
var path = require('path');

var makeSymlink = require('./common/make-symlink');


// When doing a minimal build, just symlink the bower components folder
gulp.task('bower-components:assets:link', ['mkdirp'], function () {
  return makeSymlink(paths.client + '/bower_components', paths.public + '/bower_components');
});

// When doing a full build, extract just the necessary files (currently just fonts)
// Adapt this to your needs
gulp.task('bower-components:assets:copy', function () {
  return gulp.src(mainBowerFiles({
    filter: '**/*.{eot,svg,ttf,woff}'
  }))
    .pipe($.tap(function(file) {
      // Still not the perfect solution. A perfect solution would look at  
      // the associated CSS file's location and derive from there
      var relPath = path.relative(path.resolve(paths.client), file.path);
      var match = /bower_components\/[^\/]*/.exec(relPath);
      if (match) {
        file.base = path.resolve(paths.client, match[0]);
      }
    }))
    .pipe(gulp.dest(paths.public));
});

