require('dotenv').config({path: "env/.env.local"})

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
            var validPassword = bcrypt.compareSync(
                req.body.pwd,
                user.password
              );
        
            if (!validPassword) {
              return res.status(401).send({
                accessToken: null,
                message: "Invalid Password!"
                });
              }

            const token = jwt.sign(
                { username: user.username, role: user.role },
                process.env.JWT_SECRET,
                {
                  expiresIn: '30min', 
                }
              );
            const refreshToken = jwt.sign(
                { username: user.username, role: user.role },
                process.env.JWT_R_SECRET,
                {
                  expiresIn: '1d',
                }
              );

            res.cookie("jwt", refreshToken, {
              httpOnly: true,
              maxAge: 24 * 60 * 60 * 1000, // 24h
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