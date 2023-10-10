const userService = require('../services/userService');

const addUser = async(req, res) =>{
    try {
        const user = await userService.addUser(req.body.username,req.body.userRole);
        if(user){
            res.status(200).send({
                message: "User added",
                user,
              })
        }else{
            res.status(401).send({
                message: "User not added",
            })
        }
    } catch (error) {
        res.status(500).send({
            error: error.mesage, 
        })
    }
}

const getUserById = async (req,res) => {
    try{
        const user = await userService.getUser(req.params.id);
        if(user){
            res.status(200).send({
                message: "User found",
                user,
              })
        }else{
            res.status(401).send({
                message: "User not found",
            })
        }
        
    }catch (error) {
        res.status(500).send({
            error: error.mesage, 
        })
    }
}

const getUserByName = async (req,res) => {
    try{
        const user = await userService.searchUser(req.body.user);
        if(user){
            res.status(200).send({
                message: "User found",
                user,
              })
        }else{
            res.status(401).send({
                message: "User not found",
            })
        }
        
    }catch (error) {
        res.status(500).send({
            error: error.mesage, 
        })
    }
}

const deleteUser = async (req,res) => {
    try{
        await userService.deleteUser(req.params.id)
        res.status(200).send({
            message: "Deleted Correctly",
          })
    }catch (error) {
        res.status(500).send({
        error: error.mesage, 
        })
    }
}

const getAllUsers = async(req,res) =>{
    try{
        const users = await userService.getAllUsers();
        res.status(200).send({
            users,
          })
    }catch (error) {
        res.status(500).send({
            error: error.mesage, 
        })
    }
}

const editUser = async(req,res) => {
    try{
        const updatedUser = await userService.editUser(req.params.id, req.body.firstName, 
            req.body.lastName, req.body.username, req.body.email, req.body.state, req.body.code, req.body.imgName, req.body.userRole);
        res.status(200).send({
            message: "Edited Correctly",
            user:updatedUser,
          })
    }catch (error) {
        res.status(500).send({
            error: error.mesage,
        })
    }
}

const editUserByName = async(req,res) => {
    try{
        console.log("contr")
        const updatedUser = await userService.editUserByName(req.body.user, req.body.username, req.body.firstName, 
            req.body.lastName, req.body.email, req.body.code, req.body.imgName);
        if(updatedUser){
            res.status(200).send({
                message: "Edited Correctly",
                user: updatedUser,
              })
        }else{
            res.status(401).send({
                message: "User not edited correctly",
            })
        }

    }catch (error) {
        res.status(500).send({
            error: error.mesage,
        })
    }
}

const editPassword = async(req,res) => {
    try{
        const u = await userService.editPassword(req.body.user, req.body.pwd)
        if(u){
            res.status(200).send({
                message: "Password changed correctly",
              })
        }else{
            res.status(401).send({
                message: "Error changing password",
            })
        }
    }catch(error){
        res.status(500).send({
            error: error.mesage,
        })
    }
}

module.exports = {
    addUser,
    getUserById,
    getUserByName,
    getAllUsers,
    deleteUser,
    editUser,
    editUserByName,
    editPassword,
}