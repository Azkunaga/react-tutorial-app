const userService = require('../services/userService');
const tutorialService = require('../services/tutorialService')
const codeService = require('../services/codeService');
const valorationService = require('../services/valorationService');
const recommendationService = require('../services/recommendationService');
const answerService = require('../services/answerService');
const partStatsService = require('../services/partStatsService');

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

const getAllUsersByCode = async(req,res) =>{
    try{
        const code = await codeService.getCode(req.body.code);
        if(code){
            const users = await userService.getAllUsersByCode(code._id);
            res.status(200).send({
                users,
              })
        }else{
            res.status(200).send({
                users:[],
              })
        }
       
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
        if(req.body.code){
            const c = await codeService.getCode(req.body.code);
            if(!c){
                return res.status(409).send({
                    message: "Code doesn't exist",
                  })
            }
        }
        const updatedUser = await userService.editUserByName(req.body.user, req.body.username, req.body.firstName, 
            req.body.lastName, req.body.email, req.body.code, req.body.nameimg);
        if(updatedUser){
            return res.status(200).send({
                message: "Edited Correctly",
                user: updatedUser,
              })
        }else{
            return res.status(409).send({
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
            res.status(409).send({
                message: "Error changing password",
            })
        }
    }catch(error){
        res.status(500).send({
            error: error.mesage,
        })
    }
}

const setInitialLevel = async(req,res) => {
    try{
        const u = await userService.setInitialLevel(req.body.username, req.body.initialLevel);
        const first = await tutorialService.getFirstId();
        if(u){
            res.status(200).send({
                message: "Password changed correctly",
                first,
              })
        }else{
            res.status(409).send({
                message: "Error settin inital level",
            })
        }
    }catch(error){
        res.status(500).send({
            error: error.mesage,
        })
    }
}

const getAllMovesByUser = async(req,res)=>{
    try{

        const id = req.body.userId;
        const moves = [];
        const valorations = await valorationService.getValorationsByUser(id);
        const recommendations = await recommendationService.getUserRecommendations2(id);
        const answers = await answerService.getAllAnswersByUser(id);
        const partStats = await partStatsService.getAllByUser(id);

        valorations.forEach(el => {

            moves.push({
                id: el._id,
                part: el.question?.tutorialPart?.name,
                move: "Valoration of a question",
                text: `The user valorated the next question with ${el.value} stars out of 5. \\
                Question: \\
                Question type: ${el.question?.type.name} \\
                Question level: ${el.question?.difficulty.name} \\
                Description ${el.question?.question.description} \\
                The user commented the following:\\
                "${el.comment || "no comments"}"
                `,
                date: el.createdAt,
            })
        });

        recommendations.forEach(el => {
            moves.push({
                id: el._id,
                part: "Recomendations",
                move: "Asked a recommended question",
                text: `The user asked the next question to chatGPT\\
                Question: ${el.question} \\
                And chatGPT gave him the next answer:\\
                ${el.answer}
                `,
                date: el.createdAt,
            })
        });

        answers.forEach(el => {
            let c = ""
            if(el.correct){
                c="**CORRECTLY**"
            }else{
                c="**INCORRECTLY**"
            }
            let h="";
            if(el.correct){
                h="**out**"
            }
            
            moves.push({
                id: el._id,
                part: el.answerToQuestion?.tutorialPart.name,
                move: "Answer to a question",
                text: `The user answered the next question ${c}. \ 
                Question: \\
                Question type: ${el.answerToQuestion?.type.name} \\
                Question level: ${el.answerToQuestion?.difficulty.name} \\
                Description: ${el.answerToQuestion?.question.description} \\
                The user answered the following **with** ${h} help: "${el.answer}"`,
                date: el.createdAt,
            })
            });

            partStats.forEach(el => {
                moves.push({
                    id: el._id,
                    part: el.tutorialPart.name,
                    move: "Marked a part as done",
                    text: `The user marked the following part as done\\
                    Part: ${el.tutorialPart.name}\\
                    These are some stats of the user in this part: \\
                    Duration: ${el.duration} seconds\\
                    Return number: ${el.return} `,
                    date: el.createdAt,
                })
            });

            moves.sort((a,b)=> new Date(b.date) - new Date(a.date));
       
        res.status(200).send({
            moves
        })
       
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
    setInitialLevel,
    getAllUsersByCode,
    getAllMovesByUser,
}