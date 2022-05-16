const express = require('express');
    
const router = express.Router();

const homeController = require('../controllers/home');

router.get('/home',homeController.getHome);
router.get('/product',homeController.getProduct);
router.get('/item/category/:category',homeController.getItemByCategory);
router.get('/item/title/:title',homeController.getItemByTitle);


module.exports = router;
