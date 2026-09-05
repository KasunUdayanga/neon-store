const express = require("express");
const {
  createPaymentIntent,
  createCodOrder,
  confirmPayment,
} = require("../controllers/checkoutController");

const router = express.Router();

router.post("/payment-intent", createPaymentIntent);
router.post("/cod", createCodOrder);
router.post("/confirm", confirmPayment);

module.exports = router;
