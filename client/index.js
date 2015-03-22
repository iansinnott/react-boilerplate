var React  = require('react'),
    Router = require('router'),
    { Link, Route, RouteHandler, DefaultRoute } = Router;

var App = React.createClass({
  render() {
    return (
      <div class="app">
        <header>
          <Link to="inbox">Inbox</Link>
          <Link to="account">Account</Link>
        </header>
        <RouteHandler/>
      </div>
    );
  }
});

var routes = (
  <Route path='/' handler={ App }>
    <Route name='inbox' handler={ Inbox }/>
    <Route name='account' handler={ Account }/>
  </Route>
);

document.addEventListener('DOMContentLoaded', () => {
  Router.run(routes, Handler => {
    React.render(<Handler/>, document.body);
  });
});
