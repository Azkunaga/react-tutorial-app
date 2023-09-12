const mongodbConnection = require('../config/mongodb');
const valoration = require('../models/valoration');

const getStatsByQuestionId = async(questionId)=>{
    try {
        const valorations = await valoration.find({question:questionId});
        let sum = 0;
        valorations.forEach( element => {
            sum+=element.value;
        });
        
        return {
            valorations: valorations.length,
            avg: sum/valorations.length || "undefined"
        };
    } catch (error) {
        console.log(error);
    }
}

module.exports = {
    getStatsByQuestionId
}