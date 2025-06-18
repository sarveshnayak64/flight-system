const Flight = require('../models/Flight');


exports.searchFlights = async (req, res) => {
  const { origin, destination, departureDate } = req.query;

  if (!origin || !destination || !departureDate) {
    return res.status(400).json({ msg: 'Please provide origin, destination, and departureDate' });
  }

  if (!/^\d{4}-\d{2}-\d{2}$/.test(departureDate)) {
    return res.status(400).json({ msg: 'Invalid departureDate format. Use YYYY-MM-DD' });
  }

  try {
    const flights = await Flight.searchFlights(origin.toUpperCase(), destination.toUpperCase(), departureDate);

    if (flights.length === 0) {
      return res.status(404).json({ msg: 'No flights found for the given criteria.' });
    }

    res.json({ msg: 'Flights found successfully', flights });
  } catch (error) {
    console.error('Error searching flights:', error.message);
    res.status(500).send('Server error during flight search');
  }
};
