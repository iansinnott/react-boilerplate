/* eslint-disable no-var, vars-on-top */
require('colors');
var gulp = require('gulp');
var fs = require('fs');
var rmdir = require('rimraf');
var nodemon = require('nodemon');
var webpack = require('webpack');
var WebpackDevServer = require('webpack-dev-server');

// Config
var config = require('./webpack.config');
var publicPath = config.output.publicPath;

// TODO: This is just the waterline-disk default. Move this into config so that
// it can be modified in one place.
var DB_PATH = './tmp';

/**
 * Build app for production
 */
gulp.task('build', function(done) {
  console.log('Webpack bundle', 'compiling...');
  webpack(config, function(err, stats) {
    if (err)
      console.error('Webpack bundle failed.', err);
    else {
      console.log('Webpack bundle complete.');
      console.log(stats.toString({ chunks: false, version: true }));
    }
    done();
  });
});

/**
 * Run the app with mostly production settings. Minifies the app and runs the
 * node server
 */
gulp.task('run', ['build'], function() {
  nodemon({
    script: 'bin/www',
    env: { NODE_ENV: 'production' },
  });
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
    ignore: [ 'node_modules/', '.git/' ],
  });
});

gulp.task('reset', function() {
  try {
    rmdir.sync(DB_PATH);
    console.log('Database reset'.green);
  } catch (e) {
    console.log(
      'Error:'.red,
      'Could not remove ' + DB_PATH + ' directory:',
      e.message.yellow
    );
  }
});

/**
 * Run the webpack dev server. This should always be run in tandem with the
 * nodemon dev server above.
 */
gulp.task('webpack', function() {
  var DEV_PORT = config.devServer.port;
  var server = new WebpackDevServer(webpack(config), config.devServer);

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
