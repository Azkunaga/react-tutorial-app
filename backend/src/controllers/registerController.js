const express = require('express');

const registerUser = require('../services/registerService');

const register = async (req, res, next) => {
    try {
      const {firstName, lastName, email,username,password,startedAt} = req.body;
      const user = await registerUser(firstName, lastName, email,username,password,startedAt);
      if(!user){
        res.status(401).json({
            message: "User not successful registered",
            error: error.mesage,
          })
      }else{
        res.status(200).json({
            message: "User registered succesfully",
            user
          })
      }
    } catch (err) {
      res.status(401).json({
        message: "User not successful registered",
        error: error.mesage,
      })
    }
  }

module.exports = register;