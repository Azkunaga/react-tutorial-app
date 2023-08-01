let mongoose = require('mongoose');

let questionSchema = new mongoose.Schema({
  tutorialPart:{
    type: mongoose.Types.ObjectId, ref: "TutorialPart"
  },
  type:{
    type: mongoose.Types.ObjectId, ref: "ExType"
  },
  question:String,
  correctAnswer:String, //TODO
  difficulty:{
    type: mongoose.Types.ObjectId, ref: "ExLevel"
  },
  valid:Boolean,
});

module.exports = mongoose.model('Question', questionSchema);