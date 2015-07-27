import bookshelfFactory from 'bookshelf';
import knexFactory from 'knex';

import PACKAGE from '../../package.json';

/**
 * Create the database connection.
 *
 * NOTE: A db named PACKAGE.name + '-db' must already exist in the database. It
 * does not appear that it can be created from knex.
 */
const knex = knexFactory({
  client: 'pg',
  debug: process.env.NODE_ENV === 'development',
  connection: {
    host: 'localhost',
    port: 5432,
    user: 'postgres',
    password: '',
    database: PACKAGE.name + '-db'
  }
});

export default bookshelfFactory(knex);
