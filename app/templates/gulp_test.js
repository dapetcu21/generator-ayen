'use strict';

var gulp = require('gulp');
var _ = require('lodash');

var config = require('./common/config');
var paths = config.paths;

var karma = require('karma').server;
var pagespeed = require('psi');
var ngrok = require('ngrok');

var karmaConf = {
  browsers: ['PhantomJS'],
  frameworks: ['mocha'],
  preprocessors: {},
  files: [
    paths.client + '/bower_components/jquery/dist/jquery.min.js',
    paths.client + '/bower_components/bootstrap/dist/js/bootstrap.min.js',
    paths.public + '/js/main.js',
    './node_modules/should/should.min.js',
    paths.test + '/**/*.spec.js'
  ],
  reporters: ['mocha', 'osx', 'coverage'],
  coverageReporter: {
    type : 'lcov',
    dir : 'coverage/',
    subdir: function (browser) {
      return browser.toLowerCase().split(/[ /-]/)[0];
    }
  }
};

karmaConf.preprocessors[paths.public + '/js/main.js'] = ['coverage'];

// Start the TDD workflow.
gulp.task('test', function (done) {
  karma.start(karmaConf, done);
});

// Run the tests only once, while also building for CI.
gulp.task('test:once', ['build:test'], function () {
  karma.start(_.assign({}, karmaConf, { singleRun: true }));
});

// Run the pagespeed workflow, targeting a local server.
gulp.task('pagespeed', function (done) {
  ngrok.connect(parseInt(process.env.PORT), function(err, url) {
    pagespeed({
      url: url,
      strategy: 'mobile'
    }, function () {
      done();
      process.exit(0);
    });
  });
});
