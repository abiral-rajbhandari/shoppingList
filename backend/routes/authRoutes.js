const express = require("express");
const router = express.Router();
const { loginUser, registerUser, verifyEmail, forgotPassword, resetPassword } = require("../controllers/authController");

router.post("/login", loginUser);
router.post("/register", registerUser);
router.get("/verify-email", verifyEmail);
router.post("/forgot-password", forgotPassword);
router.post("/reset-password", resetPassword);

module.exports = router;