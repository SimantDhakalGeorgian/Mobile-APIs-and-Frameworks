/**
 * File name: recipeController.js
 * Student Name: Simant Dhakal
 * StudentID: 200563270
 * Date: November 13, 2024
 */

// import recipe model
const express = require('express');
const router = express.Router();
const Recipe = require('../models/recipe');

/// import verifcation token from middleware
const { verifyToken } = require('../middleware/authMiddleware');

// Get all recipes
router.get('/', async (req, res) => {
  try {
    const recipes = await Recipe.find();
    res.json(recipes);
  } catch (error) {
    res.status(500).json({ message: 'Server error: Could not fetch recipes' });
  }
});

module.exports = router;
