const mongodbConnection = require('../config/mongodb');
const bcrypt = require('bcryptjs');
const codeService = require('./codeService')
const user = require('../models/user');

//user comprobation in db
const searchUser = async (name) => {
    //find in db
    try{
        mongodbConnection();
        const oneUser = await user.findOne({username:name}).populate('code');
        return oneUser;
    }catch(e){
        console.log(e);
    }
}

const searchUserWithToken = async(rToken) => {
    try{
        mongodbConnection();
        const oneUser = await user.findOne({refreshToken:rToken});
        return oneUser;
    }catch(e){
        console.log(e);
    }

}

const updateTokenFromUser = async(username,token) => {
    try{
        mongodbConnection();
        const oneUser = await user.findOneAndUpdate({username:username},{refreshToken:token},{new:true});
        return oneUser;
    }catch(e){
        console.log(e);
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
        console.log(e);
    }
}

const getAllUsersByCode = async (codeId) => {
    try{
        mongodbConnection();
        const u = await user.find({code:codeId});
        return u;
    }catch(e){
        console.log(e);
    }
}

const deleteUser = async (id) => {
    try{
        mongodbConnection();
        const u = await user.findByIdAndDelete({_id:id});
        return u;
    }catch(e){
        console.log(e);
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
                code: codeO || null,
                profileImage:img,
                role:role
            },
            {new:true});
        return u;
    }catch(e){
        console.log(e);
    }
}

const editUserByName = async (username, newusername, firstname, lastname, email, code, img) => {
    try{
        mongodbConnection();
        console.log(code);
        const codeO = await codeService.getCode(code);
        console.log(codeO)
        const u = await user.findOneAndUpdate({username:username},
            {
                firstName: firstname,
                lastName: lastname,
                username: newusername,
                email:email,
                code: codeO?._id || null,
                profileImage:img,
            },
            {new:true});
        return u;
    }catch(e){
        console.log(e);
    }
}

const addUser = async(username,userRole)=>{
    try{
        const encodePass = bcrypt.hashSync(username,8);
        mongodbConnection();
        const newUser = await user.create({
            username: username, 
            password: encodePass,
            firstName: username,
            lastName: username,
            email: username+"@"+username+".com",
            role: userRole,
          })
        return newUser;
    }catch(e){
        console.log(e);
    }
}

const editPassword = async(username,pwd)=>{
    try{
        const encodePass = bcrypt.hashSync(pwd,8);
        mongodbConnection();
        const u = await user.findOneAndUpdate({username:username},{
            password: encodePass,
          },
          {new:true})
        return u;
    }catch(e){
        console.log(e);
    }
}

const setInitialLevel = async(username,initialLevel)=>{
    try{
        mongodbConnection();
        const u = await user.findOneAndUpdate({username:username},{
            initialLevel: initialLevel,
          },
          {new:true})
        return u;
    }catch(e){
        console.log(e);
    }
}

module.exports = {
    getAllUsersByCode,
    searchUser,
    searchUserWithToken,
    updateTokenFromUser,
    addUser,
    getUser,
    getAllUsers,
    editUser,
    editUserByName,
    deleteUser,
    editPassword,
    setInitialLevel,
}