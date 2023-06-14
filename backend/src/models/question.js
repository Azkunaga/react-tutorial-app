let mongoose = require('mongoose');

let questionSchema = new mongoose.Schema({
  question:String,
});

module.exports = mongoose.model('Question', questionSchema);