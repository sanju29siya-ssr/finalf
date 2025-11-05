const express = require('express');
const router = express.Router();
const Cart = require('../models/cartModel');

// Add to Cart
router.post('/add', async (req, res) => {
  const { userId, productId } = req.body;
  const newItem = new Cart({ userId, productId });
  await newItem.save();
  res.json({ message: 'Item added to cart' });
});

// Get Cart
router.get('/:userId', async (req, res) => {
  const items = await Cart.find({ userId: req.params.userId });
  res.json(items);
});

// Place Order
router.post('/placeOrder', async (req, res) => {
  await Cart.deleteMany({ userId: req.body.userId });
  res.json({ message: 'Order placed successfully' });
});

module.exports = router;
