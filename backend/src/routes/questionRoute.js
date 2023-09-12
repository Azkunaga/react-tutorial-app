const express = require('express');

const questionController = require('../controllers/questionController');

const router = express.Router();

router.post("/valueQuestion/:id", questionController.valueQuest);
router.post("/part" , questionController.getQuestionsByPart);
router.post("/teacher" , questionController.getValidQuestions);
router.post("/teacher/valid", questionController.getValoratedQuestions);
router.post("/:id", questionController.getQuestionById);
router.post("/edit/:id", questionController.editQuestion);
router.post("/", questionController.addQuest);
// router.post("/validQuestion/:id", questionController.validQuest);
router.delete("/:id", questionController.deleteQuest);

module.exports = router;