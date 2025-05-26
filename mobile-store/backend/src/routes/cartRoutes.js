// backend/src/routes/cartRoutes.js
const express = require('express');
const router = express.Router();
const cartController = require('../controllers/cartController');
const auth = require('../middleware/auth');

router.use(auth); // All routes below are protected

router.get('/', cartController.getCart);
router.post('/', cartController.addItem);
router.delete('/:id', cartController.removeItem);

module.exports = router;
