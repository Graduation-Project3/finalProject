const express = require('express');
    
const router = express.Router();

const addController = require('../controllers/add_item');

router.post('/add_item',addController.postAddItem);

module.exports = router;