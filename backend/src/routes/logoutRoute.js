const express = require('express');

const logout = require('../controllers/logoutController');

const router = express.Router();

router.get("/", logout);

module.exports = router;