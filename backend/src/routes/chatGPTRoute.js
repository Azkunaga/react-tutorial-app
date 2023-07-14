const express = require('express');

const { askChatGPT, createExerciseChatGPT, evaluateAnswer,helpWithQuestion } = require('../controllers/chatGPTController');

const router = express.Router();

router.post("/ask", askChatGPT);
router.post("/create", createExerciseChatGPT);
router.post("/help", helpWithQuestion);
router.post("/evaluate", evaluateAnswer);

module.exports = router;