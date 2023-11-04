const jwt = require("jsonwebtoken");

const { searchUserWithToken } = require('../services/userService');

const refresh = async (req,res) => {
    const refToken = req.cookies?.jwt;
    try{
        if(!refToken){
            res.sendStatus(401);
        }else{
            const user = await searchUserWithToken(refToken);
            if(!user){
                res.sendStatus(403);
            }else{
                jwt.verify(
                    refToken,
                    process.env.JWT_R_SECRET,
                    (err, token) => {
                        if (err || user.username !== token.username){
                            return res.sendStatus(403);
                        } 
                        const accessToken = jwt.sign(
                            { username: token.username, role: token.role },
                            process.env.JWT_SECRET,
                            { expiresIn: '30min' }
                        );
                        res.json({accessToken});
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

module.exports = {refresh};