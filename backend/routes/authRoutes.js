const express = require("express");
const router = express.Router();
const { loginUser, registerUser, verifyEmail, forgotPassword, resetPassword, getUserInfo } = require("../controllers/authController");
const verifyToken = require("../middleware/authMIddleware");

router.post("/login", loginUser);
router.post("/register", registerUser);
router.get("/verify-email", verifyEmail);
router.post("/forgot-password", forgotPassword);
router.post("/reset-password", resetPassword);

router.get("/user-info", verifyToken, getUserInfo);

module.exports = router;