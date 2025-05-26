// backend/src/models/userModel.js
const db = require('../config/db');

const createUser = async (userId, password, role) => {
  const result = await db.query(
    'INSERT INTO users (user_id, password, role) VALUES ($1, $2, $3) RETURNING *',
    [userId, password, role]
  );
  return result.rows[0];
};

const getUserByUserId = async (userId) => {
  const result = await db.query('SELECT * FROM users WHERE user_id = $1', [userId]);
  return result.rows[0];
};

module.exports = {
  createUser,
  getUserByUserId,
};
