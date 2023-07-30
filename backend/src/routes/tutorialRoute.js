const express = require('express');


const { getTutorialPart, addTutorialPart, deleteTutorialPart } = require('../controllers/tutorialController');

const router = express.Router();

router.get("/:id", getTutorialPart);
router.post("/", addTutorialPart);
router.delete("/:id", deleteTutorialPart);

module.exports = router;