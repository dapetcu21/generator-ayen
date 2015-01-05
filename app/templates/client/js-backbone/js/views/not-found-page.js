var Backbone = require('../lib/backbone-jquery');

var NotFoundPage = Backbone.View.extend({
  render: function () {
    this.$el.html([
      '<h1>Not found</h1>',
      '<p>The page you are looking for doesn\'t exist. Try <a href="/">here</a></p>',
    ].join(''));
  }
});

module.exports = NotFoundPage;
