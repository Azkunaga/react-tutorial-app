const answer = require('../models/answer');
const userService = require('../services/userService');
const questionService = require('../services/questionService');
const mongodbConnection = require('../config/mongodb');

const createAnswer = async (user,questionId,answerText,anwserBool,helpBool,correctionText) => {
    try{
        mongodbConnection();
        const u = userService.searchUser(user);
        const q = questionService.getQuestionById(questionId);
        answer.create({
            user:u,
            answer:answerText,
            answerToQuestion:q,
            correct:anwserBool,
            help: helpBool,
            correction:correctionText
        })
    }catch(error){
        console.log(error.message)
    }
}

module.exports = {
    createAnswer,
};