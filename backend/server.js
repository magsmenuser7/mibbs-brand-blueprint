// const express = require("express");
// const cors = require("cors");
// require("dotenv").config();

// const app = express();
// app.use(cors());
// app.use(express.json());

// app.use("/api/auth", require("./routes/auth"));

// const PORT = process.env.PORT || 5000;
// app.listen(PORT, () => console.log(`Server running on port ${PORT}`));



// backend/server.js
const express = require("express");
const cors = require("cors");           // <-- Allow frontend requests
const app = express();                  // <-- Initialize express
const authRoutes = require("./routes/auth");        // <-- Import user data
require("dotenv").config();

// Middleware
app.use(cors());
app.use(express.json());              // <-- Parse JSON bodies
app.use("/api/auth", authRoutes);

// Sample route (test it)
app.get("/", (req, res) => {
  res.send("Backend is working!");
});

app.get("/api/user", (req, res) => {
  res.json(users);                    // <-- Send user data as JSON
});

// Start server
const PORT = 5000;
app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});




// server.js
// const express = require("express");
// const cors = require("cors");
// const dotenv = require("dotenv");
// const authRoutes = require("./routes/auth");

// dotenv.config();
// const app = express();

// app.use(cors());
// app.use(express.json());

// app.use("/api/auth", authRoutes);

// const PORT = process.env.PORT || 5000;
// app.listen(PORT, () => {
//   console.log(`Server running at http://localhost:${PORT}`);
// });
