const express = require('express');

const userController = require('../controllers/userController');
const imageUpload = require('../util/imageUpload')
const router = express.Router();

router.post("/:id", userController.getUserById);
router.post('/edit/:id', imageUpload.array("image"), userController.editUser);
router.post("/", userController.getAllUsers);
router.delete("/:id", userController.deleteUser);

module.exports = router;