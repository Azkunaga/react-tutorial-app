const express = require('express');

const chatGPTController = require('../controllers/chatGPTController');

const router = express.Router();

router.post("/ask", chatGPTController.askChatGPT);
router.post("/recommend", chatGPTController.recommendQuestionsChatGPT);
router.post("/create", chatGPTController.createExerciseChatGPT);
router.post("/create2", chatGPTController.createExerciseChatGPT2);
router.post("/help", chatGPTController.helpWithQuestion);
router.post("/evaluate", chatGPTController.evaluateAnswer);

module.exports = router;