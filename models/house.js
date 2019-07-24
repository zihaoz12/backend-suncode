const mongoose = require('mongoose');

const houseSchema = mongoose.Schema({
  _id: mongoose.Schema.Types.ObjectId,
  street: String,
  address: { type : String },
  state: {type: String},
  zipcode: {type: String},
  year: {type: String},
  sqft: {type: String},
  productImage: { type: String, required: true },
  // productImage1: { type: String, required: true },
  // productImage2: { type: String, required: true },
  // productImage3: { type: String, required: true },
  // productImage4: { type: String, required: true },
  userId: {type: String}
});

module.exports = mongoose.model('House', houseSchema)


// const mongoose = require('mongoose');
//
// const houseSchema = new mongoose.Schema({
//   address: {type: String},
//   // address2: {type: String},
//   // state: {type: String},
//   // zipcode: {type: String},
//   // year: {type: String},
//   // sqft: {type: String},
//   pic1: {type: String},
//   // pic2: {type: String},
//   // pic3: {type: String},
//   // pic4: {type: String},
//   // memo: {type: String},
//   // attic: {type: String},
//   // whyear: {type: String},
//   // whef: {type: String},
//   // whfuel: {type: String},
//   // heatyear: {type: String},
//   // heatef: {type: String},
//   // heatfuel: {type: String},
//   // status: {type: String},
//   // memo2: {type: String},
//   // authorId: {type: String},
//   // authorname: { type: String},
//   // selectedFile: {}
// });
//
// module.exports = mongoose.model('House', houseSchema)
