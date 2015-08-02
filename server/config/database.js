import Waterline from 'waterline';
import memory from 'sails-memory';

const waterline = new Waterline();

const Users = Waterline.Collection.extend({
  identity: 'user',
  connection: 'default',
  attributes: {
    username: 'string',
    email: 'string',
    password: 'string'
  }
});

const Things = Waterline.Collection.extend({
  identity: 'things',
  connection: 'default',
  attributes: {
    name: 'string',
    owner: {
      model: 'user'
    }
  }
});

export const config = {

  adapters: { memory },

  connections: {
    default: {
      adapter: 'memory'
    }
  },

  // The same as calling waterline.loadCollection on each of these
  collections: {
    Users,
    Things
  }

};

// What would be the best way to do this? We obviously don't want any other
// module to have to know about our waterline config. Just the waterline
// instance. Decided against this for now since it would provide confusion for
// anyone who saw the initialize method getting called with just one arg.
// waterline.initialize = waterline.initialize.bind(waterline, config);

export default waterline;
