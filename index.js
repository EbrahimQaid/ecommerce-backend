const app = require("./app.js");
const productroutes = require("./routes/product.route.js");
const userroutes = require("./routes/users.route.js");
const { FAIL, ERROR } = require("./utils/httpstatustext.js");
const path = require("path");
const express = require("express");
app.use("/uploads", express.static(path.join(__dirname, "uploads")));

app.use("/products", productroutes);
app.use("/users", userroutes);
app.all("/*splat", (req, res, next) => {
  return res.status(404).json({ status: FAIL, message: "Page not found" });
});

app.use((error, req, res, next) => {
  return res.status(error.statusCode || 500).json({
    status: error.statusText || ERROR,
    code: error.statusCode || 500,
    message: error.message,
  });
});
