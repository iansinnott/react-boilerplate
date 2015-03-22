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
    publicPath: '/'
  },

  plugins: [
    new webpack.HotModuleReplacementPlugin(),
    new webpack.NoErrorsPlugin()
  ],

  resolve: {
    extensions: ['', '.js']
  },

  module: {
    loaders: [
      { test: /\.js?$/, loaders: ['react-hot', 'babel'], exclude: /node_modules/ },
      { test: /\.styl$/, loaders: ['style', 'css', 'stylus'] }
    ]
  },

  stylus: {
    use: [axis(), rupture(), typographic()]
  }

};
