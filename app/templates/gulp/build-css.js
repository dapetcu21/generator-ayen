var config = require('./common/config');
var paths = config.paths;
var $ = config.plugins;

var gulp = require('gulp');
var browserSync = require('browser-sync');
var resolveUseref = require('./common/resolve-useref');

function generateMainCSS() {
  return gulp.src(paths.client + '/css/main.<%= cssExtension %>')
    .pipe($.expectFile({ errorOnFailure: true, silent: true }, '**/*.<%= cssExtension %>'))<%
if (cssPrecompiler !== 'css') { %>
    .pipe($.<%= cssPrecompiler %>(config.<%= cssPrecompiler %>))<% } %>
    .pipe($.autoprefixer(config.autoprefixer));
}

// Generate CSS for development
gulp.task('css', function () {
  return generateMainCSS()
    .pipe(gulp.dest(paths.public + '/css'))
    .pipe(browserSync.reload({stream: true}));
});

// Generate CSS for production
gulp.task('css:dist', ['index.html:dist'], function () {
  config.shared.mainCssPath = '/css/main.css'; //Needed by critical
  return resolveUseref(generateMainCSS(), config.shared.refSpec.css, '/css/main.css')
    .pipe($.minifyCss())
    .pipe(gulp.dest(paths.public));
});
