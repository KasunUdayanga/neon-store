const express = require("express");
const authRoutes = require("./authRoutes");
const cartRoutes = require("./cartRoutes");
const checkoutRoutes = require("./checkoutRoutes");
const productRoutes = require("./productRoutes");

const router = express.Router();

router.use("/auth", authRoutes);
router.use("/cart", cartRoutes);
router.use("/checkout", checkoutRoutes);
router.use("/products", productRoutes);

module.exports = router;
