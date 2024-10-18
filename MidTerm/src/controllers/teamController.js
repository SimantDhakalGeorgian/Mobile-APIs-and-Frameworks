const Team = require('../models/Team');
const fs = require('fs');
const path = require('path');

// Import teams from JSON file and show success and error based on the results
const importTeams = async (req, res) => {
    try {
        // get json data from file teams.json and store it in teamsData 
        const teamsData = JSON.parse(fs.readFileSync(path.join(__dirname, '../data/teams.json'), 'utf-8'));
   
        
    } catch (error) {
        console.error('Error importing data', error);
        res.status(500).send('Error importing data');
    }
};

module.exports = {
    importTeams
};