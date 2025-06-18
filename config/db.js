const mysql = require('mysql2/promise');
const dotenv = require('dotenv');

dotenv.config(); 

const pool = mysql.createPool({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  waitForConnections: true,
  connectionLimit: 10, 
  queueLimit: 0        
});

const initializeDatabase = async () => {
  try {
    const connection = await pool.getConnection();
    console.log('Successfully connected to the MySQL database!');
    connection.release(); 
  } catch (error) {
    console.error('Failed to connect to the database:', error);
    process.exit(1); 
  }
};

module.exports = {
  pool,
  initializeDatabase
};
