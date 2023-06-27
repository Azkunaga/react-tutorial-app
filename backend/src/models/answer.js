const mongoose = require('mongoose');

let answerSchema = new mongoose.Schema({
  user:String,
  answer:String,
  answerToQuestion: {type: mongoose.Types.ObjectId, ref: "Question"},
  correct:Boolean,
});                                                     111

module.exports = mongoose.model('Answer', answerSchema);