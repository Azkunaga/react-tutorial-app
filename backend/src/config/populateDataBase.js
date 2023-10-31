const ExLevel = require('../models/exLevel');
const ExType = require('../models/exType');
const Topic = require('../models/topic');
const TutorialPart = require('../models/topic');
const Question = require('../models/question');
const User = require('../models/user');

const populateExLevels = async () => {
    try{
        const data = JSON.parse(fs.readFileSync('../data/initial/exlevels.json', 'utf-8'))
        await ExLevel.create(data);
    }catch(err){
        console.log(err);
    }
}

const populateExTypes = async () => {
    try{
        const data = JSON.parse(fs.readFileSync('../data/initial/extypes.json', 'utf-8'))
        await ExType.create(data);
    }catch(err){
        console.log(err);
    }
}

const populateTopics = async () => {
    try{
        const data = JSON.parse(fs.readFileSync('../data/initial/topics.json', 'utf-8'))
        await Topic.create(data);
    }catch(err){
        console.log(err);
    }
}

const populateParts = async () => {
    try{
        const data = JSON.parse(fs.readFileSync('../data/initial/tutorialparts.json', 'utf-8'))
        await TutorialPart.create(data);
    }catch(err){
        console.log(err);
    }
}

const populateQuestions = async () => {
    try{
        const data = JSON.parse(fs.readFileSync('../data/initial/questions.json', 'utf-8'))
        await Question.create(data);
    }catch(err){
        console.log(err);
    }
}

const populateUsers = async () => {
    try{
        const data = JSON.parse(fs.readFileSync('../data/initial/users.json', 'utf-8'))
        await User.create(data);
    }catch(err){
        console.log(err);
    }
}

const populateDataBase = async () => {
    try{
        await populateExLevels();
        await populateExTypes();
        await populateTopics();
        // await populateParts();
        // await populateQuestions();
        await populateUsers();
    }catch(err){
        console.log(err);
    }
}

populateDataBase();