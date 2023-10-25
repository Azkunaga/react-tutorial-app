const codeService = require('../services/codeService')
const userService = require('../services/userService');

const addCode = async (req,res) => {
    try{
        const user = await userService.searchUser(req.body.username)
        const code = await codeService.addCode(user._id,req.body.code);
        res.status(200).send({
            message: "Correctly Added",
            code:code,
          })
    }catch (error) {
        res.status(500).send({
        error 
        })
    }
}

const getCodesByTeacher = async(req,res) =>{
    try{
        const user = await userService.searchUser(req.body.username);
        const codes = await codeService.getCodesByTeacher(user._id);
        res.status(200).send({
            codes
          })
    }catch (error) {
        res.status(500).send({
        error 
        })
    }
}

module.exports = {
    addCode,
    getCodesByTeacher
}