const mongoose = require('mongoose');

const sellerSchema = new mongoose.Schema({
  phone: { type: Number, required: true, unique: true },
  name: { type: String, required: true },
  businessName: { type: String, required: true },
  email: { type: String, required: true },
  gst: { type: String, required: true },
  pinCode: { type: String, required: true },
  city: { type: String, required: true },
  state: { type: String, required: true },
  password: { type: String, required: true },
});

module.exports = mongoose.model('Seller', sellerSchema);