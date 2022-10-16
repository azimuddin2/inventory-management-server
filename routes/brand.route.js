const express = require('express');
const brandController = require('../controllers/brand.controller');

const router = express.Router();


router.route('/')
    .post(brandController.createBrand)
    .get(brandController.getAllBrands)

router.route('/:id')
    .get(brandController.getBrandById)
    .patch(brandController.updateBrandById)




module.exports = router;