const express = require('express');

const register = require('../controllers/registerController');
const registerValidator = require('../validators/registerValidator');

const router = express.Router();

router.post("/", registerValidator.checkDuplicateUsernameOrEmail, register);

module.exports = router;