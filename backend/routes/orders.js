const express = require("express");
const Order = require("../models/Order");
const jwt = require("jsonwebtoken");
const router = express.Router();

// Middleware to verify JWT
function verifyToken(req, res, next) {
  const token = req.headers.authorization?.split(" ")[1];
  if (!token) return res.status(401).json({ message: "No token" });

  jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
    if (err) return res.status(403).json({ message: "Invalid token" });
    req.userId = decoded.id;
    next();
  });
}

// Place order
router.post("/", verifyToken, async (req, res) => {
  const { products } = req.body;
  const order = new Order({ userId: req.userId, products });
  await order.save();
  res.status(201).json({ message: "Order placed" });
});

module.exports = router;
