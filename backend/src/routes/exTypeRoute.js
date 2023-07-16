const express = require('express');

const extypeController = require('../controllers/exTypeController');
const extypeValidator = require('../validators/exTypeValidator');
const router = express.Router();

router.post("/", extypeValidator.extypeExists, extypeController.addExType);
//router.get("/:id", extypeController.getExType);
//router.delete("/:id",extypeController.deleteExType)

module.exports = router;