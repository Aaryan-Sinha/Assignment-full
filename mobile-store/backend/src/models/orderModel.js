// backend/src/models/orderModel.js
const db = require('../config/db');

const createOrder = async (userId) => {
  const cartItems = await db.query(
    `SELECT c.product_id, c.quantity, p.price 
     FROM carts c 
     JOIN products p ON c.product_id = p.id 
     WHERE c.user_id = $1`,
    [userId]
  );

  const orders = cartItems.rows;

  if (orders.length === 0) return [];

  const values = orders
    .map(
      (item, idx) =>
        `($1, $${idx * 3 + 2}, $${idx * 3 + 3}, $${idx * 3 + 4})`
    )
    .join(',');

  const flatValues = orders.flatMap(item => [item.product_id, item.quantity, item.price]);

  await db.query(
    `INSERT INTO orders (user_id, product_id, quantity, price) VALUES ${values}`,
    [userId, ...flatValues]
  );

  await db.query('DELETE FROM carts WHERE user_id = $1', [userId]);

  return orders;
};

const getUserOrders = async (userId) => {
  const result = await db.query(
    `SELECT o.id, o.quantity, o.price, o.created_at, p.name, p.image_url 
     FROM orders o 
     JOIN products p ON o.product_id = p.id 
     WHERE o.user_id = $1
     ORDER BY o.created_at DESC`,
    [userId]
  );
  return result.rows;
};

module.exports = {
  createOrder,
  getUserOrders,
};
