require('dotenv').config({path: "env/.env.local"})
const { OpenAI } = require("langchain/llms/openai");

const model = new OpenAI({ 
    modelName: "gpt-3.5-turbo",
    openAIApiKey: process.env.OPENAI_API_KEY, 
    temperature: 0,
});


module.exports = model;