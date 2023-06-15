const express = require('express');

const tutorialPart = require('../models/tutorialPart');
const valoration = require('../models/valoration');

const mongodbConnection = require('../config/mongodb');

const getPart = (topic,part) => {
    try{
        mongodbConnection();
        tutorialPart.findOne({topic: topic, part:part})
        return tutorialPart;
    }catch(error){
        console.log(error.message)
    }
}

const galderaPuntutatu = (question,stars) => {
    try{
        mongodbConnection();
        valoration.create({
            questionId:question,
            value:stars,
        })
        return valoration;
    }catch(error){
        console.log(error.message)
    }
}

const addPart = (question,topic) => {
    
}

module.exports = {
    getPart,
    galderaPuntutatu,
    addPart,
}