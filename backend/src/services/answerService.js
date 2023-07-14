const answer = require('../models/answer');
const userService = require('../services/userService');
const questionService = require('../services/questionService');
const mongodbConnection = require('../config/mongodb');

const createAnswer = async (user, questionId, answerText, help, eval) => {
    try{
        mongodbConnection();
        const u = userService.searchUser(user);
        const q = questionService.getQuestionById(questionId);
        let helpBool = false;
        let answerBool = false;
        if(help){
            helpBool = true;
        }
        if(eval.startsWith('Yes')){
            answerBool = true;
        }
        answer.create({
            user:u,
            answer:answerText,
            answerToQuestion:q,
            correct:anwserBool,
            help: helpBool,
            correction:eval
        })
    }catch(error){
        console.log(error.message)
    }
}

module.exports = {
    createAnswer,
};