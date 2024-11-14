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
router.get('/', verifyToken, async (req, res) => {
  try {
    const recipes = await Recipe.find();
    res.json(recipes);
  } catch (error) {
    console.error('Error fetching recipes:', error);
    res.status(500).json({ message: 'Server error: Could not fetch recipes' });
  }
});

//Get a single recipe by Id
router.get('/:id', verifyToken, async (req, res) => {
  try {
    const recipe = await Recipe.findById(req.params.id);
    if (!recipe) {
      return res.status(404).json({ message: 'Recipe not found' });
    }
    res.status(200).json(recipe);
  } catch (error) {
    console.error('Error retrieving the recipe:', error);
    res.status(500).json({ message: 'Error retrieving the recipe' });
  }
});

// Function to create a new recipe
router.post('/create', verifyToken, async (req, res) => {
  try {
    const {
      recipeName,
      ingredients,
      cookingTime,
      difficulty,
      cuisine,
      description,
      photoLink,
      averageRating
    } = req.body;

    // Validate the required fields
    if (
      !recipeName ||
      !ingredients ||
      !cookingTime ||
      !difficulty ||
      !cuisine ||
      !description ||
      !photoLink ||
      averageRating === undefined
    ) {
      return res.status(400).json({ message: 'All fields are required' });
    }

    // Create a new recipe object using the model
    const newRecipe = new Recipe({
      recipeName,
      ingredients,
      cookingTime,
      difficulty,
      cuisine,
      description,
      photoLink,
      averageRating
    });

    // Save the new recipe to the database
    await newRecipe.save();
    res.status(201).json({ message: 'Recipe created successfully', recipe: newRecipe });

  } catch (error) {
    console.error('Error creating recipe:', error);
    res.status(500).json({ message: 'Server error: Could not create recipe' });
  }
});



module.exports = router;
