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

// retieve a specific team by it id
const getTeamById = async (req, res) => {
    try {
        const team = await Team.findById(req.params.id);
        if (!team) {
            return res.status(404).send('Team not found');
        }
        res.status(200).json(team);
    } catch (error) {
        console.error('Error retrieving the team:', error);
        res.status(500).send('Error retrieving the team');
    }
};

// retrive teams based on their city because we don;t have a location
const getTeamsByCity = async (req, res) => {
    try {
        const teams = await Team.find({ city: req.params.city });
        if (teams.length === 0) {
            return res.status(404).send('No teams found in this city');
        }
        res.status(200).json(teams);
    } catch (error) {
        console.error('Error retrieving teams by city:', error);
        res.status(500).send('Error retrieving teams by city');
    }
};


module.exports = {
    importTeams,
    getTeams,
    getTeamById,
    getTeamsByCity
};
