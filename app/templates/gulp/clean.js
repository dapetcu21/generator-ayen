'use strict';

var gulp = require('gulp');

var config = require('./_config.js');
var paths = config.paths;
var fs = require('fs.extra');

var when = require('when');
var nodefn = require('when/node');
var _ = require('lodash');

// Cleans the ./www folder.
gulp.task('clean', function () {
  return nodefn.call(fs.readdir, paths.www)
    .then(function (files) {
      return when.all(_.map(files, function (file) {
        return nodefn.call(fs.rmrf, paths.www + '/' + file);
      }));
    }, function () {
      return nodefn.call(fs.rmrf, paths.www)
        .then(function () {
          return nodefn.call(fs.mkdir, paths.www);
        });
    });
});
