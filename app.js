const express = require('express');
const dotenv = require('dotenv');
const cors = require('cors'); 
const { initializeDatabase } = require('./config/db');

dotenv.config();

const app = express();

initializeDatabase();

app.use(cors()); 
app.use(express.json()); 

app.use('/api/auth', require('./routes/authRoutes'));
app.use('/api/flights', require('./routes/flightRoutes'));
app.use('/api/bookings', require('./routes/bookingRoutes'));

app.get('/', (req, res) => {
  res.send('Flight Booking API is running!');
});

app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).send('Something broke!');
});

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
