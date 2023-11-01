let mongoose = require('mongoose');

let topicSchema = new mongoose.Schema({
  name:{
    type:String,
    unique:true,
  },
  order: Number,
});

module.exports = mongoose.model('Topic', topicSchema);