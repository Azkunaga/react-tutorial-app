let mongoose = require('mongoose');

let answerSchema = new mongoose.Schema({
  user:String,
  answer:String,
  answerToQuestion:String,
  correct:Boolean,
});

module.exports = mongoose.model('Answer', answerSchema);