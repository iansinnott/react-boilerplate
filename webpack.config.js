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

module.exports = {

  devtool: 'eval',

  entry: [
    'webpack-dev-server/client?http://localhost:3000',
    'webpack/hot/only-dev-server',
    './client/index'
  ],

  output: {
    path: __dirname + '/public/',
    filename: 'bundle.js',
    publicPath: '/' // The path from /public. A bit confusing
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
      { test: /\.styl$/, loaders: ['style', 'css', 'stylus'] },
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
