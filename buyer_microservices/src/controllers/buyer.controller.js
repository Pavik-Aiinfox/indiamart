const User = require('../models/buyer.model');
const jwt = require('jsonwebtoken'); 
const crypto = require('crypto'); 


const generateOTP = () => {
  return '1234'; 
  
};

const generateSessionToken = (userId) => {
  return jwt.sign({ userId }, process.env.JWT_SECRET, { expiresIn: '1h' }); // Token expires in 1 hour
};


const sendOTP = async (req, res) => {
  const { phone } = req.body;

  let user = await User.findOne({ phone });

  if (!user) {
    user = new User({ phone });
  }

  const otp = generateOTP();
  const otpExpires = Date.now() + 1 * 60 * 1000; 

  user.otp = otp;
  user.otpExpires = otpExpires;

  await user.save();

 
  return res.status(200).json({ message: `OTP sent to ${phone}: ${otp}` });
};


const verifyOTP = async (req, res) => {
  const { phone, otp } = req.body;

  const user = await User.findOne({ phone });

  if (!user) {
    return res.status(404).json({ message: 'User not found.' });
  }

 
  if (user.otpExpires < Date.now()) {
    return res.status(400).json({ message: 'OTP has expired.' });
  }


  if (user.otp !== otp) {
    return res.status(400).json({ message: 'Invalid OTP.' });
  }

  
  const sessionToken = generateSessionToken(user._id);

 
  user.sessionToken = sessionToken;
  await user.save();

  return res.status(200).json({ message: 'OTP verified successfully', sessionToken });
};

module.exports = { sendOTP, verifyOTP };
