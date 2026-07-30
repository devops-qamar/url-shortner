const express = require("express");
const dotenv = require("dotenv");
const connectDB = require("./config/db");
const urlRoutes = require("./routes/urlRoutes");

dotenv.config();

connectDB();

const app = express();

// Middleware
app.use(express.json());

// API Routes
app.use("/api", urlRoutes);

// Redirect Route
app.use("/", urlRoutes);

const PORT = process.env.PORT || 3000;

app.get("/", (req, res) => {
  res.send("version 2 deployed viva github action");
});

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});