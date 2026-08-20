const express = require("express");
const productsController = require("../controller/products.controller.js");
const verifyToken = require("../middleware/verifyToken.js");
const userRoles = require("../utils/userRoles.js");
const allowedTo = require("../middleware/allowedTo.js");
const { upload } = require("../middleware/upload.js");
const router = express.Router();

router
  .route("/")
  .get(productsController.getallproducts)
  .post(
    verifyToken,
    allowedTo(userRoles.ADMIN),
    upload.single("image"),
    productsController.addproduct,
  );

router
  .route("/:id")
  .get(verifyToken, productsController.getproduct)
  .delete(
    verifyToken,
    allowedTo(userRoles.ADMIN),
    productsController.deleteproduct,
  )
  .put(
    verifyToken,
    allowedTo(userRoles.ADMIN),
    upload.single("image"),
    productsController.updateproduct,
  );

module.exports = router;
