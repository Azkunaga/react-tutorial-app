const { getAnswerToQuestion, createQuestion, evaluate } = require('../services/chatGPTService');
const {createAnswer} = require('../services/answerService');
const promps = require('../data/prePrompts');

const askChatGPT = async (req,res) => {
    try{
      const answer = getAnswerToQuestion(req.body.question);
      return res.status(200).send({
        answer,
      });
    }catch (error) {
        res.status(500).send({
        error: error.mesage,
        })
    }
}

const recommendQuestionsChatGPT = async (req,res) => {
    try{
        const questionList = recommendQuestions(req.body.username);
        console.log(questionList);
        return res.status(200).send({
            questionList,
          });
    }catch (error) {
        res.status(500).send({
        error: error.mesage, 
        })
    }
}

const createExerciseChatGPT = async (req,res) => {
    try{
        const newExercise = createExercise(req.body.username,req.body.topic, req.body.type || null);
        return res.status(200).send({
            newExercise,
          });
    }catch (error) {
        res.status(500).send({
        error: error.mesage, 
        })
    }
}

const helpWithQuestion = async()=>{
    try {
        
    } catch (error) {
        
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
    recommendQuestionsChatGPT,
    askChatGPT,
    createExerciseChatGPT,
    evaluateAnswer
}