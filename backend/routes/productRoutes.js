const express = require('express');
const router = express.Router();
const Product = require('../models/Product');

// Create Product (Temporary Admin Use)
router.post('/', async (req, res) => {
  try {
    const { name, description, price, image, stock } = req.body;

    const product = new Product({ name, description, price, image, stock });
    await product.save();

    res.status(201).json({ message: 'Product created', product });
  } catch (err) {
    res.status(500).json({ message: 'Error creating product', error: err.message });
  }
});

// Get All Products
router.get('/', async (req, res) => {
  try {
    const products = await Product.find();
    res.json(products);
  } catch (err) {
    res.status(500).json({ message: 'Error fetching products' });
  }
});

// Get Product by ID
router.get('/:id', async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);
    if (!product) return res.status(404).json({ message: 'Product not found' });

    res.json(product);
  } catch (err) {
    res.status(500).json({ message: 'Error fetching product' });
  }
});

// Delete Product
router.delete('/:id', async (req, res) => {
  try {
    const product = await Product.findByIdAndDelete(req.params.id);
    if (!product) return res.status(404).json({ message: 'Product not found' });

    res.json({ message: 'Product deleted successfully' });
  } catch (err) {
    res.status(500).json({ message: 'Error deleting product', error: err.message });
  }
});

module.exports = router;
