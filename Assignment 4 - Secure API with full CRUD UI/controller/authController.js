/**
 * File name: authController.js
 * Student Name: Simant Dhakal
 * StudentID: 200563270
 * Date: December 6, 2024
 */

const User = require('../models/user'); // import user model
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
require('dotenv').config();

// Make sure the token key is set in .env file
const SECRET_KEY = process.env.TOKEN_KEY;

// Register a new user
exports.register = async (req, res) => {
  console.log("Registration request received"); 

  const { fullname, email, password } = req.body;
  try {
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: 'User already exists' });
    }

    const user = new User({ fullname, email, password });
    await user.save();
    res.status(201).json({ message: 'User registered successfully' });
  } catch (error) {
    console.log(error); // Log any error for debugging
    res.status(500).json({ message: 'Error registering user' });
  }
};

// Login User
exports.login = async (req, res) => {
    const { email, password } = req.body;
    try {
      // Find user by email
      const user = await User.findOne({ email });
      if (!user) {
        return res.status(404).json({ message: 'User not found' });
      }
  
      // Compare passwords
      const isMatch = await bcrypt.compare(password, user.password);
      if (!isMatch) {
        return res.status(400).json({ message: 'Invalid credentials' });
      }
  
      // Generate JWT token
      // const token = jwt.sign({ userId: user._id }, SECRET_KEY, { expiresIn: '1h' });
      const token = jwt.sign({ userId: user._id }, process.env.TOKEN_KEY, { expiresIn: '1h' });

  
      res.json({ message: 'Login successful', token });
    } catch (error) {
    console.log(error);
      res.status(500).json({ message: 'Server error' });
    }
};