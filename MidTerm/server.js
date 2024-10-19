const express = require('express');
const dotenv = require('dotenv');
const path = require('path');
const connectDB = require('./src/config/db');
const teamRoutes = require('./src/routes/teamRoutes');

dotenv.config({ path: './config.env' });

// Connect to MongoDB
connectDB();

const app = express();

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Routes for teams
app.use('/teams', teamRoutes);

// Serve the HTML file
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'index.html'));
});

// Error handling middleware
app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).send('Something went wrong!');
});

// 404 error handling middleware
app.use((req, res, next) => {
    res.status(404).send('404 Not Found: The requested resource could not be found. Please check the routes and try again');
});

// Error handling middleware for server errors
app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).send('Something went wrong. Try again later.');
});


const port = process.env.PORT || 3000;
app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}`);
});

