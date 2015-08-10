/* eslint-disable no-var */
/**
 * Webpack configuration.
 *
 * For more info check out the [docs][1] as well as [this article][2].
 *
 * [1]: http://webpack.github.io/docs/
 * [2]: http://thetrendythings.com/read/20178
 */

var path = require('path');
var webpack = require('webpack');
var axis = require('axis');
var rupture = require('rupture');
var typographic = require('typographic');

var DEV_PORT = process.env.DEV_PORT || 8888;
var WEBPACK_URL = 'http://localhost:' + DEV_PORT + '/'; // Trailing slash is important

module.exports = {

  devtool: 'inline-source-map',

  entry: {
    app: [
      'webpack-dev-server/client?' + WEBPACK_URL,
      'webpack/hot/only-dev-server',
      './client/index.js',
    ],
  },

  output: {
    path: path.resolve(__dirname, 'public/'),
    filename: '[name].js',
    publicPath: WEBPACK_URL,
  },

  // We't load locales when requiring moment.js. We usually only need english
  plugins: [
    new webpack.IgnorePlugin(/^\.\/locale$/, [/moment$/]), // No locales
    new webpack.HotModuleReplacementPlugin(),              // Enable HMR
    new webpack.NoErrorsPlugin(),                          // Don't reload on errors
    new webpack.DefinePlugin({                             // Define magic globals
      __CLIENT__: true,
      __SERVER__: false,
      __DEV__: true,
    }),
  ],

  // Show progress
  progress: true,

  // If you want to use files with the actual JSX extension add it to the list
  resolve: {
    extensions: ['', '.js'],
  },

  module: {
    loaders: [
      // See .babelrc for Babel config
      { test: /\.js?$/, loaders: ['react-hot', 'babel'], exclude: /node_modules/ },
      { test: /\.styl$/, loaders: ['style', 'css?modules&importLoaders=2&localIdentName=[name]__[local]___[hash:base64:6]', 'autoprefixer', 'stylus'] },
      { test: /\.(png|jpg|gif)$/, loaders: ['file?name=[name].[ext]'] },
      { test: /\.woff(2)?(\?v=[0-9]\.[0-9]\.[0-9])?$/, loaders: ['url?limit=10000&minetype=application/font-woff'] },
      { test: /\.(ttf|eot|svg)(\?v=[0-9]\.[0-9]\.[0-9])?$/, loaders: ['file'] },
    ],
  },

  stylus: {
    use: [axis(), rupture(), typographic()],
  },

};
