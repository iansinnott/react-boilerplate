/**
 * Webpack configuration.
 *
 * For more info check out the [docs][1] as well as [this article][2].
 *
 * [1]: http://webpack.github.io/docs/
 * [2]: http://thetrendythings.com/read/20178
 */

var webpack = require('webpack'),

    // Stylus
    axis        = require('axis'),
    rupture     = require('rupture'),
    typographic = require('typographic');

var WEBPACK_URL = 'http://localhost:8080/'; // Trailing slash is important

module.exports = {

  devtool: 'eval',

  entry: [
    'webpack-dev-server/client?' + WEBPACK_URL,
    'webpack/hot/only-dev-server',
    './client/index'
  ],

  output: {
    path: __dirname + '/public/',
    filename: 'bundle.js',

    // I'm not sure if this will cause problems when building for productiong.
    // We don't want our build to be tied to any specific domain or URL. Not
    // sure if this will affect that.
    publicPath: WEBPACK_URL
  },

  plugins: [
    new webpack.HotModuleReplacementPlugin(), // Enable HMR
    new webpack.NoErrorsPlugin() // Don't reload on errors
  ],

  // If you want to use files with the actual JSX extension add it to the list
  resolve: {
    extensions: ['', '.js']
  },

  module: {
    loaders: [
      { test: /\.js?$/, loaders: ['react-hot', 'babel'], exclude: /node_modules/ },
      { test: /\.styl$/, loaders: ['style', 'css', 'autoprefixer', 'stylus'] },
      { test: /\.(png|jpg|gif)$/, loaders: ['file?name=[name].[ext]'] },
      { test: /\.md$/, loaders: ['html', 'markdown'] },
      { test: /\.woff(2)?(\?v=[0-9]\.[0-9]\.[0-9])?$/, loader: "url-loader?limit=10000&minetype=application/font-woff" },
      { test: /\.(ttf|eot|svg)(\?v=[0-9]\.[0-9]\.[0-9])?$/, loader: "file-loader" }
    ]
  },

  stylus: {
    use: [axis(), rupture(), typographic()]
  }

};
