const mongoose = require('mongoose');


const BuyerSchema = new mongoose.Schema({
  phone: { type: Number, required: true, unique: true },
  otp: { type: String },  
  otpExpires: { type: Date },  
  createdAt: { type: Date, default: Date.now },
  sessionToken: { type: String }  
});


const Buyer = mongoose.model('Buyer', BuyerSchema);

module.exports = Buyer;
