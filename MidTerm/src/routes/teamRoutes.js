const express = require('express');
const router = express.Router();
const teamController = require('../controllers/teamController');

// Route to import teams
router.post('/import', teamController.importTeams);

module.exports = router;
