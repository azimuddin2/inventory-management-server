const express = require('express')
const router = express.Router()
const productController = require('../controllers/product.controller');
const authorization = require('../middleware/authorization');
const upload = require('../middleware/upload');
const verifyToken = require('../middleware/verifyToken');



router.route('/')
    .get(productController.getProducts)
    .post(verifyToken, authorization('admin', 'store-manager'), productController.postProduct)

router.post('/file-upload', upload.array('image'), productController.fileUpload);

router.route('/bulk-update').patch(productController.bulkUpdateProduct);
router.route('/bulk-delete').delete(productController.bulkDeleteProduct);

router.route('/:id')
    .get(productController.getProductById)
    .patch(authorization('admin'), productController.updateProductById)
    .delete(authorization('admin'), productController.deleteProductById)



module.exports = router;