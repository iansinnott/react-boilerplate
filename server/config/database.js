import Waterline from 'waterline';
import disk from 'sails-disk';

export const waterline = new Waterline();

const Users = Waterline.Collection.extend({
  identity: 'user',
  tableName: 'users',
  connection: 'default',
  attributes: {
    username: 'string',
    email: 'string',
    password: 'string',
  },
});

// Note: For some reason identities and table name must be lower case
const Things = Waterline.Collection.extend({
  identity: 'thing',
  tableName: 'things',
  connection: 'default',
  attributes: {
    name: 'string',
    owner: {
      model: 'user',
    },
  },
});

export const config = {
  adapters: { disk },
  connections: {
    default: {
      adapter: 'disk',
    },
  },
};

waterline.loadCollection(Users);
waterline.loadCollection(Things);

// What would be the best way to do this? We obviously don't want any other
// module to have to know about our waterline config. Just the waterline
// instance. Decided against this for now since it would provide confusion for
// anyone who saw the initialize method getting called with just one arg.
// waterline.initialize = waterline.initialize.bind(waterline, config);
