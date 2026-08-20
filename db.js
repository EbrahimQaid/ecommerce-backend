const mongoose = require("mongoose");

const url = process.env.mongodb_URL;

const connectDB = async () => {
  if (!url) {
    throw new Error("mongodb_URL is not configured");
  }

  await mongoose.connect(url);
  console.log("Connected to the database");
};

module.exports = connectDB;
