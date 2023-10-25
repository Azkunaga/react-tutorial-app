const recommendationService = require('../services/recommendationService')

const addRecommendation = async (req,res) => {
    try{
        
        res.status(200).send({
            message: "Correctly Added",
          })
    }catch (error) {
        res.status(500).send({
        error 
        })
    }
}

const getUserRecommendations = async(req,res) =>{
    try{
        const recommendations = []
        res.status(200).send({
            message: "Correctly Added",
            recommendations,
          })
    }catch (error) {
        res.status(500).send({
        error 
        })
    }
}

module.exports = {
    addRecommendation,
    getUserRecommendations
}