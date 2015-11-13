/* eslint-disable no-var */
var path = require('path');
var webpack = require('webpack');
var axis = require('axis');
var rupture = require('rupture');

// Set up dev host host and HMR host. For the dev host this is pretty self
// explanatory: We use a different live-reload server to server our static JS
// files in dev, so we need to be able to actually point a script tag to that
// host so it can load the right files. The HRM host is a bit stranger. For more
// details on why we need this URL see the readme and:
// https://github.com/glenjamin/webpack-hot-middleware/issues/37
var DEV_PORT = process.env.DEV_PORT || 8888;
var DEV_HOST = '//localhost:' + DEV_PORT + '/';
var HMR_HOST = DEV_HOST + '__webpack_hmr';

module.exports = {
  devtool: 'inline-source-map',

  entry: {
    app: [
      'webpack-hot-middleware/client?path=' + HMR_HOST,
      './client/index.js',
    ],
  },

  output: {
    path: path.join(__dirname, 'public'),
    filename: '[name].js',
    publicPath: DEV_HOST,
  },

  plugins: [
    new webpack.HotModuleReplacementPlugin(),
    new webpack.NoErrorsPlugin(),
  ],

  module: {
    loaders: [
      {
        test: /\.js$/,
        loaders: ['babel'],
        include: path.join(__dirname, 'client'),
      },
      {
        test: /\.css$/,
        loaders: ['style', 'css'],
      },
      {
        test: /\.styl/,
        loaders: [
          'style',
          'css?modules&importLoaders=2&localIdentName=[name]__[local]__[hash:base64:6]',
          'autoprefixer',
          'stylus',
        ],
      },
      {
        test: /\.woff(2)?(\?v=[0-9]\.[0-9]\.[0-9])?$/,
        loaders: ['url?limit=10000&mimetype=application/font-woff'],
      },
      {
        test: /\.(ttf|eot|svg)(\?v=[0-9]\.[0-9]\.[0-9])?$/,
        loaders: ['file'],
      },
      {
        test: /\.(png|jpg|gif)$/,
        loaders: ['file?name=[name].[ext]'],
      },
    ],
  },

  stylus: {
    use: [axis(), rupture()],
  },
};
