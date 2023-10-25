const express = require('express');

const codeController = require('../controllers/codeController');
const router = express.Router();

router.post("/create", codeController.addCode);
router.post("/teacher", codeController.getCodesByTeacher);

module.exports = router;