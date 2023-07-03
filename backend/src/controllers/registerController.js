const {registerUser} = require('../services/registerService');

const register = async (req, res, next) => {
  try {
    const {username, pwd, firstName, lastName, email, role} = req.body;
    const user = await registerUser(username, pwd, firstName, lastName, email, role);
    if(!user){
      res.status(401).send({
          message: "User not registered",
        })
    }else{
      res.status(200).send({
          message: "User registered succesfully",
          user,
        })
    }
  } catch (error) {
    res.status(500).send({
      error: error.mesage,
    })
  }
}

module.exports = register;