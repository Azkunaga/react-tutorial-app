const express = require('express');

const tutorialPart = require('../models/tutorialPart');

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

const addPart = (topic,part,question,) => {
    try{
        mongodbConnection();
        tutorialPart.create({
            topic:topic,
            part:part,
            text:question,
        })
    }catch(error){
        console.log(error.message)
    }
}

const deletePart = (partId) => {
    try{
        mongodbConnection();
        tutorialPart.deleteOne({
            id:partId,
        })
    }catch(error){
        console.log(error.message)
    }
}

module.exports = {
    getPart,
    addPart,
    deletePart,
}