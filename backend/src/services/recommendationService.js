const mongodbConnection = require('../config/mongodb');
const recommendation = require('../models/recommendation');
const userService = require('./userService');

const addRecommendation = async (username, question, answer) =>{
    try{
        mongodbConnection(); 
        console.log("Answer:",answer)
        const u  = await userService.searchUser(username)
        const newR = await recommendation.create({
            user: u._id,
            question:question,
            answer:answer,
        })
        return newR;
    }catch(error){
        console.log(error.message)
    }
}

const getUserRecommendations = async (username) =>{
    try{
        mongodbConnection(); 
        const u  = await userService.searchUser(username);
        const rList = await recommendation.find({
            user: u._id,
        })
        return rList;
    }catch(error){
        console.log(error.message)
    }
}

const getUserRecommendations2 = async (userId) =>{
    try{
        mongodbConnection(); 
        const rList = await recommendation.find({user: userId})
        return rList;
    }catch(error){
        console.log(error.message)
    }
}

module.exports = {
    addRecommendation,
    getUserRecommendations,
    getUserRecommendations2
};