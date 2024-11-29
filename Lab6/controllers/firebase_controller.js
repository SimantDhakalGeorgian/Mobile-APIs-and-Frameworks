// import firebase model from models folder
const admin = require("../models/firebase_model"); 

// sign up controller
const signUp = async (req, res) => {
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
const signIn = async (req, res) => {
    const { email, password } = req.body;
    try {
      const user = await admin.auth().getUserByEmail(email);
      // token generate 
      const customToken = await admin.auth().createCustomToken(user.uid);
      res.status(200).json({ message: "Signed in successfully", token: customToken });
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  };


module.exports = { signUp, signIn, verifyToken };
