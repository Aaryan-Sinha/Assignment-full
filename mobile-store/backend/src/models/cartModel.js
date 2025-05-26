// backend/src/models/cartModel.js
const db = require('../config/db');

const getUserCart = async (userId) => {
  const result = await db.query(
    `SELECT c.id, c.quantity, p.id AS product_id, p.name, p.price, p.image_url 
     FROM carts c 
     JOIN products p ON c.product_id = p.id 
     WHERE c.user_id = $1`,
    [userId]
  );
  return result.rows;
};

const addToCart = async (userId, productId, quantity) => {
  const result = await db.query(
    `INSERT INTO carts (user_id, product_id, quantity) 
     VALUES ($1, $2, $3) 
     ON CONFLICT (user_id, product_id) 
     DO UPDATE SET quantity = carts.quantity + $3 
     RETURNING *`,
    [userId, productId, quantity]
  );
  return result.rows[0];
};

const removeFromCart = async (id, userId) => {
  await db.query('DELETE FROM carts WHERE id = $1 AND user_id = $2', [id, userId]);
};

module.exports = {
  getUserCart,
  addToCart,
  removeFromCart,
};
