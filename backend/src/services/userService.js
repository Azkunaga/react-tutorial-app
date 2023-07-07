const mongodbConnection = require('../config/mongodb');

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

const updateTokenFromUser = async(user,token) => {
    try{
        mongodbConnection();
        const oneUser = await user.update({username:user},{refreshToken:token});
        oneUser.save();
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