const express = require('express');
const router = express.Router();
const {addMultipleProducts,showProduct, getProductsByCategory, addSingleProduct } = require('../controllers/product.controlller');


router.post('/multipleproducts', addMultipleProducts);
router.post('/products', addSingleProduct);

router.get('/showProduct', showProduct);
router.get('/getProduct/:categoryId', getProductsByCategory);

module.exports = router;