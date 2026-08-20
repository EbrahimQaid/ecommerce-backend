const mongoose = require("mongoose");

const productSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
    trim: true,
    minlength: 2,
    maxlength: 120,
  },
  description: { type: String, trim: true, maxlength: 2000 },
  price: { type: Number, required: true, min: 0 },
  category: { type: String, trim: true, maxlength: 100 },
  stock: { type: Number, required: true, min: 0 },
  image: { type: String, trim: true },
});

module.exports = mongoose.model("product", productSchema);
