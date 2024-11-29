const express = require("express");
const { signUp, signIn, verifyToken, protectedRoute } = require("./controllers/firebase_controller");

const router = express.Router();

// routes for signup and signin
router.post("/signup", signUp);       // Create a new user
router.post("/signin", signIn);       // Sign in an existing user

module.exports = router;