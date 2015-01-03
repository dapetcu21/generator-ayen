// Backbone for CommonJS (require()) comes without
// jQuery by default, so we're going to strap ours in
var Backbone = require('backbone');
Backbone.$ = require('jquery');
module.exports = Backbone;
