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
      }else{
        // Email
        user.findOne({
          email: req.body.email
        }).then(async (e) => {
          if (e) {
            return res.status(409).send({ message: "Failed! Email is already in use!" });
          }else{
            if(req.body.code){
              const codeObj = await codeService.getCode(req.body.code);
              if(!codeObj){
                return res.status(409).send({ message: "Failed! Class Code does not exist!" });
              }
            }

            next();
            
          }
        });
        
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