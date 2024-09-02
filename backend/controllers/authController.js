const bcrypt = require("bcryptjs");
const User = require("../models/User");

exports.registerUser = async (req, res) => {
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
      password: bcrypt.hashSync(password, 10),
    });

    // Save the new user to the database
    await newUser.save();
    res.status(201).json({
      msg: "User registered successfully. Please login to start Chatting!",
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ msg: "Server error" });
  }
};

exports.loginUser = async (req, res) => {
  const { username, password } = req.body;
  try {
    const user = await User.findOne({ username });
    if (!user) {
      return res.status(400).json({ msg: "Invalid credentials" });
    }
    const isMatch = bcrypt.compareSync(password, user.password);
    if (!isMatch) {
      return res.status(400).json({ msg: "Invalid credentials" });
    }

    // Create a session for the user
    req.session.user = { id: user._id, username: user.username };
    req.session.save();

    res.json({ msg: "Login successful", user: req.session.user });
  } catch (err) {
    console.error(err);
    res.status(500).json({ msg: "Server error" });
  }
};

exports.logoutUser = (req, res) => {
  req.session.destroy((err) => {
    if (err) {
      return res.status(500).json({ msg: "Unable to log out" });
    }
    res.json({ msg: "Logout successful" });
  });
};
