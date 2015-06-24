/**
 * Even if using io.js it's still a good idea to use babel server side at least
 * at the time of writing this (2015-06-24). Once io.js supports things like
 * async and arrow functions at a stable level then this could be remoed.
 */
require('babel/register');
module.exports = require('./app');
