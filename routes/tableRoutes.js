const express = require("express");

const router = express.Router();

const {
  getProducts,
  getOrders,
} = require("../controllers/tableController");

const authMiddleware = require("../middleware/authMiddleware");

router.get("/products", authMiddleware, getProducts);
router.get("/orders", authMiddleware, getOrders);

module.exports = router;
