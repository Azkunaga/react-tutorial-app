let mongoose = require('mongoose');

let valorationSchema = new mongoose.Schema({
  user:{type: mongoose.Types.ObjectId, ref: "User"},
  question:{type: mongoose.Types.ObjectId, ref: "Question"},
  comment:String,
  value:Number,
  createdAt:{
    type:Date,
    default:Date.now(),
  }
});

module.exports = mongoose.model('Valoration', valorationSchema);