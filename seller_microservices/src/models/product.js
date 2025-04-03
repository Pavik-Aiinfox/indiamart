const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
  name: { type: String, required: true },
  id: { type: String, required: true, unique: true },
  price: { type: Number, required: true },
  pricingOptions: {
    perUnit: { type: Number, default: null },
    perPiece: { type: Number, default: null },
    perDozen: { type: Number, default: null },
  },
  quantity: { type: Number, required: true },
  categoryId: { type: mongoose.Schema.Types.ObjectId, ref: 'Category', required: true },
  pictures: [{ type: String }], 
});

module.exports = mongoose.model('Product', productSchema);