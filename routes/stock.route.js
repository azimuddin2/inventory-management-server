const express = require('express')
const router = express.Router()
const stockController = require('../controllers/stock.controller')



router.route('/')
    .get(stockController.getStocks)
    .post(stockController.postStock)


router.route('/bulk-update').patch(stockController.bulkUpdateStock);
router.route('/bulk-delete').delete(stockController.bulkDeleteStock);


router.route('/:id')
    .get(stockController.getStockById)
    .patch(stockController.updateStockById)
    .delete(stockController.deleteStockById)



module.exports = router;