const express = require('express');
const dotenv = require('dotenv');
const path = require('path');
const connectDB = require('./src/config/db'); // Adjust path if necessary
const teamRoutes = require('./src/routes/teamRoutes');

// Load environment variables
dotenv.config({ path: './config.env' });

// Log the Mongo URI for debugging
console.log('Mongo URI:', process.env.MONGO_URI); // Check if this is defined

// Connect to MongoDB
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
