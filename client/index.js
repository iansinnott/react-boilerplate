'use strict';

/**
 * Entry point for the entire app. Currently this is also where we keep the
 * Router.
 */

var React  = require('react'),
    Router = require('react-router'),
    { Link, Route, RouteHandler, DefaultRoute } = Router;

var { App, Readme, Resources, Feed } = require('./App');

var routes = (
  <Route path='/' handler={ App }>
    <Route name='readme' handler={ Readme }/>
    <Route name='resources' handler={ Resources }/>
    <Route name='feed' handler={ Feed }/>
  </Route>
);

document.addEventListener('DOMContentLoaded', () => {
  Router.run(routes, Handler => {
    React.render(<Handler/>, document.getElementById('root'));
  });
});

