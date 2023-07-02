const user = require('../models/user');
const mongodbConnection = require('../config/mongodb');

checkDuplicateUsernameOrEmail = (req, res, next) => {
    // Username
    mongodbConnection();
    console.log(user.find({username:req.body.username}));
    return;
    user.findOne({
      username: req.body.username
    }).then((u) => {
      if (u) {
        res.status(409).send({ message: "Failed! Username is already in use!" });
        return;
      }
      // Email
      user.findOne({
        email: req.body.email
      }).then((us) => {
        if (us) {
          res.status(409).send({ message: "Failed! Email is already in use!" });
          return;
        }
        next();
      });
    }).catch((err) =>{
        res.status(500).send({ message: err });
        return;
    });
  };
  
  const verifySignUp = {
    checkDuplicateUsernameOrEmail
  };
  
  module.exports = verifySignUp;