const express = require('express');
const { valueQuestion, getQuestions, addQuestion,validQuestion ,deleteQuestion} = require('../services/questionService')

const valueQuest = async (req,res) => {
    try{
        
        
    }catch (error) {
        res.status(500).send({
        error: error.mesage, 
        })
    }
}

const getQuest = async (req,res) => {
    try{
        
        
    }catch (error) {
        res.status(500).send({
        error: error.mesage, 
        })
    }
}

const addQuest = async (req,res) => {
    try{
        
        
    }catch (error) {
        res.status(500).send({
        error: error.mesage, 
        })
    }
}

const validQuest = async (req,res) => {
    try{
        
        
    }catch (error) {
        res.status(500).send({
        error: error.mesage, 
        })
    }  
}

const deleteQuest = async (req,res) => {
    try{
        
        
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