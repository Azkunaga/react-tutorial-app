const { Timestamp } = require('mongodb');
let mongoose = require('mongoose');

let userSchema = new mongoose.Schema({
  username: {
    type: String,
    unique: true,
    required: true,
  },
  password: {
    type: String,
    minlength: 6,
    required: true,
  },
  firstName: {
    type: String,
    required: true,
  },
  lastName: {
    type: String,
    required: true,
  },
  email: { 
    type: String,
    required: true,
  },
  code: {
    type: mongoose.Types.ObjectId, ref: "Code"
  },
  role: {
    type: String,
    required: false,
  },
  state: {
    type:String,
    default: "active",
  },
  refreshToken: {
    type: String,
  },
  profileImage: {
    data: Buffer,
    contentType: String
  },
  createdAt: {
    type:Date,
    default: Date.now,
  },
});

module.exports = mongoose.model('User', userSchema);