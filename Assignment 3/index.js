/**
 * File name: index.js
 * Student Name: Simant Dhakal
 * StudentID: 200563270
 * Date: November 13, 2024
 */

const http = require('http');
require('dotenv').config();

const { API_PORT} = process.env;
const port = process.env.PORT || API_PORT;

server.listen(port,()=>{
    console.log(`Server is running on port ${port}`);
});