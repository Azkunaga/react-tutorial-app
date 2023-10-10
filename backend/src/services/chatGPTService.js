const chains = require("../data/chains");
const model = require("../config/llm");

const userService = require('./userService');
const exTypeService = require('./exTypeService');
const questionService = require('./questionService');
const tutorialService = require('./tutorialService');
const exLevelService = require('./exLevelService');
const partStatsService = require("./partStatsService");

const answer = require('../models/answer');
const topic = require('../models/topic');
const question = require('../models/question');
const tutorialPart = require('../models/tutorialPart');

const recommendQuestions = async (username) => {
    try{
        const data = await getTutorialStats(username);
        const topics = await chains.topicChain.call({data: JSON.stringify(data)});
        const pTopcis = topics.text.split("Parts:")[1];
        const res2 = await chains.recommendChain.call({component: pTopcis})
        return res2.text;
    }catch(error){
        console.log(error.message)
    }
}

const getTutorialStats = async(username) =>{
    try {
        const u = await userService.searchUser(username);
        const topicNames = await topic.find();
        let stats = [];
        await Promise.all(topicNames.map(async (value)=>{
            let parts = await tutorialPart.find({topic:value._id});
            let partInfoArray = [];
            let allDuration, allReturn = 0;
            await Promise.all(parts.map(async (value2)=>{
                const questions = await question.find({ tutorialPart: value2._id }).select('_id');
                const answers = await answer.find({ user: u._id, answerToQuestion: { $in: questions } });
                const correct = answers.filter(function (a) {
                    return a.correct == true;
                }).length;
                const incorrect = answers.filter(function (a) {
                    return a.correct == false;
                }).length;
                const pStats = await partStatsService.getPartStats(value2._id,username);
                if(pStats){
                    allDuration += pStats.duration;
                    allReturn += pStats.return;
                }
                partInfoArray.push({
                    partName: value.name,
                    correctNum: correct,
                    incorrectNum: incorrect,
                });
            }))
            let info = "no information";
            if(partInfoArray.length>0){
                info = partInfoArray
            }
            stats.push({
                topicName: value.name,
                topicOrder: value.order,
                partsInfo: info,
                duration: allDuration + " seconds",
                returns: allReturn + " returns"
            });
        }))

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
                ExerciseDescription: value.description,
                Exercises:{
                    howManyQuestions: questions.length,
                    answersCorrect: correct.length,
                    answersWrong: incorrect.length
                }
            });
            if (index === array.length -1) resolve();
        });
    });
    let typeResponse = "";
    let type = bar.then(async ()=>{
        typeResponse = await chains.typeChain.call({tutorialPart: tutPart, data:JSON.stringify(typeData)});
        let t = "";
        types.forEach(async function(element){
            if(typeResponse.text.includes(element.name)){
                t = element.name;
            } 
        })
        return t;
    })
    return await type;
};

let calculateLevel = async(username, tutPart, calculatedType) =>{
    const levelData = [];
    const type = await exTypeService.getExType(calculatedType);
    const tutorialObj = await tutorialService.getPart(tutPart);
    const u = await userService.searchUser(username);
    const questions = await question.find({tutorialPart: tutorialObj._id, type:type._id, valid:true}).select('_id');
    if(questions.length){
        return "easy";
    }
    const answers = await answer.find({user:u._id, answerToQuestion: {$in:questions}}).populate('answerToQuestion').populate('difficulty');
    if(!answers.length){
        return "easy";
    }
    const levels = await exLevelService.getAll();
    var bar = new Promise((resolve, reject) => {
        levels.forEach(async (value, index, array) => {
            const answersLevel = answers.filter(function(item) {
                return item.answerToQuestion.difficulty===value.name;
              });
            const correct = answerLevel.filter(function(item) {
                return item.correct==true;
              });
            const help = correct.filter(function(item) {
                return item.help!=null;
              })
            const noHelp = correct.count()-help.count();
            const incorrect = answersLevel.count() - correct;
            levelData.push({
                ExerciseLevel: value.name,
                answers:{
                    correctAnswers: noHelp,
                    correctWithHelp: help,
                    incorrectAnswers:incorrect 
                }
            });
            if (index === array.length -1) resolve();
        })
    });

    let levelResponse = "";
    let level = bar.then(async ()=>{
        console.log(JSON.stringify(levelData));
        levelResponse = await chains.levelChain.call({tutorialPart: tutPart, exerciseType: calculatedType, data:JSON.stringify(levelData)});
        let l = "";
        levels.forEach(async function(element){
            if(levelResponse.text.includes(element.name)){
                l = element.name;
            }
        })
        return l
    });
    
    return await level;
}

const createExercise = async (username,tutPart,type,level) => {
    try{
        var question = null;
        const calculatedType = type || await calculateType(username,tutPart);
        console.log(calculatedType);
        const calculatedLevel = level || await calculateLevel(username, tutPart, calculatedType);
        console.log(calculatedLevel);

        switch (calculatedType){
            case `fillGaps1`:
                question = await chains.fillChain.call({level: calculatedLevel, component: tutPart, opt: "Give options for those gaps. One answer per gap. Give the list disordered."});
                break;
            case `fillGaps2`:
                question = await chains.fillChain.call({level: calculatedLevel, component: tutPart, opt: "Give more option than gaps.  Give the list disordered."});
                break;
            case `code`:
                question = await chains.codeExChain.call({level: calculatedLevel, component: tutPart});
                break;
            case `test1`:
                question = await chains.testChain.call({level: calculatedLevel, component: tutPart, opt: "True/False question."});
                break;
            case `test2`:
                question = await chains.testChain.call({level: calculatedLevel, component: tutPart, opt: "4 possible answers and just one answer has to be correct. It can't be a true/false question."});                
                break;
            case `test3`:
                question = await chains.testChain.call({level: calculatedLevel, component: tutPart, opt: "4 possible answers and it must be multiple correct answers."});                
                break;
            default:
                console.log("no existe el type");
                break;
        }
        console.log(question.text);
        const split1 = question.text.split("Exercise:");
        const split2 = split1[1].split("Correct answer:");
        console.log(split2);
        const ex = split2[0].trim(" ");
        const pA = split2[1].trim(" ");
        const quest = await questionService.addQuestion(tutPart,calculatedType,calculatedLevel, ex, pA);
        return quest.text;
    }catch(error){
        console.log(`Error message: ${error.message}`)
    }
}

const evaluate = async (quest,ans) => {
    try{
        const question = await questionService.getQuestionById(quest);
        const res = await chains.answerEvaluationChain({question:question.question, pAnswer: question.correctAnswer, answer: ans})
        return res.text;
    }catch(error){
        console.log(error.message)
    }
}

const getHelpWithQuestion = async(quest) => {
    try{
        const question = await questionService.getQuestionById(quest);
        const res = chains.helpChain({question:question.question})
        return res.text;
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