const Product = require("../models/product");
const jwt = require("jsonwebtoken");
require("dotenv").config();


exports.addProduct = async (req, res) => {
  try {
    const token = req.headers.authorization?.split(" ")[1];
    if (!token) return res.status(401).json({ message: "No token provided" });

    const decoded = jwt.verify(token, process.env.SELLER_JWT_SECRET);
    const sellerId = decoded.sellerId;

    if (!sellerId) {
      return res.status(400).json({ message: "Seller ID could not be determined from token" });
    }

    // Check if req.body exists
    if (!req.body) {
      return res.status(400).json({ message: "Request body is missing" });
    }

    const { name, price, unit, description, categoryId } = req.body;
    const pictures = req.body.pictures || []; 

    const product = new Product({
      name,
      price,
      unit,
      description,
      categoryId,
      pictures,
      sellerId,
    });

    await product.save();
    res.status(201).json({ message: "Product added successfully", product });
  } catch (error) {
    console.error("Error adding product:", error);
    res.status(500).json({ message: "Server error", error: error.message });
  }
};


exports.showProduct =async(req,res)=>{
              try {
                  const showProducts= await Product.find();
                  res.json({message:showProducts})            
              } catch (error) {
                console.log(error)
              }
};