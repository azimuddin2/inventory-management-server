const express = require('express')
const router = express.Router()
const productController = require('../controller/product.controller')



router.route('/')
    .get(productController.getProducts)
    .post(productController.postProduct)

router.route('/bulk-update').patch(productController.bulkUpdateProduct);
router.route('/bulk-delete').delete(productController.bulkDeleteProduct);

router.route('/:id')
    .get(productController.getProductById)
    .patch(productController.updateProductById)
    .delete(productController.deleteProductById)



module.exports = router;