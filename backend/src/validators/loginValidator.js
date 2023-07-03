const loginValidator = (req, res, next) =>{

    //user
    let user = req.body.username;
    if(!user){
      res.status(404).send({ message: "User is required." });
      return;
    }

    //password
    let password = req.body.pwd;
    if(!password){
      res.status(404).send({ message: "Password is required." });
      return;
    }

    //controller
    next();

}

module.exports = loginValidator;