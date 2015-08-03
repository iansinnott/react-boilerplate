/* eslint-disable handle-callback-err */
'use strict';

// General
var gulp = require('gulp');
var fs = require('fs');
var url = require('url');

// String coloring
require('colors');

// Used with mongo
var exec = require('child_process').exec;
var rmdir = require('rimraf');

// Nodemon
var nodemon = require('nodemon');

// Webpack
var webpack = require('webpack');
var WebpackDevServer = require('webpack-dev-server');

// Config
var config = require('./webpack.config');
var devConfig = require('./webpack.dev.config');
var publicPath = devConfig.output.publicPath;

// TODO: This is just the waterline-disk default. Move this into config so that
// it can be modified in one place.
var DB_PATH = './tmp';

/**
 * Build app for production
 */
gulp.task('build', ['clean'], function() {
  webpack(config, function(err, stats) {/* empty */});
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

gulp.task('mongod', function() {

  // Make sure the db directory exists. If not then create it.
  try {
    fs.readdirSync(DB_PATH);
  } catch (e) {
    fs.mkdir(DB_PATH);
  }

  // Run mongod
  exec('mongod --dbpath ./.db', function(err) {
    if (err) throw err;
    console.log('MongoDB started');
  });

  console.log(
    'MongoDB server'.green,
    'listening on port',
    '27017'.magenta
  );
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

gulp.task('postgres', function() {

  console.log("WARNING:".yellow, "Not yet implemented. Postgres support is coming but not here yet.");

  // Run postgres
  // exec('postgres -D ' + DB_PATH, function(err) {
  //   if (err) throw err;
  //   console.log('Postgres started');
  // });

  // console.log(
  //   'Postgres server'.green,
  //   'listening at',
  //   'localhost:5432'.magenta
  // );
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
