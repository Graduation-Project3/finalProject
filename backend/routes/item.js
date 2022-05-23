const express = require('express');
const router = express.Router();
const itemController = require('../controllers/item');

router.get('/getItems',itemController.getAllItem);
router.delete('/deleteItem/:id',itemController.deleteItemById);
router.get('/itemsNotReady',itemController.getItemNotReady);
router.put('/itemToReady/:id',itemController.updateItem);

module.exports = router;