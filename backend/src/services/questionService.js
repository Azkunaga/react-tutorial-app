const valoration = require('../models/valoration');
const question = require('../models/question');
const mongodbConnection = require('../config/mongodb');

const valueQuestion = async (question,stars) => {
    try{
        mongodbConnection();
        valoration.create({
            questionId:question,
            value:stars,
        })
        return valoration;
    }catch(error){
        console.log(error.message)
    }
}

//TODO
const getQuestion = async (topic,part,user) => {
    try{
        mongodbConnection();
        const quest = question.find({
            topic:topic,
            part:part,
            valid:false,
        })  
        return quest;
    }catch(error){
        console.log(error.message)
    }
}

const addQuestion = async (topic,question) => {
    try{
        mongodbConnection();
        const quest = question.create({
            topic:topic,
            question:question,
            valid:false,
        }) 
        return quest; 
    }catch(error){
        console.log(error.message)
    }
}

const validQuestion = async (questionID) => {
    try{
        mongodbConnection();
        await question.findOneAndUpdate({id:questionID}, {valid:true}, {
            new: true
          });
    }catch(error){
        console.log(error.message)
    }  
}

const deleteQuestion = async (questionID) => {
    try{
        mongodbConnection();
        question.deleteOne({
            id:questionID,
        })
    }catch(error){
        console.log(error.message)
    }
}

module.exports = {
    valueQuestion,
    getQuestion,
    addQuestion,
    validQuestion,
    deleteQuestion,
}