const { PromptTemplate,  } = require('langchain/prompts');

const systemRole = "You are a computer science lecturer that handles students nicely but in a direct and helpfull maner," +
"correcting their mistakes, and indicating ways to improve their learning. You are going to correct and create exercises for React.";

const recommendPrompt = PromptTemplate.fromTemplate(
  "Which are the common questions about React {component}?"
);

const codeExPrompt = PromptTemplate.fromTemplate(
  `Create a {level} exercise statement that ask the student to crate something using React {component}?
  Give the statement starting with “Exercise:”. Give the possible answer starting with “Answer:”
  `
);

const fillPrompt = PromptTemplate.fromTemplate(
  `Create a {level} fill in the gap exercise about React {component}.
  Give {options}. Give the list disordered.
  Give the statement starting with “Exercise:”. Give the possible answer starting with “Answer:”`
);

const testPrompt = PromptTemplate.fromTemplate(
  `Create a {level} quiz question about React {component}
  4 answers. {options}.
  Give the statement starting with “Exercise:”. Give the possible answer starting with “Answer:”`
);

const topicPrompt = PromptTemplate.fromTemplate(`
You will perform as a tutorial system in a React Environment. Now with some user information you will have to modulate the user. 

You will receive the user performance through the different tutorial parts, such as, correct and wrong answers, time on each part and how many
times has the user return to that part.

{data}

Decide which of the topics is where the user has more problems. Just mention the topic. Dont give extra explanations.`);

const typePrompt = PromptTemplate.fromTemplate(
  `You will perform as a tutorial system in a React Environment. Now with some user information you will have to modulate the user. 

  The user is right now in part {tutorialPart} and has this stats in the exercises of that part:
  
  {data}

  Decide which type of exercise should suit best the user to improve.  Just mention the type, dont give extra explanations.
  `
);

const levelPrompt = PromptTemplate.fromTemplate(
  `You will perform as a tutorial system in a React Environment. Now with some user information you will have to modulate the user. 

  The user is right now in part {tutorialPart} and has this stats in the {exerciseType} exercises of that part:
  
  {data}

  Decide which level of exercise should suit the best the user to improve.  Just mention the level, dont give extra explanations.
  Decide: Easy, medium or hard. 
  `
);

const answerEvaluationPrompt = PromptTemplate.fromTemplate(
  `You will receive the user answer to a exercise about React.
  
  Exercise: {question}

  Possible answer: {pAnswer}

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




