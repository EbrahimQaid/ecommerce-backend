const product = require("../models/products.model.js");
const { FAIL, SUCCESS, ERROR } = require("../utils/httpstatustext.js");
const asyncwrapper = require("../middleware/asyncwrapper.js");
const appError = require("../utils/AppError.js");
const mongoose = require("mongoose");

const getallproducts = asyncwrapper(async (req, res, next) => {
  const page = req.query.page || 1;
  const limit = req.query.limit || 10;
  const skip = (page - 1) * limit;
  const products = await product.find({}, { __v: 0 }).skip(skip).limit(limit);

  res.json({ status: SUCCESS, data: { products } });
});

const getproduct = asyncwrapper(async (req, res, next) => {
  if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
    const error = appError.create("Invalid product id", 400, FAIL);
    return next(error);
  }

  const productId = await product.findById(req.params.id);
  if (!productId) {
    const error = appError.create("product not found", 404, FAIL);
    return next(error);
  }
  res.json({ status: SUCCESS, data: { product: productId } });
});

const addproduct = asyncwrapper(async (req, res, next) => {
  if (!req.body.title || !req.body.price) {
    const error = appError.create("the title & price are require", 400, FAIL);
    return next(error);
  }
  const newproduct = new product(req.body);
  await newproduct.save();
  res.status(201).json({ status: SUCCESS, data: { product: newproduct } });
});
const updateproduct = asyncwrapper(async (req, res, next) => {
  if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
    const error = appError.create("Invalid product id", 400, FAIL);
    return next(error);
  }

  if (!req.body.title || !req.body.price) {
    const error = appError.create("the title & price are require", 400, FAIL);
    return next(error);
  }
  const updateproduct = await product.findByIdAndUpdate(req.params.id, {
    $set: { ...req.body },
  });
  res.status(200).json({ status: SUCCESS, data: { updateproduct } });
});

const deleteproduct = asyncwrapper(async (req, res, next) => {
  if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
    const error = appError.create("Invalid product id", 400, FAIL);
    return next(error);
  }
  const deletedProduct = await product.findByIdAndDelete({
    _id: req.params.id,
  });
  if (!deletedProduct) {
    const error = appError.create("Product Not Fuond", 400, FAIL);
    return next(error);
  }
  res.status(200).json({ status: SUCCESS, data: null });
});

module.exports = {
  getallproducts,
  getproduct,
  addproduct,
  deleteproduct,
  updateproduct,
};
