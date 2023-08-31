const express = require('express');

const tutorialController = require('../controllers/tutorialController');

const router = express.Router();

router.post("/:id", tutorialController.getTutorialPartById);
router.post('/edit/:id', tutorialController.editTutorialPart);
router.post("/", tutorialController.addTutorialPart);
router.delete("/:id", tutorialController.deleteTutorialPart);

module.exports = router;