const express = require('express');
const router = express.Router();
const {addProduct } = require('../controllers/product.controlller');
const multer = require('multer');

// Multer setup for file uploads
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'uploads/'); // Ensure this folder exists
  },
  filename: (req, file, cb) => {
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
    const ext = file.mimetype.split('/')[1]; // e.g., 'jpeg', 'png'
    cb(null, `${file.fieldname}-${uniqueSuffix}.${ext}`);
  },
});
const upload = multer({ storage: storage });

router.post('/products', upload.array('pictures', 5), addProduct); // Allow up to 5 images

module.exports = router;