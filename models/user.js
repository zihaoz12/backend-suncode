const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  // _id: mongoose.Schema.Types.ObjectId,
  username: {type: String},
  email: {
    type: String,
    // required: true,
    // unique: true,
    // match: /[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/
  },
  password: {type: String},
  name: {type: String},
  // house: { type: mongoose.Schema.Types.ObjectId, ref: 'house'},
  userId: {type: String}
});


module.exports = mongoose.model('User', userSchema)
