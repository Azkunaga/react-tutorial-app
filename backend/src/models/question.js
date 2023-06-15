let mongoose = require('mongoose');

let questionSchema = new mongoose.Schema({
  tutorialPart:String,
  question:String,
  valid:Boolean,
});

module.exports = mongoose.model('Question', questionSchema);