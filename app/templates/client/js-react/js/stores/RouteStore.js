var Backbone = require('backbone');
var AppDispatcher = require('../AppDispatcher');

var RouteStore = Backbone.Model.extend({
  initialize: function () {
    this.dispatchToken = AppDispatcher.register(this.dispatchCallback.bind(this));
  },

  dispatchCallback: function (payload) {
    switch (payload.actionType) {
      case 'route-change':
        this.set('route', payload.route);
        break;
    }
  },

  getRoute: function () {
    return this.get('route');
  },
});

module.exports = new RouteStore();
