const mongodbConnection = require('../config/mongodb');

const user = require('../models/user');

//user comprobation in db
const searchUser = async (name) => {
    //find in db
    try{
        mongodbConnection();
        const oneUser = await user.findOne({username:name});
        return oneUser;
    }catch(e){
        console.log(e.error);
    }
}

const searchUserWithToken = async(rToken) => {
    try{
        mongodbConnection();
        const oneUser = await user.findOne({refreshToken:rToken});
        return oneUser;
    }catch(e){
        console.log(e.error);
    }

}

const updateTokenFromUser = async(username,token) => {
    try{
        mongodbConnection();
        const oneUser = await user.findOneAndUpdate({username:username},{refreshToken:token},{new:true});
        return oneUser;
    }catch(e){
        console.log(e.error);
    }
}

const getUser = async (id) => {
    try{
        mongodbConnection();
        const u = await user.findOne({_id:id});
        return u;
    }catch(e){

    }
}

const getAllUsers = async () => {
    try{
        mongodbConnection();
        const u = await user.find();
        return u;
    }catch(e){
        console.log(e.error);
    }
}

const deleteUser = async (id) => {
    try{
        mongodbConnection();
        const u = await user.findByIdAndDelete({_id:id});
        return u;
    }catch(e){
        console.log(e.error);
    }
}

const editUser = async (id) => {
    try{
        mongodbConnection();
        const u = await user.findOneAndUpdate({_id:id});
        return u;
    }catch(e){
        console.log(e.error);
    }
}

module.exports = {
    searchUser,
    searchUserWithToken,
    updateTokenFromUser,
    getUser,
    getAllUsers,
    editUser,
    deleteUser
}