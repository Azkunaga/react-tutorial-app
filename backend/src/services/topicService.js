const mongodbConnection = require('../config/mongodb');
const topic = require('../models/topic');
const tutorialService = require('./tutorialService');

const addTopic = async (name,order) => {
    try{
        mongodbConnection();
        const t = await topic.create({
            name:name,
            order:order,
        })
        return t;
    }catch(error){
        console.log(error.message)
    }
}

const getTopic = async (topicId) => {
    try{
        mongodbConnection();
        const t = await topic.findById({
            _id:topicId,
        })
        return t;
    }catch(error){
        console.log(error.message)
    }
}

const getTopicByName = async(tName)=>{
    try{
        mongodbConnection();
        const t = await topic.findOne({
            name:tName,
        })
        return t;
    }catch(error){
        console.log(error.message)
    }
}

const deleteTopic = async (id) => {
    try{
        console.log('del serv')
        mongodbConnection();
        await tutorialService.deleteByTopic(id);
        await topic.deleteOne({
            _id:id,
        })
    }catch(error){
        console.log(error.message)
    }
}

const getAllTopics = async()=>{
    try{
        mongodbConnection();
        const t = await topic.find();
        return t;
    }catch(error){
        console.log(error.message)
    }
}

const editTopic = async(id,newOrder,newName)=>{
    try{
        mongodbConnection();
        const t = await topic.findOneAndUpdate({_id:id},{order:newOrder,name:newName},{ new: true });
        return t;
    }catch(error){
        console.log(error.message)
    }
}

module.exports = {
    addTopic,
    getTopic,
    getTopicByName,
    getAllTopics,
    deleteTopic,
    editTopic
}