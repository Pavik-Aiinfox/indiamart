const express = require('express');
const router = express.Router();
const {addProduct,showProduct } = require('../controllers/product.controlller');


router.post('/products', addProduct);

router.get('/showProduct', showProduct);

module.exports = router;