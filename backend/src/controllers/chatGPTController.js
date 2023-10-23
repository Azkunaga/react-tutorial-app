const chatGPTService = require('../services/chatGPTService');
const answerService = require('../services/answerService');

const askChatGPT = async (req,res) => {
    try{
      const answer = await chatGPTService.getAnswerToQuestion(req.body.question);
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
        const questionList = await chatGPTService.recommendQuestions(req.body.username);
        if(!questionList){
            return res.status(500).send({
                error: "Something went wrong",
              });
        }
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
        const newExercise = await chatGPTService.createExercise(req.body.username, req.body.tutorialPart, req.body.type || null);
        return res.status(200).send({
            newExercise,
          });
    }catch (error) {
        res.status(500).send({
        error: error.mesage, 
        })
    }
}

const helpWithQuestion = async(questionId)=>{
    try {
        const helpText = chatGPTService.getHelpWithQuestion(questionId);
        return res.status(200).send({
            helpText,
          });
    } catch (error) {
        res.status(500).send({
            error: error.mesage, 
            })
    }
}

const evaluateAnswer = async (req,res) => {
    try{
        const eval = await chatGPTService.evaluate(req.body.questionId, req.body.answer);
        const feedback = await answerService.createAnswer(req.body.user, req.body.questionId,req.body.answer, req.body.help, req.body.duration, eval);
        return res.status(200).send({
            feedback
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
    helpWithQuestion,
    evaluateAnswer
}