var Backbone = require('../lib/backbone-jquery');

var AnotherPage = Backbone.View.extend({
  render: function () {
    this.$el.html([
      '<h1>Another page</h1>',
      '<p>This is just another page. You can go back to the <a href="/">first page</a></p>',
    ].join(''));
  }
});

module.exports = AnotherPage;
