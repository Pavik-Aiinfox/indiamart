const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema({
  phone: { type: Number, required: true, unique: true }, // Changed type to String
  createdAt: { type: Date, default: Date.now },
});

const User = mongoose.model("User", UserSchema);
module.exports = User;
