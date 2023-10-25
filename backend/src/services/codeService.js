const mongodbConnection = require('../config/mongodb');
const code = require('../models/code');

const addCode = async (userId, c) => {
    try{
        mongodbConnection();
        const check = await getCode(c);
        if(check){
            return null;
        }
        const t = await code.create({
            teacher:userId,
            code:c,
        })
        return t;
    }catch(error){
        console.log(error.message)
    }
}

const getCode = async (name) => {
    try{
        mongodbConnection();
        const t = await code.findOne({
            code:name,
        })
        return t;
    }catch(error){
        console.log(error.message)
    }
}

const getAll = async () => {
    try{
        mongodbConnection();
        const all = await code.find();
        return all;
    }catch(error){
        console.log(error.message)
    }
}

const deleteCode = async (name) => {
    try{
        mongodbConnection();
        const t = await code.deleteOne({
            code:name,
        })
        return t;
    }catch(error){
        console.log(error.message)
    }
}

const getCodesByTeacher = async (tId) => {
    try{
        mongodbConnection();
        const t = await code.find({
            teacher:tId,
        })
        return t;
    }catch(error){
        console.log(error.message)
    }
}

module.exports = {
    addCode,
    getCode,
    getCodesByTeacher,
    getAll,
    deleteCode
}