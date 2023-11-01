const mongoose = require('mongoose');

let exLevelSchema = new mongoose.Schema({
  name: {type: String, unique: true}
});

module.exports = mongoose.model('ExLevel', exLevelSchema);