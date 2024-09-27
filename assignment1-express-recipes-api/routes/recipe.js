/**
 * File name: recipeRoutes.js
 * Student Name: Simant Dhakal
 * StudentID: 200563270
 * Date: September 29, 2024
 */

const express = require('express');
const router = express.Router();
const { getAllRecipes } = require('../controllers/recipeController');

// Define the endpoint for fetching all recipes
router.get('/', getAllRecipes);

module.exports = router;
