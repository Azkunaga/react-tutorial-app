const user = require('../models/user');
const mongodbConnection = require('../config/mongodb');

//user comprobation in db
const searchUser = async (name) => {
    //find in db
    try{
        console.log("LoginService");
        mongodbConnection();
        const oneUser = await user.findOne({username:name});
        return oneUser;
    }catch(e){
        console.log(e.error);
    }

}

module.exports = {searchUser};