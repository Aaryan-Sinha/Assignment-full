const productModel = require('../models/productModel');
const redisClient = require('../config/redis');

const getProducts = async (req, res, next) => {
  try {
    const cacheKey = 'all_products';
    const cached = await redisClient.get(cacheKey);

    if (cached) return res.json({ fromCache: true, products: JSON.parse(cached) });

    const products = await productModel.getAllProducts();
    await redisClient.set(cacheKey, JSON.stringify(products), { EX: 60 }); // Cache for 60s
    res.json({ fromCache: false, products });
  } catch (err) {
    next(err);
  }
};

const getProductById = async (req, res, next) => {
  const id = req.params.id;

  try {
    const cacheKey = `product:${id}`;
    const cached = await redisClient.get(cacheKey);
    if (cached) {
      return res.json({ fromCache: true, product: JSON.parse(cached) });
    }

    const product = await productModel.getProductById(id); // ✅ go through model
    if (!product) {
      return res.status(404).json({ error: 'Product not found' });
    }

    await redisClient.setEx(cacheKey, 3600, JSON.stringify(product)); // 1 hour cache
    res.json({ fromCache: false, product });
  } catch (error) {
    console.error('Error fetching product:', error.message);
    res.status(500).json({ error: 'Server error' });
  }
};

const addProduct = async (req, res, next) => {
  try {
    const { name, description, price, image_url } = req.body;
    if (!name || !price || !image_url) {
      return res.status(400).json({ error: 'Name, price, and image_url are required' });
    }

    const newProduct = await productModel.createProduct(name, description, price, image_url);
    await redisClient.del('all_products'); // Clear cache
    res.status(201).json(newProduct);
  } catch (err) {
    next(err);
  }
};

const deleteProduct = async (req, res, next) => {
  try {
    const { id } = req.params;
    await productModel.deleteProduct(id);
    await redisClient.del('all_products'); // Clear cache
    res.json({ message: 'Product deleted' });
  } catch (err) {
    next(err);
  }
};

module.exports = {
  getProducts,
  getProductById,
  addProduct,
  deleteProduct,
};
