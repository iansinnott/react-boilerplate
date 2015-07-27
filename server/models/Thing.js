import db from '../config/database.js';

/**
 * @module Thing
 *
 * Example of defining a model with mongoose
 */
// const schema = new Schema({
//   owner: Schema.Types.ObjectId,
//   members: [Schema.Types.ObjectId],
//   read: { type: Boolean, default: false },
//   created: { type: Date, default: Date.now },
//   updated: { type: Date, default: Date.now }
// });

const Thing = db.Model.extend({
  tableName: 'thing'
});

export default Thing;
