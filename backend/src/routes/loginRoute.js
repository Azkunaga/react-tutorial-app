const express = require('express');

const login = require('../controllers/loginController');
const loginValidator = require('../validators/loginValidator');

const router = express.Router();

router.post("/", loginValidator, login);

module.exports = router;