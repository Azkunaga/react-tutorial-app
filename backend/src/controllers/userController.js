const userService = require('../services/userService');

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
        const updatedUser = await userService.editUser(req.params.id, req.body.firstname, 
            req.body.lastname, req.body.username, req.body.email, req.body.state, req.body.code, req.body.imageName, req.body.userRole);
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

module.exports = {
    getUserById,
    getAllUsers,
    deleteUser,
    editUser,
}