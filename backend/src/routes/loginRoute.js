const express = require('express');
const router = express.Router();
const login = require('/controllers/loginController');
const loginValidator = require('/validators/loginValidator');

router.post("/", loginValidator, login);

module.export = router;