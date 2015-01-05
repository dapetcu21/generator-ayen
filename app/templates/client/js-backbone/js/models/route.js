var Backbone = require('backbone');

var Route = Backbone.Model.extend({
  setRoute: function () {
    
  },
  getRoute: function () {
    return this.get('route');
  },
});

module.exports = Route;
