/* eslint-disable handle-callback-err */
'use strict';

// General
var gulp = require('gulp');
var fs = require('fs');
var url = require('url');

// String coloring
require('colors');

// Nodemon
var nodemon = require('nodemon');

// Webpack
var webpack = require('webpack');
var WebpackDevServer = require('webpack-dev-server');

// Config
var config = require('./webpack.config');
var devConfig = require('./webpack.dev.config');
var publicPath = devConfig.output.publicPath;

/**
 * Build app for production
 */
gulp.task('build', ['clean'], function() {
  webpack(config, function(err, stats) {/* empty */});
});

/**
 * Run the dev server
 */
gulp.task('nodemon', function() {
  nodemon({
    script: 'bin/www',
    watch: 'server/',
    ext: 'js',
    env: { NODE_ENV: process.env.NODE_ENV },
    ignore: [ 'node_modules/', '.git/' ]
  });
});

/**
 * Remove bundled files from public/
 * Note: This does not remove the public directory itself
 */
gulp.task('clean', function() {
  try {
    fs.readdirSync('public').forEach(function(filename) {
      fs.unlinkSync('public/' + filename);
    });
    console.log('public/'.green, 'directory cleaned.');
  } catch (e) {
    console.log('Error:'.red, 'Could not clean public directory');
  }
});


/**
 * Run the app with mostly production settings. Minifies the app and runs the
 * node server
 */
gulp.task('run', ['build'], function() {
  nodemon({
    script: 'bin/www',
    env: { NODE_ENV: 'production' }
  });
});

/**
 * Run the webpack dev server. This should always be run in tandem with the
 * nodemon dev server above.
 */
gulp.task('webpack', function() {
  var DEV_PORT = url.parse(publicPath).port;

  var server = new WebpackDevServer(webpack(devConfig), {
    contentBase: './public/',
    publicPath: publicPath,
    hot: true,
    inline: true,
    stats: {
      colors: true,
      chunks: false
    }
  });

  server.listen(DEV_PORT, function(err, result) {
    if (err) console.error(err);
    console.log(
      'Webpack server'.green,
      'listening on port',
      DEV_PORT.toString().magenta
    );
  });
});

gulp.task('default', ['nodemon', 'webpack']);
