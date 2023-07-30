const express = require('express');

const exlevelController = require('../controllers/exLevelController');
const exlevelValidator = require('../validators/exLevelValidator');
const router = express.Router();

router.post("/", exlevelValidator.exlevelExists, exlevelController.addExLevel);
//router.get("/:id", exlevelController.getExLevel);
//router.delete("/:id",exlevelController.deleteExLevel);

module.exports = router;