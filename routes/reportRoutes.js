const express = require("express");

const router = express.Router();

const { salesReport } = require("../controllers/reportController");

const authMiddleware = require("../middleware/authMiddleware");

router.get("/sales", authMiddleware, salesReport);

module.exports = router;
