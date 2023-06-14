const user = require('../models/user');
const mongodbConnection = require('../config/mongodb');

//user comprobation in db
const searchUser = (name,pass) => {

//find in db
try{
    mongodbConnection();
    const oneUser = user.find({username:name, password:pass});
    return oneUser;
}catch(e){
    console.log(e.error);
}

}

module.exports = searchUser;