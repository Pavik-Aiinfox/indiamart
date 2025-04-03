const mongoose = require("mongoose");
const dotenv = require("dotenv");

dotenv.config();


const connectDB = async () => {
  try {

    await mongoose.connect(process.env.CATEGORY_MONGO_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });

    console.log("MongoDB Connected Successfully");
  } catch (error) {
    console.error("MongoDB Connection Error:", error.message);
    process.exit(1);
  }
};

module.exports = connectDB;