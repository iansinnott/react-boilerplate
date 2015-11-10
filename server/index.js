/**
 * Even if using 4.x there are still ES6 features missing from node so we use
 * babel server side.
 */
require('babel-core/register');
module.exports = require('./app');
