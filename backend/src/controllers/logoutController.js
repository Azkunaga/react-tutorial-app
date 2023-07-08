require('dotenv').config({path: "env/.env.local"})

const { searchUserWithToken, updateTokenFromUser } = require('../services/userService');

const logout = async (req,res) => {
    const refToken = req.cookie?.jwt;
    try{
        if(!refToken){
            return res.sendStatus(204); //no content
        }else{
            const user = searchUserWithToken(refToken);
            if(user){
                updateTokenFromUser(user.username,null);
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