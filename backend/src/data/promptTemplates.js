const { PromptTemplate,  } = require('langchain/prompts');

const systemRole = "You are a computer science lecturer that handles students nicely but in a direct and helpfull maner," +
"correcting their mistakes, and indicating ways to improve their learning. You are going to correct and create exercises for React.";

const recommendPrompt = PromptTemplate.fromTemplate(
  `You are a React tutoring system.

  The user has problems in the following parts of the React tutorial:

  [{component}]

  Which are the common 5 questions you are made about those topics that can help a user in their learning progress? 
  
  Just give the questions iside a list as the next structure.
  Structure: ["Question1?","Question2","Question3","Question4","Question5"]
  `
);

const codeExPrompt = PromptTemplate.fromTemplate(
  `React enviroment. Create a {level} exercise statement that ask the student to code or write something in relation with "{component}" which is part of "{topic}" in a tutorial.
  
  Give the exercise directly following the next structure. Replace "question" by the ones you choose using MARKDOWN syntax.
  {structure}

  Give the exercise starting with "Exercise:" and directly the exercise structure, NO MORE.
  Give the correct answer of the exercise starting with "Correct answer:".

  DO NOT REPEAT the following exercises:
  {repeat}

  Output Example:
  "
  Exercise:{structure}
  Correct answer: Here the correct answer
  "
  `
);

const fillPrompt = PromptTemplate.fromTemplate(
  `React enviroment. Create a {level} FILL IN THE GAP exercise about "{component}" which is part of "{topic}" in a tutorial. 
   Create a exercise where the user has fill EMPTY GAPS from the text you provide to complete a text or to complete React CODE.
   Fill in the gap exercise especifications: {opt}.

  Give the exercise directly following the next structure. Replace "question" using MARKDOWN syntax, and "chances" (gaps) by the ones you choose.
  {structure}

  Use MARKDOWN syntax in question.
  Give the exercise starting with "Exercise:" and directly the exercise structure, NO MORE.
  Give the correct answer of the exercise starting with "Correct answer:".

  DO NOT REPEAT the following exercises:
  {repeat}

  Output example:
  "
  Exercise:{structure}
  Correct answer: here the correct answer
  "
  `
);

const testPrompt = PromptTemplate.fromTemplate(
  `React enviroment. Create a {level} TEST question about "{component}" which is part of "{topic}" in a tutorial.
  Test exercise especifications: {opt}.

  Give the exercise directly following the next structure. Replace "question" using MARKDOWN syntax, and "chances" by the ones you choose depending on the structure (no true/false exercise). 
  Use MARKDOWN syntax in question.
  {structure}

  Give the exercise starting with "Exercise:" and directly the exercise structure, NO MORE.
  Give the correct answer of the exercise starting with "Correct answer:".

  DO NOT REPEAT the following exercises:
  {repeat}

  Output Example:

  "
  Exercise:{structure}
  Correct answer: Here the correct answer
  "
  
  `
);

const topicPrompt = PromptTemplate.fromTemplate(`
You will perform as a tutorial system in a React Environment. Now with some user information you will have to modulate the user. 

You will receive the user performance through the different tutorial principal parts, such as, correct and wrong answers, time on each part and how many
times has the user return to that part.

{data}

Decide which ones are the most problematic for the user, just analyze those that have enough information. Just give the "topicName".
Give the answer starting with "Parts:".
`);

const typePrompt = PromptTemplate.fromTemplate(
  `You will perform as a tutorial system in a React Environment. Now with some user information you will have to modulate the user. 

  The user is right now in part "{tutorialPart}" and has this stats in the exercises of that part:
  
  {data}

  Decide which type of exercise(exerciseType) should suit best the user to improve. Try not to select usually a fill in the gaps exerciseType.
  Just mention the exerciseType, dont give extra explanations.
  `
);

const levelPrompt = PromptTemplate.fromTemplate(
  `You will perform as a tutorial system in a React Environment. Now with some user information you will have to modulate the user. 

  The user initial level of React is {initialLevel}. The user is right now in part "{tutorialPart}" and has this stats in the "{exerciseType}" exercises of that part:
  
  {data}

  Decide which level of exercise should suit the best the user to improve.  Just mention the level, dont give extra explanations.
  Decide: easy, medium or hard. 
  `
);

const answerEvaluationPrompt = PromptTemplate.fromTemplate(
  `You will receive the user answer to a exercise about React. 
  
  Exercise: {question}

  Exercise option(if there are any): {chances}

  Correct answer: {pAnswer}

  Answer given by the user: {answer}

  Check if the answer given by the user is correct and give explanations or/and tips. 
  Start the correction with Yes/No in relation with the user answer and in a new line continue with the correction.
  Give all the response in markdown syntax so it can be added to a website.
  `
);

const helpPrompt = PromptTemplate.fromTemplate(
  `You will perform as a React tutoring system.
  You will receive a exercise about React.
  
  Exercise: {question}

  Exercise option(if there are any): {chances}

  Correct answer: {pAnswer}

  Give some tips without telling the correct answer to solve this exercise.
  Give the response in markdown syntax so it can be added to a website.
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




