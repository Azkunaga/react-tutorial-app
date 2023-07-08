const roleValidator = (permittedRole) => {
    return (req, res, next) => {
        if (!req?.role || permittedRole!==req.role){
            return res.sendStatus(401);
        } 
        next();
    }
}

module.exports = roleValidator;