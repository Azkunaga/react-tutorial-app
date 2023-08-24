const mongodbConnection = require('../config/mongodb');
const code = require('../models/code');
const userService = require("./userService");

const addCode = async (name) => {
    try{
        mongodbConnection();
        const t = await code.create({
            code:name,
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

const getCodesByTeacher = async (teacher) => {
    try{
        mongodbConnection();
        const t = await userService.searchUser(teacher);
        const codes = await code.findOne({
            teacher: t,
        })
        return codes;
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

module.exports = {
    addCode,
    getCode,
    getCodesByTeacher,
    getAll,
    deleteCode
}