const express = require('express');
const router = express.Router();
const recipeController = require('../controllers/recipeController');
const {validateRecipe}=require('../middleware/middleware');

//Route to get all recipe
router.get('/',recipeController.getAllRecipe);

//Route to get a recipe by id
router.get('/:id',recipeController.getRecipeById);

//Route to create a new recipe
//Validate recipe before creating
router.post('/create',validateRecipe,recipeController.createRecipe);

//Route to update a recipe by id
router.put('/update/:id', validateRecipe,recipeController.updateRecipe);

//Route top delete a recipe by id
router.delete('/delete/:id', recipeController.deleteRecipe);

module.exports = router; 