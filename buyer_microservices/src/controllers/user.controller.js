const User = require("../models/user.model");
const jwt = require("jsonwebtoken");
require("dotenv").config();

exports.saveBusinessInfo = async (req, res) => {
    const { phone, name, companyName, email, gst, pinCode, city, state } = req.body;

    if (!phone || !name || !companyName || !email || !gst || !pinCode || !city || !state) {
        return res.status(400).json({ message: "All fields are required" });
    }

    try {
        let user = await User.findOne({ phone });

        if (!user) {
           
            user = new User({ phone, name, companyName, email, gst, pinCode, city, state });
        } else {
           
            user.name = name;
            user.companyName = companyName;
            user.email = email;
            user.gst = gst;
            user.pinCode = pinCode;
            user.city = city;
            user.state = state;
        }

        await user.save();

        const token = jwt.sign({ phone, userId: user._id }, process.env.JWT_SECRET, { expiresIn: "7d" });

        res.json({ message: "Business information saved successfully", user, token });
    } catch (error) {
        res.status(500).json({ message: "Server error", error });
    }
};
