const tutorialService = require('../services/tutorialService');
const partStatsService = require('../services/partStatsService');
const questionService = require('../services/questionService');

const getLastPartId = async (req,res) => {
    try {
        const partId = await tutorialService.getLastPartId(req.body.user);
        res.status(200).send({
            partId,
        })
    } catch (error) {
        res.status(500).send({
            error
        })
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

const getPartsNamesAndId = async (req,res) => {
    try{
        const parts = await tutorialService.getPartsNamesAndId()
        if(!parts){
            res.status(401).send({
                message: "Part not found",
            })
        }else{
            res.status(200).send({
                parts
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

const completePart = async (req,res) => {
    try {
        const username = req.body.username;
        const partId = req.body.part;
        const duration = req.body.duration;
        const ps = await partStatsService.completePart(username,partId,duration);
        if(ps){
            const exercise = await questionService.getOneExerciseByPart(username,partId);
            res.status(200).send({
                exercise,
            })
        }else{
            res.status(500).send({
                error
            })
        }
       
    } catch (error) {
        res.status(500).send({
            error
        })
    }
}

const getNextPartId = async(req,res)=>{
    try{
        const next = await tutorialService.getNextPartId(req.body.partId);
        res.status(200).send({
            next,
        })
    }catch(error){
        res.status(500).send({
            error
        })
    }
}

module.exports = {
    getPartsNamesAndId,
    getLastPartId,
    getTutorialPartById,
    getTutorialPart,
    addTutorialPart,
    editTutorialPart,
    deleteTutorialPart,
    completePart,
    getNextPartId,
}