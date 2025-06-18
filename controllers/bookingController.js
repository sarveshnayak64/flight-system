const Booking = require('../models/Booking');
const Flight = require('../models/Flight');


exports.bookFlight = async (req, res) => {
  const { flightId, seatNumber, passengerName } = req.body;
  const userId = req.user.id; 

  if (!flightId || !seatNumber || !passengerName) {
    return res.status(400).json({ msg: 'Please provide flightId, seatNumber, and passengerName' });
  }

  try {
    const flight = await Flight.findById(flightId);

    if (!flight) {
      return res.status(404).json({ msg: 'Flight not found.' });
    }

    if (flight.availableSeats <= 0) {
      return res.status(400).json({ msg: 'No available seats on this flight.' });
    }

    const newAvailableSeats = flight.availableSeats - 1;
    await Flight.updateAvailableSeats(flightId, newAvailableSeats);

    const booking = await Booking.create(userId, flightId, seatNumber, passengerName);

    res.status(201).json({ msg: 'Flight booked successfully', booking, remainingSeats: newAvailableSeats });
  } catch (error) {
    console.error('Error booking flight:', error.message);
    res.status(500).send('Server error during flight booking');
  }
};


exports.getUserBookings = async (req, res) => {
  const userId = req.user.id; 

  try {
    const bookings = await Booking.findByUserId(userId);
    if (bookings.length === 0) {
      return res.status(404).json({ msg: 'No bookings found for this user.' });
    }
    res.json({ msg: 'User bookings retrieved successfully', bookings });
  } catch (error) {
    console.error('Error retrieving user bookings:', error.message);
    res.status(500).send('Server error retrieving user bookings');
  }
};
