'use strict';

var gulp = require('gulp');

var config = require('./common/config');
var paths = config.paths;
var fs = require('fs.extra');

var when = require('when');
var nodefn = require('when/node');
var _ = require('lodash');

// Cleans the ./www folder.
gulp.task('clean', function () {
  return nodefn.call(fs.readdir, paths.public)
    .then(function (files) {
      return when.all(_.map(files, function (file) {
        return nodefn.call(fs.rmrf, paths.public + '/' + file);
      }));
    }, function () {
      return nodefn.call(fs.rmrf, paths.public)
        .then(function () {
          return nodefn.call(fs.mkdir, paths.public);
        });
    });
});
