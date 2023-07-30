const mongodbConnection = require('../config/mongodb');
const exLevel = require('../models/exLevel');

const addExLevel = async (name) => {
    try{
        mongodbConnection();
        const t = exLevel.create({
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
        const t = exLevel.findOne({
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
        const all = exLevel.find();
        return all;
    }catch(error){
        console.log(error.message)
    }
}

const deleteExLevel = async (name) => {
    try{
        mongodbConnection();
        const t = exLevel.deleteOne({
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