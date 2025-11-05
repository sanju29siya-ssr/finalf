const express = require('express');
const router = express.Router();
const Product = require('../models/productModel');

// Dummy product data (you can seed this manually)
router.get('/', async (req, res) => {
  const products = await Product.find();
  res.json(products);
});

module.exports = router;
