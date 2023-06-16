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

const getQuestions = async (topic,part) => {
    try{
        mongodbConnection();
        question.create({
            topic:topic,
            question:question,
            valid:false,
        })  
    }catch(error){
        console.log(error.message)
    }
}

const addQuestion = async (topic,question) => {
    try{
        mongodbConnection();
        question.create({
            topic:topic,
            question:question,
            valid:false,
        })  
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
    getQuestions,
    addQuestion,
    validQuestion,
    deleteQuestion,
}