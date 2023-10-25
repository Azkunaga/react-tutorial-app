//tutorial parte bakoitzean erabiltzaileak
//daraman denbora eta errepikapenak

let mongoose = require('mongoose');

let partStatsSchema = new mongoose.Schema({
  tutorialPart:{
    type: mongoose.Types.ObjectId, ref: "TutorialPart",
  },
  user:{type: mongoose.Types.ObjectId, ref: "User"},
  done: {type:Boolean, default: false}, //part completed?
  duration: {type:Number, default: 0}, //seconds
  return: {type:Number, default: 0}, //return times
  createdAt:{
    type:Date,
    default: Date.now(),
  }
});

module.exports = mongoose.model('PartStats', partStatsSchema);