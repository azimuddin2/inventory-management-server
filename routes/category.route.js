const express = require('express');
const categoryController = require('../controllers/category.controller');

const router = express.Router();


router.route('/')
    .post(categoryController.createCategory)
    .get(categoryController.getAllCategory)

router.route('/:id')
    .get(categoryController.getCategoryById)
    .patch(categoryController.updatedCategoryById)


module.exports = router;