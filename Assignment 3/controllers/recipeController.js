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

const mongoose = require('mongoose'); // add this line to solve updating recipe api

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

// update an existing recipe
router.put('/:id', verifyToken, async (req, res) => {
  try {
    // Validate ObjectId
    if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
      return res.status(400).json({ message: 'Invalid recipe ID' });
    }

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

    // Check if the required fields are present
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

    // find rcipe id and update
    const updatedRecipe = await Recipe.findByIdAndUpdate(
      req.params.id,
      {
        recipeName,
        ingredients,
        cookingTime,
        difficulty,
        cuisine,
        description,
        photoLink,
        averageRating
      },
      { new: true } 
    );

    // show if recipe is not found and return 404
    if (!updatedRecipe) {
      return res.status(404).json({ message: 'Recipe not found' });
    }

    // Successfully updated
    res.status(200).json({ message: 'Recipe updated successfully', recipe: updatedRecipe });

  } catch (error) {
    console.error('Error updating recipe:', error);
    res.status(500).json({ message: 'Server error: Could not update recipe' });
  }
});

// delete rcipe from database
router.delete('/:id', verifyToken, async (req, res) => {
  console.log('Deleting recipe');
  try {
    // validate ObjectId
    if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
      return res.status(400).json({ message: 'Invalid recipe ID' });
    }

    // find and delete 
    const deletedRecipe = await Recipe.findByIdAndDelete(req.params.id);
    
    // return error if not found any recipe
    if (!deletedRecipe) {
      return res.status(404).json({ message: 'Recipe not found' });
    }

    // show successfully deleted message 
    res.status(200).json({ message: 'Recipe deleted successfully', recipe: deletedRecipe });

  } catch (e) {
    console.error('Error deleting the recipe:', e);
    res.status(500).json({ message: 'Server error: Could not delete recipe' });
  }
});

module.exports = router;
