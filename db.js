const mongoose = require("mongoose");
require("dotenv").config();

const url = process.env.mongodb_URL;

mongoose.connect(url).then(() => {
  console.log("connected to the database");
});
