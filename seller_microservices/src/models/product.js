const mongoose = require("mongoose");
 
const productSchema = new mongoose.Schema({
  name: { type: String, required: true },
  price: { type: Number, required: true },
  unit: { type: String, required: true },
  description: { type: String },
  categoryId: { type: mongoose.Schema.Types.ObjectId, ref: "Category", required: true },
  pictures: [{ type: String }], // Array of Base64 strings instead of file paths
  sellerId: { type: mongoose.Schema.Types.ObjectId, ref: "Seller", required: true },
});
 
module.exports = mongoose.model("Product", productSchema);