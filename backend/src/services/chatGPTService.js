const openai = require('../config/chatGPT');
const prompts = require('../data/prePrompts');

const getAnswerToQuestion = async (question) => {
    try{
        const system = prompts.systemRole;
        const completion = await openai.createChatCompletion({
            model: "gpt-3.5-turbo",
            messages: [
                {"role": "system", "content": system}, 
                {"role": "user", "content": question}
            ],
          });
        return completion.data.choices[0].message;
    }catch(error){
        console.log(error.message)
    }
}

const createQuestion = async (topic,type) => {
    try{
        const system = prompts.systemRole;
        const question = prompts.type + topic;
        const completion = await openai.createChatCompletion({
            model: "gpt-3.5-turbo",
            messages: [
                {"role": "system", "content": system}, 
                {"role": "user", "content": question}
            ],
          });
        const quest = addQuestion(topic, completion.data.choices[0].message);
        return quest;
    }catch(error){
        console.log(error.message)
    }
}

const evaluate = async (history,answer) => {
    try{
        const answer2 = "Is the next answer correct for the previous question? \n" + answer;
        const completion = await openai.createChatCompletion({
            model: "gpt-3.5-turbo",
            messages: [
                history, 
                {"role": "user", "content": answer2}
            ],
          });
    }catch(error){
        console.log(error.message)
    }
}

module.exports = {
    getAnswerToQuestion,
    createQuestion,
    evaluate,
};