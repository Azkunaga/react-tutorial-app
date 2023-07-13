const { getPart, addPart, deletePart} = require('../services/tutorialService')

//app
const getTutorialPart = async (req,res) => {
    try{
        const part = getPart(req.body.topic,req.body.part)
        if(!part){
            res.status(401).send({
                message: "Part not found",
                error: error.mesage,
            })
        }else{
            res.status(200).send({
                message: "Part found",
                user
              })
        }
        
    }catch (error) {
        res.status(500).send({
        error: error.mesage, 
        })
    }
}

//admin galdera berriak sartzeko
const addTutorialPart = async (req,res) => {
    try{
        addPart(req.body.topic,req.body.name,req.body.part,req.body.text)
        res.status(200).send({
            message: "Added Correctly",
          })
    }catch (error) {
        res.status(500).send({
        error: error.mesage, 
        })
    }
}

//admin galdera berriak sartzeko
const deleteTutorialPart = async (req,res) => {
    try{
        deletePart(req.body.questionId)
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
    getTutorialPart,
    addTutorialPart,
    deleteTutorialPart,
}