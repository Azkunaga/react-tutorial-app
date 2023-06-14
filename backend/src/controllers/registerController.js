const express = require('express');

const registerUser = require('../services/registerService');

const register = async (req, res, next) => {
    try {
      const {username,password, firstName, lastName, email, role, startedAt} = req.body;
      const user = await registerUser(username,password, firstName, lastName, email, role, startedAt);
      if(!user){
        res.status(401).send({
            message: "User not registered",
            error: error.mesage,
          })
      }else{
        res.status(200).send({
            message: "User registered succesfully",
            user
          })
      }
    } catch (err) {
      res.status(500).send({
        error: error.mesage,
      })
    }
  }

module.exports = register;