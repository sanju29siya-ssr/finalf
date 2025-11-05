const express = require('express');
const router = express.Router();
const User = require('../models/userModel');

// Register
router.post('/register', async (req, res) => {
  const { name, email, password } = req.body;
  try {
    const newUser = new User({ name, email, password });
    await newUser.save();
    res.json({ message: 'User registered successfully' });
  } catch (err) {
    res.status(400).json({ error: 'Email already exists' });
  }
});

// Login
router.post('/login', async (req, res) => {
  const { email, password } = req.body;
  const user = await User.findOne({ email, password });
  if (user) res.json({ message: 'Login successful', userId: user._id });
  else res.status(401).json({ error: 'Invalid credentials' });
});

module.exports = router;
