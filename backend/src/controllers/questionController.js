const questionService = require('../services/questionService')
const valorationService = require('../services/valorationService');

const valueQuest = async (req,res) => {
    try{
        questionService.valueQuestion(req.body.questionID,req.body.stars);
        res.status(200).send({
            message: "Question valuated",
          })
    }catch (error) {
        res.status(500).send({
        error: error.mesage, 
        })
    }
}

const getQuestionById = async(req,res) =>{
    try {
        const quest = await questionService.getQuestionById(req.params.id);
        if(!quest){
            res.status(401).send({
                message: "Questions not found",
            })
        }else{
            res.status(200).send({
                message: "Question found",
                quest
            })
        }
    } catch (error) {
        res.status(500).send({
            error: error.mesage,
        })
    }
}

const getValidQuestions = async (req,res) => {
    try{
        const questList = await questionService.getValidQuestions(req.body.valid);
        if(!questList){
            res.status(401).send({
                message: "Questions not found",
            })
        }else{
            res.status(200).send({
                message: "Questions found",
                questList
            })
        }
    }catch (error) {
        res.status(500).send({
        error: error.mesage, 
        })
    }
}

const getValoratedQuestions = async (req, res) =>{
    try{
        const questList = await questionService.getValidQuestions(false);
        const list = [];
        await Promise.all(
            questList.map(async (element) => {
                const stats = await valorationService.getStatsByQuestionId(element._id);
                list.push({
                    question:element,
                    stats:stats
                })
            })
        );

        if(!list){
            res.status(401).send({
                message: "Questions not found",
            })
        }else{
            res.status(200).send({
                message: "Questions found",
                list
            })
        }
    }catch (error) {
        res.status(500).send({
        error: error.mesage, 
        })
    }
}

const getQuest = async (req,res) => {
    try{
        const quest = await questionService.getQuestions(req.body.topic, req.body.part, req.body.user);
        if(!quest){
            res.status(401).send({
                message: "Questions not found for this topic",
            })
        }else{
            res.status(200).send({
                message: "Question valuated",
                quest
            })
        }
    }catch (error) {
        res.status(500).send({
        error: error.mesage, 
        })
    }
}

const addQuest = async (req,res) => {
    try{
        await addQuestion(req.body.topic,req.body.question);
        res.status(200).send({
            message: "Question added",
          })
    }catch (error) {
        res.status(500).send({
        error: error.mesage, 
        })
    }
}

const validQuest = async (req,res) => {
    try{
        await validQuestion(req.body.questionID);
        res.status(200).send({
            message: "Question validated",
          })
    }catch (error) {
        res.status(500).send({
        error: error.mesage, 
        })
    }
}

const deleteQuest = async (req,res) => {
    try{
        await deleteQuestion(req.body.questionID);
        res.status(200).send({
            message: "Question deleted",
          })
    }catch (error) {
        res.status(500).send({
        error: error.mesage, 
        })
    }
}

const getQuestionsByPart = async(req,res) =>{
    try {
        console.log(req.body.partId)
        const questions = await questionService.getQuestionsByPart(req.body.partId);
        res.status(200).send({
            questions,
          })
    } catch (error) {
        res.status(500).send({
            error: error.mesage, 
        })
    }
}

const editQuestion = async(req,res) => {
    try{
        const updatedQuestion = await questionService.editQuestion(req.params.id, req.body.level, req.body.type, req.body.valid, req.body.question, req.body.pAnswer);
        res.status(200).send({
            message: "Edited Correctly",
            question:updatedQuestion,
          })
    }catch (error) {
        res.status(500).send({
            error: error.mesage, 
        })
    }
}

module.exports = {
    valueQuest,
    getQuest,
    getQuestionById,
    getValoratedQuestions,
    getValidQuestions,
    addQuest,
    validQuest,
    deleteQuest,
    getQuestionsByPart,
    editQuestion,
}