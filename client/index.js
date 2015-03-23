'use strict';

/**
 * Entry point for the entire app. Currently this is also where we keep the
 * Router.
 */

var React  = require('react'),
    Router = require('react-router');

var routes = require('./Router');

document.addEventListener('DOMContentLoaded', () => {
  Router.run(routes, Handler => {
    React.render(<Handler/>, document.getElementById('root'));
  });
});

