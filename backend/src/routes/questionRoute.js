const express = require('express');

const { valueQuest, getQuest, addQuest, validQuest, deleteQuest } = require('../controllers/questionController');

const router = express.Router();

router.post("/valueQuestion/:id", valueQuest);
router.get("/:id", getQuest);
router.post("/:id", addQuest);
router.post("/validQuestion/:id", validQuest);
router.delete("/:id", deleteQuest);

module.exports = router;