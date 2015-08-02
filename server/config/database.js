import mongoose from 'mongoose';
import mpromise from 'mongoose/node_modules/mpromise';

// Promise hack to allow using .catch with mongoose promises. It's complete
// insanity that mpromise still does not support catch and that Mongoose insists
// on using this lame library. As such it is necessary to take matters into our
// own hands.
//
// See: https://github.com/Automattic/mongoose/issues/2917
mpromise.prototype.catch = function(onReject) {
  return this.then(undefined, onReject);
};

const DB_NAME = require('../../package.json').name + '-db';

mongoose.connect('mongodb://localhost/' + DB_NAME);

const db = mongoose.connection;

db.on('error', ::console.error);

export default db;
