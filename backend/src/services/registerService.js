const user = require('../models/user');
const mongodbConnection = require('../config/mongodb');

const registerUser = async (firstName, lastName, email,username,password,startedAt) =>{
    try{
        mongodbConnection();
        const newUser = await user.create({
            firstName, lastName, email, username, password, startedAt,
          })
        return newUser;
    }catch(error){
        console.log(error.message)
    }
}

module.exports = registerUser;