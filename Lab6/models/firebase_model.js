const admin = require("firebase-admin");
const serviceAccount = require("../mdev1004-a884b-firebase-adminsdk-5zuyn-36b8bff619.json");

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  databaseURL: "https://mdev1004-a884b-default-rtdb.firebaseio.com/"
});

admin.auth().listUsers(1)
  .then((userRecords) => {
    console.log("Firebase Admin SDK Initialized:", userRecords);
  })
  .catch((error) => {
    console.error("Error initializing Firebase Admin SDK:", error.message);
  });

module.exports = admin;