const { getAnswerToQuestion, createQuestion, evaluate } = require('../services/chatGPTService');
const {createAnswer} = require('../services/answerService');
const promps = require('../data/prePrompts');

const askChatGPT = async (req,res) => {
    try{
      const answer = getAnswerToQuestion(req.body.question);
      return res.status(200).send({
        message: answer,
      });
    }catch (error) {
        res.status(500).send({
        error: error.mesage,
        })
    }
}

const createQuestionChatGPT = async (req,res) => {
    try{
        const newQuestion = createQuestion(req.body.topic, req.body.type);
        return res.status(200).send({
            message: newQuestion,
          });
    }catch (error) {
        res.status(500).send({
        error: error.mesage, 
        })
    }
}

const evaluateAnswer = async (req,res) => {
    try{
        const correct = evaluate(req.body.history,req.body.answer);
        createAnswer(req.body.user,req.body.questionID,req.body.answer,correct);

        return res.status(200).send({
            answer: correct
          });

    }catch (error) {
        res.status(500).send({
        error: error.mesage, 
        })
    }
}

module.exports = {
    askChatGPT,
    createQuestionChatGPT,
    evaluateAnswer
}