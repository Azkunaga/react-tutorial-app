const mongodbConnection = require('../config/mongodb');
const exType = require('../models/exType');

const addExType = async (name) => {
    try{
        mongodbConnection();
        const t = exype.create({
            name:name,
        })
        return t;
    }catch(error){
        console.log(error.message)
    }
}

const getExType = async (name) => {
    try{
        mongodbConnection();
        const t = exType.findOne({
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
}