const topicService = require('./topicService');
const tutorialPart = require('../models/tutorialPart');

const mongodbConnection = require('../config/mongodb');

const getPart = async(topic,part) => {
    try{
        mongodbConnection();
        const tp = await tutorialPart.findOne({topic: topic, part:part})
        return tp;
    }catch(error){
        console.log(error.message)
    }
}

const addPart = async(topicName,name,part,text) => {
    try{
        mongodbConnection();
        const t = await topicService.getTopic(topicName);
        tutorialPart.create({
            topic:t,
            name:name,
            part:part,
            text:text,
        })
    }catch(error){
        console.log(error.message)
    }
}

const deletePart = async(partId) => {
    try{
        mongodbConnection();
        await tutorialPart.deleteOne({
            id:partId,
        })
    }catch(error){
        console.log(error.message)
    }
}

module.exports = {
    getPart,
    addPart,
    deletePart,
}