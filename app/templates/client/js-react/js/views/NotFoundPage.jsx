var React = require('react');

var NotFoundPage = React.createClass({
  render: function () {
    return <div>
      <h1>Not found</h1>
      <p>The page you are looking for doesn't exist. Try <a href='/'>here</a></p>
    </div>;
  }
});

module.exports = NotFoundPage;
