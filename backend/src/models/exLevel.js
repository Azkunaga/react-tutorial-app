const mongoose = require('mongoose');

let exLevelSchema = new mongoose.Schema({
  name: String,
});

module.exports = mongoose.model('ExLevel', exLevelSchema);