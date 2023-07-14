const { LLMChain } = require("langchain/chains");
const model = require('../config/llm');
const prompts =  require('./promptTemplates');

const recommendChain = new LLMChain({ llm: model, prompt: prompts.recommendPrompt });
const codeExChain = new LLMChain({ llm: model, prompt: prompts.codeExPrompt });
const fillChain = new LLMChain({ llm: model, prompt: prompts.fillPrompt });
const testChain = new LLMChain({ llm: model, prompt: prompts.testPrompt });
const topicChain = new LLMChain({ llm: model, prompt: prompts.topicPrompt });
const typeChain = new LLMChain({ llm: model, prompt: prompts.typePrompt });
const levelChain = new LLMChain({ llm: model, prompt: prompts.levelPrompt });
const answerEvaluationChain = new LLMChain({ llm: model, prompt: prompts.answerEvaluationPrompt });

module.exports = {
    recommendChain,
    codeExChain,
    fillChain,
    testChain,
    topicChain,
    typeChain,
    levelChain,
    answerEvaluationChain
}