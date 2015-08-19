/* eslint-disable no-var */
var path = require('path');
var boosh = require('booshjs');
module.exports = boosh({
  in: { app: './client/index.js' },
  out: path.resolve(__dirname, 'public/'),
  isDev: process.env.NODE_ENV === 'development',
});
