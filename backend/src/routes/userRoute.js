const express = require('express');

const userController = require('../controllers/userController');

const router = express.Router();

router.post("/:id", userController.getUserById);
router.post('/edit/:id', userController.editUser);
router.post("/", userController.getAllUsers);
router.delete("/:id", userController.deleteUser);

module.exports = router;