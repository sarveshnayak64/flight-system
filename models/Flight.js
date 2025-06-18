const { pool } = require('../config/db');

const Flight = {
  searchFlights: async (origin, destination, departureDate) => {
    const searchDate = new Date(departureDate);
    const dayOfWeek = searchDate.getDay();

    const [rows] = await pool.execute(
      'SELECT * FROM flights WHERE origin = ? AND destination = ?',
      [origin, destination]
    );

    const filteredFlights = rows.filter(flight => {
      try {
        const operationalDays = JSON.parse(flight.operationalDays); 
        return operationalDays.includes(dayOfWeek);
      } catch (e) {
        console.error(`Error parsing operationalDays for flight ID ${flight.id}:`, e);
        return false;
      }
    });

    const exactDateFilteredFlights = filteredFlights.filter(flight => {
        const flightDepartureDate = new Date(flight.departure);
        return flightDepartureDate.toISOString().split('T')[0] === departureDate;
    });

    return exactDateFilteredFlights;
  },


  findById: async (flightId) => {
    const [rows] = await pool.execute(
      'SELECT * FROM flights WHERE id = ?',
      [flightId]
    );
    return rows[0] || null;
  },

  
  updateAvailableSeats: async (flightId, newAvailableSeats) => {
    await pool.execute(
      'UPDATE flights SET availableSeats = ? WHERE id = ?',
      [newAvailableSeats, flightId]
    );
  }
};

module.exports = Flight;
