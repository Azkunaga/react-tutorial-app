const user = require('../models/user');
const mongodbConnection = require('../config/mongodb');
const bcrypt = require('bcryptjs');
const codeService = require('./codeService');

const registerUser = async (username, password, firstName, lastName, email, role, code, refreshToken) =>{
    try{
        mongodbConnection(); 
        const encodePass = bcrypt.hashSync(password,8);
        const codeObj = await codeService.getCode(code);
        const newUser = await user.create({
            username: username, 
            password: encodePass,
            firstName: firstName,
            lastName: lastName,
            email: email, 
            role: role,
            code: codeObj,
            refreshToken:refreshToken
          })
        console.log(newUser);
        return newUser;
    }catch(error){
        console.log(error.message)
    }
}

module.exports = {
    registerUser
};