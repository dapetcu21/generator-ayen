var Backbone = require('../lib/backbone-jquery');
var Router = require('../controllers/router');

var RootPage = require('./root-page');
var AnotherPage = require('./another-page');
var NotFoundPage = require('./not-found-page');

var MainView = Backbone.View.extend({
  initialize: function () {
    MainView.__super__.initialize.apply(this, arguments);

    this.router = new Router();

    this.router.model.on('change', function () {
      this.render();
    }, this);
  },

  remove: function () {
    this.router.model.off(null, null, this);
    MainView.__super__.remove.apply(this);
  },

  startRouter: function () {
    this.router.start();
  },

  render: function () {
    var route = this.router.model.get('route');

    if (this.page) {
      this.page.remove();
    }

    this.$el.html('<div class="page-container"></div>');

    var PageClass;
    switch (route) {
      case '':
        PageClass = RootPage;
        break;
      case 'another':
        PageClass = AnotherPage;
        break;
      default:
        PageClass = NotFoundPage;
    }

    this.page = new PageClass({
      el: this.$('.page-container')[0]
    });

    this.page.render();
  }
});

module.exports = MainView;
