const Movie = require('../models/Movies');
const fs =require('fs');

// Function to get all the movies with search and filter functionality which is
// mentioned in our Lab4 assignment
exports.getMovies = async(req,res)=>{

    try {
        console.log("Inside get movies");

        // extracts title,genre and year from the query parammeter
        const { title, genre, year } = req.query;

        console.log(title);
        console.log(genre);
        console.log(year);

        // initialize an empty object to store search and filter 
        let searchAndFilter = {};

        // check the condition for title, genre and year
        // search by title
        if (title) {
            // filter was not working because of case sensitive words
            // update code with case-insensitive title search
            searchAndFilter.title = new RegExp(title, 'i');
        }

        // for filter

        // search by genre 
        if (genre) {
            console.log(genre);
            // searchAndFilter.genre = genre;
            // search by genre, checking within the genres array
            searchAndFilter.genres = { $in: [genre] }; // Corrected genre search
        }

        // and search by year
        if (year) {
            // convert year to a number for filter
            searchAndFilter.year = Number(req.query.year);
        }


        // fetch movies based on the conditions
        const movies = await Movie.find(searchAndFilter);

        // now if movie name does not found, show a message with
        // no movie found
        if (movies.length === 0) {
            return res.status(404).send(`No movie found`);
        }

        res.status(200).json(movies);
    } catch (e) {
        console.error(e);
        res.status(500).send('Error retrieving movies');
    } 
};

//Function to create a new movie
exports.createMovie = async(req,res)=>{
    try{
        const newMovie = new Movie(req.body);
        await newMovie.save();
         res.status(201).json(newMovie);
    }
    catch(e){
            console.error(e);
            res.status(500).send('Error creating Movies');
    }
};


//Get a single movie by Id
exports.getMovieById = async(req,res) =>{
try{
    const movie = await Movie.findById(req.params.id);
    if(!movie){
        return res.status(404).send('Movie is not found');
    }
    res.status(201).json(movie);

}
catch(e){
    console.error(e);
    res.status(500).send('Error retrieving the Movies');
}
};


//update Movie

//Get a single movie by Id
exports.updateMovie = async(req,res) =>{
    try{
        const updatedMovie = await Movie.findByIdAndUpdate(req.params.id,req.body,{new:true});
        if(!updatedMovie){
            return res.status(404).send('Movie is not updated');
        }
        res.status(201).json(updatedMovie);
    
    }
    catch(e){
        console.error(e);
        res.status(500).send('Error uodating the Movies');
    }
    };


    //Delete a single movie by Id
exports.deleteMovie = async(req,res) =>{
    try{
        const deletedMovie = await Movie.findByIdAndDelete(req.params.id);
        if(!deletedMovie){
            return res.status(404).send('Movie not found');
        }
        res.status(201).json(deletedMovie);
    
    }
    catch(e){
        console.error(e);
        res.status(500).send('Error deleting the Movies');
    }
    };

    // Function to import movies (moved from index.js)
exports.importMovies = async (req, res) => {
    try {
        const data = JSON.parse(fs.readFileSync('./movies.json', 'utf-8')); // Read data from movies.json
        const count = await Movie.countDocuments();
        if (count === 0) {
            await Movie.create(data); // Create movies in the database
            console.log('Data successfully imported to MongoDb');
            res.status(200).send('Data successfully imported');
        } else {
            res.status(200).send('Data already exists, skipping import');
        }
    } catch (e) {
        console.error('Error importing data', e);
        res.status(500).send('Error importing data');
    }
};
