const mongoose = require('mongoose');

let codeSchema = new mongoose.Schema({
  code: String,
  teacher: {type: mongoose.Types.ObjectId, ref: "User"},
});

module.exports = mongoose.model('Code', codeSchema);