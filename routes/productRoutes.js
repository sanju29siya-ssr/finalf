const express = require('express');
const router = express.Router();
const Product = require('../models/productModel');

// 🔹 Sample product data (T-shirt, Sneakers, Watch)
const sampleProducts = [
  { name: 'Classic T-Shirt', price: 499, description: 'Soft cotton T-shirt with a perfect fit.' },
  { name: 'Sneakers', price: 1599, description: 'Comfortable and stylish sneakers for everyday wear.' },
  { name: 'Wrist Watch', price: 999, description: 'Elegant wrist watch with a leather strap.' }
];

// 🔹 API: Get all products
router.get('/', async (req, res) => {
  try {
    let products = await Product.find();

    // If no products exist, insert the sample ones
    if (products.length === 0) {
      await Product.insertMany(sampleProducts);
      products = await Product.find();
    }

    res.json(products);
  } catch (error) {
    res.status(500).json({ message: 'Error loading products', error });
  }
});

module.exports = router;
