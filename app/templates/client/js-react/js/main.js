// Load bower-installed libraries. Don't remove this
require('bower-components');

var _ = require('lodash');
var $ = require('jquery');
var loadcss = require('./loadcss');
var React = require('react');

var RouteCreator = require('./actions/RouteCreator');
var MainView = require('./views/MainView');

_.once(function () {
  $(window).ready(function () {
    // Asynchronously load our main CSS file. Required for critical CSS
    loadcss('/css/main.css');

    // Start routing
    RouteCreator.start();

    // Render main view
    var mainView = React.createElement(MainView, {});
    React.render(mainView, $('#main-view')[0]);
  });
})();

