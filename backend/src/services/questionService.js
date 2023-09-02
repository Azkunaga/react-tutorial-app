const mongodbConnection = require('../config/mongodb');
const question = require('../models/question');
const tutorialPartService = require('./tutorialService');
const exTypeService = require('./exTypeService');
const exLevelService = require('./exLevelService');

const valueQuestion = async (question,stars) => {
    try{
        mongodbConnection();
        const quest = await getQuestionById(question)
        const valoration = await valoration.create({
            question:quest,
            value:stars,
        })
        return valoration;
    }catch(error){
        console.log(error.message)
    }
}

const getQuestions = async (tutPart,type, difficulty) => {
    try{
        mongodbConnection();
        const tp = await tutorialPartService.getPart(tutPart);
        const ty = await exTypeService.getExType(type);
        const l = await exLevel.getExLevel(difficulty);
        const quest = await question.find({
            tutorialPart:tp,
            type:ty,
            difficulty: l,
            valid:false,
        })  
        return quest;
    }catch(error){
        console.log(error.message)
    }
}

const getQuestion = async()=>{

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
        await question.findOneAndUpdate({id:questionID}, {valid:false}, {
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
        const q = await question.findOne({
            id:questionID,
        }).populate("difficulty").populate("type");
        return q;
    }catch(error){
        console.log(error.message)
    }
}

const getQuestionsByPart = async(partId) => {
    try{
        mongodbConnection();
        const questions = question.find({
            tutorialPart:partId,
        }).populate('difficulty').populate('type');
        return questions;
    }catch(error){
        console.log(error.message)
    }
}

module.exports = {
    valueQuestion,
    getQuestions,
    getQuestion,
    addQuestion,
    validQuestion,
    deleteQuestion,
    getQuestionById,
    getQuestionsByPart
}