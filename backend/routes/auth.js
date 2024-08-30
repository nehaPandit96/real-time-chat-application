// backend/routes/auth.js
const express = require("express");
const bcrypt = require("bcryptjs");
const User = require("../models/User"); // Ensure you have this User model defined correctly
const router = express.Router();

// Register User Route
router.post("/register", async (req, res) => {
  const { fullName, username, password } = req.body;

  try {
    // Check if the user already exists
    const existingUser = await User.findOne({ username });
    if (existingUser) {
      return res.status(400).json({ msg: "User already exists" });
    }

    // Create a new user instance and hash the password
    const newUser = new User({
      fullName,
      username,
      password: bcrypt.hashSync(password, 10), // Hash password with salt rounds
    });

    // Save the new user to the database
    await newUser.save();
    res.status(201).json({ msg: "User registered successfully" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ msg: "Server error" });
  }
});

// Login User Route
router.post("/login", async (req, res) => {
  const { username, password } = req.body;

  try {
    // Find the user by username
    const user = await User.findOne({ username });
    if (!user) {
      return res.status(400).json({ msg: "Invalid credentials" });
    }

    // Compare the provided password with the stored hashed password
    const isMatch = bcrypt.compareSync(password, user.password);
    if (!isMatch) {
      return res.status(400).json({ msg: "Invalid credentials" });
    }

    // If password matches, return a success message
    res.json({
      msg: "Login successful",
      user: { id: user._id, username: user.username },
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ msg: "Server error" });
  }
});

module.exports = router;
