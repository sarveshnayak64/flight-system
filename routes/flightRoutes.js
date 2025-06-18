const express = require('express');
const router = express.Router();
const flightController = require('../controllers/flightController');
const authMiddleware = require('../middleware/authMiddleware');

router.get('/search', flightController.searchFlights);

module.exports = router;
