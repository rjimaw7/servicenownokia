const asyncHandler = require("express-async-handler");
const bcrypt = require("bcryptjs");
const short = require("short-uuid");
const jwt = require("jsonwebtoken");

const User = require("../models/userModel");

// @desc Register a new User
// @route /api/users
// @access PUBLIC
const registerUser = asyncHandler(async (req, res) => {
  const { name, email, password } = req.body;

  //   Validation
  if (!name || !email || !password) {
    res.status(400);
    throw new Error("Please include all fields");
  }

  // Find if user already exists
  const userExists = await User.findOne({ email });

  if (userExists) {
    res.status(400);
    throw new Error("User already exists");
  }

  // Hash password
  const salt = await bcrypt.genSalt(10);
  const hashedPassword = await bcrypt.hash(password, salt);

  // Create User
  const user = await User.create({
    name,
    email,
    password: hashedPassword,
    nokiaID: short.generate(),
  });

  if (user) {
    res.status(201).json({
      nokiaID: user.nokiaID,
      _id: user._id,
      name: user.name,
      email: user.email,
      token: generateToken(user._id),
    });
  } else {
    res.status(400);
    throw new Error("Invalid user data");
  }
});

// @desc Login a new User
// @route /api/users/login
// @access PUBLIC
const loginUser = asyncHandler(async (req, res) => {
  const { email, password } = req.body;

  const user = await User.findOne({ email });

  // Check user and password match
  if (user && (await bcrypt.compare(password, user.password))) {
    res.status(201).json({
      _id: user._id,
      name: user.name,
      email: user.email,
      NokiaID: user.nokiaID,
      token: generateToken(user._id),
    });
  } else {
    res.status(401);
    throw new Error("Invalid Credentials");
  }
});

// @desc Get current user
// @route /api/users/me
// @access PRIVATE
const getMe = asyncHandler(async (req, res) => {
  const user = {
    id: req.user._id,
    NokiaID: req.user.nokiaID,
    email: req.user.email,
    name: req.user.name,
  };

  res.status(200).json(user);
});

// Generate Token
const generateToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET, {
    expiresIn: "30d",
  });
};

module.exports = {
  registerUser,
  loginUser,
  getMe,
};
