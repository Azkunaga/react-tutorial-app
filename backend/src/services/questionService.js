const valoration = require('../models/valoration');
const question = require('../models/question');
const tutorialService = require('./tutorialService');
const exTypeService = require('./exTypeService');
const exLevelService = require('./exLevelService');
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

const addQuestion = async (tutPart,type,level,questionStatement, questionAnswer) => {
    try{
        mongodbConnection();
        const levelObj = await exLevelService.getExLevel(level);
        const partObj = await tutorialService.getPart(tutPart);
        const typeObjt = await exTypeService.getExType(type);
        const quest = await question.create({
            tutorialPart:partObj,
            type:typeObjt,
            difficulty:levelObj,
            question:questionStatement,
            correctAnswer: questionAnswer,
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