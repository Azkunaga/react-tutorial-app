const chatGPTService = require('../services/chatGPTService');
const answerService = require('../services/answerService');
const questionService = require('../services/questionService');

const askChatGPT = async (req,res) => {
    try{
      const answer = await chatGPTService.getAnswerToQuestion(req.body.username,req.body.question);
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
            questionList: JSON.parse(questionList),
          });
    }catch (error) {
        res.status(500).send({
        error: error.mesage, 
        })
    }
}

const createExerciseChatGPT = async (req,res) => {
    try{
        const newObj = await chatGPTService.createExercise(req.body.username, req.body.partId, req.body.type, req.body.level);
        const quest = await questionService.addQuestion(newObj.tutPart, newObj.type, newObj.level, newObj.ex, newObj.pA, false);
        return res.status(200).send({
            next:quest._id || null,
          });
    }catch (error) {
        res.status(500).send({
        error: error.mesage, 
        })
    }
}

const createExerciseChatGPT2 = async (req,res) => {
    try{
        const newExercise = await chatGPTService.createExercise(req.body.username, req.body.partId, req.body.type, req.body.level);
        return res.status(200).send({
            question:newExercise || null,
          });
    }catch (error) {
        res.status(500).send({
        error: error.mesage, 
        })
    }
}

const helpWithQuestion = async(req,res)=>{
    try {
        const helpText = await chatGPTService.getHelpWithQuestion(req.body.questionId);
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
        const feedback = await answerService.createAnswer(req.body.user, req.body.questionId, req.body.answer, req.body.help, req.body.duration, eval);
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
    evaluateAnswer,
    createExerciseChatGPT2
}