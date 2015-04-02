'use strict';

var gulp = require('gulp'),
    gutil = require('gulp-util'),

    // Nodemon
    nodemon = require('nodemon'),

    // Webpack
    webpack = require('webpack'),
    WebpackDevServer = require('webpack-dev-server');

var config = require('./webpack.config');

gulp.task('nodemon', function() {
  nodemon({
    script: 'bin/www',
    watch: 'server/',
    ext: 'js',
    env: { NODE_ENV: process.env.NODE_ENV },
    ignore: [ 'node_modules/', '.git/' ]
  });
});

gulp.task('webpack', function() {
  var server = new WebpackDevServer(webpack(config), {
    contentBase: './public/',
    publicPath: config.output.publicPath,
    hot: true,
    stats: {
      colors: true,
      chunks: false
    }
  });

  server.listen(3000, 'localhost', function(err, result) {
    if (err) console.error(err);
    console.log('Listening on port 3000');
  });
});

gulp.task('default', ['nodemon', 'webpack']);
