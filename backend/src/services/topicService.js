const mongodbConnection = require('../config/mongodb');
const topic = require('../models/topic');
const tutorialService = require('./tutorialService');


const getMenu = async(username) => {
    try {
        mongodbConnection();
        const menu = [];
        const topics = await getAllTopics();
        await Promise.all(topics.map(async (topic)=>{
            const partsInfo = [];
            const parts = await tutorialService.getPartsByTopic(topic._id);
            let doneCount = 0;
            let tp = 0;
            await Promise.all(parts.map(async (part)=>{
                const done = await tutorialService.isDone(username,part._id);
                if(done){
                    doneCount++;
                }
                const progress = await tutorialService.getPartProgress(username, part._id);
                tp+=progress;
                partsInfo.push({
                    id:part._id,
                    name:part.name,
                    part: part.part,
                    progress:progress,
                })
            }))
            
            menu.push({
                id: topic._id,
                name: topic.name,
                order: topic.order,
                progress: tp/parts.length,
                count: doneCount,
                active:false,
                partsInfo
            })
        }))
        return menu;
    } catch (error) {
        console.log(error)
    }
}

const addTopic = async (name,order) => {
    try{
        mongodbConnection();
        const t = await topic.create({
            name:name,
            order:order,
        })
        return t;
    }catch(error){
        console.log(error)
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
        console.log(error)
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
        console.log(error)
    }
}

const deleteTopic = async (id) => {
    try{
        mongodbConnection();
        await tutorialService.deleteByTopic(id);
        await topic.deleteOne({
            _id:id,
        })
    }catch(error){
        console.log(error)
    }
}

const getAllTopics = async()=>{
    try{
        mongodbConnection();
        const t = await topic.find().sort({order: 'asc'});
        
        return t;
    }catch(error){
        console.log(error)
    }
}

const editTopic = async(id,newOrder,newName)=>{
    try{
        mongodbConnection();
        const t = await topic.findOneAndUpdate({_id:id},{order:newOrder,name:newName},{ new: true });
        return t;
    }catch(error){
        console.log(error)
    }
}

module.exports = {
    getMenu,    
    addTopic,
    getTopic,
    getTopicByName,
    getAllTopics,
    deleteTopic,
    editTopic
}