// Even if using 4.x for ES6 support we still need JSX support, so Babel.
require('babel-register');

// NOTE: For some reason requiring app.js gives back { app } instead of just
// app, so we specifically make sure to export app as module.exports
module.exports = require('./app.js').app;
