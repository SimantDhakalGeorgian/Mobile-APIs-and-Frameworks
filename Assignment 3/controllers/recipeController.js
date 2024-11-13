/**
 * File name: recipeController.js
 * Student Name: Simant Dhakal
 * StudentID: 200563270
 * Date: November 13, 2024
 */

// import recipe model
const Recipe = require('../models/recipe');

// get all the recipe items from the mongo db and dipslay it here
exports.getAllRecipe = async(req,res)=>{
    try {
        const recipes = await Recipe.find(); // Fetch all recipes from the MongoDB collection
        res.json(recipes);
      } catch (error) {
        res.status(500).json({ message: 'Server error: Could not fetch recipes' });
    }
};