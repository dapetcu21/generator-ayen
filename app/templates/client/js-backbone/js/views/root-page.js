var Backbone = require('../lib/backbone-jquery');

var RootPage = Backbone.View.extend({
  render: function () {
    this.$el.html([
      '<h1>Hello world</h1>',
      '<p>This is an example of an app made in Backbone.</p>',
      '<p>You can go to the <a href="/another">other page</a> from here or you can watch this kitten:</p>',
      '<img src="/img/kitten.jpg"></img>',
    ].join(''));
  }
});

module.exports = RootPage;
