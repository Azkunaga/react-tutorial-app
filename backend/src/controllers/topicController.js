const topicService = require('../services/topicService');

const addTopic = async (req,res) => {
    try{
        const newTopic = await topicService.addTopic(req.body.topic, req.body.order);
        res.status(200).send({
            message: " Correctly",
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
        console.log('controller');
        const topic = await topicService.getTopic(req.body.topic)
        if(!topic){
            res.status(401).send({
                message: "Topic not found",
                error: error.mesage,
            })
        }else{
            res.status(200).send({
                message: "Topic found",
                topic
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
        topicService.deleteTopic(req.body.topic)
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
    addTopic,
    getTopic,
    deleteTopic,
}