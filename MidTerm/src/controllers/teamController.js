const Team = require('../models/teams');
const fs = require('fs');
const path = require('path');

const importTeams = async (req, res) => {
    try {
        const teamsData = JSON.parse(fs.readFileSync(path.join(__dirname, '../../teams.json'), 'utf-8'));
        const count = await Team.countDocuments();

        if (count === 0) {
            await Team.create(teamsData);
            console.log('Teams successfully imported');
            res.status(200).send('Teams successfully imported');
        } else {
            res.status(200).send('Teams already exist in the database');
        }
    } catch (error) {
        console.error('Error importing data', error);
        res.status(500).send('Error importing data');
    }
};

// retrieve all sports teams from the database
const getTeams = async (req, res) => {
    try {
        // find teams and get data
        const teams = await Team.find();
        res.status(200).json(teams);
    } catch (error) {
        console.error('Error retrieving teams:', error);
        res.status(500).send('Error retrieving teams');
    }
};

module.exports = {
    importTeams,
    getTeams
};
