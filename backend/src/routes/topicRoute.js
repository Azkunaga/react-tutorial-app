const express = require('express');

const topicController = require('../controllers/topicController');
const topicValidator = require('../validators/topicValidator');
const router = express.Router();

router.post("/", topicValidator.topicExists,topicController.addTopic);
//router.get("/:id", topicController.getTopic);
//router.delete("/:id",topicController.deleteTopic)

module.exports = router;