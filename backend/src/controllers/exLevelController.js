const exLevelService = require('../services/exLevelService');

const addExLevel = async (req,res) => {
    try{
        const newExLevel = await exLevelService.addExLevel(req.body.exlevel);
        res.status(200).send({
            message: "Level added Correctly",
            newExLevel,
          })
    }catch (error) {
        res.status(500).send({
        error: error.mesage, 
        })
    }
}

const getExLevel = async (req,res) => {
    try{
        const exlevel = await exLevelService.getExLevel(req.body.exlevel)
        if(!exlevel){
            res.status(401).send({
                message: "ExLevel not found",
                error: error.mesage,
            })
        }else{
            res.status(200).send({
                message: "ExLevel found",
                exlevel
              })
        }
        
    }catch (error) {
        res.status(500).send({
        error: error.mesage, 
        })
    }
}

const deleteExLevel = async (req,res) => {
    try{
        exLevelService.deleteExLevel(req.body.exlevel)
        res.status(200).send({
            message: "Deleted Correctly",
          })
    }catch (error) {
        res.status(500).send({
        error: error.mesage, 
        })
    }
}

module.exports = {
    addExLevel,
    getExLevel,
    deleteExLevel,
}