const mongoose = require('mongoose');

const houseSchema = new mongoose.Schema({
  address: {type: String},
  address2: {type: String},
  state: {type: String},
  zipcode: {type: String},
  year: {type: String},
  sqft: {type: String},
  pic1: {type: String},
  memo: {type: String},
});

module.exports = mongoose.model('House', houseSchema)
