const express = require("express");
const {
  registerUser,
  loginUser,
  getMe,
  syncClerkUser,
} = require("../controllers/authController");
const { protect } = require("../middlewares/authMiddleware");

const router = express.Router();

router.post("/register", registerUser);
router.post("/login", loginUser);
router.post("/clerk-sync", syncClerkUser);
router.get("/me", protect, getMe);

module.exports = router;
