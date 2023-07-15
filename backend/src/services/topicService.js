const mongodbConnection = require('../config/mongodb');
const topic = require('../models/topic');

const addTopic = async (name,order) => {
    try{
        mongodbConnection();
        const t = await topic.create({
            name:name,
            order:order,
        })
        console.log(t);
        return t;
    }catch(error){
        console.log(error.message)
    }
}

const getTopic = async (name) => {
    try{
        mongodbConnection();
        const t = await topic.findOne({
            name:name,
        })
        return t;
    }catch(error){
        console.log(error.message)
    }
}

const deleteTopic = async (name) => {
    try{
        mongodbConnection();
        await topic.deleteOne({
            name:name,
        })
        return t;
    }catch(error){
        console.log(error.message)
    }
}

module.exports = {
    addTopic,
    getTopic,
    deleteTopic
}