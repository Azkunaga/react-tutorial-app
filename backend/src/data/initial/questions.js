const {ObjectId} = require('mongodb');

const data = [{
  "_id": new ObjectId("6543d9ea5f5bd835772e00ba"),
  "tutorialPart": new ObjectId("64c4de185f814ae4908d7772"),
  "type": new ObjectId("64b3bb812960391001414ea2"),
  "question": {
    "type": "boolean",
    "name": "Decide if it is true or false",
    "description": "React is a JavaScript library created by Google for building user interfaces.",
    "valueName": "answer",
    "isRequired": true,
    "labelTrue": "True",
    "labelFalse": "False"
  },
  "correctAnswer": "False",
  "difficulty": new ObjectId("64c67e829fa1b0d3c4f63d8f"),
  "valid": true,
  "__v": 0
},
{
  "_id": new ObjectId("6543da1e5f5bd835772e00cc"),
  "tutorialPart": new ObjectId("64c4de185f814ae4908d7772"),
  "type": new ObjectId("64b3bb812960391001414ea2"),
  "question": {
    "type": "boolean",
    "name": "Decide if it is true or false",
    "description": "React immediately manipulates the real DOM when data changes in an application.",
    "valueName": "answer",
    "isRequired": true,
    "labelTrue": "True",
    "labelFalse": "False"
  },
  "correctAnswer": "False",
  "difficulty": new ObjectId("64c67e889fa1b0d3c4f63d92"),
  "valid": true,
  "__v": 0
},
{
  "_id": new ObjectId("6543dab65f5bd835772e00de"),
  "tutorialPart": new ObjectId( "64c4de185f814ae4908d7772"),
  "type": new ObjectId("64b3bbf02960391001414ea5"),
  "question": {
    "type": "radiogroup",
    "name": "Decide which one is the answer",
    "title": "Decide which one is the answer",
    "description": "What is the main concept at the heart of React's design that promotes reusability and maintainability in building user interfaces?",
    "valueName": "answer",
    "isRequired": true,
    "choices": [
      "Virtual DOM",
      "Unidirectional Data Flow",
      "Component-Based Architecture",
      "JSX (JavaScript XML)"
    ]
  },
  "correctAnswer": "Component-Based Architecture",
  "difficulty": new ObjectId("64c67e889fa1b0d3c4f63d92"),
  "valid": true,
  "__v": 0
},
{
  "_id": new ObjectId("6543db9b5f5bd835772e00fa"),
  "tutorialPart": new ObjectId("64c4de185f814ae4908d7773"),
  "type": new ObjectId("64b3b9bd2960391001414e99"),
  "question": {
    "type": "comment",
    "name": "Complete the sentence.",
    "description": "Node.js is a JavaScript runtime that allows you to run JavaScript on the ____. For React development, Node.js is essential because it comes with npm (Node Package Manager).",
    "valueName": "answer",
    "isRequired": true
  },
  "correctAnswer": "server",
  "difficulty": new ObjectId("64c67e829fa1b0d3c4f63d8f"),
  "valid": true,
  "__v": 0
},
{
  "_id": new ObjectId("6543df195f5bd835772e010c"),
  "tutorialPart": new ObjectId("64c4de185f814ae4908d7773"),
  "type": new ObjectId("64b3bbf02960391001414ea5"),
  "question": {
    "type": "radiogroup",
    "name": "Select all that apply",
    "title": "Select all that apply",
    "description": "Which of the following are key components of setting up your React development environment?",
    "valueName": "answer",
    "isRequired": true,
    "choices": [
      "Downloading Java Development Kit (JDK)",
      "Learning HTML and CSS",
      "Installing Node.js",
      "Visual Studio Code (VS Code) / Sublime Text"
    ]
  },
  "correctAnswer": "Installing Node.js and Visual Studio Code (VS Code) / Sublime Text",
  "difficulty": new ObjectId("64c67e889fa1b0d3c4f63d92"),
  "valid": true,
  "__v": 0
},
{
  "_id":new ObjectId("6543e1345f5bd835772e012f"),
  "tutorialPart":new ObjectId("6501d1303773bfe7ce784da8"),
  "type":new ObjectId("64b3bad82960391001414e9c"),
  "question": {
    "type": "ranking",
    "name": "Order the next options within the gaps",
    "description": "1 - You should never modify state directly; instead, you should use the ······ method to update it. <br>\n2 - ······ allow data to be passed from a parent component to a child component. <br>\n3 - Props are ······, meaning you cannot modify them within the component. They are intended for receiving data from parent components. <br>\n4 - Inside a component, you can access props using ······.propertyName.",
    "valueName": "answer",
    "isRequired": true,
    "choices": [
      "props",
      "readonly",
      "setState",
      "Props"
    ]
  },
  "correctAnswer": "order: setState, Props, readonly, props",
  "difficulty":new ObjectId("64c67e829fa1b0d3c4f63d8f"),
  "valid": true,
  "__v": 0
},
{
  "_id":new ObjectId("6543e1c55f5bd835772e014b"),
  "tutorialPart":new ObjectId("6501d1a88c6393e709ede8eb"),
  "type":new ObjectId("64b3bbf02960391001414ea5"),
  "question": {
    "type": "radiogroup",
    "name": "Select the correct one",
    "title": "Select the correct one",
    "description": "In a React class component, where is the initial state typically defined?",
    "valueName": "answer",
    "isRequired": true,
    "choices": [
      "In the **render** method",
      "In the **componentDidMount** method",
      "In the **constructor** method",
      "In the **componentDidUpdate** method"
    ]
  },
  "correctAnswer": "In the constructor method",
  "difficulty":new ObjectId("64c67e889fa1b0d3c4f63d92"),
  "valid": true,
  "__v": 0
},
{
  "_id":new ObjectId("6543e4485f5bd835772e0167"),
  "tutorialPart":new ObjectId("6501d1b78c6393e709ede8ee"),
  "type":new ObjectId("64b3bd130e05915b7261900f"),
  "question": {
    "type": "checkbox",
    "name": "Multiple Correct Answers Test Question",
    "title": "Multiple Correct Answers Test Question",
    "description": "Which of the following are lifecycle methods in React class components? (Select all that apply)",
    "valueName": "answer",
    "isRequired": true,
    "choices": [
      "componentWillMount",
      "componentWillMount",
      "componentDidUpdate",
      "componentDidCatch"
    ]
  },
  "correctAnswer": "componentWillMount, componentDidUpdate, componentWillMount, componentDidCatch",
  "difficulty":new ObjectId("64c67e919fa1b0d3c4f63d95"),
  "valid": true,
  "__v": 0
},
{
  "_id":new ObjectId("6543e8e25f5bd835772e0194"),
  "tutorialPart":new ObjectId("6501d1cc8c6393e709ede8f1"),
  "type":new ObjectId("64b3b9bd2960391001414e99"),
  "question": {
    "type": "comment",
    "name": "Create a Click Counter",
    "description": "**Objective**: In this exercise, you'll create a React component that counts how many times a button is clicked. You'll also display the count on the screen.\n\n**Instructions**:\n\n1. Create a new React component called `ClickCounter`.\n\n2. Inside the component, initialize a state variable called `clickCount` to 0 in the constructor.\n\n3. Create a button element that, when clicked, increments the `clickCount` state.\n\n4. Display the current `clickCount` value on the screen below the button.\n\n5. Implement an event handler function to handle the button click and update the state.\n\n6. Make sure to bind the event handler correctly.\n\n**Bonus**: <br>\n-Add a second button that resets the click count to 0 when clicked.",
    "valueName": "answer",
    "isRequired": true
  },
  "correctAnswer": "import React, { Component } from 'react';\n\nclass ClickCounter extends Component {\n  constructor() {\n    super();\n    this.state = {\n      clickCount: 0,\n    };\n  }\n\n  handleButtonClick = () => {\n    this.setState({ clickCount: this.state.clickCount + 1 });\n  };\n\n  handleResetClick = () => {\n    this.setState({ clickCount: 0 });\n  };\n\n  render() {\n    return (\n      <div>\n        <h1>Click Counter</h1>\n        <button onClick={this.handleButtonClick}>Click Me</button>\n        <button onClick={this.handleResetClick}>Reset</button>\n        <p>Click Count: {this.state.clickCount}</p>\n      </div>\n    );\n  }\n}\n\nexport default ClickCounter;\n",
  "difficulty":new ObjectId("64c67e919fa1b0d3c4f63d95"),
  "valid": true,
  "__v": 0
},
{
  "_id":new ObjectId("654400655f5bd835772e01be"),
  "tutorialPart":new ObjectId("6501d1da8c6393e709ede8f4"),
  "type":new ObjectId("64b3bbf02960391001414ea5"),
  "question": {
    "type": "radiogroup",
    "name": "Which one is the correct answer",
    "title": "Which one is the correct answer",
    "description": "What is conditional rendering in React?",
    "valueName": "answer",
    "isRequired": true,
    "choices": [
      "Rendering a list of items in React.",
      "Deciding whether a component should be included in the output based on certain conditions.",
      "Using JavaScript events to trigger rendering.",
      "Deciding whether a component should be included in the output based on user interactions and events."
    ]
  },
  "correctAnswer": "Deciding whether a component should be included in the output based on certain conditions.",
  "difficulty":new ObjectId("64c67e829fa1b0d3c4f63d8f"),
  "valid": true,
  "__v": 0
},
{
  "_id":new ObjectId("6544016d5f5bd835772e01da"),
  "tutorialPart":new ObjectId("6501d1e48c6393e709ede8f7"),
  "type":new ObjectId("64b3b9bd2960391001414e99"),
  "question": {
    "type": "comment",
    "name": "Coding exercise: Display a List of Names",
    "description": "**Objective**: In this exercise, you'll create a React component to display a list of names. You will also practice using unique keys to optimize list rendering.\n\n**Instructions**:\n\n1.Create a new React component called `NameList`.\n\n2.Inside the component, define an array of names with at least three names (e.g., \"Alice,\" \"Bob,\" \"Charlie\").\n\n3.Render an unordered list (`<ul>`) that contains list items (`<li>`) for each name in the array.\n\n4.Use the `map` method to iterate over the array and create list items. Assign a unique key to each list item. You can use the index of the name as the key.\n\n5.Display the list of names on the screen.",
    "valueName": "answer",
    "isRequired": true
  },
  "correctAnswer": "import React, { Component } from 'react';\n\nclass NameList extends Component {\n  render() {\n    const names = [\"Alice\", \"Bob\", \"Charlie\"];\n\n    return (\n      <div>\n        <h2>List of Names</h2>\n        <ul>\n          {names.map((name, index) => (\n            <li key={index}>{name}</li>\n          ))}\n        </ul>\n      </div>\n    );\n  }\n}\n\nexport default NameList;\n",
  "difficulty":new ObjectId("64c67e889fa1b0d3c4f63d92"),
  "valid": true,
  "__v": 0
},
{
  "_id":new ObjectId("6544044a5f5bd835772e01fc"),
  "tutorialPart":new ObjectId("6501d1fd8c6393e709ede8fa"),
  "type":new ObjectId("64b3bad82960391001414e9c"),
  "question": {
    "type": "ranking",
    "name": "Complete the gaps in order",
    "description": "You will need to fill in the gaps with the appropriate code from the options provided.\n\n```jsx\nimport React, { useState } from 'react';\n\nfunction MyForm() {\n  const [inputValue, setInputValue] = useState(__1__);\n  \n  const handleChange = (e) => {\n    setInputValue(__2__);\n  };\n\n  const handleSubmit = (e) => {\n    e.preventDefault();\n    // Do something with the form data, e.g., submit it to a server\n  };\n\n  return (\n    <form onSubmit={__3__}>\n      <label>\n        Name:\n        <input\n          type=\"text\"\n          value={inputValue}\n          onChange={__4__}\n        />\n      </label>\n      <button type=\"submit\">Submit</button>\n    </form>\n  );\n}\n\nexport default MyForm;\n```",
    "valueName": "answer",
    "isRequired": true,
    "choices": [
      "e.target.value",
      "handleSubmit",
      "''",
      "handleChange"
    ]
  },
  "correctAnswer": "order: '', e.target.value, handleSubmit, handleChange",
  "difficulty":new ObjectId("64c67e889fa1b0d3c4f63d92"),
  "valid": true,
  "__v": 0
},
{
  "_id":new ObjectId("65440c845f5bd835772e022c"),
  "tutorialPart":new ObjectId("6501d2218c6393e709ede900"),
  "type":new ObjectId("64b3bb812960391001414ea2"),
  "question": {
    "type": "boolean",
    "name": "True or False",
    "description": "Smaller, focused components in React are harder to test and maintain.",
    "valueName": "answer",
    "isRequired": true,
    "labelTrue": "True",
    "labelFalse": "False"
  },
  "correctAnswer": "False",
  "difficulty":new ObjectId("64c67e829fa1b0d3c4f63d8f"),
  "valid": true,
  "__v": 0
},
{
  "_id":new ObjectId("65440c9c5f5bd835772e023e"),
  "tutorialPart":new ObjectId("6501d2218c6393e709ede900"),
  "type":new ObjectId("64b3bb812960391001414ea2"),
  "question": {
    "type": "boolean",
    "name": "True or False",
    "description": "Render props is a pattern in React where a component's rendering behavior is passed as a prop to a child component.",
    "valueName": "answer",
    "isRequired": true,
    "labelTrue": "True",
    "labelFalse": "False"
  },
  "correctAnswer": "True",
  "difficulty":new ObjectId("64c67e829fa1b0d3c4f63d8f"),
  "valid": true,
  "__v": 0
},
{
  "_id":new ObjectId("65440cbe5f5bd835772e0250"),
  "tutorialPart":new ObjectId("6501d2218c6393e709ede900"),
  "type":new ObjectId("64b3bb812960391001414ea2"),
  "question": {
    "type": "boolean",
    "name": "True or False",
    "description": "Component composition in React involves breaking down the user interface into smaller, reusable components.",
    "valueName": "answer",
    "isRequired": true,
    "labelTrue": "True",
    "labelFalse": "False"
  },
  "correctAnswer": "True",
  "difficulty":new ObjectId("64c67e829fa1b0d3c4f63d8f"),
  "valid": true,
  "__v": 0
},
{
  "_id":new ObjectId("65440e215f5bd835772e026c"),
  "tutorialPart":new ObjectId("6501d22c8c6393e709ede903"),
  "type":new ObjectId("64b3b9bd2960391001414e99"),
  "question": {
    "type": "comment",
    "name": "Creating a Multi-Page React Application with React Router",
    "description": "**Task:** Your task is to create a simple multi-page React application with two different routes using React Router. You'll have a home page and a contact page, and you should navigate between them using React Router's `Link` component.\n\n**Requirements:**\n\n1.Create two components, `HomePage` and `ContactPage`, to represent the home page and contact page, respectively. Each component should display a unique message.\n\n2.Set up routing using React Router so that:\n   - The home page is accessible at the root path (`/`).\n   - The contact page is accessible at the path `/contact`.\n\n3.Implement navigation between these two pages using React Router's `Link` component. You should have a navigation bar or menu that allows the user to switch between the home and contact pages.",
    "valueName": "answer",
    "isRequired": true
  },
  "correctAnswer": "// App.js\nimport React from 'react';\nimport { BrowserRouter as Router, Route, Link, Switch } from 'react-router-dom';\nimport HomePage from './HomePage';\nimport ContactPage from './ContactPage';\n\nfunction App() {\n  return (\n    <Router>\n      <nav>\n        <ul>\n          <li>\n            <Link to=\"/\">Home</Link>\n          </li>\n          <li>\n            <Link to=\"/contact\">Contact</Link>\n          </li>\n        </ul>\n      </nav>\n\n      <Switch>\n        <Route path=\"/\" exact component={HomePage} />\n        <Route path=\"/contact\" component={ContactPage} />\n      </Switch>\n    </Router>\n  );\n}\n\nexport default App;\n\n// HomePage.js\nimport React from 'react';\n\nfunction HomePage() {\n  return (\n    <div>\n      <h1>Home Page</h1>\n      <p>Welcome to the Home Page!</p>\n    </div>\n  );\n}\n\nexport default HomePage;\n\n// ContactPage.js\nimport React from 'react';\n\nfunction ContactPage() {\n  return (\n    <div>\n      <h1>Contact Page</h1>\n      <p>Contact us at contact@example.com</p>\n    </div>\n  );\n}\n\nexport default ContactPage;\n\n",
  "difficulty":new ObjectId("64c67e919fa1b0d3c4f63d95"),
  "valid": true,
  "__v": 0
},
{
  "_id":new ObjectId("65440e775f5bd835772e0288"),
  "tutorialPart":new ObjectId("6501d2358c6393e709ede906"),
  "type":new ObjectId("64b3bd130e05915b7261900f"),
  "question": {
    "type": "checkbox",
    "name": "Multiple correct",
    "title": "Multiple correct",
    "description": "Which method is commonly used to fetch data from external APIs in React?",
    "valueName": "answer",
    "isRequired": true,
    "choices": [
      "import",
      "axios",
      "fetch",
      "useState"
    ]
  },
  "correctAnswer": "axios, fetch",
  "difficulty":new ObjectId("64c67e829fa1b0d3c4f63d8f"),
  "valid": true,
  "__v": 0
},
{
  "_id":new ObjectId("65440ec55f5bd835772e029a"),
  "tutorialPart":new ObjectId("6501d2358c6393e709ede906"),
  "type":new ObjectId("64b3bbf02960391001414ea5"),
  "question": {
    "type": "radiogroup",
    "name": "Choose the correct one",
    "title": "Choose the correct one",
    "description": "In a React component, where is it common to store data retrieved from an API?",
    "valueName": "answer",
    "isRequired": true,
    "choices": [
      "In the component's props",
      "In the component's state",
      "In a separate Redux store",
      "In a local variable"
    ]
  },
  "correctAnswer": "In the component's state",
  "difficulty":new ObjectId("64c67e829fa1b0d3c4f63d8f"),
  "valid": true,
  "__v": 0
},
{
  "_id":new ObjectId("65440f405f5bd835772e02bc"),
  "tutorialPart":new ObjectId("6501d24a8c6393e709ede909"),
  "type":new ObjectId("64b3bbf02960391001414ea5"),
  "question": {
    "type": "radiogroup",
    "name": "Choose the correct one",
    "title": "Choose the correct one",
    "description": "Which of the following is **NOT** considered a best practice for styling in React?",
    "valueName": "answer",
    "isRequired": true,
    "choices": [
      "Organizing styles in a structured folder",
      "Creating global styles for all components",
      "Using descriptive class names",
      "Maintaining a consistent style guide"
    ]
  },
  "correctAnswer": "Creating global styles for all components",
  "difficulty":new ObjectId("64c67e829fa1b0d3c4f63d8f"),
  "valid": true,
  "__v": 0
},
{
  "_id":new ObjectId("65440f715f5bd835772e02d8"),
  "tutorialPart":new ObjectId("6501d2548c6393e709ede90c"),
  "type":new ObjectId("64b3bb812960391001414ea2"),
  "question": {
    "type": "boolean",
    "name": "True or False",
    "description": "Error boundaries should be wrapped around the entire React application to handle all possible errors.",
    "valueName": "answer",
    "isRequired": true,
    "labelTrue": "True",
    "labelFalse": "False"
  },
  "correctAnswer": "False",
  "difficulty":new ObjectId("64c67e829fa1b0d3c4f63d8f"),
  "valid": true,
  "__v": 0
},
{
  "_id":new ObjectId("65440f955f5bd835772e02ea"),
  "tutorialPart":new ObjectId("6501d2548c6393e709ede90c"),
  "type":new ObjectId("64b3b9bd2960391001414e99"),
  "question": {
    "type": "comment",
    "name": "True or False",
    "description": "Error boundaries are React components that capture JavaScript errors in their child component tree and display a fallback UI to the user.",
    "valueName": "answer",
    "isRequired": true
  },
  "correctAnswer": "True",
  "difficulty":new ObjectId("64c67e889fa1b0d3c4f63d92"),
  "valid": true,
  "__v": 0
},
{
  "_id":new ObjectId("65440fb35f5bd835772e02fc"),
  "tutorialPart":new ObjectId("6501d2548c6393e709ede90c"),
  "type":new ObjectId("64b3bb812960391001414ea2"),
  "question": {
    "type": "boolean",
    "name": "True or False",
    "description": "When handling network and API errors in React, it's essential to check the response status to ensure that the request was successful.",
    "valueName": "answer",
    "isRequired": true,
    "labelTrue": "True",
    "labelFalse": "False"
  },
  "correctAnswer": "True",
  "difficulty":new ObjectId("64c67e889fa1b0d3c4f63d92"),
  "valid": true,
  "__v": 0
},
{
  "_id":new ObjectId("65440fe65f5bd835772e0318"),
  "tutorialPart":new ObjectId("6501d2628c6393e709ede90f"),
  "type":new ObjectId("64b3bb812960391001414ea2"),
  "question": {
    "type": "boolean",
    "name": "True or False",
    "description": "In React Testing Library, you can assert the presence of an element in the DOM using _expect(element).toBeInTheDocument()._",
    "valueName": "answer",
    "isRequired": true,
    "labelTrue": "True",
    "labelFalse": "False"
  },
  "correctAnswer": "True",
  "difficulty":new ObjectId("64c67e919fa1b0d3c4f63d95"),
  "valid": true,
  "__v": 0
},
{
  "_id":new ObjectId("6544100b5f5bd835772e032a"),
  "tutorialPart":new ObjectId("6501d2628c6393e709ede90f"),
  "type":new ObjectId("64b3bb812960391001414ea2"),
  "question": {
    "type": "boolean",
    "name": "True or False",
    "description": "Testing components that rely on user interactions is not necessary as it's easy to spot issues in real usage.",
    "valueName": "answer",
    "isRequired": true,
    "labelTrue": "True",
    "labelFalse": "False"
  },
  "correctAnswer": "False",
  "difficulty":new ObjectId("64c67e919fa1b0d3c4f63d95"),
  "valid": true,
  "__v": 0
},
{
  "_id":new ObjectId("654410bc5f5bd835772e034c"),
  "tutorialPart":new ObjectId("6501d2738c6393e709ede912"),
  "type":new ObjectId("64b3bd130e05915b7261900f"),
  "question": {
    "type": "checkbox",
    "name": "Multiple correct",
    "title": "Multiple correct",
    "description": "Which of the following statements are true about deploying a React application? (Select all that apply)",
    "valueName": "answer",
    "isRequired": true,
    "choices": [
      "Deployment is the process of turning a React app into a production-ready state.",
      "React apps can be deployed only on a single hosting platform, such as Netlify.",
      "Creating a production build involves running the npm run build command.",
      "Environment variables are set in the React app's code and should not be configured in the hosting platform."
    ]
  },
  "correctAnswer": "\"Deployment is the process of preparing a React application for production, making it accessible to users on the internet\" and \"Creating a production build typically involves running the npm run build command to generate optimized and minified files.\"",
  "difficulty":new ObjectId("64c67e829fa1b0d3c4f63d8f"),
  "valid": true,
  "__v": 0
},
{
  "_id":new ObjectId("6544115c5f5bd835772e0372"),
  "tutorialPart":new ObjectId("6501d28c8c6393e709ede918"),
  "type":new ObjectId("64b3b9bd2960391001414e99"),
  "question": {
    "type": "comment",
    "name": "Coding exercise",
    "description": "Instructions:\n1.Create a new React component for a To-Do List. You can create this component in a new or existing React project.\n\n2.The To-Do List component should have the following features:\n   - An input field for entering new tasks.\n   - A \"Add\" button to add tasks to the list.\n   - A list of tasks displayed below the input field.\n   - Each task item should have a \"Delete\" button to remove the task from the list.\n\n3.Implement the following best practices in your React component:\n   - Ensure that the component's code is well-organized and easy to understand.\n   - Use appropriate state management to handle the list of tasks.\n   - Create separate components for the To-Do List, individual task items, and the input field.\n   - Add comments to your code to explain complex logic or provide context for other developers.\n\n4.Test your To-Do List component by adding, editing, and deleting tasks. Ensure that it functions as expected.\n\nHere's a basic template to get you started:\n\n```javascript\nimport React, { useState } from 'react';\n\nfunction ToDoList() {\n  const [tasks, setTasks] = useState([]);\n  const [newTask, setNewTask] = useState('');\n\n  const addTask = () => {\n    // Add the new task to the tasks array\n    // Clear the input field after adding the task\n  };\n\n  const deleteTask = (taskIndex) => {\n    // Remove the task at the specified index from the tasks array\n  };\n\n  return (\n    <div>\n      <h1>To-Do List</h1>\n      <div>\n        <input\n          type=\"text\"\n          value={newTask}\n          onChange={(e) => setNewTask(e.target.value)}\n        />\n        <button onClick={addTask}>Add</button>\n      </div>\n      <ul>\n        {/* Map through the tasks array and render task items */}\n      </ul>\n    </div>\n  );\n}\n\nexport default ToDoList;\n```\n\nYour task is to complete and enhance this template to create a fully functional To-Do List component that follows best practices.",
    "valueName": "answer",
    "isRequired": true
  },
  "correctAnswer": "import React, { useState } from 'react';\n\nfunction ToDoList() {\n  const [tasks, setTasks] = useState([]);\n  const [newTask, setNewTask] = useState('');\n\n  const addTask = () => {\n    if (newTask.trim() !== '') {\n      setTasks([...tasks, newTask]);\n      setNewTask('');\n    }\n  };\n\n  const deleteTask = (taskIndex) => {\n    const updatedTasks = tasks.filter((_, index) => index !== taskIndex);\n    setTasks(updatedTasks);\n  };\n\n  return (\n    <div>\n      <h1>To-Do List</h1>\n      <div>\n        <input\n          type=\"text\"\n          value={newTask}\n          onChange={(e) => setNewTask(e.target.value)}\n        />\n        <button onClick={addTask}>Add</button>\n      </div>\n      <ul>\n        {tasks.map((task, index) => (\n          <li key={index}>\n            {task}\n            <button onClick={() => deleteTask(index)}>Delete</button>\n          </li>\n        ))}\n      </ul>\n    </div>\n  );\n}\n\nexport default ToDoList;\n",
  "difficulty":new ObjectId("64c67e889fa1b0d3c4f63d92"),
  "valid": true,
  "__v": 0
}]

module.exports = data;