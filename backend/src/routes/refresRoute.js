const express = require('express');

const refresh = require('../controllers/refreshTokenController');

const router = express.Router();

router.get("/", refresh);

module.exports = router;