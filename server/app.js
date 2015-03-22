'use strict';

var express    = require('express'),
    morgan     = require('morgan'),
    bodyParser = require('bodyParser');

var app = express();
var api = require('./api');

// Configure the server
app.set('view engine', 'jade');
app.set('port', process.env.PORT || 8000);
app.use(express.static(__dirname + '/public'));
app.use(morgan(process.env.NODE_ENV === 'development' ? 'dev' : 'combined'));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

// Mount the API
app.use('/api', api);

// 404
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// General error handling
app.use(function(err, req, res, next) {
  res.status(err.status || 500);
  res.json(err);
});

module.exports = app;
