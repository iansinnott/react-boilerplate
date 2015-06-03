'use strict';

const express     = require('express');
const morgan      = require('morgan');
const bodyParser  = require('body-parser');
const compression = require('compression');

let config = require('../webpack.config');
let devConfig = require('../webpack.dev.config');

let app = express();
let api = require('./api');

let publicPath;

if (process.env.NODE_ENV === 'development')
  publicPath = devConfig.output.publicPath;
else
  publicPath = config.output.publicPath;

// Configure the server
app.use(compression());
app.use(express.static('public', { index: false })); // Not using a full path is important
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
app.get('*', (req, res) => {
  res.render('index.jade', { scriptPath: publicPath + 'app.js' });
});

// 404
app.use((req, res, next) => {
  let err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// General error handling
app.use((err, req, res, next) => {
  res.status(err.status || 500);
  res.json({ message: err.message });
});

module.exports = app;

if (require.main === module) {
  app.listen(app.get('port'), () => {
    console.log('App listening');
  });
}

