const asyncHandler = require("express-async-handler");
const authRoles = (...allowedRoles) => {
  return asyncHandler((req, res, next) => {
    if (!req.user || !allowedRoles.includes(req.user.role)) {
      res.status(403);
      throw new Error("Access forbidden, Your role is not authorized");
    }
    next();
  });
};

module.exports = authRoles; 