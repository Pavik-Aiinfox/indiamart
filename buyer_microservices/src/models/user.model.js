const mongoose = require("mongoose");


const UserSchema = new mongoose.Schema({
  phone: { type: Number, required: true, unique: true },
  name: { type: String, required: true },
  companyName: { type: String, required: true },
  email: { type: String, required: true },
  gst: { type: String, required: true },
  pinCode: { type: String, required: true },
  city: { type: String, required: true },
  state: { type: String, required: true },
  
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now },
  otp: { type: String },
  otpExpires: { type: Date }
});

const User = mongoose.model("save_data", UserSchema);
module.exports = User;
