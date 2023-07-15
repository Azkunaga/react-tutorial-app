const express = require('express');

const { askChatGPT, recommendQuestionsChatGPT ,createExerciseChatGPT, evaluateAnswer,helpWithQuestion } = require('../controllers/chatGPTController');

const router = express.Router();

router.post("/ask", askChatGPT);
router.post("/recommend", recommendQuestionsChatGPT);
router.post("/create", createExerciseChatGPT);
router.post("/help", helpWithQuestion);
router.post("/evaluate", evaluateAnswer);

module.exports = router;