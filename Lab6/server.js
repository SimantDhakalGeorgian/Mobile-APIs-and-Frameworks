const express = require("express");
const cors = require('cors');
const firebaseRoutes = require("./routes/firebase_routes");

const app = express();
const PORT = 3000;

app.use(cors());
// Middleware
app.use(express.json());
// Routes
app.use("/firebase", firebaseRoutes);

// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
