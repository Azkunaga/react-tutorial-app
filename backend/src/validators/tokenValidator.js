require('dotenv').config({path: "env/.env.local"})
const jwt = require('jsonwebtoken');

const tokenValidator = (req, res, next) => {
    const authHeader = req.headers.authorization || req.headers.Authorization;
    if (!authHeader?.startsWith('Bearer ')){
        return res.status(401).send(); //invalid request
    }
    const token = authHeader.split(' ')[1];

    jwt.verify(
        token,
        process.env.JWT_SECRET,
        (err, decoded) => {
            if (err){
                return res.status(403).send(); //invalid token
            } 
            req.username = decoded.username;
            req.role = decoded.role;
            next();
        }
    );
}

module.exports = tokenValidator;