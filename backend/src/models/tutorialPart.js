let mongoose = require('mongoose');

let tutorialPartSchema = new mongoose.Schema({
  topic:String,
  part:Number,
  question:String,
});

module.exports = mongoose.model('TutorialPart', tutorialPartSchema);