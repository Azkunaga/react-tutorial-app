const express = require('express');
const { valueQuestion, getQuestion, addQuestion,validQuestion ,deleteQuestion} = require('../services/questionService')

const valueQuest = async (req,res) => {
    try{
        valueQuestion(req.body.questionID,req.body.stars);
        res.status(200).send({
            message: "Question valuated",
          })
    }catch (error) {
        res.status(500).send({
        error: error.mesage, 
        })
    }
}

const getQuest = async (req,res) => {
    try{
        const quest = getQuestion(req.body.topic, req.body.part, req.body.user);
        if(!quest){
            res.status(401).send({
                message: "Questions not found for this topic",
                error: error.mesage,
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
        addQuestion(req.body.topic,req.body.question);
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
        validQuestion(req.body.questionID);
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
        deleteQuestion(req.body.questionID);
        res.status(200).send({
            message: "Question deleted",
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
    addQuest,
    validQuest,
    deleteQuest,
}