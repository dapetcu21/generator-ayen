// Load bower-installed libraries. Don't remove this
require('bower-components');

var templates = require('templates');
var _ = require('lodash');
var $ = require('jquery');
var loadcss = require('./loadcss');

_.once(function () {
  $(window).ready(function () {

    // Asynchronously load our main CSS file. Required for critical CSS
    loadcss('css/main.css');

    $('#main-view').html(templates.exampleTemplate({
      someArg: 'Hello World!',
    }));

    console.log('Hello from Javascript');
  });
})();

