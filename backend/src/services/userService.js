const mongodbConnection = require('../config/mongodb');

const codeService = require('./codeService')
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
        const u = await user.findOne({_id:id}).populate('profileImage');
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

const editUser = async (id, firstName, lastName, username, email, state, code, img, role) => {
    try{
        mongodbConnection();
        const codeO = await codeService.getCode(code);
        const u = await user.findOneAndUpdate({_id:id},
            {
                firstName: firstName,
                lastName: lastName,
                username: username,
                email:email,
                state:state,
                code:codeO || null,
                profileImage:{
                    data: img.buffer,
                    contentType: img.mimetype,
                },
                role:role
            },
            {new:true});
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