const bcrypt = require('bcrypt');
const jwt = require("jsonwebtoken");

const { searchUser, updateTokenFromUser } = require('../services/userService');

const login = async (req,res) => {
    //db comprobation
    try{
        const user = await searchUser(req.body.username);
        if(!user){
            res.status(400).send({ message: "User Not found." });
        }else if(user?.state=="disabled"){
            res.status(400).send({ message: "Bloqued user." });
        }else{
            //compare password
            var validPassword = bcrypt.compareSync(
                req.body.pwd,
                user.password
              );
        
            if (!validPassword) {
              return res.status(401).send({
                message: "Invalid Password!"
                });
              }

            const token = await jwt.sign(
                { username: user.username, role: user.role },
                process.env.JWT_SECRET,
                {
                  expiresIn: '10s', 
                }
              );
            const refreshToken = await jwt.sign(
                { username: user.username, role: user.role },
                process.env.JWT_R_SECRET,
                {
                  expiresIn: '1d',
                }
              );

              await updateTokenFromUser(user.username,refreshToken);

            res.cookie("jwt", refreshToken, 
            { httpOnly: true, 
              maxAge: 24 * 60 * 60 * 1000 });

            res.status(200).send({
              username:user.username,
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