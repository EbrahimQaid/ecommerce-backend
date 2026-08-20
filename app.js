const express = require("express");
const fs = require("fs");
const path = require("path");
const productRoutes = require("./routes/product.route.js");
const userRoutes = require("./routes/users.route.js");
const { FAIL, ERROR, SUCCESS } = require("./utils/httpstatustext.js");
const app = express();

const uploadsDir = path.join(__dirname, "uploads");
if (!fs.existsSync(uploadsDir)) {
  fs.mkdirSync(uploadsDir, { recursive: true });
}

app.use(express.json());
app.use("/uploads", express.static(uploadsDir));
app.use("/products", productRoutes);
app.use("/users", userRoutes);

app.all("/*splat", (req, res) => {
  res.status(404).json({ status: FAIL, message: "Page not found" });
});

app.use((error, req, res, next) => {

  let statusCode = error.statusCode || 500;
  let message = error.message || "Internal server error";

  if (error.name === "ValidationError") {
    statusCode = 400;
    message = Object.values(error.errors)
      .map((item) => item.message)
      .join(", ");
  } else if (error.code === 11000) {
    statusCode = 409;
    message = "Email already exists";
  } else if (error.name === "MulterError") {
    statusCode = 400;
  }

  res.status(statusCode).json({
    status: statusCode >= 500 ? ERROR : FAIL,
    message,
    ...(process.env.NODE_ENV !== "production" && {
      details: error.statusText || SUCCESS,
    }),
  });
});

module.exports = app;
