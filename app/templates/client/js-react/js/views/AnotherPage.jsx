var React = require('react');

var AnotherPage = React.createClass({
  render: function () {
    return <div>
      <h1>Another page</h1>
      <p>This is just another page. You can go back to the <a href='/'>first page</a></p>
    </div>;
  }
});

module.exports = AnotherPage;
