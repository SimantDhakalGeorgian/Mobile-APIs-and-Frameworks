/**
 * File name: index.js
 * Student Name: Simant Dhakal
 * StudentID: 200563270
 * Date: November 13, 2024
 */

const http = require('http');
const express = require('express');
require('dotenv').config();
const mongoose = require('mongoose');

// controllers
const authController = require('./controllers/authController');
const recipeController = require('./controllers/recipeController');

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

// register routes
const router = express.Router();
router.post('/auth/register', authController.register);
app.post('/auth/login', authController.login);

// Debugging the routing
app.use('/', router); 
console.log("Routes configured: /auth/register");

// all recipe routes
app.use('/recipe', recipeController);

// create server using http
const server = http.createServer(app);

// Start listening on the specified port
server.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
