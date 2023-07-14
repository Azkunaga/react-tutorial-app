let mongoose = require('mongoose');

let questionSchema = new mongoose.Schema({
  topic:{
    type: mongoose.Types.ObjectId, ref: "Topic"
  },
  type:{
    type: mongoose.Types.ObjectId, ref: "ExType"
  },
  question:String,
  difficluty:Number, //1-3 easy,medium,difficult
  valid:Boolean,
});

module.exports = mongoose.model('Question', questionSchema);