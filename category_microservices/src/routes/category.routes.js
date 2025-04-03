const {addCategory,getCategories,getCategoryById } = require("../controllers/category.controllers")
const express = require("express");
const router = express.Router();

router.post('/add', addCategory);
router.get('/get', getCategories);
router.get('/get/:id', getCategoryById);

module.exports = router