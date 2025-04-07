const Product = require("../models/product");
const jwt = require("jsonwebtoken");
require("dotenv").config();

exports.addSingleProduct = async (req, res) => {
  try {
    const token = req.headers.authorization?.split(" ")[1];
    if (!token) return res.status(401).json({ message: "No token provided" });

    const decoded = jwt.verify(token, process.env.SELLER_JWT_SECRET);
    const sellerId = decoded.sellerId;

    if (!sellerId) {
      return res.status(400).json({ message: "Seller ID could not be determined from token" });
    }

    // Expect a single product object in the body instead of an array
    if (!req.body || typeof req.body !== 'object') {
      console.log('Request body:', req.body); // Debug log
      return res.status(400).json({ message: "Request body must contain a product object" });
    }

    const product = req.body;

    const requiredFields = ['name', 'price', 'unit', 'categoryId'];
    const hasRequiredFields = requiredFields.every(field => 
      product[field] !== undefined && product[field] !== null
    );

    if (!hasRequiredFields) {
      console.log('Invalid product:', product); // Debug log
      return res.status(400).json({ 
        message: "Product must have required fields: name, price, unit, categoryId"
      });
    }

    const productToSave = new Product({
      name: product.name,
      price: product.price,
      unit: product.unit,
      description: product.description || '',
      categoryId: product.categoryId,
      pictures: product.pictures || [],
      sellerId: sellerId,
    });

    const savedProduct = await productToSave.save();

    res.status(201).json({ 
      message: "Product added successfully",
      product: savedProduct 
    });
  } catch (error) {
    console.error("Error adding product:", error);
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

exports.addMultipleProducts = async (req, res) => {
  try {
    const token = req.headers.authorization?.split(" ")[1];
    if (!token) return res.status(401).json({ message: "No token provided" });

    const decoded = jwt.verify(token, process.env.SELLER_JWT_SECRET);
    const sellerId = decoded.sellerId;

    if (!sellerId) {
      return res.status(400).json({ message: "Seller ID could not be determined from token" });
    }

    if (!req.body || !Array.isArray(req.body.products)) {
      console.log('Request body:', req.body); // Debug log
      return res.status(400).json({ message: "Request body must contain a 'products' array" });
    }

    const products = req.body.products;
  

    if (products.length > 100) {
      return res.status(400).json({ message: "Maximum of 100 products can be added at once" });
    }

    const requiredFields = ['name', 'price', 'unit', 'categoryId'];
    const invalidProducts = products.filter(product => 
      !requiredFields.every(field => product[field] !== undefined && product[field] !== null)
    );

    if (invalidProducts.length > 0) {
      console.log('Invalid products:', invalidProducts); // Debug log
      return res.status(400).json({ 
        message: "All products must have required fields: name, price, unit, categoryId",
        invalidCount: invalidProducts.length
      });
    }

    const productsToSave = products.map(product => {
      return new Product({
        name: product.name,
        price: product.price,
        unit: product.unit,
        description: product.description || '',
        categoryId: product.categoryId,
        pictures: product.pictures || [],
        sellerId: sellerId,
      });
    });

    
    const savedProducts = await Product.insertMany(productsToSave, { ordered: false });

    res.status(201).json({ 
      message: "Products added successfully",
      count: savedProducts.length,
      products: savedProducts 
    });
  } catch (error) {
    console.error("Error adding multiple products:", error);
    if (error.name === 'BulkWriteError') {
      return res.status(400).json({ 
        message: "Some products failed to save",
        error: error.message,
        writeErrors: error.writeErrors
      });
    }
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

exports.getProductsByCategory = async (req, res) => {
  try {
   
    const { categoryId } = req.params;

 
    if (!categoryId) {
      return res.status(400).json({ message: "Category ID is required" });
    }

    // Find products by categoryId
    const products = await Product.find({ categoryId });

    // Check if any products were found
    if (!products || products.length === 0) {
      return res.status(404).json({ message: "No products found for this category" });
    }

    // Return the found products
    res.status(200).json({
      message: "Products retrieved successfully",
      count: products.length,
      products: products,
    });
  } catch (error) {
    console.error("Error fetching products by category:", error);
    res.status(500).json({ message: "Server error", error: error.message });
  }
};