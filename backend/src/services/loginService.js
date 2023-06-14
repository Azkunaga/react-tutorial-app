const user = require('../models/user');
const mongodbConnection = require('../config/mongodb');

//user comprobation in db
const searchUser = async (name) => {

//find in db
try{
    mongodbConnection();
    const oneUser = await user.find({username:name});
    return oneUser;
}catch(e){
    console.log(e.error);
}

}

module.exports = searchUser;