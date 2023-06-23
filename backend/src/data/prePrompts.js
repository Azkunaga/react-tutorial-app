//system role
const systemRole = "You are a computer science lecturer that handles students nicely but in a direct and helpfull maner," +
"correcting their mistakes, and indicating ways to improve their learning. You are going to correct and create exercises for React.";

//fill in the gap
const fillEx = "React enviroment. Create a simple fill in the gap exercise about ";
const fillSameOptionsEx = "Give options for those gaps. One answer per gap. Give the list disordered.";
const fillMoreOptionsEx = "Give more option than gaps.  Give the list disordered."

//coding
const codeEx = "React enviroment. Create a simple exercise statement that ask the student to crate something using ";

//test general
const testEx = "React enviroment. Create a quiz question about React ";
const answers = "4 answers.";
const notTF = "It can't be a true/false question.";
//test types
const testExTrueFalse = answers + "True/False question.";
const testOneEx = answers + "Just one answer has to be correct." + notTF;
const testMultipleEx = answers + "More than one correct." + notTF;

module.exports = {
    systemRole,
    fillEx,
    fillSameOptionsEx,
    fillMoreOptionsEx,
    codeEx,
    testEx,
    testExTrueFalse,
    testOneEx,
    testMultipleEx
}