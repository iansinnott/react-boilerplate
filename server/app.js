import express from 'express';
import morgan from 'morgan';
import bodyParser from 'body-parser';
import compression from 'compression';

import HttpError from './lib/HttpError.js';
import prodConfig from '../webpack.config';
import devConfig from '../webpack.dev.config';
import api from './api';

const app = express();
const isDev = process.env.NODE_ENV === 'development';

if (isDev)
  app.set('publicPath', devConfig.output.publicPath);
else
  app.set('publicPath', prodConfig.output.publicPath);

// Configure the server
app.use(compression());
app.use(express.static('public', { index: false })); // Not using a full path is important
app.set('view engine', 'jade');
app.set('views', 'server/views');
app.set('port', process.env.PORT || 3000);
app.use(morgan(isDev ? 'dev' : 'combined'));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

// Mount the API (note that we MUST pass app to all router middleware)
app.use('/api', api(app));

// Send the boilerplate HTML file down for all get requests that aren't to the
// API.
app.get('*', (req, res) => {
  res.render('index', { scriptPath: app.get('publicPath') });
});

// 404
app.use((req, res, next) => next(new HttpError('Page Not Found', 404)));

// API error handling (returns JSON)
app.use('/api', (err, req, res, next) => {
  const data = isDev ? { message: err.message } : {};
  res.status(err.status || 500).send(data);
});

// General error handling
app.use((err, req, res, next) => {
  const data = isDev ? { message: err.message } : {};
  res.status(err.status || 500).render('error', data);
});

export default app;

if (require.main === module) {
  throw new Error("App should be started from bin/www not app.js");
}
