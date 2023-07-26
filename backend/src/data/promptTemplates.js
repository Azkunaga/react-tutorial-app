const { PromptTemplate,  } = require('langchain/prompts');

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

const topicPrompt = PromptTemplate.fromTemplate(`You will receive the user performance
through the different tutorial parts, such as, correct and wrong answers, time on each part and how many
times has the user return to that part.

{data}

Decide which of the topics is where the user has more problems:`);

const typePrompt = PromptTemplate.fromTemplate(
  `You are a user modeling system in a React tutorial. You will receive the user performance through the exercises types, such as, correct and wrong answers.
  With this information you have to decide which of the exercise types is the best for the user progress.
  
  Data:{data}

  Which ExerciseType should be the next? Just tell me the name:
  `
);

const levelPrompt = PromptTemplate.fromTemplate(
  `You will receive the user performance through the exercises, such as, correct and wrong answers, time on each exercise and how many
  times has the user return to that part.
  
  {data}

  Decide which level should have the next exercises. 
  Decide: Easy, medium or difficult. 
  `
);

const answerEvaluationPrompt = PromptTemplate.fromTemplate(
  `You will receive the user answer to a exercise about React.
  
  Exercise: {question}

  User answer: {answer}

  Correct the user answer and give explanations or/and tips. 
  Start the correction with Yes/No. 
  `
);

const helpPrompt = PromptTemplate.fromTemplate(
  `You will receive a exercise about React.
  
  Exercise: {question}

  Give some tips to solve this exercise divided by dots.
  `
);

module.exports = {
  recommendPrompt,
  systemRole,
  codeExPrompt,
  fillPrompt,
  testPrompt,
  topicPrompt,
  typePrompt,
  levelPrompt,
  helpPrompt,
  answerEvaluationPrompt,
}




