var React  = require('react'),
    Router = require('react-router'),
    { Link, Route, RouteHandler, DefaultRoute } = Router;

var { App, Inbox, Account } = require('./app');

var routes = (
  <Route path='/' handler={ App }>
    <Route name='inbox' handler={ Inbox }/>
    <Route name='account' handler={ Account }/>
  </Route>
);

document.addEventListener('DOMContentLoaded', () => {
  Router.run(routes, Handler => {
    React.render(<Handler/>, document.getElementById('root'));
  });
});

