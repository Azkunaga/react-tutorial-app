const mongodbConnection = require('../config/mongodb');
const partStats = require('../models/partStats');
const tutorialService = require('./tutorialService'); 
const userService = require('./userService');

const addPartStats = async (tutorialPart, user, duration, returnNumber) => {
    try{
        mongodbConnection();
        const u = await userService.searchUser(user);
        const tp = await tutorialService.getPart(tutorialPart);
        const ps = await partStats.create({
            tutorialPart:tp,
            user: u,
            duration: duration,
            return: returnNumber
        })
        return ps;
    }catch(error){
        console.log(error.message)
    }
}

const getPartStats = async (tutorialPart, user) => {
    try{
        mongodbConnection();
        const u = await userService.searchUser(user);
        const tp = await tutorialService.getPart(tutorialPart);
        const ps = await partStats.findOne({
            tutorialPart:tp,
            user: u,
        })
        return ps;
    }catch(error){
        console.log(error.message)
    }
}

const getAll = async () => {
    try{
        mongodbConnection();
        const all = await partStats.find();
        return all;
    }catch(error){
        console.log(error.message)
    }
}

const deletePartStats = async (tutorialPart, user) => {
    try{
        mongodbConnection();
        const u = await userService.searchUser(user);
        const tp = await tutorialService.getPart(tutorialPart);
        const ps = await partStats.deleteOne({
            tutorialPart:tp,
            user: u,
        })
        return ps;
    }catch(error){
        console.log(error.message)
    }
}

module.exports = {
    addPartStats,
    getPartStats,
    getAll,
    deletePartStats
}