'use strict';

var _ = require('lodash');
var $ = require('./lib/jquery');
var browser = require('bowser').browser;
var loadcss = require('./lib/loadcss');

module.exports = {
  launch: _.once(function () {
    var self = window.app = this;

    $(document).ready(function () {
      if (browser.msie) {
        $('html').addClass('msie');
      }

      if (browser.ios) {
        $('html').addClass('ios');
      }

      if (browser.android) {
        $('html').addClass('android');
      }

      // Asynchronously load our main CSS file.
      loadcss('/css/main.css');

      // Fix scrolling issues
      if (browser.ios) {
        $('body').on('touchstart', '.scrollable:not(.scrollable-locked)', function(e) {
          if (e.currentTarget.scrollTop === 0) {
            e.currentTarget.scrollTop = 1;
          } else if (e.currentTarget.scrollHeight === e.currentTarget.scrollTop + e.currentTarget.offsetHeight) {
            e.currentTarget.scrollTop -= 1;
          }
        });
      }

      //var mainView = self.view = new MainView({
        //el: $('#main-view'),
      //});

      //mainView.render();
    });

  })
};

module.exports.launch();
