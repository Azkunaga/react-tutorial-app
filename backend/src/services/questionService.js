const valoration = require('../models/valoration');
const question = require('../models/question');
const topicService = require('./topicService');
const exTypeService = require('./exTypeService');
const mongodbConnection = require('../config/mongodb');

const valueQuestion = async (question,stars) => {
    try{
        mongodbConnection();
        const quest = getQuestionById(question)
        valoration.create({
            question:quest,
            value:stars,
        })
        return valoration;
    }catch(error){
        console.log(error.message)
    }
}

const getQuestion = async (topic,part) => {
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

const addQuestion = async (topic,type,level,question) => {
    try{
        mongodbConnection();
        let dif;
        if (level==="easy") {
            dif=1;
        }else if(level==="medium"){
            dif=2;
        }else{
            dif=3
        }
        const topicObj = exTypeService.getTopic(topic);
        const typeObjt = exTypeService.getType(type);
        const quest = question.create({
            topic:topicObj,
            type:typeObjt,
            difficluty:dif,
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

const getQuestionById = async (questionID) => {
    try{
        mongodbConnection();
        return question.findOne({
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
    getQuestionById
}