const express = require("express");
const Order = require("../models/Order");
const auth = require("../middlewares/auth");

const router = express.Router();

router.post("/", auth, async (req, res) => {
  const order = await Order.create({
    user: req.user.id,
    items: req.body.items,
    total: req.body.total
  });
  res.json(order);
});

router.get("/", auth, async (req, res) => {
  const orders = await Order.find({ user: req.user.id });
  res.json(orders);
});

module.exports = router;
