require('dotenv').config({path: "env/local.env"})

const bcrypt = require('bcrypt');
const jwt = require("jsonwebtoken");

const { searchUser } = require('../services/loginService');

const login = async (req,res,next) => {
    //db comprobation
    try{
        console.log("LoginController");
        const {username} = req.body;
        const user = await searchUser(username);

        if(!user){
            res.status(409).send({ message: "User Not found." });
        }else{
            //compare password
            var passwordIsValid = bcrypt.compareSync(
                req.body.pwd,
                user.password
              );
        
            if (!passwordIsValid) {
              return res.status(401).send({
                accessToken: null,
                message: "Invalid Password!"
                });
              }

            const token = jwt.sign(
                { id: user._id, username, role: user.role },
                jwtSecret,
                {
                  expiresIn: maxAge, // 3hrs in sec
                }
              );
            res.cookie("jwt", token, {
              httpOnly: true,
              maxAge: maxAge * 1000, // 3hrs in ms
              });

            res.status(200).send({
              user: user.id,
              username:username,
              role: user.role,
              accessToken: token,
              });

        }
    }catch(error){
        res.status(500).send({
            message: error.mesage,
          })
    }
}

module.exports = login;