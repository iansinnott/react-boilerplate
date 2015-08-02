// Note: Using destructuring to import the `model` method will break.
import mongoose, { Schema } from 'mongoose';

/**
 * @module Thing
 *
 * Example of defining a model with mongoose
 */
const schema = new Schema({
  name: String,
  read: { type: Boolean, default: false },
  created: { type: Date, default: Date.now },
  updated: { type: Date, default: Date.now }
});

export default mongoose.model('Thing', schema);
