const express = require("express");
const { checkoutCart } = require("../controllers/cartController");

const router = express.Router();

router.post("/checkout", checkoutCart);

module.exports = router;
