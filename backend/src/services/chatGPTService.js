const chains = require("../data/chains");
const model = require("../config/llm");

const userService = require('./userService');
const exTypeService = require('./exTypeService');
const questionService = require('./questionService');
const tutorialService = require('./tutorialService');
const exLevelService = require('./exLevelService');
const partStatsService = require("./partStatsService");
const answerService = require('./answerService');
const recommendationService = require('./recommendationService')

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
            let allDuration = 0;
            let allReturn = 0;
            await Promise.all(parts.map(async (value2)=>{
                const questions = await question.find({ tutorialPart: value2._id }).select('_id');
                const answers = await answer.find({ user: u._id, answerToQuestion: { $in: questions } });
                const correct = answers.filter(function (a) {
                    return a.correct === true;
                }).length;
                const incorrect = answers.filter(function (a) {
                    return a.correct === false;
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

const getAnswerToQuestion = async (username, question) => {
    try {
        const resA = await model.call(
            question
            );
        console.log(resA);
        const rec = await recommendationService.addRecommendation(username, question, resA);
        return resA;
    } catch (error) {
        console.log(error.message)
    }
}

const calculateType = async(username,partId) =>{
    const types = await exTypeService.getAll();
    const tutPart = await tutorialService.getPartById(partId);
    let typeData = [];
    var bar = new Promise((resolve, reject) => {
        types.forEach(async (value, index, array) => {
            const questions = await questionService.getQuestions(partId, value._id, true);
            const answers  = await answerService.getAnswersByUserAndPart(username,questions);
            const correct = await answers.filter(function(a) {
                return a.correct === true
            });
            const incorrect = answers.filter(function(a) {
                return a.correct === false
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
        typeResponse = await chains.typeChain.call({tutorialPart: tutPart.name, data:JSON.stringify(typeData)});
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

let calculateLevel = async(username, partId, calculatedType) =>{
    const levelData = [];
    const user = await userService.searchUser(username);
    const type = await exTypeService.getExType(calculatedType);
    const tutPart = await tutorialService.getPartById(partId);
    const questions = await questionService.getQuestions(partId,type._id,true);
    if(questions.length===0){
        return "easy";
    }
    const answers = await answerService.getAnswersByUserAndPart(username,questions);
    if(answers.length===0){
        return "easy";
    }
    const levels = await exLevelService.getAll();
    var bar = new Promise((resolve, reject) => {
        levels.forEach(async (value, index, array) => {
            const answersLevel = answers.filter(function(item) {
                return String(item.answerToQuestion.difficulty)===String(value._id);
            });
            const correct = answersLevel.filter(function(item) {
                return item.correct===true;
              });
            const help = correct.filter(function(item) {
                return item.help===true;
              });
            let time = 0;
            answersLevel.forEach(el => {
                time += el.duration;
            });

            const noHelp = correct.length - help.length;
            const incorrect = answersLevel.length - correct.length;

            levelData.push({
                ExerciseLevel: value.name,
                answers:{
                    correctAnswers: noHelp,
                    correctWithHelp: help.length,
                    incorrectAnswers: incorrect 
                },
                AvgTime: (Math.floor(time/answersLevel.length) || 0 ) + " seconds"
            });
            if (index === array.length -1) resolve();
        })
    });

    let l = "";
    const level = await bar.then(async ()=>{
        levelResponse = await chains.levelChain.call({tutorialPart: tutPart.name, intialLevel: user.initialLevel ,exerciseType: calculatedType, data:JSON.stringify(levelData)});
        levels.forEach(function(element){
            if(levelResponse.text.toLowerCase().includes(element.name)){
                l = element.name;
            }
        })
        return l;
    })

    return level;
}

const createExercise = async (username,partId,type=null,level=null) => {
    try{
        let question = null;
        console.log(username,partId,type,level);
        const calculatedType = type || await calculateType(username,partId);
        const typeObj = await exTypeService.getExType(calculatedType);
        console.log(calculatedType);
        const calculatedLevel = level || await calculateLevel(username, partId, calculatedType);
        const levelObj = await exLevelService.getExLevel(calculatedLevel);
        console.log(calculatedLevel);
        const tutPart = await tutorialService.getPartById(partId);

        const questions = await questionService.getQuestionsText(partId, typeObj?._id);
        const repeat = JSON.stringify(questions);
        console.log(repeat);

        switch (typeObj.name){
            case `fillGaps1`:
                question = await chains.fillChain.call({level: levelObj.name, repeat: repeat, topic: tutPart.topic.name, component: tutPart.name, opt: "Same GAPS and CHOICES number. Make 4 GAPS and give 4 disordered CHANCES(options) so it makes it harder to the user. Give the options for the gaps disordered.", structure: typeObj.structure});
                break;
            case `fillGaps2`:
                question = await chains.fillChain.call({level: levelObj.name,  repeat: repeat, topic: tutPart.topic.name, component:  tutPart.name, opt: "Different GAPS and CHOICES number. Make LESS than 4 GAPS and give 4 disordered CHANCES(options) so it makes it harder to the user. Give the options for the gaps disordered.",structure: typeObj.structure});
                break;
            case `code`:
                question = await chains.codeExChain.call({level: levelObj.name, repeat: repeat,  topic: tutPart.topic.name, component: tutPart.name, structure: typeObj.structure});
                break;
            case `test1`:
                question = await chains.testChain.call({level: levelObj.name, repeat: repeat,  topic: tutPart.topic.name, component:  tutPart.name, opt: "True/False question.",structure: typeObj.structure});
                break;
            case `test2`:
                question = await chains.testChain.call({level: levelObj.name, repeat: repeat,  topic: tutPart.topic.name, component:  tutPart.name, opt: "4 possible answers and just one answer has to be correct. It can't be a true/false question.",structure: typeObj.structure});                
                break;
            case `test3`:
                question = await chains.testChain.call({level: levelObj.name, repeat: repeat,  topic: tutPart.topic.name, component:  tutPart.name, opt: "4 possible answers and it must be multiple correct answers.",structure: typeObj.structure});                
                break;
            default:
                console.log("no existe el type");
                break;
        }
        console.log("All text", question.text);
        const split1 = question.text.split("Exercise:");
        const split2 = split1[1].split("{");
        const split3 = split2[1].split("}");
        const ex = "{"+split3[0]+"}"
        
        const split5 = split1[1].split("Correct answer:");
        const pA = split5[1];
        return {
            ex:JSON.parse(ex),
            pA:pA,
            tutPart:partId,
            type:calculatedType,
            level:calculatedLevel
        };
    }catch(error){
        console.log(`Error message: ${error.message}`)
    }
}

const evaluate = async (quest,ans) => {
    try{
        const question = await questionService.getQuestionById(quest);
        const res = await chains.answerEvaluationChain.call({question:question.question.description, chances:  JSON.stringify(question.question.chances) || "no options", pAnswer: question.correctAnswer, answer: ans})
        return res.text;
    }catch(error){
        console.log(error.message)
    }
}

const getHelpWithQuestion = async(quest) => {
    try{
        const question = await questionService.getQuestionById(quest);
        const res = await chains.helpChain.call({question:question.question.description, chances: JSON.stringify(question.question?.chances) || "no options", pAnswer: question.correctAnswer})
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