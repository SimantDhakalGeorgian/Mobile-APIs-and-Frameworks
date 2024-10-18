const express = require('express');
const mongoose = require('mongoose');
const dotenv = require('dotenv');


const app = express();
const port = 3000;

// Middleware to parse JSON
app.use(express.json());

// MongoDB Connection
const connectionWithDB = async () => {
    
};
  
// Call the connectionWithDB function
connectionWithDB();
  