const jwt = require("jsonwebtoken");
const appError = require("../utils/AppError.js");
const { ERROR } = require("../utils/httpstatustext.js");

const verifyToken = (req, res, next) => {
  const authHeader =
    req.headers["Authorization"] || req.headers["authorization"];
  const token = authHeader.split(" ")[1];
  if (!authHeader) {
    const error = appError.create("UnAuthorized", 401, ERROR);
    return next(error);
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.decoded = decoded;
    console.log(decoded);

    next();
  } catch {
    const error = appError.create("Unauthorized", 401, ERROR);
    return next(error);
  }
};

module.exports = verifyToken;
