import { PromptTemplate } from "langchain/prompts";

const systemRole = "You are a computer science lecturer that handles students nicely but in a direct and helpfull maner," +
"correcting their mistakes, and indicating ways to improve their learning. You are going to correct and create exercises for React.";

const recommendPrompt = PromptTemplate.fromTemplate(
  "Which are the common questions about React {component}?"
);

const codeExPrompt = PromptTemplate.fromTemplate(
  "Create a {level} exercise statement that ask the student to crate something using {component}?"
);

const fillPrompt = PromptTemplate.fromTemplate(
  "Create a {level} fill in the gap exercise about React {component}." +
  "Give {options}. Give the list disordered."
);

const testPrompt = PromptTemplate.fromTemplate(
  "Create a {level} quiz question about React {component}" +
  "4 answers. {options}."
);

const chatGPTPrompt = PromptTemplate.fromTemplate(`You will receive the user performance
through the different tutorial parts, such as, correct and wrong answers, time on each part and how many
times has the user return to that part.

{data}

Decide which of the topics is where the user has more problems:`);

module.exports = {
  recommendPrompt,
  systemRole,
  codeExPrompt,
  fillPrompt,
  testPrompt,
  chatGPTPrompt
}




