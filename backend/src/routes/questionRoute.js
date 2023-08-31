const express = require('express');

const questionController = require('../controllers/questionController');

const router = express.Router();

router.post("/valueQuestion/:id", questionController.valueQuest);
router.get("/:id", questionController.getQuest);
router.post("/", questionController.addQuest);
router.post("/part" , questionController.getQuestionsByPart);
router.post("/validQuestion/:id", questionController.validQuest);
router.delete("/:id", questionController.deleteQuest);

module.exports = router;