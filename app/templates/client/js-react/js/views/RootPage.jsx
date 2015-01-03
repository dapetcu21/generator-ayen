var React = require('react');

var RootPage = React.createClass({
  render: function () {
    return <div>
      <h1>Hello world</h1>
      <p>This is an example of an app made in React.</p>
      <p>You can go to the <a href='/another'>other page</a> from here or you can watch this kitten:</p>
      <img src='/img/kitten.jpg'></img>
    </div>;
  }
});

module.exports = RootPage;
