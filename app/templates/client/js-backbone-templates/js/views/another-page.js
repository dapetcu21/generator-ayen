var Backbone = require('../lib/backbone-jquery');
var templates = require('templates');

var AnotherPage = Backbone.View.extend({
  render: function () {
    this.$el.html(templates.anotherPage());
  }
});

module.exports = AnotherPage;
