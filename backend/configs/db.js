const mongoose = require("mongoose");
require("dotenv").config();

const MONGO_CONNECTION = process.env.DB_MONGO_CONNECTION;

const connectDB = async () => {
  try {
    await mongoose.connect(MONGO_CONNECTION);
    console.log("MongoDB connected");
  } catch (error) {
    console.error("MongoDB connection error:", error);
    process.exit(1);
  }
};

module.exports = connectDB;
