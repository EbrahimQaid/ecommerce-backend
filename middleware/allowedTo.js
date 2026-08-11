const AppError = require("../utils/AppError");

module.exports = (...roles) => {
  return (req, res, next) => {
    if (!roles.includes(req.decoded.role)) {
      const error = AppError.create("This Role is not Authorized", 401);
      next(error);
    }
    next();
  };
};
