const jwt  = require("jsonwebtoken"); 
const asyncHandler = require("express-async-handler"); 
const authMiddleware = asyncHandler(async (req, res, next) => {
    const token  = req.cookies.token; 
    if (!token) {
        throw new Error("Unauthorized || No token");        
    }
    const decoded = jwt.verify(token, process.env.JWT_SECRET); 
    console.log(decoded.id);
    req.user = decoded; 
    next(); 
})

module.exports = authMiddleware; 