const express = require('express');

const   { valueQuest, getQuest, addQuest, validQuest, deleteQuest } = require('../controllers/questionController');

const router = express.Router();

router.post("/valueQuestion/:id", valueQuest);
router.post("/getQuestion", getQuest);
router.post("/addQuestion", addQuest);
router.post("/validQuestion/:id", validQuest);
router.post("/deleteQuestion/:id", deleteQuest);

module.exports = router;