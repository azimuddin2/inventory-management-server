const express = require('express');
const storeController = require('../controllers/store.controller');

const router = express.Router();


router.route('/')
    .post(storeController.createStore)
    .get(storeController.getAllStores)

router.route('/:id')
    .get(storeController.getStoreById)
    .patch(storeController.updateStoreById)



module.exports = router;