let mongoose = require('mongoose');

let userSchema = new mongoose.Schema({
  username: {type: String,unique: true,required: true,},
  password: {type: String,minlength: 6, required: true,},
  firstName: {type: String,required: true,},
  lastName: {type: String,required: true,},
  email: { type: String,required: true,},
  code: {type: mongoose.Types.ObjectId, ref: "Code",default: null},
  role: {type: String,required: false,},
  state: {type:String,default: "active",},
  initialLevel: {type:String,default: null,},
  refreshToken: {type: String,default: "",},
  profileImage: {type:String,default: "",},
  createdAt: {type:Date,default: Date.now},
});

module.exports = mongoose.model('User', userSchema);