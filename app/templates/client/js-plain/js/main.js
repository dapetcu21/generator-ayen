// Load bower-installed libraries. Don't remove this
require('bower-components');

var _ = require('lodash');
var $ = require('jquery');
var loadcss = require('./loadcss');

var mainViewHtml = [
  '<h1>Hello World</h1>',
  '<p>Some text and a kitten:</p>',
  '<img src="/img/kitten.jpg"/>'
].join('\n');

_.once(function () {
  $(window).ready(function () {

    // Asynchronously load our main CSS file. Required for critical CSS
    loadcss('/css/main.css');

    $('#main-view').html(mainViewHtml);

    console.log('Hello from Javascript');
  });
})();

