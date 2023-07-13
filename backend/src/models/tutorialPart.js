let mongoose = require('mongoose');

let tutorialPartSchema = new mongoose.Schema({
  topic:{
    type: mongoose.Types.ObjectId, ref: "Topic"
  },
  name: String,
  part: Number,
  text: String,
});

module.exports = mongoose.model('TutorialPart', tutorialPartSchema);