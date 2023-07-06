require('dotenv').config({path: "env/.env.local"})

const jwt = require("jsonwebtoken");

const { searchUserWithToken } = require('../services/userService');

const refresh = async (req,res,next) => {
    const cookie = req.cookie
    //db comprobation
    const refToken = cookie?.jwt
    try{
        if(!refToken){
            res.sendStatus(401);
        }else{
            const username = cookie.username;
            const user = searchUserWithToken(refToken);
            if(!user){
                res.sendStatus(403);
            }else{
                jwt.verify(
                    refToken,
                    process.env.REFRESH_TOKEN_SECRET,
                    (err, decoded) => {
                        if (err || user.username !== decoded.username) return res.sendStatus(403);
                        const accessToken = jwt.sign(
                            { username: decoded.username, role: decoded.role },
                            process.env.ACCESS_TOKEN_SECRET,
                            { expiresIn: '30min' }
                        );
                        res.json({ accessToken })
                    }
                );
            }
            

        }
    }catch(error){
        res.status(500).send({
            message: error.mesage,
          })
    }
}

module.exports = refresh;