const { pool } = require('../config/db');
const dotenv = require('dotenv');

dotenv.config();

const flightData = [
    {
      "airline": "Jet Airways",
      "airlineCode": "9W",
      "flightNumber": 186,
      "origin": "PNQ",
      "availableSeats": 116,
      "destination": "DEL",
      "price": 6733,
      "departure": "2013-01-01T10:59:00.000Z",
      "arrival": "2013-01-01T13:32:00.000Z",
      "duration": "2h 33m",
      "operationalDays": [
        0,
        2
      ]
    },
    {
      "airline": "Jet Airways",
      "airlineCode": "9W",
      "flightNumber": 251,
      "origin": "PNQ",
      "availableSeats": 53,
      "destination": "DEL",
      "price": 8713,
      "departure": "2013-01-01T08:17:00.000Z",
      "arrival": "2013-01-01T10:54:00.000Z",
      "duration": "2h 37m",
      "operationalDays": [
        7
      ]
    },
    {
      "airline": "Indigo",
      "airlineCode": "6E",
      "flightNumber": 224,
      "origin": "PNQ",
      "availableSeats": 87,
      "destination": "DEL",
      "price": 5996,
      "departure": "2013-01-01T03:09:00.000Z",
      "arrival": "2013-01-01T05:25:00.000Z",
      "duration": "2h 16m",
      "operationalDays": [
        7
      ]
    },
    {
      "airline": "Air India",
      "airlineCode": "AI",
      "flightNumber": 192,
      "origin": "PNQ",
      "availableSeats": 28,
      "destination": "DEL",
      "price": 3652,
      "departure": "2013-01-01T09:30:00.000Z",
      "arrival": "2013-01-01T11:31:00.000Z",
      "duration": "2h 1m",
      "operationalDays": [
        7
      ]
    },
    {
      "airline": "Spice Jet",
      "airlineCode": "SG",
      "flightNumber": 241,
      "origin": "PNQ",
      "availableSeats": 29,
      "destination": "DEL",
      "price": 7413,
      "departure": "2013-01-01T13:55:00.000Z",
      "arrival": "2013-01-01T15:43:00.000Z",
      "duration": "1h 48m",
      "operationalDays": [
        7
      ]
    },
    {
      "airline": "Indigo",
      "airlineCode": "6E",
      "flightNumber": 240,
      "origin": "PNQ",
      "availableSeats": 10,
      "destination": "DEL",
      "price": 4843,
      "departure": "2013-01-01T05:47:00.000Z",
      "arrival": "2013-01-01T07:35:00.000Z",
      "duration": "1h 48m",
      "operationalDays": [
        7
      ]
    },
    {
      "airline": "Air India",
      "airlineCode": "AI",
      "flightNumber": 167,
      "origin": "PNQ",
      "availableSeats": 126,
      "destination": "DEL",
      "price": 2930,
      "departure": "2013-01-01T12:10:00.000Z",
      "arrival": "2013-01-01T14:00:00.000Z",
      "duration": "1h 50m",
      "operationalDays": [
        1,
        2
      ]
    },
    {
      "airline": "Spice Jet",
      "airlineCode": "SG",
      "flightNumber": 254,
      "origin": "PNQ",
      "availableSeats": 33,
      "destination": "DEL",
      "price": 4191,
      "departure": "2013-01-01T10:01:00.000Z",
      "arrival": "2013-01-01T12:35:00.000Z",
      "duration": "2h 34m",
      "operationalDays": [
        7
      ]
    },
    {
      "airline": "Jet Airways",
      "airlineCode": "9W",
      "flightNumber": 144,
      "origin": "PNQ",
      "availableSeats": 45,
      "destination": "DEL",
      "price": 5788,
      "departure": "2013-01-01T06:09:00.000Z",
      "arrival": "2013-01-01T09:06:00.000Z",
      "duration": "2h 57m",
      "operationalDays": [
        3,
        4
      ]
    },
    {
      "airline": "Air India",
      "airlineCode": "AI",
      "flightNumber": 193,
      "origin": "PNQ",
      "availableSeats": 71,
      "destination": "DEL",
      "price": 7460,
      "departure": "2013-01-01T11:03:00.000Z",
      "arrival": "2013-01-01T12:57:00.000Z",
      "duration": "1h 54m",
      "operationalDays": [
        6,
        5
      ]
    }
  ];

  function formatToMySQLDateTime(isoString) {
    const date = new Date(isoString);
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const day = String(date.getDate()).padStart(2, '0');
    const hours = String(date.getHours()).padStart(2, '0');
    const minutes = String(date.getMinutes()).padStart(2, '0');
    const seconds = String(date.getSeconds()).padStart(2, '0');
  
    return `${year}-${month}-${day} ${hours}:${minutes}:${seconds}`;
  }

