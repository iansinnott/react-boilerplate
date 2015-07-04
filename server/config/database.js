import mongoose from 'mongoose';

const DB_NAME = require('../../package.json').name + '-db';

mongoose.connect('mongodb://localhost/' + DB_NAME);

const db = mongoose.connection;

db.on('error', ::console.error);

export default db;
