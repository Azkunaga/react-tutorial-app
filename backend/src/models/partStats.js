//tutorial parte bakoitzean erabiltzaileak
//daraman denbora eta errepikapenak

let mongoose = require('mongoose');

let partStatsSchema = new mongoose.Schema({
  tutorialPart:{
    type: mongoose.Types.ObjectId, ref: "TutorialPart"
  },
  user:{type: mongoose.Types.ObjectId, ref: "User"},
  duration: Number, //seconds
  return: Number, //return times
});

module.exports = mongoose.model('PartStats', partStatsSchema);