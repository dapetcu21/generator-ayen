var Backbone = require('../lib/backbone-jquery');
var $ = require('jquery');
var Route = require('../models/route');

// You can and should break the route down in a descriptor 
// object here. This is a simple example, so we're just passing
// the route string as it is in to the Route model
var Router = Backbone.Router.extend({
  initialize: function (opts) {
    opts = opts || {};
    this.model = opts.model || new Route();
    Router.__super__.initialize.apply(this, arguments);
  },

  routes: {
    '*route': '_dispatch',
  },

  _dispatch: function (route) {
    this.model.set('route', (route || '').replace(/\/$/, ''));
  },

  start: function () {
    var self = this;
    if (self._started) { return; }
    self._started = true;

    Backbone.history.start({ pushState: true });

    // Hijack relative links to prevent page reloads when using push state
    // Courtesy of https://gist.github.com/tbranyen/1142129
    
    // Only need this for pushState enabled browsers
    if (Backbone.history && Backbone.history._hasPushState) {
      // Use delegation to avoid initial DOM selection and allow all matching elements to bubble
      $(document).delegate('a', 'click', function(evt) {
        var href = $(this).attr('href');
        var protocol = this.protocol + '//';
     
        // Ensure the protocol is not part of URL, meaning its relative.
        // Stop the event bubbling to ensure the link will not cause a page refresh.
        if (href.slice(0, protocol.length) !== protocol) {
          evt.preventDefault();
          self.navigate(href, true);
        }
      });
    }
  }
});

module.exports = Router;
