const express = require('express');

const userController = require('../controllers/userController');
const router = express.Router();

router.post("/code", userController.getAllUsersByCode);
router.post("/create", userController.addUser);
router.post("/user", userController.getUserByName);
router.post("/start" , userController.setInitialLevel);
router.post("/edit/password", userController.editPassword);
router.post("/user/moves", userController.getAllMovesByUser);
router.post("/user/edit", userController.editUserByName);
router.post("/:id", userController.getUserById);
router.post('/edit/:id', userController.editUser);
router.post("/", userController.getAllUsers);
router.delete("/:id", userController.deleteUser);

module.exports = router;