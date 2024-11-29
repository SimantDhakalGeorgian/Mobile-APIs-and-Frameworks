const express = require("express");
const { createUser, loginUser, protectedRoute, verifyToken } = require("../controllers/firebase_controller");

const router = express.Router();

// create a user
router.post("/signup", createUser);

// login using email and password
router.post("/signin", loginUser);

// protected routes
router.get("/protectedRoutes", protectedRoute);


module.exports = router; // Export the router