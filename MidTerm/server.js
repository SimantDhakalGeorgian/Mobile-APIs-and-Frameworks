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

const port = process.env.PORT || 3000;
app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}`);
});
