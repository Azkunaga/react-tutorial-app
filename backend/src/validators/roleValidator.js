const roleValidator = (...allowedRoles) => {
    return (req, res, next) => {
        if (!req?.role) return res.sendStatus(401);
        const rolesArray = [...allowedRoles];
        const result = rolesArray.includes(req.role).find(val => val === true);
        if (!result) return res.sendStatus(401);
        next();
    }
}

module.exports = roleValidator;