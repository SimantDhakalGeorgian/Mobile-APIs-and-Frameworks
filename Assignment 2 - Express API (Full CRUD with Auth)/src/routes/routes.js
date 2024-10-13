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

module.exports = router;