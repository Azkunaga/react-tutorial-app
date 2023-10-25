const express = require('express');

const tutorialController = require('../controllers/tutorialController');

const router = express.Router();

router.post("/last", tutorialController.getLastPartId);
router.post("/parts", tutorialController.getPartsNamesAndId);
router.post("/complete", tutorialController.completePart);
router.post('/edit/:id', tutorialController.editTutorialPart);
router.post("/", tutorialController.addTutorialPart);
router.post("/:id", tutorialController.getTutorialPartById);
router.delete("/:id", tutorialController.deleteTutorialPart);

module.exports = router;