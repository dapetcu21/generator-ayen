var config = require('./common/config');
var paths = config.paths;
var $ = config.plugins;

var _ = require('lodash');
var gulp = require('gulp');
var source = require('vinyl-source-stream');
var resolveUseref = require('./common/resolve-useref');

var browserSync = require('browser-sync');

var pipeErrors = require('./common/pipe-errors');

var browserify = require('browserify');
var watchify = require('watchify');
var debowerify = require('debowerify');
var deamdify = require('deamdify');
var aliasify = require('aliasify');
var filterTransform = require('filter-transform');
<% if (compilerFeatures.react) { %>var reactify = require('reactify');
<% } %>
function generateMainJS(opts) {
  opts = opts || {};

  var browserifyOpts = _.extend({
    entries: [paths.client + '/js/main.js'],
    debug: !!opts.debug
  }, config.browserify);

  var bundle, stream;

  if (opts.incremental && config.shared.incrementalBundle) {
    bundle = config.shared.incrementalBundle;
  } else {
    bundle = browserify(browserifyOpts);
    <% if (compilerFeatures.react) { %>
    bundle.transform(reactify);<% } %>
    bundle.transform(aliasify.configure(config.aliasify));
    bundle.transform(debowerify);
    bundle.transform(filterTransform(function (file) {
      return /bower_components/.test(file);
    } ,deamdify));
    <% if (useTests) { %>if (opts.instanbul) {
      bundle.transform(require('browserify-istanbul')({
        ignore: ['**/lib/**']
      }));
    }<% } %>

    if (opts.incremental) { 
      bundle = watchify(bundle);
      config.shared.incrementalBundle = bundle;
    }
  }

  stream = pipeErrors(bundle.bundle());

  if (opts.uglify) {
    stream = stream.pipe($.uglify());
  }

  return stream
    .pipe(source(paths.client + '/js/main.js'))
    .pipe($.rename('main.js'));
}

// Bundles Browserify for production; no source or coverage maps.
gulp.task('js:dist', ['js:dependencies', 'index.html:dist'], function () {
  return resolveUseref(generateMainJS(), config.shared.refSpec.js, '/js/main.js')
    .pipe($.uglify())
    .pipe(gulp.dest(paths.public));
});
<% if (useTests) { %>
// Bundles Browserify with Istanbul coverage maps.
gulp.task('js:coverage', ['js:dependencies'], function () {
  return generateMainJS({
    debug: true,
    istanbul: true,
  }).pipe(gulp.dest(paths.public + '/js/'));
});
<% } %>
// Bundles Browserify incrementally with source maps
gulp.task('js', ['js:dependencies'], function () {
  return generateMainJS({
    debug: true,
    incremental: true,
  }).pipe(gulp.dest(paths.public + '/js/'))
    .pipe(browserSync.reload({stream: true}));
});

// Same as above, just without re-running the deps (for watch)
gulp.task('js:no-deps', function () {
  return generateMainJS({
    debug: true,
    incremental: true,
  }).pipe(gulp.dest(paths.public + '/js/'))
    .pipe(browserSync.reload({stream: true}));
});
