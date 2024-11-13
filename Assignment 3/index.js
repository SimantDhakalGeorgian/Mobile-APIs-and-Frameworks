/**
 * File name: index.js
 * Student Name: Simant Dhakal
 * StudentID: 200563270
 * Date: November 13, 2024
 */

const http = require('http');
const express = require('express');
const router = express.Router();
require('dotenv').config();
 // Import the recipe routes
const recipeRoutes = require('./controllers/recipeController')

// controllers 
const authController = require('./controllers/authController');
const recipeController = require('./controllers/recipeController');
// middlware
const { verifyToken } = require('./middleware/authMiddleware');

const app = express();
const { API_PORT } = process.env;
const port = process.env.PORT || API_PORT;

// create server using http
const server = http.createServer(app);

// use all routes
app.use('/recipe', recipeRoutes); 
// authentication routes
router.post('/register', authController.register);

// start listening port here
server.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});
