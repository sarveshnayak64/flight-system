const { pool } = require('../config/db');


const User = {
  
  create: async (username, password) => {
    const [result] = await pool.execute(
      'INSERT INTO users (username, password) VALUES (?, ?)',
      [username, password]
    );
    return { id: result.insertId, username };
  },

  findByUsername: async (username) => {
    const [rows] = await pool.execute(
      'SELECT id, username, password FROM users WHERE username = ?',
      [username]
    );
    return rows[0] || null;
  },

  
  findById: async (id) => {
    const [rows] = await pool.execute(
      'SELECT id, username FROM users WHERE id = ?',
      [id]
    );
    return rows[0] || null;
  }
};

module.exports = User;
