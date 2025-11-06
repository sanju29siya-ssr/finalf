const express = require('express');
const router = express.Router();
const Cart = require('../models/cartModel');

// ✅ Add item to cart (if exists, increase quantity instead)
router.post('/add', async (req, res) => {
  const { userId, productId } = req.body;

  try {
    let item = await Cart.findOne({ userId, productId });

    if (item) {
      item.quantity += 1;
      await item.save();
    } else {
      item = new Cart({ userId, productId, quantity: 1 });
      await item.save();
    }

    res.json({ message: 'Item added to cart!' });
  } catch (err) {
    console.error('Add to Cart Error:', err);
    res.status(500).json({ message: 'Failed to add item to cart' });
  }
});

// ✅ Get cart items (with product details)
router.get('/:userId', async (req, res) => {
  try {
    const items = await Cart.find({ userId: req.params.userId })
      .populate('productId'); // <-- joins product data

    res.json(items);
  } catch (err) {
    console.error('Load Cart Error:', err);
    res.status(500).json({ message: 'Failed to load cart' });
  }
});

// ✅ Place Order → clears cart
router.post('/placeOrder', async (req, res) => {
  try {
    await Cart.deleteMany({ userId: req.body.userId });
    res.json({ message: 'Order placed successfully!' });
  } catch (err) {
    console.error('Place Order Error:', err);
    res.status(500).json({ message: 'Failed to place order' });
  }
});

module.exports = router;
