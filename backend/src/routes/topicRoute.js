const express = require('express');

const topicController = require('../controllers/topicController');

const router = express.Router();

router.post("/", topicController.addTopic);
//router.get("/:id", topicController.getTopic);
//router.delete("/:id",topicController.deleteTopic)

module.exports = router;