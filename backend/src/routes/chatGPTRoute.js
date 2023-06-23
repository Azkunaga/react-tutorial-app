const express = require('express');

const { askChatGPT, createQuestionChatGPT, evaluateAnswer } = require('../controllers/chatGPTController');

const router = express.Router();

router.post("/ask", askChatGPT);
router.post("/create", createQuestionChatGPT);
router.post("/evaluate", evaluateAnswer);

module.exports = router;