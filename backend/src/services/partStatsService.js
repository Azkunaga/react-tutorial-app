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
        console.log(error)
    }
}

const getPartStats = async (partId, user) => {
    try{
        mongodbConnection();
        const u = await userService.searchUser(user);
        // const tp = await tutorialService.getPartById(partId);
        const ps = await partStats.findOne({
            tutorialPart:partId,
            user: u,
        })
        return ps;
    }catch(error){
        console.log(error)
    }
}

const getAll = async () => {
    try{
        mongodbConnection();
        const all = await partStats.find();
        return all;
    }catch(error){
        console.log(error)
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
        console.log(error)
    }
}

const getLast = async(username)=>{
    try {
        mongodbConnection();
        const u = await userService.searchUser(username);
        const ps = await partStats.findOne({user:u._id}).sort({createdAt:-1});
        return ps;
    } catch (error) {
        console.log(error)
    }
}

const completePart = async(username,partId,duration)=>{
    try{
        const ps = await getPartStats(partId,username);
        if(ps){
            const newDuration = duration + ps.duration;
            const newReturn = ps.return + 1;
            const updated = await partStats.findOneAndUpdate({_id:ps._id},{
                done:true,
                duration:newDuration,
                return:newReturn,
            })
            return updated;
        }else{
            const u = await userService.searchUser(username);
            mongodbConnection();
            const newPs =  await partStats.create({
                tutorialPart:partId,
                user:u._id,
                done:true,
                duration:duration,
            })
            return newPs;
        }
    }catch(error){
        console.log(error)
    }
}

const getAllByUser = async (userId)=>{
    try {
        mongodbConnection();
        const ps = await partStats.find({user:userId}).populate('tutorialPart');
        return ps;
    } catch (error) {
        console.log(error)
    }
}

module.exports = {
    addPartStats,
    getPartStats,
    getAll,
    deletePartStats,
    getLast,
    completePart,
    getAllByUser
}