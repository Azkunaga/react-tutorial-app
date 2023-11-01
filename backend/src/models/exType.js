const mongoose = require('mongoose');

let exTypeSchema = new mongoose.Schema({
  name: {type: String, unique: true},
  description: String,
  structure:String,
});

module.exports = mongoose.model('ExType', exTypeSchema);