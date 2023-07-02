require('dotenv').config({path: "env/local.env"})

const bcrypt = require('bcrypt');
const jwt = require("jsonwebtoken");

const searchUser = require('../services/loginService');

const login = async (req,res) => {
    //db comprobation
    try{
        const user = await searchUser(req.body.username);
        if(!user){
            res.status(404).send({ message: "User Not found." });
        }else{
            //compare password
            var passwordIsValid = bcrypt.compareSync(
                req.body.password,
                user.password
              );
        
              if (!passwordIsValid) {
                return res.status(401).send({
                  accessToken: null,
                  message: "Invalid Password!"
                });
              }
        
              var token = jwt.sign({ id: user.id },  process.env.SECRET, {
                expiresIn: 86400 // 24 hours
              });

              res.status(200).send({
                id: user.id,
                username: user.username,
                email: user.email,
                roles: user.role, //TODO
                accessToken: token
              });

        }
    }catch(error){
        res.status(500).send({
            error: error.mesage,
          })
    }
}

module.exports = login;