const tutorialService = require('../services/tutorialService')


const getLastPartId = async (req,res) => {
    try {
        console.log("contr last");
        const partId = await tutorialService.getLastPartId(req.body.user);
        if(!partId){
            res.status(200).send({
                message: "Part not found",
                partId:"start",
            })
        }else{
            res.status(200).send({
                message: "Part found",
                partId
            })
        }
    } catch (error) {
        
    }
}

const getTutorialPart = async (req,res) => {
    try{
        const part = await tutorialService.getPart(req.body.topic,req.body.part)
        if(!part){
            res.status(401).send({
                message: "Part not found",
            })
        }else{
            res.status(200).send({
                message: "Part found",
                user
              })
        }
        
    }catch (error) {
        res.status(500).send({
            error
        })
    }
}

const getTutorialPartById = async(req,res) =>{
    try{
        const part = await tutorialService.getPartById(req.params.id)
        if(!part){
            res.status(401).send({
                message: "Part not found",
            })
        }else{
            res.status(200).send({
                message: "Part found",
                part
              })
        }
        
    }catch (error) {
        res.status(500).send({
            error
        })
    }
}

//admin galdera berriak sartzeko
const addTutorialPart = async (req,res) => {
    try{
        const part = await tutorialService.addPart(req.body.topicId,req.body.name,req.body.part,req.body.text);
        if(!part){
            res.status(500).send({
                message: "Something went wrong",
              })
        }else{
            res.status(200).send({
                message: "Added Correctly",
                part
              })
        }

    }catch (error) {
        res.status(500).send({
        error
        })
    }
}


const editTutorialPart = async(req,res) => {
    try{
        const updatedPart = await tutorialService.editPart(req.params.id, req.body.part, req.body.name, req.body.text);
        res.status(200).send({
            message: "Edited Correctly",
            part:updatedPart,
          })
    }catch (error) {
        res.status(500).send({
            error
        })
    }
}

//admin galdera berriak sartzeko
const deleteTutorialPart = async (req,res) => {
    try{
        await tutorialService.deletePart(req.params.id)
        res.status(200).send({
            message: "Deleted Correctly",
          })
    }catch (error) {
        res.status(500).send({
        error
        })
    }
}

module.exports = {
    getLastPartId,
    getTutorialPartById,
    getTutorialPart,
    addTutorialPart,
    editTutorialPart,
    deleteTutorialPart,
}