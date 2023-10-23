const answer = require('../models/answer');
const userService = require('../services/userService');
const mongodbConnection = require('../config/mongodb');

const createAnswer = async (user, questionId, answerText, help, dur, eval) => {
    try{
        const u = await userService.searchUser(user);
        let answerBool = false;
        if(eval.startsWith('Yes' || 'yes')){
            answerBool = true;
        }
        let feedback = splitAnswer(eval);
        mongodbConnection();
        await answer.create({
            user:u._id,
            answerToQuestion:questionId,
            answer:answerText,
            correct:answerBool,
            help: help,
            correction:feedback,
            duration: dur
        })
        return {
            text:feedback,
            correct:answerBool,
        };
    }catch(error){
        console.log(error.message)
    }
}

const splitAnswer = (text) =>{
    try{
        let newLine = "\n\n";
        let split = text.split(newLine).slice(1).join(newLine);
        return split;
    }catch(error){
        console.log(error);
    }
}

const getAnswersByUserAndPart = async (username, questions) => {
    try {
        const u = await userService.searchUser(username);
        const answers = await answer.find({ user: u._id, answerToQuestion: { $in: questions } }).populate('answerToQuestion');
        return answers;
    } catch (error) {
        console.log(error);  
    }
}

module.exports = {
    createAnswer,
    getAnswersByUserAndPart,
};