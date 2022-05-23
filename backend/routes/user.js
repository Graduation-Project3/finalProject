const express = require('express');
const router = express.Router();
const userController = require('../controllers/user');

router.get('/getUsers',userController.getAllUser);
router.delete('/deleteUser/:id',userController.deleteUserById);

module.exports = router;