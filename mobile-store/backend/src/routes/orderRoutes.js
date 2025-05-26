// backend/src/routes/orderRoutes.js
const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth');
const orderController = require('../controllers/orderController');

router.use(auth);

router.post('/', orderController.placeOrder);
router.get('/', orderController.getOrders);

module.exports = router;
