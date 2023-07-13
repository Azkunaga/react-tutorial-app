const { LLMChain } = require("langchain/chains");
const model = require('../config/llm');
const prompts =  require('./promptTemplates');

const recommendChain = new LLMChain({ llm: model, prompt: prompts.recommendPrompt });
const codeExChain = new LLMChain({ llm: model, prompt: prompts.codeExPrompt });
const fillChain = new LLMChain({ llm: model, prompt: prompts.fillPrompt });
const testChain = new LLMChain({ llm: model, prompt: prompts.testPrompt });
const chatGPTChain = new LLMChain({ llm: model, prompt: prompts.chatGPTPrompt });


module.exports = {
    recommendChain,
    codeExChain,
    fillChain,
    testChain,
    chatGPTChain
}