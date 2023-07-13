const topic = require('../models/topic');
const tutorialPart = require('../models/tutorialPart');

const mongodbConnection = require('../config/mongodb');

const getPart = (topic,part) => {
    try{
        mongodbConnection();
        tutorialPart.findOne({topic: topic, part:part})
        return tutorialPart;
    }catch(error){
        console.log(error.message)
    }
}

const addPart = (topic,name,part,text) => {
    try{
        mongodbConnection();
        const t = topic.findOne({
            name:topic
        })
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

const deletePart = (partId) => {
    try{
        mongodbConnection();
        tutorialPart.deleteOne({
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