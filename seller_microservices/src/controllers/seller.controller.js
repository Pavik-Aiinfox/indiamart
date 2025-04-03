const Seller = require('../models/seller');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
require('dotenv').config();

exports.signUp = async (req, res) => {
  const { phone, name, businessName, email, gst, pinCode, city, state, password } = req.body;

  if (!phone || !name || !businessName || !email || !gst || !pinCode || !city || !state || !password) {
    return res.status(400).json({ message: 'All fields are required' });
  }

  try {
    let seller = await Seller.findOne({ phone });
    if (seller) {
      return res.status(400).json({ message: 'Seller with this phone number already exists' });
    }

    const hashedPassword = bcrypt.hashSync(password, 10);
    seller = new Seller({
      phone,
      name,
      businessName,
      email,
      gst,
      pinCode,
      city,
      state,
      password: hashedPassword,
    });

    await seller.save();

    const token = jwt.sign(
      { sellerId: seller._id, phone: seller.phone },
      process.env.SELLER_JWT_SECRET,
      { expiresIn: '7d' }
    );

    res.status(201).json({ message: 'Seller signed up successfully', seller, token });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error });
  }
};

exports.login = async (req, res) => {
  const { phone, password } = req.body;

  if (!phone || !password) {
    return res.status(400).json({ message: 'Phone and password are required' });
  }

  try {
    const seller = await Seller.findOne({ phone });
    if (!seller || !bcrypt.compareSync(password, seller.password)) {
      return res.status(401).json({ message: 'Invalid credentials' });
    }

    const token = jwt.sign(
      { sellerId: seller._id, phone: seller.phone },
      process.env.SELLER_JWT_SECRET,
      { expiresIn: '7d' }
    );

    res.json({ message: 'Login successful', token });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error });
  }
};

