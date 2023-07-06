require('dotenv').config({path: "env/.env.local"})

const jwt = require("jsonwebtoken");

const { searchUserWithToken, deleteTokenFromUser } = require('../services/userService');

const logout = async (req,res,next) => {
    const cookie = req.cookie;
    const refToken = cookie?.jwt;
    try{
        if(!refToken){
            return res.sendStatus(204); //no content
        }else{
            const user = searchUserWithToken(refToken);
            if(user){
                deleteTokenFromUser(user.username);
            }
            res.clearCookie('jwt', { httpOnly: true, sameSite: 'None', secure: true });
            res.sendStatus(204);
        }
    }catch(error){
        res.status(500).send({
            message: error.mesage, 
          })
    }
}

module.exports = logout;