let mongoose = require('mongoose');

let valorationSchema = new mongoose.Schema({
  question:{type: mongoose.Types.ObjectId, ref: "Question"},
  value:Number,
});

module.exports = mongoose.model('Valoration', valorationSchema);