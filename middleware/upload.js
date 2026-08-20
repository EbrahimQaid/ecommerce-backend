const crypto = require("crypto");
const multer = require("multer");
const path = require("path");
const AppError = require("../utils/AppError");

const diskStorage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "uploads");
  },
  filename: function (req, file, cb) {
    const uniqueName =
      crypto.randomUUID() + path.extname(file.originalname).toLowerCase();
    cb(null, uniqueName);
  },
});

const fileFilter = (req, file, cb) => {
  const imageType = file.mimetype.split("/")[0];
  const allowedExtensions = [".jpg", ".jpeg", ".png", ".gif", ".webp"];
  if (
    imageType === "image" &&
    allowedExtensions.includes(path.extname(file.originalname).toLowerCase())
  ) {
    return cb(null, true);
  }
  return cb(AppError.create("Only image files are allowed", 400), false);
};

const upload = multer({ storage: diskStorage, fileFilter });

module.exports = { diskStorage, fileFilter, upload };
