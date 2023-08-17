const { PromptTemplate,  } = require('langchain/prompts');

const systemRole = "You are a computer science lecturer that handles students nicely but in a direct and helpfull maner," +
"correcting their mistakes, and indicating ways to improve their learning. You are going to correct and create exercises for React.";

const recommendPrompt = PromptTemplate.fromTemplate(
  `You are a React tutoring system.

  The user has problems in the following parts of the React tutorial:

  {component}

  Which are the common 10 questions you are made about those topics that can help a user in their learning progress? 
  
  Just give the questions.
  `
);

const codeExPrompt = PromptTemplate.fromTemplate(
  `Create a {level} exercise statement that ask the student to crate something using React {component}?
  Give the exercise starting with "Exercise:". 
  Give the correct answer of the exercise starting with "Correct answer:"
  `
);

const fillPrompt = PromptTemplate.fromTemplate(
  `Create a {level} fill in the gap exercise, just one, about React {component}.
  Give {opt}. Give the list disordered.

  Give the exercise starting with "Exercise:". 
  Give the correct answer of the exercise starting with "Correct answer:"
  `
);

const testPrompt = PromptTemplate.fromTemplate(
  `Create a {level} TEST question about React {component}
  {opt}.
  Start with "Exercise:". 
  Give the correct answer/answers of the exercise starting with "Correct answer:"`
);

const topicPrompt = PromptTemplate.fromTemplate(`
You will perform as a tutorial system in a React Environment. Now with some user information you will have to modulate the user. 

You will receive the user performance through the different tutorial principal parts, such as, correct and wrong answers, time on each part and how many
times has the user return to that part.

{data}

Decide which of the parts are the most problematics for the user. Just give the "topicName".
Give the answer starting with "Parts:".
`);

const typePrompt = PromptTemplate.fromTemplate(
  `You will perform as a tutorial system in a React Environment. Now with some user information you will have to modulate the user. 

  The user is right now in part "{tutorialPart}" and has this stats in the exercises of that part:
  
  {data}

  Decide which type of exercise(exerciseType) should suit best the user to improve.  Just mention the exerciseType, dont give extra explanations.
  `
);

const levelPrompt = PromptTemplate.fromTemplate(
  `You will perform as a tutorial system in a React Environment. Now with some user information you will have to modulate the user. 

  The user is right now in part "{tutorialPart}" and has this stats in the "{exerciseType}" exercises of that part:
  
  {data}

  Decide which level of exercise should suit the best the user to improve.  Just mention the level, dont give extra explanations.
  Decide: Easy, medium or hard. 
  `
);

const answerEvaluationPrompt = PromptTemplate.fromTemplate(
  `You will receive the user answer to a exercise about React.
  
  Exercise: {question}

  Possible answer: {pAnswer}

  Answer given by the user: {answer}

  Correct the user answer and give explanations or/and tips. 
  Start the correction with Yes/No. 
  `
);

const helpPrompt = PromptTemplate.fromTemplate(
  `You will perform as a React tutoring system.
  You will receive a exercise about React.
  
  Exercise: {question}

  Possible answer: {pAnswer}

  Give some tips to solve this exercise divided by dots.
  `
);

const exerciseContext = PromptTemplate.fromTemplate(
  `You will perform as a tutorial system in a React Environment.

  React tutorial parts:
  Setting up a development environment
  Understanding the basics of React
    ES6
    Components
      Create one
      Import/Export
      JSX
      Props
      Conditionals
      lists
      interactivity
      events
      Pure components
  Hooks
  Interacting with APIs
  Scape hatches
  Working with React Router
  Building a simple React application
  Styling React components
  Deploying a React application

  The user is now completing {tutorialPart}. Do not use understandings below that for the creation of exercises.
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