async function seedDatabase() {
    let connection;
    try {
      connection = await pool.getConnection();
      console.log('Connected to MySQL for seeding...');
  
      console.log('Dropping existing tables...');
      await connection.execute('DROP TABLE IF EXISTS bookings');
      await connection.execute('DROP TABLE IF EXISTS flights');
      await connection.execute('DROP TABLE IF EXISTS users');
      console.log('Tables dropped successfully.');
  
      console.log('Creating users table...');
      await connection.execute(`
        CREATE TABLE users (
          id INT AUTO_INCREMENT PRIMARY KEY,
          username VARCHAR(255) NOT NULL UNIQUE,
          password VARCHAR(255) NOT NULL
        )
      `);
      console.log('Users table created.');
  
      console.log('Creating flights table...');
      await connection.execute(`
        CREATE TABLE flights (
          id INT AUTO_INCREMENT PRIMARY KEY,
          airline VARCHAR(255) NOT NULL,
          airlineCode VARCHAR(10) NOT NULL,
          flightNumber INT NOT NULL,
          origin VARCHAR(10) NOT NULL,
          availableSeats INT NOT NULL,
          destination VARCHAR(10) NOT NULL,
          price DECIMAL(10, 2) NOT NULL,
          departure DATETIME NOT NULL,
          arrival DATETIME NOT NULL,
          duration VARCHAR(50) NOT NULL,
          operationalDays JSON NOT NULL
        )
      `);
      console.log('Flights table created.');
  
      console.log('Creating bookings table...');
      await connection.execute(`
        CREATE TABLE bookings (
          id INT AUTO_INCREMENT PRIMARY KEY,
          userId INT NOT NULL,
          flightId INT NOT NULL,
          seatNumber VARCHAR(50) NOT NULL,
          passengerName VARCHAR(255) NOT NULL,
          bookingDate DATETIME DEFAULT CURRENT_TIMESTAMP,
          status VARCHAR(50) DEFAULT 'confirmed',
          FOREIGN KEY (userId) REFERENCES users(id) ON DELETE CASCADE,
          FOREIGN KEY (flightId) REFERENCES flights(id) ON DELETE CASCADE
        )
      `);
      console.log('Bookings table created.');
  
      console.log('Inserting flight data...');
      const insertFlightSql = `
        INSERT INTO flights (
          airline, airlineCode, flightNumber, origin, availableSeats,
          destination, price, departure, arrival, duration, operationalDays
        ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
      `;
  
      for (const flight of flightData) {
        const formattedDeparture = formatToMySQLDateTime(flight.departure);
        const formattedArrival = formatToMySQLDateTime(flight.arrival);
  
        await connection.execute(insertFlightSql, [
          flight.airline,
          flight.airlineCode,
          flight.flightNumber,
          flight.origin,
          flight.availableSeats,
          flight.destination,
          flight.price,
          formattedDeparture, 
          formattedArrival,   
          flight.duration,
          JSON.stringify(flight.operationalDays) 
        ]);
      }
      console.log('Flight data inserted successfully.');
  
      console.log('Database seeding complete!');
    } catch (error) {
      console.error('Error during database seeding:', error);
    } finally {
      if (connection) {
        connection.release(); 
      }
      pool.end();
    }
  }

seedDatabase();
