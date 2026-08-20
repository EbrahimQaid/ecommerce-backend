const jwt = require("jsonwebtoken");
const appError = require("../utils/AppError.js");
const { ERROR } = require("../utils/httpstatustext.js");

const verifyToken = (req, res, next) => {
  const authHeader = req.get("Authorization");
  if (!authHeader) {
    return next(
      appError.create("Authorization header is required", 401, ERROR),
    );
  }

  const [scheme, token, ...extraParts] = authHeader.trim().split(/\s+/);
  if (scheme !== "Bearer" || !token || extraParts.length > 0) {
    return next(
      appError.create(
        "Authorization header must use Bearer token format",
        401,
        ERROR,
      ),
    );
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded;
    return next();
  } catch (error) {
    const message =
      error.name === "TokenExpiredError"
        ? "Token has expired"
        : "Invalid token";
    return next(appError.create(message, 401, ERROR));
  }
};

module.exports = verifyToken;
