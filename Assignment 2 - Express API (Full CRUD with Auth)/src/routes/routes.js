const express = require('express');
const router = express.Router();
const recipeController = require('../controllers/recipeController');
const {validateMovie}=require('../middleware/middleware');

//Route to get all recipe
router.get('/',recipeController.getAllRecipe);


module.exports = router;