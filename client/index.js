'use strict';

/**
 * Entry point for the entire app. Currently this is also where we keep the
 * Router.
 */

var React  = require('react'),
    Router = require('react-router'),
    { Link, Route, RouteHandler, DefaultRoute } = Router;

var { App, Inbox, Account } = require('./App');

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

