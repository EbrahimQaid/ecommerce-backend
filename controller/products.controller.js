const Product = require("../models/products.model.js");
const { FAIL, SUCCESS } = require("../utils/httpstatustext.js");
const asyncwrapper = require("../middleware/asyncwrapper.js");
const appError = require("../utils/AppError.js");
const mongoose = require("mongoose");

const getallproducts = asyncwrapper(async (req, res, next) => {
  const requestedPage = Number.parseInt(req.query.page, 10);
  const requestedLimit = Number.parseInt(req.query.limit, 10);
  const page =
    Number.isInteger(requestedPage) && requestedPage > 0 ? requestedPage : 1;
  const limit =
    Number.isInteger(requestedLimit) && requestedLimit > 0
      ? Math.min(requestedLimit, 100)
      : 10;
  const skip = (page - 1) * limit;
  const [products, total] = await Promise.all([
    Product.find({}, { __v: 0 }).skip(skip).limit(limit),
    Product.countDocuments(),
  ]);

  res.json({
    status: SUCCESS,
    data: {
      products,
      pagination: { page, limit, total, totalPages: Math.ceil(total / limit) },
    },
  });
});

const getproduct = asyncwrapper(async (req, res, next) => {
  if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
    const error = appError.create("Invalid product id", 400, FAIL);
    return next(error);
  }

  const productItem = await Product.findById(req.params.id);
  if (!productItem) {
    const error = appError.create("Product not found", 404, FAIL);
    return next(error);
  }
  res.json({ status: SUCCESS, data: { product: productItem } });
});

const addproduct = asyncwrapper(async (req, res, next) => {
  const newproduct = new Product({
    ...req.body,
    image: req.file?.filename,
  });
  await newproduct.save();
  res.status(201).json({ status: SUCCESS, data: { product: newproduct } });
});
const updateproduct = asyncwrapper(async (req, res, next) => {
  if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
    const error = appError.create("Invalid product id", 400, FAIL);
    return next(error);
  }

  const allowedFields = ["title", "description", "price", "category", "stock"];
  const updateData = Object.fromEntries(
    Object.entries(req.body || {}).filter(([field]) =>
      allowedFields.includes(field),
    ),
  );

  if (req.file) {
    updateData.image = req.file.filename;
  }

  if (Object.keys(updateData).length === 0) {
    const existingProduct = await Product.exists({ _id: req.params.id });
    if (!existingProduct) {
      return next(appError.create("Product not found", 404, FAIL));
    }
    return next(appError.create("No fields to update", 400, FAIL));
  }

  const updatedProduct = await Product.findByIdAndUpdate(
    req.params.id,
    { $set: updateData },
    { new: true, runValidators: true },
  );
  if (!updatedProduct) {
    return next(appError.create("Product not found", 404, FAIL));
  }
  res.status(200).json({ status: SUCCESS, data: { product: updatedProduct } });
});

const deleteproduct = asyncwrapper(async (req, res, next) => {
  if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
    const error = appError.create("Invalid product id", 400, FAIL);
    return next(error);
  }
  const deletedProduct = await Product.findByIdAndDelete({
    _id: req.params.id,
  });
  if (!deletedProduct) {
    const error = appError.create("Product not found", 404, FAIL);
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
