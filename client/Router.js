'use strict';

/**
 * Entry point for the entire app. Currently this is also where we keep the
 * Router.
 *
 * Note: Desipte eslint saying React is never used it actually will be used
 * after JSX is compiled, which means we still need to include it. As such I
 * disable ESLint here.
 */

/* eslint-disable */
var React = require('react'),
    Router = require('react-router'),
    { Link, Route, RouteHandler, DefaultRoute } = Router;
/* eslint-enable */

var { Layout, Readme, Resources, Feed } = require('./Layout');

var Home = React.createClass({
  render() {
    return (
      <div>
        <h1>Welcome</h1>
        <p>
          Check out the <Link to='readme'>README</Link> for more info.
        </p>
      </div>
    );
  }
});

var routes = (
  <Route path='/' handler={ Layout }>
    <DefaultRoute handler={ Home } />
    <Route name='readme' handler={ Readme }/>
    <Route name='resources' handler={ Resources }/>
    <Route name='feed' handler={ Feed }/>
  </Route>
);

module.exports = routes;
