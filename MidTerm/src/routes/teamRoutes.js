const express = require('express');
const router = express.Router();
const teamController = require('../controllers/teamController');

// route to import teams
router.post('/import', teamController.importTeams);

// route to get all sports teams from database 
router.get('/', teamController.getTeams);

module.exports = router;
