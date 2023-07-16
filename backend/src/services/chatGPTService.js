const chains = require("../data/chains");
const model = require("../config/llm");

const userService = require('./userService');
const exTypeService = require('./exTypeService');
const topicService = require('./topicService');
const questionService = require('./questionService');

const user = require('../models/user');
const topic = require('../models/topic');
const answer = require('../models/answer');
const question = require('../models/question');
const tutorialPart = require('../models/tutorialPart');
const partStats = require('../models/partStats');

const recommendQuestions = async (username) => {
    try{
        const topicData = await getTutorialStats(username);
        const topic = await chains.chatGPTChain.call({data: topicData});
        const res2 = await chains.recommendChain.call({component: topic})
        return res2;
    }catch(error){
        console.log(error.message)
    }
}

const getTutorialStats = async(username) =>{
    try {
        const u = await userService.searchUser(username);
        console.log("user",u);
        const topicNames = topic.find().distinct('name');
        const stats = [];
        topicNames.forEach(element => {
            const questions = question.find({topic: element._id, valid:true}).select('_id');
            const answers = answer.find({user:u._id, answerToQuestion: {$in:questions}});
            const correct = answers.filter(function(a) {
                return a.correct == true
            }).count();
            const incorrect = answers.filter(function(a) {
                return a.correct == false
            }).count();
            const parts = tutorialPart.find({topic:element._id}).select('_id');
            const pStats = partStats.find({ tutorialPart: {$in:parts}});
            let allDuration = 0;
            pStats.forEach(s => {
                allDuration+=s.duration;
            });

            stats.push({
                topicName:element.name,
                duration: allDuration + " seconds",
                correctNum: correct,
                incorrectNum: incorrect,
            });
        });
        return stats;
         
    } catch (error) {
        console.log(error.message)
    }
}

const getAnswerToQuestion = async (question) => {
    try {
        const resA = await model.call(
            question
            );
        return resA;
    } catch (error) {
        console.log(error.message)
    }
}
const calculateType = async(username,topic) =>{
    const types = await exTypeService.getAll();
    const topicObj = await topicService.getTopic(topic);
    const u = await userService.searchUser(username);
    const typeData = [];
    types.forEach(async function (element) {
        const questions = await question.find({topic: topicObj._id, type:element._id, valid:true});
        const answers = await answer.find({user:u._id, answerToQuestion: {$in:questions}});
        const correct = await answers.filter(function(a) {
            return a.correct == true
        });
        const incorrect = answers.filter(function(a) {
            return a.correct == false
        });
        typeData.push({
            ExerciseType: element.name,
            exercises:{
                howManyQuestions: questions.length,
                answersCorrect: correct.length,
                answersWrong: incorrect.length
            }
        });
    });
    const type = await chains.levelChain.call({data:JSON.stringify(typeData)});
    console.log(type.text);
    return;
    return type;
};

const calculateLevel = async(username, topic, calculatedType) =>{
    const levelData = [];
    const type = await exTypeService.getExType(calculatedType);
    const topicObj = await topicService.getTopic(topic);
    const u = await userService.searchUser(username);
    const questions = await question.find({topic: topicObj._id, type:type._id, valid:true}).select('_id');
    if(!questions.length){
        return "easy";
    }
    const answers = await answer.find({user:u._id, answerToQuestion: {$in:questions}}).populate('answerToQuestion');
    for (let index = 1; index <= 3; index++) {
        const answersLevel = answers.filter(function(item) {
            return item.answerToQuestion.level===index;
          });
        const correct = answerLevel.filter(function(item) {
            return item.correct===true;
          });
        const help = correct.filter(function(item) {
            return item.help!==null;
          })
        const noHelp = correct.count()-help.count();
        const incorrect = answersLevel.count() - correct;
        levelData.push({
            ExerciseLevel: index,
            answers:{
                correctAnswers: noHelp,
                correctWithHelp: help,
                incorrectAnswers:incorrect 
            }
        });
    }
    const level = chains.levelChain.call({data:levelData});
    return level;
}

const createExercise = async (username,topic,type) => {
    try{
        //const system = prompts.systemRole;
        let question = "";
        let calculatedType = type || calculateType(username,topic); 
        return;
        const level = calculateLevel(username, topic, calculatedType);
        switch (calculatedType) {
            case "fillGaps1":
                question = chains.fillChain.call({level: level, component: topic, options: "Give options for those gaps. One answer per gap. Give the list disordered."});
                break;
            case "fillGaps2":
                question = chainsfillChain.call({level: level, component: topic, options: "Give more option than gaps.  Give the list disordered."});
                break;
            case "code":
                question = chains.codeExChain.call({level: level, component: topic});
                break;
            case "test1":
                question = chains.testChain.call({level: level, component: topic, options:"True/False question."});
                break;
            case "test2":
                question = chains.testChain.call({level: level, component: topic, options:"Just one answer has to be correct. It can't be a true/false question."});                break;
            case "test3":
                question = chains.testChain.call({level: level, component: topic, options:"More than one correct answer. It can't be a true/false question."});                break;
            default:
                break;
        }
        const quest = questionService.addQuestion(topic,calculatedType,level,question);
        return quest;
    }catch(error){
        console.log(error.message)
    }
}

const evaluate = async (quest,ans) => {
    try{
        const res = chains.answerEvaluationChain({question:quest, answer: ans})
        return res;
    }catch(error){
        console.log(error.message)
    }
}

const getHelpWithQuestion = async(quest) => {
    try{
        const res = chains.helpChain({question:quest})
        return res;
    }catch(error){
        console.log(error.message)
    }
}

module.exports = {
    recommendQuestions,
    getAnswerToQuestion,
    createExercise,
    evaluate,
    getHelpWithQuestion
};