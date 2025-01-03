/**
 * File name: recipeController.js
 * Student Name: Simant Dhakal
 * StudentID: 200563270
 * Date: October 13, 2024
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

//Get a single recipe by Id
exports.getRecipeById = async(req,res) =>{
    try{
        const recipe = await Recipe.findById(req.params.id);
        if(!recipe){
            return res.status(404).send('Recipe is not found');
        }
        res.status(201).json(recipe);
    
    }
    catch(e){
        console.error(e);
        res.status(500).send('Error retrieving the Recipes');
    }
    };

//Function to create a new recipe
exports.createRecipe = async(req,res)=>{
    try{
        const newRecipe = new Recipe(req.body);
        await newRecipe.save();
         res.status(201).json(newRecipe);
    }
    catch(e){
            console.error(e);
            res.status(500).send('Error creating Recipe');
    }
};

exports.updateRecipe = async(req,res) =>{
    try{
        const updateRecipe = await Recipe.findByIdAndUpdate(req.params.id,req.body,{new:true});
        if(!updateRecipe){
            return res.status(404).send('Recipe is not updated');
        }
        res.status(201).json(updateRecipe);
    
    }
    catch(e){
        console.error(e);
        res.status(500).send('Error updating the recipe');
    }
};

//Delete a single recipe by Id
exports.deleteRecipe = async(req,res) =>{

    console.log("Deleting recipe");
    try {
        const deletedRecipe = await Recipe.findByIdAndDelete(req.params.id);
        if(!deletedRecipe){
            return res.status(404).send('Recipe not found');
        }
        res.status(201).json(deletedRecipe);  
    } catch (e) {
        console.error(e);
        res.status(500).send('Error deleting the Recipe');
    }
};