var config = require('./common/config');
var paths = config.paths;
var $ = config.plugins;

var gulp = require('gulp');
var nodefn = require('when/node');
var penthouse = require('penthouse');

var runServer = require('./common/run-server.js');

gulp.task('css:critical', ['build:dist:base'], function () {
  // Start a server for penthouse.
  return runServer(config.serverProxyPort)
    .then(function () {
      return nodefn.call(penthouse, {
        url: 'http://127.0.0.1:' + config.serverProxyPort,
        css: paths.public + '/' + config.shared.mainCssPath,
        width: 1440,
        height: 900
      });
    })
    .then(function(criticalCSS) {
      config.shared.criticalCSS = criticalCSS;
      $.util.log('Critical CSS size: ' + criticalCSS.length + ' bytes.');
    })
    .finally(function () {
      runServer.close();
    });
});

gulp.task('css:critical:replace', ['css:critical'], function () {
  return gulp.src(paths.public + '/index.html')
    .pipe($.replace(
      '<link rel=stylesheet href=' + config.shared.mainCssPath + '>',
      '<style>' + config.shared.criticalCSS + '</style>'
    ))
    .pipe(gulp.dest(paths.public));
});
