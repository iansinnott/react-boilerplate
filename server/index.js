// Even if using 4.x for ES6 support we still need JSX support, so Babel.
require('babel-core/register');
module.exports = require('./app');
