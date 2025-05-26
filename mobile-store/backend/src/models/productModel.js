// backend/src/models/productModel.js
const db = require('../config/db');

const getAllProducts = async () => {
  const result = await db.query('SELECT * FROM products ORDER BY id DESC');
  return result.rows;
};

const getProductById = async (id) => {
  const result = await db.query('SELECT * FROM products WHERE id = $1', [id]);
  return result.rows[0] || null;
};

const createProduct = async (name, description, price, imageUrl) => {
  const result = await db.query(
    'INSERT INTO products (name, description, price, image_url) VALUES ($1, $2, $3, $4) RETURNING *',
    [name, description, price, imageUrl]
  );
  return result.rows[0];
};

const deleteProduct = async (id) => {
  await db.query('DELETE FROM products WHERE id = $1', [id]);
};

module.exports = {
  getAllProducts,
  getProductById, // ✅ now exported
  createProduct,
  deleteProduct,
};
