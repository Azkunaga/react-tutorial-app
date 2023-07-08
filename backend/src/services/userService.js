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

module.exports = {
    searchUser,
    searchUserWithToken,
    updateTokenFromUser
}