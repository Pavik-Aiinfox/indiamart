const Product = require('../models/product');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
require('dotenv').config();

exports.addProduct = async (req, res) => {
    try {
      
      const token = req.headers.authorization?.split(' ')[1]; 
      if (!token) return res.status(401).json({ message: 'No token provided' });
  
      const decoded = jwt.verify(token, process.env.SELLER_JWT_SECRET);
      const sellerId = decoded.id;
  
     
      const {
        name,
        id,
        price,
        perUnit,
        perPiece,
        perDozen,
        quantity,
        categoryId,
      } = req.body;
  
    
      const pictures = req.files ? req.files.map(file => file.path) : [];
  
     
      const product = new Product({
        name,
        id,
        price,
        pricingOptions: {
          perUnit: perUnit || null,
          perPiece: perPiece || null,
          perDozen: perDozen || null,
        },
        quantity,
        categoryId,
        pictures, 
      });
  
      await product.save();
      res.status(201).json({ message: 'Product added successfully', product });
    } catch (error) {
      console.error('Error adding product:', error);
      res.status(500).json({ message: 'Server error', error: error.message });
    }
  };
  
  module.exports = exports;