import express from 'express';
import morgan from 'morgan';
import bodyParser from 'body-parser';
import compression from 'compression';

import config from '../webpack.config';
import devConfig from '../webpack.dev.config';
import api from './api';

let app = express();

let publicPath;

if (process.env.NODE_ENV === 'development')
  publicPath = devConfig.output.publicPath;
else
  publicPath = config.output.publicPath;

// Configure the server
app.use(compression());
app.use(express.static('public', { index: false })); // Not using a full path is important
app.set('view engine', 'jade');
app.set('views', 'server/views');
app.set('port', process.env.PORT || 3000);
app.use(morgan(process.env.NODE_ENV === 'development' ? 'dev' : 'combined'));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

// Mount the API
app.use('/api', api);

// Send the boilerplate HTML file down for all get requests that aren't to the
// API.
app.get('*', (req, res) => {
  res.render('index', { scriptPath: publicPath + 'app.js' });
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

export default app;

// If this file is called directly run the server.
if (require.main === module) {
  app.listen(app.get('port'), () => console.log('App listening'));
}

