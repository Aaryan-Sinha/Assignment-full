// backend/src/controllers/cartController.js
const cartModel = require('../models/cartModel');

const getCart = async (req, res, next) => {
  try {
    const cartItems = await cartModel.getUserCart(req.user.id);
    res.json(cartItems);
  } catch (err) {
    next(err);
  }
};

const addItem = async (req, res, next) => {
  try {
    const { productId, quantity } = req.body;
    if (!productId || quantity <= 0) {
      return res.status(400).json({ error: 'Valid productId and quantity are required' });
    }
    const cartItem = await cartModel.addToCart(req.user.id, productId, quantity);
    res.status(201).json(cartItem);
  } catch (err) {
    next(err);
  }
};

const removeItem = async (req, res, next) => {
  try {
    await cartModel.removeFromCart(req.params.id, req.user.id);
    res.json({ message: 'Item removed from cart' });
  } catch (err) {
    next(err);
  }
};

module.exports = {
  getCart,
  addItem,
  removeItem,
};
