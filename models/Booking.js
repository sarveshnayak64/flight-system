const { pool } = require('../config/db');


const Booking = {
 
  create: async (userId, flightId, seatNumber, passengerName, status = 'confirmed') => {
    const [result] = await pool.execute(
      'INSERT INTO bookings (userId, flightId, seatNumber, passengerName, status) VALUES (?, ?, ?, ?, ?)',
      [userId, flightId, seatNumber, passengerName, status]
    );
    return { id: result.insertId, userId, flightId, seatNumber, passengerName, status };
  },

  findByUserId: async (userId) => {
    const [rows] = await pool.execute(
      'SELECT b.*, f.airline, f.flightNumber, f.origin, f.destination, f.departure, f.arrival, f.price ' +
      'FROM bookings b JOIN flights f ON b.flightId = f.id WHERE b.userId = ?',
      [userId]
    );
    return rows;
  }
};

module.exports = Booking;
