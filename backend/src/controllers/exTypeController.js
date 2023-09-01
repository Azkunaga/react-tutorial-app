const extypeService = require('../services/exTypeService');

const addExType = async (req,res) => {
    try{
        const newExType = await extypeService.addExType(req.body.extype, req.body.description);
        res.status(200).send({
            message: "Type added Correctly",
            newExType,
          })
    }catch (error) {
        res.status(500).send({
        error: error.mesage, 
        })
    }
}

const getExType = async (req,res) => {
    try{
        const extype = await extypeService.getExType(req.body.extype)
        if(!extype){
            res.status(401).send({
                message: "ExType not found",
                error: error.mesage,
            })
        }else{
            res.status(200).send({
                message: "ExType found",
                extype
              })
        }
        
    }catch (error) {
        res.status(500).send({
        error: error.mesage, 
        })
    }
}

const getAll = async (req,res) => {
    try{
        const types = await extypeService.getAll()
        res.status(200).send({
            types
            })
        
    }catch (error) {
        res.status(500).send({
        error: error.mesage, 
        })
    }
}

const deleteExType = async (req,res) => {
    try{
        extypeService.deleteExType(req.body.extype)
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
    addExType,
    getExType,
    deleteExType,
    getAll,
}