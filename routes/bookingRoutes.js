const express = require('express');
const router = express.Router();
const bookingController = require('../controllers/bookingController');
const authMiddleware = require('../middleware/authMiddleware');

router.post('/', authMiddleware, bookingController.bookFlight);

router.get('/my', authMiddleware, bookingController.getUserBookings);

module.exports = router;
