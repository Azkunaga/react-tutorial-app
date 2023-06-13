const loginValidator = (req,res, next) =>{

    //user
    let user = req.body.user;
    if(!user){
       return res.json({
        successful:false,
        error: {text: ['User/Email is required']}
       })
    }

    //password
    let password = req.body.password;
    if(!password){
       return res.json({
        successful:false,
        error: {text: ['Password is required']}
       })
    }

    //controller
    next();

}

module.exports = loginValidator;