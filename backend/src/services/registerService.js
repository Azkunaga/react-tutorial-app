const user = require('../models/user');
const mongodbConnection = require('../config/mongodb');
const bcrypt = require('bcryptjs');

const registerUser = async (username, password, firstName, lastName, email, role, startedAt) =>{
    try{
        console.log(req.body);
        mongodbConnection(); 
        const encodePass = bcrypt.hashSync(password,8);
        const newUser = await user.create({
            username: username, 
            password: encodePass,
            firstName: firstName, 
            lastName: lastName, 
            email: email, 
            role:role,
            startedAt: startedAt,
          })
        console.log(newUser);
        newUser.save();
        return newUser;
    }catch(error){
        console.log(error.message)
    }
}

module.exports = {
    registerUser
};