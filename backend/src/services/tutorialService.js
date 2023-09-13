const topicService = require('./topicService');
const tutorialPart = require('../models/tutorialPart');

const mongodbConnection = require('../config/mongodb');

const getPart = async(partName) => {
    try{
        mongodbConnection();
        const tp = await tutorialPart.findOne({name: partName})
        return tp;
    }catch(error){
        console.log(error.message)
    }
}

const getPartById = async(id) =>{
    try{
        mongodbConnection();
        console.log(id);
        const tp = await tutorialPart.findOne({_id: id})
        return tp;
    }catch(error){
        console.log(error.message)
    }
}

const addPart = async(topicName,name,part,text) => {
    try{
        mongodbConnection();
        const t = await topicService.getTopicByName(topicName);
        if(!t){
            return null;
        }
        const tp = tutorialPart.create({
            topic:t,
            name:name,
            part:part,
            text:text,
        })
        return tp;
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

const editPart = async(id,part,name,text) =>{
    try{
        mongodbConnection();
        const t = await tutorialPart.findOneAndUpdate({_id:id},{part:part,name:name,text:text},{ new: true });
        return t;
    }catch(error){
        console.log(error.message)
    }
}

const getPartsByTopic = async(topicId) =>{
    try{
        mongodbConnection();
        const parts = await tutorialPart.find({
            topic:topicId,
        })
        return parts;
    }catch(error){
        console.log(error.message)
    }
}

module.exports = {
    getPartById,
    getPart,
    addPart,
    deletePart,
    editPart,
    getPartsByTopic,
}