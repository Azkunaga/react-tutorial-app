const {ObjectId} = require('mongodb');

const data = [{
  "_id": new ObjectId("64b3b9bd2960391001414e99"),
  "name": "code",
  "description": "A React Coding Exercise is a type of exercise that focuses on improving your skills in developing web applications using the React JavaScript library. It involves implementing solutions to problem statements or requirements using React and related technologies. These exercises simulate real-world scenarios and can range in complexity. To succeed in a React Coding Exercise, you need a good understanding of JavaScript, HTML, CSS, and React concepts. They are commonly used by educational institutions and employers to assess React programming skills and problem-solving abilities in front-end development.",
  "__v": 0,
  "structure": "{\n    \"type\": \"comment\",\n    \"name\": questionTitle,\n    \"description\": questionContent,\n    \"valueName\": \"answer\",\n    \"isRequired\": true\n}"
},
{
  "_id": new ObjectId("64b3bad82960391001414e9c"),
  "name": "fillGaps1",
  "description": "A React Gap-Filling Exercise involves completing a React code snippet by selecting the correct options from a given list of choices(same gaps/options). Each gap represents a missing code element or concept that needs to be correctly inserted. Order the list within the gaps.",
  "__v": 0,
  "structure": "{\n     \"type\": \"ranking\",\n     \"name\": \"Fill the gaps (order the options)\",\n     \"description\": question,\n     \"valueName\": \"answer\",\n     \"isRequired\": true,\n     \"choices\": [\n         gap1 ,\n         gap2,\n         gap3,\n         gap4\n      ]\n}"
},
{
  "_id": new ObjectId("64b3baed2960391001414e9f"),
  "name": "fillGaps2",
  "description": "A React Gap-Filling Exercise involves completing a React code snippet by selecting the correct options from a given list of choices(more options than gaps). Each gap represents a missing code element or concept that needs to be correctly inserted. Select in order the options that suit more the gaps.",
  "__v": 0,
  "structure": "{\n     \"type\": \"tagbox\",\n     \"name\": \"Fill the gaps (select in order)\",\n     \"description\": question,\n     \"valueName\": \"answer\",\n     \"isRequired\": true,\n     \"choices\": [\n         gap1 ,\n         gap2,\n         gap3,\n         gap4\n      ]\n}"
},
{
  "_id": new ObjectId("64b3bb812960391001414ea2"),
  "name": "test1",
  "description": "A React True/False Test Exercise involves evaluating a series of statements related to React concepts, principles, and best practices. Your task is to determine whether each statement is true or false based on your understanding of React. This exercise is used to assess your knowledge and comprehension of React-specific topics and helps identify any gaps in your understanding.",
  "__v": 0,
  "structure": "{\n        \"type\": \"boolean\",\n        \"name\": \"True/false test\",\n        \"description\": question,\n        \"valueName\": \"answer\",\n        \"isRequired\": true,\n        \"labelTrue\": \"True\",\n        \"labelFalse\": \"False\",\n    }"
},
{
  "_id": new ObjectId("64b3bbf02960391001414ea5"),
  "name": "test2",
  "description": "A React Test-Type Exercise is designed to evaluate your knowledge and understanding of React concepts, principles, and best practices. Unlike true/false or multiple-choice questions, this exercise requires you to provide a single correct answer. The purpose is to assess your problem-solving skills, critical thinking abilities, and familiarity with React development patterns and best practices.",
  "__v": 0,
  "structure": "{\n        \"type\": \"radiogroup\",\n        \"name\": \"One answer test\",\n        \"description\": question,\n        \"valueName\": \"answer\",\n        \"isRequired\": true,\n        \"choices\": [\n         option1,\n         option2,\n         option3,\n         option4\n        ]\n    }"
},
{
  "_id": new ObjectId("64b3bd130e05915b7261900f"),
  "name": "test3",
  "description": "A React Multiple-Choice Test Exercise is designed to evaluate your knowledge and understanding of React concepts through a series of questions with multiple-choice answers. These exercises require critical thinking skills as you evaluate multiple options and select the most accurate or suitable answers based on your knowledge of React.",
  "__v": 0,
  "structure": "{\n        \"type\": \"checkbox\",\n        \"name\": \"Multiple-choice test\",\n        \"description\": question,\n        \"valueName\": \"answer\",\n        \"isRequired\": true,\n        \"choices\": [\n         option1,\n         option2,\n         option3,\n         option4\n        ]\n    }"
}]

module.exports = data;