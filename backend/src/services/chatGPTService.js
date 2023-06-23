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
        let question = "";
        switch (topic) {
            case "fillGaps1":
                question = prompts.fillEx + topic + prompts.fillSameOptionsEx;
                break;
            case "fillGaps2":
                question = prompts.fillEx + topic + prompts.fillMoreOptionsEx;
                break;
            case "code":
                question = prompts.codeEx + topic;
                break;
            case "test1":
                question = prompts.testEx + topic + prompts.testExTrueFalse;
                break;
            case "test2":
                question = prompts.testEx + topic + prompts.testOneEx;
                break;
            case "test3":
                question = prompts.testEx + topic + prompts.testMultipleEx;
                break;
            default:
                break;
        }
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