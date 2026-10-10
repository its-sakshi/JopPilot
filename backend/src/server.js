const express = require("express");
const cors = require("cors");
require("dotenv").config();

const resumeRoutes = require("./routes/resume");
const analyzeRoutes = require("./routes/analyze");

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json());

// Test route
app.get("/", (req, res) => {
  res.json({
    message: "JobPilot backend is running successfully!",
  });
});

// Resume routes
app.use("/api/resume", resumeRoutes);

// Resume analysis routes
app.use("/api/analyze", analyzeRoutes);

// Start server
app.listen(PORT, () => {
  console.log(`JobPilot backend running on http://localhost:${PORT}`);
});