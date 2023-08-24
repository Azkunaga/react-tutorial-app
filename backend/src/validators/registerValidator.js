const user = require('../models/user');
const mongodbConnection = require('../config/mongodb');
const codeService = require('../services/codeService');

checkDuplicateUsernameOrEmail = async(req, res, next) => {
    // Username
    mongodbConnection();
    user.findOne({
      username: req.body.username
    }).then(async (u) => {
      //username
      if (u) {
        return res.status(409).send({ message: "Failed! Username is already in use!" });
      }
      // Email
      user.findOne({
        email: req.body.email
      }).then((u) => {
        if (u) {
          res.status(409).send({ message: "Failed! Email is already in use!" });
          return;
        }
        next();
      });

      
      if(ereq.body.code){
        const codeObj = await codeService.getCode(req.body.code);
        if(!codeObj){
          res.status(409).send({ message: "Failed! Class Code does not exist!" });
        }
      }


    }).catch((err) =>{
        res.status(500).send({ message: err });
        return;
    });
  };
  
  const verifySignUp = {
    checkDuplicateUsernameOrEmail
  };
  
  module.exports = verifySignUp;