/**
 * File name: index.js
 * Student Name: Simant Dhakal
 * StudentID: 200563270
 * Date: December 6, 2024
 */

const http = require('http');
const express = require('express');
require('dotenv').config();
const mongoose = require('mongoose');

// controllers
const authController = require('./controller/authController');
const recipeController = require('./controller/recipeController');

// middleware
const { verifyToken } = require('./middleware/authMiddleware');

const app = express();
app.use(express.json()); // Middleware to parse JSON

const { API_PORT, MONGO_URI } = process.env;
const port = process.env.PORT || API_PORT;

// mongoDB connection setup
mongoose.connect(MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log('MongoDB connected'))
  .catch(err => console.log('MongoDB connection error:', err));

// Welcome route for the base URL
app.get('/', (req, res) => {
  res.send('<h1>Welcome to Assignment 4 Secure API Assignment</h1><p>Please check the Android app. Thank you for visiting.</p>');
});

// auth routes
const router = express.Router();
router.post('/auth/register', authController.register);
router.post('/auth/login', authController.login);
app.use('/auth', router);

// recipe routes
app.use('/recipe', recipeController);

// create server using http
const server = http.createServer(app);

// Start listening on the specified port
server.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
