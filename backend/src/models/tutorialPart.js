let mongoose = require('mongoose');

let tutorialPartSchema = new mongoose.Schema({
  topic:{
    type: mongoose.Types.ObjectId, ref: "Topic"
  },
  name: {type: String, unique: true},
  part: Number,
  text: String,
});

module.exports = mongoose.model('TutorialPart', tutorialPartSchema);