const express = require('express');

const searchUser = require('../services/loginService');

const login = async (req,res) => {
    //db comprobation
    try{
        const user = await searchUser(req.body.user,req.body.password);
        if(!user){
            res.json({
                successful:false,
                error: {text: ['User/Email does not exist']}
               })
        }else{
            //save user in 
            res.json({
                successful:true,
                message: {text: ['Succesfully logged in']},
                user
            })
        }
    }catch(error){
        res.json({
            successful:false,
            error: error.mesage,
          })
    }
}

module.exports = login;