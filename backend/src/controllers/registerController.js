const {registerUser} = require('../services/registerService');

const register = async (req, res, next) => {
  try {
    const {username, pwd, firstName, lastName, email, role, code} = req.body;
    const user = await registerUser(username, pwd, firstName, lastName, email, role, code, null);
    if(!user){
      return res.status(409).send({
          message: "User not registered",
        })
    }else{
      return res.status(200).send({
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