const express = require('express');
const router = express.Router();
const categoryController = require ('../controllers/category');


router.post('/addCategory/:title',categoryController.addCategory)
router.delete('/deleteCategory/:id',categoryController.deleteCategoryById);
router.get('/getAllCategory',categoryController.getAllCategory)


module.exports = router;