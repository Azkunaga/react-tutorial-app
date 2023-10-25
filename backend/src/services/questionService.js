const mongodbConnection = require('../config/mongodb');
const question = require('../models/question');
const exTypeService = require('./exTypeService');
const exLevelService = require('./exLevelService');
const answerService = require('./answerService');
const userService = require('./userService');
const valorationService = require('./valorationService');
const {getRandom} = require('../util/random')

const valueQuestion = async (username,questionId,stars,comment) => {
    try{
        mongodbConnection();
        console.log(username,questionId,stars,comment);
        const u = await userService.searchUser(username);
        const val = await valorationService.createValoration(u._id,questionId,stars,comment);
        return val;
    }catch(error){
        console.log(error.message)
    }
}

const getQuestions = async (partId, typeId, valid) => {
    try{
        mongodbConnection();
        const quest = await question.find({
            tutorialPart:partId,
            type:typeId,
            valid:valid,
        })  
        return quest;
    }catch(error){
        console.log(error.message)
    }
}

const getQuestions2 = async (partId,typeId) => {
    try{
        mongodbConnection();
        const quest = await question.find({
            tutorialPart:partId,
            type:typeId,
        }).select('question');
        return quest;
    }catch(error){
        console.log(error.message)
    }
}

const addQuestion = async (partId, type, level, quest, questionAnswer, valid) => {
    try{
        mongodbConnection();
        const levelObj = await exLevelService.getExLevel(level);
        const typeObjt = await exTypeService.getExType(type);
        const q = await question.create({
            tutorialPart:partId,
            type:typeObjt._id,
            difficulty:levelObj._id,
            question:quest,
            correctAnswer: questionAnswer,
            valid:valid,
        })
        return q; 
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


const getValidQuestionsByPart = async(partId) => {
    try{
        mongodbConnection();
        const questions = question.find({
            tutorialPart:partId,
            valid:true,
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

const getOneExerciseByPart = async (username,partId) =>{
    try{
        const questions = await getQuestionsNotDone(username,partId);
        if(questions.length>0){
            const finalQuest = getRandom(questions);
            return finalQuest?._id;
        }else{
            return "new";
        }

    }catch(error){
        console.log(error.message)
    }
}

const getNextQuestionsByPart = async (username, partId, questId) => {
    try {
        console.log("Getting not done questions:");
        let questions = await getQuestionsNotDone(username,partId);
        if(questions.length>1){
            questions = questions.filter(ques => String(ques._id)!==questId);
        }
        if(questions.length>0){
            const finalQuest = getRandom(questions);
            return finalQuest?._id;
        }else{
            return "new";
        }
    } catch (error) {
        console.log(error);
    }
}

const getQuestionsNotDone = async (username,partId) => {
    try {
        let questions = await getValidQuestionsByPart(partId);
        let answers = await answerService.getAnswersByUserAndPart(username,questions);
        answers = answers.filter(ans => ans.correct);
        let answeredQuestions = [];
        answers.forEach((ans) => {
            answeredQuestions.push(String(ans.answerToQuestion._id));
        })
        questions = questions.filter(quest => answeredQuestions.indexOf(String(quest._id))<0 );
        return questions;
    } catch (error) {
        console.log(error);
    }
} 

const getQuestionsText = async (partId,typeId) => {
    try {
        mongodbConnection();
        let questionsText = [];
        let questions = await getQuestions(partId,typeId, true);

        questions.forEach((ans) => {
            questionsText.push(String(ans.question.description));
        })

        return questionsText;
    } catch (error) {
        console.log(error);
    }
} 

module.exports = {
    valueQuestion,
    getValidQuestions,
    getQuestions,
    getQuestions2,
    getQuestionsText,
    addQuestion,
    validQuestion,
    deleteQuestion,
    deleteByPart,
    getQuestionById,
    getQuestionsByPart,
    getValidQuestionsByPart,
    editQuestion,
    getOneExerciseByPart,
    getNextQuestionsByPart
}