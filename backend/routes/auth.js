// backend/routes/auth.js

const express = require("express");
const {
  registerUser,
  loginUser,
  logoutUser,
} = require("../controllers/authController");
const router = express.Router();

// Register User Route
router.post("/register", registerUser);

// Login User Route
router.post("/login", loginUser);

// Logout User Route
router.post("/logout", logoutUser);

module.exports = router;
