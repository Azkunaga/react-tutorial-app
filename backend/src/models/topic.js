let mongoose = require('mongoose');

let topicSchema = new mongoose.Schema({
  name:String,
});

module.exports = mongoose.model('Topic', topicSchema);