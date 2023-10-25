const mongodbConnection = require('../config/mongodb');
const valoration = require('../models/valoration');

const createValoration = async(userId, questionId,stars,comment)=>{
    try {
        mongodbConnection();
        const val = await valoration.create({
            user:userId,
            question:questionId,
            value:stars,
            comment:comment,
        })
        return val;
    } catch (error) {
        console.log(error);
    }
}

const getStatsByQuestionId = async(questionId)=>{
    try {
        mongodbConnection();
        const v = await valoration.findOne({question:questionId});
        return v;
    } catch (error) {
        console.log(error);
    }
}

const getValorationsByUser = async(userId) =>{
    try {
        mongodbConnection();
        console.log("valoration get")
        const v = await valoration.find({user:userId}).populate({
            path : 'question',
            populate : {
              path : 'type,difficulty'
            }
          });
        return v;
    } catch (error) {
        console.log(error);
    }
}

module.exports = {
    createValoration,
    getStatsByQuestionId,
    getValorationsByUser
}