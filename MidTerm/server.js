const express = require('express');
const dotenv = require('dotenv');
const path = require('path');
// here i have seperated the db connection fucntion in seperate config folder and db file
// as taught in the class
const connectDB = require('./src/config/db');
// imported the teamRoutes 
const teamRoutes = require('./src/routes/teamRoutes');

// here I have environment variables
dotenv.config({ path: './src/config.env' });

// function to call to Connect to MongoDB
connectDB();

// Initialize the express app
const app = express();

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Routes for teams
app.use('/teams', teamRoutes);

// Serve the HTML file located at the root of the project
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'index.html'));
});

// Error handling middleware
app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).send('Something went wrong!');
});

// Start the server
const port = process.env.PORT || 3000;
app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}`);
});
