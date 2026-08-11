const crypto = require("crypto");
const multer = require("multer");
const path = require("path");
const AppError = require("../utils/AppError");

const diskStorage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "uploads");
  },
  filename: function (req, file, cb) {
    const avatarName = crypto.randomUUID() + path.extname(file.originalname);
    cb(null, avatarName);
  },
});

const fileFilter = (req, file, cb) => {
  const imageType = file.mimetype.split("/")[0];
  if (imageType === "image") {
    return cb(null, true);
  }
  return cb(AppError.create("The file must be an image", 400), false);
};

module.exports = {diskStorage, fileFilter};
