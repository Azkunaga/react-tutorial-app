const answer = require('../models/answer');
const mongodbConnection = require('../config/mongodb');

const createAnswer = async (user,questionId,answerText,anwserBool) => {
    try{
        mongodbConnection();
        answer.create({
            user:user,
            answer:answerText,
            answerToQuestion:questionId,
            correct:anwserBool,
        })
    }catch(error){
        console.log(error.message)
    }
}

module.exports = {
    createAnswer,
};