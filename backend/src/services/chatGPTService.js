const chains = require("../data/chains");
const model = require("../config/llm");

const userService = require('./userService');
const exTypeService = require('./exTypeService');
const questionService = require('./questionService');
const tutorialService = require('./tutorialService');

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
        const topic = await chains.topicChain.call({data:JSON.stringify(stats)});
        return topic;
         
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
const calculateType = async(username,tutPart) =>{
    const types = await exTypeService.getAll();
    const tutorialObj = await tutorialService.getPart(tutPart);
    const u = await userService.searchUser(username);
    let typeData = [];
    var bar = new Promise((resolve, reject) => {
        types.forEach(async (value, index, array) => {
            const questions = await question.find({tutorialPart: tutorialObj._id, type:value._id, valid:true});
            const answers = await answer.find({user:u._id, answerToQuestion: {$in:questions}});
            const correct = await answers.filter(function(a) {
                return a.correct == true
            });
            const incorrect = answers.filter(function(a) {
                return a.correct == false
            });
            typeData.push({
                ExerciseType: value.name,
                exercises:{
                    howManyQuestions: questions.length,
                    answersCorrect: correct.length,
                    answersWrong: incorrect.length
                }
            });
            if (index === array.length -1) resolve();
        });
    });
    let typeResponse = "";
    let type = "";
    bar.then(async ()=>{
        typeResponse = await chains.typeChain.call({tutorialPart: tutorialPart ,data:JSON.stringify(typeData)});
        types.forEach(async function(element){
            if(typeResponse.text.includes(element.name)){
                type = element.name;
                console.log(type);
            } 
        })
    })
    return type;
};

const calculateLevel = async(username, tutorialPart, calculatedType) =>{
    const levelData = [];
    const type = await exTypeService.getExType(calculatedType);
    const tutorialObj = await tutorialService.getPart(tutorialPart);
    const u = await userService.searchUser(username);
    const questions = await question.find({topic: tutorialObj._id, type:type._id, valid:true}).select('_id');
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

const createExercise = async (username,tutorialPart,type,level) => {
    try{
        let question = "";
        const calculatedType = type || calculateType(username,tutorialPart);
        const calculatedLevel = level || calculateLevel(username, tutorialPart, calculatedType);
        switch (calculatedType) {
            case "fillGaps1":
                question = chains.fillChain.call({level: calculatedLevel, component: tutorialPart, options: "Give options for those gaps. One answer per gap. Give the list disordered."});
                break;
            case "fillGaps2":
                question = chainsfillChain.call({level: calculatedLevel, component: tutorialPart, options: "Give more option than gaps.  Give the list disordered."});
                break;
            case "code":
                question = chains.codeExChain.call({level: calculatedLevel, component: tutorialPart});
                break;
            case "test1":
                question = chains.testChain.call({level: calculatedLevel, component: tutorialPart, options:"True/False question."});
                break;
            case "test2":
                question = chains.testChain.call({level: calculatedLevel, component: tutorialPart, options:"Just one answer has to be correct. It can't be a true/false question."});                break;
            case "test3":
                question = chains.testChain.call({level: calculatedLevel, component: tutorialPart, options:"More than one correct answer. It can't be a true/false question."});                break;
            default:
                break;
        }
        const quest = questionService.addQuestion(tutorialPart,calculatedType,calculatedLevel,question);
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