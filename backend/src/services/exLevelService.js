const mongodbConnection = require('../config/mongodb');
const exLevel = require('../models/exLevel');

const addExLevel = async (name) => {
    try{
        mongodbConnection();
        const t = await exLevel.create({
            name:name,
        })
        return t;
    }catch(error){
        console.log(error.message)
    }
}

const getExLevel = async (name) => {
    try{
        mongodbConnection();
        const t = await exLevel.findOne({
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
        const all = await exLevel.find();
        return all;
    }catch(error){
        console.log(error.message)
    }
}

const deleteExLevel = async (name) => {
    try{
        mongodbConnection();
        const t = await exLevel.deleteOne({
            name:name,
        })
        return t;
    }catch(error){
        console.log(error.message)
    }
}

module.exports = {
    addExLevel,
    getExLevel,
    getAll,
    deleteExLevel
}