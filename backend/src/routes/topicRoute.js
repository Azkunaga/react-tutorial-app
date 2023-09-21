const express = require('express');

const topicController = require('../controllers/topicController');
const topicValidator = require('../validators/topicValidator');
const router = express.Router();

router.post("/", topicValidator.topicExists,topicController.addTopic);
router.post("/all", topicController.getAllTopics);
router.post("/parts",topicController.getTopicParts);
router.post("/:id", topicController.getTopic);
router.post("/edit/:id", topicController.editTopic);
router.delete("/:id", topicController.deleteTopic)

module.exports = router;