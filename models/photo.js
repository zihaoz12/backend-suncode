const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const photoSchema =  mongoose.Schema();
photoSchema.add({
    pic1: {type: String},
    // pic2: {type: String},
    // pic3: {type: String},
    // pic4: {type: String},
    authorId: {type: String},
    authorname: { type: String},
    testing: {type: String}
})

module.exports = mongoose.model('Photo', photoSchema)
