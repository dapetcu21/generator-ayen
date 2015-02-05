var config = require('./common/config');
var paths = config.paths;
var $ = config.plugins;

var gulp = require('gulp');
var browserSync = require('browser-sync');
var wiredep = require('wiredep').stream;
var useref = require('node-useref');

var pipeErrors = require('./common/pipe-errors');

function generateIndexHTML() {
  return pipeErrors(gulp.src(paths.client + '/index.jade'))
    .pipe($.jade({
      pretty: true
    }))
    .pipe(wiredep());
}

// Generate index.html for development
gulp.task('index.html', function () {
  return generateIndexHTML()
    .pipe($.replace(/([^\/])bower_components/g, '$1/bower_components'))
    .pipe(gulp.dest(paths.public))
    .pipe(browserSync.reload({stream: true}));
});

// Generate index.html for production
gulp.task('index.html:dist', ['js:dependencies'], function () {
  return generateIndexHTML()
    .pipe($.tap(function (file) {
      var res = useref(file.contents.toString());
      file.contents = new Buffer(res[0]);
      // Needed to build the JS and the CSS
      config.shared.refSpec = res[1];
    }))
    .pipe($.minifyHtml())
    .pipe(gulp.dest(paths.public));
});
