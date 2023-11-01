const mongodbconnection = require('../config/mongodb');

const ExLevel = require('../models/exLevel');
const ExType = require('../models/exType');
const Topic = require('../models/topic');
const TutorialPart = require('../models/tutorialPart');
const Question = require('../models/question');
const User = require('../models/user');

const exLevelsData = require('../data/initial/exLevels');
const exTypesData = require('../data/initial/exType');
const topicsData = require('../data/initial/topics');
const tutorialPartsData = require('../data/initial/tutorialParts');
const questionsData = require('../data/initial/questions');
const usersData = require('../data/initial/users');


const populateExLevels = async () => {
    try{
        await ExLevel.create(exLevelsData);
    }catch(err){
        console.log(err);
    }
}

const populateExTypes = async () => {
    try{
        await ExType.create(exTypesData);
    }catch(err){
        console.log(err);
    }
}

const populateTopics = async () => {
    try{
        await Topic.create(topicsData);
    }catch(err){
        console.log(err);
    }
}

const populateParts = async () => {
    try{
        await TutorialPart.create(tutorialPartsData);
    }catch(err){
        console.log(err);
    }
}

const populateQuestions = async () => {
    try{
        await Question.create(questionsData);
    }catch(err){
        console.log(err);
    }
}

const populateUsers = async () => {
    try{
        await User.insertMany(usersData);
    }catch(err){
        console.log(err);
    }
}

const populateDataBase = async () => {
    try{
        await mongodbconnection();
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