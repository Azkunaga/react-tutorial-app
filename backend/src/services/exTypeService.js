const mongodbConnection = require('../config/mongodb');
const exType = require('../models/exType');

const addExType = async (name,description) => {
    try{
        mongodbConnection();
        const t = await exType.create({
            name:name,
            description: description
        })
        return t;
    }catch(error){
        console.log(error.message)
    }
}

const getExType = async (name) => {
    try{
        mongodbConnection();
        const t = await exType.findOne({
            name:name,
        })
        return t;
    }catch(error){
        console.log(error.message)
    }
}

const getAll = async () => {
    try{
        mongodbConnection();
        const all = await exType.find();
        return all;
    }catch(error){
        console.log(error.message)
    }
}

const deleteExType = async (name) => {
    try{
        mongodbConnection();
        const t = await exType.deleteOne({
            name:name,
        })
        return t;
    }catch(error){
        console.log(error.message)
    }
}

module.exports = {
    addExType,
    getExType,
    getAll,
    deleteExType
}