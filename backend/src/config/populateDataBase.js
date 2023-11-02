require('dotenv').config({path:'env/.env'});

const mongodbconnection = require('../config/mongodb');

const ExLevel = require('../models/exLevel');
const ExType = require('../models/exType');
const Topic = require('../models/topic');
const TutorialPart = require('../models/tutorialPart');
const Question = require('../models/question');
const User = require('../models/user');

const exLevelsData = require('../data/initial/exlevels');
const exTypesData = require('../data/initial/extypes');
const topicsData = require('../data/initial/topics');
const tutorialPartsData = require('../data/initial/tutorialparts');
const questionsData = require('../data/initial/questions');
const usersData = require('../data/initial/users');


const populateExLevels = async () => {
    try{
        await ExLevel.create(exLevelsData);
        console.log("ExLevels added")
    }catch(err){
        console.log(err);
    }
}

const populateExTypes = async () => {
    try{
        await ExType.create(exTypesData);
        console.log("ExTYpes added")
    }catch(err){
        console.log(err);
    }
}

const populateTopics = async () => {
    try{
        await Topic.create(topicsData);
        console.log("Topics added")
    }catch(err){
        console.log(err);
    }
}

const populateParts = async () => {
    try{
        await TutorialPart.create(tutorialPartsData);
        console.log("Parts added")
    }catch(err){
        console.log(err);
    }
}

const populateQuestions = async () => {
    try{
        await Question.create(questionsData);
        console.log("Exercises added")
    }catch(err){
        console.log(err);
    }
}

const populateUsers = async () => {
    try{
        await User.insertMany(usersData);
        console.log("Users added")
    }catch(err){
        console.log(err);
    }
}

const populateDataBase = async () => {
    try{
        await mongodbconnection(process.env.MONGODB_URI);
        await populateExLevels();
        await populateExTypes();
        await populateTopics();
        await populateParts();
        await populateQuestions();
        await populateUsers();
        return;
    }catch(err){
        console.log(err);
    }
}

populateDataBase();