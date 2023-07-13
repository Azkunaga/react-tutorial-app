const {chains} = require("../config/llm");
const model = require("../config/llm");

const user = require('../models/user');
const topic = require('../models/topic');
const answer = require('../models/answer');
const question = require('../models/question')
const tutorialPart = require('../models/tutorialPart');
const partStats = require('../models/partStats');


const recommendQuestions = async (username) => {
    try{
        const topicData = getTutorialStats(username);
        const res = await chains.chatGPTChain.call({ data: topicData });
        console.log(res);
        const topic = res.text;
        const res2 = await chains.recommendChain.call({component: topic})
        console.log(res2);
        return completion.data.choices[0].message;
    }catch(error){
        console.log(error.message)
    }
}

const getTutorialStats = async(username) =>{
    try {
        const u = user.find({username:username});
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
    try{
        //const system = prompts.systemRole;
        const resA = await model.call(
            question
          );
        return resA.text;
    }catch(error){
        console.log(error.message)
    }
}

const createExercise = async (topic,type) => {
    try{
        const system = prompts.systemRole;
        let question = "";
        switch (type) {
            case "fillGaps1":
                question = prompts.fillEx + topic + prompts.fillSameOptionsEx;
                break;
            case "fillGaps2":
                question = prompts.fillEx + topic + prompts.fillMoreOptionsEx;
                break;
            case "code":
                question = prompts.codeEx + topic;
                break;
            case "test1":
                question = prompts.testEx + topic + prompts.testExTrueFalse;
                break;
            case "test2":
                question = prompts.testEx + topic + prompts.testOneEx;
                break;
            case "test3":
                question = prompts.testEx + topic + prompts.testMultipleEx;
                break;
            default:
                break;
        }
        const completion = await openai.createChatCompletion({
            model: "gpt-3.5-turbo",
            messages: [
                {"role": "system", "content": system}, 
                {"role": "user", "content": question}
            ],
          });
        const quest = addQuestion(topic, completion.data.choices[0].message);
        return quest;
    }catch(error){
        console.log(error.message)
    }
}

const evaluate = async (history,answer) => {
    try{
        const answer2 = "Is the next answer correct for the previous question? \n" + answer;
        const completion = await openai.createChatCompletion({
            model: "gpt-3.5-turbo",
            messages: [
                history, 
                {"role": "user", "content": answer2}
            ],
          });
    }catch(error){
        console.log(error.message)
    }
}

module.exports = {
    recommendQuestions,
    getAnswerToQuestion,
    createExercise,
    evaluate,
};