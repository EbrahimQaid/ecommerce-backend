const mongoose = require("mongoose");
const validator = require("validator");
const userRoles = require("../utils/userRoles");

const usersSchema = new mongoose.Schema({
  firstName: { type: String, required: true },
  lastName: { type: String, required: true },
  email: {
    validator: [validator.isEmail, "Please provide a valid email"],
    type: String,
    required: true,
    unique: true,
  },
  password: { type: String, required: true },
  role: {
    type: String,
    enum: [userRoles.USER, userRoles.ADMIN, userRoles.MANAGER],
    default: userRoles.USER,
  },
  avatar: {
    type: String,
    default: "uploads/avatar.jpg",
  },
});

module.exports = mongoose.model("User", usersSchema);
