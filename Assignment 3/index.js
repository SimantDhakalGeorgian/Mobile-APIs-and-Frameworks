/**
 * File name: index.js
 * Student Name: Simant Dhakal
 * StudentID: 200563270
 * Date: November 13, 2024
 */

const http = require('http');
const express = require('express');
require('dotenv').config();

const app = express();
const { API_PORT } = process.env;
const port = process.env.PORT || API_PORT;

// create server using http
const server = http.createServer(app);

// start listening port here
server.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});
