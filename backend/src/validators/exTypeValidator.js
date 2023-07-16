const extypeService = require('../services/exTypeService');

const extypeExists =  async (req, res, next) => {
    if(!(req.body.extype && req.body.description)){
        return res.status(401).send({ message: "Wrong parameters" });
    }
    const extype = await extypeService.getExType(req.body.extype);
    if(extype){
        return res.status(409).send({ message: "ExType already exists" });
    }
    next();
}

module.exports = {
    extypeExists,
}