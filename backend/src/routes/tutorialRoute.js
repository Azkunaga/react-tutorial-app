const express = require('express');

const questionRoute = require("./routes/questionRoute");

const { getTutorialPart, addTutorialPart, deleteTutorialPart } = require('../controllers/tutorialController');

const router = express.Router();

router.post("/get/:id", getTutorialPart);
router.post("/add", addTutorialPart);
router.post("/delete/:id", deleteTutorialPart);

router.post("/question", questionRoute);

module.exports = router;