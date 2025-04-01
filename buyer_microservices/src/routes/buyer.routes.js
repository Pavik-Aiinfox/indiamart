const express = require('express');
const router = express.Router();
const { sendOTP, verifyOTP } = require('../controllers/buyer.controller');


router.post('/sendotp', sendOTP);


router.post('/verifyotp', verifyOTP);

module.exports = router;
