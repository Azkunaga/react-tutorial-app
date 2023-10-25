const mongoose = require('mongoose');

let recommendationSchema = new mongoose.Schema({
  user:{type: mongoose.Types.ObjectId, ref: "User"},
  question:String,
  answer:String,
  createdAt:{
    type:Date,
    default:Date.now(),
  }
});

module.exports = mongoose.model('Recommendation', recommendationSchema);