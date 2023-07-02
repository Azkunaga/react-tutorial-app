const express = require('express');


const { getTutorialPart, addTutorialPart, deleteTutorialPart } = require('../controllers/tutorialController');

const router = express.Router();

router.post("/get/:id", getTutorialPart);
router.post("/add", addTutorialPart);
router.post("/delete/:id", deleteTutorialPart);

module.exports = router;