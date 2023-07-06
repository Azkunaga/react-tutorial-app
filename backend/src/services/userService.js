const mongodbConnection = require('../config/mongodb');

const searchUserWithToken = async(rToken) => {
    try{
        mongodbConnection();
        const oneUser = await user.findOne({refreshToken:rToken});
        return oneUser;
    }catch(e){
        console.log(e.error);
    }

}

const deleteTokenFromUser = async(user) => {
    try{
        mongodbConnection();
        const oneUser = await user.update({username:user},{refreshToken:null});
        oneUser.save();
        return oneUser;
    }catch(e){
        console.log(e.error);
    }

}

module.exports = {
    searchUserWithToken,
    deleteTokenFromUser
}