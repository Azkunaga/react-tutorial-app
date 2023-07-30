const exlevelService = require('../services/exLevelService');

const exlevelExists =  async (req, res, next) => {
    if(!req.body.exlevel){
        return res.status(401).send({ message: "Wrong parameters" });
    }
    const exlevel = await exlevelService.getExLevel(req.body.exlevel);
    if(exlevel){
        return res.status(409).send({ message: "ExLevel already exists" });
    }
    next();
}

module.exports = {
    exlevelExists,
}