const User = require("../models/users.model.js");
const { FAIL, SUCCESS, ERROR } = require("../utils/httpstatustext.js");
const asyncwrapper = require("../middleware/asyncwrapper.js");
const appError = require("../utils/AppError.js");
const bcrypt = require("bcryptjs");
const mongoose = require("mongoose");
const validator = require("validator");
const GeneretJWT = require("../utils/GeneretJWT.js");

const getallusers = asyncwrapper(async (req, res, next) => {
  const users = await User.find({}, { __v: 0 });

  res.json({ status: SUCCESS, data: { users } });
});

const register = asyncwrapper(async (req, res, next) => {
  const { firstName, lastName, email, password, role } = req.body;

  if (!firstName || !lastName || !email || !password) {
    const error = appError.create(
      "the firstName, lastName, email, and password are required",
      400,
      FAIL,
    );
    return next(error);
  }
  const existingUser = await User.findOne({ email: email });
  if (existingUser) {
    const error = appError.create(
      "User with this email already exists",
      400,
      FAIL,
    );
    return next(error);
  }
  const hashedPassword = await bcrypt.hash(password, 10);
  const newuser = new User({
    firstName,
    lastName,
    email,
    password: hashedPassword,
    role,
    avatar: req.file.filename,
  });

  const token = GeneretJWT({
    id: newuser._id,
    email: newuser.email,
    role: newuser.role,
  });
  await newuser.save();
  res.json({ status: SUCCESS, data: { token: token } });
});

const login = asyncwrapper(async (req, res, next) => {
  const { email, password } = req.body;
  if (!email || !password) {
    const error = appError.create(
      "the email and password are required",
      400,
      FAIL,
    );
    return next(error);
  }
  const user = await User.findOne({ email: email });
  if (!user) {
    const error = appError.create("User not found", 404, FAIL);
    return next(error);
  }
  const passwordMatch = await bcrypt.compare(password, user.password);
  if (!passwordMatch) {
    const error = appError.create("Invalid password", 401, FAIL);
    return next(error);
  }
  if (user && passwordMatch) {
    const token = GeneretJWT({
      id: user.id,
      email: user.email,
      role: user.role,
    });

    res.status(200).json({ status: SUCCESS, data: { token: token } });
  }
});

const deleteuser = asyncwrapper(async (req, res, next) => {
  const userid = req.params.id;
  if (!mongoose.Types.ObjectId.isValid(userid)) {
    const error = appError.create("Invalid user ID format", 400, FAIL);
    return next(error);
  }

  const existingUser = await User.findById(userid);
  if (!existingUser) {
    const error = appError.create("User not found", 404, FAIL);
    return next(error);
  }
  await User.deleteOne({ _id: userid });
  res.status(200).json({ status: SUCCESS, data: null, code: 200 });
});
const updateuser = asyncwrapper(async (req, res, next) => {
  const userid = req.params.id;
  if (!mongoose.Types.ObjectId.isValid(userid)) {
    const error = appError.create("Invalid user ID format", 400, FAIL);
    return next(error);
  }
  const existingUser = await User.findOne({ _id: userid });
  if (!existingUser) {
    const error = appError.create("User not found", 404, FAIL);
    return next(error);
  }
  if (req.body.password) {
    req.body.password = await bcrypt.hash(req.body.password, 10);
  }
  await User.updateOne({ _id: userid }, { $set: { ...req.body } });
  res.status(200).json({ status: SUCCESS, data: null, code: 200 });
});
module.exports = {
  getallusers,
  register,
  login,
  deleteuser,
  updateuser,
};
