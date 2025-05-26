// backend/src/controllers/orderController.js
const orderModel = require('../models/orderModel');

const placeOrder = async (req, res, next) => {
  try {
    const orders = await orderModel.createOrder(req.user.id);
    if (orders.length === 0) {
      return res.status(400).json({ error: 'Cart is empty' });
    }
    res.status(201).json({ message: 'Order placed successfully', orders });
  } catch (err) {
    next(err);
  }
};

const getOrders = async (req, res, next) => {
  try {
    const orders = await orderModel.getUserOrders(req.user.id);
    res.json(orders);
  } catch (err) {
    next(err);
  }
};

module.exports = {
  placeOrder,
  getOrders,
};
