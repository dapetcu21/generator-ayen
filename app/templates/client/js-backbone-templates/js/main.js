// Load bower-installed libraries. Don't remove this
require('bower-components');

var _ = require('lodash');
var $ = require('jquery');
var loadcss = require('./loadcss');

var MainView = require('./views/main-view');

_.once(function () {
  $(window).ready(function () {
    // Asynchronously load our main CSS file. Required for critical CSS
    loadcss('/css/main.css');

    // Create main view
    var mainView = new MainView({
      el: $('#main-view')[0]
    });

    // Start routing
    mainView.startRouter();
  });
})();

