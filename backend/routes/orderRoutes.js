const express = require('express');
const router = express.Router();
const Order = require('../models/Order');

// Place a new order
router.post('/', async (req, res) => {
  try {
    const { userId, cart } = req.body;

    const items = cart.map(item => ({
      productId: item._id,
      name: item.name,
      quantity: item.quantity,
      price: item.price
    }));

    const totalAmount = items.reduce((sum, item) => sum + item.price * item.quantity, 0);

    const order = new Order({ userId, items, totalAmount });
    await order.save();

    res.status(201).json({ message: 'Order placed successfully', order });
  } catch (err) {
    res.status(500).json({ message: 'Error placing order', error: err.message });
  }
});

module.exports = router;
