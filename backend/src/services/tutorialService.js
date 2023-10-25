const tutorialPart = require('../models/tutorialPart');
const topic = require('../models/topic');
const questionService = require('./questionService');
const answerService = require('./answerService');
const partStatsService = require('./partStatsService');
const userService = require('./userService');

const mongodbConnection = require('../config/mongodb');

const getPart = async(partName) => {
    try{
        mongodbConnection();
        const tp = await tutorialPart.findOne({name: partName})
        return tp;
    }catch(error){
        console.log(error.message)
    }
}

const getPartsNamesAndId = async()=>{
    try{
        mongodbConnection();
        const parts = await tutorialPart.find().select('_id, name');
        return parts;
    }catch(error){
        console.log(error.message)
    }  
}

const getPartById = async(id) =>{
    try{
        mongodbConnection();
        if(id==="undefined"){
            return null;
        }
        const tp = await tutorialPart.findById({_id: id}).populate('topic');
        return tp;
    }catch(error){
        console.log(error)
    }
}

const addPart = async(topicId,name,part,text) => {
    try{
        mongodbConnection();
        const t =  await topic.findOne({
            _id:topicId,
        })
        if(!t){
            return null;
        }
        const tp = tutorialPart.create({
            topic:t,
            name:name,
            part:part,
            text:text,
        })
        return tp;
    }catch(error){
        console.log(error.message)
    }
}

const deletePart = async(partId) => {
    try{
        mongodbConnection();
        await questionService.deleteByPart(partId);
        await tutorialPart.deleteOne({
            _id:partId,
        })
    }catch(error){
        console.log(error.message)
    }
}

const deleteByTopic = async (topicId) => {
    try{
        console.log("deletebytopic")
        mongodbConnection();
        const parts = await getPartsByTopic(topicId);
        await parts.forEach(async element => {
            await deletePart(element._id);
        });
    }catch(error){
        console.log(error.message)
    }
}

const editPart = async(id,part,name,text) =>{
    try{
        mongodbConnection();
        const t = await tutorialPart.findOneAndUpdate({_id:id},{part:part,name:name,text:text},{ new: true });
        return t;
    }catch(error){
        console.log(error.message)
    }
}

const getPartsByTopic = async(topicId) =>{
    try{
        mongodbConnection();
        const parts = await tutorialPart.find({
            topic:topicId,
        }).sort({part: 'asc'});
        return parts;
    }catch(error){
        console.log(error.message)
    }
}

const getPartProgress = async (username,partId) => {
    try {
        let progress = 0;
        const partStats = await partStatsService.getPartStats(partId,username);
        const exercises = await questionService.getValidQuestionsByPart(partId);
        if(exercises.length>0){
            const answers = await answerService.getAnswersByUserAndPart(username,exercises);
            let correctNum = 0;
            if(answers.length>0){
                correctNum = answers.filter(ans => ans.correct).length;
                progress = progress + ((correctNum/(exercises.length))*100)/2;
            }
        }

        if(partStats?.done){
            if(exercises.length===0){
                progress = 100;
            }else{
                progress+=50;
            }
        }

        return progress;
       
    } catch (error) {
        console.log(error);
    }
}

const isDone = async (username, partId) => {
    try {
        const partStats = await partStatsService.getPartStats(partId,username);
        if(partStats?.done){
            return true;
        }else{
            return false;
        }
    } catch (error) {
        console.log(error);
    }
}

const getLastPartId = async(username) => {
    try {
        const partStats = await partStatsService.getLast(username);
        if(partStats){
            return partStats.tutorialPart._id;
        }else{
            const user = await userService.searchUser(username);
            if(!user.initialLevel){
                return "start";
            }else{
                const first = await getFirstId();
                return first;
            }
        }
    } catch (error) {
        console.log(error);
    }
}

const getFirstId = async () => {
    try {
        console.log("getting first partid")
        const firstTopic = await topic.findOne({order:1});
        const parts = await getPartsByTopic(firstTopic._id);
        return parts[0]._id;
    } catch (error) {
        console.log(error);
    }
}

const nextPart = async (tpart) =>{
    try{
        const nextp = await tutorialPart.findOne({topic:tpart.topic._id, part:tpart.part+1});
        return nextp;
    }catch(error){
        console.log(error);
    }
}

module.exports = {
    getPartsNamesAndId,
    getPartById,
    getPart,
    addPart,
    deletePart,
    deleteByTopic,
    editPart,
    getPartsByTopic,
    getPartProgress,
    isDone,
    getLastPartId,
    getFirstId,
    nextPart
}