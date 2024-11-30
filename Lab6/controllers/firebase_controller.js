// import firebase model from models folder
const admin = require("../models/firebase_model"); 
const axios = require('axios');

// sign up controller
const createUser = async (req, res) => {
  const { email, password } = req.body;

  try {
    // use firebase authentication to ceate a new user
    const userRecord = await admin.auth().createUser({
      email, // we need an email
      password, // and a passsword
    });

    // show a message with success if the accout is ceated successfully
    res.status(201).json({ message: "User created successfully", uid: userRecord.uid });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// create sign in controller to login using registered email and password
const loginUser = async(req,res)=>{
  const { email, password } = req.body;

  try {

    const user = await admin.auth().getUserByEmail(email);

    const customToken = await admin.auth().createCustomToken(user.uid);
    const response = await axios.post(
        `https://identitytoolkit.googleapis.com/v1/accounts:signInWithCustomToken?key=AIzaSyDeLhNv9Imd3JAwcV-RKvTdqt-I_aLOmrY`,
        {
          token: customToken,
          returnSecureToken: true,  // Tells Firebase to return a secure ID token
        },
        {
          headers: {
            'Content-Type': 'application/json',
          },
        }
      );

      // Get ID token from the response
      const { idToken, refreshToken, expiresIn } = response.data;

      // Return the ID token and other relevant data
      res.status(200).json({
        message: "Signed in successfully",
        idToken: idToken,
        refreshToken: refreshToken,
        expiresIn: expiresIn,
      });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
}


// verify token generated from firebase and authenticate user
const verifyToken = async (req, res, next) => {
    const authHeader = req.header("Authorization");
  
    if (!authHeader || !authHeader.startsWith("Bearer ")) {
      return res.status(401).json({ error: "No token provided" });
    }
    const idToken = authHeader.split("Bearer ")[1];
  
    try {
      const decodedToken = await admin.auth().verifyIdToken(idToken); 
      req.user = decodedToken;
      next(); 
    } catch (error) {
      return res.status(401).json({ error: "Invalid or expired token. Access denied." });
    }
};

const protectedRoute = (req, res) => {
    res.status(200).json({ message: 'Welcome, You have access to this protected route.', data: req.user });
};
  

module.exports = { createUser, loginUser, verifyToken, protectedRoute };