/* eslint-disable camelcase, no-var */

/**
 * Webpack production configuration.
 *
 * For more info check out the [docs][1] as well as [this article][2].
 *
 * [1]: http://webpack.github.io/docs/
 * [2]: http://thetrendythings.com/read/20178
 *
 * TODO: There is a lot in here that's repeated in ./webpack.config.dev.js so it
 * would be a good idea to DRY out these two files
 */

var path = require('path');
var webpack = require('webpack');
var strip = require('strip-loader');
var ExtractTextPlugin = require('extract-text-webpack-plugin');
var axis = require('axis');
var rupture = require('rupture');
var typographic = require('typographic');

var WEBPACK_URL = '/';

module.exports = {

  entry: {
    app: './client/index.js',
  },

  output: {
    path: path.resolve(__dirname, 'public/'),
    filename: '[name].js',
    publicPath: WEBPACK_URL,
  },

  /**
   * Note: css-lader is passed the no-restructuring param b/c it can sometimes
   * cause issues where selectors will be reordered and no longer get applied.
   */
  module: {
    loaders: [
      // See .babelrc for Babel config. Also note that all calls to console.log
      // and debug will be stripped from the code
      { test: /\.js?$/, loaders: [strip.loader('debug', 'console.log'), 'babel'], exclude: /node_modules/ },

      { test: /\.styl$/, loader: ExtractTextPlugin.extract('style', 'css?modules&importLoaders=2!autoprefixer!stylus') },
      { test: /\.(png|jpg|gif)$/, loaders: ['file?name=[name].[ext]'] },
      { test: /\.woff(2)?(\?v=[0-9]\.[0-9]\.[0-9])?$/, loaders: ['url?limit=10000&minetype=application/font-woff'] },
      { test: /\.(ttf|eot|svg)(\?v=[0-9]\.[0-9]\.[0-9])?$/, loaders: ['file'] },
    ],
  },

  plugins: [
    new ExtractTextPlugin('[name].css', { allChunks: true }),

    // Don't load locales when requiring moment.js. We only need english
    new webpack.IgnorePlugin(/^\.\/locale$/, [/moment$/]),

    // Minify
    new webpack.optimize.UglifyJsPlugin({
      sourceMap: false,

      // This matches nothing and thus removes all comments
      comments: /.^/,
      screw_ie8: true,

      // Options: http://lisperator.net/uglifyjs/compress
      compress: { warnings: false },
    }),

    // Dedupe
    new webpack.optimize.DedupePlugin(),

    // Don't reload on errors
    new webpack.NoErrorsPlugin(),

    // Define magic globals
    new webpack.DefinePlugin({
      __CLIENT__: true,
      __SERVER__: false,
      __DEV__: false,
    }),
  ],

  // If you want to use files with the actual JSX extension add it to the list
  resolve: {
    extensions: ['', '.js'],
  },

  stylus: {
    use: [axis(), rupture(), typographic()],
  },

};
