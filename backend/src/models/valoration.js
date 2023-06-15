let mongoose = require('mongoose');

let valorationSchema = new mongoose.Schema({
  questionId:String,
  value:Number,
});

module.exports = mongoose.model('Valoration', valorationSchema);