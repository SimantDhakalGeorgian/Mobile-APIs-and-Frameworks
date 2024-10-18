const express = require('express');
const router = express.Router();
const teamController = require('../controllers/teamController');

// route to import teams
router.post('/import', teamController.importTeams);

// route to get all sports teams from database 
router.get('/', teamController.getTeams);

// rute to get a team by ID
router.get('/:id', teamController.getTeamById);

// route to get teams base on its city
router.get('/city/:city', teamController.getTeamsByCity);

module.exports = router;
