require('dotenv').config({path: "env/.env.local"})
const { OpenAI } = require("langchain/llms/openai");

const model = new OpenAI(
    { openAIApiKey: process.env.OPENAI_API_KEY, temperature: 0.5 }
    );

module.export = model;