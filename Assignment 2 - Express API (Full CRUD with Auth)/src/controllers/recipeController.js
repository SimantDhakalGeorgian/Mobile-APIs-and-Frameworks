/**
 * File name: recipeController.js
 * Student Name: Simant Dhakal
 * StudentID: 200563270
 * Date: September 29, 2024
 */
const Recipe = require('../models/recipe');
const fs =require('fs');

// Function to get all the recipe with search and filter functionality which is
// mentioned in our Lab4 assignment
exports.getAllRecipe = async(req,res)=>{
    try {
        const recipes = await Recipe.find(); // Fetch all recipes from the MongoDB collection
        res.json(recipes);
      } catch (error) {
        res.status(500).json({ message: 'Server error: Could not fetch recipes' });
    }
};