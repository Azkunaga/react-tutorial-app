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

const addQuestion = async (partId, questionStatement, type, level, questionAnswer, valid) => {
    try{
        mongodbConnection();
        const levelObj = await exLevelService.getExLevel(level);
        const typeObjt = await exTypeService.getExType(type);
        const quest = await question.create({
            tutorialPart:partId,
            type:typeObjt,
            difficulty:levelObj,
            question:questionStatement,
            correctAnswer: questionAnswer,
            valid:valid,
        })
        return quest; 
    }catch(error){
        console.log(error.message)
    }
}

const validQuestion = async (questionID) => {
    try{
        mongodbConnection();
        await question.findOneAndUpdate({_id:questionID}, {valid:true}, {
            new: true
          });
    }catch(error){
        console.log(error.message)
    }  
}

const deleteQuestion = async (questionID) => {
    try{
        mongodbConnection();
        const q = await question.deleteOne({
            _id:questionID,
        });
    }catch(error){
        console.log(error.message)
    }
}

const deleteByPart = async (partId) =>{
    try{
        mongodbConnection();
        const q = await question.deleteMany({
            tutorialPart:partId,
        });
    }catch(error){
        console.log(error.message)
    }
}

const getQuestionById = async (questionID) => {
    try{
        mongodbConnection();
        const q = await question.findOne({
            _id:questionID,
        }).populate("difficulty").populate("type");
        return q;
    }catch(error){
        console.log(error.message)
    }
}

const getValidQuestions = async (bool) => { 
    try{
        mongodbConnection();
        const q = await question.find({
            valid:bool,
        }).populate("type").populate("difficulty").populate({
            path : 'tutorialPart',
            populate : {
              path : 'topic'
            }
          }).sort({order:1});
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

const editQuestion = async(questId, level, type, valid, questionText, pAnswer) =>{
    try{
        mongodbConnection();
        const levelObj = await exLevelService.getExLevel(level);
        const typeObj = await exTypeService.getExType(type);
        const questions = await question.findOneAndUpdate(
            {_id:questId},
            {question:questionText,
            correctAnswer:pAnswer,
            valid: valid,
            difficulty:levelObj,
            type:typeObj},
            {new:true});
        return questions;
    }catch(error){
        console.log(error.message)
    }
}

module.exports = {
    valueQuestion,
    getValidQuestions,
    getQuestions,
    addQuestion,
    validQuestion,
    deleteQuestion,
    deleteByPart,
    getQuestionById,
    getQuestionsByPart,
    editQuestion
}