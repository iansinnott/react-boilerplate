/* eslint-disable no-var */
var path = require('path');
var boosh = require('booshjs');
module.exports = boosh({
  in: './client/app.js',
  out: path.resolve(__dirname, 'public/'),
  isDev: process.env.NODE_ENV === 'development',
});
