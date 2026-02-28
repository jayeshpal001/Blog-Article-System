const asyncHandler = require("express-async-handler"); 
const User = require("../models/user.model");
const bcrypt = require("bcrypt"); 
const generateToken = require("../utils/generateToken");
exports.register = asyncHandler(async (req, res) => {
    const {name, email, password, role} = req.body; 
    if (!name || !email || !password || !role) {
        res.status(400); 
        throw new Error("All fields are required");
    }
    const isExist = await User.findOne({email}); 
    if (isExist) {
        res.status(400)
        throw new Error("User already exist, Please login");
    }
    const hashedPass = await bcrypt.hash(password, 10); 
    const user = await User.create({name, email, password: hashedPass, role}); 
    res.status(201).json({
        success: true, 
        message: "User Register Successfully", 
    })
})

exports.login = asyncHandler(async (req, res) => {
    const {email, password} = req.body; 
    if (!email || !password) {
        res.status(400); 
        throw new Error("All fields are required");
    }
    const user = await User.findOne({email}); 
    if (!user) {
        res.status(404)
        throw new Error("User not exist, Please register");
    }
    const isMatch = await bcrypt.compareSync(password, user.password); 
    if (!isMatch) {
        res.status(400)
        throw new Error("Invalid credentials");
    }
    const token = generateToken(user._id, user.role, res); 
    res.status(201).json({
        success: true, 
        message: "User Login Successfully", 
        user: {
            name: user.name, 
            email: user.email, 
            role: user.role
        }
    })
})