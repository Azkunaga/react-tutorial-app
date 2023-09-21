const tutorialPart = require('../models/tutorialPart');
const topic = require('../models/topic');
const questionService = require('./questionService')

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

const addPart = async(topicId,name,part,text) => {
    try{
        mongodbConnection();
        const t =  await topic.findOne({
            _id:topicId,
        })
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
        await questionService.deleteByPart(partId);
        await tutorialPart.deleteOne({
            _id:partId,
        })
    }catch(error){
        console.log(error.message)
    }
}

const deleteByTopic = async (topicId) => {
    try{
        console.log("deletebytopic")
        mongodbConnection();
        const parts = await getPartsByTopic(topicId);
        await parts.forEach(async element => {
            await deletePart(element._id);
        });
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
    deleteByTopic,
    editPart,
    getPartsByTopic,
}