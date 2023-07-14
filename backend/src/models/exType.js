const mongoose = require('mongoose');

let exTypeSchema = new mongoose.Schema({
  name: String,
  description: String,
});

module.exports = mongoose.model('ExType', exTypeSchema);