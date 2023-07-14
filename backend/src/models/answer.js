const mongoose = require('mongoose');

let answerSchema = new mongoose.Schema({
  user:{type: mongoose.Types.ObjectId, ref: "User"},
  answer:String,
  duration: Number, //seconds
  answerToQuestion: {type: mongoose.Types.ObjectId, ref: "Question"},
  correct:Boolean,
  help:Boolean,
  correction: String,
});

module.exports = mongoose.model('Answer', answerSchema);