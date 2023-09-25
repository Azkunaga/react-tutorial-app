const express = require('express');

const router = express.Router();

const imageController = require('../controllers/imageController');
const imageUpload = require('../util/imageUpload');

router.post("/", imageUpload.single("file") , imageController.upload);

module.exports = router;