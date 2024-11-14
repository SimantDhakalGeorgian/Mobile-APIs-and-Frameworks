/**
 * File name: authMiddleware.js
 * Student Name: Simant Dhakal
 * StudentID: 200563270
 * Date: November 13, 2024
 */

const jwt = require('jsonwebtoken');
require('dotenv').config();

const SECRET_KEY = process.env.TOKEN_KEY;

// here a middleware to protect routes
exports.verifyToken = (req, res, next) => {

  const token = req.body.token || req.query.token || req.headers['authorization'];

//   console.log("Received Token:", token);

  if (!token) {
    return res.status(403).json({ message: 'No token provided' });
  }

  try {
    // Remove 'Bearer' prefix if present
    // nothing worked for me and said invalid token and when I remove Bearer it worked
    const tokenWithoutBearer = token.startsWith('Bearer ') ? token.slice(7) : token;

    console.log(tokenWithoutBearer);

    const decoded = jwt.verify(tokenWithoutBearer, SECRET_KEY);
    req.userId = decoded.userId;
    next();
  } catch (error) {
    console.error('Token verification failed:', error);
    res.status(401).json({ message: 'Invalid token' + error });
  }
};