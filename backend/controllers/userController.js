const jwt = require("jsonwebtoken");
const { jwtSecret } = require("../configs/config");
const User = require("../models/users");
require("dotenv").config();

// Example placeholder for user-related logic
exports.getUser = async (req, res) => {
  const user = await User.findById(req.userId).exec();

  const userInfo = {
    createdDate: user.createdDate,
    email: user.email,
    name: user.friendlyName,
    active: user.active,
    userId: user._id,
  };

  return res.status(200).json({ userInfo });
};

exports.createUser = (req, res) => {
  console.log("testing createUser");
  return res.status(201).json({ data: "ok" });
};

exports.login = async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    const isValidPassword = await user.validatePassword(password);
    if (!isValidPassword) {
      return res.status(401).json({ message: "Invalid credentials" });
    }

    const token = jwt.sign({ id: user.id, email: user.email }, jwtSecret, {
      expiresIn: process.env.EXPIRED_TOKEN,
    });

    res.json({
      token,
      userInfo: {
        createdDate: user.createdDate,
        email: user.email,
        name: user.friendlyName,
        active: user.active,
        userId: user._id,
      },
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server Error" });
  }
};

exports.register = async (req, res) => {
  const { username, email, password } = req.body;

  try {
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: "Email already exists" });
    }

    const newUser = new User({
      username: username || email,
      email,
      createdDate: new Date().toISOString(),
      oauthProvider: "system",
    });
    await newUser.setPassword(password);
    await newUser.save();

    res.status(201).json({ message: "User registered successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server Error" });
  }
};
