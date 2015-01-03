var React = require('react');

var RouteStore = require('../stores/RouteStore');

var RootPage = require('./RootPage');
var AnotherPage = require('./AnotherPage');
var NotFoundPage = require('./NotFoundPage');


var MainView = React.createClass({
  componentDidMount: function () {
    var self = this;
    RouteStore.on('change', function () {
      self.forceUpdate();
    });
  },

  componentWillUnmount: function () {
    RouteStore.off(null, null, this);
  },
    
  render: function () {
    var route = RouteStore.getRoute();

    switch (route) {
      case '':
        return <RootPage/>;
      case 'another':
        return <AnotherPage/>;
      default:
        return <NotFoundPage/>;
    }
  }
});

module.exports = MainView;
