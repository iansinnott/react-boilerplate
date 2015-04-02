'use strict';

var express    = require('express'),
    morgan     = require('morgan'),
    bodyParser = require('body-parser');

var app    = express();
var api    = require('./api');
var config = require('../webpack.config');

// Configure the server
app.use(express.static(__dirname + '/public', { index: false }));
app.set('view engine', 'jade');
app.set('views', 'server');
app.set('port', process.env.PORT || 3000);
app.use(morgan(process.env.NODE_ENV === 'development' ? 'dev' : 'combined'));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

// Mount the API
app.use('/api', api);

// Send the boilerplate HTML file down for all get requests that aren't to the
// API.
app.get('*', function(req, res) {
  res.render('index.jade', {
    publicPath: config.output.publicPath
  });
});

// 404
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// General error handling
app.use(function(err, req, res, next) {
  res.status(err.status || 500);
  res.json({ message: err.message });
});

module.exports = app;
