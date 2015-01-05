var Backbone = require('../lib/backbone-jquery');
var templates = require('templates');

var NotFoundPage = Backbone.View.extend({
  render: function () {
    this.$el.html(templates.notFoundPage());
  }
});

module.exports = NotFoundPage;
