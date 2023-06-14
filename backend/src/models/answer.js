let mongoose = require('mongoose');

let answerSchema = new mongoose.Schema({
  answer:String,
  answerToQuestion:String,
});

module.exports = mongoose.model('Answer', answerSchema);