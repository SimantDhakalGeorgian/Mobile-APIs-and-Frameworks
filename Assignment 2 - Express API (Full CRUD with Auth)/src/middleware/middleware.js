//Middleware to log incoming requests
const logger = (req,res,next)=>{
    console.log(`${req.method}${req.originalUrl} - ${new Date().toISOString()}`);
    next();
}

// Validate Recipe data before creating or updating
const validateRecipe = (req, res, next) => {
    const { name, ingredients, instructions, servings, prepTime } = req.body;

    if (!name || !ingredients || !instructions || !servings || !prepTime) {
        return res.status(400).send('Missing required fields: name, ingredients, instructions, servings, or prepTime');
    }

    if (!Array.isArray(ingredients) || ingredients.length === 0) {
        return res.status(400).send('Invalid or missing ingredients. It should be a non-empty array.');
    }

    if (typeof servings !== 'number' || servings <= 0) {
        return res.status(400).send('Invalid servings. It should be a positive number.');
    }

    if (typeof prepTime !== 'number' || prepTime <= 0) {
        return res.status(400).send('Invalid prep time. It should be a positive number representing minutes.');
    }

    next();
};


//Middleware to handle 404
const handleNotFound=(req,res)=>{
    res.status(404).send('Page not found');
};

module.exports ={
    logger,
    validateRecipe,
    handleNotFound
};