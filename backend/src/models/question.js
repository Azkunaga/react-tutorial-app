let mongoose = require('mongoose');

let questionSchema = new mongoose.Schema({
  topic:String,
  question:String,
  valid:Boolean,
});

module.exports = mongoose.model('Question', questionSchema);