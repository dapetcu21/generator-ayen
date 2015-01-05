var Backbone = require('../lib/backbone-jquery');
var templates = require('templates');

var RootPage = Backbone.View.extend({
  render: function () {
    this.$el.html(templates.rootPage({
      someArg: 'Some argument',
    }));
  }
});

module.exports = RootPage;
