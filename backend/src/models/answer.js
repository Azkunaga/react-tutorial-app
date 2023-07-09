const mongoose = require('mongoose');

let answerSchema = new mongoose.Schema({
  user:{type: mongoose.Types.ObjectId, ref: "User"},
  answer:String,
  answerToQuestion: {type: mongoose.Types.ObjectId, ref: "Question"},
  correct:Boolean,
});

module.exports = mongoose.model('Answer', answerSchema);