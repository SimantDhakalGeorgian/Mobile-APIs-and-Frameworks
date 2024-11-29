var admin = require("firebase-admin");

var serviceAccount = require("../mdev1004-a884b-firebase-adminsdk-5zuyn-2a04540a1c.json");

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  databaseURL: "https://mdev1004-a884b-default-rtdb.firebaseio.com/"
});

module.exports = admin;