const express = require('express');
const mongoose = require('mongoose');
const dotenv = require('dotenv');


const app = express();
const port = 3000;

// Middleware to parse JSON
app.use(express.json());

// MongoDB Connection
const connectionWithDB = async () => {
    
    try {
      await mongoose.connect(process.env.MONGO_URI, {
        useNewUrlParser: true,
        useUnifiedTopology: true
      });
      console.log('MongoDB Connected');
    } catch (err) {
      console.error('MongoDB connection error:', err.message);
      process.exit(1); // Exit process with failure
    }
};
  
// Call the connectionWithDB function
connectionWithDB();
  