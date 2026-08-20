const express = require("express");
const usersController = require("../controller/users.controller.js");
const verifyToken = require("../middleware/verifyToken.js");
const allowedTo = require("../middleware/allowedTo.js");
const userRoles = require("../utils/userRoles.js");
const { upload } = require("../middleware/uniqeAvatarName.js");
const router = express.Router();
router
  .route("/")
  .get(
    verifyToken,
    allowedTo(userRoles.ADMIN, userRoles.MANAGER),
    usersController.getallusers,
  );

router
  .route("/:id")
  .delete(verifyToken, allowedTo(userRoles.ADMIN), usersController.deleteuser)
  .patch(
    verifyToken,
    allowedTo(userRoles.ADMIN),
    upload.single("avatar"),
    usersController.updateuser,
  );

router
  .route("/register")
  .post(upload.single("avatar"), usersController.register);
router.route("/login").post(usersController.login);

module.exports = router;
