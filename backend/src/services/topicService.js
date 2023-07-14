const mongodbConnection = require('../config/mongodb');
const topic = require('../models/topic');

const addTopic = async (name) => {
    try{
        mongodbConnection();
        const t = topic.create({
            name:name,
        })
        return t;
    }catch(error){
        console.log(error.message)
    }
}

const getTopic = async (name) => {
    try{
        mongodbConnection();
        const t = topic.findOne({
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
}