var React  = require('react'),
    Router = require('react-router'),
    { Link, Route, RouteHandler, DefaultRoute } = Router;

require('./App.styl');

require('./react-logo.png');

var App = React.createClass({
  render() {
    return (
      <div className="app">
        <header>
          <Link to="inbox">Inbox</Link>
          <Link to="account">Account</Link>
        </header>
        <RouteHandler/>
      </div>
    );
  }
});

var Inbox = React.createClass({
  render() {
    return (
      <div className="inbox">
        <h1>Inbox</h1>
      </div>
    );
  }
});

var Account = React.createClass({
  render() {
    return (
      <div className="account">
        <h1>Account</h1>
      </div>
    );
  }
});

module.exports = {
  App,
  Inbox,
  Account
};

