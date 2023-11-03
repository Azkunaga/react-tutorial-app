const topicService = require('../services/topicService');
const tutorialService = require('../services/tutorialService');

const getMenu  = async (req,res) =>{
    try {
        const menu = await topicService.getMenu(req.body.username);
        if(menu.menu){
            res.status(200).send({
                menu,
              })
        }else{
            res.status(401).send({
                message:"Menu no available",
              })
        }
    } catch (error) {
        res.status(500).send({
            error, 
        })
    }
}

const addTopic = async (req,res) => {
    try{
        const newTopic = await topicService.addTopic(req.body.topic, req.body.order);
        res.status(200).send({
            message: "Correctly Added",
            newTopic,
          })
    }catch (error) {
        res.status(500).send({
            error 
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
            error
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
        error
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
        error
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
            error
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
            error
        })
    }
}
 
const getNextPartId = async (req,res)=>{
    try{
        console.log(req.body.partId);
        const next = await topicService.getNextPartId(req.body.partId);
        console.log("Next",next);
        res.status(200).send({
            next
        })
    }catch (error) {
        res.status(500).send({
            error
        })
    }
}

module.exports = {
    getMenu,
    addTopic,
    getTopic,
    getAllTopics,
    deleteTopic,
    getTopicParts,
    editTopic,
    getNextPartId,
}