const express = require('express')
const router = express.Router()
const productController = require('../controllers/product.controller')
const upload = require('../middleware/upload');



router.route('/')
    .get(productController.getProducts)
    .post(productController.postProduct)

router.post('/file-upload', upload.array('image'), productController.fileUpload);

router.route('/bulk-update').patch(productController.bulkUpdateProduct);
router.route('/bulk-delete').delete(productController.bulkDeleteProduct);

router.route('/:id')
    .get(productController.getProductById)
    .patch(productController.updateProductById)
    .delete(productController.deleteProductById)



module.exports = router;