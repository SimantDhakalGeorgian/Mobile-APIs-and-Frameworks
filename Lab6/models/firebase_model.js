const admin = require("firebase-admin");
const serviceAccount = require("../mdev1004-a884b-firebase-adminsdk-5zuyn-5ac454e5d3.json");

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  databaseURL: "https://mdev1004-a884b-default-rtdb.firebaseio.com/"
});

admin.auth().listUsers(1)
  .then((userRecords) => {
    console.log("Firebase Admin SDK Initialized");
  })
  .catch((error) => {
    console.error("Error initializing Firebase Admin SDK:", error.message);
  });

module.exports = admin;