const mongoose = require("mongoose");
const dotenv = require("dotenv");

dotenv.config();

// Log the MONGO_URI to verify it's being loaded
console.log("MONGO_URI from .env:", process.env.MONGO_URI);

const connectDB = async () => {
  try {
    if (!process.env.MONGO_URI) {
      throw new Error("MONGO_URI is not defined in the .env file");
    }

    await mongoose.connect(process.env.MONGO_URI, {
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