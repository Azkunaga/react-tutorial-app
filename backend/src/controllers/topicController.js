const topicService = require('../services/topicService');
const tutorialService = require('../services/tutorialService');

const addTopic = async (req,res) => {
    try{
        const newTopic = await topicService.addTopic(req.body.topic, req.body.order);
        res.status(200).send({
            message: "Correctly Added",
            newTopic,
          })
    }catch (error) {
        res.status(500).send({
        error: error.mesage, 
        })
    }
}

const getTopic = async (req,res) => {
    try{
        const topic = await topicService.getTopic(req.params.id);
        if(topic){
            res.status(200).send({
                message: "Topic found",
                topic,
              })
        }else{
            res.status(401).send({
                message: "Topic not found",
                error: error.mesage,
            })
        }
        
    }catch (error) {
        res.status(500).send({
            error: error.mesage, 
        })
    }
}

const deleteTopic = async (req,res) => {
    try{
        console.log('del contr')
        await topicService.deleteTopic(req.params.id)
        res.status(200).send({
            message: "Deleted Correctly",
          })
    }catch (error) {
        res.status(500).send({
        error: error.mesage, 
        })
    }
}

const getAllTopics = async(req,res) =>{
    try{
        const topics = await topicService.getAllTopics();
        res.status(200).send({
            topics,
          })
    }catch (error) {
        res.status(500).send({
        error: error.mesage, 
        })
    }
}

const getTopicParts = async(req,res) =>{
    try{
        const parts = await tutorialService.getPartsByTopic(req.body.topicId);
        res.status(200).send({
            parts,
          })
    }catch (error) {
        res.status(500).send({
            error: error.mesage, 
        })
    }
}

const editTopic = async(req,res) => {
    try{
        
        const updatedTopic = await topicService.editTopic(req.params.id, req.body.order, req.body.name);
        res.status(200).send({
            message: "Edited Correctly",
            topic:updatedTopic,
          })
    }catch (error) {
        res.status(500).send({
            error: error.mesage, 
        })
    }
}

module.exports = {
    addTopic,
    getTopic,
    getAllTopics,
    deleteTopic,
    getTopicParts,
    editTopic,
}